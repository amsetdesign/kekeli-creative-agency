import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import { resend, SITE_URL } from "@/lib/resend";
import { getSupabase } from "@/lib/supabase";

type GuideType = "artiste" | "entreprise";

const BOOKS: Record<GuideType, { title: string; filename: string }> = {
  artiste:    { title: "Du Talent au Sommet",                         filename: "du-talent-au-sommet.pdf" },
  entreprise: { title: "Le Guide de l'Entrepreneur au Sénégal 2026",  filename: "guide-entrepreneur-senegal-2026.pdf" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      type_event,
      api_key_sha256,
      api_secret_sha256,
      custom_field,
      ref_command,
      item_name,
    } = body;

    // 1. Verify PayTech signatures
    const apiKey    = process.env.PAYTECH_API_KEY ?? "";
    const apiSecret = process.env.PAYTECH_API_SECRET ?? "";

    const keyHash    = createHash("sha256").update(apiKey).digest("hex");
    const secretHash = createHash("sha256").update(apiSecret).digest("hex");

    if (keyHash !== api_key_sha256 || secretHash !== api_secret_sha256) {
      console.error("[guide/ipn] Invalid PayTech signature");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Only process completed sales
    if (type_event !== "sale_complete") {
      return NextResponse.json({ ok: true });
    }

    // 3. Extract buyer info from custom_field
    let email = "";
    let name  = "";
    let type: GuideType = "artiste";

    try {
      const custom = JSON.parse(custom_field ?? "{}");
      email = custom.email ?? "";
      name  = custom.name  ?? "";
      type  = (custom.type ?? "artiste") as GuideType;
    } catch {
      console.error("[guide/ipn] Failed to parse custom_field");
      return NextResponse.json({ error: "Bad custom_field" }, { status: 400 });
    }

    if (!email || !(type in BOOKS)) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const book = BOOKS[type];

    // 4. Read PDF and send to buyer
    const pdfPath = join(process.cwd(), "public", "guides", book.filename);
    const content = readFileSync(pdfPath);

    await resend.emails.send({
      from: "KEKELI Creative Agency <noreply@kekelicreativeagency.com>",
      to:   email,
      subject: `Votre guide : ${book.title} — Merci pour votre achat !`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0C0B09;color:#fff;border-radius:16px;overflow:hidden;">
          <div style="height:3px;background:linear-gradient(90deg,#C8A84B,transparent);"></div>
          <div style="padding:40px 32px;">
            <p style="color:#C8A84B;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 8px;">KEKELI Creative Agency</p>
            <h1 style="font-size:24px;font-weight:800;margin:0 0 12px;line-height:1.2;">
              Merci ${name} ! 🎉
            </h1>
            <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.6;margin:0 0 24px;">
              Votre paiement a été confirmé. Votre guide <strong style="color:#C8A84B;">${book.title}</strong> est en pièce jointe.
            </p>
            <div style="background:rgba(200,168,75,0.10);border:1px solid rgba(200,168,75,0.25);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="color:#C8A84B;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 6px;">Votre achat</p>
              <p style="font-size:16px;font-weight:700;color:#fff;margin:0;">${book.title}</p>
              <p style="font-size:13px;color:rgba(255,255,255,0.50);margin:4px 0 0;">5 000 F CFA · Paiement confirmé ✓</p>
            </div>
            <a href="${SITE_URL}/contact" style="display:inline-block;background:#C8A84B;color:#0C0B09;font-weight:700;font-size:14px;padding:14px 28px;border-radius:30px;text-decoration:none;">
              Discuter avec KEKELI →
            </a>
          </div>
          <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);">
            <p style="color:rgba(255,255,255,0.30);font-size:11px;margin:0;">
              KEKELI Creative Agency · Dakar, Sénégal · <a href="${SITE_URL}" style="color:#C8A84B;text-decoration:none;">kekelicreativeagency.com</a>
            </p>
          </div>
        </div>
      `,
      attachments: [{ filename: book.filename, content }],
    });

    // 5. Mark as paid in Supabase
    try {
      const db = getSupabase();
      await db.from("leads").insert({
        type:   "guide_purchase",
        status: "paid",
        data:   { name, email, guide: type, book_title: book.title, ref_command, item_name },
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[guide/ipn]", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
