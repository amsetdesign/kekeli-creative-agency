"use client";

import Link from "next/link";
import {
  ChevronRight, Check,
  Palette, Music2, Video, Camera, Users, TrendingUp,
  Headphones, Target, Globe, Coins,
  Building2, Monitor, MessageSquare, Megaphone, Film, GraduationCap, Smartphone,
  Sparkles, BarChart2, Rocket, Wand2, Award,
  Star, Search, Share2, Map,
} from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/providers/LanguageProvider";

const ARTISTES_SERVICES_FR = [
  { icon: Palette,    label: "Direction Artistique",    href: "/artistes/direction",      color: "#8B5CF6", desc: "Identité artistique & univers visuel" },
  { icon: Music2,     label: "Branding Artiste",        href: "/artistes/branding",       color: "#C8A84B", desc: "Logo, covers, templates réseaux" },
  { icon: Video,      label: "Clips & Vidéos",          href: "/artistes/clips",          color: "#EC4899", desc: "Clips pro, visualizers, reels" },
  { icon: Camera,     label: "Photo Shooting",          href: "/artistes/photo",          color: "#0891B2", desc: "Portraits, cover artworks, contenu" },
  { icon: Users,      label: "Accompagnement Artistique", href: "/artistes/accompagnement", color: "#10B981", desc: "Coaching carrière & stratégie" },
  { icon: TrendingUp, label: "Stratégie Digitale",      href: "/artistes/strategie",      color: "#3B82F6", desc: "Lancement album, campagnes digitales" },
  { icon: Headphones, label: "Distribution Musicale",   href: "/artistes/distribution",   color: "#C8A84B", desc: "Spotify, Apple Music, Boomplay…" },
  { icon: Target,     label: "Marketing Digital",       href: "/artistes/marketing",      color: "#F97316", desc: "Croissance audience, SEO, TikTok" },
  { icon: Globe,      label: "Identité Digitale",       href: "/artistes/identite",       color: "#EC4899", desc: "Site web artiste, EPK, newsletter" },
  { icon: Coins,      label: "Monétisation & Business", href: "/artistes/monetisation",   color: "#16A34A", desc: "Revenus, droits d'auteur, sponsors" },
];

const ARTISTES_SERVICES_EN = [
  { icon: Palette,    label: "Artistic Direction",      href: "/artistes/direction",      color: "#8B5CF6", desc: "Artistic identity & visual universe" },
  { icon: Music2,     label: "Artist Branding",         href: "/artistes/branding",       color: "#C8A84B", desc: "Logo, covers, social templates" },
  { icon: Video,      label: "Clips & Videos",          href: "/artistes/clips",          color: "#EC4899", desc: "Pro clips, visualizers, reels" },
  { icon: Camera,     label: "Photo Shooting",          href: "/artistes/photo",          color: "#0891B2", desc: "Portraits, cover artworks, content" },
  { icon: Users,      label: "Artist Coaching",         href: "/artistes/accompagnement", color: "#10B981", desc: "Career coaching & strategy" },
  { icon: TrendingUp, label: "Digital Strategy",        href: "/artistes/strategie",      color: "#3B82F6", desc: "Album launch, digital campaigns" },
  { icon: Headphones, label: "Music Distribution",      href: "/artistes/distribution",   color: "#C8A84B", desc: "Spotify, Apple Music, Boomplay…" },
  { icon: Target,     label: "Digital Marketing",       href: "/artistes/marketing",      color: "#F97316", desc: "Audience growth, SEO, TikTok" },
  { icon: Globe,      label: "Digital Identity",        href: "/artistes/identite",       color: "#EC4899", desc: "Artist website, EPK, newsletter" },
  { icon: Coins,      label: "Monetization & Business", href: "/artistes/monetisation",   color: "#16A34A", desc: "Revenue, copyright, sponsors" },
];

