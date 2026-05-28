import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase } from "@/lib/supabase";

const artistProfileSchema = z.object({
  nom_artiste: z.string().max(100),
  genre_musical: z.string().max(100),
  niveau: z.string().max(50),
  presence_digitale: z.string().max(50),
  besoins: z.array(z.string().max(100)).max(20),
  budget: z.string().max(50),
  description: z.string().max(2000),
});

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const { data } = await getSupabase()
    .from("client_profiles")
    .select("artist_profile")
    .eq("id", user.id)
    .single();

  return Response.json({ artist_profile: data?.artist_profile ?? null });
}

export async function PUT(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const raw = await request.json();
  const parsed = artistProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: "Données invalides.", details: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { error } = await getSupabase()
    .from("client_profiles")
    .update({ artist_profile: parsed.data })
    .eq("id", user.id);

  if (error) { console.error("Artist profile PUT error:", error.message); return Response.json({ error: "Une erreur est survenue." }, { status: 500 }); }
  return Response.json({ success: true });
}
