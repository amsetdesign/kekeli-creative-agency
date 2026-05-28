"use client";

import {
  F, FD, DARK, CREAM, GOLD,
  CoverPage, ChapterPage, ContentPage, DarkPage,
  TOCPage, QuotePage, ClosingPage, EbookViewerShell,
  SH2, SH3, Body, BulletList, NumberedList,
  Callout, MiniTable, Divider,
} from "./EbookLayout";

const ACC = "#8B5CF6";
const SEC = "#EC4899";
const LABEL = "Guide de l'Artiste — Sénégal 2025";
const TOTAL = 30;

export default function EbookArtisteViewer() {
  return (
    <EbookViewerShell
      title="Guide de l'Artiste Sénégalais"
      subtitle="Stratégie, Distribution & Revenus"
      pageCount={TOTAL}
      accentColor={ACC}
    >
      {/* ── P1 COVER ── */}
      <CoverPage
        accent={ACC}
        title="Guide de l'Artiste"
        titleHighlight="au Sénégal"
        subtitle="Tout ce que personne ne t'a dit sur la construction d'une carrière musicale durable depuis Dakar."
        badge="Édition 2025 · KEKELI"
        guideLabel={LABEL}
        chips={[
          { label: "Distribution digitale", color: ACC },
          { label: "Streaming & Revenus", color: SEC },
          { label: "Droits BSDA", color: GOLD },
          { label: "Réseaux sociaux", color: "#10B981" },
          { label: "Festivals & Live", color: "#F97316" },
        ]}
        stats={[
          { value: "30", label: "pages" },
          { value: "7", label: "chapitres" },
          { value: "8", label: "sources de revenus" },
          { value: "90j", label: "plan d'action" },
        ]}
      />

      {/* ── P2 QUOTE ── */}
      <QuotePage
        accent={ACC}
        pageNum={2}
        total={TOTAL}
        guideLabel={LABEL}
        quote="KEKELI signifie lumière en langue Ewe. Ce guide est fait pour mettre la lumière sur ton chemin d'artiste."
        source="KEKELI Creative Agency — Dakar, Sénégal"
      />

      {/* ── P3 TOC ── */}
      <TOCPage
        accent={ACC}
        pageNum={3}
        total={TOTAL}
        guideLabel={LABEL}
        chapters={[
          { num: 0, title: "Introduction", sub: "Le marché musical sénégalais en 2025 : opportunités et réalités" },
          { num: 1, title: "Construire une identité artistique solide", sub: "Nom, branding visuel, univers sonore" },
          { num: 2, title: "La distribution musicale depuis le Sénégal", sub: "Plateformes, distributeurs, récupérer ses royalties" },
          { num: 3, title: "Maîtriser les réseaux sociaux", sub: "TikTok, Instagram, YouTube, WhatsApp" },
          { num: 4, title: "Monétiser ta musique", sub: "Les 8 sources de revenus d'un artiste complet" },
          { num: 5, title: "Tes droits, ta protection, le BSDA", sub: "Propriété intellectuelle et contrats" },
          { num: 6, title: "Live, festivals, networking et industrie", sub: "Scènes, médias, dossier de presse" },
          { num: 7, title: "Travailler avec des professionnels", sub: "Manager, agence, beatmakers, studios" },
        ]}
      />

      {/* ── P4 INTRO OPENER ── */}
      <ChapterPage
        num={0}
        title="Le marché musical sénégalais en 2025"
        hook="Le Sénégal vit une révolution musicale silencieuse. Les artistes qui percent ne sont plus ceux qui ont la chance — ce sont ceux qui ont la stratégie."
        accent={ACC}
        pageNum={4}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P5 INTRO CONTENT 1 ── */}
      <ContentPage chapter="Introduction" accent={ACC} pageNum={5} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Opportunités et réalités</SH2>
        <Body>Tandis que des artistes comme Wally Seck ou Sidy Diop accumulent des millions de vues, la majorité des talents du pays restent invisibles — non par manque de talent, mais par manque de stratégie.</Body>
        <Divider color={ACC} />
        <SH3 color={ACC}>Ce que les chiffres disent</SH3>
        <BulletList color={ACC} items={[
          { bold: "9 millions", text: "d'utilisateurs internet au Sénégal (taux de pénétration ~55%)" },
          { bold: "YouTube", text: "est la plateforme de streaming audio-visuel n°1 au Sénégal" },
          { bold: "Boomplay", text: "est l'application de streaming musical la plus utilisée en Afrique de l'Ouest" },
          { bold: "TikTok", text: "a explosé depuis 2022 — principal vecteur de découverte musicale pour les 16-30 ans" },
          { bold: "La diaspora", text: "sénégalaise (France, Italie, USA, Espagne) représente un marché de consommation énorme et largement ignoré" },
        ]} />
        <Callout
          color={ACC}
          title="Ce qui a changé depuis 2020"
          text="L'ère où un artiste pouvait percer uniquement grâce à un réseau de griots et de bouche-à-oreille est révolue. Aujourd'hui, un artiste sénégalais compétitif doit maîtriser simultanément sa création musicale, sa présence digitale, sa stratégie de distribution, et sa capacité à générer des revenus diversifiés."
        />
        <SH3 color={SEC}>Ce guide te donne les outils concrets</SH3>
        <Body>Construire une carrière durable — pas juste un tube. Chaque chapitre couvre un pilier stratégique avec des outils, des chiffres réels et des démarches pratiques adaptées au contexte sénégalais.</Body>
      </ContentPage>

      {/* ── P6 INTRO CONTENT 2 ── */}
      <ContentPage chapter="Introduction" accent={ACC} pageNum={6} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le marché du live : une opportunité sous-exploitée</SH2>
        <Body>Le marché du live reste dominé par quelques grandes figures, mais les salles moyennes (200-1 000 personnes) sont massivement sous-exploitées. C'est précisément là qu'un artiste émergent peut bâtir sa base.</Body>
        <MiniTable
          color={ACC}
          headers={["Catégorie de scène", "Taille", "Opportunité"]}
          rows={[
            ["Grandes salles (CDs, stades)", "1 000+", "Réservée aux têtes d'affiche"],
            ["Salles moyennes (rooftops, clubs)", "200–1 000", "Sous-exploitée ✓ à cibler"],
            ["Petites scènes (restaurants, bars)", "50–200", "Accessible dès le démarrage"],
            ["Événements corporate & mariages", "Variable", "Très rémunérateur, méconnu"],
          ]}
        />
        <Divider color={SEC} />
        <SH3 color={SEC}>Les genres musicaux porteurs au Sénégal en 2025</SH3>
        <BulletList color={SEC} items={[
          { bold: "Mbalax modernisé :", text: "valeur sûre pour les cérémonies et les médias classiques" },
          { bold: "Afrobeats / Afrofusion :", text: "fort potentiel export et streaming international" },
          { bold: "Afrotrap / Drill sénégalaise :", text: "audience jeune explosive sur TikTok" },
          { bold: "Hip-hop wolof :", text: "engagement communautaire fort, audience fidèle" },
          { bold: "Gospel / Musique religieuse :", text: "marché stable, très peu concurrencé en digital" },
        ]} />
        <Callout
          color={GOLD}
          title="Point de départ"
          text="Quel que soit ton genre, ce guide s'applique à toi. Les stratégies présentées ont été adaptées à la réalité sénégalaise — pas copiées de manuels américains ou européens."
        />
      </ContentPage>

      {/* ── P7 CH1 OPENER ── */}
      <ChapterPage
        num={1}
        title="Construire une identité artistique solide"
        hook="Avant tout investissement en production ou communication, tu dois répondre honnêtement à cinq questions fondamentales sur qui tu es en tant qu'artiste."
        accent={ACC}
        pageNum={7}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P8 CH1 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 01 — Identité" accent={ACC} pageNum={8} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Qui es-tu vraiment en tant qu'artiste ?</SH2>
        <Body>Avant tout investissement, réponds honnêtement à ces 5 questions fondamentales :</Body>
        <NumberedList color={ACC} items={[
          "Quel est mon genre musical principal ? (Mbalax, Afrobeats, Afrotrap, Hip-hop wolof, Gospel, Drill sénégalaise…)",
          "À qui je parle ? (Jeunes dakarois, diaspora, clientèle internationale, communauté religieuse…)",
          "Quel message est-ce que je porte ? (Amour, spiritualité, critique sociale, fête, identité culturelle…)",
          "Quelle est mon émotion signature ? (L'artiste qu'on écoute quand on est triste vs. celui qu'on écoute quand on fait la fête)",
          "Qu'est-ce qui me rend irremplaçable ? (Ta langue, ton accent, ton instrument, ta voix, ton vécu, ton look)",
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Le nom d'artiste : une décision stratégique</SH3>
        <Body>Ton nom d'artiste est ta marque. Un mauvais choix peut freiner ta carrière pendant des années.</Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0" }}>
          <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#DC2626", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>À éviter</p>
            <BulletList color="#DC2626" items={[
              { text: "Noms trop proches d'artistes établis" },
              { text: "Difficiles à prononcer pour la diaspora" },
              { text: "Trop longs pour les handles Instagram/TikTok" },
              { text: "Sans signification culturelle" },
            ]} />
          </div>
          <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#16A34A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>À rechercher</p>
            <BulletList color="#16A34A" items={[
              { text: "Court, mémorisable, unique" },
              { text: "Fonctionne en wolof ET en français" },
              { text: "Disponible sur toutes les plateformes" },
              { text: "Signification forte (wolof, sérère, diola…)" },
            ]} />
          </div>
        </div>
        <Callout color={ACC} title="Exemples réussis" text="Wally Seck (authenticité), Nix (court, fort, international), Fou Malade (concept fort), Omzo Dollar (mémorable). Chacun de ces noms raconte quelque chose avant même qu'on entende la musique." />
      </ContentPage>

      {/* ── P9 CH1 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 01 — Identité" accent={ACC} pageNum={9} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le branding visuel : ta charte graphique</SH2>
        <Body>Ton image visuelle doit être cohérente sur tous tes supports — de ta photo de profil Instagram à tes flyers d'événements.</Body>
        <BulletList color={ACC} items={[
          { bold: "Logo / signature visuelle :", text: "pas forcément complexe, mais cohérent. Peut être simplement ton nom stylisé." },
          { bold: "Palette de couleurs :", text: "2 à 3 couleurs maximum. Elles doivent raconter quelque chose (noir + or = premium, vert + jaune = roots africain…)" },
          { bold: "Typographies :", text: "1 typo principale pour le nom, 1 secondaire pour les textes" },
          { bold: "Photo presse officielle :", text: "minimum 3 photos haute résolution dans des environnements différents (studio, extérieur urbain, style)" },
        ]} />
        <Callout color={SEC} title="Spécificité sénégalaise" text="Les artistes qui percent intègrent des éléments culturels locaux réinterprétés de façon contemporaine : tissu wax en fond, architecture dakaroise (Plateau, Médina), couchers de soleil sur la Corniche. Ne cherche pas à copier l'esthétique nigériane ou américaine — ton identité sénégalaise est ta force différenciante." />
        <Divider color={SEC} />
        <SH2 color={DARK}>Ton univers sonore : la cohérence musicale</SH2>
        <Body>Un artiste qui sort un mbalax, puis un afrobeats, puis un hip-hop, sans fil conducteur, <strong>perd ses fans à chaque sortie</strong>.</Body>
        <SH3 color={SEC}>Stratégie recommandée</SH3>
        <NumberedList color={SEC} items={[
          "Définis 1 genre principal et 1 genre secondaire maximum",
          "Garde un élément sonore signature dans chaque morceau (un instrument, une façon de chanter, un son récurrent)",
          "Dans le contexte sénégalais, le mélange wolof/français/anglais est très valorisé — mais dans des proportions cohérentes avec ton positionnement",
          "Chaque sortie doit renforcer l'identité globale, pas la brouiller",
        ]} />
      </ContentPage>

      {/* ── P10 CH2 OPENER ── */}
      <ChapterPage
        num={2}
        title="La distribution musicale depuis le Sénégal"
        hook="Avoir une belle musique ne suffit pas. Sans distribution, ta musique n'existe pas sur les plateformes où ton public t'attend — et tes royalties dorment dans des comptes que tu ne contrôles pas."
        accent={ACC}
        pageNum={10}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P11 CH2 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 02 — Distribution" accent={ACC} pageNum={11} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'écosystème de streaming en Afrique de l'Ouest</SH2>
        <MiniTable
          color={ACC}
          headers={["Plateforme", "Importance AU", "Public cible"]}
          rows={[
            ["YouTube", "★★★★★ Priorité absolue", "Tous âges, diaspora"],
            ["Boomplay", "★★★★★ Ton arme secrète", "Afrique de l'Ouest, 18-35 ans"],
            ["Audiomack", "★★★★☆", "Afrique, USA, diaspora"],
            ["TikTok", "★★★★☆", "16-28 ans, très viral"],
            ["Spotify", "★★★☆☆", "Diaspora, marché international"],
            ["Apple Music", "★★★☆☆", "Diaspora, marché premium"],
            ["Deezer", "★★☆☆☆", "Présence utile mais moindre"],
          ]}
        />
        <Divider color={ACC} />
        <SH3 color={ACC}>Pourquoi YouTube est ta priorité absolue</SH3>
        <BulletList color={ACC} items={[
          { text: "Fonctionne même avec une connexion limitée via YouTube Lite" },
          { text: "L'algorithme récompense les artistes africains qui créent du contenu régulier en langue locale" },
          { bold: "Condition clé :", text: "1 000 abonnés + 4 000 heures de visionnage pour monétiser → commence dès aujourd'hui" },
        ]} />
        <Callout color={SEC} title="Le cas Boomplay" text="Boomplay est détenu par Transsion Holdings (fabricants des téléphones Tecno, Itel, Infinix — les plus vendus en Afrique). L'application est préinstallée sur des dizaines de millions de téléphones africains. Un artiste sénégalais bien présent sur Boomplay touche automatiquement une audience massive que Spotify ne peut pas atteindre." />
      </ContentPage>

      {/* ── P12 CH2 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 02 — Distribution" accent={ACC} pageNum={12} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Choisir ton distributeur numérique</SH2>
        <MiniTable
          color={ACC}
          headers={["Distributeur", "Coût", "Avantage clé"]}
          rows={[
            ["DistroKid ✓ Recommandé", "~20$/an", "150+ plateformes, 100% royalties, rapide"],
            ["TuneCore", "15-30$ / single", "Interface simple pour débuter"],
            ["Amuse", "Gratuit (base)", "Bien pour commencer, upgrade payant"],
            ["CD Baby", "9.95$ / single", "Paiement unique, pas d'abonnement"],
            ["Africori", "Sur devis", "Spécialisé Afrique, plateformes de niche"],
          ]}
        />
        <Divider color={SEC} />
        <SH2 color={DARK}>Récupérer tes royalties depuis le Sénégal</SH2>
        <Body>C'est le sujet dont personne ne parle, mais c'est le plus important. La majorité des distributeurs paient via PayPal ou virement international.</Body>
        <SH3 color={SEC}>Solutions recommandées</SH3>
        <BulletList color={SEC} items={[
          { bold: "Payoneer (n°1 recommandé) :", text: "Crée un compte, reçois tes royalties en dollars ou euros, retire en CFA via Ecobank ou virement local. Inscription gratuite sur payoneer.com" },
          { bold: "PayPal :", text: "Fonctionne au Sénégal mais avec des restrictions sur les retraits" },
          { bold: "Ecobank :", text: "Offre des comptes en devises étrangères — très utile pour les artistes qui reçoivent des paiements réguliers" },
          { bold: "Wave Business :", text: "Reçois via Payoneer et transfère ensuite sur Wave" },
        ]} />
        <Callout color={ACC} title="Démarche pratique" text="1. Ouvre un compte Payoneer (gratuit, 5 minutes)  2. Configure ton distributeur pour payer sur Payoneer  3. Retire sur ton compte Wave ou bancaire local" />
      </ContentPage>

      {/* ── P13 CH2 CONTENT 3 ── */}
      <ContentPage chapter="Chapitre 02 — Distribution" accent={ACC} pageNum={13} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Sortir un single : le planning optimal</SH2>
        <Body>Une mauvaise sortie musicale est pire que de ne rien sortir. Voici le calendrier stratégique :</Body>
        <div style={{ margin: "10px 0" }}>
          {[
            { time: "8 semaines avant", color: DARK, items: ["Finaliser le mastering (15 000–50 000 FCFA)", "Préparer visuels (cover art, photos, teaser)", "Choisir la date (évite vendredis saints, ramadan si public majoritairement musulman)", "Soumettre au distributeur (min. 7 jours avant, idéalement 3-4 semaines)"] },
            { time: "4 semaines avant", color: ACC, items: ["Teaser sur stories Instagram et TikTok", "Envoi aux blogueurs et médias musicaux sénégalais", "Contacter les DJ radio locaux (RFM, 7FM, ZIK FM)", "Préparer le pitch de l'histoire du morceau"] },
            { time: "Semaine de la sortie", color: SEC, items: ["Sortir le vendredi (jour standard sur les plateformes)", "Live Instagram ou TikTok le jour de la sortie", "Partage intensif sur WhatsApp statuts + groupes", "Inciter les fans à ajouter à leurs playlists Boomplay/Spotify"] },
            { time: "2 semaines après", color: GOLD, items: ["Clip officiel ou lyric video", "Contenu behind-the-scenes", "Réengagement via TikTok challenges"] },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
              <div style={{ width: "90px", flexShrink: 0, padding: "6px 8px", borderRadius: "6px", background: `${step.color}12`, border: `1px solid ${step.color}25`, textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: step.color, margin: 0, lineHeight: 1.3 }}>{step.time}</p>
              </div>
              <div style={{ flex: 1 }}>
                {step.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "3px" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: step.color, marginTop: "5px", flexShrink: 0 }} />
                    <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.55 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P14 CH3 OPENER ── */}
      <ChapterPage
        num={3}
        title="Maîtriser les réseaux sociaux"
        hook="Au Sénégal, les réseaux sociaux ne sont pas seulement des outils de communication — ce sont les scènes où les artistes émergents se font découvrir chaque jour."
        accent={SEC}
        pageNum={14}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P15 CH3 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 03 — Réseaux sociaux" accent={SEC} pageNum={15} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le paysage des réseaux sociaux au Sénégal (2025)</SH2>
        <MiniTable
          color={SEC}
          headers={["Réseau", "Utilisateurs SN", "Cible principale"]}
          rows={[
            ["Facebook", "4,5 millions", "30-50 ans, diaspora, familles"],
            ["YouTube", "3+ millions", "Tous âges — la plus regardée"],
            ["Instagram", "2 millions", "18-35 ans, urbains, Dakar"],
            ["TikTok", "1,5+ millions", "15-28 ans, très viral, rural aussi"],
            ["WhatsApp", "Quasi universel", "Outil de diffusion massive"],
            ["Twitter/X", "Petite communauté", "Influents : journalistes, intellectuels"],
          ]}
        />
        <Divider color={SEC} />
        <SH3 color={SEC}>TikTok : ton accélérateur de carrière</SH3>
        <Body>TikTok est aujourd'hui le réseau qui a le plus fort pouvoir de faire percer un artiste inconnu au Sénégal. Fréquence recommandée : <strong>5 à 7 publications par semaine au démarrage.</strong></Body>
        <SH3 color={ACC}>Types de contenus qui fonctionnent</SH3>
        <BulletList color={SEC} items={[
          { bold: "Le making-of vocal :", text: "filme-toi en studio, hook accrocheur en légende" },
          { bold: "Le challenge :", text: "crée un défi basé sur ton morceau (danse simple, geste, paroles à reproduire)" },
          { bold: "L'authenticité locale :", text: "lieux reconnaissables sénégalais — mosquée de Touba, plage de Yoff, Sandaga — attire la diaspora" },
          { bold: "Le freestyle surprise :", text: "30-60 secondes d'improvisation dans un lieu public" },
          { bold: "Le duo :", text: "invite d'autres artistes sénégalais à faire des duets TikTok" },
          { bold: "L'émotion brute :", text: "performances acoustiques sans filtre — très fort sur TikTok" },
        ]} />
        <Callout color="#DC2626" title="Erreurs à éviter sur TikTok" text="Contenus trop produits qui semblent forcés · Ignorer les sons tendance · Ne pas répondre aux commentaires · Publier moins de 3 fois par semaine au début" />
      </ContentPage>

      {/* ── P16 CH3 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 03 — Réseaux sociaux" accent={SEC} pageNum={16} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Instagram : ton portfolio professionnel</SH2>
        <Body>Sur Instagram, on ne cherche pas la viralité mais la <strong>crédibilité et l'attractivité</strong>. C'est ta vitrine permanente.</Body>
        <MiniTable
          color={SEC}
          headers={["Format", "Portée", "Fréquence recommandée"]}
          rows={[
            ["Reels 30-60s", "★★★★★", "4-5× / semaine"],
            ["Stories", "★★★☆☆", "Quotidien"],
            ["Lives", "★★★★☆", "1× / semaine"],
            ["Posts photo", "★★★☆☆", "2-3× / semaine"],
            ["Carrousels", "★★★☆☆", "1-2× / semaine"],
          ]}
        />
        <Callout color={SEC} title="Contenu qui engage la communauté sénégalaise" text="Références culturelles locales dans les légendes (proverbes wolof, quartiers) · Collaborations entre artistes · Moments de foi partagés avec sincérité (Gamou, Touba) · Stories de 'journée type' en studio" />
        <Divider color={ACC} />
        <SH2 color={DARK}>WhatsApp : l'arme sous-estimée</SH2>
        <Body>Au Sénégal, WhatsApp n'est pas juste une messagerie — c'est un réseau social complet.</Body>
        <BulletList color={ACC} items={[
          { bold: "Statuts :", text: "300 contacts × 40% = 120 personnes touchées gratuitement chaque jour sur tes statuts" },
          { bold: "Broadcast lists :", text: "crée des listes séparées (fans, médias, DJ, organisateurs)" },
          { bold: "Groupes fans :", text: "limites à 250 personnes pour garder l'exclusivité — partage des contenus exclusifs" },
          { bold: "WhatsApp Business :", text: "profil professionnel avec catalogue et réponses automatiques" },
        ]} />
        <Callout color={GOLD} title="YouTube : ta bibliothèque permanente" text="Un clip publié il y a 3 ans continue d'être trouvé. Optimise chaque titre avec le genre + 'Sénégal' + l'année. Ajoute des sous-titres en français et anglais pour toucher la diaspora qui ne comprend pas forcément le wolof." />
      </ContentPage>

      {/* ── P17 CH4 OPENER ── */}
      <ChapterPage
        num={4}
        title="Monétiser ta musique"
        hook="Le streaming seul ne nourrit pas un artiste au Sénégal. La clé est la diversification : huit sources de revenus complémentaires qui ensemble construisent une carrière viable."
        accent={GOLD}
        pageNum={17}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P18 CH4 DARK PAGE — stats streaming ── */}
      <DarkPage title="La réalité des revenus de streaming" accent={GOLD} pageNum={18} total={TOTAL} guideLabel={LABEL}>
        <Body><span style={{ color: "rgba(255,255,255,0.6)", fontFamily: F, fontSize: "10.5px", lineHeight: 1.75 }}>Soyons honnêtes : avec 100 000 streams sur Spotify depuis le Sénégal, tu gagnes entre <strong style={{ color: "#fff" }}>300 et 500 dollars</strong>. Le streaming doit être vu comme un outil de visibilité, pas comme une source de revenus principale à court terme.</span></Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" }}>
          {[
            { platform: "Spotify", rate: "0,003–0,005$", note: "par stream" },
            { platform: "Apple Music", rate: "0,007–0,01$", note: "par stream — meilleur payeur" },
            { platform: "Boomplay", rate: "0,001–0,003$", note: "par stream — volume compense" },
            { platform: "YouTube", rate: "0,001–0,003$", note: "par vue (via YouTube Partner)" },
            { platform: "Audiomack", rate: "Variable", note: "selon le pays d'écoute" },
          ].map((p) => (
            <div key={p.platform} style={{ padding: "12px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>{p.platform}</p>
              <p style={{ fontFamily: FD, fontSize: "20px", fontWeight: 700, color: GOLD, margin: "0 0 2px" }}>{p.rate}</p>
              <p style={{ fontFamily: F, fontSize: "8.5px", color: "rgba(255,255,255,0.3)", margin: 0 }}>{p.note}</p>
            </div>
          ))}
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${GOLD}12`, border: `1px solid ${GOLD}30` }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: GOLD, margin: "0 0 4px" }}>Objectif réaliste</p>
            <p style={{ fontFamily: FD, fontSize: "20px", fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>10M streams</p>
            <p style={{ fontFamily: F, fontSize: "8.5px", color: "rgba(255,255,255,0.3)", margin: 0 }}>cumulés sur 3 ans = 30K–50K$</p>
          </div>
        </div>
        <p style={{ fontFamily: F, fontSize: "10px", color: "rgba(255,255,255,0.35)", fontStyle: "italic", margin: "8px 0 0", lineHeight: 1.65 }}>
          La bonne nouvelle : des artistes sénégalais bien positionnés peuvent être boostés par des playlists institutionnelles africaines — les streams africains coûtent moins en publicité aux labels.
        </p>
      </DarkPage>

      {/* ── P19 CH4 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 04 — Monétisation" accent={GOLD} pageNum={19} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 8 sources de revenus d'un artiste complet</SH2>
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Source 1 — Prestations live (la plus rentable à court terme)</SH3>
        <MiniTable
          color={GOLD}
          headers={["Type d'événement", "Tarif indicatif"]}
          rows={[
            ["Mariage / cérémonie familiale", "300 000 à 3 000 000 FCFA"],
            ["Soirée de club", "100 000 à 500 000 FCFA"],
            ["Festival national", "500 000 à 5 000 000 FCFA"],
            ["Corporate event (entreprises)", "500 000 à 2 000 000 FCFA"],
          ]}
        />
        <Callout color={GOLD} title="Stratégie live pour démarrer" text="Commence par les événements de quartier et les festivals locaux. Chaque prestation = nouvelles connexions + vidéos pour les réseaux sociaux." />
        <SH3 color={ACC}>Source 2 — Droits BSDA (souvent ignorés)</SH3>
        <Body>Le Bureau Sénégalais du Droit d'Auteur collecte des droits chaque fois que ta musique est diffusée à la radio, en boîte de nuit, dans un hôtel, un restaurant, un transport public. La plupart des artistes ne les récupèrent jamais car ils ne sont pas inscrits.</Body>
        <BulletList color={ACC} items={[
          { bold: "Adresse BSDA :", text: "Avenue El Hadj Malick Sy, Dakar" },
          { bold: "Coût :", text: "Gratuit pour les artistes" },
          { bold: "Délai :", text: "4 à 8 semaines — commence maintenant" },
        ]} />
        <SH3 color={SEC}>Source 3 — Placements publicitaires (sync licensing)</SH3>
        <Body>Des entreprises sénégalaises (télécoms, banques, FMCG) cherchent de la musique locale pour leurs publicités. Jingle radio : 200K–500K FCFA · Spot TV : 500K–2M FCFA.</Body>
      </ContentPage>

      {/* ── P20 CH4 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 04 — Monétisation" accent={GOLD} pageNum={20} total={TOTAL} guideLabel={LABEL}>
        <SH3 color={GOLD}>Source 4 — Merchandising</SH3>
        <Body>T-shirts, casquettes, posters... Ce marché est sous-exploité au Sénégal. Pour démarrer sans stock : utilise Printful (print-on-demand) pour la diaspora. Pour le Sénégal local : propose en précommande seulement, vends lors des concerts.</Body>
        <SH3 color={ACC}>Source 5 — Collaborations rémunérées</SH3>
        <MiniTable
          color={ACC}
          headers={["Type de collaboration", "Tarif indicatif"]}
          rows={[
            ["Featuring (artiste à artiste)", "100 000 à 500 000 FCFA"],
            ["Écriture de texte (ghostwriting)", "50 000 à 200 000 FCFA"],
            ["Direction vocale pour album", "200 000 à 500 000 FCFA"],
          ]}
        />
        <Divider color={SEC} />
        <SH3 color={SEC}>Source 6 — Partenariats marques / influence</SH3>
        <Body>Avec 10 000+ abonnés engagés sur Instagram ou TikTok, tu peux commencer des placements de produit rémunérés.</Body>
        <MiniTable
          color={SEC}
          headers={["Audience Instagram", "Tarif par post"]}
          rows={[
            ["5 000 – 10 000 abonnés", "25 000 à 75 000 FCFA"],
            ["10 000 – 50 000 abonnés", "75 000 à 200 000 FCFA"],
            ["50 000 – 100 000 abonnés", "200 000 à 500 000 FCFA"],
          ]}
        />
        <SH3 color={GOLD}>Source 7 — Streaming (long terme)</SH3>
        <Body>Travaille sur l'accumulation de streams. 1 million de streams = ~3 000 à 5 000$. Vise 10 millions de streams cumulés sur 3 ans comme objectif de carrière.</Body>
        <SH3 color={ACC}>Source 8 — Coaching et formation</SH3>
        <Body>Si tu as 5 ans d'expérience : cours de chant, de production, de beatmaking, de management pour jeunes artistes. Une source de revenus stable et valorisante.</Body>
      </ContentPage>

      {/* ── P21 CH5 OPENER ── */}
      <ChapterPage
        num={5}
        title="Tes droits, ta protection, le BSDA"
        hook="Ta musique t'appartient dès le moment où tu la crées. Mais sans formalisation, il est très difficile de prouver ta propriété en cas de litige — et les litiges dans le milieu musical sénégalais sont fréquents."
        accent={ACC}
        pageNum={21}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P22 CH5 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 05 — Droits & Protection" accent={ACC} pageNum={22} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les deux types de droits musicaux</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0 14px" }}>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${ACC}08`, border: `1px solid ${ACC}20` }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: ACC, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Droits d'auteur</p>
            <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>Appartiennent à celui qui a <strong>écrit les paroles</strong> et/ou <strong>composé la mélodie</strong>. Protégés par le BSDA.</p>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: "8px", background: `${SEC}08`, border: `1px solid ${SEC}20` }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: SEC, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Droits voisins</p>
            <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.6 }}>Appartiennent à l'<strong>interprète principal</strong> et au <strong>producteur du master</strong>. Couvrent l'enregistrement.</p>
          </div>
        </div>
        <SH2 color={DARK}>S'inscrire au BSDA : mode d'emploi complet</SH2>
        <Body>Le Bureau Sénégalais du Droit d'Auteur enregistre tes œuvres, collecte les droits de diffusion publique, et redistribue ces droits aux ayants droit inscrits.</Body>
        <SH3 color={ACC}>Documents nécessaires</SH3>
        <BulletList color={ACC} items={[
          { text: "Copie de ta pièce d'identité (CNIE ou passeport)" },
          { text: "Bulletin d'adhésion (disponible au BSDA ou en ligne)" },
          { text: "Liste de tes œuvres (titre, date de création, co-auteurs éventuels)" },
          { text: "Enregistrements audio de tes morceaux (non obligatoire mais fortement conseillé)" },
        ]} />
        <SH3 color={ACC}>Contacts BSDA</SH3>
        <Body><strong>Adresse :</strong> Avenue El Hadj Malick Sy × Rue Carnot, Dakar · <strong>Site :</strong> bsda.sn · <strong>Horaires :</strong> Lun-Ven, 8h-17h</Body>
        <Callout color={GOLD} title="Astuce protection" text="Envoie-toi un email contenant l'enregistrement de ta musique EN PIÈCE JOINTE avant de la partager. La date d'envoi constitue une preuve de date de création en cas de litige." />
      </ContentPage>

      {/* ── P23 CH5 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 05 — Droits & Protection" accent={ACC} pageNum={23} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les contrats dans le milieu musical sénégalais</SH2>
        <Body>Le milieu musical sénégalais est caractérisé par des relations souvent informelles basées sur la confiance. C'est une richesse culturelle, mais aussi une source de conflits nombreux.</Body>
        <SH3 color={ACC}>Situations qui nécessitent un contrat écrit</SH3>
        <NumberedList color={ACC} items={[
          "Featuring : qui possède le master, qui récupère les royalties de streaming",
          "Collaboration avec un producteur de beat : droits exclusifs ou non-exclusifs ? Pour combien de temps ?",
          "Contrat avec un label ou une agence : durée, exclusivité, partage des revenus, propriété du master",
          "Prestation de service (concert) : montant, acompte, conditions d'annulation, droits d'image",
          "Session studio : qui possède les fichiers stems et le master",
        ]} />
        <Divider color={SEC} />
        <SH3 color={SEC}>Ce qu'un contrat artiste-label ne devrait JAMAIS contenir</SH3>
        <BulletList color="#DC2626" items={[
          { text: "Une durée supérieure à 3 ans sans clause de révision" },
          { text: "Une clause de propriété perpétuelle sur tes masters" },
          { text: "Un partage inférieur à 50/50 sur les revenus sans investissement justifié" },
          { text: "Une exclusivité totale sans garantie minimum de sortie" },
        ]} />
        <Callout color={ACC} title="Appui juridique à Dakar" text="Barreau de Dakar (avocats spécialisés en propriété intellectuelle) · ASEPEX pour les artistes qui exportent · OAPI (Organisation Africaine de la Propriété Intellectuelle) pour la protection dans les 17 États membres" />
      </ContentPage>

      {/* ── P24 CH6 OPENER ── */}
      <ChapterPage
        num={6}
        title="Live, festivals, networking et industrie"
        hook="La scène musicale sénégalaise a ses codes, ses acteurs clés et ses portes d'entrée. Les connaître, c'est gagner des années sur ta carrière."
        accent={SEC}
        pageNum={24}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P25 CH6 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 06 — Live & Networking" accent={SEC} pageNum={25} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les festivals et événements incontournables</SH2>
        <MiniTable
          color={SEC}
          headers={["Festival", "Période", "Comment s'y produire"]}
          rows={[
            ["Saint-Louis Jazz Festival", "Mai", "Candidature officielle, contacts organisateurs"],
            ["Dakar Jazz Festival", "Variable", "Candidature via site web"],
            ["FESMAG (Arts nègres)", "Annuel", "Via ministère de la Culture"],
            ["Festivent (Saint-Louis)", "Décembre", "Candidature locale"],
            ["Soirées Teranga", "Variable", "Scènes émergentes accessibles"],
            ["Les soirées KFM", "Mensuel", "Contact direct, urban/Afrobeats"],
          ]}
        />
        <Divider color={SEC} />
        <SH3 color={SEC}>Scènes à cibler pour les artistes émergents</SH3>
        <BulletList color={SEC} items={[
          { bold: "Institut Français de Dakar :", text: "organise des soirées régulières — ouvert aux artistes émergents" },
          { bold: "Plages de Yoff et Ngor :", text: "performances non officielles qui génèrent beaucoup de contenu vidéo" },
          { bold: "Rooftops et restaurants du Plateau / Almadies :", text: "ambiance premium, audience aisée" },
          { bold: "Événements corporate :", text: "demande moins de notoriété préalable et paye très bien" },
          { bold: "Mairies et associations locales :", text: "entrée facile, utile pour constituer un portfolio de prestations" },
        ]} />
      </ContentPage>

      {/* ── P26 CH6 CONTENT 2 ── */}
      <ContentPage chapter="Chapitre 06 — Live & Networking" accent={SEC} pageNum={26} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les acteurs clés : médias et DJ pivots</SH2>
        <SH3 color={SEC}>Médias radio à cibler</SH3>
        <BulletList color={SEC} items={[
          { bold: "RFM (Radio Futurs Médias) :", text: "la plus écoutée, très important pour le mbalax et l'afrobeats local" },
          { bold: "7FM :", text: "urban, jeune, très important pour le rap et l'afrotrap sénégalais" },
          { bold: "ZIK FM :", text: "urban et dancefloor, audience 20-35 ans" },
          { bold: "Dakar FM :", text: "généraliste, audience large" },
          { bold: "Walf FM :", text: "audience populaire et diaspora" },
        ]} />
        <SH3 color={ACC}>Médias en ligne</SH3>
        <BulletList color={ACC} items={[
          { bold: "TRFM Music :", text: "chaîne YouTube musicale sénégalaise très suivie" },
          { bold: "Pulse Sénégal :", text: "jeune public urbain — bon pour les artistes afrobeats/urban" },
          { bold: "Seneweb / Senego culture :", text: "couverture culturelle large, audience diaspora" },
          { bold: "Teranga Live :", text: "concerts et interviews en streaming" },
        ]} />
        <Callout color={SEC} title="Les DJ pivots : leur pouvoir est énorme" text="Les DJ de radio sénégalais peuvent changer une carrière. Un morceau bien reçu par DJ Alioune de RFM ou par les animateurs de 7FM = explosion. Approche-les professionnellement (pas comme un ami) avec un dossier de presse propre et un fichier audio haute qualité." />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Ton dossier de presse : l'outil indispensable</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Biographie :", text: "courte (150 mots) et longue (400 mots) en français" },
          { bold: "Photo presse :", text: "minimum 3MB, format paysage ET portrait" },
          { bold: "Liens streaming :", text: "Boomplay, Spotify, YouTube sur une même page" },
          { bold: "3-5 citations presse :", text: "si tu en as déjà — sinon, cite des avis influents" },
          { bold: "Format :", text: "PDF + page web (LinkTree ou site personnel)" },
        ]} />
      </ContentPage>

      {/* ── P27 CH7 OPENER ── */}
      <ChapterPage
        num={7}
        title="Travailler avec des professionnels"
        hook="Seul, tu avances. Bien entouré, tu décolles. Choisir les bons professionnels — manager, agence, beatmakers — est l'une des décisions les plus importantes de ta carrière."
        accent={ACC}
        pageNum={27}
        total={TOTAL}
        guideLabel={LABEL}
      />

      {/* ── P28 CH7 CONTENT 1 ── */}
      <ContentPage chapter="Chapitre 07 — Professionnels" accent={ACC} pageNum={28} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Quand as-tu besoin d'un manager ?</SH2>
        <Body>Tu as besoin d'un manager quand : tu reçois plus de sollicitations que tu peux en gérer seul, tu n'as plus le temps de produire ET gérer ta carrière, des opportunités importantes te passent sous le nez.</Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0 12px" }}>
          <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#16A34A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Un bon manager</p>
            <BulletList color="#16A34A" items={[
              { text: "Négocie les cachets concerts" },
              { text: "Gère relations médias et booking" },
              { text: "S'assure que tes droits BSDA sont collectés" },
              { text: "Te protège des mauvaises offres" },
            ]} />
          </div>
          <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA" }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#DC2626", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Un mauvais manager</p>
            <BulletList color="#DC2626" items={[
              { text: "Prend une commission sans apport" },
              { text: "Signe des contrats sans te les faire lire" },
              { text: "Garde l'argent des cachets" },
              { text: "Aucune reddition de comptes" },
            ]} />
          </div>
        </div>
        <Callout color={GOLD} title="Commission standard au Sénégal" text="15 à 20% sur les revenus qu'il génère — pas sur TOUS tes revenus. Si un manager réclame une commission sur des revenus qu'il n'a pas générés, c'est un signal d'alarme." />
        <Divider color={SEC} />
        <SH2 color={DARK}>La production musicale : beatmakers et studios</SH2>
        <BulletList color={ACC} items={[
          { bold: "Prix d'un beat professionnel :", text: "25 000 à 150 000 FCFA selon le producteur" },
          { bold: "Beat non-exclusif :", text: "d'autres artistes peuvent l'utiliser — évite pour des morceaux importants" },
          { bold: "Studios Dakar :", text: "Studio Mame Diarra (mbalax), plusieurs options 15K-50K FCFA/heure au Plateau et Almadies" },
          { bold: "Studios home :", text: "moins cher, qualité variable — exige un test avant de payer" },
        ]} />
      </ContentPage>

      {/* ── P29 RESOURCES + PLAN ── */}
      <ContentPage chapter="Ressources & Plan d'action" accent={ACC} pageNum={29} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Ressources essentielles</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 14px" }}>
          {[
            { cat: "Droits & légal", color: ACC, items: ["bsda.sn — BSDA Dakar", "oapi.int — OAPI (17 États)"] },
            { cat: "Distribution", color: SEC, items: ["distrokid.com ✓ Recommandé", "artists.boomplay.com", "audiomack.com/artists"] },
            { cat: "Paiements", color: GOLD, items: ["payoneer.com — Royalties", "ecobank.com — Compte devises"] },
            { cat: "Création contenu", color: "#10B981", items: ["canva.com — Visuels", "capcut.com — Montage mobile"] },
          ].map((r) => (
            <div key={r.cat} style={{ padding: "10px 12px", borderRadius: "8px", background: `${r.color}08`, border: `1px solid ${r.color}20` }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: r.color, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 5px" }}>{r.cat}</p>
              {r.items.map((item, i) => (
                <p key={i} style={{ fontFamily: F, fontSize: "9px", color: "#2A2520", margin: "0 0 2px", lineHeight: 1.5 }}>→ {item}</p>
              ))}
            </div>
          ))}
        </div>
        <Divider color={GOLD} />
        <SH2 color={DARK}>Plan d'action 90 jours</SH2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {[
            { month: "Mois 1", color: ACC, label: "Fondations", items: ["Définir ton genre + les 5 questions fondamentales", "Confirmer ton nom d'artiste", "Optimiser profils Instagram, TikTok, YouTube", "Ouvrir Payoneer + s'inscrire au BSDA", "Choisir DistroKid comme distributeur"] },
            { month: "Mois 2", color: SEC, label: "Présence", items: ["Publier quotidiennement sur TikTok (7j/7)", "4 publications par semaine sur Instagram", "1 live par semaine", "Sortir 1 single via distributeur", "Contacter 5 médias musicaux avec dossier de presse"] },
            { month: "Mois 3", color: GOLD, label: "Monétisation", items: ["Identifier 3 organisateurs pour prestations", "Créer ta liste de prix officiels", "Analyser les stats streaming", "Faire le bilan chiffré", "Définir le plan 6 mois suivants"] },
          ].map((m) => (
            <div key={m.month} style={{ padding: "10px 12px", borderRadius: "8px", background: `${m.color}08`, border: `1px solid ${m.color}25` }}>
              <p style={{ fontFamily: FD, fontSize: "15px", fontWeight: 700, color: m.color, margin: "0 0 2px" }}>{m.month}</p>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: m.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>{m.label}</p>
              {m.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "5px", marginBottom: "4px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", border: `1px solid ${m.color}50`, flexShrink: 0, marginTop: "1px" }} />
                  <p style={{ fontFamily: F, fontSize: "8.5px", color: "#2A2520", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ContentPage>

      {/* ── P30 CLOSING ── */}
      <ClosingPage
        title="Ta carrière commence"
        titleHighlight="maintenant"
        accent={ACC}
        pageNum={30}
        total={TOTAL}
        guideLabel={LABEL}
      />
    </EbookViewerShell>
  );
}
