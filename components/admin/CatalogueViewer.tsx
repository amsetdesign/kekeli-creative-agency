"use client";

import { useRef } from "react";
import {
  Mic2, Building2, Sparkles, Download, Eye,
  Star, Music, Camera, Film, Palette, Globe,
  BarChart2, Megaphone, TrendingUp, Smartphone,
  Users, Zap, Shield, Clock, CheckCircle2,
  Wand2, Search, Share2, Map,
} from "lucide-react";

/* ─── Data ─────────────────────────────────── */

const ARTISTE_SERVICES = [
  { icon: Palette,    color: "#8B5CF6", label: "Direction Artistique",      desc: "Développement de votre univers artistique unique, storytelling et positionnement fort sur votre marché.", tag: "Créatif" },
  { icon: Star,       color: "#C8A84B", label: "Branding Artiste",          desc: "Identité visuelle complète : logo, charte graphique, moodboard et cohérence sur tous vos supports.", tag: "Identité" },
  { icon: Film,       color: "#EC4899", label: "Clips & Vidéos",            desc: "Production de clips musicaux, teasers, lyric videos et contenus vidéo pensés pour maximiser la viralité.", tag: "Production" },
  { icon: Camera,     color: "#0891B2", label: "Photo Shooting",            desc: "Séances photo professionnelles en studio ou en extérieur pour vos visuels promotionnels et réseaux sociaux.", tag: "Photo" },
  { icon: Music,      color: "#10B981", label: "Accompagnement Artistique", desc: "Suivi personnalisé, coaching carrière, mise en relation avec l'industrie musicale locale et internationale.", tag: "Coaching" },
  { icon: BarChart2,  color: "#3B82F6", label: "Stratégie Digitale",        desc: "Plan d'action digital complet : calendrier éditorial, plateformes prioritaires et KPIs pour votre croissance.", tag: "Stratégie" },
  { icon: Globe,      color: "#C8A84B", label: "Distribution Musicale",     desc: "Distribution sur Spotify, Apple Music, Deezer, Boomplay et toutes les plateformes mondiales de streaming.", tag: "Distribution" },
  { icon: Megaphone,  color: "#F97316", label: "Marketing Digital",         desc: "Campagnes Meta Ads, TikTok Ads, gestion de communauté et growth hacking pour booster votre audience.", tag: "Marketing" },
  { icon: Smartphone, color: "#EC4899", label: "Identité Digitale",         desc: "Création et optimisation de vos profils réseaux sociaux, site EPK et présence en ligne unifiée.", tag: "Digital" },
  { icon: TrendingUp, color: "#16A34A", label: "Monétisation & Business",   desc: "Stratégie de revenus : sync licensing, merch, partenariats marques et diversification de vos sources.", tag: "Business" },
];

const ARTISTE_IA = [
  { icon: Sparkles, color: "#C8A84B", label: "Vision de Carrière IA",     desc: "Analyse IA de votre potentiel et génération d'une feuille de route personnalisée sur 12 mois." },
  { icon: BarChart2, color: "#D946EF", label: "Analyse Réseaux IA",        desc: "Audit complet de vos performances sociales et recommandations d'optimisation en temps réel." },
  { icon: Zap,       color: "#F43F5E", label: "Stratégie Lancement IA",    desc: "Plan de lancement intelligent pour votre prochain single, EP ou album avec timing optimal." },
  { icon: Wand2,     color: "#A855F7", label: "Moodboard IA",              desc: "Génération automatique de moodboards créatifs alignés avec votre univers artistique." },
];

