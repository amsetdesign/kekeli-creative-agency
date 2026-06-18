import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth";

const LEAD_STATUSES = ["new", "read", "archived"] as const;
const LEAD_TYPES = ["sondage", "contact", "brief", "artiste", "entreprise", "projet"] as const;

export async function GET(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const format = searchParams.get("format"); // "csv" pour export

  if (type && type !== "all" && !LEAD_TYPES.includes(type as typeof LEAD_TYPES[number])) {
    return NextResponse.json({ error: "Type invalide." }, { status: 400 });
  }
  if (status && status !== "all" && !LEAD_STATUSES.includes(status as typeof LEAD_STATUSES[number])) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  let query = getSupabase().from("leads").select("*").order("created_at", { ascending: false });
  if (type && type !== "all") query = query.eq("type", type);
  if (status && status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) { console.error("Leads GET error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }

  // ── Export CSV ────────────────────────────────────────────────────────────
  if (format === "csv") {
    const rows = (data ?? []).map((lead) => {
      const d = lead.data as Record<string, unknown>;
      const ui = (d.userInfo ?? {}) as Record<string, string | undefined>;
      const name =
        lead.type === "sondage" ? ui.prenom
        : lead.type === "artiste" ? d.nom_artiste as string
        : `${d.prenom ?? ""} ${d.nom ?? ""}`.trim();
      const email =
        lead.type === "sondage" ? ui.email
        : lead.type === "projet" ? d.client_email as string
        : d.email as string;
      const phone =
        lead.type === "sondage" ? ui.telephone
        : d.telephone as string | undefined;
      const score = lead.type === "sondage" ? String(d.score ?? "") : "";
      const sondageType = lead.type === "sondage" ? String(d.sondage_type ?? d.type ?? "") : "";

      return [
        lead.id,
        new Date(lead.created_at).toLocaleDateString("fr-SN"),
        lead.type,
        lead.status,
        name ?? "",
        email ?? "",
        phone ?? "",
        // Sondage demographics
        lead.type === "sondage" ? (ui.sexe ?? "") : "",
        lead.type === "sondage" ? (ui.age ?? "") : "",
        lead.type === "sondage" ? (ui.ville ?? "") : "",
        lead.type === "sondage" ? (ui.budget ?? "") : "",
        lead.type === "sondage" ? (ui.urgence ?? "") : "",
        lead.type === "sondage" ? (ui.source ?? "") : "",
        score,
        sondageType,
        d.structure as string ?? ui.structure ?? "",
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    const header = ["ID","Date","Type","Statut","Prénom/Nom","Email","Téléphone","Sexe","Âge","Ville","Budget","Urgence","Source","Score","Profil sondage","Structure"].join(",");
    const csv = [header, ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-kekeli-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id, status } = await request.json();
  if (!id) return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  if (!LEAD_STATUSES.includes(status)) return NextResponse.json({ error: "Statut invalide." }, { status: 400 });

  const { error } = await getSupabase().from("leads").update({ status }).eq("id", id);
  if (error) { console.error("Leads PATCH error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }
  return NextResponse.json({ success: true });
}
