"use server";

import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { redirect } from "next/navigation";

export async function logoutClient() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/espace-client/login");
}
