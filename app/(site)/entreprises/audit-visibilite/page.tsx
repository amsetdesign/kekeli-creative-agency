import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import AuditVisibiliteClient from "@/components/entreprises/AuditVisibiliteClient";

export const metadata: Metadata = {
  title: "Audit Visibilité — Analysez votre présence digitale | KEKELI Creative Agency",
  description: "Entrez le nom de votre entreprise — notre IA analyse votre présence digitale complète : site web, réseaux sociaux, Google, visibilité locale.",
  alternates: { canonical: "/entreprises/audit-visibilite" },
};

export default async function AuditVisibilitePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/entreprises/audit-visibilite");
  return <AuditVisibiliteClient />;
}