const ARTISTES_IA_FR = [
  { icon: Sparkles,  label: "Vision de Carrière",   href: "/artistes/vision",              color: "#C8A84B", desc: "Analyse IA · Gratuit" },
  { icon: BarChart2, label: "Analyse Réseaux",      href: "/artistes/analyse-reseaux",     color: "#D946EF", desc: "Audit IA · Gratuit" },
  { icon: Rocket,    label: "Stratégie Lancement",  href: "/artistes/strategie-lancement", color: "#F43F5E", desc: "Plan 90j · Gratuit" },
  { icon: Wand2,     label: "Moodboard IA",         href: "/artistes/moodboard",           color: "#A855F7", desc: "Direction visuelle · Gratuit" },
  { icon: Award,     label: "Certification",        href: "/certification",                color: "#C8A84B", desc: "Badge officiel · Gratuit" },
];

const ARTISTES_IA_EN = [
  { icon: Sparkles,  label: "Career Vision",        href: "/artistes/vision",              color: "#C8A84B", desc: "AI Analysis · Free" },
  { icon: BarChart2, label: "Network Analysis",     href: "/artistes/analyse-reseaux",     color: "#D946EF", desc: "AI Audit · Free" },
  { icon: Rocket,    label: "Launch Strategy",      href: "/artistes/strategie-lancement", color: "#F43F5E", desc: "90-day plan · Free" },
  { icon: Wand2,     label: "AI Moodboard",         href: "/artistes/moodboard",           color: "#A855F7", desc: "Visual direction · Free" },
  { icon: Award,     label: "Certification",        href: "/certification",                color: "#C8A84B", desc: "Official badge · Free" },
];

const ENT_SERVICES_FR = [
  { icon: Building2,     label: "Identité & Branding",       href: "/entreprises/branding",      color: "#1E40AF", desc: "Logo, charte graphique, templates" },
  { icon: Monitor,       label: "Site Web & Digitalisation", href: "/entreprises/site-web",      color: "#0EA5E9", desc: "Vitrine, e-commerce, espace client" },
  { icon: MessageSquare, label: "Community Management",      href: "/entreprises/community",     color: "#7C3AED", desc: "Réseaux sociaux & création contenu" },
  { icon: Megaphone,     label: "Campagnes Publicitaires",   href: "/entreprises/publicite",     color: "#F97316", desc: "Facebook, Instagram, Google Ads" },
  { icon: TrendingUp,    label: "Stratégie & Croissance",    href: "/entreprises/strategie",     color: "#059669", desc: "Audit digital, growth roadmap" },
  { icon: Film,          label: "Photo & Vidéo Business",    href: "/entreprises/photo-video",   color: "#EC4899", desc: "Shooting corporate, reels, pubs" },
  { icon: GraduationCap, label: "Business Coach 2 Mois",     href: "/entreprises/coaching",      color: "#0891B2", desc: "Formation & accompagnement digital" },
  { icon: Smartphone,    label: "Applications Mobile & Web", href: "/entreprises/applications",  color: "#6366F1", desc: "iOS, Android, PWA, dashboards" },
];

const ENT_SERVICES_EN = [
  { icon: Building2,     label: "Identity & Branding",       href: "/entreprises/branding",      color: "#1E40AF", desc: "Logo, brand guidelines, templates" },
  { icon: Monitor,       label: "Website & Digitalization",  href: "/entreprises/site-web",      color: "#0EA5E9", desc: "Showcase, e-commerce, client space" },
  { icon: MessageSquare, label: "Community Management",      href: "/entreprises/community",     color: "#7C3AED", desc: "Social media & content creation" },
  { icon: Megaphone,     label: "Advertising Campaigns",     href: "/entreprises/publicite",     color: "#F97316", desc: "Facebook, Instagram, Google Ads" },
  { icon: TrendingUp,    label: "Strategy & Growth",         href: "/entreprises/strategie",     color: "#059669", desc: "Digital audit, growth roadmap" },
  { icon: Film,          label: "Business Photo & Video",    href: "/entreprises/photo-video",   color: "#EC4899", desc: "Corporate shooting, reels, ads" },
  { icon: GraduationCap, label: "Business Coach 2 Months",   href: "/entreprises/coaching",      color: "#0891B2", desc: "Training & digital support" },
  { icon: Smartphone,    label: "Mobile & Web Apps",         href: "/entreprises/applications",  color: "#6366F1", desc: "iOS, Android, PWA, dashboards" },
];

