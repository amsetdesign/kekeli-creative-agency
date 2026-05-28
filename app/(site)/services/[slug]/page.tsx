import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Camera, TrendingUp, Aperture, Code2, Share2, Mic2, Palette, ShoppingBag,
  ChevronRight, Check, ArrowRight, type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import FadeIn from "@/components/animations/FadeIn";
import ServiceFaqAccordion from "@/components/services/ServiceFaqAccordion";

const iconMap: Record<string, LucideIcon> = {
  Camera, TrendingUp, Aperture, Code2, Share2, Mic2, Palette, ShoppingBag,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return { title: "Service — KEKELI Creative Agency" };
  return {
    title: service.title,
    description: service.description,
    keywords: service.tags,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} — KEKELI Creative Agency`,
      description: service.description,
      url: `/services/${slug}`,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const serviceIndex = services.findIndex((s) => s.id === slug);
  const Icon = iconMap[service.icon] ?? Camera;
  const related = services.filter((s) => service.relatedIds.includes(s.id));

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden bg-[#0C0B09]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09] via-[#0C0B09]/70 to-[#0C0B09]/30" />
        </div>

        {/* Gold glow */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(200,168,75,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <FadeIn direction="down" className="mb-10">
            <nav className="flex items-center gap-1.5 text-xs font-body text-white/40" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#C8A84B] transition-colors">Accueil</Link>
              <ChevronRight size={11} />
              <Link href="/services" className="hover:text-[#C8A84B] transition-colors">Services</Link>
              <ChevronRight size={11} />
              <span className="text-white/70">{service.title}</span>
            </nav>
          </FadeIn>

          <FadeIn direction="up" delay={0.08}>
            {/* Service number + icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center">
                <Icon size={24} className="text-[#C8A84B]" />
              </div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A84B]/70">
                Service {String(serviceIndex + 1).padStart(2, "0")}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
              {service.title}
            </h1>
            <p className="font-body text-lg text-white/55 mb-6 max-w-xl leading-relaxed">
              {service.highlight}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[11px] font-body font-semibold uppercase tracking-wider border border-[#C8A84B]/30 text-[#C8A84B]/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hero CTA */}
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 bg-[#C8A84B] text-black px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-[#b8963d] transition-colors"
            >
              Brief Express — 30 min
              <ArrowRight size={15} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── OVERVIEW ──────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — description + deliverables */}
            <FadeIn direction="right">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-4">
                En détail
              </p>
              <h2 className="font-display text-3xl text-[#0C0B09] mb-5">
                Ce que comprend<br />ce service
              </h2>
              <p className="font-body text-[#78716C] leading-relaxed mb-8">
                {service.description}
              </p>

              <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-[#44403C] mb-4">
                Ce que vous recevez
              </p>
              <ul className="space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-[#C8A84B]" />
                    </span>
                    <span className="font-body text-sm text-[#44403C] leading-snug">{d}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Right — image */}
            <FadeIn direction="left" delay={0.12}>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden [box-shadow:0_24px_60px_rgba(12,11,9,0.14)]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent" />
                </div>
                {/* Decorative number */}
                <span
                  className="absolute -top-8 -right-4 font-display font-bold text-[#C8A84B]/8 select-none pointer-events-none leading-none"
                  style={{ fontSize: "8rem" }}
                  aria-hidden
                >
                  {String(serviceIndex + 1).padStart(2, "0")}
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section className="bg-[#F5F3EE] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn direction="up" className="mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-3">
              Notre processus
            </p>
            <h2 className="font-display text-3xl text-[#0C0B09]">
              Comment nous travaillons
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6">
            {service.process.map((step, i) => (
              <FadeIn key={step.step} direction="up" delay={i * 0.08}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex w-10 h-10 rounded-full bg-white border-2 border-[#C8A84B]/40 text-[#C8A84B] font-display font-bold text-sm items-center justify-center shrink-0 [box-shadow:0_2px_8px_rgba(200,168,75,0.15)]">
                      {step.step}
                    </span>
                    {/* Connector (only between steps on desktop) */}
                    {i < service.process.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-[#C8A84B]/25 to-transparent" />
                    )}
                  </div>
                  <h4 className="font-display text-sm font-semibold text-[#0C0B09] mb-2">
                    {step.title}
                  </h4>
                  <p className="font-body text-xs text-[#78716C] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn direction="up" className="mb-10 text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-3">
              FAQ
            </p>
            <h2 className="font-display text-3xl text-[#0C0B09]">
              Questions fréquentes
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <ServiceFaqAccordion faqs={service.faq} />
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-[#0C0B09] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-4">
              Prêt à démarrer ?
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Lançons votre projet{" "}
              <em className="text-[#C8A84B] not-italic">ensemble</em>
            </h2>
            <p className="font-body text-white/55 mb-8 max-w-md mx-auto leading-relaxed">
              Réponse sous 24h. Brief gratuit, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/brief"
                className="inline-flex items-center gap-2 bg-[#C8A84B] text-black px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-[#b8963d] transition-colors"
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
          </FadeIn>
        </div>
      </section>

      {/* ── RELATED SERVICES ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-[#F5F3EE] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <FadeIn direction="up" className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-2">
                  Aller plus loin
                </p>
                <h2 className="font-display text-2xl text-[#0C0B09]">
                  Nos autres services
                </h2>
              </div>
              <Link
                href="/services"
                className="font-body text-sm text-[#C8A84B] hover:text-[#b8963d] transition-colors flex items-center gap-1 shrink-0"
              >
                Tous les services <ArrowRight size={14} />
              </Link>
            </FadeIn>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((rel, i) => {
                const RelIcon = iconMap[rel.icon] ?? Camera;
                return (
                  <FadeIn key={rel.id} direction="up" delay={i * 0.1}>
                    <Link
                      href={`/services/${rel.id}`}
                      className="group block bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:[box-shadow:0_8px_32px_rgba(12,11,9,0.1)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={rel.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center">
                            <RelIcon size={14} className="text-[#C8A84B]" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="font-display text-base font-semibold text-[#0C0B09] group-hover:text-[#C8A84B] transition-colors mb-1">
                          {rel.title}
                        </p>
                        <p className="font-body text-xs text-[#78716C] leading-snug">
                          {rel.shortDesc}
                        </p>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="bg-[#FAFAF8] border-t border-[#E7E5E4] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-body text-sm text-[#78716C] hover:text-[#0C0B09] transition-colors"
          >
            ← Retour aux services
          </Link>
        </div>
      </div>
    </>
  );
}
