import { NextRequest, NextResponse } from "next/server";

type GuideType = "artiste" | "entreprise";

const VALID: GuideType[] = ["artiste", "entreprise"];

const BOOKS: Record<GuideType, { title: string; price: number }> = {
  artiste:    { title: "Du Talent au Sommet",                         price: 5000 },
  entreprise: { title: "Le Guide de l'Entrepreneur au Sénégal 2026",  price: 5000 },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kekelicreativeagency.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, type } = await req.json();

    if (!name?.trim() || !email?.trim() || !VALID.includes(type)) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const apiKey    = process.env.PAYTECH_API_KEY;
    const apiSecret = process.env.PAYTECH_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: "Configuration paiement manquante." }, { status: 500 });
    }

    const book     = BOOKS[type as GuideType];
    const refCmd   = `guide_${type}_${Date.now()}`;
    const custom   = JSON.stringify({ email: email.trim(), name: name.trim(), type });

    const body = {
      item_name:    book.title,
      item_price:   String(book.price),
      currency:     "XOF",
      ref_command:  refCmd,
      command_name: `Achat — ${book.title}`,
      env:          "prod",
      ipn_url:      `${SITE_URL}/api/guide/ipn`,
      success_url:  `${SITE_URL}/guide/succes?ref=${refCmd}`,
      cancel_url:   `${SITE_URL}/guide/annulation`,
      custom_field: custom,
    };

    const res = await fetch("https://paytech.sn/api/payment/request-payment", {
      method: "POST",
      headers: {
        "API_KEY":      apiKey,
        "API_SECRET":   apiSecret,
        "Accept":       "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const raw = await res.text();
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("[guide/payment] PayTech non-JSON response:", raw.slice(0, 500));
      return NextResponse.json({ error: "Erreur PayTech. Réessayez." }, { status: 502 });
    }

    console.log("[guide/payment] PayTech response:", JSON.stringify(data));

    if (data.success !== 1) {
      console.error("[guide/payment] PayTech rejected:", data.errors ?? data);
      const msg = Array.isArray(data.errors) ? (data.errors as string[]).join(", ") : "Erreur PayTech.";
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    return NextResponse.json({ redirect_url: data.redirect_url });
  } catch (err) {
    console.error("[guide/payment]", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
