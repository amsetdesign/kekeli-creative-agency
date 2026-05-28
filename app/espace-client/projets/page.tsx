import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase, type Project } from "@/lib/supabase";
import { FolderOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Mes Projets — Espace Client KEKELI" };
export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<Project["status"], string> = {
  en_attente: "En attente",
  en_cours: "En cours",
  termine: "Terminé",
  suspendu: "Suspendu",
};

const STATUS_COLORS: Record<Project["status"], string> = {
  en_attente: "bg-amber-100 text-amber-700",
  en_cours: "bg-blue-100 text-blue-700",
  termine: "bg-emerald-100 text-emerald-700",
  suspendu: "bg-[#E7E5E4] text-[#78716C]",
};

export default async function ProjetsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await getSupabase()
    .from("projects")
    .select("*")
    .eq("client_id", user.id)
    .order("updated_at", { ascending: false });

  const projects = (data ?? []) as Project[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-[#0C0B09] mb-1">Mes Projets</h1>
        <p className="font-body text-sm text-[#78716C]">
          {projects.length} projet{projects.length !== 1 ? "s" : ""}
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F5F5F4] flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={28} className="text-[#A8A29E]" />
          </div>
          <p className="font-body text-sm text-[#78716C]">
            Aucun projet pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/espace-client/projets/${project.id}`}
              className="block bg-white rounded-2xl border border-[#E7E5E4] p-6 hover:border-[#C8A84B]/40 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <h2 className="font-body text-base font-semibold text-[#0C0B09] group-hover:text-[#C8A84B] transition-colors">
                    {project.title}
                  </h2>
                  {project.description && (
                    <p className="font-body text-sm text-[#78716C] mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full font-body text-xs font-medium ${STATUS_COLORS[project.status]}`}>
                    {STATUS_LABELS[project.status]}
                  </span>
                  <ArrowRight size={16} className="text-[#A8A29E] group-hover:text-[#C8A84B] transition-colors" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#F5F5F4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C8A84B] rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="font-body text-xs text-[#78716C] shrink-0 w-10 text-right">
                  {project.progress}%
                </span>
              </div>

              <p className="font-body text-xs text-[#A8A29E] mt-3">
                Mis à jour le{" "}
                {new Date(project.updated_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
