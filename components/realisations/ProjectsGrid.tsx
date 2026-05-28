"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Play, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { projects, type ProjectCategory } from "@/data/projects";

type Filter = "all" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all",       label: "Tous" },
  { id: "video",     label: "🎬 Clips & Docs" },
  { id: "web",       label: "Sites web" },
  { id: "event",     label: "Événements" },
  { id: "artiste",   label: "Artistes" },
  { id: "com",       label: "Communication" },
  { id: "branding",  label: "Branding" },
  { id: "ecommerce", label: "E-commerce" },
];

const categoryLabels: Record<string, string> = {
  web:       "Site web",
  event:     "Événement",
  artiste:   "Artiste",
  com:       "Communication",
  branding:  "Branding",
  ecommerce: "E-commerce",
  video:     "Vidéo",
};

/* ── YouTube Lightbox ─────────────────────────────────── */
function VideoModal({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors font-body text-sm"
        >
          <X size={16} /> Fermer
        </button>

        {/* 16:9 iframe */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 0 0 1px rgba(200,168,75,0.2), 0 32px 80px rgba(0,0,0,0.8)" }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title="Vidéo KEKELI Creative Agency"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Play button overlay ──────────────────────────────── */
function PlayOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "rgba(200,168,75,0.92)",
          boxShadow: "0 0 0 8px rgba(200,168,75,0.25)",
        }}
      >
        <Play size={22} className="text-black translate-x-0.5" fill="black" />
      </div>
    </div>
  );
}

/* ── Main grid ────────────────────────────────────────── */
export default function ProjectsGrid() {
  const [active, setActive]         = useState<Filter>("all");
  const [playingId, setPlayingId]   = useState<string | null>(null);

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category.includes(active as ProjectCategory));

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-bg-primary/90 backdrop-blur-sm border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-body font-medium transition-colors duration-200 ${
                  active === f.id ? "text-black" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {active === f.id && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-gold rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const isVideo = !!project.youtubeId;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-bg-primary rounded-2xl border border-border overflow-hidden [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-lg)] hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Card link — video cards use button, others use Link */}
                  {isVideo ? (
                    <button
                      onClick={() => setPlayingId(project.youtubeId!)}
                      className="absolute inset-0 z-0 cursor-pointer"
                      aria-label={`Regarder : ${project.title}`}
                    />
                  ) : (
                    <Link
                      href={`/realisations/${project.id}`}
                      className="absolute inset-0 z-0"
                      aria-label={`Voir l'étude de cas : ${project.title}`}
                    />
                  )}

                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden pointer-events-none">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized={isVideo} // YouTube thumbnails don't need Next.js optimization
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Play overlay for videos */}
                    {isVideo && <PlayOverlay />}

                    {/* Category badges */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {project.category.filter(c => c !== "video").slice(0, 2).map((cat) => (
                        <Badge key={cat} variant="dark" className="text-[10px]">
                          {categoryLabels[cat] ?? cat}
                        </Badge>
                      ))}
                      {isVideo && (
                        <Badge variant="dark" className="text-[10px] !bg-[#C8A84B]/90 !text-black">
                          ▶ Vidéo
                        </Badge>
                      )}
                    </div>

                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="gold" className="text-[10px]">Réalisation phare</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-text-primary mb-1 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-text-muted mb-3">{project.subtitle}</p>
                    <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-body font-medium bg-gold-pale text-gold-dark">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 flex items-center gap-1 text-[10px] font-body text-text-muted hover:text-gold transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                          aria-label={`Visiter ${project.title}`}
                        >
                          <ExternalLink size={11} />
                          Voir le site
                        </a>
                      )}
                    </div>

                    {isVideo ? (
                      <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-[#C8A84B] opacity-0 group-hover:opacity-100 transition-opacity mt-3">
                        <Play size={11} fill="currentColor" /> Regarder la vidéo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-[#C8A84B] opacity-0 group-hover:opacity-100 transition-opacity mt-3">
                        Voir l&apos;étude de cas <ArrowRight size={11} />
                      </span>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-body text-text-muted py-16"
          >
            Aucun projet dans cette catégorie pour l&apos;instant.
          </motion.p>
        )}
      </div>

      {/* YouTube lightbox */}
      <AnimatePresence>
        {playingId && (
          <VideoModal youtubeId={playingId} onClose={() => setPlayingId(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
