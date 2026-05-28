"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Lightbulb, Palette, MapPin, Zap } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/providers/LanguageProvider";

const TEAM_FR = [
  { role: "Direction créative", desc: "Vision artistique et direction de l'ensemble des productions visuelles de l'agence.", skills: ["Branding", "Direction artistique", "Stratégie créative"] },
  { role: "Stratégie digitale", desc: "Élaboration des plans de communication et supervision des campagnes publicitaires.", skills: ["SEO/SEA", "Analytics", "Content strategy"] },
  { role: "Développement", desc: "Conception et développement des solutions web et mobiles performantes.", skills: ["Next.js", "React", "Mobile"] },
  { role: "Production visuelle", desc: "Photo et vidéo événementielles, shootings et montages pour tous les supports.", skills: ["Photographie", "Vidéo", "Post-production"] },
];

const TEAM_EN = [
  { role: "Creative Direction", desc: "Artistic vision and direction of all visual productions at the agency.", skills: ["Branding", "Artistic direction", "Creative strategy"] },
  { role: "Digital Strategy", desc: "Development of communication plans and supervision of advertising campaigns.", skills: ["SEO/SEA", "Analytics", "Content strategy"] },
  { role: "Development", desc: "Design and development of high-performance web and mobile solutions.", skills: ["Next.js", "React", "Mobile"] },
  { role: "Visual Production", desc: "Event photo and video, shoots and editing for all media.", skills: ["Photography", "Video", "Post-production"] },
];

