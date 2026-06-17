"use client";

import {
  F, FD, DARK, CREAM, GOLD,
  CoverPage, ChapterPage, ContentPage, DarkPage,
  TOCPage, QuotePage, ClosingPage, EbookViewerShell,
  SH2, SH3, Body, BulletList, NumberedList,
  Callout, MiniTable, Divider,
} from "./EbookLayout";

const ACC  = "#0EA5E9";
const SEC  = "#10B981";
const VIOL = "#8B5CF6";
const ORG  = "#F97316";
const LABEL = "De l'Idée à l'Empire — Guide de l'Entrepreneur Africain Pro · 2026";
const TOTAL = 80;

export default function EbookEntrepreneurViewer() {
  return (
    <EbookViewerShell
      title="De l'Idée à l'Empire"
      subtitle="Le guide complet de l'entrepreneur africain pro"
      pageCount={TOTAL}
      accentColor={ACC}
    >

      {/* ── P1 COVER ── */}
      <CoverPage
        accent={ACC}
        title="De l'Idée"
        titleHighlight="à l'Empire"
        subtitle="Le guide complet pour créer, structurer et faire croître une entreprise rentable au Sénégal et en Afrique de l'Ouest."
        badge="Édition 2026 · KEKELI"
        guideLabel={LABEL}
        chips={[
          { label: "Business Model & Validation", color: ACC },
          { label: "Branding & Communication", color: VIOL },
          { label: "Vente à la sénégalaise", color: SEC },
          { label: "Fiscalité & RCCM", color: ORG },
          { label: "Financement ADEPME / DER", color: GOLD },
          { label: "Expansion CEDEAO", color: "#EC4899" },
        ]}
        stats={[
          { value: "80", label: "pages" },
          { value: "18", label: "chapitres" },
          { value: "200+", label: "conseils" },
          { value: "12M", label: "plan d'action" },
        ]}
      />

      {/* ── P2 QUOTE ── */}
      <QuotePage
        accent={ACC}
        pageNum={2}
        total={TOTAL}
        guideLabel={LABEL}
        quote="Le Sénégal ne manque pas d'entrepreneurs. Il manque d'entrepreneurs qui ont un système."
        source="KEKELI Creative Agency — Dakar, Sénégal"
      />

      {/* ── P3 TOC 1 ── */}
      <TOCPage
        accent={ACC}
        pageNum={3}
        total={TOTAL}
        guideLabel={LABEL}
        chapters={[
          { num: 0,  title: "Introduction",                          sub: "L'entrepreneur africain du 21e siècle — les enjeux" },
          { num: 1,  title: "Mindset de l'entrepreneur qui réussit", sub: "Les 10 qualités + 7 erreurs fatales à éviter" },
          { num: 2,  title: "Valider son idée avant d'investir",     sub: "Business Model Canvas adapté Afrique, étude de marché" },
          { num: 3,  title: "Formaliser son entreprise",             sub: "RCCM, NINEA, statuts, choix de la forme juridique" },
          { num: 4,  title: "Construire une marque puissante",       sub: "Identité, naming, positionnement, promesse unique" },
          { num: 5,  title: "WhatsApp Business Pro",                 sub: "Setup complet, catalogue, listes de diffusion, automatisation" },
          { num: 6,  title: "Réseaux sociaux : Facebook, Instagram, TikTok", sub: "Stratégie de contenu, formats qui performent" },
          { num: 7,  title: "Site Web & SEO local",                  sub: "Google Business, mots-clés, référencement Dakar" },
          { num: 8,  title: "Publicité digitale",                    sub: "Facebook Ads, Google Ads, payer depuis le Sénégal" },
          { num: 9,  title: "Techniques de vente à la sénégalaise",  sub: "Entretien de vente, objections, négociation, closing" },
        ]}
      />

      {/* ── P4 TOC 2 ── */}
      <TOCPage
        accent={ACC}
        pageNum={4}
        total={TOTAL}
        guideLabel={LABEL}
        chapters={[
          { num: 10, title: "Service client & fidélisation",         sub: "L'art de transformer un client en ambassadeur" },
          { num: 11, title: "Gestion financière",                    sub: "Trésorerie, marges, budgets, tableau de bord" },
          { num: 12, title: "Financement & accès au crédit",         sub: "ADEPME, DER, BNDE, FONGIP, microfinance, investisseurs" },
          { num: 13, title: "Fiscalité sénégalaise",                 sub: "Régimes fiscaux, TVA, patente, obligations déclaratives" },
          { num: 14, title: "Recrutement & droit du travail",        sub: "Premier recrutement, IPRES, CSS, Code du Travail" },
          { num: 15, title: "Gestion de crise",                      sub: "Prévention, communication de crise, rebond" },
          { num: 16, title: "Marketing d'influence local",           sub: "Influenceurs sénégalais, collabs, UGC, bouche-à-oreille digital" },
          { num: 17, title: "E-commerce & paiement mobile",          sub: "Wave, Orange Money, PayDunya, boutique en ligne" },
          { num: 18, title: "Expansion en Afrique de l'Ouest",       sub: "CEDEAO, UEMOA, stratégies d'entrée sur de nouveaux marchés" },
          { num: 19, title: "Ressources, outils & plan 12 mois",     sub: "Checklist finale, outils recommandés, feuille de route" },
        ]}
      />

      {/* ══════════════════════════════════════════════════════════
          INTRODUCTION  (P5–P7)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P5 INTRO OPENER ── */}
      <ChapterPage
        num={0}
        title="L'entrepreneur africain du 21e siècle"
        hook="Le Sénégal produit des entrepreneurs talentueux. Ce qui manque, ce n'est pas le courage ou les idées — c'est le système. Ce guide est ce système."
        accent={ACC}
        pageNum={5}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P6 INTRO CONTENT 1 ── */}
      <ContentPage chapter="Introduction" accent={ACC} pageNum={6} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi la plupart des entreprises sénégalaises stagnent</SH2>
        <Body>Dans les années 2000, créer une entreprise au Sénégal signifiait avoir une boutique, un téléphone fixe et des clients acquis par bouche-à-oreille. Ce modèle a fonctionné pendant des décennies. Il ne suffit plus.</Body>
        <Callout color="#DC2626" title="La réalité du terrain" text="80% des PME sénégalaises n'atteignent pas leur 5e anniversaire. Non par manque de talent, mais par manque de structure : pas de comptabilité claire, pas de stratégie de vente définie, pas de marque différenciée, pas de plan financier. Ce guide corrige cela." />
        <Divider color={ACC} />
        <SH3 color={ACC}>Les 5 enjeux majeurs de l'entrepreneur africain en 2026</SH3>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0" }}>
          {[
            { n: "01", color: ACC,  text: "La concurrence digitale : des rivaux moins expérimentés mais mieux positionnés en ligne captent tes clients." },
            { n: "02", color: SEC,  text: "L'accès au financement : les banques classiques restent inaccessibles à 70% des PME. Il existe des alternatives." },
            { n: "03", color: VIOL, text: "La confiance du consommateur : au Sénégal, la crédibilité s'achète avec la cohérence et la durée, pas avec un beau logo." },
            { n: "04", color: ORG,  text: "La gestion financière : mélanger les finances perso et pro reste l'une des premières causes d'échec." },
            { n: "05", color: GOLD, text: "Le talent humain : trouver et garder les bons collaborateurs dans un marché du travail en pleine mutation." },
          ].map((e) => (
            <div key={e.n} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "7px", flexShrink: 0, background: `${e.color}15`, border: `1px solid ${e.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: e.color }}>{e.n}</span>
              </div>
              <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.65 }}>{e.text}</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Ce guide est différent" text="Il ne parle pas de l'Afrique de façon générale. Chaque conseil est contextualisé : FCFA, Wave, RCCM, IPRES, ADEPME, Dakar, marché CEDEAO. Des vérités de terrain, pas des copies de livres américains." />
      </ContentPage>

      {/* ── P7 INTRO CONTENT 2 ── */}
      <ContentPage chapter="Introduction" accent={ACC} pageNum={7} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'économie sénégalaise en chiffres — 2026</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0 14px" }}>
          {[
            { value: "8,1%", label: "Croissance du PIB — parmi les plus fortes d'Afrique sub-saharienne", color: SEC },
            { value: "55%", label: "Taux de pénétration internet — et en forte progression", color: ACC },
            { value: "8M+", label: "Utilisateurs actifs Wave — paiement mobile dominant", color: GOLD },
            { value: "60%", label: "de la population a moins de 25 ans — marché de masse en croissance", color: VIOL },
            { value: "4,5M", label: "Sénégalais actifs sur Facebook — dont tes clients", color: "#EC4899" },
            { value: "3M+", label: "de nouveaux entrepreneurs potentiels dans la zone UEMOA", color: ORG },
          ].map((s) => (
            <div key={s.label} style={{ padding: "10px 12px", borderRadius: "8px", background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
              <p style={{ fontFamily: FD, fontSize: "24px", fontWeight: 700, color: s.color, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#5A5450", margin: 0, lineHeight: 1.5 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <Body>Ces chiffres ne sont pas là pour impressionner. Ils montrent une réalité : <strong>le marché est là, la demande est là, et l'espace pour des entrepreneurs structurés est immense.</strong> Ce guide est ton avantage compétitif.</Body>
        <Callout color={ACC} title="Comment utiliser ce guide" text="Lis-le une première fois de bout en bout pour avoir la vision d'ensemble. Ensuite, reviens chapitre par chapitre et applique. Un chapitre par semaine = guide terminé en 4 mois. Un chapitre par jour = base solide en 3 semaines." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH1 — MINDSET  (P8–P10)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P8 CH1 OPENER ── */}
      <ChapterPage
        num={1}
        title="Le mindset de l'entrepreneur qui réussit"
        hook="Avant le business plan, avant le capital, avant les clients — il y a la tête. Les entrepreneurs qui durent ne sont pas les plus intelligents. Ce sont ceux qui ont les bonnes croyances et les bonnes habitudes."
        accent={VIOL}
        pageNum={8}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P9 CH1 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 01 — Mindset" accent={VIOL} pageNum={9} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 10 qualités de l'entrepreneur africain qui réussit</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "8px 0" }}>
          {[
            { n: 1, color: VIOL, title: "Résilience culturelle", text: "Il sait que l'échec est une leçon, pas une honte. Il rebondit sans perdre la face grâce à un réseau de soutien." },
            { n: 2, color: ACC,  title: "Ancrage local profond",  text: "Il comprend les codes culturels, parle wolof dans ses publications, célèbre Korité et Tabaski avec sincérité." },
            { n: 3, color: SEC,  title: "Capacité d'adaptation", text: "Il ajuste son offre rapidement quand le marché évolue, sans s'accrocher à son idée initiale." },
            { n: 4, color: GOLD, title: "Orientation résultats",  text: "Il mesure tout : ventes hebdomadaires, coût d'acquisition, taux de fidélisation." },
            { n: 5, color: ORG,  title: "Vision long terme",      text: "Il plante des arbres sous lesquels il ne s'assoira peut-être pas — mais il construit quelque chose qui dure." },
            { n: 6, color: VIOL, title: "Discipline systémique",  text: "Il a des routines : point financier hebdomadaire, revue mensuelle, bilan trimestriel." },
            { n: 7, color: ACC,  title: "Intelligence relationnelle", text: "Il entretient son réseau activement — la 'Teranga' sénégalaise est un atout business réel." },
            { n: 8, color: SEC,  title: "Maîtrise du digital",    text: "Il comprend les outils numériques sans forcément être expert — il sait déléguer intelligemment." },
            { n: 9, color: GOLD, title: "Gestion financière rigoureuse", text: "Il sépare ses finances perso et pro dès le premier jour. Jamais d'exception." },
            { n: 10, color: ORG, title: "Capacité à déléguer",    text: "Il comprend qu'un entrepreneur qui fait tout lui-même a un employé, pas une entreprise." },
          ].map((q) => (
            <div key={q.n} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "6px", flexShrink: 0, background: `${q.color}15`, border: `1px solid ${q.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: q.color }}>{q.n}</span>
              </div>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>
                <strong style={{ color: DARK }}>{q.title} : </strong>{q.text}
              </p>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P10 CH1 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 01 — Mindset" accent={VIOL} pageNum={10} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 7 erreurs fatales de l'entrepreneur sénégalais</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { n: 1, color: "#DC2626", title: "Tout faire seul",            text: "L'entrepreneur solo qui refuse de déléguer, de payer un comptable, d'embaucher. Il reste plafonné à ce que ses 24h permettent." },
            { n: 2, color: "#DC2626", title: "Mélanger les caisses",       text: "Utiliser l'argent du business pour les dépenses familiales sans traçabilité. La cause n°1 de fermeture." },
            { n: 3, color: ORG,       title: "Imiter sans comprendre",     text: "Copier ce qui marche pour un concurrent sans comprendre POURQUOI ça marche. Résultat : investissement sans retour." },
            { n: 4, color: ORG,       title: "Négliger le suivi client",   text: "Dépenser pour acquérir des clients, puis les ignorer après la première vente. Le client fidèle coûte 5× moins cher à conserver." },
            { n: 5, color: GOLD,      title: "Croissance prématurée",      text: "Louer un grand bureau, embaucher 5 personnes dès le premier mois — avant d'avoir une base clients stable et un cash-flow positif." },
            { n: 6, color: GOLD,      title: "Ignorer la fiscalité",       text: "Ouvrir sans RCCM, ne pas déclarer la TVA, ne pas payer les cotisations sociales. Le redressement fiscal peut tuer une entreprise en 1 lettre." },
            { n: 7, color: VIOL,      title: "Abandonner trop tôt",        text: "La plupart des entreprises qui auraient réussi ont été abandonnées à 6 mois, juste avant de passer le cap de rentabilité." },
          ].map((e) => (
            <div key={e.n} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 10px", borderRadius: "7px", background: `${e.color}06`, border: `1px solid ${e.color}18` }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0, background: `${e.color}18`, border: `1px solid ${e.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: e.color }}>{e.n}</span>
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: e.color, margin: "0 0 2px" }}>{e.title}</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "#3A3530", margin: 0, lineHeight: 1.55 }}>{e.text}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout color={VIOL} title="La règle fondamentale" text="Travaille SUR ton entreprise, pas uniquement DANS ton entreprise. 20% de ton temps doit être consacré à la stratégie, pas aux opérations." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH2 — VALIDER SON IDÉE  (P11–P14)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P11 CH2 OPENER ── */}
      <ChapterPage
        num={2}
        title="Valider son idée avant d'investir"
        hook="Des milliers de FCFA et des mois de travail partent à la poubelle chaque année au Sénégal parce que des entrepreneurs ont sauté l'étape de validation. Avant de dépenser un franc, prouve que quelqu'un veut payer pour ton idée."
        accent={SEC}
        pageNum={11}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P12 CH2 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 02 — Valider son idée" accent={SEC} pageNum={12} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Business Model Canvas adapté au contexte africain</SH2>
        <Body>Le BMC original (Osterwalder) est un outil puissant mais pensé pour les marchés occidentaux. Voici une version adaptée aux réalités sénégalaises et africaines :</Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px", margin: "8px 0 12px" }}>
          {[
            { block: "Problème réel",            color: "#DC2626", desc: "Quel problème concret résous-tu ? Évite les problèmes hypothétiques. Demande à 20 personnes si ce problème existe vraiment dans leur vie." },
            { block: "Segment clients",           color: ACC,       desc: "Qui exactement ? Femme 30-45 ans, classe moyenne Dakar, propriétaire de boutique — pas 'tout le monde'." },
            { block: "Proposition de valeur",     color: SEC,       desc: "Pourquoi toi plutôt qu'un concurrent ? Délai ? Prix ? Qualité ? Livraison à domicile ? Wave accepté ?" },
            { block: "Canaux de distribution",    color: VIOL,      desc: "Comment atteindre tes clients ? WhatsApp, bouche-à-oreille, marché, Facebook, livraison à domicile ?" },
            { block: "Sources de revenus",        color: GOLD,      desc: "Comment tu gagnes de l'argent ? Vente directe ? Abonnement mensuel ? Commission ? Grossiste ?" },
            { block: "Structure de coûts",        color: ORG,       desc: "Quels sont tes coûts incompressibles ? Loyer, matières premières, transport, salaires, connexion internet ?" },
            { block: "Ressources clés (locales)", color: SEC,       desc: "Savoir-faire, contacts fournisseurs, réseau wolof, artisans locaux, dépôt, véhicule." },
            { block: "Partenaires stratégiques",  color: VIOL,      desc: "Qui peut t'aider sans être concurrent ? Livreurs Yobante, fournisseurs grossistes, influenceurs locaux." },
            { block: "Indicateurs de succès",     color: ACC,       desc: "Définis 3 KPIs dès le départ : chiffre d'affaires mensuel cible, nombre de clients, taux de répétition." },
          ].map((b) => (
            <div key={b.block} style={{ padding: "9px 10px", borderRadius: "7px", background: `${b.color}07`, border: `1px solid ${b.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 800, color: b.color, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{b.block}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#3A3530", margin: 0, lineHeight: 1.55 }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Remplis ce canevas en 2h" text="Pas sur ordinateur. Prends une grande feuille, imprime ou dessine les 9 blocs, et remplis-les avec des post-its. Ce que tu ne peux pas remplir révèle ce que tu ne sais pas encore." />
      </ContentPage>

      {/* ── P13 CH2 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 02 — Valider son idée" accent={SEC} pageNum={13} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Étude de marché locale en 5 étapes pratiques</SH2>
        <Body>Une étude de marché n'a pas besoin de coûter des millions. Voici comment faire une étude solide avec 50 000 FCFA ou moins :</Body>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { step: "Étape 1", color: ACC, title: "Observation terrain", text: "Passe 3 jours à observer tes concurrents : qui vient acheter, à quelle heure, comment ils paient, ce dont ils se plaignent. C'est la meilleure donnée qui soit." },
            { step: "Étape 2", color: SEC, title: "Les 20 interviews", text: "Trouve 20 personnes de ton segment cible (pas ta famille — ils diront oui à tout). Pose 5 questions : quel est le problème, comment il le règle actuellement, combien il paye, ce qu'il changerait, si tu proposais X combien il paierait." },
            { step: "Étape 3", color: VIOL, title: "Analyse concurrentielle", text: "Liste 5 concurrents directs. Pour chacun : prix, zone de chalandise, points forts, points faibles, clients-types. Note ce qu'ils ne font pas — c'est là ta niche." },
            { step: "Étape 4", color: GOLD, title: "Test MVP (Produit Minimum Viable)", text: "Avant de tout investir : vends 10 unités. Si tu ne trouves pas 10 acheteurs dans ton réseau à prix plein, le marché n'est peut-être pas là." },
            { step: "Étape 5", color: ORG, title: "Calcul de rentabilité simple", text: "Pour être rentable dès le 1er mois : (coûts fixes + coûts variables) ÷ marge par vente = nombre minimum de ventes par mois. Ce chiffre est ton objectif de survie." },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ padding: "4px 8px", borderRadius: "6px", flexShrink: 0, background: `${s.color}12`, border: `1px solid ${s.color}25`, minWidth: "54px", textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 800, color: s.color, margin: 0 }}>{s.step}</p>
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{s.title}</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "#3A3530", margin: 0, lineHeight: 1.6 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P14 CH2 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 02 — Valider son idée" accent={SEC} pageNum={14} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Secteurs porteurs au Sénégal en 2026</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { sector: "Agroalimentaire & transformation", color: SEC, why: "Demande locale très forte, valorisation des produits locaux (thiébou dieune en conserve, jus locaux bio, noix de cajou transformée). Subventions disponibles ADEPME." },
            { sector: "Tech & services numériques",        color: ACC, why: "Fintech, solutions de paiement, apps mobiles, e-learning. La pénétration mobile dépasse celle d'internet fixe. Boom des startups CTIC Dakar." },
            { sector: "BTP & décoration intérieure",       color: ORG, why: "Urbanisation accélérée de Dakar, marché immobilier actif. Niches : menuiserie aluminium, carrelage, peinture professionnelle, immobilier locatif." },
            { sector: "Santé & bien-être",                 color: VIOL, why: "Médecine naturelle, pharmacies, cliniques privées, fitness. Classe moyenne en croissance cherche services de santé de qualité." },
            { sector: "Formation & coaching",              color: GOLD, why: "Compétences numériques, langues, développement personnel. TikTok et YouTube permettent d'atteindre des clients à coût quasi-zéro." },
            { sector: "Mode, beauté & cosmétiques",        color: "#EC4899", why: "Cosmétiques naturels africains (karité, argile, plantes), wax, prêt-à-porter local. Instagram et TikTok = vitrines gratuites très efficaces." },
          ].map((s) => (
            <div key={s.sector} style={{ padding: "10px 12px", borderRadius: "8px", background: `${s.color}07`, border: `1px solid ${s.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: s.color, margin: "0 0 5px" }}>{s.sector}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#3A3530", margin: 0, lineHeight: 1.55 }}>{s.why}</p>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Questions à te poser avant de te lancer" text="1. Est-ce que des gens paient DÉJÀ pour ce problème, même imparfaitement ? 2. Peux-tu être meilleur que les solutions actuelles ? 3. As-tu les ressources (réseau, savoir-faire, capital) pour tenir 12 mois ? Si tu réponds oui à ces 3 questions — lance-toi." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH3 — FORMALISER  (P15–P18)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P15 CH3 OPENER ── */}
      <ChapterPage
        num={3}
        title="Formaliser son entreprise au Sénégal"
        hook="Travailler dans l'informel peut sembler plus simple au départ. Mais sans structure légale, tu ne peux pas signer de contrats B2B, accéder aux financements publics, ni embaucher légalement. La formalisation, c'est ce qui transforme un commerce en entreprise."
        accent={ORG}
        pageNum={15}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P16 CH3 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 03 — Formalisation" accent={ORG} pageNum={16} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les formes juridiques disponibles au Sénégal</SH2>
        <MiniTable
          color={ORG}
          headers={["Forme", "Capital minimum", "Personnes", "Pour qui"]}
          rows={[
            ["SUARL", "100 000 FCFA", "1 associé", "Freelance, solo entrepreneur, artisan qualifié"],
            ["SARL", "100 000 FCFA", "2–50 associés", "PME classique, société familiale, partenariat"],
            ["SA", "10 000 000 FCFA", "7 actionnaires min.", "Grande entreprise, levée de fonds, introduction en bourse"],
            ["GIE", "Aucun fixe", "Membres variables", "Groupements d'artisans, coopératives, associations producteurs"],
            ["SNC", "Aucun fixe", "2 associés min.", "Professions libérales, partenariats solides — risque illimité"],
            ["Entreprise individuelle", "Aucun", "1 personne", "Très petite activité, testez un concept rapidement"],
          ]}
        />
        <Divider color={ORG} />
        <SH3 color={ORG}>Notre recommandation par profil</SH3>
        <BulletList color={ORG} items={[
          { bold: "Tu démarres seul < 5M FCFA CA prévu :", text: "commence en entreprise individuelle, passe en SUARL dans 6-12 mois quand les revenus sont stables" },
          { bold: "Tu as 1-3 associés :", text: "SARL avec capital 1M FCFA minimum — protège les associés et crédibilise l'entreprise" },
          { bold: "Tu veux accéder aux marchés publics :", text: "SARL ou SA obligatoire dans la majorité des cas" },
          { bold: "Groupement d'artisans / producteurs :", text: "GIE — plus rapide à créer, adapté aux projets collectifs" },
        ]} />
        <Callout color={GOLD} title="Le piège du capital social" text="Un capital social élevé améliore ta crédibilité (banques, clients institutionnels, partenaires). Mais il n'a pas à être disponible en cash immédiatement — des apports en nature (équipements, mobilier, véhicule) comptent dans le capital." />
      </ContentPage>

      {/* ── P17 CH3 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 03 — Formalisation" accent={ORG} pageNum={17} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Créer son entreprise pas à pas : RCCM & NINEA</SH2>
        <SH3 color={ORG}>Les étapes au Registre du Commerce et du Crédit Mobilier (RCCM)</SH3>
        <NumberedList color={ORG} items={[
          "Rédiger les statuts de la société (notaire obligatoire pour SARL/SA) — coût estimé : 80 000 à 150 000 FCFA",
          "Publier un avis de constitution dans un Journal d'Annonces Légales (JAL) agréé — coût : 30 000 à 50 000 FCFA",
          "Déposer le dossier au Tribunal de Commerce de Dakar ou tribunal régional : statuts, identité des associés, pièces d'identité",
          "Obtenir ton numéro RCCM : l'extrait K-bis sénégalais. Délai : 3 à 15 jours ouvrables",
          "Faire domicilier l'entreprise (adresse officielle) — chez toi ou dans un espace de coworking",
        ]} />
        <Divider color={ORG} />
        <SH3 color={ORG}>Obtenir le NINEA (Numéro d'Identification National des Entreprises et Associations)</SH3>
        <Body>Le NINEA est ton identifiant fiscal. Sans lui, tu ne peux pas facturer la TVA, ni être payé par des grandes entreprises ou l'État.</Body>
        <BulletList color={ORG} items={[
          { bold: "Où :", text: "Direction Générale des Impôts et Domaines (DGID) — guichet unique APIX pour les créations d'entreprise" },
          { bold: "Documents requis :", text: "copie des statuts, RCCM, pièce d'identité du dirigeant, bail ou justificatif de domiciliation" },
          { bold: "Délai :", text: "24-72h si dossier complet — APIX accompagne gratuitement" },
          { bold: "Coût :", text: "Gratuit pour les PME passant par l'APIX" },
        ]} />
        <Callout color={ACC} title="Le guichet unique APIX" text="L'Agence pour la Promotion des Investissements et des Grands Travaux (APIX) offre un guichet unique à Dakar qui regroupe toutes les formalités de création : RCCM, NINEA, déclaration IPRES et CSS. Comptez 1 à 3 jours et moins de 200 000 FCFA tout compris." />
      </ContentPage>

      {/* ── P18 CH3 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 03 — Formalisation" accent={ORG} pageNum={18} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Documents et outils incontournables du créateur</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { doc: "Compte bancaire professionnel", color: ACC, text: "Séparation des finances dès J+1. Banques recommandées : Ecobank, UBA, CBAO, BHS, Banque Atlantique. Wave Business pour les petites transactions." },
            { doc: "Cachet officiel de l'entreprise", color: ORG, text: "Obligatoire sur les devis, factures, contrats. Coût : 5 000 à 15 000 FCFA. Grave le nom, RCCM et NINEA." },
            { doc: "Modèle de devis et factures", color: SEC, text: "Mentions légales obligatoires : nom, RCCM, NINEA, adresse, date, description, prix HT/TTC, modes de paiement. Utilisez Wave Invoice ou un tableur." },
            { doc: "Contrats types", color: VIOL, text: "Contrat de prestation de services (B2B), contrat de vente (B2C), accord de confidentialité. Faites relire par un juriste pour les > 500 000 FCFA." },
            { doc: "Registre des dépenses et recettes", color: GOLD, text: "Même simple (Excel ou cahier), un registre quotidien est obligatoire légalement et indispensable pour ta gestion." },
            { doc: "Assurance professionnelle", color: ORG, text: "Responsabilité civile professionnelle à minima. Obligatoire si tu travailles en B2B ou manipules des biens de valeur. NSIA, Allianz, Saar." },
          ].map((d) => (
            <div key={d.doc} style={{ padding: "9px 11px", borderRadius: "7px", background: `${d.color}07`, border: `1px solid ${d.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 800, color: d.color, margin: "0 0 4px" }}>{d.doc}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#3A3530", margin: 0, lineHeight: 1.55 }}>{d.text}</p>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Formalisation rapide : la checklist" text="□ RCCM obtenu  □ NINEA obtenu  □ Compte bancaire pro ouvert  □ Cachet commandé  □ Modèle de facture créé  □ Registre de caisse commencé  □ Domiciliation officielle  □ Inscription IPRES (si tu embauches)" />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH4 — MARQUE  (P19–P22)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P19 CH4 OPENER ── */}
      <ChapterPage
        num={4}
        title="Construire une marque puissante"
        hook="Au Sénégal, on confond souvent branding et logo. Le logo est la partie visible. La marque, c'est ce que les gens ressentent quand ils entendent ton nom — la confiance, l'attente, l'émotion. Tu peux avoir un beau logo et une marque nulle, ou un logo simple et une marque extraordinaire."
        accent={VIOL}
        pageNum={19}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P20 CH4 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 04 — Marque" accent={VIOL} pageNum={20} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 6 fondations d'une marque sénégalaise forte</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { n: "01", color: VIOL, title: "Le nom — mémorable et prononçable en wolof", text: "Un nom difficile à prononcer en wolof est un frein. Les meilleurs noms d'entreprises sénégalaises sont soit en wolof (fort différenciateur), soit un prénom + spécialité, soit descriptifs et courts." },
            { n: "02", color: ACC,  title: "La promesse unique — une ligne, pas un paragraphe", text: "'Livraison garantie en 24h ou remboursé' · 'Le seul traiteur de Dakar à cuisiner sans glutamate' · 'Couture sur mesure livrée en 7 jours'. Une promesse concrète, tenue, et différenciante." },
            { n: "03", color: SEC,  title: "Le positionnement — la case que tu occupes dans l'esprit du client", text: "Luxe accessible ? Expert technique ? Service le plus rapide ? Service le moins cher ? Tu dois occuper une case claire. L'entreprise qui veut tout être ne domine aucun espace." },
            { n: "04", color: GOLD, title: "Le ton de communication — ta voix de marque", text: "Formel et expert (avocats, consultants, cliniques) ou chaleureux et accessible (restauration, mode, services de proximité) ? Définis-le et tiens-toi y sur toutes tes plateformes." },
            { n: "05", color: ORG,  title: "La cohérence visuelle — 3 couleurs max", text: "Tes couleurs, ta typographie, tes visuels doivent être reconnaissables au premier regard. Canva permet de créer une identité cohérente sans être graphiste." },
            { n: "06", color: VIOL, title: "L'authenticité locale — ce que les marques étrangères ne peuvent pas copier", text: "Ta connaissance du quartier, des codes culturels, de la langue. L'entreprise qui célèbre Korité avec sincérité, qui poste en wolof, qui livre dans les HLM — elle a un avantage que Red Bull n'aura jamais." },
          ].map((f) => (
            <div key={f.n} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "8px", flexShrink: 0, background: `${f.color}15`, border: `1px solid ${f.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: f.color }}>{f.n}</span>
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{f.title}</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "#3A3530", margin: 0, lineHeight: 1.6 }}>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P21 CH4 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 04 — Marque" accent={VIOL} pageNum={21} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Construire son identité visuelle avec un budget limité</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0" }}>
          {[
            { level: "Budget 0 FCFA", color: SEC, items: ["Canva gratuit (canva.com) — des centaines de templates professionnels", "Google Fonts — polices gratuites, qualité professionnelle", "Coolors.co — générateur de palettes de couleurs harmonieuses", "Remove.bg — suppression de fond sur tes photos produits"] },
            { level: "Budget 50 000 – 150 000 FCFA", color: ACC, items: ["Fiverr ou 99designs — graphistes freelance internationaux (payés en $ via Wave d.money)", "Upwork Sénégal — freelances locaux qualifiés en graphic design", "Canva Pro (13 $/mois) — accès à des templates premium et des éléments payants"] },
            { level: "Budget 200 000 – 500 000 FCFA", color: VIOL, items: ["Agence de design locale (Dakar) — identité complète : logo, charte, templates", "Shooting photo professionnel — les photos sont la partie la plus visible de ta marque", "Guide de marque complet — document de référence pour toutes tes communications"] },
          ].map((lvl) => (
            <div key={lvl.level} style={{ padding: "10px 13px", borderRadius: "8px", background: `${lvl.color}07`, border: `1px solid ${lvl.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: lvl.color, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{lvl.level}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                {lvl.items.map((item, i) => (
                  <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.5 }}>→ {item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Divider color={VIOL} />
        <SH3 color={VIOL}>Les 5 erreurs de branding les plus fréquentes au Sénégal</SH3>
        <BulletList color="#DC2626" items={[
          { bold: "Logo de qualité médiocre :", text: "un logo pixelisé communique 'je ne fais pas attention aux détails' — c'est une erreur avant même que le client ait vu ton produit" },
          { bold: "Changer de logo tous les 6 mois :", text: "la reconnaissance de marque demande de la répétition et du temps" },
          { bold: "Imiter une grande marque :", text: "ressembler à Orange, Tigo ou une marque internationale confond le client et nuit à ta crédibilité" },
          { bold: "Négliger les photos :", text: "une photo floue ou mal éclairée tue toute la confiance que ton logo a construite" },
        ]} />
      </ContentPage>

      {/* ── P22 CH4 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 04 — Marque" accent={VIOL} pageNum={22} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Définir ta proposition de valeur unique</SH2>
        <Body>La proposition de valeur unique (PVU) est la réponse à la question : <strong>"Pourquoi je devrais acheter chez toi plutôt que chez ton concurrent ?"</strong></Body>
        <Callout color={VIOL} title="Formule de la PVU" text="Je suis [qui tu es] qui aide [ton client cible] à [résoudre quel problème] grâce à [ta solution unique], contrairement à [tes concurrents] qui [ce qu'ils font moins bien]." />
        <Divider color={VIOL} />
        <SH3 color={VIOL}>Exemples concrets de PVU sénégalaises</SH3>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "6px 0 12px" }}>
          {[
            { biz: "Traiteur", color: ACC,  pvu: "Le seul traiteur de Dakar qui livre chaud partout dans les banlieues en moins de 45 minutes — ou la prochaine commande est offerte." },
            { biz: "Couture", color: VIOL, pvu: "Robes sur mesure pour femmes sénégalaises modernes, livrées en 7 jours, avec 2 retouches gratuites incluses. Paiement Wave accepté." },
            { biz: "Coaching", color: SEC,  pvu: "J'aide les entrepreneurs dakarois à doubler leurs ventes en 90 jours grâce à WhatsApp — sans budget publicitaire." },
            { biz: "BTP",     color: ORG,  pvu: "Travaux de peinture professionnels avec devis gratuit sous 24h, chantier propre garanti, et garantie 2 ans sur les finitions." },
          ].map((ex) => (
            <div key={ex.biz} style={{ padding: "9px 12px", borderRadius: "7px", background: `${ex.color}07`, border: `1px solid ${ex.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: ex.color, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{ex.biz}</p>
              <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>"{ex.pvu}"</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Ton exercice" text="Écris ta PVU en une seule phrase. Montre-la à 5 clients potentiels. Si après lecture ils comprennent exactement ce que tu fais et pour qui — tu as trouvé. Sinon, recommence." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH5 — WHATSAPP BUSINESS  (P23–P26)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P23 CH5 OPENER ── */}
      <ChapterPage
        num={5}
        title="WhatsApp Business Pro"
        hook="Au Sénégal, WhatsApp n'est pas une application de messagerie. C'est l'infrastructure de communication du pays. 95% de tes clients l'utilisent quotidiennement. Si tu maîtrises WhatsApp Business, tu maîtrises le premier canal de vente du Sénégal."
        accent={SEC}
        pageNum={23}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P24 CH5 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 05 — WhatsApp Business" accent={SEC} pageNum={24} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Configuration WhatsApp Business à 100%</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0 10px" }}>
          {[
            { step: "1", color: SEC, label: "Photo de profil",        text: "Logo ou photo professionnelle de toi (pas de selfie). Format carré, 500×500px minimum, fond uni ou transparent." },
            { step: "2", color: ACC, label: "Nom de l'entreprise",    text: "Nom officiel de ta marque — pas ton prénom personnel. Ce nom apparaît à tous tes contacts." },
            { step: "3", color: VIOL,label: "Description",            text: "60 mots maximum : ce que tu fais, pour qui, et ton avantage principal. Inclus tes horaires et ton lien de catalogue." },
            { step: "4", color: ORG, label: "Catégorie",              text: "Choisir la catégorie la plus précise (Alimentation, Services professionnels, Beauté…). Ça aide WhatsApp à te recommander." },
            { step: "5", color: GOLD,label: "Adresse & Horaires",     text: "Remplis même si tu livres à domicile. Les clients rassurent de savoir que tu as une adresse fixe." },
            { step: "6", color: SEC, label: "Site web ou lien catalogue", text: "Lien vers ton Instagram, ta boutique en ligne, ou ton catalogue WhatsApp." },
            { step: "7", color: ACC, label: "Message d'accueil automatique", text: "Envoyé quand un client t'écrit pour la première fois. Doit inclure : accueil chaleureux, présentation rapide, et action suivante claire (lien catalogue, devis gratuit)." },
            { step: "8", color: VIOL,label: "Message d'absence",      text: "Pour les heures hors travail : 'Bonjour ! Je suis absent(e) jusqu'à [heure]. Je vous réponds dès que possible. En attendant, consultez : [lien]'" },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 800, color: s.color }}>{s.step}</span>
              </div>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>
                <strong style={{ color: DARK }}>{s.label} : </strong>{s.text}
              </p>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Les réponses rapides — ton gain de temps quotidien" text="Crée des raccourcis avec / pour tes questions fréquentes : /tarifs → envoie ton catalogue de prix  /livraison → tes conditions et zones de livraison  /paiement → tes modes de paiement (Wave, OM, virement)  /devis → formulaire ou instruction pour demander un devis" />
      </ContentPage>

      {/* ── P25 CH5 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 05 — WhatsApp Business" accent={SEC} pageNum={25} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le catalogue WhatsApp : ton showroom dans la poche</SH2>
        <Body>Le catalogue WhatsApp permet à tes clients de voir tes produits/services directement dans l'application, sans lien externe, sans s'ouvrir sur un navigateur.</Body>
        <BulletList color={SEC} items={[
          { bold: "Photo :", text: "minimum 640×640px, fond blanc ou uni, produit bien éclairé — une photo professionnelle peut tripler ton taux de conversion" },
          { bold: "Nom :", text: "descriptif et contenant le mot-clé principal ('Boubou femme wax indigo taille L')" },
          { bold: "Prix :", text: "toujours en FCFA, clairement affiché — 'Prix sur demande' génère peu de contacts sérieux" },
          { bold: "Description :", text: "avantages, dimensions, couleurs disponibles, délai de livraison, modes de paiement acceptés" },
        ]} />
        <Divider color={SEC} />
        <SH2 color={DARK}>Les listes de diffusion : marketing de masse personnalisé</SH2>
        <Body>Une liste de diffusion envoie ton message à jusqu'à <strong>256 contacts</strong> simultanément, mais chaque personne reçoit le message en privé — pas dans un groupe visible de tous.</Body>
        <MiniTable
          color={SEC}
          headers={["Nom de la liste", "Qui mettre dedans", "Fréquence"]}
          rows={[
            ["Clients VIP", "Tes 20 meilleurs clients (achat répété)", "2-3× / semaine"],
            ["Clients actifs", "Tout client ayant acheté dans les 3 mois", "1-2× / semaine"],
            ["Prospects chauds", "Ont demandé un devis mais n'ont pas encore acheté", "1× / semaine"],
            ["Partenaires", "Revendeurs, prescripteurs, influenceurs", "2× / mois"],
          ]}
        />
        <Callout color={GOLD} title="Règle d'or des listes de diffusion" text="N'ajoute jamais quelqu'un sans son accord préalable. Les contacts qui te bloquent endommagent ta réputation WhatsApp et peuvent mener à la suspension de ton compte Business." />
      </ContentPage>

      {/* ── P26 CH5 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 05 — WhatsApp Business" accent={SEC} pageNum={26} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>WhatsApp Status : 5 types de contenus qui performent</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 14px" }}>
          {[
            { n: "01", color: SEC,  title: "Produit / service du jour",    text: "Photo + prix + call to action. Simple, efficace. 'Boubou du jour — disponible en rouge et bleu — 35 000 FCFA — Wave accepté'" },
            { n: "02", color: ACC,  title: "Témoignage client",            text: "Screenshot d'un message WhatsApp positif (avec accord) ou video courte d'un client satisfait. Rien ne vend mieux." },
            { n: "03", color: VIOL, title: "Coulisses de travail",         text: "Montrer comment tu prépares, fabrique, livre. Crée de l'attachement et de la confiance. Très bien accepté culturellement." },
            { n: "04", color: GOLD, title: "Offre limitée dans le temps",  text: "'Aujourd'hui uniquement : -15% sur toutes les commandes. Valable jusqu'à 20h.' L'urgence crée de l'action." },
            { n: "05", color: ORG,  title: "Conseil / astuce gratuite",    text: "Partage ton expertise : 'Comment choisir son tissu wax de qualité en 3 étapes'. Positionne-toi comme expert." },
          ].map((s) => (
            <div key={s.n} style={{ padding: "9px 11px", borderRadius: "8px", background: `${s.color}07`, border: `1px solid ${s.color}22` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: s.color }}>{s.n}</span>
                <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: DARK, margin: 0 }}>{s.title}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#3A3530", margin: 0, lineHeight: 1.55 }}>{s.text}</p>
            </div>
          ))}
        </div>
        <SH3 color={SEC}>Fréquence recommandée pour les Status</SH3>
        <BulletList color={SEC} items={[
          { bold: "Minimum :", text: "2 status par jour (matin et fin d'après-midi)" },
          { bold: "Optimal :", text: "3-5 status par jour, espacés de 2-3h" },
          { bold: "Maximum :", text: "7-8 status par jour — au-delà, les contacts commencent à ignorer" },
        ]} />
        <Callout color={ACC} title="WhatsApp Business API — pour aller plus loin" text="Quand tu dépasses 500 clients actifs, WhatsApp Business API (via des plateformes comme Wati.io ou Respond.io) te permet d'automatiser, de gérer plusieurs agents, et d'envoyer des campagnes à grande échelle. Budget : 15 000 à 50 000 FCFA/mois selon les plateformes." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH6 — RÉSEAUX SOCIAUX  (P27–P30)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P27 CH6 OPENER ── */}
      <ChapterPage
        num={6}
        title="Réseaux sociaux : Facebook, Instagram, TikTok"
        hook="Ne sois pas présent sur tous les réseaux. Maîtrise parfaitement 2 plateformes, publie avec constance, engage ta communauté avec authenticité. C'est cette discipline — pas les algorithmes — qui fait croître une marque au Sénégal."
        accent={ACC}
        pageNum={27}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P28 CH6 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 06 — Réseaux Sociaux" accent={ACC} pageNum={28} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Facebook au Sénégal : le réseau des décideurs</SH2>
        <Body>Avec 4,5 millions d'utilisateurs actifs dont une majorité dans la tranche 25-55 ans, Facebook reste le réseau des chefs de famille, des responsables achats et des décideurs sénégalais. C'est là où ton budget publicitaire aura le meilleur ROI.</Body>
        <SH3 color={ACC}>Les 5 piliers d'une Page Facebook pro</SH3>
        <NumberedList color={ACC} items={[
          "Couverture (851×315px) : photo de tes produits/services avec ton logo + slogan court + numéro WhatsApp visible",
          "Photo de profil : logo parfaitement carré, lisible en miniature",
          "Bouton d'action : 'Envoyer un message' ou 'Appeler maintenant' — le CTA le plus important de ta page",
          "À propos complet : description de 200 mots, site web, téléphone, horaires, adresse, catégorie principale",
          "Avis clients activés et encouragés — un professionnel qui répond à ses avis rassure les nouveaux visiteurs",
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Formats qui performent sur Facebook Sénégal en 2026</SH3>
        <MiniTable
          color={ACC}
          headers={["Format", "Portée organique", "Objectif", "Fréquence"]}
          rows={[
            ["Vidéo native (15-90s)", "Très haute", "Notoriété / engagement", "2× / semaine"],
            ["Post carrousel", "Haute", "Pédagogie / produit", "2× / semaine"],
            ["Photo produit + texte", "Moyenne", "Vente directe", "3× / semaine"],
            ["Sondage / question", "Haute", "Engagement communauté", "1× / semaine"],
            ["Partage d'avis client", "Haute", "Preuve sociale", "1-2× / semaine"],
            ["Live Facebook", "Très haute pendant le live", "Confiance / Q&A", "1× / semaine ou mois"],
          ]}
        />
        <Callout color={GOLD} title="Groupes Facebook — le canal gratuit le plus sous-utilisé" text="Les groupes actifs comme 'Femmes entrepreneures Sénégal', 'Achat/Vente Dakar', 'Entraide créateurs sénégalais' comptent des dizaines de milliers de membres. Une publication utile dans ces groupes peut générer plus de ventes qu'une campagne payante." />
      </ContentPage>

      {/* ── P29 CH6 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 06 — Réseaux Sociaux" accent={ACC} pageNum={29} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Instagram : convertir le désir en achat</SH2>
        <Body>Instagram Sénégal est le réseau des 18-40 ans urbains avec un fort pouvoir d'achat. Les secteurs qui y performent le mieux : mode, beauté, restauration, décoration, formation, immobilier.</Body>
        <MiniTable
          color="#EC4899"
          headers={["Format", "Objectif", "Fréquence recommandée"]}
          rows={[
            ["Reels 15-60s", "Portée / Nouveaux abonnés", "4-5× / semaine"],
            ["Stories quotidiennes", "Engagement / Relation client", "3-7 stories / jour"],
            ["Post carré produit", "Vente directe / Portfolio", "3× / semaine"],
            ["Carrousel conseils", "Expertise / SEO Instagram", "2× / semaine"],
            ["Live Instagram", "Confiance, démonstration, Q&A", "1× / semaine ou 15 jours"],
            ["Collab avec autre compte", "Cross-promotion", "1-2× / mois"],
          ]}
        />
        <Divider color={ACC} />
        <SH2 color={DARK}>TikTok Sénégal : l'arme secrète des petites marques</SH2>
        <Body>TikTok a une portée organique que Facebook et Instagram ont perdue. Un compte de 500 abonnés peut toucher 50 000 personnes avec une seule vidéo si le contenu est bon. C'est la plateforme des 16-30 ans — et ceux-ci influencent les achats familiaux.</Body>
        <BulletList color="#FF0050" items={[
          { bold: "Durée optimale en 2026 :", text: "15-30 secondes pour l'engagement, 45-60s pour les tutoriels. Moins de 60s reste la règle d'or." },
          { bold: "Accroches qui fonctionnent au Sénégal :", text: "'Tu savais que…', 'Erreur que font 90% des entrepreneurs dakarois', 'Comment j'ai fait [résultat] sans [obstacle]'" },
          { bold: "Sons tendance :", text: "utiliser les sons viraux du moment multiplie par 2-3 la portée organique" },
          { bold: "Commentaires :", text: "répondre à chaque commentaire avec une vidéo — format unique à TikTok qui génère une portée supplémentaire" },
        ]} />
        <Callout color={GOLD} title="TikTok Shop arrive en Afrique" text="TikTok Shop — commerce intégré directement dans l'application — est en cours de déploiement en Afrique subsaharienne. Crée ton compte TikTok Business dès maintenant et positionne-toi avant tes concurrents." />
      </ContentPage>

      {/* ── P30 CH6 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 06 — Réseaux Sociaux" accent={ACC} pageNum={30} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Calendrier éditorial sénégalais — L'an entier d'un coup d'œil</SH2>
        <MiniTable
          color={ACC}
          headers={["Période", "Opportunité", "Type de contenu", "Ton"]}
          rows={[
            ["Ramadan & Korité", "Pics de vente mode, alimentation, cadeaux", "Vœux sincères, offres spéciales, ambiance", "Chaleureux, spirituel"],
            ["Tabaski", "Alimentation, mode, cadeaux", "Contenus festifs, promotions mouton, recettes", "Festif, familial"],
            ["4 Avril (Indépendance)", "Fierté nationale, institutions, B2B", "Visuels patriotiques, bilan, vision", "Patriotique, sérieux"],
            ["Rentrée scolaire (sept.)", "Fournitures, vêtements, services enfants", "Guides, conseils pratiques, offres", "Pratique, rassurant"],
            ["Noël / Jour de l'An", "Cadeaux, restauration, sorties, rétrospective", "Vœux, bilans, offres de fin d'année", "Festif, humain"],
            ["Saint-Valentin (14 fév.)", "Mode, restaurants, cadeaux, cosmétiques", "Cadeaux, promotions romantiques", "Romantique, élégant"],
            ["Magal de Touba", "Alimentaire, transport, hôtellerie", "Vœux respectueux, offres logistiques", "Respectueux, communautaire"],
            ["Gamou (Mawlid)", "Alimentaire, mode, événementiel", "Vœux, promotions", "Respectueux, chaleureux"],
          ]}
        />
        <Callout color={VIOL} title="La règle 70/20/10" text="70% de ton contenu doit apporter de la valeur (conseils, coulisses, information), 20% doit engager la communauté (questions, sondages, partages), et seulement 10% doit vendre directement. Les comptes qui ne publient que des publicités perdent leur audience." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH7 — SITE WEB & SEO  (P31–P34)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P31 CH7 OPENER ── */}
      <ChapterPage
        num={7}
        title="Site Web & SEO local"
        hook="Être retrouvé sur Google quand quelqu'un tape 'comptable Dakar' ou 'traiteur mariage Thiès' — c'est l'objectif du SEO local. Et la première étape pour y parvenir est gratuite : Google Business Profile."
        accent={VIOL}
        pageNum={31}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P32 CH7 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 07 — Site Web & SEO" accent={VIOL} pageNum={32} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>As-tu vraiment besoin d'un site web ?</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0 12px" }}>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#16A34A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Oui, priorité, si tu :</p>
            <BulletList color="#16A34A" items={[
              { text: "Vises des clients B2B ou institutionnels" },
              { text: "Proposes des services > 100 000 FCFA" },
              { text: "Veux être trouvé sur Google" },
              { text: "Vends en ligne / acceptes des paiements digitaux" },
              { text: "Veux une crédibilité professionnelle maximale" },
            ]} />
          </div>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: "#FEF9F0", border: "1px solid #FDE68A" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#D97706", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Pas urgent, si tu :</p>
            <BulletList color="#D97706" items={[
              { text: "Viens de démarrer avec < 200 000 FCFA/mois CA" },
              { text: "Travailles à 100% par recommandation" },
              { text: "N'as pas encore de photos professionnelles" },
              { text: "N'as pas de temps pour maintenir un site" },
            ]} />
          </div>
        </div>
        <Callout color="#DC2626" title="Vérité inconfortable" text="Un mauvais site web nuit plus qu'il n'aide. Un site non mis à jour depuis 2 ans, avec des photos de mauvaise qualité et des fautes d'orthographe, communique 'cette entreprise ne fait pas attention.' Mieux vaut pas de site qu'un mauvais site." />
        <SH3 color={VIOL}>Options de création de site par budget</SH3>
        <MiniTable
          color={VIOL}
          headers={["Option", "Coût estimé", "Pour qui", "Avantages"]}
          rows={[
            ["Google Business seul", "Gratuit", "Commerce de proximité Dakar", "Visible sur Google Maps, avis intégrés"],
            ["Linktree / Carrd.co", "Gratuit – 30$/an", "Freelance, formateur solo", "1 page, rapide, lien WhatsApp intégré"],
            ["Wix / Squarespace", "100-200$/an", "PME vitrine simple", "Design professionnel sans code"],
            ["WordPress + hébergeur", "50K-120K FCFA/an", "Boutique, blog, SEO long terme", "Flexible, meilleur SEO, propriété totale"],
            ["Agence web locale Dakar", "200K-1,5M FCFA", "Entreprise avec besoins spécifiques", "Sur mesure, accompagnement"],
          ]}
        />
      </ContentPage>

      {/* ── P33 CH7 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 07 — Site Web & SEO" accent={VIOL} pageNum={33} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Google Business Profile : la priorité absolue</SH2>
        <Body>C'est ta fiche sur Google Maps. Un profil bien optimisé peut t'amener des clients chaque jour, gratuitement, sans publicité. C'est l'outil SEO le plus puissant pour une PME locale.</Body>
        <NumberedList color={VIOL} items={[
          "Crée ou réclame ta fiche sur business.google.com — cherche d'abord si ta fiche existe déjà",
          "Remplis 100% des informations : nom exact, catégorie principale + catégories secondaires, adresse physique, zone de service, horaires, téléphone, site web, description",
          "Ajoute des photos de qualité : au minimum 5 photos de tes produits/services, 1 photo de façade, 1 photo d'équipe. Ajoute-en au moins 1 par mois",
          "Active les messages Google : permet aux clients de te contacter directement depuis la fiche",
          "Utilise la fonction 'Posts' (actualités) pour publier des offres et événements — améliore le SEO local",
          "Réponds à TOUS les avis, positifs et négatifs, en moins de 48h",
        ]} />
        <Divider color={VIOL} />
        <SH3 color={VIOL}>Mots-clés locaux à cibler sur ton site et profil Google</SH3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", margin: "6px 0" }}>
          {[
            "[Service] Dakar", "[Service] pas cher Dakar", "[Service] fiable Sénégal",
            "Meilleur [service] Dakar", "[Service] livraison domicile", "[Service] [quartier] Dakar",
            "[Service] WhatsApp Sénégal", "[Service] 2026 Dakar",
          ].map((kw) => (
            <div key={kw} style={{ padding: "5px 9px", borderRadius: "5px", background: `${VIOL}08`, border: `1px solid ${VIOL}20` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: VIOL, margin: 0 }}>{kw}</p>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Annuaires locaux : des backlinks SEO gratuits" text="Inscris ton entreprise dans : Annuaire.sn · Seneweb Business · Mara Moja (e-commerce Afrique) · Sodatech.sn · Yellowpages Sénégal · LinkedIn (B2B) · Jumia Business. Chaque inscription = 1 lien vers ton site = meilleur référencement Google." />
      </ContentPage>

      {/* ── P34 CH7 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 07 — Site Web & SEO" accent={VIOL} pageNum={34} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 7 pages indispensables d'un site web PME sénégalaise</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "8px 0 12px" }}>
          {[
            { page: "Accueil",          color: VIOL, text: "PVU claire dans les 5 premières secondes + photo de toi ou de ton équipe + CTA fort ('Contactez-nous sur WhatsApp') + 3 chiffres clés qui rassurent" },
            { page: "Services",         color: ACC,  text: "Description claire de ce que tu fais, pour qui, comment. Chaque service a sa propre section avec prix ou fourchette de prix." },
            { page: "À propos",         color: SEC,  text: "Histoire de l'entreprise, photo du fondateur, valeurs. La confiance se gagne aussi sur cette page — les Sénégalais veulent savoir QUI ils paient." },
            { page: "Témoignages",      color: GOLD, text: "Photos des clients + citation en wolof ou français + résultat obtenu. C'est la page qui convertit le mieux." },
            { page: "Contact",          color: ORG,  text: "Formulaire simple, numéro WhatsApp, adresse, carte Google Maps intégrée, horaires. Chaque friction sur cette page = client perdu." },
            { page: "Blog/Ressources",  color: VIOL, text: "2-4 articles optimisés SEO par mois sur des sujets utiles à tes clients. À long terme, c'est la source de trafic organique la plus rentable." },
            { page: "Politique de confidentialité", color: "#aaa", text: "Obligatoire légalement si tu collectes des données (formulaire de contact, paiement en ligne). Protège-toi juridiquement." },
          ].map((p) => (
            <div key={p.page} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ padding: "3px 8px", borderRadius: "5px", flexShrink: 0, background: `${p.color}12`, border: `1px solid ${p.color}25`, minWidth: "70px", textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: p.color, margin: 0 }}>{p.page}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{p.text}</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Hébergeurs sénégalais recommandés" text="Sonatel Business · SenHosting · Africa Digital Services · OVH avec datacenter Europe (rapide depuis Dakar). Exige TOUJOURS les accès hébergement et nom de domaine EN TON NOM — pas dans celui de l'agence." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH8 — PUBLICITÉ DIGITALE  (P35–P38)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P35 CH8 OPENER ── */}
      <ChapterPage
        num={8}
        title="Publicité digitale au Sénégal"
        hook="La publicité digitale n'est pas magique. C'est un investissement : tu dépenses pour tester, tu analyses, et tu doubles ce qui fonctionne. Ce chapitre t'évite les erreurs classiques qui font brûler les budgets sans résultat."
        accent={ORG}
        pageNum={35}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P36 CH8 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 08 — Publicité digitale" accent={ORG} pageNum={36} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Facebook Ads : le point d'entrée recommandé pour les PME</SH2>
        <Body>Facebook Ads reste le canal publicitaire le plus accessible et le plus rentable pour les PME sénégalaises en 2026. Voici comment structurer tes premières campagnes.</Body>
        <SH3 color={ORG}>Structure d'une campagne Facebook Ads pour PME locale</SH3>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "6px 0 12px" }}>
          {[
            { level: "Niveau Campagne", color: ORG,  text: "Objectif : 'Messages' (génère des conversations WhatsApp / Messenger) ou 'Conversions' (si tu as un site). Pour les PME sénégalaises, 'Messages' convertit le mieux." },
            { level: "Niveau Ensemble de publicités", color: ACC, text: "Ciblage : Sénégal + Dakar spécifiquement · Âge : 22-55 ans · Intérêts : adaptés à ton secteur · Budget : 5 000-15 000 FCFA/jour · Durée test : 7-14 jours minimum." },
            { level: "Niveau Publicité", color: SEC,  text: "Visuel : photo réelle (pas de stock photo occidental) · Texte : accroche + 3 avantages + CTA clair + modes de paiement Wave/OM mentionnés · Format : photo ou vidéo courte 15s." },
          ].map((l) => (
            <div key={l.level} style={{ padding: "10px 12px", borderRadius: "7px", background: `${l.color}07`, border: `1px solid ${l.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 800, color: l.color, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>{l.level}</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{l.text}</p>
            </div>
          ))}
        </div>
        <SH3 color={ORG}>Accroches qui convertissent au Sénégal</SH3>
        <BulletList color={ORG} items={[
          { bold: "Question directe :", text: "'Tu cherches un [service] fiable à Dakar ?' — identifie instantanément le bon prospect" },
          { bold: "Chiffre social :", text: "'Plus de 500 familles dakaroises nous font déjà confiance' — la preuve par le nombre" },
          { bold: "Avantage tangible :", text: "'Livraison gratuite dans tout Dakar — Wave accepté' — lève immédiatement les frictions" },
          { bold: "Urgence limitée :", text: "'Offre valable jusqu'à dimanche seulement' — crée l'action sans pression excessive" },
        ]} />
      </ContentPage>

      {/* ── P37 CH8 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 08 — Publicité digitale" accent={ORG} pageNum={37} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment payer les publicités depuis le Sénégal</SH2>
        <Body>C'est la question la plus posée par les entrepreneurs sénégalais qui veulent se lancer dans le digital payant.</Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { method: "Wave d.money (⭐ Recommandé)", color: SEC, text: "Carte Visa virtuelle créée directement dans l'app Wave. En 2026, c'est la solution la plus simple et la plus répandue. Gratuite à créer, rechargeable depuis Wave." },
            { method: "Carte Ecobank / UBA / CBAO", color: ACC, text: "Visa internationale standard. Fonctionne partout. Nécessite un compte bancaire actif et parfois une activation spéciale pour les paiements en ligne." },
            { method: "Djougal / Carte Orange", color: ORG, text: "Carte prépayée rechargeable en Orange Money. Disponible en agences Orange. Adaptée si tu n'as pas de compte bancaire." },
            { method: "Payoneer", color: VIOL, text: "Pour les freelances et entreprises qui reçoivent des paiements en dollar/euro. Fonctionne aussi pour payer les publicités. Délai d'ouverture : 5-7 jours." },
          ].map((m) => (
            <div key={m.method} style={{ padding: "9px 11px", borderRadius: "7px", background: `${m.color}07`, border: `1px solid ${m.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 800, color: m.color, margin: "0 0 4px" }}>{m.method}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#3A3530", margin: 0, lineHeight: 1.55 }}>{m.text}</p>
            </div>
          ))}
        </div>
        <Divider color={ORG} />
        <SH2 color={DARK}>Google Ads Sénégal : quand et pour qui</SH2>
        <Body>Google Ads capture les gens qui cherchent <strong>activement</strong> un service — une intention beaucoup plus forte que Facebook. Mais le coût est plus élevé et la configuration plus technique.</Body>
        <MiniTable
          color={VIOL}
          headers={["Secteur", "Coût par clic estimé", "ROI potentiel"]}
          rows={[
            ["Avocat / Notaire Dakar", "200-800 FCFA", "Très élevé — un client = 500K-5M FCFA"],
            ["Plombier / Electricien", "50-200 FCFA", "Élevé — urgence = conversion rapide"],
            ["Médecin / Clinique privée", "300-1000 FCFA", "Très élevé"],
            ["Traiteur mariage", "100-400 FCFA", "Élevé en saison des mariages"],
            ["Commerce général", "30-100 FCFA", "Moyen — mieux sur Facebook Ads"],
          ]}
        />
      </ContentPage>

      {/* ── P38 CH8 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 08 — Publicité digitale" accent={ORG} pageNum={38} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Mesurer, analyser, optimiser : le cycle publicitaire</SH2>
        <Body>Une publicité non mesurée est une dépense. Une publicité bien mesurée est un investissement. Voici les indicateurs à suivre chaque semaine.</Body>
        <MiniTable
          color={ORG}
          headers={["Indicateur (KPI)", "Définition", "Objectif PME sénégalaise"]}
          rows={[
            ["Coût par message (CPM)", "Coût d'une conversation initiée", "< 500 FCFA — sinon revoir le visuel"],
            ["Taux de clics (CTR)", "% de personnes qui cliquent", "> 1,5% pour un bon ciblage"],
            ["Coût par lead", "Coût pour obtenir un contact qualifié", "< 2 000 FCFA en B2C, < 5 000 FCFA en B2B"],
            ["Taux de conversion message→vente", "% de conversations qui débouchent sur une vente", "> 15% avec un bon script WhatsApp"],
            ["ROAS (Retour sur dépense pub)", "CA généré ÷ Budget dépensé", "> 3× (pour chaque 10 000 dépensés, 30 000+ CA)"],
          ]}
        />
        <Divider color={ORG} />
        <SH3 color={ORG}>Les 5 erreurs qui font brûler le budget publicitaire</SH3>
        <BulletList color="#DC2626" items={[
          { bold: "Cibler 'Tout le Sénégal' :", text: "commence par Dakar uniquement, puis élargis selon les résultats" },
          { bold: "Changer la pub après 2 jours :", text: "l'algorithme a besoin de 5-7 jours pour optimiser — sois patient" },
          { bold: "Une seule pub à la fois :", text: "teste toujours 2-3 visuels en parallèle pour identifier ce qui convertit" },
          { bold: "Ne pas avoir de script WhatsApp :", text: "si la conversation qui suit la pub est mal gérée, tout le budget est gaspillé" },
          { bold: "Oublier le pixel Facebook :", text: "installe le pixel Facebook sur ton site dès J1 pour bâtir des audiences de retargeting" },
        ]} />
        <Callout color={GOLD} title="Budget de départ conseillé" text="Mois 1 test : 100 000 FCFA (5 000 FCFA/j × 20 jours) sur 2-3 publicités différentes. Analyse les résultats. Double le budget sur la meilleure pub. À partir du Mois 3 : budget stable calculé sur le ROAS." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH9 — VENTE À LA SÉNÉGALAISE  (P39–P42)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P39 CH9 OPENER ── */}
      <ChapterPage
        num={9}
        title="Techniques de vente à la sénégalaise"
        hook="La vente au Sénégal est relationnelle avant d'être transactionnelle. Le client n'achète pas d'abord ton produit — il achète ta personne, ta confiance, ta parole. Comprendre cela change tout à ton approche commerciale."
        accent={SEC}
        pageNum={39}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P40 CH9 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 09 — Techniques de vente" accent={SEC} pageNum={40} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 3 piliers de la vente sénégalaise</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { pilier: "1. La Teranga — l'accueil qui ouvre les portes", color: SEC, text: "Au Sénégal, on ne parle pas business dès la première seconde. On demande des nouvelles, on s'intéresse à la famille, on offre un café ou un ataya. Cette connexion humaine pré-vente n'est pas du temps perdu — c'est de l'investissement. Un prospect à qui tu as montré de l'intérêt sincère pour sa personne a 3× plus de chances d'acheter." },
            { pilier: "2. La crédibilité par l'expertise", color: ACC, text: "Montre que tu sais de quoi tu parles avant de proposer quoi que ce soit. Un prestataire qui pose des questions intelligentes sur le besoin du client, qui identifie des problèmes que le client n'avait pas encore verbalisés, est perçu comme un expert. Et on paie un expert bien plus cher qu'un simple vendeur." },
            { pilier: "3. La confiance par la cohérence", color: GOLD, text: "Tiens TOUJOURS tes engagements — délai, prix, qualité. Au Sénégal, le bouche-à-oreille peut te couler aussi vite qu'il peut te porter. Un entrepreneur qui dit '20 000 FCFA' et qui facture '25 000 FCFA' après ne verra jamais ce client revenir. La parole donnée est un contrat sacré." },
          ].map((p) => (
            <div key={p.pilier} style={{ padding: "11px 13px", borderRadius: "8px", background: `${p.color}07`, border: `1px solid ${p.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 800, color: p.color, margin: "0 0 5px" }}>{p.pilier}</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.65 }}>{p.text}</p>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Le script de vente WhatsApp en 5 étapes" text="1. Salutation chaleureuse et personnalisée  2. Question de qualification ('Vous cherchez [service] pour quel usage ?')  3. Présentation ciblée en 3 points (pas un roman)  4. Levée des objections avec empathie  5. CTA clair et facilitation ('Je vous prépare un devis pour lundi ?')" />
      </ContentPage>

      {/* ── P41 CH9 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 09 — Techniques de vente" accent={SEC} pageNum={41} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 8 objections les plus fréquentes et comment les traiter</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0" }}>
          {[
            { obj: "C'est trop cher", color: "#DC2626", rep: "Comprendre d'abord : 'Trop cher par rapport à quoi ?' Ensuite, recentrer sur la valeur : 'Ce que vous payez, c'est [résultat concret]. Combien vous coûte le problème actuel chaque mois ?'" },
            { obj: "Je vais réfléchir", color: ORG, rep: "C'est souvent un 'non' poli. Demande directement : 'Qu'est-ce qui vous retient ?' Écoute vraiment la réponse — c'est là que la vraie objection se cache." },
            { obj: "J'ai un ami qui fait ça moins cher", color: GOLD, rep: "'C'est excellent ! Qu'est-ce qui vous amène à comparer avec nous ?' Puis valorise tes différences (garantie, qualité, délai, service après-vente) sans critiquer le concurrent." },
            { obj: "J'ai besoin d'en parler à ma femme/famille", color: SEC, rep: "Au Sénégal, les décisions importantes sont souvent collectives. Propose : 'Voulez-vous qu'on se retrouve tous ensemble pour que je puisse répondre aux questions directement ?'" },
            { obj: "Je n'ai pas le budget maintenant", color: VIOL, rep: "Propose une option fractionnée (paiement en 2 ou 3 fois), une version allégée du service, ou une date de réservation pour plus tard avec un acompte symbolique." },
            { obj: "Je ne connais pas votre entreprise", color: ACC, rep: "C'est de la méfiance légitime. Partage des témoignages, propose une démonstration gratuite ou un premier service à tarif réduit pour prouver ta valeur avant un engagement plus grand." },
          ].map((o) => (
            <div key={o.obj} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "5px" }}>
              <div style={{ padding: "4px 7px", borderRadius: "5px", flexShrink: 0, background: `${o.color}12`, border: `1px solid ${o.color}25`, minWidth: "110px" }}>
                <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 700, color: o.color, margin: 0, lineHeight: 1.3 }}>{o.obj}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{o.rep}</p>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P42 CH9 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 09 — Techniques de vente" accent={SEC} pageNum={42} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'art de fixer ses prix au Sénégal</SH2>
        <Body>Les entrepreneurs sénégalais sous-évaluent chroniquement leur travail. C'est l'une des causes majeures de burn-out et d'échec financier.</Body>
        <SH3 color={SEC}>La méthode du prix juste en 4 étapes</SH3>
        <NumberedList color={SEC} items={[
          "Calcule ton coût de revient complet : matières premières + temps (valorise ton heure à minimum 5 000 FCFA) + frais généraux proportionnels (loyer, internet, transport)",
          "Applique ta marge bénéficiaire cible : 30% minimum pour services, 40-60% pour produits physiques, 60-80% pour produits digitaux",
          "Compare avec la concurrence : tu dois être positionné, pas forcément le moins cher — un prix trop bas créé de la méfiance",
          "Teste et ajuste : augmente progressivement tes prix et observe le taux de conversion. Si tout le monde accepte sans négocier, tu es sans doute trop bas.",
        ]} />
        <Divider color={SEC} />
        <SH3 color={SEC}>Techniques pour augmenter le panier moyen</SH3>
        <BulletList color={SEC} items={[
          { bold: "Upsell :", text: "propose la version supérieure ou le service premium ('Pour 10 000 FCFA de plus, j'inclus la livraison et l'installation')" },
          { bold: "Cross-sell :", text: "propose un produit complémentaire ('Avec cette robe, nous avons des bijoux assortis — et je vous fais un prix groupé')" },
          { bold: "Bundle :", text: "crée des packs : 3 séances de coaching au prix de 2, pack 'démarrage complet' pour les entrepreneurs, offre trimestrielle plutôt que mensuelle" },
          { bold: "Programme de fidélité :", text: "'À partir de votre 5e commande, remise de 15%' — encourage la répétition d'achat" },
        ]} />
        <Callout color={GOLD} title="La règle de la valeur perçue" text="Le prix que ton client accepte n'est pas lié à ton coût de production. Il est lié à la valeur qu'il perçoit. Un bon storytelling, une belle présentation, des témoignages solides, et une promesse claire augmentent la valeur perçue — et donc le prix qu'on peut accepter de payer." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH10 — SERVICE CLIENT & FIDÉLISATION  (P43–P46)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P43 CH10 OPENER ── */}
      <ChapterPage
        num={10}
        title="Service client & fidélisation"
        hook="Acquérir un nouveau client coûte 5 à 7 fois plus cher que fidéliser un client existant. Pourtant, la plupart des entrepreneurs sénégalais passent 80% de leur énergie à chercher de nouveaux clients en ignorant ceux qu'ils ont déjà. C'est une erreur de priorité majeure."
        accent={SEC}
        pageNum={43}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P44 CH10 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 10 — Service client" accent={SEC} pageNum={44} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 6 standards d'un service client d'excellence au Sénégal</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0 12px" }}>
          {[
            { n: "01", color: SEC,  title: "Réactivité < 2h",         text: "Réponds à chaque message WhatsApp dans les 2 heures maximum en heures de bureau. Au-delà, le prospect est chez ton concurrent. Configure un message d'absence pour la nuit." },
            { n: "02", color: ACC,  title: "Surnommer son client",     text: "Appelle ton client par son prénom. Dans la culture sénégalaise, être connu et reconnu par son interlocuteur est un signe de respect profond et crée un lien émotionnel fort." },
            { n: "03", color: VIOL, title: "Tenir ses délais",         text: "Si tu promets une livraison pour jeudi, livre jeudi. Si un problème survient, préviens AVANT le délai et propose une solution — jamais après." },
            { n: "04", color: GOLD, title: "Dépasser les attentes",    text: "Livre un peu plus que promis : un échantillon gratuit, un message personnalisé, une petite attention, une remise surprise sur la prochaine commande. C'est ce qu'on raconte à ses amis." },
            { n: "05", color: ORG,  title: "Gérer les erreurs avec grâce", text: "Quand tu fais une erreur (et tu en feras), assume-la sans honte, présente des excuses sincères, et propose une solution immédiate. Un client à qui tu as bien géré un problème te fera plus confiance qu'un client sans problème." },
            { n: "06", color: SEC,  title: "Suivi post-achat",         text: "Un simple WhatsApp 48h après la livraison : 'Bonjour Aminata, j'espère que vous êtes satisfaite de votre commande. Avez-vous des questions ?' Ce message coûte 30 secondes et génère des témoignages, des réachats et des recommandations." },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "7px", flexShrink: 0, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: s.color }}>{s.n}</span>
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{s.title}</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "#3A3530", margin: 0, lineHeight: 1.6 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P45 CH10 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 10 — Service client" accent={SEC} pageNum={45} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Construire un programme de fidélisation simple</SH2>
        <Body>Tu n'as pas besoin d'un logiciel complexe. Les systèmes de fidélité les plus efficaces au Sénégal sont les plus simples.</Body>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { prog: "La carte de fidélité physique", color: SEC,  text: "Carte cartonnée avec 10 cases à tamponner. Après 10 achats, 1 cadeau ou remise. Coût : 2 000 FCFA pour 100 cartes. Psychologie : le client veut 'compléter sa carte'." },
            { prog: "Le VIP WhatsApp", color: GOLD, text: "Crée un groupe WhatsApp 'Famille [Nom de ta Marque]' pour tes meilleurs clients. Partage des avant-premières, des offres exclusives, des coulisses. Les membres se sentent spéciaux et achètent davantage." },
            { prog: "Le parrainage avec récompense", color: ACC,  text: "'Recommandez un ami qui commande — vous recevez tous les deux 10%'. Annonce par WhatsApp Status et en mention dans chaque colis livré. Coût : 0 FCFA d'acquisition." },
            { prog: "L'anniversaire client", color: VIOL, text: "Note les dates d'anniversaire dans un carnet ou Excel. Envoie un message personnalisé avec une offre spéciale. Ce geste simple fidélise à vie dans la culture sénégalaise." },
          ].map((p) => (
            <div key={p.prog} style={{ padding: "9px 12px", borderRadius: "7px", background: `${p.color}07`, border: `1px solid ${p.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: p.color, margin: "0 0 4px" }}>{p.prog}</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{p.text}</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="La règle des 3 leviers de fidélisation" text="Pour qu'un client revienne automatiquement : (1) l'expérience d'achat doit être agréable, (2) le produit/service doit tenir ses promesses, (3) le suivi post-achat doit exister. Si les 3 leviers fonctionnent, le bouche-à-oreille s'enclenche naturellement." />
      </ContentPage>

      {/* ── P46 CH10 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 10 — Service client" accent={SEC} pageNum={46} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Gérer les avis et la réputation en ligne</SH2>
        <SH3 color={SEC}>Collecter des avis Google : la méthode systématique</SH3>
        <NumberedList color={SEC} items={[
          "Va sur ton Google Business Profile → 'Demander des avis' → copie le lien court généré",
          "Envoie ce lien à chaque client satisfait dans les 24-48h après la prestation, par WhatsApp",
          "Message type : 'Bonjour [Prénom], merci pour votre confiance ! Votre avis Google nous aiderait beaucoup à nous faire connaître. C'est rapide (2 minutes) : [lien]. Xëy jëf !'",
          "Objectif minimum : 1 avis par semaine — soit 50+ avis en 1 an",
          "Réponds à CHAQUE avis (positif ou négatif) sous 48h",
        ]} />
        <Divider color={SEC} />
        <SH3 color={"#DC2626"}>Template de réponse à un avis négatif</SH3>
        <Callout color="#DC2626" title="Exemple de réponse (publiée publiquement)" text="'Bonjour [Prénom], merci pour votre retour. Nous sommes vraiment navrés que votre expérience n'ait pas été à la hauteur de vos attentes. [Si l'erreur est réelle : reconnaître] / [Si factuelle : rectifier avec tact]. Nous vous invitons à nous contacter directement au [numéro] pour qu'on trouve ensemble une solution. Votre satisfaction est notre priorité.'" />
        <Body>Ce que les autres clients voient en lisant cette réponse : <em>une entreprise sérieuse qui prend les retours au sérieux.</em> Un avis négatif bien géré peut renforcer la confiance.</Body>
        <Divider color={SEC} />
        <SH3 color={SEC}>Transformer les clients en ambassadeurs</SH3>
        <BulletList color={SEC} items={[
          { bold: "Screenshot témoignages WhatsApp :", text: "avec accord, publie les messages positifs sur tes stories Instagram/Facebook" },
          { bold: "Vidéo témoignage 30 secondes :", text: "demande à tes 3 meilleurs clients de se filmer — offre une remise en échange" },
          { bold: "Étude de cas :", text: "pour le B2B, documente un problème résolu avec chiffres — très puissant sur LinkedIn" },
          { bold: "Tag client :", text: "encourage tes clients à te taguer quand ils utilisent ton produit — partage tout sans exception" },
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH11 — GESTION FINANCIÈRE  (P47–P50)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P47 CH11 OPENER (DARK) ── */}
      <DarkPage title="Chapitre 11 — Gestion financière" accent={ORG} pageNum={47} total={TOTAL} guideLabel={LABEL}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "20px 0" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: ORG, letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 16px" }}>Chapitre 11</p>
          <p style={{ fontFamily: FD, fontSize: "38px", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>Gestion financière<br /><em style={{ color: GOLD }}>& comptabilité</em></p>
          <div style={{ width: "44px", height: "2px", background: `linear-gradient(90deg, ${ORG}, transparent)`, marginBottom: "20px" }} />
          <p style={{ fontFamily: F, fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: "380px", margin: "0 0 32px" }}>L'argent est le sang de ton entreprise. Sans gestion financière rigoureuse, même un business rentable peut mourir d'une crise de trésorerie.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { value: "60%", label: "des PME qui ferment ont un problème de trésorerie — pas un problème de rentabilité", color: ORG },
              { value: "5×", label: "l'écart entre compte perso et pro multiplié par 5 la clarté financière et la croissance", color: GOLD },
            ].map((s) => (
              <div key={s.label} style={{ padding: "14px", borderRadius: "10px", background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
                <p style={{ fontFamily: FD, fontSize: "32px", fontWeight: 700, color: s.color, margin: "0 0 6px", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkPage>

      {/* ── P48 CH11 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 11 — Gestion financière" accent={ORG} pageNum={48} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 3 règles d'or de la finance d'entreprise</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0 14px" }}>
          {[
            { regle: "Règle 1 : Séparer les finances personnelles et professionnelles dès J+1", color: ORG, text: "Ouvre un compte Wave Business et/ou un compte bancaire professionnel. Tout ce qui entre dans l'entreprise, sort par le compte professionnel. Si tu as besoin d'argent perso, fais un 'virement salaire' à toi-même — documenté, régulier, raisonnable. Confondre les deux = impossible de savoir si tu es rentable." },
            { regle: "Règle 2 : Enregistrer CHAQUE transaction le jour même", color: GOLD, text: "Un cahier, un fichier Excel, Wave Merchant, ou un logiciel comptable — l'outil importe peu. Ce qui compte : aucune transaction ne passe sans être enregistrée. 5 minutes par jour = des heures de sauvetage évitées en fin de mois." },
            { regle: "Règle 3 : Constituer une réserve de 3 mois de charges fixes", color: ACC, text: "Avant d'investir ou de dépenser, assure-toi d'avoir en réserve de quoi payer loyer, salaires et fournisseurs pendant 3 mois sans aucune rentrée. C'est ce qui te permet de traverser les mois creux sans panique." },
          ].map((r) => (
            <div key={r.regle} style={{ padding: "10px 13px", borderRadius: "8px", background: `${r.color}07`, border: `1px solid ${r.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: r.color, margin: "0 0 5px" }}>{r.regle}</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.65 }}>{r.text}</p>
            </div>
          ))}
        </div>
        <SH3 color={ORG}>Le tableau de bord financier minimal</SH3>
        <MiniTable
          color={ORG}
          headers={["Indicateur", "Quand mesurer", "Objectif"]}
          rows={[
            ["Chiffre d'affaires total", "Hebdomadaire + mensuel", "Croissance régulière mois sur mois"],
            ["Dépenses totales", "Hebdomadaire", "< 70% du CA (marge brute > 30%)"],
            ["Bénéfice net", "Mensuel", "Positif et croissant"],
            ["Trésorerie disponible", "Quotidien", "Minimum 3 mois de charges fixes"],
            ["Créances clients (non encaissées)", "Hebdomadaire", "< 30 jours de délai moyen"],
          ]}
        />
      </ContentPage>

      {/* ── P49 CH11 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 11 — Gestion financière" accent={ORG} pageNum={49} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Fixer ses prix pour être rentable : le calcul complet</SH2>
        <Body>Beaucoup d'entrepreneurs fixent leurs prix à l'instinct ou en copiant les concurrents. C'est dangereux. Voici la méthode rigoureuse.</Body>
        <div style={{ padding: "14px 16px", borderRadius: "10px", background: `${ORG}07`, border: `1px solid ${ORG}22`, margin: "8px 0 12px" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: ORG, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px" }}>Calcul du prix minimum de vente</p>
          {[
            ["Coût des matières premières / intrants", "Ex : tissu 15 000 FCFA"],
            ["+ Main d'œuvre (ton temps × taux horaire)", "Ex : 4h × 5 000 FCFA = 20 000 FCFA"],
            ["+ Quote-part des charges fixes", "Ex : loyer 150K / 30 clients = 5 000 FCFA"],
            ["+ Frais variables (livraison, emballage, comm. Wave)", "Ex : 2 000 FCFA"],
            ["= COÛT DE REVIENT TOTAL", "42 000 FCFA"],
            ["+ Marge bénéficiaire souhaitée (ex : 40%)", "+ 16 800 FCFA"],
            ["= PRIX DE VENTE MINIMUM", "58 800 FCFA → arrondi à 60 000 FCFA"],
          ].map(([label, val], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: i < 6 ? "1px dashed rgba(249,115,22,0.2)" : "2px solid #F97316" }}>
              <p style={{ fontFamily: F, fontSize: "9px", color: i === 6 ? ORG : "#2A2520", fontWeight: i === 4 || i === 6 ? 700 : 400, margin: 0 }}>{label}</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: i === 6 ? ORG : "#5A5450", fontWeight: i === 4 || i === 6 ? 700 : 400, margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Logiciels comptables accessibles au Sénégal" text="Wave Accounting (gratuit, excellente interface) · Sage Comptabilité (version PME) · Odoo Community (open-source, très complet) · simple fichier Excel personnalisé (suffisant pour < 10M FCFA CA/an). Fais appel à un comptable agréé dès 15M FCFA CA/an — son coût (100K-300K FCFA/an) est rentabilisé en optimisations fiscales." />
      </ContentPage>

      {/* ── P50 CH11 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 11 — Gestion financière" accent={ORG} pageNum={50} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Gérer sa trésorerie : anticiper les creux</SH2>
        <Body>La trésorerie, c'est l'argent disponible <strong>aujourd'hui</strong>. Une entreprise rentable peut mourir d'une crise de trésorerie si elle n'encaisse pas à temps.</Body>
        <SH3 color={ORG}>Les 5 actions anti-crise de trésorerie</SH3>
        <BulletList color={ORG} items={[
          { bold: "Facturer immédiatement :", text: "n'attends pas la fin du mois pour envoyer ta facture. Facture dès que la prestation est livrée." },
          { bold: "Exiger un acompte :", text: "pour toute prestation > 50 000 FCFA, demande 30-50% d'acompte à la commande. Protège ta trésorerie et qualifie le client sérieux." },
          { bold: "Relancer les impayés sous 7 jours :", text: "un message WhatsApp cordial suffit : 'Bonjour, la facture n°X de [montant] arrive à échéance ce [date]. Souhaitez-vous régler par Wave ou virement ?' Ne laisse jamais une créance dépasser 30 jours." },
          { bold: "Négocier les délais fournisseurs :", text: "si tu peux payer tes fournisseurs en 30 jours tout en encaissant tes clients en 0-7 jours, tu génères un cycle de trésorerie positif." },
          { bold: "Prévoir le calendrier annuel :", text: "identifie tes mois creux (généralement janvier-février et juin-août dans de nombreux secteurs) et constitue une réserve dédiée pendant les mois pleins." },
        ]} />
        <Divider color={ORG} />
        <SH3 color={ORG}>Indicateurs d'alerte trésorerie</SH3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "6px 0" }}>
          {[
            { alert: "🔴 Danger", color: "#DC2626", items: ["Trésorerie < charges d'un mois", "Délais clients > 45 jours", "Découvert bancaire régulier", "Impossibilité de payer les salaires à date"] },
            { alert: "🟡 Vigilance", color: ORG, items: ["Trésorerie entre 1 et 2 mois de charges", "Délais clients entre 30 et 45 jours", "CA en baisse 2 mois consécutifs", "Marge nette < 15%"] },
          ].map((a) => (
            <div key={a.alert} style={{ padding: "9px 11px", borderRadius: "7px", background: `${a.color}07`, border: `1px solid ${a.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: a.color, margin: "0 0 5px" }}>{a.alert}</p>
              {a.items.map((item, i) => (
                <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: "0 0 2px", lineHeight: 1.5 }}>→ {item}</p>
              ))}
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH12 — FINANCEMENT  (P51–P53)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P51 CH12 OPENER ── */}
      <ChapterPage
        num={12}
        title="Financement & accès au crédit"
        hook="'Je n'ai pas les fonds' est la phrase la plus entendue — et souvent la plus fausse. Il existe au Sénégal des dizaines de mécanismes de financement accessibles aux PME. La plupart des entrepreneurs n'en connaissent que deux : la banque (qui refuse) et la famille (qui aide mais crée des tensions). Il existe bien mieux."
        accent={GOLD}
        pageNum={51}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P52 CH12 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 12 — Financement" accent={GOLD} pageNum={52} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les fonds et structures publics de financement</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0" }}>
          {[
            { name: "ADEPME", color: GOLD, sub: "Agence de Développement et d'Encadrement des PME", desc: "Formation, accompagnement, mise en relation avec des financeurs. Accès à des fonds de garantie pour faciliter l'obtention de crédits bancaires. adepme.sn" },
            { name: "DER/FJ", color: SEC, sub: "Délégation à l'Entrepreneuriat Rapide des Femmes et des Jeunes", desc: "Financement 0% pour les entrepreneurs de 18-40 ans et les femmes entrepreneures. Prêts de 100 000 à 10 000 000 FCFA. der.sn" },
            { name: "BNDE", color: ACC, sub: "Banque Nationale pour le Développement Économique", desc: "Crédits PME à taux préférentiel, financement moyen terme pour équipements, soutien aux secteurs porteurs (agro, BTP, services). bnde.sn" },
            { name: "FONGIP", color: VIOL, sub: "Fonds de Garantie des Investissements Prioritaires", desc: "N'octroie pas directement de prêts mais garantit jusqu'à 80% des crédits auprès des banques partenaires — réduisant leur risque et facilitant ton accès. fongip.sn" },
            { name: "3FPT", color: ORG, sub: "Fonds de Financement de la Formation Professionnelle", desc: "Finance la formation professionnelle de tes employés et de toi-même. Remboursement partiel des coûts de formation. 3fpt.sn" },
          ].map((f) => (
            <div key={f.name} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 10px", borderRadius: "7px", background: `${f.color}07`, border: `1px solid ${f.color}22` }}>
              <div style={{ padding: "5px 8px", borderRadius: "6px", flexShrink: 0, background: `${f.color}15`, border: `1px solid ${f.color}30`, textAlign: "center", minWidth: "52px" }}>
                <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: f.color, margin: 0 }}>{f.name}</p>
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "8px", color: f.color, fontWeight: 600, margin: "0 0 2px", lineHeight: 1.3 }}>{f.sub}</p>
                <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P53 CH12 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 12 — Financement" accent={GOLD} pageNum={53} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Banques, microfinance et alternatives</SH2>
        <MiniTable
          color={GOLD}
          headers={["Source", "Montant typique", "Taux", "Pour qui"]}
          rows={[
            ["Banques classiques (Ecobank, UBA, CBAO)", "5M – 500M FCFA", "12-18%/an", "Entreprises formalisées avec 2 ans d'historique"],
            ["IMF / SFD (Crédit Mutuel du Sénégal, PAMECAS)", "100K – 5M FCFA", "15-24%/an", "Petits entrepreneurs, femmes, artisans"],
            ["Tontines / Njangi", "Variable", "0% entre pairs", "Communauté de confiance — risque de tension sociale"],
            ["Business Angels / Investisseurs privés", "5M – 500M FCFA", "Equity 10-30%", "Startups à fort potentiel de croissance"],
            ["Subventions USAID / GIZ / PNUD", "Variable", "Don (0%)", "Projets à impact social, agriculture, environnement"],
            ["Crowdfunding (KissKissBankBank, Ulule)", "100K – 5M FCFA", "0% (don ou prévente)", "Projets créatifs, culturels, locaux avec communauté"],
          ]}
        />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Comment se rendre bancable : les 5 prérequis</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Dossier légal complet :", text: "RCCM, NINEA, statuts, compte bancaire pro actif depuis au moins 6 mois" },
          { bold: "Historique financier :", text: "relevés bancaires 12 mois, bilans comptables, liasse fiscale — preuves que l'argent tourne" },
          { bold: "Business plan solide :", text: "présentation claire du projet, marché cible, prévisions financières réalistes sur 3 ans" },
          { bold: "Garanties :", text: "titre foncier, matériel, stock, caution personnelle ou fond de garantie FONGIP" },
          { bold: "Bon comportement bancaire :", text: "jamais de découvert non autorisé, incidents de paiement absents, relation de confiance établie" },
        ]} />
        <Callout color={ACC} title="Conseil KEKELI" text="Avant d'aller à la banque, passe d'abord par l'ADEPME. Ils proposent un accompagnement gratuit pour préparer ton dossier de crédit et te mettent en relation avec les banques partenaires. Ça augmente drastiquement tes chances d'obtention." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH13 — FISCALITÉ  (P54–P57)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P54 CH13 OPENER ── */}
      <ChapterPage
        num={13}
        title="Fiscalité sénégalaise pour entrepreneurs"
        hook="'La fiscalité, c'est compliqué' — c'est ce que disent ceux qui préfèrent payer des pénalités plutôt que de comprendre les règles. Ce chapitre te donne les bases indispensables pour ne pas avoir de mauvaises surprises."
        accent={ORG}
        pageNum={54}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P55 CH13 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 13 — Fiscalité" accent={ORG} pageNum={55} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les régimes fiscaux au Sénégal</SH2>
        <MiniTable
          color={ORG}
          headers={["Régime", "Seuil CA", "Obligations", "Idéal pour"]}
          rows={[
            ["Contribuable de la Taxe Unique Simplifiée (TUS)", "< 25M FCFA/an", "Paiement forfaitaire annuel simplifié", "Très petits commerces, artisans débutants"],
            ["Régime du Réel Simplifié (RRS)", "25M – 100M FCFA/an", "Bilan simplifié, IS trimestriel, TVA si applicable", "PME en croissance, prestataires de services"],
            ["Régime du Réel Normal (RRN)", "> 100M FCFA/an", "Comptabilité complète, bilan certifié, IS + TVA", "Grandes entreprises, filiales, sociétés cotées"],
          ]}
        />
        <Divider color={ORG} />
        <SH3 color={ORG}>Les impôts et taxes à connaître</SH3>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "6px 0 12px" }}>
          {[
            { tax: "IS — Impôt sur les Sociétés", color: ORG,  text: "Taux : 30% du bénéfice net pour les SA/SARL. Les charges professionnelles (loyer, salaires, amortissements, frais de déplacement) sont déductibles du bénéfice imposable." },
            { tax: "TVA — Taxe sur la Valeur Ajoutée", color: ACC, text: "Taux standard : 18%. Tu la collectes sur tes ventes et la reverses à l'État (déduction faite de la TVA que toi-même tu as payée). Obligatoire si CA > 50M FCFA ou sur option dès 25M FCFA." },
            { tax: "Patente", color: GOLD, text: "Taxe professionnelle locale calculée selon la valeur locative de ton local et ton CA. Payable annuellement à la mairie ou recette locale. Essentielle pour exercer légalement." },
            { tax: "CFCE — Contribution Foncière des Propriétés Bâties", color: VIOL, text: "Si tu es propriétaire de ton local professionnel. Calculée sur la valeur locative du bien immobilier. Déductible en partie de l'IS." },
            { tax: "IR — Impôt sur le Revenu (entreprise individuelle)", color: SEC, text: "Pour les entreprises individuelles et SUARL à l'IR : barème progressif de 0 à 40% sur le bénéfice net. Déclaré annuellement." },
          ].map((t) => (
            <div key={t.tax} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ padding: "3px 7px", borderRadius: "4px", flexShrink: 0, background: `${t.color}12`, border: `1px solid ${t.color}25`, minWidth: "90px" }}>
                <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 800, color: t.color, margin: 0, lineHeight: 1.3 }}>{t.tax}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{t.text}</p>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P56 CH13 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 13 — Fiscalité" accent={ORG} pageNum={56} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le calendrier fiscal annuel d'une PME sénégalaise</SH2>
        <MiniTable
          color={ORG}
          headers={["Échéance", "Obligation", "Structure concernée"]}
          rows={[
            ["15 janvier", "Déclaration et paiement TVA du trimestre précédent (RRS)", "PME au RRS assujettie à la TVA"],
            ["Fin mars", "Dépôt de la liasse fiscale (bilan + compte de résultat)", "SARL, SA, SUARL"],
            ["Fin mars", "Paiement du solde IS (après acomptes trimestriels)", "Sociétés soumises à l'IS"],
            ["Avril", "Paiement patente", "Toutes entreprises exerçant une activité commerciale"],
            ["15 avril, juillet, octobre", "Acomptes IS (pour RRN)", "Grandes entreprises au RRN"],
            ["Mensuel", "Déclaration et paiement TVA (si mensuel)", "Entreprises au RRN"],
            ["Mensuel / trimestriel", "Déclarations IPRES et CSS (charges sociales)", "Tout employeur"],
          ]}
        />
        <Divider color={ORG} />
        <SH3 color={ORG}>Charges sociales employeur : ce qu'il faut payer</SH3>
        <BulletList color={ORG} items={[
          { bold: "IPRES (retraite) :", text: "employeur 8,4% + salarié 5,6% du salaire brut plafonné à 1 706 400 FCFA/mois" },
          { bold: "CSS (accidents du travail & allocations familiales) :", text: "employeur uniquement, entre 3% et 7% selon le secteur" },
          { bold: "IUTS (Impôt Unique sur les Traitements et Salaires) :", text: "retenu à la source sur le salaire du salarié et reversé par l'employeur mensuellement" },
          { bold: "Total charges patronales estimées :", text: "environ 20-25% du salaire brut de l'employé (à budgéter dès l'embauche)" },
        ]} />
        <Callout color={GOLD} title="Conseil pratique" text="Travaille avec un expert-comptable agréé dès que ton CA dépasse 20M FCFA/an. Son rôle va au-delà de la comptabilité : il optimise tes charges fiscales légalement, te protège en cas de contrôle fiscal, et te conseille sur les meilleures options de financement." />
      </ContentPage>

      {/* ── P57 CH13 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 13 — Fiscalité" accent={ORG} pageNum={57} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 8 erreurs fiscales à éviter absolument</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0 12px" }}>
          {[
            { n: 1, color: "#DC2626", text: "Ne pas obtenir de NINEA : sans identifiant fiscal, tu n'existes pas légalement pour l'administration. Pénalités et redressements quasi-certains à terme." },
            { n: 2, color: "#DC2626", text: "Confondre le compte de l'entreprise avec le compte perso : impossible de défendre tes déductions fiscales si les mouvements sont mélangés." },
            { n: 3, color: ORG,       text: "Ne pas déclarer la TVA collectée : si tu factures de la TVA à tes clients sans la reverser à l'État, c'est une fraude fiscale passible de poursuites pénales." },
            { n: 4, color: ORG,       text: "Dépenses non documentées : chaque déduction fiscale doit être justifiée par une facture ou un reçu. Sans justificatif = pas de déduction." },
            { n: 5, color: GOLD,      text: "Ignorer la patente : c'est une taxe locale souvent oubliée. En cas de contrôle, le défaut de paiement entraîne pénalités et fermeture administrative." },
            { n: 6, color: GOLD,      text: "Ne pas cotiser à l'IPRES dès le premier employé : le redressement IPRES peut être rétroactif sur 5 ans avec pénalités de retard." },
            { n: 7, color: VIOL,      text: "Attendre le contrôle fiscal pour régulariser : la DGID propose des régularisations volontaires avec allégements de pénalités. Profites-en avant d'être contrôlé." },
            { n: 8, color: VIOL,      text: "Penser que l'informel protège : les autorités sénégalaises croisent de plus en plus les données Wave, les déclarations TV, les comptes Facebook Business pour identifier les entreprises non déclarées." },
          ].map((e) => (
            <div key={e.n} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "5px", flexShrink: 0, background: `${e.color}15`, border: `1px solid ${e.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: e.color }}>{e.n}</span>
              </div>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{e.text}</p>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Ressource clé" text="Direction Générale des Impôts et Domaines (DGID) — impôts.sn. Propose des formations gratuites pour les entrepreneurs sur les obligations fiscales. Profites-en." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH14 — RECRUTEMENT & RH  (P58–P60)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P58 CH14 OPENER ── */}
      <ChapterPage
        num={14}
        title="Recrutement & droit du travail"
        hook="Ton premier employé est l'une des décisions les plus importantes de ta vie d'entrepreneur. Bien faite, elle multiplie ta capacité. Mal faite, elle peut générer des conflits, des coûts imprévus et des blocages légaux. Voici comment faire juste."
        accent={VIOL}
        pageNum={58}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P59 CH14 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 14 — Recrutement & RH" accent={VIOL} pageNum={59} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Recruter son premier employé : la méthode</SH2>
        <SH3 color={VIOL}>Avant de recruter : pose-toi ces questions</SH3>
        <BulletList color={VIOL} items={[
          { bold: "Ai-je vraiment besoin d'un employé ?", text: "ou puis-je d'abord externaliser, automatiser, ou faire appel à un freelance ?" },
          { bold: "Puis-je me permettre le coût total ?", text: "salaire brut + 20-25% de charges patronales (IPRES, CSS) + équipement + formation" },
          { bold: "Ai-je une fiche de poste claire ?", text: "tâches précises, horaires, lieu, objectifs mesurables — avant de publier l'offre" },
          { bold: "Comment vais-je évaluer les candidats ?", text: "entretien + test pratique > diplôme seul. Un bon test pratique révèle ce qu'un CV cache." },
        ]} />
        <Divider color={VIOL} />
        <SH3 color={VIOL}>Où trouver de bons candidats au Sénégal</SH3>
        <MiniTable
          color={VIOL}
          headers={["Canal", "Coût", "Profil trouvé"]}
          rows={[
            ["LinkedIn Sénégal", "Gratuit – Abonnement premium", "Cadres, professionnels qualifiés, diplômés"],
            ["Emploi.sn / Senjobs.com", "Gratuit à 50K FCFA/annonce", "Tous niveaux, grande base de CV"],
            ["Réseau personnel WhatsApp", "Gratuit", "Recommandations fiables — qualité souvent meilleure"],
            ["ANPEJ (Agence nationale pour l'emploi des jeunes)", "Gratuit", "Jeunes qualifiés cherchant 1er emploi"],
            ["Universités / grandes écoles (ESP, ISM, CESAG)", "Gratuit", "Stagiaires et jeunes diplômés motivés"],
            ["Facebook groupes emploi Sénégal", "Gratuit", "Profils variés, large diffusion"],
          ]}
        />
        <Callout color={GOLD} title="Le test pratique avant l'embauche" text="Pour un commercial : donne-lui 2 heures pour convaincre un prospect fictif. Pour un graphiste : une création en 1 heure. Pour un comptable : un jeu de données à analyser. Ce que tu vois en 2 heures te dira plus qu'un entretien de 2 jours." />
      </ContentPage>

      {/* ── P60 CH14 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 14 — Recrutement & RH" accent={VIOL} pageNum={60} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Code du Travail sénégalais : les points clés</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0 12px" }}>
          {[
            { point: "Contrat de travail", color: VIOL, text: "Obligatoire par écrit pour tout emploi > 3 mois. Types : CDI (contrat à durée indéterminée), CDD (à durée déterminée, renouvelable 2 fois max), contrat de stage (3-6 mois avec convention). Chaque contrat doit mentionner : poste, salaire, durée (CDD), lieu de travail, période d'essai." },
            { point: "SMIG (Salaire Minimum)", color: ACC, text: "SMIG sénégalais en 2026 : environ 63 000 FCFA/mois brut (à vérifier lors de la mise à jour annuelle). Aucun employé ne peut être payé en dessous de ce seuil." },
            { point: "Période d'essai", color: SEC, text: "CDI : 3 mois renouvelables 1 fois pour ouvriers/employés, 6 mois pour cadres. CDD : 1/8e de la durée du contrat. La rupture pendant la période d'essai ne génère pas d'indemnités." },
            { point: "Congés payés", color: GOLD, text: "2,5 jours ouvrables par mois de travail effectif = 30 jours calendaires (1 mois) après 1 an. Indemnisés au salaire normal." },
            { point: "Heures supplémentaires", color: ORG, text: "Majorées de 15% pour les 8 premières heures supplémentaires hebdomadaires, puis 40% au-delà, 60% la nuit et jours fériés." },
            { point: "Licenciement", color: "#DC2626", text: "Pour motif réel et sérieux : lettre recommandée, entretien préalable, indemnité de licenciement (1 mois/an jusqu'à 5 ans, 1,5 mois de 6 à 10 ans…). Licencier sans respecter la procédure = condamnation aux prud'hommes." },
          ].map((p) => (
            <div key={p.point} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ padding: "3px 7px", borderRadius: "4px", flexShrink: 0, background: `${p.color}12`, border: `1px solid ${p.color}25`, minWidth: "90px" }}>
                <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 800, color: p.color, margin: 0, lineHeight: 1.3 }}>{p.point}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{p.text}</p>
            </div>
          ))}
        </div>
        <Callout color={VIOL} title="IPRES & CSS : inscription obligatoire à l'embauche" text="Dès le premier jour d'emploi du premier salarié : inscription à l'IPRES (retraite) et à la CSS (accidents + allocations familiales). Délai : dans les 8 jours suivant l'embauche. Où : IPRES.sn et CSS.sn — guichet unique possible via l'APIX." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH15 — GESTION DE CRISE  (P61–P63)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P61 CH15 OPENER ── */}
      <ChapterPage
        num={15}
        title="Gestion de crise & résilience"
        hook="Toute entreprise traversera au moins une crise. Ce n'est pas pessimiste, c'est statistique. Les entrepreneurs qui survivent et prospèrent ne sont pas ceux qui évitent les crises — ce sont ceux qui les anticipent et y répondent mieux que leurs concurrents."
        accent={VIOL}
        pageNum={61}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P62 CH15 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 15 — Gestion de crise" accent={VIOL} pageNum={62} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 7 types de crise les plus fréquentes pour une PME sénégalaise</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0 12px" }}>
          {[
            { type: "Crise de trésorerie",          color: ORG,       sol: "Priorité 1 : encaisser toutes les créances. Priorité 2 : différer les dépenses non urgentes. Priorité 3 : contacter tes fournisseurs avant d'être en défaut — la transparence préserve les relations." },
            { type: "Perte d'un client majeur",     color: "#DC2626", sol: "Si un client représente > 30% de ton CA, tu as un problème de concentration. Solution immédiate : relancer 20 prospects. Solution long terme : diversifier ta base clients." },
            { type: "Mauvais avis viral",           color: "#DC2626", sol: "Répondre publiquement en < 2h, avec calme et empathie. Ne jamais supprimer (ça empire). Puis contacter la personne en privé pour résoudre. Une bonne gestion publique d'un bad buzz renforce souvent la réputation." },
            { type: "Départ d'un employé clé",      color: VIOL,      sol: "Documenter les processus dès aujourd'hui — ne jamais laisser un seul employé détenir toutes les connaissances critiques. Former des doublures." },
            { type: "Problème fournisseur",         color: GOLD,      sol: "Toujours avoir 2-3 fournisseurs pour chaque input critique. La dépendance à un seul fournisseur est un risque opérationnel majeur." },
            { type: "Crise légale / contractuelle", color: ORG,       sol: "Consulter immédiatement un avocat spécialisé (pas un ami juriste). Un avis juridique rapide coûte beaucoup moins qu'une procédure mal gérée." },
            { type: "Crise de réputation personnelle", color: "#EC4899", sol: "Au Sénégal, la réputation du fondateur EST celle de l'entreprise. En cas de crise personnelle (divorce médiatisé, conflit public), protéger sa réputation professionnelle en évitant tout commentaire public dans l'urgence." },
          ].map((c) => (
            <div key={c.type} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ padding: "3px 7px", borderRadius: "4px", flexShrink: 0, background: `${c.color}12`, border: `1px solid ${c.color}25`, minWidth: "95px" }}>
                <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 800, color: c.color, margin: 0, lineHeight: 1.3 }}>{c.type}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{c.sol}</p>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P63 CH15 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 15 — Gestion de crise" accent={VIOL} pageNum={63} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le plan de continuité d'activité simplifié</SH2>
        <Body>Un plan de continuité n'est pas réservé aux grandes entreprises. Une PME sénégalaise peut en avoir un simple et efficace :</Body>
        <BulletList color={VIOL} items={[
          { bold: "Liste des fonctions critiques :", text: "quelles sont les 3 choses qui, si elles s'arrêtent, tuent l'entreprise en moins de 30 jours ?" },
          { bold: "Plan B pour chaque fonction critique :", text: "si ton principal fournisseur disparaît demain, qui le remplace ? Si ton commercial principal part, qui prend le relais ?" },
          { bold: "Réserve de trésorerie de crise :", text: "3 mois de charges fixes sur un compte séparé — intouchable sauf situation d'urgence réelle" },
          { bold: "Contacts d'urgence documentés :", text: "avocat, comptable, banquier, assureur — dans un document accessible à ton associé ou conjoint" },
          { bold: "Sauvegarde des données :", text: "tes contacts clients, tes données comptables, tes contrats — sauvegardés sur Google Drive ou autre cloud chaque semaine" },
        ]} />
        <Divider color={VIOL} />
        <SH2 color={DARK}>La communication de crise en 4 étapes</SH2>
        <NumberedList color={VIOL} items={[
          "RECONNAÎTRE : ne jamais nier la crise ni l'ignorer sur les réseaux sociaux. Un silence de plus de 4h est interprété comme de la culpabilité.",
          "EXPLIQUER (sans se justifier excessivement) : en 2-3 phrases, expliquer ce qui s'est passé avec honnêteté",
          "PROPOSER UNE SOLUTION : montrer concrètement ce que tu vas faire pour corriger",
          "SUIVRE ET INFORMER : tenir ta communauté informée de l'évolution — la transparence est la meilleure protection de ta réputation",
        ]} />
        <Callout color={GOLD} title="Proverbe de la gestion de crise" text="On ne juge pas une entreprise sur les problèmes qu'elle rencontre. On la juge sur la façon dont elle les gère." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH16 — MARKETING D'INFLUENCE  (P64–P66)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P64 CH16 OPENER ── */}
      <ChapterPage
        num={16}
        title="Marketing d'influence local"
        hook="Dans la culture sénégalaise, la recommandation d'un pair ou d'une figure d'autorité a une valeur commerciale immense. Le marketing d'influence n'est pas une tendance — c'est simplement la digitalisation du bouche-à-oreille qui existe depuis toujours."
        accent={ACC}
        pageNum={64}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P65 CH16 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 16 — Marketing d'influence" accent={ACC} pageNum={65} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 4 catégories d'influenceurs sénégalais</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { cat: "Méga-influenceurs (> 500K)", color: "#DC2626", desc: "Célébrités (musiciens, acteurs, sportifs comme Sadio Mané, Pape Diouf). Tarifs : 500K – 5M FCFA par post. Réservé aux grandes marques.", conseil: "Hors de portée pour la plupart des PME. Un placement dans un spot TV de Touba Radio est parfois plus efficace." },
            { cat: "Macro-influenceurs (50K–500K)", color: ORG, desc: "Personnalités médias, YouTubeurs, Tiktokers confirmés (Aïda Sagna, influenceurs mode/food Dakar). Tarifs : 50K – 500K FCFA.", conseil: "Pertinent si tu vises une notoriété nationale rapide sur un produit grand public." },
            { cat: "Micro-influenceurs (5K–50K)", color: ACC, desc: "Créateurs de contenu locaux avec une communauté engagée et de niche (coach fitness Dakar, blogueuse beauté Sénégal, entrepreneur tech). Tarifs : 15K – 100K FCFA.", conseil: "Le meilleur ROI pour les PME. Audience plus petite mais ultra-ciblée et très engagée. Authentique." },
            { cat: "Nano-influenceurs (1K–5K)", color: SEC, desc: "Clients satisfaits avec une audience locale (quartier, cercle professionnel, communauté religieuse). Souvent gratuits ou échange de produit.", conseil: "Parfait pour le lancement ou les niches très locales. Taux d'engagement parfois 5-10× supérieur aux macro." },
          ].map((c) => (
            <div key={c.cat} style={{ padding: "9px 11px", borderRadius: "7px", background: `${c.color}07`, border: `1px solid ${c.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 800, color: c.color, margin: "0 0 4px" }}>{c.cat}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: "0 0 5px", lineHeight: 1.5 }}>{c.desc}</p>
              <p style={{ fontFamily: F, fontSize: "8px", color: "#5A5450", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{c.conseil}</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Comment approcher un micro-influenceur sénégalais" text="1. Devenir son client ou follower actif pendant 2-3 semaines  2. Lui envoyer un message personnalisé (pas un copier-coller)  3. Proposer une collaboration gagnant-gagnant : produit gratuit + commission sur ventes  4. Laisser une liberté créative totale — les audiences reconnaissent le contenu sponsorisé qui sonne faux" />
      </ContentPage>

      {/* ── P66 CH16 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 16 — Marketing d'influence" accent={ACC} pageNum={66} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>UGC (User Generated Content) : le contenu que tes clients créent pour toi</SH2>
        <Body>Le UGC est tout contenu créé par tes clients : photos de ton produit, vidéos de déballage, témoignages spontanés. C'est la forme de preuve sociale la plus puissante qui soit — et elle est gratuite.</Body>
        <SH3 color={ACC}>Comment générer du UGC systématiquement</SH3>
        <BulletList color={ACC} items={[
          { bold: "Encourage le tag :", text: "sur chaque colis livré, ajoute un petit carton 'Taguez-nous @[compte] pour être mis en avant '" },
          { bold: "Crée un hashtag de marque :", text: "#[NomDeTaMarque] — un hashtag simple, mémorable, que les clients peuvent utiliser naturellement" },
          { bold: "Organise des concours :", text: "'Posté une photo avec notre produit + hashtag = participe au tirage au sort pour [cadeau]'" },
          { bold: "Reposte systématiquement :", text: "chaque tag mérite un repost dans tes stories — le client se sent valorisé et les autres voient de vrais utilisateurs satisfaits" },
        ]} />
        <Divider color={ACC} />
        <SH2 color={DARK}>Partenariats entre entrepreneurs sénégalais</SH2>
        <Body>La 'Teranga' économique : collaborer avec des entreprises complémentaires sans être concurrents. C'est l'un des leviers les plus sous-exploités au Sénégal.</Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px", margin: "6px 0" }}>
          {[
            { ex: "Traiteur + Décorateur événementiel", color: SEC, type: "Pack 'Mariage clé en main' — package commun proposé aux mariés" },
            { ex: "Couturière + Photographe", color: VIOL, type: "Shooting offert pour les clientes VIP — contenu qualité pour les deux" },
            { ex: "Nutritionniste + Salle de sport", color: ACC, type: "Abonnement combiné avec remise partagée" },
            { ex: "Comptable + Conseiller juridique", color: GOLD, type: "Recommandations croisées avec commission" },
          ].map((p) => (
            <div key={p.ex} style={{ padding: "8px 10px", borderRadius: "6px", background: `${p.color}07`, border: `1px solid ${p.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 700, color: p.color, margin: "0 0 3px" }}>{p.ex}</p>
              <p style={{ fontFamily: F, fontSize: "8px", color: "#5A5450", margin: 0, lineHeight: 1.5 }}>{p.type}</p>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH17 — E-COMMERCE & PAIEMENT  (P67–P69)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P67 CH17 OPENER ── */}
      <ChapterPage
        num={17}
        title="E-commerce & paiement mobile"
        hook="La révolution du paiement mobile au Sénégal est réelle et accélérée. Wave a changé les habitudes en 3 ans plus profondément que les cartes bancaires en 30 ans. Construire une boutique en ligne adaptée à cette réalité est aujourd'hui à la portée de toute PME."
        accent={GOLD}
        pageNum={67}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P68 CH17 CONTENT 1 ── */}
      <DarkPage title="L'écosystème du paiement mobile sénégalais en 2026" accent={GOLD} pageNum={68} total={TOTAL} guideLabel={LABEL}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "12px 0" }}>
          {[
            { name: "Wave", users: "8M+", color: "#06B6D4", points: ["Transferts gratuits entre particuliers", "Wave Business pour commerçants (0,5% frais)", "Carte d.money Visa virtuelle", "QR code de paiement instantané"], limit: "Pas encore de boutique e-commerce intégrée" },
            { name: "Orange Money", users: "6M+", color: "#F97316", points: ["Réseau d'agences le plus étendu", "Paiements marchands activés", "Paiement de factures SENELEC, SDE"], limit: "Frais légèrement plus élevés que Wave" },
            { name: "Free Money", users: "3M+", color: VIOL, points: ["Croissance rapide", "Offres data liées"], limit: "Moins répandu que Wave/OM" },
            { name: "PayDunya", users: "B2B", color: GOLD, points: ["Agrège Wave, OM, Free Money, CB", "API complète pour boutiques en ligne", "Commission 1,5-3% par transaction", "Dashboard de gestion des paiements"], limit: "Nécessite une intégration technique" },
          ].map((p) => (
            <div key={p.name} style={{ padding: "12px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: `1px solid ${p.color}25` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                <p style={{ fontFamily: F, fontSize: "12px", fontWeight: 700, color: "#fff", margin: 0 }}>{p.name}</p>
                <p style={{ fontFamily: FD, fontSize: "16px", fontWeight: 700, color: p.color, margin: 0 }}>{p.users}</p>
              </div>
              {p.points.map((pt, i) => <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "rgba(255,255,255,0.55)", margin: "0 0 2px" }}>✓ {pt}</p>)}
              <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.3)", margin: "5px 0 0", fontStyle: "italic" }}>{p.limit}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${GOLD}15`, border: `1px solid ${GOLD}35` }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 5px" }}>Règle absolue 2026</p>
          <p style={{ fontFamily: F, fontSize: "10.5px", color: "#fff", margin: 0, lineHeight: 1.7 }}>Accepter Wave est aujourd'hui une <strong style={{ color: GOLD }}>condition de survie commerciale</strong>. Ne pas accepter Wave au Sénégal en 2026, c'est se couper de 8 millions de clients potentiels.</p>
        </div>
      </DarkPage>

      {/* ── P69 CH17 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 17 — E-commerce & paiement" accent={GOLD} pageNum={69} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Créer sa boutique en ligne : les options par budget</SH2>
        <MiniTable
          color={GOLD}
          headers={["Option", "Coût", "Intégration Wave/OM", "Pour qui"]}
          rows={[
            ["Instagram Shop + WhatsApp", "Gratuit", "WhatsApp paiement manuel", "PME débutante, produits visuels"],
            ["Boutique Facebook", "Gratuit", "Paiement manuel WhatsApp", "Produits < 200 000 FCFA"],
            ["WooCommerce (WordPress)", "100K-200K FCFA/an", "PayDunya plugin", "Catalogue > 20 produits, SEO important"],
            ["Shopify + plugin PayDunya", "15$/mois", "PayDunya intégré", "Boutique pro, gestion stock, analyses"],
            ["Développement sur mesure", "500K-3M FCFA", "PayDunya API complète", "Marketplace, B2B, spécificités métier"],
          ]}
        />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Livraison au Sénégal : partenaires recommandés</SH3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px", margin: "6px 0 12px" }}>
          {[
            { name: "Yobante Express", color: SEC,  text: "Dakar + banlieues proches. Livraison J+1 ou J+2. 1 500-4 000 FCFA/colis. Récupère à l'entrepôt ou enlèvement à domicile." },
            { name: "DHL Express Sénégal", color: ACC, text: "International + grandes villes. Colis importants. Tracking temps réel. Tarifs premium." },
            { name: "Chronopost Sénégal", color: ORG, text: "Réseau national (hors Dakar). 3 000-8 000 FCFA. Délai J+2 à J+5 selon destination." },
            { name: "La Poste Sénégal", color: VIOL, text: "Réseau le plus étendu, même zones rurales. Moins rapide mais plus économique (< 2 000 FCFA)." },
          ].map((l) => (
            <div key={l.name} style={{ padding: "8px 10px", borderRadius: "6px", background: `${l.color}07`, border: `1px solid ${l.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: l.color, margin: "0 0 4px" }}>{l.name}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.55 }}>{l.text}</p>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="La stratégie duo qui fonctionne le mieux en 2026" text="Instagram Shop (vitrine visuelle) + WhatsApp Business (commandes et paiement) + Wave Business (encaissement) = système e-commerce complet pour 0 FCFA d'investissement technologique." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          CH18 — EXPANSION CEDEAO  (P70–P72)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P70 CH18 OPENER ── */}
      <ChapterPage
        num={18}
        title="Expansion en Afrique de l'Ouest"
        hook="Le Sénégal est une porte d'entrée naturelle vers un marché de 400 millions de personnes. La CEDEAO et l'UEMOA offrent des cadres légaux et douaniers favorables à l'expansion régionale. Mais exporter sans stratégie, c'est bruler sa trésorerie dans une aventure mal préparée."
        accent={ACC}
        pageNum={70}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P71 CH18 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 18 — Expansion CEDEAO" accent={ACC} pageNum={71} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comprendre les cadres CEDEAO et UEMOA</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0 12px" }}>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${ACC}07`, border: `1px solid ${ACC}22` }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: ACC, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>CEDEAO — 15 pays</p>
            <BulletList color={ACC} items={[
              { text: "Libre circulation des personnes et des marchandises" },
              { text: "Tarif extérieur commun (TEC) avec le reste du monde" },
              { text: "Passeport CEDEAO accepté dans tous les États membres" },
              { text: "Marchés cibles : Nigeria, Ghana, Côte d'Ivoire, Mali, Guinée" },
            ]} />
          </div>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${GOLD}07`, border: `1px solid ${GOLD}22` }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>UEMOA — 8 pays (zone FCFA)</p>
            <BulletList color={GOLD} items={[
              { text: "Monnaie unique FCFA — zéro risque de change" },
              { text: "Droit des affaires harmonisé via l'OHADA" },
              { text: "Marchés cibles : Mali, Guinée-Bissau, Burkina Faso, Niger, Togo, Bénin, Côte d'Ivoire" },
              { text: "Système bancaire et juridique très similaire au Sénégal" },
            ]} />
          </div>
        </div>
        <SH3 color={ACC}>Les 5 étapes pour exporter dans la zone CEDEAO</SH3>
        <NumberedList color={ACC} items={[
          "Valider le produit/service localement d'abord — ne jamais exporter une offre qui n'est pas prouvée au Sénégal",
          "Identifier un partenaire local dans le pays cible (distributeur, agent commercial, partenaire logistique) — c'est lui qui connaît le marché local",
          "Étudier les réglementations spécifiques : certaines filières (alimentaire, cosmétiques, médical) nécessitent des agréments pays par pays",
          "Adapter l'offre : les prix, la langue (français vs anglais au Ghana/Nigeria), les modes de paiement locaux (Mobile Money Ghana, eNaira Nigeria)",
          "Commencer par un test limité : un contrat d'agent commercial de 6 mois avant d'investir dans une présence permanente",
        ]} />
      </ContentPage>

      {/* ── P72 CH18 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 18 — Expansion CEDEAO" accent={ACC} pageNum={72} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Analyse des marchés prioritaires pour l'entrepreneur sénégalais</SH2>
        <MiniTable
          color={ACC}
          headers={["Pays", "Avantages", "Défis", "Secteurs prioritaires"]}
          rows={[
            ["Côte d'Ivoire", "Économie la plus dynamique de la zone, forte diaspora sénégalaise", "Concurrence intense, marché saturé dans certains secteurs", "Mode, alimentaire, services B2B, tech"],
            ["Mali", "Liens culturels forts, FCFA, voisin direct", "Accès logistique complexe, instabilité politique", "Alimentaire, bâtiment, mode, formation"],
            ["Guinée-Bissau", "Marché à faible concurrence, FCFA", "Marché très petit (2M habitants), infrastructures limitées", "Agroalimentaire, pêche, services"],
            ["Mauritanie", "Proximité géographique, liens ancestraux", "Hors CEDEAO, différence de monnaie (Ouguiya)", "Textile, alimentaire, services"],
            ["Nigeria", "Marché géant (220M hab.), tech très développée", "Concurrence locale très forte, langue anglaise, instabilité naira", "Fintech, tech, mode africaine"],
            ["Ghana", "Économie stable, anglophone, hub régional", "Langue anglaise, compétition internationale", "Fintech, agroalimentaire transformé, formation"],
          ]}
        />
        <Divider color={ACC} />
        <SH3 color={ACC}>Ressources pour l'export sénégalais</SH3>
        <BulletList color={ACC} items={[
          { bold: "ASEPEX :", text: "Agence Sénégalaise de Promotion des Exportations — accompagnement, salons internationaux, certifications d'exportation. asepex.sn" },
          { bold: "Chambre de Commerce de Dakar :", text: "certificats d'origine, attestations pour marchés publics régionaux, répertoire d'entreprises CEDEAO" },
          { bold: "OHADA :", text: "droit des affaires harmonisé dans 17 pays africains — ton contrat sénégalais est souvent reconnu directement dans la zone UEMOA" },
        ]} />
        <Callout color={GOLD} title="Conseil d'expansion" text="Commence par le digital : vendre en ligne à des clients en Côte d'Ivoire ou au Mali avant d'y ouvrir une structure physique. Le digital te permet de tester la demande sans les coûts d'une présence locale. Wave fonctionne désormais dans plusieurs pays de la sous-région." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          RESSOURCES & OUTILS  (P73–P76)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P73 RESOURCES 1 ── */}
      <ContentPage chapter="Ressources & Outils" accent={ACC} pageNum={73} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Boîte à outils de l'entrepreneur sénégalais</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0" }}>
          {[
            { cat: "Création visuelle & contenu", color: VIOL, items: [
              "canva.com — visuels, flyers, stories, présentations (gratuit)",
              "capcut.com — montage vidéo mobile, Reels, TikTok (gratuit)",
              "remove.bg — suppression de fond produits (gratuit)",
              "Adobe Express — version simplifiée d'Illustrator (gratuit)",
              "Descript — transcription et montage audio/vidéo",
            ]},
            { cat: "Gestion réseaux sociaux", color: ACC, items: [
              "Meta Business Suite — Facebook + Instagram (gratuit)",
              "later.com — planification posts (30/mois gratuit)",
              "buffer.com — planification multi-plateformes",
              "TikTok Studio — analytics TikTok avancées (gratuit)",
              "Hootsuite — gestion avancée (payant, mais puissant)",
            ]},
            { cat: "Paiement & finance", color: GOLD, items: [
              "wave.com/business — encaissement Wave (0,5% frais)",
              "paydunya.com — paiements e-commerce tout-en-un",
              "Wave Accounting — comptabilité gratuite",
              "payoneer.com — paiements en devises étrangères",
              "Sage Compta Sénégal — comptabilité PME certifiée",
            ]},
            { cat: "Productivité & gestion", color: SEC, items: [
              "Google Workspace — email, docs, sheets, drive (6$/mois)",
              "Trello / Notion — gestion de projets (gratuit)",
              "WhatsApp Business — CRM gratuit pour < 500 clients",
              "Calendly — prise de rdv automatisée (gratuit)",
              "Zoom / Google Meet — visioconférence (gratuit)",
            ]},
          ].map((r) => (
            <div key={r.cat} style={{ padding: "10px 12px", borderRadius: "8px", background: `${r.color}07`, border: `1px solid ${r.color}20` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: r.color, letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 6px" }}>{r.cat}</p>
              {r.items.map((item, i) => (
                <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: "0 0 2px", lineHeight: 1.5 }}>→ {item}</p>
              ))}
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P74 RESOURCES 2 ── */}
      <ContentPage chapter="Ressources & Outils" accent={ACC} pageNum={74} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Structures d'accompagnement et formation au Sénégal</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0 14px" }}>
          {[
            { name: "ADEPME", color: GOLD, desc: "Agence de Développement et d'Encadrement des PME. Formation, financement, accompagnement, mise en réseau. Guichets à Dakar et dans les capitales régionales.", url: "adepme.sn" },
            { name: "CTIC Dakar", color: ACC, desc: "Incubateur de startups tech sénégalaises. Programme d'accélération, mentorat, accès investisseurs. Idéal pour les startups digitales.", url: "cticdakar.com" },
            { name: "GIZ Sénégal", color: SEC, desc: "Agence de coopération allemande : programmes de formation digitale pour PME, appui à la compétitivité, renforcement de capacités.", url: "giz.de/sn" },
            { name: "COSEC", color: VIOL, desc: "Conseil Sénégalais des Chargeurs : accompagnement pour les entreprises souhaitant exporter. Certifications, formations logistique export.", url: "cosec.sn" },
            { name: "CCIAD", color: ORG, desc: "Chambre de Commerce, d'Industrie et d'Agriculture de Dakar. Formation, arbitrage commercial, certificats d'origine, annuaire professionnel.", url: "cciad.sn" },
            { name: "ONFP / ANPEF", color: "#EC4899", desc: "Accompagnement spécifique pour les femmes entrepreneures : financement, formations, réseaux professionnels féminins.", url: "anpef.sn" },
          ].map((s) => (
            <div key={s.name} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ padding: "4px 8px", borderRadius: "5px", flexShrink: 0, background: `${s.color}12`, border: `1px solid ${s.color}25`, minWidth: "60px", textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: s.color, margin: 0 }}>{s.name}</p>
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: "0 0 1px", lineHeight: 1.55 }}>{s.desc}</p>
                <p style={{ fontFamily: F, fontSize: "8px", color: s.color, margin: 0 }}>→ {s.url}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Formations en ligne adaptées au contexte africain" text="Coursera (partenariat universités africaines) · Udemy (formations en français accessibles) · YouTube (chef.io, gratuites en français) · LinkedIn Learning · Masterclass Afrique. Des certifications Google, Meta et HubSpot sont disponibles gratuitement en ligne et reconnues internationalement." />
      </ContentPage>

      {/* ── P75 RESOURCES 3 — LECTURES RECOMMANDÉES ── */}
      <ContentPage chapter="Ressources & Outils" accent={ACC} pageNum={75} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Lectures essentielles pour l'entrepreneur africain</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 14px" }}>
          {[
            { cat: "Mindset & leadership", color: VIOL, books: [
              "'L'Alchimiste' — Paulo Coelho (vision long terme)",
              "'Start With Why' — Simon Sinek (trouver sa raison d'être)",
              "'The Hard Thing About Hard Things' — Ben Horowitz (entreprendre dans la douleur)",
              "'Réfléchissez et Devenez Riche' — Napoleon Hill",
            ]},
            { cat: "Vente & marketing", color: ACC, books: [
              "'Influence et Manipulation' — Robert Cialdini (psychologie de la persuasion)",
              "'Crossing the Chasm' — Geoffrey Moore (atteindre le marché de masse)",
              "'Building a StoryBrand' — Donald Miller (communication de marque)",
              "'$100M Offers' — Alex Hormozi (créer des offres irrésistibles)",
            ]},
            { cat: "Finance & business", color: GOLD, books: [
              "'Rich Dad Poor Dad' — Robert Kiyosaki (mindset financier)",
              "'The Lean Startup' — Eric Ries (valider avant d'investir)",
              "'Good to Great' — Jim Collins (ce qui fait durer les entreprises)",
              "'Zero to One' — Peter Thiel (créer une catégorie unique)",
            ]},
            { cat: "Contexte africain", color: SEC, books: [
              "'L'Afrique des Affaires' — Côme Laguë",
              "'Africa's Business Revolution' — HBR Press",
              "'L'émergence africaine' — Kako Nubukpo",
              "'Reprenons le Sénégal' — collectif entrepreneurs sénégalais",
            ]},
          ].map((r) => (
            <div key={r.cat} style={{ padding: "9px 11px", borderRadius: "7px", background: `${r.color}07`, border: `1px solid ${r.color}20` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 800, color: r.color, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{r.cat}</p>
              {r.books.map((b, i) => (
                <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: "0 0 3px", lineHeight: 1.5 }}>→ {b}</p>
              ))}
            </div>
          ))}
        </div>
        <Callout color={VIOL} title="Podcasts à écouter en wolof et français" text="'PME Sénégal Podcast' · 'Afrique Business Club Podcast' · 'How I Built This' (version traduite) · 'Le Board' (entrepreneurs francophones) · 'Invest Africa Podcast'. Idéal dans les transports pour transformer le temps mort en formation continue." />
      </ContentPage>

      {/* ── P76 RESOURCES 4 — CHECKLIST FINALE ── */}
      <ContentPage chapter="Ressources & Outils" accent={ACC} pageNum={76} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La checklist de l'entrepreneur structuré</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0" }}>
          {[
            { phase: "Légal & administratif", color: ORG, items: ["□ RCCM obtenu", "□ NINEA obtenu", "□ Compte bancaire pro ouvert", "□ Cachet officiel", "□ Modèle de facture créé", "□ Contrat type prestation rédigé", "□ Assurance professionnelle"] },
            { phase: "Finance & comptabilité", color: GOLD, items: ["□ Finances perso/pro séparées", "□ Registre dépenses/recettes actif", "□ Système de facturation en place", "□ Réserve 3 mois de charges", "□ Expert-comptable contacté", "□ Liasse fiscale planifiée"] },
            { phase: "Marketing & digital", color: VIOL, items: ["□ WhatsApp Business configuré à 100%", "□ Page Facebook pro créée", "□ Compte Instagram pro activé", "□ Google Business Profile complet", "□ 10+ avis Google obtenus", "□ Catalogue WhatsApp créé"] },
            { phase: "Commercial & client", color: SEC, items: ["□ PVU définie et testée", "□ Script de vente WhatsApp écrit", "□ Programme de fidélité actif", "□ Système de suivi client en place", "□ 5 partenariats identifiés", "□ Objectifs CA mensuels fixés"] },
            { phase: "RH & organisation", color: ACC, items: ["□ Fiche de poste pour chaque rôle", "□ Processus documentés (pas dans les têtes)", "□ IPRES & CSS si employés", "□ Contrats de travail signés", "□ Planning annuel congés"] },
            { phase: "Croissance & expansion", color: "#EC4899", items: ["□ Secteurs CEDEAO identifiés", "□ Partenaire local dans 1 pays cible", "□ Plan d'expansion sur 3 ans rédigé", "□ Veille concurrentielle mensuelle", "□ Innovation produit planifiée"] },
          ].map((section) => (
            <div key={section.phase} style={{ padding: "9px 11px", borderRadius: "7px", background: `${section.color}07`, border: `1px solid ${section.color}22` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 800, color: section.color, margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{section.phase}</p>
              {section.items.map((item, i) => (
                <p key={i} style={{ fontFamily: F, fontSize: "8px", color: "#2A2520", margin: "0 0 2px", lineHeight: 1.5 }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════
          PLAN D'ACTION 12 MOIS  (P77–P79)
      ══════════════════════════════════════════════════════════ */}

      {/* ── P77 PLAN TRIMESTRE 1 ── */}
      <ContentPage chapter="Plan d'action 12 mois" accent={SEC} pageNum={77} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Plan d'action 12 mois — Trimestre 1 (J1 à J90)</SH2>
        <SH3 color={SEC}>OBJECTIF : Fondations solides et premières ventes</SH3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", margin: "8px 0" }}>
          {[
            { month: "Mois 1", color: SEC, label: "Structure & Identité", items: [
              "Répondre aux 5 questions fondatrices de la marque",
              "Obtenir RCCM + NINEA (passer par APIX)",
              "Ouvrir compte Wave Business + compte bancaire pro",
              "Créer logo + charte couleur (Canva ou graphiste)",
              "Configurer WhatsApp Business à 100%",
              "Créer profil Google Business Profile",
              "Prendre 20 photos professionnelles de tes produits/services",
            ]},
            { month: "Mois 2", color: ACC, label: "Présence digitale", items: [
              "Optimiser page Facebook professionnelle",
              "Créer/optimiser compte Instagram Business",
              "Publier 3× par semaine sur Facebook et Instagram",
              "Publier 2 WhatsApp Status par jour",
              "Contacter 10 clients existants pour avis Google",
              "Faire 1 Reel/vidéo de présentation de l'entreprise",
              "Créer catalogue WhatsApp avec 5+ produits/services",
            ]},
            { month: "Mois 3", color: GOLD, label: "Premières ventes systématiques", items: [
              "Lancer première campagne Facebook Ads (5K FCFA/j × 14j)",
              "Créer 3 listes de diffusion WhatsApp segmentées",
              "Mettre en place un programme de parrainage simple",
              "Écrire et utiliser le script de vente WhatsApp",
              "Fixer des objectifs CA hebdomadaires + tableau de bord",
              "Remercier les 5 meilleurs clients avec un cadeau surprise",
              "Identifier 3 influenceurs micro locaux à contacter",
            ]},
          ].map((m) => (
            <div key={m.month} style={{ padding: "10px 12px", borderRadius: "8px", background: `${m.color}07`, border: `1px solid ${m.color}25` }}>
              <p style={{ fontFamily: FD, fontSize: "15px", fontWeight: 700, color: m.color, margin: "0 0 2px" }}>{m.month}</p>
              <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 700, color: m.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 7px" }}>{m.label}</p>
              {m.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "5px", marginBottom: "4px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", border: `1px solid ${m.color}50`, flexShrink: 0, marginTop: "1px" }} />
                  <p style={{ fontFamily: F, fontSize: "7.5px", color: "#2A2520", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Indicateurs de succès du Trimestre 1" text="□ 20+ avis Google  □ 200+ abonnés Facebook/Instagram  □ 50+ contacts WhatsApp Business  □ 1ère vente via les réseaux sociaux  □ RCCM et NINEA obtenus  □ Tableau de bord financier actif" />
      </ContentPage>

      {/* ── P78 PLAN TRIMESTRE 2 & 3 ── */}
      <ContentPage chapter="Plan d'action 12 mois" accent={SEC} pageNum={78} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Trimestres 2 & 3 (J91 à J270)</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 12px" }}>
          {[
            { period: "Trimestre 2 — Mois 4-6", color: VIOL, label: "Audience & Notoriété", items: [
              "Analyser les résultats des 3 premiers mois (qu'est-ce qui a marché ?)",
              "Doubler ce qui a fonctionné, abandonner ce qui n'a pas marché",
              "Collaborer avec 2 micro-influenceurs locaux",
              "Lancer une deuxième campagne Facebook Ads avec retargeting",
              "Créer un site web vitrine (si CA > 500K FCFA/mois)",
              "Intégrer PayDunya pour accepter paiements en ligne",
              "Publier première étude de cas client avec résultats chiffrés",
              "Rejoindre 3 groupes Facebook actifs de ta cible",
              "Recruter / externaliser une tâche chronophage",
            ]},
            { period: "Trimestre 3 — Mois 7-9", color: ORG, label: "Rentabilité & Optimisation", items: [
              "Rencontrer l'ADEPME pour diagnostic et accompagnement",
              "Déposer dossier de financement si expansion prévue (DER, BNDE)",
              "Augmenter les prix de 10-15% sur les services à forte valeur perçue",
              "Créer un premier produit/service 'Premium' à haute marge",
              "Mettre en place une newsletter mensuelle client (email ou WhatsApp)",
              "Analyser la fiscalité et optimiser avec un expert-comptable",
              "Identifier le premier pays CEDEAO à cibler (vente en ligne)",
              "Embaucher le premier employé si CA stable > 1,5M FCFA/mois",
              "Documenter tous les processus clés de l'entreprise",
            ]},
          ].map((t) => (
            <div key={t.period} style={{ padding: "10px 12px", borderRadius: "8px", background: `${t.color}07`, border: `1px solid ${t.color}25` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: t.color, margin: "0 0 1px" }}>{t.period}</p>
              <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 700, color: t.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 7px" }}>{t.label}</p>
              {t.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "5px", marginBottom: "4px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", border: `1px solid ${t.color}50`, flexShrink: 0, marginTop: "1px" }} />
                  <p style={{ fontFamily: F, fontSize: "8px", color: "#2A2520", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Le cap à franchir au bout de 6 mois" text="Si après 6 mois tu génères un CA mensuel régulier (même modeste), tu as prouvé que le marché existe. À partir de là, le travail consiste à scaler ce qui marche — pas à réinventer l'entreprise." />
      </ContentPage>

      {/* ── P79 PLAN TRIMESTRE 4 ── */}
      <ContentPage chapter="Plan d'action 12 mois" accent={SEC} pageNum={79} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Trimestre 4 (J271 à J365) — Croissance & Vision</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0 14px" }}>
          {[
            { action: "Bilan annuel complet", color: GOLD, text: "CA réalisé vs objectif, meilleure source de clients, coûts d'acquisition, marge nette réelle, satisfaction clients (NPS). Ce bilan guide tes décisions pour l'année 2." },
            { action: "Plan stratégique Année 2", color: ACC, text: "Nouveaux objectifs chiffrés, nouveaux produits/services à lancer, recrutements prévus, marchés à attaquer. L'entreprise qui n'a pas de plan devient réactive à la place d'être proactive." },
            { action: "Expansion ou consolidation", color: SEC, text: "Si les fondations sont solides (trésorerie positive, clients fidèles, équipe en place), c'est le moment d'attaquer un nouveau marché ou de lancer une deuxième offre. Sinon, consolider avant d'étendre." },
            { action: "Reconnaissance et récompense", color: VIOL, text: "Remercie tes équipes, tes partenaires, tes clients fidèles. Une fête de fin d'année, un cadeau à tes meilleurs clients, un bonus à l'employé de l'année. La culture d'entreprise se construit dans ces moments." },
            { action: "Formation et développement personnel", color: ORG, text: "Investis chaque année 5% de ton CA en formation : toi et ton équipe. Une heure d'apprentissage par jour = l'entrepreneur qui double son niveau de compétences en 5 ans." },
          ].map((a) => (
            <div key={a.action} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "9px 11px", borderRadius: "7px", background: `${a.color}07`, border: `1px solid ${a.color}22` }}>
              <div style={{ width: "5px", borderRadius: "3px", flexShrink: 0, alignSelf: "stretch", background: `${a.color}40` }} />
              <div>
                <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 700, color: a.color, margin: "0 0 3px" }}>{a.action}</p>
                <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.65 }}>{a.text}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Ton objectif au bout de 12 mois" text="CA mensuel stable et prévisible · Au moins 100 clients actifs dans ta base de données · Trésorerie de 3 mois de charges fixes en réserve · 1 employé ou prestataire qui te libère du temps · Ton nom ou ta marque reconnus dans ton quartier ou ta niche. Si tu as tout ça, tu as construit quelque chose de vrai." />
      </ContentPage>

      {/* ── P80 CLOSING ── */}
      <ClosingPage
        title="De l'idée à l'empire —"
        titleHighlight="tu as tout ce qu'il faut"
        accent={ACC}
        pageNum={80}
        total={TOTAL}
        guideLabel={LABEL}
      />

    </EbookViewerShell>
  );
}