const ENT_SERVICES = [
  { icon: Palette,    color: "#1E40AF", label: "Identité & Branding",          desc: "Création ou refonte complète de votre identité de marque : logo, charte, guidelines et supports print.", tag: "Branding" },
  { icon: Globe,      color: "#0EA5E9", label: "Site Web & Digitalisation",     desc: "Sites vitrines, e-commerce et applications web sur-mesure, optimisés SEO et conversion.", tag: "Web" },
  { icon: Users,      color: "#7C3AED", label: "Community Management",          desc: "Gestion quotidienne de vos réseaux sociaux : création de contenu, modération et reporting mensuel.", tag: "Réseaux" },
  { icon: Megaphone,  color: "#F97316", label: "Campagnes Publicitaires",       desc: "Stratégie et exécution de campagnes Facebook Ads, Google Ads, TikTok Ads pour générer des leads qualifiés.", tag: "Ads" },
  { icon: TrendingUp, color: "#059669", label: "Stratégie & Croissance",        desc: "Audit de positionnement, plan marketing 360°, stratégie de contenu et accompagnement à l'exécution.", tag: "Stratégie" },
  { icon: Camera,     color: "#EC4899", label: "Photo & Vidéo Business",        desc: "Production de contenus visuels professionnels : photos produits, reportages d'entreprise, vidéos institutionnelles.", tag: "Visuel" },
  { icon: Shield,     color: "#0891B2", label: "Business Coach 2 Mois",         desc: "Programme intensif d'accompagnement : structuration business, outils de gestion et accélération commerciale.", tag: "Coaching" },
  { icon: Smartphone, color: "#6366F1", label: "Applications Mobile & Web",     desc: "Développement d'applications iOS, Android et Progressive Web Apps pour digitaliser vos services.", tag: "Dev" },
];

const ENT_IA = [
  { icon: Star,    color: "#C8A84B", label: "Brand Score IA",          desc: "Évaluation automatique de la force de votre marque avec recommandations prioritaires." },
  { icon: Search,  color: "#3B82F6", label: "Audit Visibilité IA",     desc: "Analyse complète de votre présence en ligne et gaps de visibilité à combler en urgence." },
  { icon: Share2,  color: "#8B5CF6", label: "Réseau Idéal IA",         desc: "Identification de vos plateformes prioritaires selon votre secteur et votre cible." },
  { icon: Map,     color: "#10B981", label: "Diagnostic Entreprise IA", desc: "Radiographie complète de votre maturité digitale et plan d'action sur 90 jours." },
];

const PLANS = [
  {
    name: "Starter",
    price: "150 000",
    currency: "FCFA / mois",
    color: "#10B981",
    desc: "Idéal pour démarrer votre présence digitale",
    features: [
      "1 réseau social géré",
      "8 publications / mois",
      "Rapport mensuel",
      "Support email",
      "1 shooting photo / trimestre",
    ],
  },
  {
    name: "Pro",
    price: "350 000",
    currency: "FCFA / mois",
    color: "#C8A84B",
    featured: true,
    desc: "Pour les projets ambitieux en pleine croissance",
    features: [
      "3 réseaux sociaux gérés",
      "20 publications / mois",
      "Campagnes publicitaires",
      "Rapport hebdomadaire",
      "Shooting photo mensuel",
      "Accès outils IA",
    ],
  },
  {
    name: "Sur-Mesure",
    price: "Devis",
    currency: "personnalisé",
    color: "#8B5CF6",
    desc: "Solution complète adaptée à vos besoins",
    features: [
      "Toutes plateformes",
      "Contenu illimité",
      "Équipe dédiée",
      "Suivi quotidien",
      "Production vidéo incluse",
      "Priorité absolue",
    ],
  },
];

const STATS = [
  { value: "50+", label: "Clients accompagnés" },
  { value: "200+", label: "Contenus produits" },
  { value: "98%", label: "Satisfaction client" },
  { value: "5 ans", label: "D'expertise" },
];

/* ─── Sub-components ─────────────────────── */