const TEAM_IMAGES = [
  { image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&q=80&auto=format&fit=crop&face", imageAlt: "Directrice créative KEKELI Creative Agency" },
  { image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&q=80&auto=format&fit=crop&face", imageAlt: "Stratège digitale KEKELI Creative Agency" },
  { image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&q=80&auto=format&fit=crop&face", imageAlt: "Développeur KEKELI Creative Agency" },
  { image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&q=80&auto=format&fit=crop&face", imageAlt: "Photographe KEKELI Creative Agency" },
];

const VALUES_FR = [
  { icon: Lightbulb, emoji: "💡", title: "Lumière", desc: "Révéler le potentiel de chaque projet. Donner à votre marque la visibilité qu'elle mérite." },
  { icon: Palette,   emoji: "🎨", title: "Créativité", desc: "Des idées originales ancrées dans la culture africaine, avec un regard global et moderne." },
  { icon: MapPin,    emoji: "📍", title: "Proximité", desc: "Une agence locale qui comprend le marché dakarois et les codes culturels de l'Afrique de l'Ouest." },
  { icon: Zap,       emoji: "🚀", title: "Impact", desc: "Des résultats mesurables. Chaque campagne est pilotée par les données et orientée performance." },
];

const VALUES_EN = [
  { icon: Lightbulb, emoji: "💡", title: "Light", desc: "Revealing the potential of every project. Giving your brand the visibility it deserves." },
  { icon: Palette,   emoji: "🎨", title: "Creativity", desc: "Original ideas rooted in African culture, with a global and modern perspective." },
  { icon: MapPin,    emoji: "📍", title: "Proximity", desc: "A local agency that understands the Dakar market and the cultural codes of West Africa." },
  { icon: Zap,       emoji: "🚀", title: "Impact", desc: "Measurable results. Every campaign is data-driven and performance-oriented." },
];

const STEPS_FR = [
  { number: "01", title: "Écoute", desc: "Nous prenons le temps de comprendre vos objectifs, votre audience et vos contraintes. Un brief approfondi est la base de tout projet réussi." },
  { number: "02", title: "Stratégie", desc: "Nous construisons un plan d'action sur-mesure : positionnement, canaux, calendrier et budgets — tout est planifié avant d'agir." },
  { number: "03", title: "Exécution", desc: "Notre équipe produit : visuels, contenus, développement, campagnes. Chaque livrable est contrôlé avant validation." },
  { number: "04", title: "Mesure", desc: "Nous analysons les performances, produisons des rapports clairs et ajustons en continu pour maximiser votre ROI." },
];

const STEPS_EN = [
  { number: "01", title: "Listen", desc: "We take the time to understand your goals, audience and constraints. A thorough brief is the foundation of every successful project." },
  { number: "02", title: "Strategy", desc: "We build a custom action plan: positioning, channels, timeline and budgets — everything planned before we act." },
  { number: "03", title: "Execution", desc: "Our team produces: visuals, content, development, campaigns. Every deliverable is checked before sign-off." },
  { number: "04", title: "Measure", desc: "We analyze performance, produce clear reports and continuously adjust to maximize your ROI." },
];

export default function AProposContent() {
  const tr = useT();
  const a = tr.pages.about;
  const { locale } = useLanguage();
  const team = (locale === "fr" ? TEAM_FR : TEAM_EN).map((t, i) => ({ ...t, ...TEAM_IMAGES[i] }));
  const values = locale === "fr" ? VALUES_FR : VALUES_EN;
  const steps = locale === "fr" ? STEPS_FR : STEPS_EN;

  return (
    <>
      {/* SECTION 1 : IDENTITY */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25" style={{ background: "#6D28D9" }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[130px] opacity-20" style={{ background: "#C8A84B" }} />
        </div>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none leading-none" style={{ fontSize: "40vw", color: "rgba(200,168,75,0.06)" }} aria-hidden>K</span>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="down" className="mb-10">
            <nav className="flex items-center justify-center gap-2 text-xs font-body" style={{ color: "rgba(220,210,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">{a.breadHome}</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(220,210,255,0.70)" }}>{a.breadAbout}</span>
            </nav>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">{a.identityEyebrow}</p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-tight mb-8">KEKELI</h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="inline-block rounded-2xl px-8 py-5 mb-10" style={{ background: "rgba(200,168,75,0.10)", border: "1px solid rgba(200,168,75,0.30)" }}>
              <p className="font-display text-2xl italic text-gold mb-1">{a.kekeliMeaning}</p>
              <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.55)" }}>{a.kekeliLang}</p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="font-body text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(220,210,255,0.70)" }}>
              {a.kekeliPara}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 2 : HISTORY */}
      <section className="py-24 bg-bg-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden [box-shadow:var(--shadow-md)]">
                <Image src="/images/equipe-kekeli.jpg" alt="Équipe créative au travail — KEKELI Creative Agency" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.15}>
              <SectionHeader
                eyebrow={a.historyEyebrow}
                title={<>{a.historyTitle1}<br /><em className="text-gold not-italic">{a.historyTitleHL}</em></>}
                subtitle={a.historyP1}
              />
              <div className="mt-6 space-y-4">
                <p className="font-body text-base text-text-muted leading-relaxed">{a.historyP2}</p>
                <p className="font-body text-base text-text-muted leading-relaxed">{a.historyP3}</p>
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="gold" size="md">{a.workTogether}</Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 3 : TEAM */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <SectionHeader
              centered
              eyebrow={a.teamEyebrow}
              title={<>{a.teamTitle1}<br /><em className="text-gold not-italic">{a.teamTitleHL}</em></>}
              subtitle={a.teamSubtitle}
            />
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <FadeInItem key={member.role}>
                <div className="group bg-bg-primary rounded-2xl border border-border overflow-hidden [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={member.image} alt={member.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-text-primary mb-2">{member.role}</h3>
                    <p className="font-body text-sm text-text-muted leading-relaxed mb-4">{member.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded-full text-[10px] font-body font-medium bg-purple-pale text-purple">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* SECTION 4 : VALUES */}
      <section className="py-24" style={{ background: "var(--gradient-teaser)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <SectionHeader centered eyebrow={a.valuesEyebrow} title={<>{a.valuesTitle1} <em className="text-gold not-italic">{a.valuesTitleHL}</em></>} />
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ emoji, title, desc }) => (
              <FadeInItem key={title}>
                <div className="bg-bg-primary rounded-2xl border border-border p-7 [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <div className="text-3xl mb-4">{emoji}</div>
                  <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">{title}</h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">{desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* SECTION 5 : PROCESS */}
      <section className="py-24 bg-bg-dark">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-16">
            <SectionHeader centered light eyebrow={a.processEyebrow} title={<>{a.processTitle1} <em className="text-gold not-italic">{a.processTitleHL}</em></>} subtitle={a.processSubtitle} />
          </FadeIn>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <FadeInItem key={step.number}>
                  <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div className="relative w-16 h-16 rounded-full border-2 border-gold bg-bg-dark flex items-center justify-center mb-6 z-10">
                      <span className="font-display text-xl font-bold text-gold">{step.number}</span>
                    </div>
                    {i < steps.length - 1 && <div className="lg:hidden absolute top-8 left-1/2 translate-x-6 w-px h-full bg-gold/20" />}
                    <h3 className="font-display text-2xl font-semibold text-text-on-dark mb-3">{step.title}</h3>
                    <p className="font-body text-sm text-text-on-dark/60 leading-relaxed">{step.desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-16" />
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-primary text-center">
        <FadeIn direction="up">
          <div className="max-w-2xl mx-auto px-4">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">{a.readyCta}</p>
            <h2 className="font-display text-4xl text-text-primary mb-6">
              {a.readyTitle1} <em className="text-gold not-italic">{a.readyTitleHL}</em> {a.readyTitle2}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact" variant="gold" size="lg">{a.contactBtn}</Button>
              <Button href="/sondage" variant="outline-purple" size="lg">{a.auditBtn}</Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