const ENT_IA_FR = [
  { icon: Star,   label: "Brand Score",            href: "/entreprises/brand-score",      color: "#C8A84B", desc: "Image de marque · Gratuit" },
  { icon: Search, label: "Audit Visibilité",       href: "/entreprises/audit-visibilite", color: "#3B82F6", desc: "Présence digitale · Gratuit" },
  { icon: Share2, label: "Réseau Idéal",           href: "/entreprises/reseau-ideal",     color: "#8B5CF6", desc: "Quel réseau pour toi · Gratuit" },
  { icon: Map,    label: "Diagnostic Entreprise",  href: "/entreprises/diagnostic",       color: "#10B981", desc: "Que manque-t-il ? · Gratuit" },
];

const ENT_IA_EN = [
  { icon: Star,   label: "Brand Score",            href: "/entreprises/brand-score",      color: "#C8A84B", desc: "Brand image · Free" },
  { icon: Search, label: "Visibility Audit",       href: "/entreprises/audit-visibilite", color: "#3B82F6", desc: "Digital presence · Free" },
  { icon: Share2, label: "Ideal Network",          href: "/entreprises/reseau-ideal",     color: "#8B5CF6", desc: "Which network for you · Free" },
  { icon: Map,    label: "Business Diagnostic",    href: "/entreprises/diagnostic",       color: "#10B981", desc: "What's missing? · Free" },
];

function ServiceCard({ icon: Icon, label, href, color, desc }: { icon: React.ElementType; label: string; href: string; color: string; desc: string }) {
  return (
    <Link href={href} className="group flex items-start gap-3 p-4 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-0.5"
      style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: `${color}18` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <p className="font-body text-sm font-semibold text-[#0C0B09] leading-tight mb-0.5">{label}</p>
        <p className="font-body text-xs text-[#78716C]">{desc}</p>
      </div>
    </Link>
  );
}

function IACard({ icon: Icon, label, href, color, desc }: { icon: React.ElementType; label: string; href: string; color: string; desc: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150 hover:bg-white/[0.06]"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
        <Icon size={14} style={{ color }} />
      </div>
      <div>
        <p className="font-body text-sm font-semibold text-white/90 leading-tight">{label}</p>
        <p className="font-body text-[11px] text-white/40">{desc}</p>
      </div>
    </Link>
  );
}

