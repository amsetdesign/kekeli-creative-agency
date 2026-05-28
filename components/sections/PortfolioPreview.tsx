"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { useT } from "@/hooks/useT";

export default function PortfolioPreview() {
  const tr = useT();
  const p = tr.portfolio;
  const preview = projects.slice(0, 3);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}
    >
      {/* Subtle gold halos */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full blur-[160px] opacity-30" style={{ background: "#D4A83A" }} />
        <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full blur-[140px] opacity-22" style={{ background: "#C8A84B" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            eyebrow={p.eyebrow}
            title={<>{p.title1}<br /><em className="text-gold not-italic">{p.titleHighlight}</em></>}
            subtitle={p.subtitle}
          />
          <Button href="/realisations" variant="dark" size="md" className="shrink-0 self-start md:self-auto">
            {p.seeAllBtn}
          </Button>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preview.map((project, i) => (
            <FadeInItem key={project.id}>
              <article
                className={`group relative bg-white rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={{ boxShadow: "0 4px 20px rgba(180,140,20,0.12), 0 1px 3px rgba(0,0,0,0.06)" }}
              >
                {/* Full-card link (z-0) */}
                <Link
                  href={`/realisations/${project.id}`}
                  className="absolute inset-0 z-0"
                  aria-label={`Voir l'étude de cas : ${project.title}`}
                />

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden pointer-events-none">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Categories */}
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    {project.category.slice(0, 2).map((cat) => (
                      <Badge key={cat} variant="dark" className="text-[10px]">
                        {(p.categories as Record<string, string>)[cat] ?? cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-1 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs text-text-muted mb-3">{project.subtitle}</p>
                  <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags + external link */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-body font-medium bg-gold-pale text-gold-dark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex items-center gap-1 text-[10px] font-body text-text-muted hover:text-gold transition-colors opacity-0 group-hover:opacity-100"
                        aria-label={`${p.visit} ${project.title}`}
                      >
                        <ExternalLink size={11} />
                        {p.viewSite}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* CTA bottom */}
        <FadeIn delay={0.3} className="mt-12 text-center">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-colors group"
          >
            {p.seeAll}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
