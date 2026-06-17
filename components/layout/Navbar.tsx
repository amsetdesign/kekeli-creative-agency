"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Menu, X, UserCircle, ChevronDown,
  Palette, Music2, Video, Camera, Users, TrendingUp,
  Headphones, Target, Globe, Coins, Sparkles, BarChart2, Rocket, Award, Wand2,
  Layers, Building2, Monitor, MessageSquare, Megaphone, Film, GraduationCap,
  Star, Search, Share2, Map, Smartphone, Shield, Briefcase,
} from "lucide-react";
import { clsx } from "clsx";
import Button from "@/components/ui/Button";
import LangSwitch from "@/components/ui/LangSwitch";
import Image from "next/image";
import { useT } from "@/hooks/useT";

/* ── Static data (icons, hrefs, colors — no text) ────── */

// 6 core artiste services shown in the mega menu
const SERVICES_STATIC = [
  { icon: Palette,    href: "/artistes/direction",      color: "#8B5CF6",  tk: "artistDir" },
  { icon: Music2,     href: "/artistes/branding",       color: "#C8A84B",  tk: "artistBranding" },
  { icon: Video,      href: "/artistes/clips",          color: "#8B5CF6",  tk: "artistClips" },
  { icon: Headphones, href: "/artistes/distribution",   color: "#C8A84B",  tk: "artistDist" },
  { icon: Target,     href: "/artistes/marketing",      color: "#C8A84B",  tk: "artistMarketing" },
  { icon: Users,      href: "/artistes/accompagnement", color: "#10B981",  tk: "artistCoaching" },
] as const;

// Full artiste services list for mobile accordion
const SERVICES_ALL_STATIC = [
  { icon: Palette,    href: "/artistes/direction",      color: "#8B5CF6",  tk: "artistDir" },
  { icon: Music2,     href: "/artistes/branding",       color: "#C8A84B",  tk: "artistBranding" },
  { icon: Video,      href: "/artistes/clips",          color: "#8B5CF6",  tk: "artistClips" },
  { icon: Camera,     href: "/artistes/photo",          color: "#A78BFA",  tk: "artistPhoto" },
  { icon: Users,      href: "/artistes/accompagnement", color: "#10B981",  tk: "artistCoaching" },
  { icon: TrendingUp, href: "/artistes/strategie",      color: "#8B5CF6",  tk: "artistStrategy" },
  { icon: Headphones, href: "/artistes/distribution",   color: "#C8A84B",  tk: "artistDist" },
  { icon: Target,     href: "/artistes/marketing",      color: "#C8A84B",  tk: "artistMarketing" },
  { icon: Globe,      href: "/artistes/identite",       color: "#8B5CF6",  tk: "artistDigital" },
  { icon: Coins,      href: "/artistes/monetisation",   color: "#C8A84B",  tk: "artistMonetize" },
] as const;

const OUTILS_IA_STATIC = [
  { icon: Sparkles,  href: "/artistes/vision",              color: "#C8A84B", tk: "toolVision" },
  { icon: BarChart2, href: "/artistes/analyse-reseaux",     color: "#8B5CF6", tk: "toolAnalyse" },
  { icon: Rocket,    href: "/artistes/strategie-lancement", color: "#8B5CF6", tk: "toolLaunch" },
  { icon: Wand2,     href: "/artistes/moodboard",           color: "#A78BFA", tk: "toolMoodboard" },
  { icon: Award,     href: "/certification",                color: "#C8A84B", tk: "toolCertif" },
] as const;

// 5 core entreprise services shown in the mega menu
const ENT_SERVICES_STATIC = [
  { icon: Building2,     href: "/entreprises/branding",    color: "#1E40AF", tk: "companyBranding" },
  { icon: Monitor,       href: "/entreprises/site-web",    color: "#0EA5E9", tk: "companySite" },
  { icon: MessageSquare, href: "/entreprises/community",   color: "#0EA5E9", tk: "companyCM" },
  { icon: Megaphone,     href: "/entreprises/publicite",   color: "#1E40AF", tk: "companyAds" },
  { icon: Film,          href: "/entreprises/photo-video", color: "#0EA5E9", tk: "companyPhotoVideo" },
] as const;

