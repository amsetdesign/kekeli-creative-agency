"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Palette, Music2, Video, Camera, Users, TrendingUp, Headphones, Target,
  Globe, Coins, Building2, Monitor, MessageSquare, Megaphone, Film,
  GraduationCap, Smartphone, Check, ArrowRight, MessageCircle, Phone,
} from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";

const GOLD    = "#C8A84B";
const VIOLET  = "#8B5CF6";
const VIOLET2 = "#A78BFA";
const BLUE    = "#1E40AF";
const SKY     = "#0EA5E9";
const DARK    = "#0C0B09";
const PHONE   = "221765289111";

function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Pack = {
  name: string;
  price: string;
  unit?: string;
  popular?: boolean;
  items: string[];
  color: string;
  waMsg: string;
};

type Category = {
  id: string;
  icon: React.ElementType;
  label: string;
  packs: Pack[];
};

const ARTISTE_CATS: Category[] = [
  {
    id: "branding",
    icon: Palette,
    label: "Branding & Identité",
    packs: [
      {
        name: "Logo Artiste",
        price: "75 000 – 150 000",
        color: "#8B5CF6",
        items: ["Logo (3 propositions)", "Déclinaisons couleur", "Fichiers HD (PNG, SVG)", "Livraison 7–10 jours"],
        waMsg: "Bonjour KEKELI 👋 Je suis intéressé(e) par la création de mon logo artiste. Pouvez-vous me donner plus de détails ?",
      },
      {
        name: "Logo + Charte Graphique",
        price: "150 000 – 350 000",
        popular: true,
        color: "#8B5CF6",
        items: ["Logo complet", "Palette & typographies officielles", "Templates réseaux sociaux", "Guide d'utilisation PDF"],
        waMsg: "Bonjour KEKELI 👋 Je veux créer mon logo + ma charte graphique complète. Pouvez-vous m'en dire plus ?",
      },
      {
        name: "Press Kit (EPK)",
        price: "75 000 – 200 000",
        color: "#8B5CF6",
        items: ["Biographie courte & longue", "Design PDF professionnel", "Liens streaming & réseaux", "Photo artiste incluse"],
        waMsg: "Bonjour KEKELI 👋 Je veux créer mon Press Kit artiste (EPK). Pouvez-vous me donner les détails ?",
      },
      {
        name: "Direction Artistique Globale",
        price: "400 000 – 900 000",
        color: "#8B5CF6",
        items: ["Logo + Charte + Templates + EPK", "Moodboard & concept créatif", "Univers visuel pour releases", "Accompagnement 3 mois"],
        waMsg: "Bonjour KEKELI 👋 Je veux une direction artistique globale pour mon projet. Pouvez-vous m'en dire plus ?",
      },
    ],
  },
  {
    id: "clips",
    icon: Video,
    label: "Clips & Vidéos",
    packs: [
      {
        name: "Lyric Video",
        price: "75 000 – 150 000",
        color: VIOLET,
        items: ["Animation texte sur mesure", "Motion design", "Livraison Full HD", "Délai 3–5 jours"],
        waMsg: "Bonjour KEKELI 👋 Je veux créer une lyric video pour mon morceau. Pouvez-vous me donner les détails ?",
      },
      {
        name: "Clip Vidéo Basique",
        price: "200 000 – 600 000",
        color: VIOLET,
        items: ["Tournage 1 jour", "1–2 lieux de tournage", "Montage professionnel", "Color grading inclus"],
        waMsg: "Bonjour KEKELI 👋 Je veux produire un clip vidéo. Pouvez-vous me donner les détails et disponibilités ?",
      },
      {
        name: "Clip Vidéo Premium",
        price: "600 000 – 2 000 000",
        popular: true,
        color: VIOLET,
        items: ["Tournage multi-jours", "Équipe complète (réal, chef op, sound)", "Décors & costumes", "VFX & post-production avancée"],
        waMsg: "Bonjour KEKELI 👋 Je veux un clip vidéo premium professionnel. Pouvez-vous m'en dire plus sur votre offre ?",
      },
    ],
  },
  {
    id: "photo",
    icon: Camera,
    label: "Photo Shooting",
    packs: [
      {
        name: "Shooting Artiste",
        price: "75 000 – 200 000",
        color: VIOLET2,
        items: ["2–3 heures de shooting", "2–3 looks différents", "20+ photos retouchées", "Livraison HD & réseaux"],
        waMsg: "Bonjour KEKELI 👋 Je veux un shooting photo professionnel. Quelles sont vos disponibilités et tarifs ?",
      },
      {
        name: "Pack Contenu Réseaux",
        price: "150 000 – 400 000",
        popular: true,
        color: VIOLET2,
        items: ["Shooting photo + vidéos courtes", "30+ contenus livrés", "Montage reels & stories", "Calendrier éditorial inclus"],
        waMsg: "Bonjour KEKELI 👋 Je veux un pack contenu réseaux sociaux complet (photos + vidéos). Pouvez-vous m'en dire plus ?",
      },
    ],
  },
  {
    id: "gestion",
    icon: Target,
    label: "Marketing & Gestion",
    packs: [
      {
        name: "Gestion Réseaux Sociaux",
        price: "100 000 – 300 000",
        unit: "/ mois",
        color: GOLD,
        items: ["12–20 posts/mois", "Stories & reels", "Interaction & modération", "Rapport mensuel"],
        waMsg: "Bonjour KEKELI 👋 Je veux déléguer la gestion de mes réseaux sociaux. Quelles sont vos offres mensuelles ?",
      },
      {
        name: "Campagne Publicité Meta/Google",
        price: "150 000 – 500 000",
        unit: "+ budget ads",
        color: GOLD,
        items: ["Stratégie & ciblage", "Création des visuels", "Setup & optimisation", "Rapport de performance"],
        waMsg: "Bonjour KEKELI 👋 Je veux lancer une campagne pub (Meta/Google) pour ma musique. Pouvez-vous m'expliquer votre offre ?",
      },
      {
        name: "Stratégie de Lancement",
        price: "150 000 – 400 000",
        popular: true,
        color: GOLD,
        items: ["Plan 90 jours personnalisé", "Calendrier éditorial complet", "Templates & assets", "1 session de suivi incluse"],
        waMsg: "Bonjour KEKELI 👋 Je veux une stratégie de lancement pour mon prochain projet musical. Pouvez-vous m'aider ?",
      },
      {
        name: "Accompagnement Artiste",
        price: "200 000 – 500 000",
        unit: "/ mois",
        color: "#10B981",
        items: ["4 sessions mensuelles", "Suivi hebdomadaire", "Accès ressources & outils", "Réseau & introductions"],
        waMsg: "Bonjour KEKELI 👋 Je cherche un accompagnement artistique mensuel. Pouvez-vous me décrire votre offre ?",
      },
    ],
  },
  {
    id: "distribution",
    icon: Headphones,
    label: "Distribution & Monétisation",
    packs: [
      {
        name: "Distribution Streaming",
        price: "30 000 – 100 000",
        unit: "/ sortie",
        color: "#C8A84B",
        items: ["Spotify, Apple Music, Boomplay, YouTube Music", "ISRC & code-barres", "Livraison en 24–48h", "Suivi des royalties"],
        waMsg: "Bonjour KEKELI 👋 Je veux distribuer ma musique sur les plateformes de streaming. Quels sont vos tarifs ?",
      },
      {
        name: "Setup Monétisation YouTube",
        price: "75 000 – 150 000",
        color: "#C8A84B",
        items: ["Optimisation chaîne", "Content ID setup", "Monétisation activée", "Formation gestion des revenus"],
        waMsg: "Bonjour KEKELI 👋 Je veux monétiser ma chaîne YouTube et mes contenus. Pouvez-vous m'accompagner ?",
      },
    ],
  },
];

