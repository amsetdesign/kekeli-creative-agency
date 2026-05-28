import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase } from "@/lib/supabase";
import ClientChat from "@/components/espace-client/ClientChat";

export const metadata: Metadata = { title: "Discuter avec KELI — Espace Client KEKELI" };

export default async function ChatPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await getSupabase()
    .from("client_profiles")
    .select("full_name, company, email")
    .eq("id", user.id)
    .single();

  const firstName = profile?.full_name?.split(" ")[0] ?? "vous";
  const email = profile?.email ?? user.email ?? "";

  return <ClientChat firstName={firstName} userId={user.id} email={email} />;
}