// Full entreprise services list for mobile accordion
const ENT_SERVICES_ALL_STATIC = [
  { icon: Building2,     href: "/entreprises/branding",    color: "#1E40AF", tk: "companyBranding" },
  { icon: Monitor,       href: "/entreprises/site-web",    color: "#0EA5E9", tk: "companySite" },
  { icon: MessageSquare, href: "/entreprises/community",   color: "#0EA5E9", tk: "companyCM" },
  { icon: Megaphone,     href: "/entreprises/publicite",   color: "#1E40AF", tk: "companyAds" },
  { icon: TrendingUp,    href: "/entreprises/strategie",   color: "#1E40AF", tk: "companyGrowth" },
  { icon: Film,          href: "/entreprises/photo-video", color: "#0EA5E9", tk: "companyPhotoVideo" },
  { icon: GraduationCap, href: "/entreprises/coaching",    color: "#1E40AF", tk: "companyCoach" },
  { icon: Smartphone,    href: "/entreprises/applications",color: "#0EA5E9", tk: "companyApps" },
] as const;

const ENT_OUTILS_IA_STATIC = [
  { icon: Star,   href: "/entreprises/brand-score",      color: "#C8A84B", tk: "toolBrandScore" },
  { icon: Search, href: "/entreprises/audit-visibilite", color: "#1E40AF", tk: "toolAudit" },
  { icon: Share2, href: "/entreprises/reseau-ideal",     color: "#0EA5E9", tk: "toolNetwork" },
  { icon: Map,    href: "/entreprises/diagnostic",       color: "#10B981", tk: "toolDiag" },
] as const;

const PERSO_SERVICES_STATIC = [
  { icon: Palette,    href: "/personnalites/personal-branding",   color: "#10B981", tk: "persoPersonalBranding" },
  { icon: Camera,     href: "/personnalites/image-digitale",      color: "#10B981", tk: "persoImageDigitale" },
  { icon: TrendingUp, href: "/personnalites/strategie-influence", color: "#10B981", tk: "persoStrategieInfluence" },
  { icon: Shield,     href: "/personnalites/gestion-reputation",  color: "#10B981", tk: "persoGestionReputation" },
] as const;

const AGENCE_STATIC = [
  { icon: Briefcase,  href: "/realisations", tk: "portfolio",   descTk: "portfolioNavDesc" },
  { icon: Layers,     href: "/experience",   tk: "aboutLabel",  descTk: "aboutDesc" },
  { icon: Globe,      href: "/impact",       tk: "impactLabel", descTk: "impactDesc" },
  { icon: Users,      href: "/a-propos",     tk: "teamLabel",   descTk: "teamDesc" },
  { icon: MessageSquare, href: "/blog",      tk: "blogLabel",   descTk: "blogDesc" },
] as const;

const AGENCE_PATHS = ["/experience", "/impact", "/a-propos", "/realisations", "/blog"];

function KekeliLogo({ isScrolled: _ }: { isScrolled: boolean }) {
  return (
    <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <div style={{ position: "relative", width: 160, height: 44 }}>
          <Image
            src="/images/logo-horizontal-light.png"
            alt="KEKELI Creative Agency"
            fill
            priority
            sizes="160px"
            style={{ objectFit: "contain", objectPosition: "left center" }}
          />
        </div>
      </motion.div>
    </Link>
  );
}

type ServiceItem = { icon: React.ElementType; href: string; color: string; label: string; desc: string };