const ENTREPRISE_CATS: Category[] = [
  {
    id: "identite",
    icon: Building2,
    label: "Identité Visuelle",
    packs: [
      {
        name: "Logo Entreprise",
        price: "100 000 – 250 000",
        color: "#1E40AF",
        items: ["3 propositions créatives", "Fichiers HD (SVG, PNG, PDF)", "Déclinaisons fond clair/sombre", "Livraison 7–10 jours"],
        waMsg: "Bonjour KEKELI 👋 Je veux créer le logo de mon entreprise. Pouvez-vous me donner les détails de votre offre ?",
      },
      {
        name: "Logo + Charte Graphique",
        price: "250 000 – 600 000",
        popular: true,
        color: "#1E40AF",
        items: ["Logo complet + révisions", "Charte couleurs & typographies", "Templates communication", "Guide d'utilisation PDF"],
        waMsg: "Bonjour KEKELI 👋 Je veux créer l'identité visuelle complète de mon entreprise. Pouvez-vous m'en dire plus ?",
      },
      {
        name: "Pack Communication Complète",
        price: "500 000 – 1 200 000",
        color: "#1E40AF",
        items: ["Logo + Charte + Templates réseaux", "Supports print (cartes, flyers)", "Kakémono & signalétique", "Accompagnement 2 mois"],
        waMsg: "Bonjour KEKELI 👋 Je veux un pack communication visuelle complet pour mon entreprise. Pouvez-vous m'expliquer votre offre ?",
      },
    ],
  },
  {
    id: "web",
    icon: Monitor,
    label: "Site Web",
    packs: [
      {
        name: "Site Vitrine",
        price: "250 000 – 800 000",
        color: "#0EA5E9",
        items: ["5–10 pages", "Design responsive", "SEO de base", "Livraison 3–4 semaines"],
        waMsg: "Bonjour KEKELI 👋 Je veux créer un site vitrine pour mon entreprise. Quels sont vos délais et tarifs ?",
      },
      {
        name: "Site E-commerce",
        price: "500 000 – 2 000 000",
        popular: true,
        color: "#0EA5E9",
        items: ["Catalogue produits illimité", "Paiement Wave / Orange Money / CB", "Gestion des commandes", "Formation administration incluse"],
        waMsg: "Bonjour KEKELI 👋 Je veux créer un site e-commerce. Pouvez-vous m'en dire plus sur votre offre ?",
      },
      {
        name: "Application Mobile",
        price: "2 000 000 – 10 000 000",
        color: BLUE,
        items: ["iOS + Android", "Design UX/UI sur mesure", "Backend & API inclus", "Maintenance 3 mois offerte"],
        waMsg: "Bonjour KEKELI 👋 Je veux développer une application mobile. Pouvez-vous me contacter pour un devis ?",
      },
    ],
  },
  {
    id: "social",
    icon: MessageSquare,
    label: "Réseaux & Publicité",
    packs: [
      {
        name: "Community Management",
        price: "150 000 – 400 000",
        unit: "/ mois",
        color: SKY,
        items: ["16–24 posts/mois", "Interaction & SAV social", "Stories & reels mensuels", "Rapport mensuel détaillé"],
        waMsg: "Bonjour KEKELI 👋 Je veux externaliser la gestion de mes réseaux sociaux. Quelles sont vos offres ?",
      },
      {
        name: "Publicité Meta / Google",
        price: "200 000 – 600 000",
        unit: "+ budget ads",
        popular: true,
        color: BLUE,
        items: ["Stratégie & ciblage précis", "Création des visuels & copy", "A/B testing", "Rapport de performance hebdo"],
        waMsg: "Bonjour KEKELI 👋 Je veux lancer des campagnes publicitaires (Meta/Google). Pouvez-vous m'expliquer votre offre ?",
      },
      {
        name: "Stratégie Digitale",
        price: "200 000 – 600 000",
        color: BLUE,
        items: ["Audit digital complet", "Plan d'action 6 mois", "Roadmap & KPIs", "2 sessions de suivi incluses"],
        waMsg: "Bonjour KEKELI 👋 Je veux élaborer la stratégie digitale de mon entreprise. Pouvez-vous m'aider ?",
      },
    ],
  },
  {
    id: "content",
    icon: Film,
    label: "Photo / Vidéo / Coaching",
    packs: [
      {
        name: "Shooting Photo Entreprise",
        price: "100 000 – 300 000",
        color: SKY,
        items: ["Demi-journée de shooting", "Photos produits & équipe", "20+ photos retouchées", "Livraison HD"],
        waMsg: "Bonjour KEKELI 👋 Je veux organiser un shooting photo professionnel pour mon entreprise. Quels sont vos tarifs ?",
      },
      {
        name: "Vidéo Institutionnelle",
        price: "300 000 – 900 000",
        popular: true,
        color: SKY,
        items: ["Script & storyboard", "Tournage 1 journée", "Montage & color grading", "Version réseaux sociaux incluse"],
        waMsg: "Bonjour KEKELI 👋 Je veux une vidéo institutionnelle pour mon entreprise. Pouvez-vous me donner les détails ?",
      },
      {
        name: "Coaching Digital",
        price: "100 000 – 300 000",
        unit: "/ session",
        color: SKY,
        items: ["Session 2–3h en présentiel ou distanciel", "Audit de votre présence digitale", "Plan d'action immédiat", "Suivi 1 mois inclus"],
        waMsg: "Bonjour KEKELI 👋 Je voudrais un coaching en communication digitale. Pouvez-vous m'en dire plus ?",
      },
    ],
  },
];

