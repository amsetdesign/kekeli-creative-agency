export type ProjectCategory = "web" | "event" | "artiste" | "com" | "branding" | "ecommerce" | "video";

export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory[];
  description: string;
  tags: string[];
  url?: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  // YouTube video embed
  youtubeId?: string;
  // Case study fields
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  timeline?: string;
  images?: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    id: "sunu-impact-festival",
    title: "Sunu Impact Festival 2025",
    subtitle: "Festival chrétien d'art et de talents · Dakar",
    category: ["web", "event"],
    description:
      "Site vitrine complet pour le plus grand rassemblement chrétien d'art et talents à Dakar. Programme, inscriptions et billetterie intégrée.",
    tags: ["Next.js", "SEO", "Billetterie", "Événementiel"],
    url: "https://www.sunuimpactfestival.com/",
    image: "/images/sunu-impact-festival.jpg",
    imageAlt: "Sunu Impact Festival 2025 — Dakar",
    featured: true,
    timeline: "3 semaines",
    challenge:
      "Le Sunu Impact Festival avait besoin d'une plateforme en ligne capable d'accueillir des milliers de visiteurs tout en gérant inscriptions, programme et billetterie en temps réel — le tout avec une identité visuelle forte et une expérience mobile impeccable.",
    solution:
      "Développement d'un site Next.js ultra-performant avec design immersif reprenant les codes visuels du festival. Système d'inscriptions en ligne, programme dynamique, galerie multimédia et optimisation SEO avancée pour maximiser la visibilité organique.",
    results: [
      { label: "Pages vues (J+7)", value: "12 000+" },
      { label: "Inscriptions en ligne", value: "850+" },
      { label: "Score PageSpeed", value: "98 / 100" },
      { label: "Temps de mise en ligne", value: "3 semaines" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=700&q=80&auto=format&fit=crop",
        alt: "Scène principale du Sunu Impact Festival",
      },
      {
        src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=700&q=80&auto=format&fit=crop",
        alt: "Foule et ambiance festival",
      },
    ],
  },
  {
    id: "galsen-gospel-urbain",
    title: "Galsen Gospel Urbain 3",
    subtitle: "Festival gospel urbain · Sénégal",
    category: ["web", "event"],
    description:
      "Le plus grand festival gospel urbain du Sénégal. Site complet avec galerie photos, ambassadeurs, sponsors et système de dons Wave & Orange Money.",
    tags: ["HTML/CSS/JS", "Dons mobile", "Galerie", "Mobile first"],
    url: "https://galsengospelurbain.com/",
    image: "/images/galsen-gospel-urbain.jpg",
    imageAlt: "Galsen Gospel Urbain 3 — Festival gospel Sénégal",
    featured: true,
    timeline: "2 semaines",
    challenge:
      "Créer une plateforme digitale pour Galsen Gospel Urbain 3 qui reflète l'énergie du festival, facilite les dons via mobile money (Wave, Orange Money) et présente les ambassadeurs et partenaires de manière premium — en un temps record.",
    solution:
      "Site web mobile-first développé en HTML/CSS/JS pur pour une performance maximale. Intégration complète Wave et Orange Money, galerie photos immersive, page ambassadeurs interactive et section sponsors hiérarchisée. Déploiement en 2 semaines.",
    results: [
      { label: "Dons collectés (en ligne)", value: "2,4M+ FCFA" },
      { label: "Visiteurs uniques", value: "8 500+" },
      { label: "Taux mobile", value: "84 %" },
      { label: "Délai de livraison", value: "2 semaines" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=700&q=80&auto=format&fit=crop",
        alt: "Artistes gospel sur scène",
      },
      {
        src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&h=700&q=80&auto=format&fit=crop",
        alt: "Foule au festival gospel",
      },
    ],
  },
  {
    id: "shooting-artiste-dakar",
    title: "Shooting portrait artiste",
    subtitle: "Identité visuelle · Dakar",
    category: ["artiste"],
    description:
      "Shooting photo professionnel pour la sortie d'un album. Visuels pour réseaux sociaux, presse et affichage grand format.",
    tags: ["Photo", "Branding", "Réseaux sociaux"],
    image: "/images/shooting-artiste.jpg",
    imageAlt: "Shooting portrait artiste — KEKELI Creative Agency",
    timeline: "1 journée",
    challenge:
      "Un artiste en plein lancement d'album avait besoin d'un visuel de couverture fort et d'un pack photo professionnel cohérent pour son image publique — Instagram, presse et affichage.",
    solution:
      "Shooting d'une journée en studio et en extérieur à Dakar. Direction artistique complète, retouche professionnelle et livraison d'un pack de 30+ visuels adaptés à chaque format : carré, portrait et paysage.",
    results: [
      { label: "Visuels livrés", value: "30+" },
      { label: "Formats couverts", value: "6" },
      { label: "Durée du shooting", value: "1 journée" },
    ],
  },
  {
    id: "campagne-ads-pme",
    title: "Campagne Facebook & Instagram Ads",
    subtitle: "Publicité digitale · PME Dakar",
    category: ["com"],
    description:
      "Gestion de campagnes publicitaires pour une PME locale. Ciblage Dakar, visuels sur-mesure et optimisation ROI sur 3 mois.",
    tags: ["Facebook Ads", "Instagram", "Ciblage local"],
    image: "/images/campagne-ads-pme.jpg",
    imageAlt: "Campagne Facebook & Instagram Ads — PME Dakar",
    timeline: "3 mois",
    challenge:
      "Une PME de services à Dakar investissait dans la publicité Facebook sans stratégie claire et obtenait de mauvais résultats. Budget gaspillé, audiences non ciblées, visuels génériques.",
    solution:
      "Audit complet, refonte de la stratégie publicitaire, création de visuels sur-mesure et mise en place d'audiences lookalike hyper-ciblées sur Dakar. Suivi hebdomadaire et optimisation continue sur 3 mois.",
    results: [
      { label: "Coût par lead réduit de", value: "−62 %" },
      { label: "Taux de conversion", value: "×3,4" },
      { label: "ROAS moyen", value: "4,8×" },
    ],
  },
  {
    id: "branding-marque-mode",
    title: "Identité visuelle — Marque de mode",
    subtitle: "Branding · Dakar",
    category: ["branding"],
    description:
      "Création complète de l'identité visuelle d'une marque de mode africaine contemporaine. Logo, charte graphique et templates réseaux sociaux.",
    tags: ["Logo", "Charte graphique", "Mode", "Identité"],
    image: "/images/branding-marque-mode.jpg",
    imageAlt: "Identité visuelle marque de mode africaine — KEKELI Creative Agency",
    timeline: "4 semaines",
    challenge:
      "Une nouvelle marque de mode africaine contemporaine cherchait une identité forte capable de la positionner sur les marchés locaux et internationaux, en valorisant le savoir-faire africain dans un langage visuel moderne.",
    solution:
      "Création d'un logo épuré et distinctif, d'une palette chromatique inspirée des teintes africaines et d'une typographie exclusive. Livraison d'une charte graphique complète et de 20+ templates réseaux sociaux prêts à l'emploi.",
    results: [
      { label: "Déclinaisons livrées", value: "20+" },
      { label: "Formats templates", value: "8" },
      { label: "Délai de création", value: "4 semaines" },
    ],
  },
  // ── Clips & Documentaires ──────────────────────────────
  {
    id: "clip-kekeli-01",
    title: "Différents mais tous utiles",
    subtitle: "Cypher officiel · Galsen Gospel Urbain 3",
    category: ["video", "event", "artiste"],
    description:
      "Cypher officiel du festival Galsen Gospel Urbain 3 — « Différents mais tous utiles ». Réalisation, direction artistique et post-production signés KEKELI Creative Agency.",
    tags: ["Cypher", "Gospel", "Galsen Gospel Urbain", "Live", "Post-production"],
    youtubeId: "YvtkEgJyEwk",
    image: "https://img.youtube.com/vi/YvtkEgJyEwk/hqdefault.jpg",
    imageAlt: "Différents mais tous utiles — Cypher Galsen Gospel Urbain 3",
    featured: true,
  },
  {
    id: "documentaire-kekeli",
    title: "Galsen Documentaire",
    subtitle: "Ne méprise pas ta jeunesse ! · Galsen Gospel Urbain 2",
    category: ["video", "com", "event"],
    description:
      "Documentaire immersif sur les coulisses du Galsen Gospel Urbain 2 — captation live, interviews exclusives et montage cinématographique.",
    tags: ["Documentaire", "Gospel", "Galsen Gospel Urbain", "Live"],
    youtubeId: "NSzzzNP5ftc",
    image: "https://img.youtube.com/vi/NSzzzNP5ftc/hqdefault.jpg",
    imageAlt: "Galsen Documentaire — Ne méprise pas ta jeunesse !",
    featured: true,
  },
  {
    id: "clip-freestyle-kekeli",
    title: "Les Choses Folles de Dieu",
    subtitle: "Session freestyle · Amset de Jésus",
    category: ["video", "artiste"],
    description:
      "Version freestyle du titre « Les Choses Folles de Dieu » d'Amset de Jésus — captation live, lumière naturelle et direction artistique brute pour un résultat authentique.",
    tags: ["Freestyle", "Gospel", "Live", "Amset de Jésus"],
    youtubeId: "4BWZeeuKBl4",
    image: "https://img.youtube.com/vi/4BWZeeuKBl4/hqdefault.jpg",
    imageAlt: "Les Choses Folles de Dieu — Session freestyle Amset de Jésus",
  },
  {
    id: "clip-kekeli-02",
    title: "Enfant de Dieu",
    subtitle: "Clip officiel · Amset de Jésus feat. Nathan Daoudou",
    category: ["video", "artiste"],
    description:
      "Clip officiel du titre « Enfant de Dieu » — Amset de Jésus en collaboration avec Nathan Daoudou. Mise en scène soignée, direction photo et montage cinématographique signés KEKELI Creative Agency.",
    tags: ["Clip officiel", "Gospel", "Amset de Jésus", "Nathan Daoudou"],
    youtubeId: "uKuPzWZQN3I",
    image: "https://img.youtube.com/vi/uKuPzWZQN3I/hqdefault.jpg",
    imageAlt: "Enfant de Dieu — Amset de Jésus feat. Nathan Daoudou",
  },

  {
    id: "concert-gad-2024",
    title: "Concert GAD 2024 — KS Bloom & Anne Elisabeth",
    subtitle: "Teaser & couverture événementielle · Grand Théâtre National, Dakar",
    category: ["video", "event", "artiste"],
    description:
      "Réalisation du teaser officiel du Concert GAD 2024, événement caritatif en faveur des enfants atteints d'AVC et de drépanocytose. Captation, direction artistique et montage signés KEKELI Creative Agency.",
    tags: ["Teaser", "Concert", "KS Bloom", "Anne Elisabeth", "Caritatif"],
    youtubeId: "CW4tmzP-e6Q",
    image: "https://img.youtube.com/vi/CW4tmzP-e6Q/hqdefault.jpg",
    imageAlt: "Concert GAD 2024 — KS Bloom & Anne Elisabeth · Grand Théâtre National Dakar",
    featured: true,
    timeline: "Novembre 2024",
    challenge:
      "MH Prod d'Évangélisation organisait un concert caritatif au Grand Théâtre National de Dakar avec KS Bloom et Anne Elisabeth. L'enjeu : créer un teaser qui capte l'émotion de la cause — les enfants atteints d'AVC et de drépanocytose — tout en donnant envie au public de venir.",
    solution:
      "Réalisation d'un teaser vidéo immersif mêlant images d'artistes, visuels de l'événement et tonalité émotionnelle forte. Direction artistique complète, montage cinématographique et livraison pour diffusion sur les réseaux sociaux avant le 30 novembre 2024.",
    results: [
      { label: "Artistes à l'affiche", value: "KS Bloom & Anne Elisabeth" },
      { label: "Lieu", value: "Grand Théâtre National" },
      { label: "Cause", value: "AVC & drépanocytose" },
      { label: "Date", value: "30 nov. 2024" },
    ],
  },

  // ── Autres réalisations ────────────────────────────────
  {
    id: "boutique-en-ligne",
    title: "Boutique en ligne — Cosmétiques",
    subtitle: "E-commerce · Sénégal",
    category: ["ecommerce", "web"],
    description:
      "Développement d'une boutique en ligne pour une marque de cosmétiques naturels africains. Intégration Wave, Orange Money et livraison à Dakar.",
    tags: ["E-commerce", "Wave", "Cosmétiques", "Mobile"],
    url: "https://galsengospelurbain.com/shop/",
    image: "/images/boutique-en-ligne.jpg",
    imageAlt: "Boutique en ligne cosmétiques naturels africains",
    timeline: "6 semaines",
    challenge:
      "Une marque de cosmétiques naturels africains vendait uniquement via Instagram DM — processus chaotique, pas de gestion de stock, paiements en espèces uniquement. Elle voulait professionnaliser ses ventes en ligne.",
    solution:
      "Boutique e-commerce complète avec catalogue produits, panier, intégration Wave et Orange Money, gestion de stock et système de livraison à Dakar. Interface mobile-first pensée pour l'audience locale.",
    results: [
      { label: "Ventes mois 1", value: "+180 %" },
      { label: "Paiements mobile", value: "73 % du CA" },
      { label: "Taux d'abandon panier", value: "28 %" },
    ],
  },
];
