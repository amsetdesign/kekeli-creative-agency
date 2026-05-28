"use client";

import { useState } from "react";
import {
  ChevronDown, ChevronUp, Clock, Wrench, HelpCircle, Package,
  Mic2, Building2, CheckCircle2, ArrowRight, Layers, RefreshCw,
  Zap, Users, BarChart2, Smartphone, Camera, Video, Music2,
  Megaphone, Monitor, MessageSquare, Headphones, Globe,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */
interface ServiceGuide {
  name: string;
  color: string;
  icon: React.ElementType;
  category: "artiste" | "entreprise";
  timeline: string;
  method: "cascade" | "agile" | "les deux";
  questions: string[];
  deliverables: string[];
  tools: { name: string; use: string }[];
}

/* ─── Data ───────────────────────────────────────────── */
const SERVICES: ServiceGuide[] = [
  /* ── ARTISTES ── */
  {
    name: "Branding Artiste",
    color: "#C8A84B",
    icon: Music2,
    category: "artiste",
    timeline: "5 – 10 jours ouvrés",
    method: "cascade",
    questions: [
      "Quel est ton style musical / ton univers ? (mots-clés, références)",
      "As-tu déjà un logo, une charte graphique existante ?",
      "Quel est ton public cible ? (âge, plateforme principale)",
      "Sur quels supports le logo sera utilisé ? (covers, réseaux, scène, merch…)",
      "Quels artistes ou marques admires-tu visuellement ?",
      "Délai souhaité et budget alloué ?",
    ],
    deliverables: ["Logo vectoriel (SVG, PNG transparent)", "Kit couleurs + typographies", "Covers template (Spotify, YouTube)", "Charte visuelle PDF"],
    tools: [
      { name: "Figma", use: "Maquettes & déclinaisons" },
      { name: "Adobe Illustrator", use: "Logo vectoriel final" },
      { name: "Adobe Photoshop", use: "Mockups & covers" },
      { name: "Canva Pro", use: "Templates réseaux" },
    ],
  },
  {
    name: "Photo Shooting",
    color: "#06B6D4",
    icon: Camera,
    category: "artiste",
    timeline: "3 – 5 jours (prep + shoot + retouche)",
    method: "cascade",
    questions: [
      "Quel est l'objectif du shooting ? (cover album, promo réseaux, portfolio)",
      "Intérieur ou extérieur ? Lieu de préférence ?",
      "Quelle ambiance / esthétique ? (urbain, studio, nature, cinématique…)",
      "Combien de tenues / looks prévus ?",
      "Livraison en combien de photos retouchées ?",
      "Y a-t-il besoin de maquillage / stylisme ?",
    ],
    deliverables: ["Photos HD retouchées", "Version crop pour réseaux (1:1, 4:5, 9:16)", "Fichiers RAW si demandé"],
    tools: [
      { name: "Adobe Lightroom", use: "Retouche & étalonnage" },
      { name: "Adobe Photoshop", use: "Retouches avancées" },
      { name: "Google Drive", use: "Livraison des fichiers" },
    ],
  },
  {
    name: "Clips & Vidéos",
    color: "#EC4899",
    icon: Video,
    category: "artiste",
    timeline: "2 – 4 semaines",
    method: "cascade",
    questions: [
      "C'est pour quel titre ? Y a-t-il un concept / storyboard existant ?",
      "Type de vidéo : clip officiel, lyric video, visualizer, reel ?",
      "Lieux de tournage envisagés ? Permis nécessaires ?",
      "Nombre de personnes à filmer (artiste seul, figurants, acteurs) ?",
      "Durée souhaitée de la vidéo finale ?",
      "Budget global (production + post-prod) ?",
      "Date de sortie prévue ?",
    ],
    deliverables: ["Clip final HD (1080p ou 4K)", "Version short (30s pour réseaux)", "Thumbnail personnalisée"],
    tools: [
      { name: "Adobe Premiere Pro", use: "Montage principal" },
      { name: "DaVinci Resolve", use: "Étalonnage couleur" },
      { name: "Adobe After Effects", use: "Motion graphics / effets" },
      { name: "CapCut Pro", use: "Reels & shorts rapides" },
    ],
  },
  {
    name: "Distribution Musicale",
    color: "#10B981",
    icon: Headphones,
    category: "artiste",
    timeline: "3 – 7 jours",
    method: "cascade",
    questions: [
      "Le titre est-il entièrement mixé et masterisé ?",
      "Quelles plateformes ? (Spotify, Apple Music, Boomplay, YouTube Music, Deezer…)",
      "Date de sortie souhaitée ? (prévoir 5-7 jours minimum)",
      "As-tu déjà un compte sur une plateforme de distribution ?",
      "Y a-t-il un ISRC existant ou faut-il en générer un ?",
      "Artwork cover disponible ? (format carré 3000x3000px min, 72dpi)",
    ],
    deliverables: ["Mise en ligne sur toutes les plateformes choisies", "ISRC assigné", "Lien de pré-sauvegarde si demandé"],
    tools: [
      { name: "DistroKid", use: "Distribution principale" },
      { name: "TuneCore", use: "Alternative / droits royalties" },
      { name: "Boomplay", use: "Distribution Afrique" },
      { name: "Amuse", use: "Option gratuite / indépendante" },
    ],
  },
  {
    name: "Community Management",
    color: "#7C3AED",
    icon: MessageSquare,
    category: "artiste",
    timeline: "Contrat mensuel récurrent",
    method: "agile",
    questions: [
      "Quels réseaux à gérer ? (Instagram, TikTok, Facebook, YouTube Shorts)",
      "Combien de publications par semaine souhaitées ?",
      "Le client fournit-il du contenu (photos, vidéos) ou tout créer ?",
      "Quel ton de communication ? (Pro, proche des fans, humoristique…)",
      "Y a-t-il des sujets à ne jamais aborder ?",
      "Accès aux comptes ou travail en collaboration via Creator Studio ?",
    ],
    deliverables: ["Planning éditorial mensuel", "X posts/semaine validés", "Rapport d'engagement mensuel", "Réponse aux commentaires"],
    tools: [
      { name: "Meta Business Suite", use: "Instagram + Facebook" },
      { name: "TikTok Studio", use: "Gestion TikTok" },
      { name: "Buffer / Hootsuite", use: "Planification multi-réseaux" },
      { name: "Canva Pro", use: "Création visuels rapides" },
      { name: "CapCut", use: "Montage reels" },
    ],
  },
  {
    name: "Stratégie Lancement",
    color: "#F97316",
    icon: Zap,
    category: "artiste",
    timeline: "1 – 2 semaines (plan) + suivi",
    method: "agile",
    questions: [
      "Quel est le projet à lancer ? (album, EP, single, tournée…)",
      "Quelle est la date de sortie cible ?",
      "Quel est le budget marketing disponible ?",
      "Existe-t-il déjà une communauté / base de fans ?",
      "Y a-t-il des partenariats envisagés (médias, influenceurs) ?",
      "Quels KPIs définissent le succès pour le client ?",
    ],
    deliverables: ["Roadmap de lancement (J-30 / J-15 / J-7 / J0 / J+7)", "Plan de contenu pré-sortie", "Liste presse & influenceurs ciblés", "Rapport post-lancement"],
    tools: [
      { name: "Notion", use: "Roadmap & planning" },
      { name: "Meta Ads", use: "Publicité pré-sortie" },
      { name: "Mailchimp", use: "Email fans" },
      { name: "Submithub", use: "Soumission presse / blogs" },
    ],
  },

  /* ── ENTREPRISES ── */
  {
    name: "Site Web & Digitalisation",
    color: "#0EA5E9",
    icon: Monitor,
    category: "entreprise",
    timeline: "3 – 6 semaines",
    method: "cascade",
    questions: [
      "Type de site : vitrine, catalogue, e-commerce, espace client ?",
      "Nombre de pages estimé ? Contenu existant (textes, photos) ?",
      "Existe-t-il une identité visuelle (logo, charte) ?",
      "Nom de domaine et hébergement déjà en place ?",
      "Besoin d'un CMS pour gérer soi-même le contenu ?",
      "Fonctionnalités spéciales : formulaire, blog, réservation, paiement en ligne ?",
      "Sites de référence appréciés ?",
    ],
    deliverables: ["Site responsive livré", "Optimisation SEO de base", "Formation utilisation CMS", "Documentation"],
    tools: [
      { name: "Next.js / React", use: "Sites sur-mesure & performants" },
      { name: "WordPress + Elementor", use: "Vitrine CMS rapide" },
      { name: "Webflow", use: "Design no-code avancé" },
      { name: "WooCommerce / Shopify", use: "E-commerce" },
      { name: "Vercel / Netlify", use: "Hébergement & déploiement" },
    ],
  },
  {
    name: "Applications Mobile & Web",
    color: "#6366F1",
    icon: Smartphone,
    category: "entreprise",
    timeline: "8 – 16 semaines selon complexité",
    method: "agile",
    questions: [
      "iOS, Android ou les deux ? Budget pour les deux stores ?",
      "Quelles sont les fonctionnalités principales (MVP) ?",
      "Existe-t-il une API ou un backend déjà en place ?",
      "Authentification utilisateur nécessaire ? (email, téléphone, social)",
      "Paiement in-app prévu ? (Stripe, Orange Money, Wave…)",
      "Design fourni ou à créer de zéro ?",
      "Délai de mise en production cible ?",
    ],
    deliverables: ["Application iOS + Android (ou PWA)", "Backend API si nécessaire", "Publication sur stores", "Documentation technique"],
    tools: [
      { name: "React Native", use: "iOS + Android (un seul codebase)" },
      { name: "Flutter", use: "Performances natives" },
      { name: "Next.js", use: "Web App / PWA" },
      { name: "Supabase / Firebase", use: "Backend & base de données" },
      { name: "Figma", use: "Maquettes UX/UI" },
    ],
  },
  {
    name: "Community Management Entreprise",
    color: "#0891B2",
    icon: Globe,
    category: "entreprise",
    timeline: "Contrat mensuel récurrent",
    method: "agile",
    questions: [
      "Secteur d'activité et positionnement de la marque ?",
      "Quelle cible principale ? (âge, localisation, centres d'intérêt)",
      "Ton de communication souhaité ? (corporate, proche, éducatif…)",
      "Concurrents à surveiller ?",
      "Objectif principal : notoriété, engagement, génération de leads ?",
      "Budget pour la publicité sponsorisée inclus ou séparé ?",
    ],
    deliverables: ["Stratégie éditoriale", "Planning mensuel validé", "X posts/semaine", "Rapport mensuel KPIs"],
    tools: [
      { name: "Meta Business Suite", use: "Gestion Instagram + Facebook" },
      { name: "LinkedIn", use: "B2B / professionnel" },
      { name: "Buffer", use: "Planification & analytics" },
      { name: "Canva Pro", use: "Templates aux couleurs de la marque" },
    ],
  },
  {
    name: "Campagnes Publicitaires",
    color: "#F97316",
    icon: Megaphone,
    category: "entreprise",
    timeline: "3 – 5 jours setup + durée campagne",
    method: "agile",
    questions: [
      "Objectif : notoriété, trafic, leads, ventes, téléchargements ?",
      "Quel budget pub mensuel alloué ?",
      "Quelles plateformes ? (Meta, Google, TikTok, LinkedIn…)",
      "Cible précise ? (zone géographique, âge, intérêts)",
      "Les créatifs (visuels, vidéos) sont fournis ou à créer ?",
      "Y a-t-il une page de destination (landing page) existante ?",
      "Durée de la campagne ?",
    ],
    deliverables: ["Setup des campagnes", "Créatifs publicitaires", "Rapport de performance hebdomadaire", "Optimisations en continu"],
    tools: [
      { name: "Meta Ads Manager", use: "Facebook & Instagram Ads" },
      { name: "Google Ads", use: "Search & Display" },
      { name: "TikTok Ads", use: "Audiences jeunes" },
      { name: "Semrush", use: "SEO & analyse concurrence" },
      { name: "Canva / Figma", use: "Créatifs visuels" },
    ],
  },
  {
    name: "Brand Score & Audit Visibilité",
    color: "#A855F7",
    icon: BarChart2,
    category: "entreprise",
    timeline: "5 – 7 jours",
    method: "cascade",
    questions: [
      "Secteur et principaux concurrents ?",
      "Quels canaux sont déjà actifs ? (site, réseaux, pub)",
      "Y a-t-il un accès Google Analytics / Search Console ?",
      "Quels sont les objectifs business à 6 mois ?",
      "Y a-t-il eu des campagnes passées ? Quels résultats ?",
    ],
    deliverables: ["Rapport d'audit complet (PDF)", "Score de visibilité 0-100", "Liste des actions prioritaires", "Recommandations stratégiques"],
    tools: [
      { name: "Google Analytics", use: "Trafic & comportement" },
      { name: "Semrush / Ubersuggest", use: "SEO & mots-clés" },
      { name: "Meta Insights", use: "Performance réseaux sociaux" },
      { name: "Notion", use: "Livraison rapport structuré" },
    ],
  },
  {
    name: "Stratégie & Croissance",
    color: "#059669",
    icon: BarChart2,
    category: "entreprise",
    timeline: "2 – 3 semaines (plan) + suivi mensuel",
    method: "agile",
    questions: [
      "Quels sont les objectifs de croissance à 3/6/12 mois ?",
      "Quel est le budget marketing global disponible ?",
      "Quels sont les canaux d'acquisition actuels qui fonctionnent ?",
      "Y a-t-il une équipe interne ou tout est externalisé ?",
      "Quels sont les principaux freins à la croissance identifiés ?",
    ],
    deliverables: ["Audit de la situation actuelle", "Roadmap de croissance sur 90 jours", "KPIs & tableau de bord de suivi", "Compte-rendu mensuel"],
    tools: [
      { name: "Notion", use: "Roadmap & documentation" },
      { name: "ClickUp / Trello", use: "Gestion des actions" },
      { name: "Google Data Studio", use: "Dashboard de KPIs" },
      { name: "Hotjar", use: "UX & comportement utilisateurs" },
    ],
  },
];

const ONBOARDING_STEPS = [
  {
    num: "01",
    title: "Premier contact & qualification",
    duration: "< 24h",
    color: "#C8A84B",
    desc: "Répondre dans les 24h, identifier le type de client (artiste / entreprise), le service demandé et le niveau d'urgence.",
    actions: [
      "Accuser réception par email ou WhatsApp",
      "Identifier le service principal demandé",
      "Qualifier : budget approximatif, délai, décisionnaire ?",
      "Créer le lead dans l'admin et lui assigner un statut",
    ],
  },
  {
    num: "02",
    title: "Discovery Call / Brief détaillé",
    duration: "30 – 60 min",
    color: "#06B6D4",
    desc: "Appel ou réunion pour comprendre en profondeur le projet, les attentes, les contraintes et aligner les visions.",
    actions: [
      "Poser les questions clés selon le service (voir guide ci-dessous)",
      "Prendre note des inspirations et références visuelles",
      "Identifier les contraintes techniques et délais imposés",
      "Envoyer un récapitulatif écrit après l'appel",
    ],
  },
  {
    num: "03",
    title: "Proposition & Devis",
    duration: "2 – 3 jours ouvrés",
    color: "#8B5CF6",
    desc: "Préparer une proposition commerciale claire avec le périmètre du projet, les livrables, le planning et le tarif.",
    actions: [
      "Rédiger le périmètre (scope) du projet",
      "Lister tous les livrables et exclusions",
      "Proposer un planning détaillé avec jalons",
      "Envoyer le devis et prévoir un appel de clarification",
    ],
  },
  {
    num: "04",
    title: "Validation & Onboarding",
    duration: "1 – 2 jours",
    color: "#10B981",
    desc: "Après accord du client, formaliser la mission et lancer le projet en bonne et due forme.",
    actions: [
      "Faire signer le bon de commande ou contrat",
      "Encaisser l'acompte (50% recommandé)",
      "Créer l'espace client et le projet dans l'admin",
      "Envoyer le kit de démarrage (accès, formulaires, planning)",
      "Lancer le projet selon la méthode choisie",
    ],
  },
  {
    num: "05",
    title: "Livraison & Suivi post-projet",
    duration: "Selon projet",
    color: "#EC4899",
    desc: "Livrer les fichiers finaux, recueillir le feedback, clôturer proprement et préparer la fidélisation.",
    actions: [
      "Livrer les fichiers via Drive ou espace client",
      "Récupérer les retours et effectuer les modifications incluses",
      "Encaisser le solde restant",
      "Demander un avis / témoignage",
      "Proposer un contrat de maintenance ou service complémentaire",
    ],
  },
];

const METHODS = [
  {
    id: "cascade",
    name: "Méthode Cascade",
    subtitle: "Waterfall — Pour projets bien définis",
    icon: Layers,
    color: "#0EA5E9",
    ideal: ["Site web vitrine", "Application avec specs complètes", "Branding / identité visuelle", "Clip vidéo", "Shooting photo", "Distribution musicale"],
    phases: [
      { name: "Analyse & Brief", duration: "J1 – J3", desc: "Collecte de toutes les infos, validation du brief complet" },
      { name: "Conception / Design", duration: "J4 – J10", desc: "Maquettes, wireframes, direction artistique" },
      { name: "Production", duration: "J11 – J25", desc: "Développement, tournage, création des livrables" },
      { name: "Tests & Révisions", duration: "J26 – J30", desc: "Corrections selon feedback, test sur tous les supports" },
      { name: "Livraison", duration: "J31+", desc: "Livraison des fichiers finaux + formation si nécessaire" },
    ],
    pros: ["Planning clair dès le départ", "Coûts maîtrisés", "Livrable unique et complet"],
    cons: ["Peu flexible aux changements en cours", "Nécessite un brief très précis au départ"],
  },
  {
    id: "agile",
    name: "Méthode Agile",
    subtitle: "Itératif — Pour projets évolutifs",
    icon: RefreshCw,
    color: "#10B981",
    ideal: ["Community Management", "Campagnes publicitaires", "Stratégie digitale", "Applications complexes", "Contrat de maintenance", "Growth & croissance"],
    phases: [
      { name: "Sprint 0 — Cadrage", duration: "Semaine 1", desc: "Objectifs, priorités, backlog initial, outils de suivi" },
      { name: "Sprint 1", duration: "Semaine 2-3", desc: "Livraison d'un premier bloc de valeur, feedback immédiat" },
      { name: "Sprint 2", duration: "Semaine 4-5", desc: "Ajustements selon retours, nouvelles fonctionnalités" },
      { name: "Sprint N…", duration: "Récurrent", desc: "Cycles répétés jusqu'à satisfaction complète" },
      { name: "Revue & Rétrospective", duration: "Fin de sprint", desc: "Ce qui marche, ce qui doit changer, prochaines priorités" },
    ],
    pros: ["Très flexible aux changements", "Feedback continu du client", "Valeur livrée dès le 1er sprint"],
    cons: ["Coût final moins prévisible", "Nécessite un client disponible pour les validations"],
  },
];

/* ─── Sub-components ───────────────────────────────── */
function ServiceCard({ service }: { service: ServiceGuide }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${service.color}25`, background: "white" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${service.color}15` }}>
          <Icon size={16} style={{ color: service.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body font-semibold text-sm text-[#0C0B09]">{service.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-body text-xs text-[#78716C] flex items-center gap-1">
              <Clock size={10} /> {service.timeline}
            </span>
            <span className="font-body text-[10px] px-1.5 py-0.5 rounded-full border"
              style={{ color: service.method === "cascade" ? "#0EA5E9" : "#10B981", borderColor: service.method === "cascade" ? "#0EA5E920" : "#10B98120", background: service.method === "cascade" ? "#0EA5E908" : "#10B98108" }}>
              {service.method === "cascade" ? "Cascade" : service.method === "agile" ? "Agile" : "Cascade + Agile"}
            </span>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="text-[#A8A29E] shrink-0" /> : <ChevronDown size={14} className="text-[#A8A29E] shrink-0" />}
      </button>

      {open && (
        <div className="border-t px-5 py-5 space-y-5" style={{ borderColor: `${service.color}15`, background: `${service.color}04` }}>
          {/* Questions */}
          <div>
            <p className="flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: service.color }}>
              <HelpCircle size={11} /> Questions à poser au client
            </p>
            <ul className="space-y-1.5">
              {service.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-[#44403C]">
                  <span className="mt-0.5 shrink-0 font-bold text-xs" style={{ color: service.color }}>{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Livrables */}
            <div>
              <p className="flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-widest mb-3 text-[#78716C]">
                <Package size={11} /> Livrables
              </p>
              <ul className="space-y-1">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm text-[#44403C]">
                    <CheckCircle2 size={12} style={{ color: service.color }} className="shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outils */}
            <div>
              <p className="flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-widest mb-3 text-[#78716C]">
                <Wrench size={11} /> Outils recommandés
              </p>
              <div className="space-y-1.5">
                {service.tools.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-body text-xs font-semibold px-2 py-0.5 rounded-md"
                      style={{ background: `${service.color}15`, color: service.color }}>
                      {t.name}
                    </span>
                    <span className="font-body text-xs text-[#78716C]">{t.use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────── */
export default function RoadmapGuide() {
  const artisteServices = SERVICES.filter((s) => s.category === "artiste");
  const entrepriseServices = SERVICES.filter((s) => s.category === "entreprise");

  return (
    <div className="space-y-12">

      {/* Header */}
      <div>
        <h1 className="font-display text-2xl text-[#0C0B09] mb-1">Feuille de Route Opérationnelle</h1>
        <p className="font-body text-sm text-[#78716C]">Guide interne — Prise en charge, exécution et outils pour chaque service KEKELI.</p>
      </div>

      {/* ── Section 1: Processus d'accueil ── */}
      <section>
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-5">
          Processus d'accueil client — 5 étapes universelles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ONBOARDING_STEPS.map((step) => (
            <div key={step.num}
              className="relative rounded-2xl bg-white border p-4 flex flex-col gap-3"
              style={{ borderColor: `${step.color}25` }}>
              {/* Step number */}
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold" style={{ color: `${step.color}30` }}>
                  {step.num}
                </span>
                <span className="font-body text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{ background: `${step.color}12`, color: step.color }}>
                  <Clock size={9} /> {step.duration}
                </span>
              </div>
              <div>
                <p className="font-body text-sm font-bold text-[#0C0B09] mb-1">{step.title}</p>
                <p className="font-body text-xs text-[#78716C] leading-relaxed">{step.desc}</p>
              </div>
              <ul className="mt-auto space-y-1">
                {step.actions.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5 font-body text-[11px] text-[#57534E]">
                    <ArrowRight size={9} className="mt-0.5 shrink-0" style={{ color: step.color }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Méthodes d'exécution ── */}
      <section>
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-5">
          Méthodes d'exécution — Choisir la bonne approche
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.id}
                className="rounded-2xl bg-white border p-6"
                style={{ borderColor: `${method.color}25` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${method.color}15` }}>
                    <Icon size={18} style={{ color: method.color }} />
                  </div>
                  <div>
                    <p className="font-body font-bold text-[#0C0B09] text-sm">{method.name}</p>
                    <p className="font-body text-xs text-[#78716C]">{method.subtitle}</p>
                  </div>
                </div>

                {/* Phases */}
                <div className="mb-4">
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-2">Phases</p>
                  <div className="space-y-2">
                    {method.phases.map((phase, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center gap-0.5 shrink-0" style={{ width: 14 }}>
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: method.color }} />
                          {i < method.phases.length - 1 && (
                            <div className="w-px flex-1" style={{ background: `${method.color}30`, minHeight: 12 }} />
                          )}
                        </div>
                        <div className="pb-2">
                          <p className="font-body text-xs font-semibold text-[#0C0B09]">
                            {phase.name}
                            <span className="ml-2 font-normal text-[#A8A29E]">{phase.duration}</span>
                          </p>
                          <p className="font-body text-xs text-[#78716C]">{phase.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Idéal pour */}
                <div className="mb-4">
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-2">Idéal pour</p>
                  <div className="flex flex-wrap gap-1.5">
                    {method.ideal.map((s, i) => (
                      <span key={i} className="font-body text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: `${method.color}12`, color: method.color }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros / Cons */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">Avantages</p>
                    {method.pros.map((p, i) => (
                      <p key={i} className="font-body text-xs text-[#57534E] flex items-start gap-1">
                        <CheckCircle2 size={10} className="mt-0.5 shrink-0 text-emerald-500" /> {p}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">Limites</p>
                    {method.cons.map((c, i) => (
                      <p key={i} className="font-body text-xs text-[#57534E] flex items-start gap-1">
                        <span className="text-red-400 shrink-0 mt-0.5">−</span> {c}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 3: Guide par service — Artistes ── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#EC489920" }}>
            <Mic2 size={14} style={{ color: "#EC4899" }} />
          </div>
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8A29E]">
            Services Artistes — Questions · Livrables · Outils
          </p>
        </div>
        <div className="space-y-2">
          {artisteServices.map((s) => (
            <ServiceCard key={s.name} service={s} />
          ))}
        </div>
      </section>

      {/* ── Section 4: Guide par service — Entreprises ── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#3B82F620" }}>
            <Building2 size={14} style={{ color: "#3B82F6" }} />
          </div>
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8A29E]">
            Services Entreprises — Questions · Livrables · Outils
          </p>
        </div>
        <div className="space-y-2">
          {entrepriseServices.map((s) => (
            <ServiceCard key={s.name} service={s} />
          ))}
        </div>
      </section>

      {/* ── Section 5: Timelines récapitulatif ── */}
      <section>
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-5">
          Timelines standards — Récapitulatif rapide
        </p>
        <div className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden">
          <div className="grid grid-cols-3 bg-[#F7F6F3] px-5 py-2.5 border-b border-[#E7E5E4]">
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#A8A29E]">Service</p>
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#A8A29E]">Délai</p>
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#A8A29E]">Méthode</p>
          </div>
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.name}
                className={`grid grid-cols-3 px-5 py-3 items-center ${i < SERVICES.length - 1 ? "border-b border-[#F5F5F4]" : ""}`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}15` }}>
                    <Icon size={11} style={{ color: s.color }} />
                  </div>
                  <span className="font-body text-sm text-[#0C0B09]">{s.name}</span>
                </div>
                <span className="font-body text-sm text-[#78716C]">{s.timeline}</span>
                <span className="font-body text-xs px-2 py-0.5 rounded-full w-fit"
                  style={{
                    background: s.method === "cascade" ? "#0EA5E912" : "#10B98112",
                    color: s.method === "cascade" ? "#0EA5E9" : "#10B981",
                  }}>
                  {s.method === "cascade" ? "Cascade" : "Agile"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
