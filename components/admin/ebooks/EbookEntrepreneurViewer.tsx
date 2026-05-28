"use client";

import {
  F, FD, DARK, CREAM, GOLD,
  CoverPage, ChapterPage, ContentPage, DarkPage,
  TOCPage, QuotePage, ClosingPage, EbookViewerShell,
  SH2, SH3, Body, BulletList, NumberedList,
  Callout, MiniTable, Divider,
} from "./EbookLayout";

const ACC = "#0EA5E9";
const SEC = "#10B981";
const LABEL = "Visibilité de l'Entrepreneur — Sénégal 2025";
const TOTAL = 33;

export default function EbookEntrepreneurViewer() {
  return (
    <EbookViewerShell
      title="Guide de Visibilité pour l'Entrepreneur Sénégalais"
      subtitle="Être vu, être choisi, être incontournable"
      pageCount={TOTAL}
      accentColor={ACC}
    >
      {/* ── P1 COVER ── */}
      <CoverPage
        accent={ACC}
        title="Visibilité de"
        titleHighlight="l'Entrepreneur Sénégalais"
        subtitle="Être vu, être choisi, être incontournable. Le guide complet pour construire une présence digitale qui génère des clients au Sénégal."
        badge="Édition 2025 · KEKELI"
        guideLabel={LABEL}
        chips={[
          { label: "WhatsApp Business", color: SEC },
          { label: "Facebook & Instagram Ads", color: "#3B82F6" },
          { label: "SEO local Dakar", color: ACC },
          { label: "Wave & PayDunya", color: GOLD },
          { label: "Community Management", color: "#EC4899" },
        ]}
        stats={[
          { value: "33", label: "pages" },
          { value: "8", label: "chapitres" },
          { value: "10", label: "vérités clés" },
          { value: "90j", label: "plan d'action" },
        ]}
      />

      {/* ── P2 QUOTE ── */}
      <QuotePage
        accent={ACC}
        pageNum={2}
        total={TOTAL}
        guideLabel={LABEL}
        quote="Au Sénégal, la confiance se gagne dans la rue. Mais aujourd'hui, la rue s'appelle internet."
        source="KEKELI Creative Agency — Dakar, Sénégal"
      />

      {/* ── P3 TOC ── */}
      <TOCPage
        accent={ACC}
        pageNum={3}
        total={TOTAL}
        guideLabel={LABEL}
        chapters={[
          { num: 0, title: "Introduction", sub: "L'économie digitale sénégalaise en 2025 : la fenêtre d'opportunité" },
          { num: 1, title: "Construire une marque forte et mémorable", sub: "Identité, naming, éléments de marque minimum" },
          { num: 2, title: "WhatsApp Business : ton meilleur commercial", sub: "Setup complet, catalogue, listes de diffusion, statuts" },
          { num: 3, title: "Facebook et Instagram : capter et convertir", sub: "Page professionnelle, stratégie de contenu" },
          { num: 4, title: "Ton site web et le SEO local à Dakar", sub: "Google Business Profile, mots-clés locaux" },
          { num: 5, title: "La publicité digitale au Sénégal", sub: "Facebook Ads, Google Ads, paiement depuis le Sénégal" },
          { num: 6, title: "Community management à la sénégalaise", sub: "Culture locale, calendrier éditorial, 5 types de contenus" },
          { num: 7, title: "Preuve sociale : avis, témoignages", sub: "Collecter des avis Google, gérer les critiques" },
          { num: 8, title: "E-commerce et paiement mobile", sub: "Wave, PayDunya, livraison Dakar" },
        ]}
      />

      {/* ── P4 INTRO OPENER ── */}
      <ChapterPage
        num={0}
        title="L'économie digitale sénégalaise en 2025"
        hook="Le Sénégal est à un carrefour. Les conditions sont réunies pour qu'un entrepreneur local construise une entreprise visible, crédible et rentable grâce au digital — sans investir des millions."
        accent={ACC}
        pageNum={4}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P5 INTRO CONTENT 1 ── */}
      <ContentPage chapter="Introduction" accent={ACC} pageNum={5} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La fenêtre d'opportunité</SH2>
        <Body>Avec 55% de taux de pénétration internet, une population médiane de 19 ans, et l'essor de Wave et Orange Money, les conditions sont réunies. Mais voici la réalité que peu de formateurs osent dire :</Body>
        <Callout color="#DC2626" title="La vérité inconfortable" text="90% des PME et TPE sénégalaises font encore leur communication comme en 2010 : un groupe WhatsApp, quelques posts Facebook peu soignés, et du bouche-à-oreille aléatoire. Résultat : elles stagnent, pendant que des concurrents moins expérimentés mais mieux positionnés les dépassent." />
        <Divider color={ACC} />
        <SH3 color={ACC}>Les chiffres qui doivent te décider à agir maintenant</SH3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0" }}>
          {[
            { value: "4,5M", label: "Sénégalais actifs sur Facebook (2025)", color: ACC },
            { value: "78%", label: "des achats commencent par une recherche internet ou WhatsApp", color: SEC },
            { value: "8M+", label: "utilisateurs Wave actifs au Sénégal", color: GOLD },
            { value: "67%", label: "consultent les avis en ligne avant de choisir un prestataire", color: "#EC4899" },
          ].map((s) => (
            <div key={s.label} style={{ padding: "12px 14px", borderRadius: "8px", background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
              <p style={{ fontFamily: FD, fontSize: "26px", fontWeight: 700, color: s.color, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "#5A5450", margin: 0, lineHeight: 1.5 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <Body>Les entreprises sénégalaises avec un site web génèrent <strong>2× plus de leads</strong> que celles sans. Ce guide t'aide à construire une visibilité systématique, professionnelle et adaptée à la réalité locale.</Body>
      </ContentPage>

      {/* ── P6 INTRO CONTENT 2 — 10 vérités ── */}
      <ContentPage chapter="Introduction" accent={ACC} pageNum={6} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 10 vérités de la visibilité au Sénégal</SH2>
        <div style={{ margin: "8px 0" }}>
          {[
            { n: 1, color: ACC, text: "La régularité bat la perfection. 3 posts par semaine pendant 6 mois valent mieux qu'une campagne parfaite par an." },
            { n: 2, color: SEC, text: "WhatsApp est ton CRM, ton call center et ton showroom. Traite-le comme tel." },
            { n: 3, color: GOLD, text: "Les photos de mauvaise qualité coûtent plus cher que les photos professionnelles. Une mauvaise image dit : 'je ne fais pas attention aux détails.'" },
            { n: 4, color: ACC, text: "Un client satisfait qui parle de toi vaut 10 publicités. Chouchoute tes clients actuels avant d'en chercher de nouveaux." },
            { n: 5, color: SEC, text: "Le wolof dans tes publications crée une connexion instantanée avec ta communauté. Utilise-le avec authenticité." },
            { n: 6, color: "#EC4899", text: "Ne sois pas partout. Sois excellent sur 2 plateformes plutôt que médiocre sur 5." },
            { n: 7, color: GOLD, text: "Accepter Wave n'est pas un avantage concurrentiel. C'est une condition de base. Si tu ne l'acceptes pas encore, change ça aujourd'hui." },
            { n: 8, color: ACC, text: "Les avis Google comptent. 20 avis positifs peuvent doubler ton nombre de nouveaux clients sans budget publicitaire supplémentaire." },
            { n: 9, color: SEC, text: "La confiance se construit sur la durée. Les entreprises qui durent au Sénégal sont celles qui tiennent leurs promesses, à chaque fois." },
            { n: 10, color: "#F97316", text: "Mesure tout. Sans chiffres, tu navigues à l'aveugle. Ce qui se mesure, s'améliore." },
          ].map((v) => (
            <div key={v.n} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "7px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "5px", flexShrink: 0, background: `${v.color}18`, border: `1px solid ${v.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: v.color }}>{v.n}</span>
              </div>
              <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P7 CH1 OPENER ── */}
      <ChapterPage
        num={1}
        title="Construire une marque forte et mémorable"
        hook="Au Sénégal, on confond souvent branding avec logo coûteux réservé aux grandes entreprises. C'est une erreur fondamentale. Ta marque, c'est ce que les gens pensent et ressentent quand ils entendent ton nom."
        accent={ACC}
        pageNum={7}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P8 CH1 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 01 — Marque" accent={ACC} pageNum={8} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi la marque n'est pas un luxe pour les PME</SH2>
        <Body>Un tailleur qui s'appelle "Couture Prestige par Aminata Diallo", qui a des photos professionnelles, une bio claire et des prix affichés, aura toujours plus de clients qu'un autre aux mêmes compétences qui communique de façon désordonnée. <strong>La marque, c'est la confiance avant l'achat.</strong></Body>
        <Divider color={ACC} />
        <SH3 color={ACC}>Les 5 questions fondatrices de ta marque</SH3>
        <NumberedList color={ACC} items={[
          "Qu'est-ce que je vends réellement ? (Pas le produit, mais le résultat — 'je ne vends pas des robes, je vends la fierté d'une femme sénégalaise qui se sent belle')",
          "À qui exactement ? (Femmes 25-45 ans, classe moyenne Dakar — pas 'tout le monde')",
          "Pourquoi moi plutôt qu'un autre ? (Ma différence : délai 7 jours garanti, paiement Wave accepté, retouches gratuites…)",
          "Quel est mon ton de communication ? (Élégant et luxe ? Accessible et familier ? Technique et expert ?)",
          "Quelle est la promesse principale que je fais à mes clients ?",
        ]} />
        <Callout color={GOLD} title="Nommer son entreprise au Sénégal" text="Ce qui fonctionne : noms porteurs de sens en wolof, sérère, pulaar ou diola (fort différenciateur) · Le prénom + spécialité (Aminata Couture, Mamadou Tech) · Le nom qui dit ce qu'on fait + localisation (Traiteur Yoff, Nettoyage Dakar Prestige). Ce qu'il faut éviter : noms génériques comme 'Excellence Services' ou 'Top Quality' — il en existe des dizaines, aucun n'est mémorable." />
      </ContentPage>

      {/* ── P9 CH1 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 01 — Marque" accent={ACC} pageNum={9} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les éléments de marque minimum à avoir</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0" }}>
          {[
            { level: "Niveau 1 — Indispensable", cost: "0 à 50 000 FCFA", color: SEC, items: ["Nom d'entreprise cohérent et mémorable", "Logo simple (même fait sur Canva gratuitement)", "2-3 couleurs principales utilisées sur tous tes supports", "Photo de profil professionnelle (pas une selfie floue)"] },
            { level: "Niveau 2 — Professionnel", cost: "50 000 à 200 000 FCFA", color: ACC, items: ["Logo créé par un graphiste professionnel", "Charte graphique simple (couleurs, typographies)", "Photos produits/services professionnelles", "En-tête pour documents et devis"] },
            { level: "Niveau 3 — Premium", cost: "200 000 à 500 000 FCFA", color: GOLD, items: ["Identité visuelle complète par une agence", "Guide de marque (brand guidelines)", "Shooting photo professionnel", "Papeterie imprimée de qualité"] },
          ].map((lvl) => (
            <div key={lvl.level} style={{ padding: "10px 14px", borderRadius: "8px", background: `${lvl.color}08`, border: `1px solid ${lvl.color}22` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: lvl.color, letterSpacing: "0.05em", margin: 0 }}>{lvl.level}</p>
                <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 600, color: lvl.color, margin: 0 }}>{lvl.cost}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                {lvl.items.map((item, i) => (
                  <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.5 }}>→ {item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Callout color={GOLD} title="Notre conseil" text="Commence par le Niveau 1 bien fait plutôt que le Niveau 3 bâclé. Un Canva bien maîtrisé et cohérent vaut mieux qu'un logo coûteux sans stratégie derrière." />
      </ContentPage>

      {/* ── P10 CH2 OPENER ── */}
      <ChapterPage
        num={2}
        title="WhatsApp Business : ton meilleur commercial"
        hook="Au Sénégal, WhatsApp est l'internet. Avant de chercher ton site web sur Google, un client va envoyer un message WhatsApp à un ami : 'tu connais quelqu'un pour ça ?' La recommandation WhatsApp est la forme la plus puissante de marketing local."
        accent={SEC}
        pageNum={10}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P11 CH2 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 02 — WhatsApp Business" accent={SEC} pageNum={11} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Configurer WhatsApp Business correctement</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", margin: "8px 0" }}>
          {[
            { step: "Étape 1", color: SEC, text: "Télécharger WhatsApp Business (distinct de WhatsApp personnel)" },
            { step: "Étape 2", color: ACC, text: "Compléter le profil à 100% : photo professionnelle, nom de la marque, catégorie, description courte, adresse, horaires, site web" },
            { step: "Étape 3", color: GOLD, text: "Message d'accueil automatique : 'Bonjour et bienvenue chez [Nom] ! Je suis [Prénom], spécialiste en [service]. Je vous réponds dans les prochaines heures. En attendant, consultez nos tarifs ici : [lien]'" },
            { step: "Étape 4", color: SEC, text: "Message d'absence pour les heures hors bureau" },
            { step: "Étape 5", color: ACC, text: "Créer les réponses rapides : /tarifs → catalogue de prix  /livraison → conditions  /paiement → Wave, Orange Money, compte bancaire" },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "58px", flexShrink: 0, padding: "4px 8px", borderRadius: "6px", background: `${s.color}12`, border: `1px solid ${s.color}25`, textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: s.color, margin: 0 }}>{s.step}</p>
              </div>
              <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>{s.text}</p>
            </div>
          ))}
        </div>
        <Divider color={SEC} />
        <SH3 color={SEC}>Pourquoi WhatsApp domine au Sénégal</SH3>
        <BulletList color={SEC} items={[
          { bold: "95%+", text: "des Sénégalais adultes avec smartphone utilisent WhatsApp quotidiennement" },
          { bold: "98%", text: "de taux d'ouverture d'un message WhatsApp vs ~20% pour un email" },
          { bold: "70%", text: "des PME sénégalaises reçoivent leurs commandes via WhatsApp" },
        ]} />
      </ContentPage>

      {/* ── P12 CH2 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 02 — WhatsApp Business" accent={SEC} pageNum={12} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le catalogue WhatsApp : ton showroom digital</SH2>
        <Body>La fonction Catalogue te permet de présenter tes produits directement dans WhatsApp, avec photos, descriptions et prix. Envoie le lien de ton catalogue à la place d'un PDF qui s'ouvre lentement — le catalogue s'affiche directement dans l'application.</Body>
        <BulletList color={SEC} items={[
          { bold: "Photo de qualité :", text: "bien éclairée, fond propre" },
          { bold: "Description précise :", text: "avantages mis en avant" },
          { bold: "Prix TTC en FCFA :", text: "clairement indiqué — jamais d'ambiguïté" },
        ]} />
        <Divider color={ACC} />
        <SH2 color={DARK}>Les listes de diffusion : marketing de masse gratuit</SH2>
        <Body>Envoie un message à jusqu'à 256 contacts de façon personnelle (chaque contact reçoit le message en privé, pas dans un groupe).</Body>
        <MiniTable
          color={SEC}
          headers={["Liste", "Contenu à envoyer"]}
          rows={[
            ["Clients actifs (6 derniers mois)", "Nouveautés, offres fidélité, rappels"],
            ["Prospects chauds (ont demandé infos)", "Relances, promotions limitées"],
            ["Partenaires / Revendeurs", "Info grossiste, nouvelles collections"],
            ["VIP (meilleurs clients)", "Premières infos, traitement exclusif"],
          ]}
        />
        <Callout color={GOLD} title="Fréquence et règle d'or" text="2 à 3 messages par semaine maximum. Ne mets dans ta liste QUE des gens qui ont dit 'oui' à recevoir tes messages. Spam = blocage = fin de la relation." />
        <SH3 color={SEC}>WhatsApp Status : la story que tout le monde voit</SH3>
        <Body>2 à 5 statuts par jour (disparaissent après 24h) : produit du jour, témoignage client, promotion urgente, before/after, coulisses de ton travail.</Body>
      </ContentPage>

      {/* ── P13 CH3 OPENER ── */}
      <ChapterPage
        num={3}
        title="Facebook et Instagram : capter et convertir"
        hook="Facebook n'est pas mort au Sénégal. Avec 4,5 millions d'utilisateurs actifs — dont les décideurs, chefs de famille et responsables achat — c'est souvent là où se trouvent tes clients les plus solvables."
        accent={ACC}
        pageNum={13}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P14 CH3 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 03 — Facebook & Instagram" accent={ACC} pageNum={14} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Facebook au Sénégal : tes avantages concurrentiels</SH2>
        <BulletList color={ACC} items={[
          { bold: "Publicités géo-ciblées :", text: "par ville (Dakar, Thiès, Saint-Louis, Ziguinchor…) et quartier" },
          { bold: "Groupes Facebook actifs :", text: "'Entraide Sénégal', 'Achat/Vente Dakar', 'Femmes entrepreneures Sénégal' — des dizaines de milliers de membres" },
          { bold: "Événements Facebook :", text: "très utilisés pour les lancements, formations, conférences au Sénégal" },
          { bold: "Facebook Marketplace :", text: "excellent pour les produits physiques jusqu'à 200 000 FCFA" },
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Les éléments obligatoires d'une Page bien configurée</SH3>
        <NumberedList color={ACC} items={[
          "Photo de couverture (851×315px) : communique immédiatement ce que tu fais. Photo produits/services + nom + slogan court",
          "Photo de profil (180×180px) : logo ou photo professionnelle",
          "Bouton d'action : 'Envoyer un message', 'Appeler maintenant' ou 'Visiter le site web'",
          "À propos : rempli complètement (description, horaires, téléphone, site, adresse)",
          "Avis activés : les avis Facebook sont très consultés avant un achat",
        ]} />
        <Callout color="#DC2626" title="Erreurs à éviter absolument" text="Créer un profil personnel au lieu d'une Page professionnelle · Poster uniquement des publicités directes sans contenu de valeur · Ignorer les commentaires et messages · Utiliser des images floues ou pixelisées · Des légendes truffées de fautes d'orthographe" />
      </ContentPage>

      {/* ── P15 CH3 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 03 — Facebook & Instagram" accent={ACC} pageNum={15} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Instagram : convertir le désir en achat</SH2>
        <Body>Instagram au Sénégal est le réseau des 18-38 ans urbains, avec un fort pouvoir d'achat relatif. C'est là où se trouvent les clients qui veulent du "beau", du "premium", du "lifestyle".</Body>
        <SH3 color={ACC}>Secteurs qui performent particulièrement bien</SH3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", margin: "6px 0 12px" }}>
          {["Mode & couture", "Décoration intérieure", "Restauration & traiteur", "Beauté & cosmétiques", "Immobilier", "Événementiel mariage", "Services tech", "Formation"].map((s) => (
            <div key={s} style={{ padding: "6px 8px", borderRadius: "6px", background: `${ACC}08`, border: `1px solid ${ACC}20`, textAlign: "center" }}>
              <p style={{ fontFamily: F, fontSize: "8px", color: "#2A2520", margin: 0 }}>{s}</p>
            </div>
          ))}
        </div>
        <MiniTable
          color={ACC}
          headers={["Format", "Objectif", "Fréquence"]}
          rows={[
            ["Reels 15-60s", "Portée / Nouveaux abonnés", "4-5× / semaine"],
            ["Stories", "Engagement / Relation clients", "Quotidien (3-7)"],
            ["Posts produit", "Vente directe", "3× / semaine"],
            ["Carrousel Conseil", "Crédibilité / SEO", "2× / semaine"],
            ["Lives", "Confiance / Q&A", "1× / semaine"],
          ]}
        />
        <Callout color={SEC} title="Ce qui fait vraiment la différence au Sénégal" text="Témoignages clients en vidéo sur Reels/Stories · Coulisses de fabrication (les sénégalais apprécient voir le travail) · Contenus en wolof : quelques phrases créent une connexion instantanée · Collabs avec d'autres entrepreneurs locaux — la solidarité est une valeur culturelle forte" />
      </ContentPage>

      {/* ── P16 CH4 OPENER ── */}
      <ChapterPage
        num={4}
        title="Ton site web et le SEO local à Dakar"
        hook="Être trouvé sur Google quand quelqu'un cherche 'traiteur mariage Dakar' ou 'plombier Plateau Dakar' — c'est l'objectif du SEO local. Et la première étape est gratuite."
        accent={ACC}
        pageNum={16}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P17 CH4 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 04 — Site web & SEO" accent={ACC} pageNum={17} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>As-tu vraiment besoin d'un site web ?</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0 12px" }}>
          <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#16A34A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Oui, si :</p>
            <BulletList color="#16A34A" items={[
              { text: "Service/produit à plus de 50 000 FCFA" },
              { text: "Tu vises des clients B2B" },
              { text: "Tu veux être trouvé sur Google" },
              { text: "Tu acceptes des paiements en ligne" },
            ]} />
          </div>
          <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#FEF9F0", border: "1px solid #FDE68A" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#D97706", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Pas urgent, si :</p>
            <BulletList color="#D97706" items={[
              { text: "Tu viens de démarrer" },
              { text: "100% sur recommandation" },
              { text: "Budget < 100 000 FCFA/mois" },
            ]} />
          </div>
        </div>
        <Callout color="#DC2626" title="La vérité" text="Un mauvais site web est pire que pas de site du tout. Un site non mis à jour, avec des photos de 2018 et des fautes d'orthographe, nuit à ta crédibilité plus qu'il ne t'aide." />
        <Divider color={ACC} />
        <SH3 color={ACC}>Options pour créer ton site web</SH3>
        <MiniTable
          color={ACC}
          headers={["Option", "Coût", "Pour qui"]}
          rows={[
            ["Wix / Squarespace", "100-200$ / an", "Sites vitrines simples, boutiques légères"],
            ["WordPress + hébergeur local", "50K-100K FCFA/an", "Flexible, meilleur SEO long terme"],
            ["Agence web locale", "200K-1,5M FCFA", "Meilleur résultat, coût plus élevé"],
            ["Google Business seul (gratuit)", "Gratuit", "Commerces de proximité à Dakar"],
          ]}
        />
        <Callout color={GOLD} title="Hébergeurs sénégalais recommandés" text="Sonatel SA · SenHosting · Africa Digital Services. Assure-toi TOUJOURS d'obtenir les accès (hébergement, nom de domaine, CMS) EN TON NOM — jamais en celui de l'agence." />
      </ContentPage>

      {/* ── P18 CH4 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 04 — Site web & SEO" accent={ACC} pageNum={18} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Google Business Profile : absolument obligatoire (gratuit)</SH2>
        <Body>C'est ta fiche sur Google Maps. Un profil complet et optimisé peut te ramener des clients tous les jours sans aucun budget publicitaire.</Body>
        <SH3 color={ACC}>Comment l'optimiser</SH3>
        <BulletList color={ACC} items={[
          { text: "Crée ou réclame ta fiche sur business.google.com" },
          { text: "Remplis TOUT : horaires, numéro, site web, catégorie principale ET secondaires" },
          { text: "Ajoute des photos de qualité régulièrement (au moins 1 par mois)" },
          { text: "Réponds à TOUS les avis, positifs et négatifs" },
          { text: "Utilise la fonction 'Posts' pour publier des actualités sur ta fiche" },
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Les mots-clés locaux à cibler</SH3>
        <Body>Exemples de requêtes que tes clients potentiels tapent sur Google :</Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", margin: "6px 0" }}>
          {["[Ton service] Dakar", "[Ton service] pas cher Dakar", "[Ton service] fiable Sénégal", "Meilleur [ton service] Dakar", "[Ton service] livraison Dakar", "[Ton service] quartier Dakar"].map((kw) => (
            <div key={kw} style={{ padding: "5px 9px", borderRadius: "5px", background: `${ACC}08`, border: `1px solid ${ACC}20` }}>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: ACC, margin: 0 }}>{kw}</p>
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Annuaires locaux à rejoindre (backlinks SEO)" text="Annuaire.sn · Seneweb Business · Sodatech.sn · Yellowpages Sénégal · LinkedIn (pour le B2B) · Mara Moja (e-commerce Afrique de l'Ouest)" />
      </ContentPage>

      {/* ── P19 CH5 OPENER ── */}
      <ChapterPage
        num={5}
        title="La publicité digitale au Sénégal"
        hook="Facebook Ads ou Google Ads ? Comment payer depuis Dakar ? Comment créer une publicité qui convertit pour le marché sénégalais ? Ce chapitre répond à tout."
        accent={SEC}
        pageNum={19}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P20 CH5 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 05 — Publicité digitale" accent={SEC} pageNum={20} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Facebook Ads vs Google Ads</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0 12px" }}>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${ACC}08`, border: `1px solid ${ACC}22` }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: ACC, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>Facebook Ads ✓ Recommandé</p>
            <BulletList color={ACC} items={[
              { text: "Produits physiques, services grand public, B2C" },
              { text: "Budget minimum : 5K-10K FCFA/jour" },
              { text: "Ciblage : ville, âge, sexe, intérêts" },
              { text: "ROI le plus immédiat pour les PME" },
            ]} />
          </div>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${SEC}08`, border: `1px solid ${SEC}22` }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: SEC, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>Google Ads</p>
            <BulletList color={SEC} items={[
              { text: "Services à forte intention : plombier, avocat, médecin" },
              { text: "Capte ceux qui cherchent activement" },
              { text: "Budget minimum : 15K-25K FCFA/jour" },
              { text: "Plus complexe à configurer" },
            ]} />
          </div>
        </div>
        <SH3 color={GOLD}>Comment payer les publicités Facebook depuis le Sénégal</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Carte Visa Ecobank / UBA / CBAO :", text: "le plus simple si tu as une carte bancaire internationale" },
          { bold: "Carte prépayée Djougal (Sonatel) :", text: "disponible en agences Orange, rechargeable en Wave ou Orange Money" },
          { bold: "Carte d.money (Wave) :", text: "carte Visa virtuelle créée directement depuis l'app Wave — FORTEMENT RECOMMANDÉ en 2025" },
        ]} />
        <Callout color={GOLD} title="La solution la plus simple" text="La carte d.money de Wave est la solution la plus rapide et pratique pour payer Facebook Ads depuis le Sénégal en 2025. Crée-la directement dans ton application Wave en quelques secondes." />
      </ContentPage>

      {/* ── P21 CH5 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 05 — Publicité digitale" accent={SEC} pageNum={21} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Créer une publicité Facebook qui convertit au Sénégal</SH2>
        <div style={{ margin: "8px 0 12px" }}>
          {[
            { part: "Accroche (1ère ligne — doit stopper le scroll)", color: SEC, tips: ["Pose une question sur un problème réel : 'Vous cherchez un traiteur fiable pour votre mariage dakarois ?'", "Annonce un avantage clair : 'Livraison gratuite dans tout Dakar'", "Utilise un chiffre : 'Déjà 500+ familles nous font confiance'"] },
            { part: "Corps du texte", color: ACC, tips: ["Présente la solution (pas le produit)", "Liste 2-3 avantages clés", "Mentionne les modes de paiement (Wave, Orange Money, espèces) — réassurance"] },
            { part: "Visuel", color: GOLD, tips: ["Photo RÉELLE de ton produit/service (pas de stock photo américain)", "Personnes sénégalaises / contexte sénégalais si possible", "Texte dans l'image : 20% maximum (règle Facebook)"] },
          ].map((s) => (
            <div key={s.part} style={{ marginBottom: "10px", padding: "10px 12px", borderRadius: "8px", background: `${s.color}06`, border: `1px solid ${s.color}18` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: s.color, letterSpacing: "0.05em", margin: "0 0 5px" }}>{s.part}</p>
              {s.tips.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "3px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: s.color, marginTop: "5px", flexShrink: 0 }} />
                  <p style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: 0, lineHeight: 1.55 }}>{t}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Callout color={SEC} title="Ciblage de départ pour PME sénégalaise" text="Lieu : Dakar + 20km · Âge : 25-55 ans · Budget : 5 000-15 000 FCFA/jour · Durée : 7-14 jours pour tester · Call to action : 'Envoyer un message' est le plus efficace pour générer des contacts WhatsApp" />
      </ContentPage>

      {/* ── P22 CH6 OPENER ── */}
      <ChapterPage
        num={6}
        title="Community management à la sénégalaise"
        hook="Avant de publier n'importe quoi, comprends ces réalités culturelles. Une marque qui respecte la culture sénégalaise crée une connexion émotionnelle que la meilleure publicité du monde ne peut pas acheter."
        accent={ACC}
        pageNum={22}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P23 CH6 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 06 — Community Management" accent={ACC} pageNum={23} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La culture de communication sénégalaise en ligne</SH2>
        <SH3 color={SEC}>Ce qui engage</SH3>
        <BulletList color={SEC} items={[
          { bold: "Le respect et la Teranga :", text: "un ton chaleureux et respectueux génère plus d'engagement qu'un ton froid et corporate" },
          { bold: "Le sens de l'humour sénégalais :", text: "les marques qui osent un peu d'humour subtil et local créent une connexion émotionnelle forte" },
          { bold: "La fierté nationale :", text: "les contenus qui valorisent le 'made in Sénégal' et les savoir-faire locaux — la CAN 2022 en est l'exemple parfait" },
          { bold: "La religion :", text: "respecter les fêtes religieuses (Korité, Tabaski, Noël pour les chrétiens) crée un lien humain fort" },
          { bold: "La famille et la communauté :", text: "les messages qui parlent d'entraide et de communauté résonnent profondément" },
        ]} />
        <SH3 color="#DC2626">Ce qui génère des crises</SH3>
        <BulletList color="#DC2626" items={[
          { text: "Le manque de respect envers les aînés ou figures d'autorité" },
          { text: "Les références politiques — à éviter sauf si c'est ton positionnement" },
          { text: "Les contenus perçus comme irrespectueux envers l'islam" },
          { text: "La réponse agressive aux critiques clients" },
        ]} />
        <Divider color={ACC} />
        <SH2 color={DARK}>Le calendrier éditorial sénégalais</SH2>
        <MiniTable
          color={ACC}
          headers={["Période", "Opportunité", "Ton recommandé"]}
          rows={[
            ["Korité (fin Ramadan)", "Promotions, vœux", "Festif, chaleureux"],
            ["Tabaski", "Promotions, vœux", "Festif, chaleureux"],
            ["Fête Indépendance (4 avril)", "Fierté nationale", "Patriotique"],
            ["Rentrée scolaire (sept.-oct.)", "Selon secteur", "Pratique, solution"],
            ["Fêtes de fin d'année", "Bilan, vœux, promotions", "Chaleureux"],
            ["Saint-Valentin", "Mode, restauration, cadeaux", "Romantique"],
          ]}
        />
      </ContentPage>

      {/* ── P24 CH6 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 06 — Community Management" accent={ACC} pageNum={24} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 5 types de contenus qui fonctionnent toujours</SH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "8px 0" }}>
          {[
            { n: "01", title: "L'Avant / Après", color: ACC, text: "Montrer la transformation que tu offres. Un coiffeur avant/après coiffure. Un peintre avant/après rénovation. Très partagé dans les groupes sénégalais." },
            { n: "02", title: "Le Témoignage client filmé", color: SEC, text: "Pas besoin d'un studio. Une cliente qui dit 30 secondes face caméra pourquoi elle vous recommande. C'est la preuve sociale la plus puissante au Sénégal." },
            { n: "03", title: "Les Coulisses", color: GOLD, text: "Montrer comment tu travailles. La fabrication, le transport, l'équipe en action. Crée de la confiance et de l'attachement émotionnel." },
            { n: "04", title: "Le Conseil utile", color: "#EC4899", text: "Partage ton expertise gratuitement. Un menuisier qui explique l'entretien du bois. Un traiteur qui partage une recette. Te positionne comme expert." },
            { n: "05", title: "La Promotion limitée dans le temps", color: "#F97316", text: "'Jusqu'à samedi uniquement : -20% sur toutes nos installations.' L'urgence crée de l'action." },
          ].map((c) => (
            <div key={c.n} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: c.color }}>{c.n}</span>
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: "10.5px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{c.title}</p>
                <p style={{ fontFamily: F, fontSize: "9.5px", color: "#5A5450", margin: 0, lineHeight: 1.6 }}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P25 CH7 OPENER ── */}
      <ChapterPage
        num={7}
        title="La preuve sociale : avis, témoignages"
        hook="Dans la culture sénégalaise, la recommandation d'un ami ou d'un membre de la famille a une valeur quasi absolue. Le digital a amplifié ce principe à l'infini."
        accent={SEC}
        pageNum={25}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P26 CH7 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 07 — Preuve Sociale" accent={SEC} pageNum={26} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Collecter des avis Google : le guide pratique</SH2>
        <Body>Un avis Google visible = une recommandation pour des milliers d'inconnus. Un témoignage vidéo = confiance amplifiée. Une mention dans un groupe WhatsApp = marketing viral gratuit.</Body>
        <SH3 color={SEC}>Comment demander un avis (sans être gênant)</SH3>
        <NumberedList color={SEC} items={[
          "Va sur ton Google Business Profile et clique sur 'Demander des avis'",
          "Copie le lien court généré",
          "Envoie ce lien par WhatsApp à tes clients satisfaits dans les 24-48h après la prestation :",
        ]} />
        <Callout color={SEC} title="Message type à envoyer" text="'Bonjour [Prénom], merci encore pour votre confiance ! Si vous avez été satisfait(e) de notre service, un avis Google nous aiderait beaucoup à nous faire connaître. C'est rapide (2 minutes) : [lien]. Dieu vous bénisse ! 🙏'" />
        <Callout color={GOLD} title="Objectif minimum" text="20 avis positifs sur Google en 3 mois. Envoie cette demande à chaque nouveau client, systématiquement." />
        <Divider color={SEC} />
        <SH3 color={SEC}>Programme de recommandation</SH3>
        <Body>Le système le plus simple : <strong>"Recommandez-nous à un ami qui commande, et recevez tous les deux une remise de 10%"</strong></Body>
        <BulletList color={SEC} items={[
          { text: "Annonce dans tes groupes WhatsApp de clients" },
          { text: "Mets-le dans ta bio Instagram et Facebook" },
          { text: "Rappelle-le à la fin de chaque prestation" },
          { text: "Crée un code de parrainage simple (le prénom du client)" },
        ]} />
      </ContentPage>

      {/* ── P27 CH7 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 07 — Preuve Sociale" accent={SEC} pageNum={27} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Gérer les mauvais avis (inévitables)</SH2>
        <Body>Les mauvais avis arrivent, même aux meilleures entreprises. La règle d'or : <strong>répondre toujours, rapidement, avec respect.</strong></Body>
        <Callout color={ACC} title="Template de réponse à un avis négatif" text="'Bonjour [Prénom], merci pour votre retour. Nous sommes vraiment navrés que votre expérience n'ait pas été à la hauteur de vos attentes et des nôtres. [Reconnaître le problème ou corriger une erreur factuelle]. Nous vous invitons à nous contacter directement au [numéro] pour trouver une solution. La satisfaction de nos clients est notre priorité.'" />
        <Body>Ce que cette réponse dit aux autres clients qui lisent l'avis : <em>"Cette entreprise prend les critiques au sérieux et cherche à s'améliorer."</em> C'est en fait une preuve de professionnalisme.</Body>
        <Divider color={SEC} />
        <SH2 color={DARK}>Amplifier les témoignages positifs</SH2>
        <BulletList color={SEC} items={[
          { bold: "Screenshot + publication :", text: "transforme les messages WhatsApp positifs en posts Instagram (avec l'accord du client)" },
          { bold: "Vidéo témoignage :", text: "demande à tes 3 meilleurs clients de faire 30 secondes face caméra — offre-leur quelque chose en échange" },
          { bold: "Étude de cas :", text: "pour les services B2B, une étude de cas avec chiffres (avant/après) est très puissante sur LinkedIn et Facebook" },
          { bold: "Partage systématique :", text: "crée un dossier 'Témoignages' dans tes highlights Instagram — visi visible dès le premier coup d'œil" },
        ]} />
        <Callout color={GOLD} title="La règle des 3 leviers de confiance" text="Un prospect sénégalais qui voit (1) un profil professionnel, (2) des avis Google positifs, (3) des témoignages vidéo de clients locaux, a 5× plus de chances de te contacter que quelqu'un qui ne voit rien de tout ça." />
      </ContentPage>

      {/* ── P28 CH8 OPENER ── */}
      <ChapterPage
        num={8}
        title="E-commerce et paiement mobile"
        hook="La révolution du paiement mobile au Sénégal est réelle et profonde. Accepter Wave aujourd'hui n'est plus un avantage concurrentiel — c'est une condition de survie pour ton business."
        accent={GOLD}
        pageNum={28}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P29 CH8 CONTENT 1 ── */}
      <DarkPage title="L'écosystème du paiement mobile en 2025" accent={GOLD} pageNum={29} total={TOTAL} guideLabel={LABEL}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "12px 0" }}>
          {[
            { name: "Wave", users: "8M+", color: "#06B6D4", points: ["Transferts gratuits", "Interface très simple", "Très adopté"], limit: "Pas encore de paiements e-commerce directs" },
            { name: "Orange Money", users: "6M+", color: "#F97316", points: ["Réseau étendu", "Paiements en ligne possibles"], limit: "Frais plus élevés que Wave" },
            { name: "Free Money", users: "3M+", color: "#8B5CF6", points: ["Croissance rapide"], limit: "Moins répandu" },
            { name: "PayDunya", users: "B2B", color: GOLD, points: ["Intègre Wave + OM + CB", "Solution e-commerce complète", "Commission 1,5-3%"], limit: "Pour la vente en ligne" },
          ].map((p) => (
            <div key={p.name} style={{ padding: "12px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: `1px solid ${p.color}25` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 700, color: "#fff", margin: 0 }}>{p.name}</p>
                <p style={{ fontFamily: FD, fontSize: "14px", fontWeight: 700, color: p.color, margin: 0 }}>{p.users}</p>
              </div>
              {p.points.map((pt, i) => <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "rgba(255,255,255,0.5)", margin: "0 0 2px" }}>✓ {pt}</p>)}
              <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.3)", margin: "4px 0 0", fontStyle: "italic" }}>{p.limit}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 16px", borderRadius: "10px", background: `${GOLD}15`, border: `1px solid ${GOLD}35`, margin: "8px 0 0" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 5px" }}>Règle absolue</p>
          <p style={{ fontFamily: F, fontSize: "10.5px", color: "#fff", margin: 0, lineHeight: 1.7 }}>Accepter Wave est aujourd'hui <strong style={{ color: GOLD }}>obligatoire</strong>. Ne pas accepter Wave au Sénégal en 2025, c'est se couper de 8 millions de clients potentiels. C'est l'équivalent de dire "je n'accepte pas les espèces" il y a 10 ans.</p>
        </div>
      </DarkPage>

      {/* ── P30 CH8 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 08 — E-commerce & Paiement" accent={GOLD} pageNum={30} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Accepter les paiements : selon ton niveau</SH2>
        <BulletList color={GOLD} items={[
          { bold: "Niveau 1 (immédiat, gratuit) :", text: "Ouvre un compte Wave Business. Affiche ton numéro Wave partout. Envoie ton QR code à tes clients." },
          { bold: "Niveau 2 (commerce physique) :", text: "TPE Orange Money en location + sticker QR code Wave sur ta caisse" },
          { bold: "Niveau 3 (vente en ligne) :", text: "PayDunya (paydunya.com) — intègre Wave, Orange Money, carte bancaire, Free Money. Commission 1,5-3% par transaction." },
        ]} />
        <Divider color={GOLD} />
        <SH2 color={DARK}>Vendre en ligne : les options</SH2>
        <MiniTable
          color={GOLD}
          headers={["Option", "Coût", "Pour qui"]}
          rows={[
            ["Instagram Shopping + WhatsApp", "Gratuit", "Le duo le plus utilisé par les PME en 2025"],
            ["Boutique Facebook", "Gratuit", "Produits jusqu'à 100 000 FCFA"],
            ["WooCommerce (WordPress)", "~100K FCFA/an", "Catalogues importants, intégrable PayDunya"],
            ["Shopify", "~20$/mois", "Simple, supporte PayDunya via plugins"],
          ]}
        />
        <SH3 color={SEC}>Livraison à Dakar : les partenaires recommandés</SH3>
        <BulletList color={SEC} items={[
          { bold: "Yobante Express :", text: "livraison J+1, bien établi à Dakar et banlieues. 1 500-5 000 FCFA par colis" },
          { bold: "DHL Express Sénégal :", text: "pour les colis importants et l'international" },
          { bold: "Chronopost Sénégal :", text: "réseau national, livraison hors Dakar. 3 000-8 000 FCFA" },
          { bold: "La Poste Sénégal :", text: "réseau le plus étendu, moins rapide mais national" },
        ]} />
      </ContentPage>

      {/* ── P31 RESOURCES ── */}
      <ContentPage chapter="Ressources & Outils" accent={ACC} pageNum={31} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Outils recommandés</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 14px" }}>
          {[
            { cat: "Création visuelle", color: ACC, items: ["canva.com — visuels professionnels sans compétences", "capcut.com — montage vidéo mobile (Reels, TikTok)", "remove.bg — suppression de fond photos produits"] },
            { cat: "Gestion réseaux sociaux", color: SEC, items: ["Meta Business Suite (gratuit) — Facebook + Instagram", "later.com — planification (30 posts/mois gratuits)", "buffer.com — alternative à Later"] },
            { cat: "Paiement & Finance", color: GOLD, items: ["wave.com/business — Wave Business gratuit", "paydunya.com — paiements en ligne", "payoneer.com — paiements internationaux", "Sage Accounting — comptabilité locale"] },
            { cat: "Analyses", color: "#EC4899", items: ["Google Analytics (gratuit)", "Meta Insights (gratuit)", "Google Search Console (gratuit)"] },
          ].map((r) => (
            <div key={r.cat} style={{ padding: "10px 12px", borderRadius: "8px", background: `${r.color}08`, border: `1px solid ${r.color}20` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: r.color, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 5px" }}>{r.cat}</p>
              {r.items.map((item, i) => (
                <p key={i} style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: "0 0 2px", lineHeight: 1.5 }}>→ {item}</p>
              ))}
            </div>
          ))}
        </div>
        <Divider color={ACC} />
        <SH3 color={ACC}>Structures d'accompagnement au Sénégal</SH3>
        <BulletList color={ACC} items={[
          { bold: "ADEPME :", text: "Agence de Développement et d'Encadrement des PME — accompagnement, financement, formation. adepme.sn" },
          { bold: "BNDE :", text: "Banque Nationale pour le Développement Économique — financement PME" },
          { bold: "CTIC Dakar :", text: "Incubateur pour les startups tech" },
          { bold: "GIZ Sénégal :", text: "Programmes d'accompagnement digital pour les entreprises" },
        ]} />
      </ContentPage>

      {/* ── P32 PLAN D'ACTION ── */}
      <ContentPage chapter="Plan d'action 90 jours" accent={SEC} pageNum={32} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Plan d'action 90 jours</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", margin: "8px 0" }}>
          {[
            { month: "Mois 1", color: ACC, label: "Fondations", items: [
              "Répondre aux 5 questions fondatrices de ta marque",
              "Créer / améliorer logo et charte couleurs",
              "Configurer WhatsApp Business à 100%",
              "Créer ou optimiser ta Page Facebook pro",
              "Créer ou optimiser ton compte Instagram pro",
              "Ouvrir un compte Wave Business",
              "Créer ta fiche Google Business Profile",
              "Demander des avis à tes 10 meilleurs clients",
            ]},
            { month: "Mois 2", color: SEC, label: "Audience", items: [
              "Publier quotidiennement sur WhatsApp Status",
              "Publier 4-5× par semaine sur Instagram",
              "Publier 3× par semaine sur Facebook",
              "Créer 1 Reel / semaine (travail en action)",
              "Publier 1 témoignage client / semaine",
              "Lancer une campagne Facebook Ads (5K FCFA/j, 7 jours)",
              "Tester 2 visuels différents et analyser",
            ]},
            { month: "Mois 3", color: GOLD, label: "Croissance", items: [
              "Mettre en place un programme de parrainage",
              "Remercier personnellement tes 3 meilleurs clients",
              "Créer un système de récompense fidélité",
              "Analyser : quelle source a apporté le plus de clients ?",
              "Doubler ce qui fonctionne",
              "Définir les objectifs 6 prochains mois (avec chiffres)",
              "Envisager partenariat agence pour accélérer",
            ]},
          ].map((m) => (
            <div key={m.month} style={{ padding: "10px 12px", borderRadius: "8px", background: `${m.color}08`, border: `1px solid ${m.color}25` }}>
              <p style={{ fontFamily: FD, fontSize: "15px", fontWeight: 700, color: m.color, margin: "0 0 2px" }}>{m.month}</p>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: m.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>{m.label}</p>
              {m.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "5px", marginBottom: "4px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", border: `1px solid ${m.color}50`, flexShrink: 0, marginTop: "1px" }} />
                  <p style={{ fontFamily: F, fontSize: "8px", color: "#2A2520", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P33 CLOSING ── */}
      <ClosingPage
        title="La visibilité n'est plus un bonus"
        titleHighlight="c'est ta survie"
        accent={ACC}
        pageNum={33}
        total={TOTAL}
        guideLabel={LABEL}
      />
    </EbookViewerShell>
  );
}
