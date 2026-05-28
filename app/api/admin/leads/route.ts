import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabase } from "@/lib/supabase";

const LEAD_STATUSES = ["new", "read", "archived"] as const;
const LEAD_TYPES = ["sondage", "contact", "brief", "artistes", "photo", "clips", "monetisation", "marketing", "branding", "identite", "accompagnement", "distribution", "strategie", "direction", "espace-client"] as const;

async function isAuthorized(): Promise<boolean> {
  const jar = await cookies();
  const session = jar.get("kekeli_admin")?.value;
  return !!session && session === process.env.ADMIN_SESSION_SECRET;
}

export async function GET(request: Request) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");

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
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id, status } = await request.json();
  if (!id) return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  if (!LEAD_STATUSES.includes(status)) return NextResponse.json({ error: "Statut invalide." }, { status: 400 });

  const { error } = await getSupabase().from("leads").update({ status }).eq("id", id);
  if (error) { console.error("Leads PATCH error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }
  return NextResponse.json({ success: true });
}
