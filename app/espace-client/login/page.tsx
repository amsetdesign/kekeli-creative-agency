import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import LoginClientForm from "./LoginClientForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Connexion — Espace Client KEKELI" };

export default async function LoginClientPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/espace-client/dashboard");

  return (
    <Suspense>
      <LoginClientForm />
    </Suspense>
  );
}
