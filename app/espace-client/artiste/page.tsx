import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase, type ArtistProfile } from "@/lib/supabase";
import ArtistProfileForm from "@/components/espace-client/ArtistProfileForm";

export const metadata: Metadata = { title: "Profil Artiste — Espace Client KEKELI" };
export const dynamic = "force-dynamic";

export default async function ArtistePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await getSupabase()
    .from("client_profiles")
    .select("full_name, email, artist_profile")
    .eq("id", user.id)
    .single();

  const artistProfile = profile?.artist_profile as ArtistProfile | null;

  return (
    <ArtistProfileForm
      initialData={artistProfile}
      clientName={profile?.full_name ?? ""}
    />
  );
}
