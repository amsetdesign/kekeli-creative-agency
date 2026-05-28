import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Clock, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import FadeIn from "@/components/animations/FadeIn";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: "Projet — KEKELI Creative Agency" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/realisations/${slug}` },
    openGraph: {
      title: `${project.title} — KEKELI Creative Agency`,
      description: project.description,
      url: `/realisations/${slug}`,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}

const categoryLabels: Record<string, string> = {
  web: "Site web",
  event: "Événement",
  artiste: "Artiste",
  com: "Communication",
  branding: "Branding",
  ecommerce: "E-commerce",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category.some((c) => project.category.includes(c)))
    .slice(0, 3);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden bg-[#0C0B09]">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09] via-[#0C0B09]/60 to-[#0C0B09]/20" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-[#C8A84B] transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/realisations" className="hover:text-[#C8A84B] transition-colors">Réalisations</Link>
              <span>/</span>
              <span className="text-white/70">{project.title}</span>
            </nav>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.category.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-body font-semibold uppercase tracking-wider border border-[#C8A84B]/40 text-[#C8A84B]"
                >
                  {categoryLabels[c] ?? c}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-3">
              {project.title}
            </h1>
            <p className="font-body text-lg text-white/60">{project.subtitle}</p>
          </FadeIn>

          {(project.timeline || project.url) && (
            <FadeIn direction="up" delay={0.2} className="mt-6 flex flex-wrap gap-4">
              {project.timeline && (
                <div className="flex items-center gap-2 text-sm font-body text-white/50">
                  <Clock size={14} className="text-[#C8A84B]" />
                  Réalisé en {project.timeline}
                </div>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-[#C8A84B] hover:text-[#E8C96A] transition-colors"
                >
                  <ExternalLink size={13} />
                  Voir le projet en ligne
                </a>
              )}
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── BODY ──────────────────────────────────────────── */}
      <div className="bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Results strip */}
          {project.results && project.results.length > 0 && (
            <FadeIn direction="up" className="mb-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.results.map((r) => (
                  <div
                    key={r.label}
                    className="bg-white rounded-2xl border border-[#E7E5E4] p-6 text-center [box-shadow:0_2px_12px_rgba(12,11,9,0.06)]"
                  >
                    <p className="font-display text-3xl font-bold text-[#C8A84B] mb-1 leading-none">
                      {r.value}
                    </p>
                    <p className="font-body text-xs text-[#78716C] leading-snug">{r.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Challenge + Solution */}
          {(project.challenge || project.solution) && (
            <div className="grid md:grid-cols-2 gap-10 mb-20">
              {project.challenge && (
                <FadeIn direction="right">
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-4">
                      Le défi
                    </p>
                    <h2 className="font-display text-2xl text-[#0C0B09] mb-4">
                      Problématique client
                    </h2>
                    <p className="font-body text-[#78716C] leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                </FadeIn>
              )}
              {project.solution && (
                <FadeIn direction="left" delay={0.1}>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-4">
                      Notre approche
                    </p>
                    <h2 className="font-display text-2xl text-[#0C0B09] mb-4">
                      Solution mise en place
                    </h2>
                    <p className="font-body text-[#78716C] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </FadeIn>
              )}
            </div>
          )}

          {/* Tags */}
          <FadeIn direction="up" className="mb-20">
            <p className="font-body text-xs text-[#A8A29E] uppercase tracking-widest mb-4">
              Technologies & outils
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-[#E7E5E4] bg-white font-body text-sm text-[#44403C] [box-shadow:0_1px_4px_rgba(12,11,9,0.06)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Extra images */}
          {project.images && project.images.length > 0 && (
            <FadeIn direction="up" className="mb-20">
              <div className="grid md:grid-cols-2 gap-4">
                {project.images.map((img) => (
                  <div key={img.src} className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* CTA */}
          <FadeIn direction="up">
            <div className="bg-[#0C0B09] rounded-3xl p-10 text-center">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-4">
                Un projet similaire ?
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                Faisons <em className="text-[#C8A84B] not-italic">la même chose</em> pour vous
              </h2>
              <p className="font-body text-white/60 mb-8 max-w-md mx-auto">
                Réponse sous 24h. Brief gratuit, sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/brief"
                  className="inline-flex items-center gap-2 bg-[#C8A84B] text-white px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-[#b8963d] transition-colors"
                >
                  Brief Express
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-body font-medium text-sm hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Related */}
          {relatedProjects.length > 0 && (
            <div className="mt-20">
              <FadeIn direction="up">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-2xl text-[#0C0B09]">Autres réalisations</h3>
                  <Link
                    href="/realisations"
                    className="font-body text-sm text-[#C8A84B] hover:text-[#b8963d] transition-colors flex items-center gap-1"
                  >
                    Tout voir <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {relatedProjects.map((p, i) => (
                  <FadeIn key={p.id} direction="up" delay={i * 0.1}>
                    <Link
                      href={`/realisations/${p.id}`}
                      className="group block bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:[box-shadow:0_8px_32px_rgba(12,11,9,0.12)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-display text-base font-semibold text-[#0C0B09] group-hover:text-[#C8A84B] transition-colors mb-1">
                          {p.title}
                        </p>
                        <p className="font-body text-xs text-[#78716C]">{p.subtitle}</p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back link */}
      <div className="bg-[#FAFAF8] border-t border-[#E7E5E4] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 font-body text-sm text-[#78716C] hover:text-[#0C0B09] transition-colors"
          >
            <ArrowLeft size={14} />
            Retour aux réalisations
          </Link>
        </div>
      </div>
    </>
  );
}