export default function ServicesContent() {
  const tr = useT();
  const s = tr.pages.services;
  const { locale } = useLanguage();

  const artisteServices = locale === "fr" ? ARTISTES_SERVICES_FR : ARTISTES_SERVICES_EN;
  const artisteIA = locale === "fr" ? ARTISTES_IA_FR : ARTISTES_IA_EN;
  const entServices = locale === "fr" ? ENT_SERVICES_FR : ENT_SERVICES_EN;
  const entIA = locale === "fr" ? ENT_IA_FR : ENT_IA_EN;

  const plans = [
    { name: s.starterLabel, price: s.starterPrice, currency: s.starterCurrency, desc: s.starterDesc, features: s.starterFeatures as unknown as string[], cta: s.startBtn,     highlight: false },
    { name: s.proLabel,     price: s.proPrice,     currency: s.starterCurrency, desc: s.proDesc,     features: s.proFeatures     as unknown as string[], cta: s.chooseProBtn, highlight: true  },
    { name: s.customLabel,  price: s.customPrice,  currency: "",                desc: s.customDesc,  features: s.customFeatures  as unknown as string[], cta: s.contactBtn,   highlight: false },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25" style={{ background: "#6D28D9" }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-20" style={{ background: "#C8A84B" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(220,210,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">{s.breadHome}</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(220,210,255,0.70)" }}>Services</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up">
            <SectionHeader
              eyebrow={s.eyebrow}
              title={<>{s.heroTitle1}<br /><em className="text-gold not-italic">{s.heroTitleHL}</em></>}
              subtitle={s.intro}
              light
            />
          </FadeIn>
          <FadeIn direction="up" delay={0.2} className="flex flex-wrap gap-3 mt-8">
            <Button href="/artistes" variant="outline-gold" size="sm">{s.artistsTab}</Button>
            <Button href="/entreprises" variant="gold" size="sm">{s.companiesTab}</Button>
          </FadeIn>
        </div>
      </section>

      {/* ARTISTES */}
      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-10">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#8B5CF6] mb-2">{s.artistsEyebrow}</p>
                <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">
                  {s.artistsTagline1} <span style={{ color: "#C8A84B" }}>{s.artistsTaglineHL}</span> {s.artistsTagline2}
                </h2>
                <p className="font-body text-base text-[#78716C] mt-2 max-w-lg">{s.artistsDesc}</p>
              </div>
              <Link href="/artistes" className="shrink-0 font-body text-sm font-semibold text-[#8B5CF6] hover:underline flex items-center gap-1">
                {s.seeArtists} <ChevronRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {artisteServices.map((sv) => (
              <FadeIn key={sv.href} direction="up">
                <ServiceCard {...sv} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IA ARTISTES */}
      <section className="py-16 bg-[#0C0B09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={16} className="text-gold" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold">{s.artistsIAEyebrow}</p>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-white">
              {s.artistsIATitle1} <em className="not-italic text-gold">{s.artistsIATitleHL}</em>
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {artisteIA.map((sv) => <IACard key={sv.href} {...sv} />)}
          </div>
        </div>
      </section>

      {/* ENTREPRISES */}
      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-10">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#1E40AF] mb-2">{s.companiesEyebrow}</p>
                <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">
                  {s.companiesTagline1} <span style={{ color: "#0EA5E9" }}>{s.companiesTaglineHL}</span>
                </h2>
                <p className="font-body text-base text-[#78716C] mt-2 max-w-lg">{s.companiesDesc}</p>
              </div>
              <Link href="/entreprises" className="shrink-0 font-body text-sm font-semibold text-[#1E40AF] hover:underline flex items-center gap-1">
                {s.seeCompanies} <ChevronRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {entServices.map((sv) => (
              <FadeIn key={sv.href} direction="up">
                <ServiceCard {...sv} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IA ENTREPRISES */}
      <section className="py-16 bg-[#050A14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={16} style={{ color: "#3B82F6" }} />
              <p className="font-body text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#3B82F6" }}>{s.companiesIAEyebrow}</p>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-white">
              {s.companiesIATitle1} <em className="not-italic" style={{ color: "#0EA5E9" }}>{s.companiesIATitleHL}</em>
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {entIA.map((sv) => <IACard key={sv.href} {...sv} />)}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <SectionHeader
              centered
              eyebrow={s.pricingTarifs}
              title={<>{s.pricingTitle1}<br /><em className="text-gold not-italic">{s.pricingTitleHL}</em></>}
              subtitle={s.pricingSubtitle}
            />
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <FadeInItem key={plan.name}>
                <div className={`relative flex flex-col h-full rounded-2xl border-2 p-8 ${plan.highlight ? "border-gold bg-bg-primary [box-shadow:var(--shadow-gold)]" : "border-border bg-bg-primary [box-shadow:var(--shadow-sm)]"}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="gold">{s.recommended}</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-semibold text-text-primary mb-2">{plan.name}</h3>
                    <p className="font-body text-sm text-text-muted mb-4">{plan.desc}</p>
                    <p className="font-body font-semibold text-text-primary">
                      {plan.price}{" "}
                      {plan.currency && <span className="text-sm font-normal text-text-muted">{plan.currency}</span>}
                    </p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={14} className="text-gold mt-0.5 shrink-0" />
                        <span className="font-body text-sm text-text-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant={plan.highlight ? "gold" : "outline-gold"} size="md" className="w-full justify-center">
                    {plan.cta}
                  </Button>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn delay={0.4} className="text-center mt-10">
            <p className="font-body text-sm text-text-muted">
              {s.customCta}{" "}
              <Link href="/contact" className="text-gold hover:text-gold-dark transition-colors font-medium">
                {s.customCtaLink}
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
