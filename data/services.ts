export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  highlight: string;
  description: string;
  deliverables: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  process: ServiceProcess[];
  faq: ServiceFaq[];
  relatedIds: string[];
}

export const services: Service[] = [
  {
    id: "couverture-mediatique",
    icon: "Camera",
    title: "Couverture médiatique",
    shortDesc: "Photo & vidéo événementielle professionnelle",
    highlight: "Chaque instant mérite d'être immortalisé.",
    description:
      "Nous immortalisons vos événements avec une équipe de photographes et vidéastes professionnels. De la captation live au montage final, chaque instant est sublimé pour valoriser votre marque.",
    deliverables: [
      "Photographies HD retouchées",
      "Vidéo teaser & aftermovie",
      "Contenu réseaux sociaux optimisé",
      "Galerie en ligne sécurisée",
    ],
    tags: ["Photo", "Vidéo", "Événementiel", "Live"],
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Photographe professionnel lors d'un événement",
    process: [
      {
        step: "01",
        title: "Brief",
        desc: "Échange sur votre événement, l'ambiance souhaitée et les moments clés à capturer.",
      },
      {
        step: "02",
        title: "Repérage",
        desc: "Visite du lieu pour préparer la logistique et définir les meilleurs angles de vue.",
      },
      {
        step: "03",
        title: "Captation",
        desc: "Déploiement de notre équipe le jour J — photos et vidéos HD en direct.",
      },
      {
        step: "04",
        title: "Post-production",
        desc: "Retouches pro, montage et colorimétrie soignée pour un rendu à la hauteur de votre événement.",
      },
      {
        step: "05",
        title: "Livraison",
        desc: "Galerie en ligne partagée sous 72h, tous formats optimisés pour print et digital.",
      },
    ],
    faq: [
      {
        q: "Combien de temps avant l'événement faut-il réserver ?",
        a: "Nous recommandons de réserver au minimum 2 semaines avant votre événement. Pour les grands festivals ou conférences, préférez 4 à 6 semaines pour permettre un brief complet et une préparation logistique optimale.",
      },
      {
        q: "Quels formats livrez-vous ?",
        a: "Vous recevez vos photos en HD (JPEG haute résolution) et vos vidéos en MP4 optimisé pour les réseaux sociaux (16:9, 9:16 Reels, 1:1 Instagram). Un lien de téléchargement sécurisé est partagé sous 72h après l'événement.",
      },
      {
        q: "Intervenez-vous à Dakar uniquement ?",
        a: "Notre équipe couvre tout le Sénégal. Des déplacements en sous-région (Guinée, Côte d'Ivoire, Mali, etc.) sont possibles sur demande, avec devis de déplacement et hébergement séparé.",
      },
      {
        q: "Les droits d'utilisation des images sont-ils inclus ?",
        a: "Oui, la cession de droits d'utilisation commerciale est incluse dans notre prestation. Vous pouvez utiliser tous les visuels pour vos communications digitales, print et publicitaires sans frais supplémentaires.",
      },
    ],
    relatedIds: ["photo-shooting", "communication-artistes", "reseaux-sociaux"],
  },

  {
    id: "strategie-digitale",
    icon: "TrendingUp",
    title: "Stratégie digitale",
    shortDesc: "Audit, plan de communication & accompagnement",
    highlight: "Votre feuille de route vers une présence digitale maîtrisée.",
    description:
      "Un accompagnement stratégique sur-mesure pour booster votre visibilité en ligne. Nous analysons votre présence actuelle et construisons une feuille de route adaptée à vos objectifs et au marché sénégalais.",
    deliverables: [
      "Audit complet de présence digitale",
      "Plan de communication trimestriel",
      "Stratégie de contenu éditorial",
      "Tableaux de bord & reporting mensuel",
    ],
    tags: ["Stratégie", "Audit", "Conseil", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1573164713712-03d486899f8f?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Équipe africaine en réunion stratégique",
    process: [
      {
        step: "01",
        title: "Audit",
        desc: "Analyse complète de votre présence digitale : site web, réseaux sociaux, SEO et positionnement concurrentiel.",
      },
      {
        step: "02",
        title: "Diagnostic",
        desc: "Identification des forces, faiblesses et opportunités de croissance sur votre marché.",
      },
      {
        step: "03",
        title: "Stratégie",
        desc: "Co-construction de votre feuille de route digitale sur 3 à 6 mois, avec des objectifs mesurables.",
      },
      {
        step: "04",
        title: "Déploiement",
        desc: "Mise en œuvre des actions prioritaires avec notre équipe — contenu, campagnes, optimisations.",
      },
      {
        step: "05",
        title: "Reporting",
        desc: "Suivi mensuel des KPIs avec tableau de bord dédié et ajustements en temps réel.",
      },
    ],
    faq: [
      {
        q: "À qui s'adresse ce service ?",
        a: "À toute structure souhaitant structurer sa présence digitale : PME, ONG, institutions, marques personnelles. Que vous partiez de zéro ou souhaitiez optimiser l'existant, nous adaptons notre approche à votre réalité.",
      },
      {
        q: "Quelle est la durée d'un accompagnement stratégique ?",
        a: "Un accompagnement standard dure 3 à 6 mois. L'audit initial prend 1 à 2 semaines, suivi de la livraison de la stratégie en semaine 3. Le déploiement et le suivi mensuel se poursuivent ensuite selon votre formule.",
      },
      {
        q: "Travaillez-vous avec des budgets publicitaires ?",
        a: "Oui, nous gérons vos campagnes Facebook et Instagram Ads. Le budget publicitaire est séparé de nos honoraires — nous recommandons un minimum de 50 000 FCFA/mois pour des résultats significatifs sur le marché sénégalais.",
      },
      {
        q: "Comment mesurez-vous les résultats ?",
        a: "Nous définissons ensemble des KPIs adaptés à vos objectifs (engagement, portée, leads, ventes) et vous livrons chaque mois un tableau de bord clair avec nos analyses et recommandations d'optimisation.",
      },
    ],
    relatedIds: ["reseaux-sociaux", "branding", "developpement-web"],
  },

  {
    id: "photo-shooting",
    icon: "Aperture",
    title: "Photo shooting",
    shortDesc: "Portraits, lookbooks & packshots professionnels",
    highlight: "Des visuels qui racontent votre histoire et convertissent.",
    description:
      "Des images qui racontent votre histoire. Portraits corporate, lookbooks de marque ou packshots produits — nous créons des visuels qui captivent et inspirent confiance auprès de votre audience.",
    deliverables: [
      "Séance en studio ou en extérieur",
      "Retouches professionnelles",
      "Livrables multi-formats (print & digital)",
      "Droits d'utilisation complets",
    ],
    tags: ["Studio", "Portrait", "Lookbook", "Packshot"],
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Séance photo professionnelle — modèle africaine",
    process: [
      {
        step: "01",
        title: "Brief créatif",
        desc: "Échange sur votre vision, vos références, l'utilisation prévue des images et le message à transmettre.",
      },
      {
        step: "02",
        title: "Mood board",
        desc: "Sélection collaborative des ambiances, palettes couleur, poses et compositions qui vous correspondent.",
      },
      {
        step: "03",
        title: "Séance photo",
        desc: "Shooting en studio KEKELI ou en extérieur dans les lieux emblématiques de Dakar.",
      },
      {
        step: "04",
        title: "Sélection",
        desc: "Vous choisissez vos meilleures prises parmi toutes les images capturées lors de la séance.",
      },
      {
        step: "05",
        title: "Livraison",
        desc: "Retouches professionnelles et livrables multi-formats (web, print, réseaux sociaux) sous 5 jours ouvrés.",
      },
    ],
    faq: [
      {
        q: "Combien de photos vais-je recevoir ?",
        a: "Le nombre dépend de la formule choisie : de 15 à 50+ photos retouchées selon la durée de séance et vos besoins. Nous définissons le volume lors du brief initial.",
      },
      {
        q: "Disposez-vous d'un studio ?",
        a: "Oui, notre studio équipé est situé à Dakar avec fond blanc, éclairage professionnel et accessoires. Nous proposons aussi des shootings en extérieur (plages, quartiers historiques, toits, espaces verts) selon l'ambiance souhaitée.",
      },
      {
        q: "Puis-je utiliser les photos pour de la publicité ?",
        a: "Les droits d'utilisation commerciale sont inclus dans notre prestation. Vous pouvez utiliser vos images pour toutes vos communications : digital, print, affichage, campagnes publicitaires — sans restriction ni frais supplémentaires.",
      },
      {
        q: "Combien de temps à l'avance faut-il réserver ?",
        a: "Nous recommandons une réservation au moins 1 semaine à l'avance. Pour les shootings lookbook ou grandes productions avec plusieurs modèles, préférez 2 à 3 semaines pour préparer le brief et le moodboard dans les meilleures conditions.",
      },
    ],
    relatedIds: ["couverture-mediatique", "branding", "ecommerce"],
  },

  {
    id: "developpement-web",
    icon: "Code2",
    title: "Développement web & mobile",
    shortDesc: "Sites vitrine, applications & e-commerce",
    highlight: "Des solutions digitales performantes, pensées pour le marché africain.",
    description:
      "Des solutions digitales performantes adaptées au marché sénégalais. Sites vitrines, plateformes e-commerce avec paiement Wave & Orange Money, applications mobiles et dashboards sur mesure.",
    deliverables: [
      "Site responsive (mobile-first)",
      "Intégration paiement mobile Wave / OM",
      "Optimisation SEO technique",
      "Formation & maintenance incluses",
    ],
    tags: ["Next.js", "React", "Mobile", "E-commerce"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Développeur travaillant sur un ordinateur portable",
    process: [
      {
        step: "01",
        title: "Discovery",
        desc: "Définition des besoins, utilisateurs cibles, fonctionnalités essentielles et contraintes techniques.",
      },
      {
        step: "02",
        title: "Maquettage",
        desc: "Wireframes et design UI/UX soumis à votre validation avant tout développement.",
      },
      {
        step: "03",
        title: "Développement",
        desc: "Intégration responsive, fonctionnalités métier, paiements mobiles et optimisations de performance.",
      },
      {
        step: "04",
        title: "Tests & QA",
        desc: "Tests multi-devices, vérification des performances, de la sécurité et de l'accessibilité.",
      },
      {
        step: "05",
        title: "Lancement",
        desc: "Mise en ligne, formation à l'administration du site et support technique inclus pendant 30 jours.",
      },
    ],
    faq: [
      {
        q: "Quelles technologies utilisez-vous ?",
        a: "Nous développons principalement en Next.js et React pour les sites et applications web. Pour le mobile, nous utilisons React Native. Toutes nos solutions sont responsive et optimisées pour les connexions mobiles d'Afrique de l'Ouest.",
      },
      {
        q: "Intégrez-vous les paiements Wave et Orange Money ?",
        a: "Oui, c'est notre spécialité. Nous intégrons les APIs Wave, Orange Money Sénégal et Free Money pour que vous puissiez recevoir des paiements directement sur votre site ou application, adapté aux habitudes locales.",
      },
      {
        q: "Combien de temps prend le développement d'un site ?",
        a: "Un site vitrine standard est livré en 3 à 4 semaines. Une boutique e-commerce avec paiements mobiles prend 6 à 8 semaines. Une application mobile nécessite 2 à 4 mois selon la complexité des fonctionnalités.",
      },
      {
        q: "La maintenance est-elle incluse ?",
        a: "Une maintenance de base (mises à jour, sauvegardes, corrections de bugs) est incluse pendant 3 mois après la livraison. Des contrats de maintenance annuels sont disponibles par la suite pour garantir la pérennité de votre solution.",
      },
    ],
    relatedIds: ["ecommerce", "strategie-digitale", "reseaux-sociaux"],
  },

  {
    id: "reseaux-sociaux",
    icon: "Share2",
    title: "Réseaux sociaux",
    shortDesc: "Community management, ads & campagnes",
    highlight: "Votre communauté, notre engagement quotidien.",
    description:
      "Une présence digitale active et engageante sur toutes les plateformes. Création de contenu, gestion de communauté et campagnes publicitaires ciblées pour maximiser votre impact au Sénégal.",
    deliverables: [
      "Planning éditorial mensuel",
      "Création de visuels & captions",
      "Gestion des commentaires & messages",
      "Campagnes Facebook & Instagram Ads",
    ],
    tags: ["Instagram", "Facebook", "TikTok", "Ads"],
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Femme africaine gérant les réseaux sociaux",
    process: [
      {
        step: "01",
        title: "Audit",
        desc: "Analyse de vos comptes existants, de votre audience, de la concurrence et des opportunités de croissance.",
      },
      {
        step: "02",
        title: "Planning",
        desc: "Création d'un calendrier éditorial mensuel aligné sur vos objectifs et temps forts de l'activité.",
      },
      {
        step: "03",
        title: "Création",
        desc: "Production des visuels, captions, vidéos et stories par notre équipe créative.",
      },
      {
        step: "04",
        title: "Publication",
        desc: "Gestion quotidienne des publications, réponses aux commentaires et DMs pour maintenir l'engagement.",
      },
      {
        step: "05",
        title: "Reporting",
        desc: "Bilan mensuel des performances avec analyse des statistiques et recommandations d'optimisation.",
      },
    ],
    faq: [
      {
        q: "Sur quels réseaux intervenez-vous ?",
        a: "Nous gérons principalement Instagram, Facebook, TikTok et LinkedIn. Selon votre cible, nous priorisons les plateformes les plus efficaces — Instagram et Facebook restent dominants pour toucher les audiences sénégalaises.",
      },
      {
        q: "Quel est le rythme de publication recommandé ?",
        a: "Nous recommandons 4 à 5 posts par semaine sur Instagram et Facebook, un reel ou vidéo par semaine, et des stories quotidiennes. Ce rythme est adapté selon votre budget, votre secteur et vos objectifs de croissance.",
      },
      {
        q: "Créez-vous les visuels ou utilisez-vous nos photos ?",
        a: "Notre équipe crée vos visuels de A à Z : graphisme, textes, templates animés. Nous pouvons aussi valoriser vos photos et vidéos existantes. Un shooting mensuel peut être inclus dans certaines formules.",
      },
      {
        q: "Gérez-vous les publicités payantes ?",
        a: "Oui, nos formules Pro et Sur-mesure incluent la gestion de campagnes Facebook et Instagram Ads. Nous configurons, optimisons et reportons sur vos publicités. Le budget publicitaire est à votre charge, en plus de nos honoraires.",
      },
    ],
    relatedIds: ["strategie-digitale", "branding", "ecommerce"],
  },

  {
    id: "communication-artistes",
    icon: "Mic2",
    title: "Communication artistes & événements",
    shortDesc: "EPK, concerts, festivals & branding artistique",
    highlight: "Votre talent mérite une communication à la hauteur de votre art.",
    description:
      "Spécialisés dans la communication culturelle et artistique en Afrique de l'Ouest. EPK professionnels, stratégies de sortie musicale, communication de concerts et festivals pour les artistes qui veulent rayonner.",
    deliverables: [
      "Electronic Press Kit (EPK) complet",
      "Plan de sortie musicale (6 semaines)",
      "Communication d'événement (concert, festival)",
      "Branding et identité artistique visuelle",
    ],
    tags: ["Musique", "EPK", "Festival", "Branding"],
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Artiste en performance sur scène",
    process: [
      {
        step: "01",
        title: "Rencontre",
        desc: "Échange approfondi sur votre univers artistique, vos ambitions et vos projets à venir.",
      },
      {
        step: "02",
        title: "EPK & Branding",
        desc: "Création de votre press kit professionnel et définition de votre identité visuelle artistique.",
      },
      {
        step: "03",
        title: "Stratégie sortie",
        desc: "Plan de communication 6 semaines avant votre release : teasers, interviews, playlisting.",
      },
      {
        step: "04",
        title: "Activation",
        desc: "Campagnes digitales, partenariats médias, couverture sur tous les canaux pour maximiser la visibilité.",
      },
      {
        step: "05",
        title: "Couverture live",
        desc: "Photo et vidéo professionnelles de vos concerts, festivals et performances scéniques.",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'un EPK (Electronic Press Kit) ?",
        a: "Un EPK est votre carte de visite professionnelle auprès des médias, labels et organisateurs d'événements. Il inclut votre biographie, photos presse HD, liens streaming, revue de presse, vidéos et contacts. C'est indispensable pour décrocher interviews et bookings.",
      },
      {
        q: "Travaillez-vous avec tous les styles musicaux ?",
        a: "Oui, nous accompagnons des artistes de tous horizons : afrobeat, hip-hop, gospel, sabar, jazz, variété sénégalaise... Notre équipe maîtrise les codes de communication propres à chaque genre et à chaque audience.",
      },
      {
        q: "Combien de temps avant ma sortie musicale faut-il vous contacter ?",
        a: "Idéalement 6 à 8 semaines avant votre sortie pour mettre en place une stratégie complète avec du teasing, des avant-premières et une campagne de lancement efficace. Une stratégie express en 3 semaines est possible mais limite les actions de build-up.",
      },
      {
        q: "Accompagnez-vous aussi les événements culturels ?",
        a: "Absolument. En plus de la communication artistes, nous assurons la stratégie complète de vos événements : billetterie, affiches, réseaux sociaux, relations presse, couverture live et aftermovie pour des concerts, festivals et performances.",
      },
    ],
    relatedIds: ["couverture-mediatique", "branding", "reseaux-sociaux"],
  },

  {
    id: "branding",
    icon: "Palette",
    title: "Branding & identité visuelle",
    shortDesc: "Logo, charte graphique & templates",
    highlight: "Une identité que vous êtes fier de porter, partout.",
    description:
      "Votre identité visuelle est votre première impression. Nous créons des identités de marque mémorables qui reflètent vos valeurs, inspirent confiance et vous distinguent immédiatement de la concurrence.",
    deliverables: [
      "Création de logo",
      "Charte graphique complète",
      "Templates réseaux sociaux",
      "Guide d'utilisation de la marque",
    ],
    tags: ["Logo", "Charte", "Design", "Identité"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Designer travaillant sur une identité visuelle",
    process: [
      {
        step: "01",
        title: "Brief créatif",
        desc: "Exploration de vos valeurs, cibles, univers de référence et ambitions de marque à long terme.",
      },
      {
        step: "02",
        title: "Recherche",
        desc: "Analyse concurrentielle, mood boards et directions créatives soumises à votre validation.",
      },
      {
        step: "03",
        title: "Concepts logo",
        desc: "Présentation de 2 à 3 propositions de logo distinctes, avec les rationnnels créatifs.",
      },
      {
        step: "04",
        title: "Développement",
        desc: "Déclinaisons colorées, typographies, éléments graphiques et patterns de marque.",
      },
      {
        step: "05",
        title: "Charte & livraison",
        desc: "Charte graphique complète + tous les fichiers sources (AI, SVG, PNG, PDF) livrés.",
      },
    ],
    faq: [
      {
        q: "Combien de propositions de logo vais-je recevoir ?",
        a: "Nous soumettons 2 à 3 directions créatives distinctes lors de la première présentation. Après votre choix, 2 rounds de révisions sont inclus pour affiner le logo retenu jusqu'à votre satisfaction totale.",
      },
      {
        q: "Quels fichiers vais-je recevoir ?",
        a: "Vous recevez tous les fichiers sources (AI, SVG) et les exports en différents formats (PNG transparent, JPG, PDF) en versions couleur, noir et blanc. Toutes les déclinaisons sont adaptées au digital et au print.",
      },
      {
        q: "La charte inclut-elle les templates réseaux sociaux ?",
        a: "Oui, notre charte complète inclut les templates Canva ou Figma prêts à l'emploi pour Instagram, Facebook et LinkedIn (posts, stories, couvertures). Vous pouvez créer votre contenu en autonomie en restant dans la ligne graphique de votre marque.",
      },
      {
        q: "Faites-vous aussi le packaging et les supports print ?",
        a: "Oui, nous concevons packaging, étiquettes, flyers, kakémonos, bannières événementielles et tout support print cohérent avec votre identité de marque. Demandez un devis en fonction de vos besoins spécifiques.",
      },
    ],
    relatedIds: ["reseaux-sociaux", "developpement-web", "ecommerce"],
  },

  {
    id: "ecommerce",
    icon: "ShoppingBag",
    title: "Communication e-commerce",
    shortDesc: "Vendeurs en ligne & marketplaces",
    highlight: "Vendre plus, vendre mieux — avec des contenus qui convertissent.",
    description:
      "Boostez vos ventes en ligne avec une stratégie e-commerce adaptée au marché africain. Photos produits professionnelles, boutiques sociales optimisées et campagnes de vente ciblées pour maximiser votre chiffre d'affaires.",
    deliverables: [
      "Shooting produits professionnel",
      "Optimisation boutique Instagram & Facebook",
      "Campagnes de vente Facebook Ads",
      "Stratégie de relance clients",
    ],
    tags: ["E-commerce", "Instagram Shop", "Produits", "Vente"],
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&q=80&auto=format&fit=crop",
    imageAlt: "Vente en ligne et commerce digital",
    process: [
      {
        step: "01",
        title: "Audit boutique",
        desc: "Analyse de votre présence actuelle, de votre catalogue produits et de votre positionnement prix.",
      },
      {
        step: "02",
        title: "Shooting produits",
        desc: "Photos professionnelles de votre catalogue avec mise en scène adaptée à votre univers de marque.",
      },
      {
        step: "03",
        title: "Optimisation",
        desc: "Refonte de votre boutique Instagram/Facebook ou site e-commerce pour maximiser les conversions.",
      },
      {
        step: "04",
        title: "Campagnes",
        desc: "Mise en place de campagnes Facebook et Instagram Ads ciblées pour générer des ventes qualifiées.",
      },
      {
        step: "05",
        title: "Suivi & ROI",
        desc: "Reporting hebdomadaire sur les ventes générées et optimisations continues pour maximiser le retour.",
      },
    ],
    faq: [
      {
        q: "Travaillez-vous avec les vendeurs sur Instagram et WhatsApp ?",
        a: "Oui, c'est notre cœur de cible. Nous optimisons vos boutiques Instagram/Facebook, créons vos catalogues produits et mettons en place des stratégies de vente adaptées aux habitudes du commerce digital au Sénégal.",
      },
      {
        q: "Mon catalogue est volumineux (50+ produits). Pouvez-vous gérer ça ?",
        a: "Tout à fait. Nous organisons les shootings par lots et créons des templates réutilisables pour garantir une cohérence visuelle sur l'ensemble de votre catalogue, même avec des centaines de produits différents.",
      },
      {
        q: "Quel budget prévoir pour les publicités ?",
        a: "Nous recommandons un budget minimum de 75 000 FCFA/mois pour des campagnes e-commerce efficaces. Nous optimisons continuellement pour maximiser votre retour sur investissement, avec un reporting hebdomadaire détaillé.",
      },
      {
        q: "Intégrez-vous les paiements Wave / Orange Money ?",
        a: "Oui, en collaboration avec notre équipe développement web, nous intégrons tous les paiements mobiles locaux (Wave, Orange Money, Free Money) sur votre boutique en ligne pour réduire les frictions à l'achat.",
      },
    ],
    relatedIds: ["branding", "reseaux-sociaux", "developpement-web"],
  },
];