type Tab = "artiste" | "entreprise";

function PackCard({ pack }: { pack: Pack }) {
  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl p-6 h-full"
      style={{
        border: pack.popular ? `2px solid ${pack.color}` : "1px solid #E7E5E4",
        boxShadow: pack.popular ? `0 8px 30px ${pack.color}22` : "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {pack.popular && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white"
          style={{ background: pack.color }}
        >
          Le plus demandé
        </span>
      )}
      <h3 className="font-body font-bold text-[#0C0B09] text-base mb-1 leading-snug">{pack.name}</h3>
      <div className="mb-4">
        <span className="font-body font-bold text-2xl" style={{ color: pack.color }}>{pack.price}</span>
        <span className="font-body text-xs text-[#78716C] ml-1">FCFA {pack.unit ?? ""}</span>
      </div>
      <ul className="space-y-2 flex-1 mb-5">
        {pack.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check size={12} className="mt-0.5 shrink-0" style={{ color: pack.color }} />
            <span className="font-body text-xs text-[#57534E] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      <a
        href={waLink(pack.waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-body text-sm font-semibold transition-all hover:brightness-110 active:scale-[.98]"
        style={{ background: pack.color, color: pack.color === GOLD ? "#0C0B09" : "#fff" }}
      >
        <MessageCircle size={14} />
        Demander un devis
      </a>
    </div>
  );
}

export default function TarifsClient() {
  const [tab, setTab] = useState<Tab>("artiste");
  const cats = tab === "artiste" ? ARTISTE_CATS : ENTREPRISE_CATS;
  const tabColor = tab === "artiste" ? "#8B5CF6" : "#1E40AF";

  return (
    <>
      <section className="relative py-28 overflow-hidden" style={{ background: DARK }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20" style={{ background: "#8B5CF6" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[130px] opacity-15" style={{ background: GOLD }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up" delay={0.05}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ border: `1px solid rgba(200,168,75,0.35)`, background: "rgba(200,168,75,0.10)", color: GOLD }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
              Tarifs · Fourchettes indicatives FCFA
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.12}>
            <h1 className="font-body font-bold text-5xl sm:text-6xl text-white leading-[1.08] mb-5">
              Des tarifs <span style={{ color: GOLD }}>transparents</span><br />adaptés au marché africain
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="font-body text-lg max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.60)" }}>
              Les fourchettes ci-dessous sont indicatives. Chaque projet est unique — contactez-nous pour un devis personnalisé sous 24h.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.28}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={waLink("Bonjour KEKELI 👋 Je voudrais obtenir un devis personnalisé pour un projet. Pouvez-vous me contacter ?")}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm text-black transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #D4A83A 100%)`, boxShadow: `0 6px 24px rgba(200,168,75,0.40)` }}>
                <Phone size={16} />Obtenir un devis gratuit
              </a>
              <Link href="/sondage" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-sm transition-all"
                style={{ border: "2px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.80)" }}>
                Audit gratuit IA<ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: "#F7F4EE" }}>
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-4">
          {[
            { emoji: "📱", label: "Wave" },
            { emoji: "🟠", label: "Orange Money" },
            { emoji: "💳", label: "Carte bancaire" },
            { emoji: "🏦", label: "Virement bancaire" },
            { emoji: "💰", label: "Paiement en 2× possible" },
          ].map(({ emoji, label }) => (
            <span key={label} className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-medium"
              style={{ background: "white", border: "1px solid #E7E5E4", color: "#57534E" }}>
              <span>{emoji}</span> {label}
            </span>
          ))}
        </div>
      </section>

      <section className="sticky top-16 md:top-20 z-30 border-b border-[#E7E5E4] bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {(["artiste", "entreprise"] as Tab[]).map((t) => {
              const color = t === "artiste" ? "#8B5CF6" : "#1E40AF";
              const Icon = t === "artiste" ? Music2 : Building2;
              return (
                <button key={t} onClick={() => setTab(t)}
                  className="flex items-center gap-2 px-6 py-4 font-body text-sm font-semibold transition-all relative"
                  style={{ color: tab === t ? color : "#78716C" }}>
                  <Icon size={15} />
                  {t === "artiste" ? "Pour les artistes" : "Pour les entreprises"}
                  {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ background: color }} />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {cats.map(({ id, icon: CatIcon, label, packs }) => (
            <div key={id}>
              <FadeIn direction="up" className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${tabColor}18` }}>
                  <CatIcon size={20} style={{ color: tabColor }} />
                </div>
                <h2 className="font-body font-bold text-xl text-[#0C0B09]">{label}</h2>
                <span className="ml-auto px-3 py-1 rounded-full font-body text-[11px] font-semibold"
                  style={{ background: `${tabColor}12`, color: tabColor }}>
                  {packs.length} formule{packs.length > 1 ? "s" : ""}
                </span>
              </FadeIn>
              <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {packs.map((pack) => (
                  <FadeInItem key={pack.name}><PackCard pack={pack} /></FadeInItem>
                ))}
              </FadeInStagger>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10" style={{ background: "#F7F4EE" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-body text-sm text-[#78716C] leading-relaxed">
            * Les tarifs affichés sont des <strong>fourchettes indicatives</strong> basées sur nos projets habituels.
            Le devis final dépend du périmètre exact, des délais et des spécificités de votre projet.<br />
            Tous les devis sont gratuits et sans engagement. Paiement en 2× possible sur la plupart des projets.
          </p>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden" style={{ background: DARK }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[130px] opacity-20" style={{ background: GOLD }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[110px] opacity-15" style={{ background: "#8B5CF6" }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <FadeIn direction="up">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: GOLD }}>
              Discutons de votre projet
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Devis gratuit <em className="not-italic" style={{ color: GOLD }}>sous 24h</em>
            </h2>
            <p className="font-body text-base mb-8" style={{ color: "rgba(255,255,255,0.60)" }}>
              Partagez votre projet et on vous envoie une estimation personnalisée par WhatsApp ou email.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={waLink("Bonjour KEKELI 👋 Je voudrais discuter d'un projet et obtenir un devis. Pouvez-vous me contacter ?")}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #D4A83A 100%)`, boxShadow: `0 8px 30px rgba(200,168,75,0.40)` }}>
                <MessageCircle size={18} />WhatsApp · Devis gratuit
              </a>
              <Link href="/brief" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base transition-all"
                style={{ border: "2px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.80)" }}>
                Déposer un brief<ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
