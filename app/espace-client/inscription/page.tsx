import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import RegistrationForm from "./RegistrationForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inscription — Espace Client KEKELI" };

export default async function InscriptionPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/espace-client/dashboard");

  return (
    <Suspense>
      <RegistrationForm />
    </Suspense>
  );
}