function MegaMenu({ onClose, services, outiasIA, tr }: {
  onClose: () => void;
  services: ServiceItem[];
  outiasIA: ServiceItem[];
  tr: ReturnType<typeof useT>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-0 right-0 z-40"
      style={{ background: "#0C0B09", borderTop: "1px solid rgba(200,168,75,0.15)", borderBottom: "1px solid rgba(200,168,75,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 flex flex-col gap-5">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold mb-3 font-semibold">
                {tr.nav.artistServicesTitle}
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {services.map(({ icon: Icon, label, href, color, desc }) => (
                  <Link key={href} href={href} onClick={onClose}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-white/[0.05]">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-white/90 group-hover:text-white leading-tight">{label}</p>
                      <p className="font-body text-[10px] text-white/35">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/artistes" onClick={onClose}
                className="inline-flex items-center gap-1 mt-2 ml-3 font-body text-[11px] font-semibold transition-colors hover:opacity-80"
                style={{ color: "#C8A84B" }}>
                Voir tous les services artiste →
              </Link>
            </div>
            <div className="border-t border-white/08" />
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-white/30 mb-3 font-semibold flex items-center gap-2">
                <Sparkles size={9} style={{ color: "#C8A84B" }} />
                <span>{tr.nav.aiToolsFree}</span>
              </p>
              <div className="grid grid-cols-3 gap-0.5">
                {outiasIA.map(({ icon: Icon, label, href, color, desc }) => (
                  <Link key={href} href={href} onClick={onClose}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-white/[0.05]">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-white/90 group-hover:text-white leading-tight">{label}</p>
                      <p className="font-body text-[10px] text-white/35">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[280px] flex flex-col justify-end p-6"
              style={{ border: "1px solid rgba(200,168,75,0.15)" }}>
              <div className="absolute inset-0">
                <Image src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&q=80&auto=format&fit=crop"
                  alt="Artiste accompagné par KEKELI Creative Agency" fill className="object-cover" sizes="25vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,11,9,0.95) 40%, rgba(12,11,9,0.3) 100%)" }} />
              </div>
              <div className="relative z-10">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold font-semibold mb-2">
                  Accompagnement complet
                </p>
                <h3 className="font-display text-xl text-white mb-3 leading-tight">
                  {tr.nav.taglineArtists.split(",")[0]},<br />
                  <em className="not-italic text-gold">{tr.nav.taglineArtists.split(",")[1]?.trim() ?? tr.nav.taglineArtists}</em>
                </h3>
                <Link href="/artistes" onClick={onClose}
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-white/80 hover:text-gold transition-colors">
                  {tr.nav.seePageArtists}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EntreprisesMegaMenu({ onClose, services, outiasIA, tr }: {
  onClose: () => void;
  services: ServiceItem[];
  outiasIA: ServiceItem[];
  tr: ReturnType<typeof useT>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-0 right-0 z-40"
      style={{ background: "#0C0B09", borderTop: "1px solid rgba(200,168,75,0.15)", borderBottom: "1px solid rgba(200,168,75,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 flex flex-col gap-5">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold mb-3 font-semibold">
                {tr.nav.companyServicesTitle}
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {services.map(({ icon: Icon, label, href, color, desc }) => (
                  <Link key={href} href={href} onClick={onClose}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-white/[0.05]">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-white/90 group-hover:text-white leading-tight">{label}</p>
                      <p className="font-body text-[10px] text-white/35">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/entreprises" onClick={onClose}
                className="inline-flex items-center gap-1 mt-2 ml-3 font-body text-[11px] font-semibold transition-colors hover:opacity-80"
                style={{ color: "#C8A84B" }}>
                Voir tous les services entreprise →
              </Link>
            </div>
            <div className="border-t border-white/08" />
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-white/30 mb-3 font-semibold flex items-center gap-2">
                <Sparkles size={9} style={{ color: "#C8A84B" }} />
                <span>{tr.nav.aiToolsFree}</span>
              </p>
              <div className="grid grid-cols-4 gap-0.5">
                {outiasIA.map(({ icon: Icon, label, href, color, desc }) => (
                  <Link key={href} href={href} onClick={onClose}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-white/[0.05]">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-white/90 group-hover:text-white leading-tight">{label}</p>
                      <p className="font-body text-[10px] text-white/35">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[280px] flex flex-col justify-end p-6"
              style={{ border: "1px solid rgba(200,168,75,0.15)" }}>
              <div className="absolute inset-0">
                <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&q=80&auto=format&fit=crop"
                  alt="Entreprises accompagnées par KEKELI" fill className="object-cover" sizes="25vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,11,9,0.95) 40%, rgba(12,11,9,0.3) 100%)" }} />
              </div>
              <div className="relative z-10">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold font-semibold mb-2">
                  Solutions digitales
                </p>
                <h3 className="font-display text-xl text-white mb-3 leading-tight">
                  {tr.nav.taglineCompanies.split(",")[0]},<br />
                  <em className="not-italic text-gold">{tr.nav.taglineCompanies.split(",")[1]?.trim() ?? tr.nav.taglineCompanies}</em>
                </h3>
                <Link href="/entreprises" onClick={onClose}
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-white/80 hover:text-gold transition-colors">
                  {tr.nav.seePageCompanies}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PersonnalitesMegaMenu({ onClose, services, tr }: {
  onClose: () => void;
  services: ServiceItem[];
  tr: ReturnType<typeof useT>;
}) {
  const ACCENT = "#10B981";
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-0 right-0 z-40"
      style={{ background: "#0C0B09", borderTop: "1px solid rgba(16,185,129,0.15)", borderBottom: "1px solid rgba(16,185,129,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 flex flex-col gap-5">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] mb-3 font-semibold" style={{ color: ACCENT }}>
                {tr.nav.persoServicesTitle}
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {services.map(({ icon: Icon, label, href, color, desc }) => (
                  <Link key={href} href={href} onClick={onClose}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-white/[0.05]">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-white/90 group-hover:text-white leading-tight">{label}</p>
                      <p className="font-body text-[10px] text-white/35">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[200px] flex flex-col justify-end p-6"
              style={{ border: "1px solid rgba(16,185,129,0.20)", background: "linear-gradient(135deg, rgba(6,16,12,0.95) 0%, rgba(16,60,40,0.90) 100%)" }}>
              <div className="relative z-10">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: ACCENT }}>Personal Branding VIP</p>
                <h3 className="font-display text-xl text-white mb-3 leading-tight">
                  {tr.nav.taglinePersonnalites.split(",")[0]},<br />
                  <em className="not-italic" style={{ color: ACCENT }}>{tr.nav.taglinePersonnalites.split(",")[1]?.trim() ?? tr.nav.taglinePersonnalites}</em>
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Coachs", "PDG", "Politiciens", "Influenceurs"].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full font-body text-[10px] font-medium"
                      style={{ background: "rgba(16,185,129,0.15)", color: ACCENT, border: "1px solid rgba(16,185,129,0.25)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/personnalites" onClick={onClose}
                  className="inline-flex items-center gap-2 font-body text-sm font-medium transition-colors"
                  style={{ color: ACCENT }}>
                  {tr.nav.seePagePersonnalites}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AgenceDropdown({ onClose, agenceLinks }: {
  onClose: () => void;
  agenceLinks: { icon: React.ElementType; href: string; label: string; desc: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-40 w-60"
      style={{ background: "#0C0B09", border: "1px solid rgba(200,168,75,0.2)", borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }}
    >
      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
        style={{ background: "#0C0B09", border: "1px solid rgba(200,168,75,0.2)", borderBottom: "none", borderRight: "none" }} />
      <div className="p-1.5">
        {agenceLinks.map(({ icon: Icon, label, href, desc }) => (
          <Link key={href} href={href} onClick={onClose}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-white/[0.06]">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#C8A84B]/15">
              <Icon size={13} className="text-[#C8A84B]" />
            </div>
            <div>
              <p className="font-body text-xs font-semibold text-white/85 group-hover:text-white leading-tight">{label}</p>
              <p className="font-body text-[10px] text-white/30">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const tr = useT();

  const SERVICES = SERVICES_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[`${s.tk}Desc` as keyof typeof tr.nav] as string,
  }));
  const SERVICES_ALL = SERVICES_ALL_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[`${s.tk}Desc` as keyof typeof tr.nav] as string,
  }));
  const OUTILS_IA = OUTILS_IA_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[`${s.tk}Desc` as keyof typeof tr.nav] as string,
  }));
  const ENT_SERVICES = ENT_SERVICES_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[`${s.tk}Desc` as keyof typeof tr.nav] as string,
  }));
  const ENT_SERVICES_ALL = ENT_SERVICES_ALL_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[`${s.tk}Desc` as keyof typeof tr.nav] as string,
  }));
  const ENT_OUTILS_IA = ENT_OUTILS_IA_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[`${s.tk}Desc` as keyof typeof tr.nav] as string,
  }));
  const PERSO_SERVICES = PERSO_SERVICES_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[`${s.tk}Desc` as keyof typeof tr.nav] as string,
  }));
  const AGENCE_LINKS = AGENCE_STATIC.map((s) => ({
    ...s,
    label: tr.nav[s.tk as keyof typeof tr.nav] as string,
    desc:  tr.nav[s.descTk as keyof typeof tr.nav] as string,
  }));

  const navLinks = [
    { href: "/",               label: tr.nav.home },
    { href: "/artistes",       label: tr.nav.artists,        menu: "artistes" as const },
    { href: "/entreprises",    label: tr.nav.companies,       menu: "entreprises" as const },
    { href: "/personnalites",  label: tr.nav.personnalites,   menu: "personnalites" as const },
    { href: "/tarifs",         label: tr.nav.pricing },
    { href: "/a-propos",       label: tr.nav.agency,          menu: "agence" as const },
    { href: "/contact",        label: tr.nav.contact },
  ];

  const allArtisteServices = [...SERVICES_ALL, ...OUTILS_IA];
  const allEntServices     = [...ENT_SERVICES_ALL, ...ENT_OUTILS_IA];

  const [isScrolled, setIsScrolled]                         = useState(false);
  const [mobileOpen, setMobileOpen]                         = useState(false);
  const [megaOpen, setMegaOpen]                             = useState(false);
  const [entMegaOpen, setEntMegaOpen]                       = useState(false);
  const [persoMegaOpen, setPersoMegaOpen]                   = useState(false);
  const [agenceOpen, setAgenceOpen]                         = useState(false);
  const [mobileArtistesOpen, setMobileArtistesOpen]         = useState(false);
  const [mobileEntreprisesOpen, setMobileEntreprisesOpen]   = useState(false);
  const [mobilePersonnalitesOpen, setMobilePersonnalitesOpen] = useState(false);
  const [mobileAgenceOpen, setMobileAgenceOpen]             = useState(false);

  const pathname = usePathname();
  const { scrollY } = useScroll();

  const artTriggerRef    = useRef<HTMLDivElement>(null);
  const artPanelRef      = useRef<HTMLDivElement>(null);
  const artCloseTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entTriggerRef    = useRef<HTMLDivElement>(null);
  const entPanelRef      = useRef<HTMLDivElement>(null);
  const entCloseTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persoTriggerRef  = useRef<HTMLDivElement>(null);
  const persoPanelRef    = useRef<HTMLDivElement>(null);
  const persoCloseTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const agenceTriggerRef = useRef<HTMLDivElement>(null);
  const agenceCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navBg     = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.96)"]);
  const navShadow = useTransform(scrollY, [0, 80], ["0 0 0 rgba(0,0,0,0)", "0 2px 20px rgba(12,11,9,0.08)"]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setIsScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    setMobileOpen(false); setMegaOpen(false); setEntMegaOpen(false); setPersoMegaOpen(false); setAgenceOpen(false);
    setMobileArtistesOpen(false); setMobileEntreprisesOpen(false); setMobilePersonnalitesOpen(false); setMobileAgenceOpen(false);
  }, [pathname]);

  const handleArtEnter    = () => { if (artCloseTimer.current) clearTimeout(artCloseTimer.current); setMegaOpen(true); };
  const handleArtLeave    = () => { artCloseTimer.current = setTimeout(() => setMegaOpen(false), 150); };
  const handleEntEnter    = () => { if (entCloseTimer.current) clearTimeout(entCloseTimer.current); setEntMegaOpen(true); };
  const handleEntLeave    = () => { entCloseTimer.current = setTimeout(() => setEntMegaOpen(false), 150); };
  const handlePersoEnter  = () => { if (persoCloseTimer.current) clearTimeout(persoCloseTimer.current); setPersoMegaOpen(true); };
  const handlePersoLeave  = () => { persoCloseTimer.current = setTimeout(() => setPersoMegaOpen(false), 150); };
  const handleAgenceEnter = () => { if (agenceCloseTimer.current) clearTimeout(agenceCloseTimer.current); setAgenceOpen(true); };
  const handleAgenceLeave = () => { agenceCloseTimer.current = setTimeout(() => setAgenceOpen(false), 150); };

  const agenceActive = AGENCE_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  return (
    <>
      <motion.header style={{ backgroundColor: navBg, boxShadow: navShadow }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <KekeliLogo isScrolled={isScrolled} />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 relative">
              {navLinks.map(({ href, label, menu }) => {
                if (menu === "artistes") return (
                  <div key={href} ref={artTriggerRef} onMouseEnter={handleArtEnter} onMouseLeave={handleArtLeave} className="relative">
                    <Link href={href} className={clsx("relative flex items-center gap-1 px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-full",
                      pathname.startsWith("/artistes") ? "text-gold" : "text-text-secondary hover:text-text-primary")}>
                      {label}
                      <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.span>
                      {pathname.startsWith("/artistes") && <motion.span layoutId="nav-indicator" className="absolute inset-0 bg-gold-pale rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />}
                    </Link>
                  </div>
                );
                if (menu === "entreprises") return (
                  <div key={href} ref={entTriggerRef} onMouseEnter={handleEntEnter} onMouseLeave={handleEntLeave} className="relative">
                    <Link href={href} className={clsx("relative flex items-center gap-1 px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-full",
                      pathname.startsWith("/entreprises") ? "text-gold" : "text-text-secondary hover:text-text-primary")}>
                      {label}
                      <motion.span animate={{ rotate: entMegaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.span>
                      {pathname.startsWith("/entreprises") && <motion.span layoutId="nav-indicator" className="absolute inset-0 bg-gold-pale rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />}
                    </Link>
                  </div>
                );
                if (menu === "personnalites") return (
                  <div key={href} ref={persoTriggerRef} onMouseEnter={handlePersoEnter} onMouseLeave={handlePersoLeave} className="relative">
                    <Link href={href} className={clsx("relative flex items-center gap-1 px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-full",
                      pathname.startsWith("/personnalites") ? "text-[#10B981]" : "text-text-secondary hover:text-text-primary")}>
                      {label}
                      <motion.span animate={{ rotate: persoMegaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.span>
                      {pathname.startsWith("/personnalites") && <motion.span layoutId="nav-indicator" className="absolute inset-0 rounded-full -z-10" style={{ background: "rgba(16,185,129,0.10)" }} transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />}
                    </Link>
                  </div>
                );
                if (menu === "agence") return (
                  <div key={href} ref={agenceTriggerRef} onMouseEnter={handleAgenceEnter} onMouseLeave={handleAgenceLeave} className="relative">
                    <Link href={href} className={clsx("relative flex items-center gap-1 px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-full",
                      agenceActive ? "text-gold" : "text-text-secondary hover:text-text-primary")}>
                      {label}
                      <motion.span animate={{ rotate: agenceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.span>
                      {agenceActive && <motion.span layoutId="nav-indicator" className="absolute inset-0 bg-gold-pale rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />}
                    </Link>
                    <AnimatePresence>
                      {agenceOpen && <AgenceDropdown onClose={() => setAgenceOpen(false)} agenceLinks={AGENCE_LINKS} />}
                    </AnimatePresence>
                  </div>
                );
                return (
                  <Link key={href} href={href} className={clsx("relative px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-full",
                    pathname === href ? "text-gold" : "text-text-secondary hover:text-text-primary")}>
                    {label}
                    {pathname === href && <motion.span layoutId="nav-indicator" className="absolute inset-0 bg-gold-pale rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Auth + LangSwitch */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/sondage"
                className="shrink-0 whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-semibold transition-all hover:bg-gold-pale active:scale-95"
                style={{ border: "1.5px solid #C8A84B", color: "#C8A84B" }}>
                {tr.nav.freeAudit}
              </Link>
              <Link href="/espace-client/login"
                className="shrink-0 whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-semibold text-black transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 3px 12px rgba(200,168,75,0.35)" }}>
                <UserCircle size={14} /> {tr.nav.login}
              </Link>
              <LangSwitch />
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors" aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <div ref={artPanelRef} onMouseEnter={handleArtEnter} onMouseLeave={handleArtLeave}>
              <MegaMenu onClose={() => setMegaOpen(false)} services={SERVICES} outiasIA={OUTILS_IA} tr={tr} />
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {entMegaOpen && (
            <div ref={entPanelRef} onMouseEnter={handleEntEnter} onMouseLeave={handleEntLeave}>
              <EntreprisesMegaMenu onClose={() => setEntMegaOpen(false)} services={ENT_SERVICES} outiasIA={ENT_OUTILS_IA} tr={tr} />
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {persoMegaOpen && (
            <div ref={persoPanelRef} onMouseEnter={handlePersoEnter} onMouseLeave={handlePersoLeave}>
              <PersonnalitesMegaMenu onClose={() => setPersoMegaOpen(false)} services={PERSO_SERVICES} tr={tr} />
            </div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg-primary border-b border-border [box-shadow:var(--shadow-md)] md:hidden overflow-y-auto max-h-[calc(100vh-4rem)]">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map(({ href, label, menu }) => {
                if (menu === "artistes") return (
                  <div key={href}>
                    <button onClick={() => setMobileArtistesOpen((v) => !v)}
                      className={clsx("w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors text-left",
                        pathname.startsWith("/artistes") ? "bg-gold-pale text-gold-dark" : "text-text-secondary hover:bg-bg-secondary")}>
                      {label}
                      <motion.span animate={{ rotate: mobileArtistesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={16} /></motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileArtistesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="ml-4 mt-1 mb-2 space-y-1">
                            <Link href="/artistes" onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2 rounded-lg text-sm font-body font-semibold text-gold hover:bg-gold-pale transition-colors">
                              {tr.nav.seeAllServices}
                            </Link>
                            {allArtisteServices.map(({ icon: Icon, label: sLabel, href: sHref, color }) => (
                              <Link key={sHref} href={sHref} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-bg-secondary transition-colors">
                                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                                  <Icon size={14} style={{ color }} />
                                </div>
                                <span className="font-body text-sm text-text-secondary">{sLabel}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
                if (menu === "entreprises") return (
                  <div key={href}>
                    <button onClick={() => setMobileEntreprisesOpen((v) => !v)}
                      className={clsx("w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors text-left",
                        pathname.startsWith("/entreprises") ? "bg-gold-pale text-gold-dark" : "text-text-secondary hover:bg-bg-secondary")}>
                      {label}
                      <motion.span animate={{ rotate: mobileEntreprisesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={16} /></motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileEntreprisesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="ml-4 mt-1 mb-2 space-y-1">
                            <Link href="/entreprises" onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2 rounded-lg text-sm font-body font-semibold text-gold hover:bg-gold-pale transition-colors">
                              {tr.nav.seeAllServices}
                            </Link>
                            {allEntServices.map(({ icon: Icon, label: sLabel, href: sHref, color }) => (
                              <Link key={sHref} href={sHref} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-bg-secondary transition-colors">
                                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                                  <Icon size={14} style={{ color }} />
                                </div>
                                <span className="font-body text-sm text-text-secondary">{sLabel}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
                if (menu === "personnalites") return (
                  <div key={href}>
                    <button onClick={() => setMobilePersonnalitesOpen((v) => !v)}
                      className={clsx("w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors text-left",
                        pathname.startsWith("/personnalites") ? "text-[#10B981]" : "text-text-secondary hover:bg-bg-secondary")}>
                      {label}
                      <motion.span animate={{ rotate: mobilePersonnalitesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={16} /></motion.span>
                    </button>
                    <AnimatePresence>
                      {mobilePersonnalitesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="ml-4 mt-1 mb-2 space-y-1">
                            <Link href="/personnalites" onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2 rounded-lg text-sm font-body font-semibold transition-colors" style={{ color: "#10B981" }}>
                              Voir tous les services →
                            </Link>
                            {PERSO_SERVICES.map(({ icon: Icon, label: sLabel, href: sHref, color }) => (
                              <Link key={sHref} href={sHref} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-bg-secondary transition-colors">
                                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                                  <Icon size={14} style={{ color }} />
                                </div>
                                <span className="font-body text-sm text-text-secondary">{sLabel}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
                if (menu === "agence") return (
                  <div key={href}>
                    <button onClick={() => setMobileAgenceOpen((v) => !v)}
                      className={clsx("w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors text-left",
                        agenceActive ? "bg-gold-pale text-gold-dark" : "text-text-secondary hover:bg-bg-secondary")}>
                      {label}
                      <motion.span animate={{ rotate: mobileAgenceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={16} /></motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileAgenceOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="ml-4 mt-1 mb-2 space-y-1">
                            {AGENCE_LINKS.map(({ icon: Icon, label: aLabel, href: aHref }) => (
                              <Link key={aHref} href={aHref} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-bg-secondary transition-colors">
                                <div className="w-7 h-7 rounded-md bg-[#C8A84B]/15 flex items-center justify-center shrink-0">
                                  <Icon size={14} className="text-[#C8A84B]" />
                                </div>
                                <span className="font-body text-sm text-text-secondary">{aLabel}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
                return (
                  <Link key={href} href={href}
                    className={clsx("px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors",
                      pathname === href ? "bg-gold-pale text-gold-dark" : "text-text-secondary hover:bg-bg-secondary")}>
                    {label}
                  </Link>
                );
              })}

              <div className="mt-3 pt-3 border-t border-border space-y-2">
                <Link href="/sondage"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-body text-sm font-semibold transition-colors"
                  style={{ border: "1.5px solid #C8A84B", color: "#C8A84B" }}>
                  {tr.nav.freeAudit}
                </Link>
                <Link href="/espace-client/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full font-body text-sm font-semibold text-black"
                  style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)" }}>
                  <UserCircle size={15} /> {tr.nav.login}
                </Link>
                <div className="flex justify-center pt-1">
                  <LangSwitch />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16 md:h-20" />
    </>
  );
}