function ServiceCard({ icon: Icon, color, label, desc, tag, index }: {
  icon: React.ElementType; color: string; label: string; desc: string; tag: string; index: number;
}) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #EDEBE7",
      borderLeft: `3px solid ${color}`,
      borderRadius: "10px",
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "8px",
          background: `${color}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "8px", fontWeight: 700,
          padding: "2px 8px", borderRadius: "99px",
          background: `${color}12`, color, letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          {tag}
        </span>
      </div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 700, color: "#0C0B09", margin: 0, lineHeight: 1.3 }}>{label}</p>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#78716C", margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function IACard({ icon: Icon, color, label, desc }: {
  icon: React.ElementType; color: string; label: string; desc: string;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "10px",
      padding: "10px 12px",
      background: "rgba(255,255,255,0.7)",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.5)",
    }}>
      <div style={{
        width: "26px", height: "26px", borderRadius: "7px", flexShrink: 0,
        background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={12} style={{ color }} />
      </div>
      <div>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, color: "#0C0B09", margin: "0 0 2px" }}>{label}</p>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", color: "#78716C", margin: 0, lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── Main Catalog ───────────────────────── */

const F = "'Outfit', sans-serif";
const FD = "'Cormorant Garamond', serif";

function Catalog() {
  return (
    <div id="catalog-print" style={{ fontFamily: F }}>

      {/* ══════════════════════════════════════
          PAGE 1 — COUVERTURE
      ══════════════════════════════════════ */}
      <div className="catalog-page" style={{
        width: "210mm", minHeight: "297mm", background: "#0D0C0A",
        position: "relative", overflow: "hidden", pageBreakAfter: "always",
        display: "flex",
      }}>
        {/* Left gold spine */}
        <div style={{ width: "6px", flexShrink: 0, background: "linear-gradient(180deg, #C8A84B 0%, #E8C96A 50%, #9A7A2E 100%)" }} />

        {/* Decorative rings — bottom right */}
        <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: "380px", height: "380px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "260px", height: "260px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.18)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "60px", right: "60px", width: "140px", height: "140px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.25)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "100px", right: "100px", width: "60px", height: "60px", borderRadius: "50%", background: "rgba(200,168,75,0.08)", border: "1px solid rgba(200,168,75,0.3)", pointerEvents: "none" }} />

        {/* Subtle gradient */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(200,168,75,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ flex: 1, padding: "44px 44px 36px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>

          {/* Top: logo + tagline */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "46px", height: "46px", borderRadius: "13px",
                background: "rgba(200,168,75,0.12)", border: "1.5px solid rgba(200,168,75,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: FD, fontWeight: 700, color: "#C8A84B", fontSize: "26px", lineHeight: 1 }}>K</span>
              </div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 800, color: "#fff", fontSize: "16px", letterSpacing: "0.12em", margin: 0 }}>KEKELI</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "#C8A84B", letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>Creative Agency</p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.25)", margin: 0, letterSpacing: "0.1em" }}>CATALOGUE 2025</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.2)", margin: 0 }}>Dakar, Sénégal</p>
            </div>
          </div>

          {/* Center: headline */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "40px" }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "5px 14px", borderRadius: "99px", marginBottom: "28px", width: "fit-content",
              background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.3)",
            }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C8A84B", flexShrink: 0 }} />
              <span style={{ fontSize: "9px", color: "#C8A84B", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Catalogue complet des services</span>
            </div>

            <h1 style={{ fontFamily: FD, fontSize: "64px", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.05, letterSpacing: "-0.01em" }}>
              Mettons la<br />
              <em style={{ color: "#C8A84B", fontStyle: "italic" }}>lumière</em><br />
              sur votre projet.
            </h1>

            <div style={{ width: "48px", height: "2px", background: "linear-gradient(90deg, #C8A84B, transparent)", margin: "24px 0" }} />

            <p style={{ fontFamily: F, fontSize: "13px", color: "rgba(255,255,255,0.5)", maxWidth: "360px", lineHeight: 1.75, margin: 0 }}>
              Agence créative à Dakar, Sénégal. Nous accompagnons artistes
              et entreprises dans leur rayonnement digital.
            </p>

            {/* Services summary chips */}
            <div style={{ display: "flex", gap: "8px", marginTop: "28px", flexWrap: "wrap" }}>
              {[
                { label: "10 services artistes", color: "#EC4899" },
                { label: "8 services entreprises", color: "#0EA5E9" },
                { label: "8 outils IA", color: "#C8A84B" },
                { label: "3 formules tarifaires", color: "#10B981" },
              ].map((chip) => (
                <div key={chip.label} style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "4px 10px", borderRadius: "6px",
                  background: `${chip.color}12`, border: `1px solid ${chip.color}25`,
                }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: chip.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 600, color: chip.color }}>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "flex", borderRadius: "12px", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
            marginBottom: "20px",
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                flex: 1, padding: "14px 16px", textAlign: "center",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <p style={{ fontFamily: FD, fontSize: "24px", fontWeight: 700, color: "#C8A84B", margin: "0 0 2px" }}>{s.value}</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.04em" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: F, fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0 }}>kekeli-agency.com</p>
            <p style={{ fontFamily: F, fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0 }}>contact@kekeli-agency.com</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PAGE 2 — SERVICES ARTISTES
      ══════════════════════════════════════ */}
      <div className="catalog-page" style={{ width: "210mm", minHeight: "297mm", background: "#F8F6F2", pageBreakAfter: "always", display: "flex" }}>
        {/* Left accent */}
        <div style={{ width: "5px", flexShrink: 0, background: "linear-gradient(180deg, #8B5CF6 0%, #EC4899 50%, #C8A84B 100%)" }} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header band */}
          <div style={{
            padding: "20px 40px 18px",
            background: "linear-gradient(135deg, #1A0E2E 0%, #0C0B09 100%)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "10px",
                background: "rgba(236,72,153,0.2)", border: "1px solid rgba(236,72,153,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Mic2 size={16} style={{ color: "#EC4899" }} />
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#8B5CF6", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 2px" }}>Pôle Artistes</p>
                <h2 style={{ fontFamily: FD, fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0 }}>Services pour Artistes</h2>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: F, fontSize: "22px", fontWeight: 800, color: "#EC4899", margin: 0, lineHeight: 1 }}>10</p>
              <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.35)", margin: 0 }}>services</p>
            </div>
          </div>

          {/* Services grid 2×5 */}
          <div style={{ padding: "20px 40px 0", flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {ARTISTE_SERVICES.map((s, i) => (
                <ServiceCard key={s.label} {...s} index={i} />
              ))}
            </div>

            {/* IA section */}
            <div style={{
              marginTop: "16px", padding: "14px 16px", borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(200,168,75,0.08) 0%, rgba(107,33,168,0.08) 100%)",
              border: "1px solid rgba(200,168,75,0.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                <Sparkles size={11} style={{ color: "#C8A84B" }} />
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#C8A84B", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Outils IA exclusifs — Artistes</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {ARTISTE_IA.map((t) => (
                  <IACard key={t.label} {...t} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "12px 40px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E5E1DC", marginTop: "12px" }}>
            <p style={{ fontFamily: F, fontSize: "9px", color: "#B0A89E", margin: 0 }}>KEKELI Creative Agency · Dakar, Sénégal</p>
            <p style={{ fontFamily: F, fontSize: "9px", color: "#B0A89E", margin: 0 }}>2 / 5</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PAGE 3 — SERVICES ENTREPRISES
      ══════════════════════════════════════ */}
      <div className="catalog-page" style={{ width: "210mm", minHeight: "297mm", background: "#F8F6F2", pageBreakAfter: "always", display: "flex" }}>
        <div style={{ width: "5px", flexShrink: 0, background: "linear-gradient(180deg, #0EA5E9 0%, #3B82F6 50%, #8B5CF6 100%)" }} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header band */}
          <div style={{
            padding: "20px 40px 18px",
            background: "linear-gradient(135deg, #0A1A2E 0%, #0C0B09 100%)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "10px",
                background: "rgba(14,165,233,0.2)", border: "1px solid rgba(14,165,233,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Building2 size={16} style={{ color: "#0EA5E9" }} />
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#0EA5E9", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 2px" }}>Pôle Entreprises</p>
                <h2 style={{ fontFamily: FD, fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0 }}>Services pour Entreprises</h2>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: F, fontSize: "22px", fontWeight: 800, color: "#0EA5E9", margin: 0, lineHeight: 1 }}>8</p>
              <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.35)", margin: 0 }}>services</p>
            </div>
          </div>

          <div style={{ padding: "20px 40px 0", flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {ENT_SERVICES.map((s, i) => (
                <ServiceCard key={s.label} {...s} index={i} />
              ))}
            </div>

            <div style={{
              marginTop: "16px", padding: "14px 16px", borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(139,92,246,0.08) 100%)",
              border: "1px solid rgba(14,165,233,0.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                <Sparkles size={11} style={{ color: "#0EA5E9" }} />
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#0EA5E9", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Outils IA exclusifs — Entreprises</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {ENT_IA.map((t) => (
                  <IACard key={t.label} {...t} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "12px 40px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E5E1DC", marginTop: "12px" }}>
            <p style={{ fontFamily: F, fontSize: "9px", color: "#B0A89E", margin: 0 }}>KEKELI Creative Agency · Dakar, Sénégal</p>
            <p style={{ fontFamily: F, fontSize: "9px", color: "#B0A89E", margin: 0 }}>3 / 5</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PAGE 4 — TARIFS
      ══════════════════════════════════════ */}
      <div className="catalog-page" style={{ width: "210mm", minHeight: "297mm", background: "#0D0C0A", pageBreakAfter: "always", position: "relative", overflow: "hidden", display: "flex" }}>
        {/* Left gold spine */}
        <div style={{ width: "6px", flexShrink: 0, background: "linear-gradient(180deg, #C8A84B 0%, #E8C96A 50%, #9A7A2E 100%)" }} />

        {/* Decorative top-right arc */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.15)", pointerEvents: "none" }} />

        <div style={{ flex: 1, padding: "36px 40px 28px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>

          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "#C8A84B", letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 8px" }}>Investissement</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: FD, fontSize: "40px", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1 }}>
                Nos <em style={{ color: "#C8A84B", fontStyle: "italic" }}>tarifs</em>
              </h2>
              <p style={{ fontFamily: F, fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: 0, maxWidth: "220px", textAlign: "right", lineHeight: 1.5 }}>
                Des offres transparentes pour chaque étape de votre projet
              </p>
            </div>
            <div style={{ width: "40px", height: "1.5px", background: "linear-gradient(90deg, #C8A84B, transparent)", marginTop: "14px" }} />
          </div>

          {/* Plans — improved cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            {PLANS.map((plan) => (
              <div key={plan.name} style={{
                borderRadius: "14px", padding: "20px 16px 16px",
                background: plan.featured
                  ? `linear-gradient(160deg, ${plan.color}18 0%, ${plan.color}06 100%)`
                  : "rgba(255,255,255,0.04)",
                border: plan.featured
                  ? `1.5px solid ${plan.color}45`
                  : "1px solid rgba(255,255,255,0.08)",
                position: "relative",
                display: "flex", flexDirection: "column",
              }}>
                {plan.featured && (
                  <div style={{
                    position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(90deg, ${plan.color}, #E8C96A)`,
                    padding: "3px 12px", borderRadius: "99px",
                    fontFamily: F, fontSize: "8px", fontWeight: 700,
                    color: "#000", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>
                    ★ Le plus populaire
                  </div>
                )}
                {/* Plan name + color bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  <div style={{ width: "3px", height: "20px", borderRadius: "2px", background: plan.color, flexShrink: 0 }} />
                  <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 800, color: plan.color, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{plan.name}</p>
                </div>
                {/* Price */}
                <div style={{ marginBottom: "10px" }}>
                  <p style={{ fontFamily: FD, fontSize: "30px", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1 }}>{plan.price}</p>
                  <p style={{ fontFamily: F, fontSize: "10px", color: "rgba(255,255,255,0.3)", margin: "3px 0 0" }}>{plan.currency}</p>
                </div>
                <p style={{ fontFamily: F, fontSize: "10px", color: "rgba(255,255,255,0.4)", margin: "0 0 12px", lineHeight: 1.5 }}>{plan.desc}</p>
                {/* Features */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "12px", marginTop: "auto" }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
                      <CheckCircle2 size={11} style={{ color: plan.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: F, fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Process — connected steps */}
          <div style={{
            padding: "18px 20px", borderRadius: "12px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "auto",
          }}>
            <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>Notre processus en 4 étapes</p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
              {[
                { n: "01", label: "Découverte", desc: "Échange sur vos objectifs", color: "#C8A84B" },
                { n: "02", label: "Stratégie",  desc: "Plan d'action & devis",     color: "#8B5CF6" },
                { n: "03", label: "Exécution",  desc: "Production & déploiement",  color: "#0EA5E9" },
                { n: "04", label: "Croissance", desc: "Analyse & optimisation",    color: "#10B981" },
              ].map((step, i) => (
                <div key={step.n} style={{ flex: 1, display: "flex", alignItems: "flex-start" }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%", margin: "0 auto 8px",
                      background: `${step.color}18`, border: `1.5px solid ${step.color}50`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: F, fontSize: "11px", fontWeight: 800, color: step.color }}>{step.n}</span>
                    </div>
                    <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{step.label}</p>
                    <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.3)", margin: 0, lineHeight: 1.4 }}>{step.desc}</p>
                  </div>
                  {/* Connector line */}
                  {i < 3 && (
                    <div style={{ width: "1px", flexShrink: 0, height: "18px", background: "rgba(255,255,255,0.1)", marginTop: "9px" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "14px", marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.2)", margin: 0 }}>KEKELI Creative Agency · Dakar, Sénégal</p>
            <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.2)", margin: 0 }}>4 / 5</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PAGE 5 — CONTACT & POURQUOI NOUS
      ══════════════════════════════════════ */}
      <div className="catalog-page" style={{ width: "210mm", minHeight: "297mm", background: "#F8F6F2", display: "flex" }}>
        <div style={{ width: "5px", flexShrink: 0, background: "linear-gradient(180deg, #C8A84B 0%, #E8C96A 50%, #9A7A2E 100%)" }} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header band */}
          <div style={{
            padding: "20px 40px 18px",
            background: "linear-gradient(135deg, #1A1208 0%, #0C0B09 100%)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#C8A84B", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 2px" }}>Pourquoi nous choisir</p>
              <h2 style={{ fontFamily: FD, fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0 }}>
                KEKELI signifie <em style={{ color: "#C8A84B", fontStyle: "italic" }}>lumière</em>
              </h2>
            </div>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: FD, fontWeight: 700, color: "#C8A84B", fontSize: "20px", lineHeight: 1 }}>K</span>
            </div>
          </div>

          <div style={{ padding: "20px 40px", flex: 1, display: "flex", flexDirection: "column" }}>

            {/* Why us — 2×2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
              {[
                { icon: Shield,    color: "#C8A84B", title: "Expertise locale",     desc: "5 ans d'expérience sur le marché sénégalais et ouest-africain, avec une compréhension profonde des codes culturels." },
                { icon: Zap,       color: "#8B5CF6", title: "Approche créative",    desc: "Équipe pluridisciplinaire alliant esthétique africaine contemporaine et standards de communication internationale." },
                { icon: BarChart2, color: "#0EA5E9", title: "Résultats mesurables", desc: "Objectifs clairs, KPIs définis, reporting régulier. Chaque décision est guidée par la donnée et votre ROI." },
                { icon: Clock,     color: "#10B981", title: "Réactivité 48h",       desc: "Réponse garantie sous 48h, suivi de projet transparent et communication proactive à chaque étape." },
              ].map((item) => (
                <div key={item.title} style={{
                  padding: "14px",
                  borderRadius: "10px",
                  background: "#fff",
                  border: "1px solid #EAE6E0",
                  borderTop: `3px solid ${item.color}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "7px",
                      background: `${item.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <item.icon size={12} style={{ color: item.color }} />
                    </div>
                    <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 700, color: "#0C0B09", margin: 0 }}>{item.title}</p>
                  </div>
                  <p style={{ fontFamily: F, fontSize: "10px", color: "#78716C", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Clients */}
            <div style={{
              padding: "14px 18px", borderRadius: "10px",
              background: "#fff", border: "1px solid #EAE6E0",
              marginBottom: "18px",
            }}>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#A8A29E", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 10px" }}>Ils nous font confiance</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Galsen Gospel Urbain", "Sunu Impact Festival", "Marihelène Production", "Music Gospel Sénégal", "Bon Prix Supérette", "Fees House", "Chaque Maison du Monde"].map((c) => (
                  <span key={c} style={{
                    fontFamily: F, fontSize: "10px", fontWeight: 600,
                    padding: "4px 10px", borderRadius: "6px",
                    background: "#F5F2EB", color: "#44403C",
                    border: "1px solid #E5E1DB",
                  }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA block */}
            <div style={{
              borderRadius: "14px",
              background: "#0D0C0A",
              border: "1px solid rgba(200,168,75,0.25)",
              overflow: "hidden",
            }}>
              {/* Gold top stripe */}
              <div style={{ height: "3px", background: "linear-gradient(90deg, #C8A84B, #E8C96A, #9A7A2E)" }} />
              <div style={{ padding: "20px 24px" }}>
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#C8A84B", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 6px" }}>Commençons ensemble</p>
                <h3 style={{ fontFamily: FD, fontSize: "24px", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
                  Prêt à mettre votre projet<br />
                  sous les <em style={{ color: "#C8A84B", fontStyle: "italic" }}>projecteurs</em> ?
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                  {[
                    { icon: Globe,      label: "Site web",  value: "kekeli-agency.com",       color: "#C8A84B" },
                    { icon: Megaphone,  label: "Email",     value: "contact@kekeli-agency.com", color: "#0EA5E9" },
                    { icon: Smartphone, label: "WhatsApp",  value: "+221 77 XXX XX XX",        color: "#10B981" },
                  ].map((c) => (
                    <div key={c.label} style={{
                      padding: "10px 12px", borderRadius: "8px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                        <c.icon size={10} style={{ color: c.color }} />
                        <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>{c.label}</p>
                      </div>
                      <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 600, color: "#fff", margin: 0 }}>{c.value}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.25)", margin: 0, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
                  Dakar, Sénégal · En présentiel et à distance · Réponse garantie sous 48h
                </p>
              </div>
            </div>

          </div>

          <div style={{ padding: "10px 40px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E5E1DC" }}>
            <p style={{ fontFamily: F, fontSize: "9px", color: "#B0A89E", margin: 0 }}>KEKELI Creative Agency · Dakar, Sénégal</p>
            <p style={{ fontFamily: F, fontSize: "9px", color: "#B0A89E", margin: 0 }}>5 / 5</p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─── Viewer (admin shell) ───────────────── */

export default function CatalogueViewer() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const node = printRef.current;
    if (!node) return;

    const html = node.innerHTML;
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) {
      alert("Veuillez autoriser les popups pour ce site afin de télécharger le PDF.");
      return;
    }

    win.document.write(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>KEKELI — Catalogue Services 2025</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { background: #fff; }
    .catalog-page { page-break-after: always; break-after: page; }
    .catalog-page:last-child { page-break-after: avoid; break-after: avoid; }
    @page { margin: 0; size: A4 portrait; }
    @media print {
      html, body { width: 210mm; }
    }
  </style>
</head>
<body>
${html}
<script>
  // Wait for fonts then print
  document.fonts.ready.then(function() {
    setTimeout(function() { window.print(); }, 300);
  });
<\/script>
</body>
</html>`);
    win.document.close();
  };

  return (
    <>
      {/* Admin toolbar */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl text-[#0C0B09] mb-1">Catalogue Services</h1>
              <p className="font-body text-sm text-[#78716C]">5 pages · Format A4 · Prêt à télécharger en PDF</p>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: "linear-gradient(135deg, #C8A84B, #D4A83A)", boxShadow: "0 4px 16px rgba(200,168,75,0.35)" }}
            >
              <Download size={15} />
              Télécharger PDF
            </button>
          </div>

          {/* Page summary */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {[
              { n: 1, label: "Couverture",         color: "#C8A84B", bg: "#0C0B09" },
              { n: 2, label: "Services Artistes",  color: "#EC4899", bg: "#FAFAF8" },
              { n: 3, label: "Services Entreprises", color: "#0EA5E9", bg: "#FAFAF8" },
              { n: 4, label: "Tarifs",             color: "#C8A84B", bg: "#0C0B09" },
              { n: 5, label: "Contact",            color: "#10B981", bg: "#FAFAF8" },
            ].map((p) => (
              <div key={p.n} className="rounded-xl p-3 text-center border"
                style={{ background: p.bg === "#0C0B09" ? "#0C0B09" : "#fff", borderColor: "#E7E5E4" }}>
                <p className="font-body text-xs font-bold mb-0.5" style={{ color: p.color }}>Page {p.n}</p>
                <p className="font-body text-[10px]" style={{ color: p.bg === "#0C0B09" ? "rgba(255,255,255,0.4)" : "#A8A29E" }}>{p.label}</p>
              </div>
            ))}
          </div>

          {/* Preview tip */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-6 font-body text-xs"
            style={{ background: "rgba(200,168,75,0.07)", border: "1px solid rgba(200,168,75,0.2)", color: "#78716C" }}>
            <Eye size={13} style={{ color: "#C8A84B", flexShrink: 0 }} />
            <span>Aperçu ci-dessous. Cliquez sur <strong className="text-[#0C0B09]">Télécharger PDF</strong> pour générer le fichier via la boîte de dialogue d'impression de votre navigateur.</span>
          </div>

          {/* Preview pages */}
          <div className="space-y-6">
            <div ref={printRef}>
              <Catalog />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
