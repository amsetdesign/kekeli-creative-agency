"use client";

import {
  F, FD, DARK, CREAM, GOLD,
  CoverPage, ChapterPage, ContentPage, DarkPage,
  TOCPage, QuotePage, ClosingPage, EbookViewerShell,
  SH2, SH3, Body, BulletList, NumberedList,
  Callout, MiniTable, Divider,
  CaseStudy, ToolCard, StatRow, ScreenMock, ArtistCard,
  ProcessLine, Checklist, Testimony, BudgetTable,
  PhoneShowcase, BarChart, InfoGrid, BigQuote, TwoColumnText, Banner, VerticalTimeline,
} from "./EbookLayout";

const ACC = "#8B5CF6";
const SEC = "#EC4899";
const GRN = "#10B981";
const BLU = "#3B82F6";
const AMB = "#F59E0B";
const LABEL = "Du Talent au Sommet — Le Guide de l'Artiste Africain Pro · 2026";
const TOTAL = 270;

/* ── Helpers réutilisables ── */
function TwoCol({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "8px 0" }}>
      {left}{right}
    </div>
  );
}
function GreenBox({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0" }}>{children}</div>;
}
function RedBox({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA" }}>{children}</div>;
}
function BoxLabel({ color, text }: { color: string; text: string }) {
  return <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>{text}</p>;
}
function StepBox({ num, title, desc, color }: { num: string; title: string; desc: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", margin: "6px 0", padding: "8px 10px", borderRadius: "8px", background: `${color}08`, border: `1px solid ${color}20` }}>
      <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#fff" }}>{num}</span>
      </div>
      <div>
        <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{title}</p>
        <p style={{ fontFamily: F, fontSize: "9.5px", color: "#44403C", margin: 0, lineHeight: 1.55 }}>{desc}</p>
      </div>
    </div>
  );
}
function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "99px", background: `${color}15`, border: `1px solid ${color}30`, fontFamily: F, fontSize: "9px", fontWeight: 700, color, marginRight: "5px" }}>
      {text}
    </span>
  );
}

export default function EbookArtisteViewer() {
  return (
    <EbookViewerShell
      title="Du Talent au Sommet"
      subtitle="Le Guide de l'Artiste Africain Pro — De la passion à la carrière professionnelle"
      pageCount={TOTAL}
      accentColor={ACC}
    >

      {/* ══════════════════════════════════════════════════ */}
      {/* P1 — COVER                                        */}
      {/* ══════════════════════════════════════════════════ */}
      <CoverPage
        accent={ACC}
        title="Du Talent"
        titleHighlight="au Sommet"
        subtitle="Le guide de l'Artiste Africain Pro — De la passion brute à la carrière professionnelle. Branding, distribution, réseaux sociaux, booking, droits, monétisation & ascension."
        badge="Édition 2026 · KEKELI Creative Agency · Dakar, Sénégal"
        guideLabel={LABEL}
        chips={[
          { label: "Mindset Pro", color: ACC },
          { label: "Branding & Direction Artistique", color: SEC },
          { label: "Distribution & Droits", color: BLU },
          { label: "TikTok · Instagram · YouTube", color: SEC },
          { label: "Booking & Festivals", color: AMB },
          { label: "Monétisation 1M FCFA/mois", color: GRN },
          { label: "Équipe & Contrats Pro", color: GOLD },
        ]}
        stats={[
          { value: "210+", label: "pages" },
          { value: "31", label: "modules Pro" },
          { value: "80+", label: "outils pratiques" },
          { value: "5 ans", label: "plan de carrière" },
        ]}
      />

      {/* ══════════════════════════════════════════════════ */}
      {/* P2 — PAGE LÉGALE / COPYRIGHT                      */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="ebook-page" style={{
        width: "210mm", minHeight: "297mm", background: CREAM,
        display: "flex", flexDirection: "column", pageBreakAfter: "always",
        padding: "48px 52px", position: "relative", overflow: "hidden",
      }}>
        {/* Filigrane K */}
        <span aria-hidden style={{ position: "absolute", bottom: "-20px", right: "-10px", fontFamily: FD, fontSize: "200px", fontWeight: 700, color: `${ACC}07`, lineHeight: 1, userSelect: "none" }}>K</span>

        {/* Titre */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: ACC, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>Informations légales</p>
            <p style={{ fontFamily: FD, fontSize: "22px", fontWeight: 700, color: DARK, margin: "0 0 4px" }}>Du Talent au Sommet</p>
            <p style={{ fontFamily: F, fontSize: "12px", color: "#78716C", margin: "0 0 24px" }}>Le Guide de l'Artiste Africain Pro</p>
            <div style={{ width: "36px", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "0 0 24px" }} />

            {/* Bloc copyright */}
            <div style={{ padding: "14px 16px", borderRadius: "8px", background: "#F5F0E8", border: "1px solid #E5DFD0", marginBottom: "16px" }}>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: DARK, margin: "0 0 8px" }}>© 2026 Amset — KEKELI Creative Agency</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#6B5B45", lineHeight: 1.65, margin: 0 }}>
                Tous droits réservés. Aucune partie de cet ouvrage ne peut être reproduite, stockée dans un système de récupération, ou transmise sous quelque forme ou par quelque moyen que ce soit — électronique, mécanique, photocopie, enregistrement ou autre — sans l'autorisation écrite préalable de l'auteur et de l'éditeur, sauf dans les cas prévus par la loi sénégalaise sur la propriété intellectuelle.
              </p>
            </div>

            {/* Contacts éditeur */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              {[
                { label: "Auteur", value: "Amset" },
                { label: "Agence créative", value: "KEKELI Creative Agency" },
                { label: "Email", value: "kekelicreativeagency@gmail.com" },
                { label: "WhatsApp", value: "+221 78 167 28 19" },
                { label: "Ville", value: "Dakar, Sénégal" },
                { label: "Édition", value: "Première édition — 2026" },
              ].map((c) => (
                <div key={c.label} style={{ padding: "7px 10px", borderRadius: "6px", background: "#fff", border: "1px solid #E5DFD0" }}>
                  <p style={{ fontFamily: F, fontSize: "7.5px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 2px" }}>{c.label}</p>
                  <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 600, color: DARK, margin: 0 }}>{c.value}</p>
                </div>
              ))}
            </div>

            {/* Avertissement contenu */}
            <p style={{ fontFamily: F, fontSize: "8.5px", color: "#9CA3AF", lineHeight: 1.6, margin: "0 0 8px" }}>
              Les chiffres, tarifs et informations présentés dans cet ouvrage sont donnés à titre indicatif et correspondent à la réalité du marché sénégalais et africain en 2026. Les conditions des plateformes digitales évoluant régulièrement, l'auteur et l'éditeur ne sauraient être tenus responsables de modifications ultérieures.
            </p>
            <p style={{ fontFamily: F, fontSize: "8.5px", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
              Les exemples d'artistes cités dans cet ouvrage sont mentionnés à titre illustratif et éducatif. Les chiffres et faits les concernant proviennent de sources publiquement disponibles.
            </p>
          </div>

          {/* Footer légal */}
          <div style={{ paddingTop: "14px", borderTop: "1px solid #E5DFD0", display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>Du Talent au Sommet · KEKELI Creative Agency · Dakar</p>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>2 / {TOTAL}</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* P3 — DÉDICACE                                     */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="ebook-page" style={{
        width: "210mm", minHeight: "297mm",
        background: "linear-gradient(160deg, #08060F 0%, #1A0A2E 60%, #0D0C0A 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center",
        padding: "60px 52px", pageBreakAfter: "always", position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${GOLD}06 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "380px" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: GOLD, letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 32px" }}>Dédicace</p>
          <div style={{ width: "36px", height: "1px", background: GOLD, margin: "0 auto 32px" }} />

          {/* Dédicace */}
          <p style={{ fontFamily: FD, fontSize: "15px", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.90)", lineHeight: 1.85, margin: "0 0 28px", textAlign: "center" }}>
            À Dieu, celui qui est tout pour moi —<br />
            pour qui je vis et j'avance chaque jour de ma vie.
          </p>
          <div style={{ width: "28px", height: "1px", background: "rgba(200,168,75,0.50)", margin: "0 auto 28px" }} />
          <p style={{ fontFamily: FD, fontSize: "13px", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, margin: "0 0 28px", textAlign: "center" }}>
            À ma femme <strong style={{ color: GOLD, fontStyle: "normal" }}>Anna DeSion</strong>,<br />
            à mon fils <strong style={{ color: GOLD, fontStyle: "normal" }}>Jotham</strong>,<br />
            et à toute ma famille, de près et de loin.
          </p>
          <div style={{ width: "28px", height: "1px", background: "rgba(200,168,75,0.50)", margin: "0 auto 28px" }} />
          <p style={{ fontFamily: FD, fontSize: "13px", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.60)", lineHeight: 1.85, margin: "0 0 28px", textAlign: "center" }}>
            À tous les artistes Gospel Urbain au Sénégal,<br />
            à la communauté <strong style={{ color: GOLD, fontStyle: "normal" }}>Galsen Gospel Urbain</strong>,<br />
            et à tous ceux qui, partout dans le monde,<br />
            vivent pour la musique et savent — avec une conviction profonde —<br />
            qu'un jour ils se retrouveront au sommet.
          </p>
          <div style={{ width: "28px", height: "1px", background: "rgba(200,168,75,0.50)", margin: "0 auto 28px" }} />
          <p style={{ fontFamily: FD, fontSize: "12px", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.45)", lineHeight: 1.85, margin: 0, textAlign: "center" }}>
            Ne baissez jamais les bras.
          </p>

          <div style={{ width: "36px", height: "1px", background: "rgba(200,168,75,0.30)", margin: "0 auto 24px" }} />
          <p style={{ fontFamily: FD, fontSize: "13px", fontStyle: "italic", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            — Amset
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "16px", right: "24px" }}>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.15)", margin: 0 }}>3 / {TOTAL}</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* P4 — PRÉFACE [PLACEHOLDER PERSONNALITÉ EXTERNE]  */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="ebook-page" style={{
        width: "210mm", minHeight: "297mm", background: CREAM,
        display: "flex", pageBreakAfter: "always",
      }}>
        <div style={{ width: "5px", flexShrink: 0, background: `linear-gradient(180deg, ${ACC} 0%, ${ACC}88 100%)` }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 36px", flexShrink: 0, background: DARK, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: ACC, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Préface</p>
          </div>
          <div style={{ flex: 1, padding: "24px 36px 16px" }}>
            <p style={{ fontFamily: FD, fontSize: "24px", fontWeight: 700, color: DARK, margin: "0 0 6px" }}>Préface</p>
            <div style={{ width: "36px", height: "2px", background: `linear-gradient(90deg, ${ACC}, transparent)`, margin: "0 0 20px" }} />

            <Body>Il y a des livres qui arrivent au bon moment. Pas par hasard — par nécessité.</Body>
            <Body>Depuis que nous avons fondé KEKELI Creative Agency à Dakar, nous avons accompagné des dizaines d'artistes sénégalais et africains dans leur parcours. Des artistes au talent indéniable, à la voix puissante, au message profond. Et pourtant, beaucoup d'entre eux butaient sur le même mur invisible : ils ne savaient pas comment transformer ce talent en carrière durable. Ils ne manquaient pas de don. Ils manquaient de méthode.</Body>
            <Body>C'est dans ce contexte que nous avons rencontré Amset. Artiste gospel, fondateur du Galsen Gospel Urbain, promoteur du Sunu Impact Festival — Amset n'est pas seulement quelqu'un qui chante. C'est quelqu'un qui a compris, souvent à la dure, ce que signifie construire une carrière artistique en Afrique de l'Ouest avec foi, stratégie et persévérance.</Body>
            <Body>Ce livre, il ne l'a pas écrit depuis une position confortable. Il l'a écrit depuis l'intérieur du voyage — avec les cicatrices des doutes, les victoires des premières scènes, et la clarté que seule l'expérience vraie peut donner. Chaque module de ce guide est une leçon que lui-même a vécue, testée ou observée sur le terrain dakarois et africain.</Body>
            <Callout color={ACC} title="Pourquoi ce guide est différent" text="Il ne parle pas de la musique depuis un bureau parisien ou new-yorkais. Il parle de la réalité de l'artiste africain — les plateformes de streaming depuis Dakar, les droits BSDA, la distribution sur Boomplay, les cachets en FCFA, les concerts à Thiès ou à Abidjan. C'est un guide fait ici, pour ici, par quelqu'un d'ici." />
            <Body>L'industrie musicale africaine est en train de vivre sa révolution. TikTok a créé des stars du jour au lendemain. Boomplay compte plus de 100 millions d'utilisateurs actifs. Les artistes africains dominent les charts mondiaux. Mais derrière chaque success story visible, il y a des centaines d'artistes qui cherchent encore leur chemin — sans carte, sans boussole, sans mentor.</Body>
            <Body><strong>Du Talent au Sommet</strong> est cette carte. Cette boussole. Ce mentor mis en livre.</Body>
            <Body>Chez KEKELI Creative Agency, nous croyons que l'Afrique a suffisamment de talent pour dominer la scène musicale mondiale. Ce qui manque, ce n'est pas le don — c'est l'accès à la connaissance stratégique. Ce guide comble ce manque avec générosité, précision et authenticité.</Body>
            <Body>À toi qui lis ces lignes : tu tiens entre les mains plus qu'un livre. Tu tiens une feuille de route vers la carrière que tu mérites. Applique chaque module. Reviens-y. Partage-le. Et rappelle-toi que le sommet n'est pas réservé à ceux qui ont le plus de chance — il appartient à ceux qui ont la vision, la stratégie, et la foi pour y monter.</Body>

            {/* Signature */}
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #E5DFD0" }}>
              <p style={{ fontFamily: FD, fontSize: "14px", fontStyle: "italic", color: DARK, margin: "0 0 3px" }}>Avec fierté et conviction,</p>
              <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 700, color: ACC, margin: "0 0 2px" }}>KEKELI Creative Agency</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#78716C", margin: 0 }}>Agence de communication créative · Dakar, Sénégal · 2026</p>
            </div>
          </div>
          <div style={{ padding: "10px 36px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E5E1DC" }}>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>KEKELI Creative Agency — {LABEL}</p>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>4 / {TOTAL}</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* P5 — MOT DE L'AUTEUR (Amset — Avant-Propos)      */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="ebook-page" style={{
        width: "210mm", minHeight: "297mm", background: CREAM,
        display: "flex", pageBreakAfter: "always",
      }}>
        <div style={{ width: "5px", flexShrink: 0, background: `linear-gradient(180deg, ${GOLD} 0%, ${GOLD}88 100%)` }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 36px", flexShrink: 0, background: DARK, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Avant-Propos — Mot de l'Auteur</p>
          </div>
          <div style={{ flex: 1, padding: "24px 36px 16px" }}>
            <p style={{ fontFamily: FD, fontSize: "24px", fontWeight: 700, color: DARK, margin: "0 0 4px" }}>Avant-Propos</p>
            <p style={{ fontFamily: F, fontSize: "11px", color: "#78716C", margin: "0 0 16px" }}>Par Amset — Artiste Gospel Pro, Dakar</p>
            <div style={{ width: "36px", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "0 0 18px" }} />

            <Body>J'ai écrit ce livre parce que j'aurais voulu l'avoir.</Body>
            <Body>Quand j'ai commencé ma carrière artistique à Dakar, je débordais de passion mais je manquais de repères. Personne ne m'avait expliqué comment protéger mes droits d'auteur. Personne ne m'avait dit qu'un logo professionnel pouvait changer la perception que les gens ont de ta musique. Personne ne m'avait appris à pitcher mon projet à un organisateur de concert, à négocier un cachet, à utiliser TikTok comme outil de carrière et non comme simple divertissement.</Body>
            <Body>J'ai appris tout ça à la dure — par les erreurs, par les portes fermées, par les contrats mal lus, par les opportunités manquées faute de savoir. Et c'est exactement pour ça que j'ai décidé d'écrire <strong>Du Talent au Sommet</strong>.</Body>
            <Body>Ce livre s'adresse à toi, artiste africain — qu'tu sois chanteur gospel, rappeur, artiste afrobeats, musicien traditionnel ou créateur de contenu musical. Si tu as du talent, si tu as un message, si tu as cette conviction profonde que ta musique peut toucher des vies et changer des destins — alors ce guide est fait pour toi.</Body>
            <Callout color={GOLD} title="Ce que ce livre n'est pas" text="Ce n'est pas un livre de théorie écrit depuis un bureau éloigné de ta réalité. C'est un guide pratique, terrain, ancré dans la réalité du marché sénégalais et africain. Chaque conseil ici peut être appliqué dès aujourd'hui, avec les ressources que tu as maintenant." />
            <Body>J'ai fondé le Galsen Gospel Urbain parce que je croyais qu'on pouvait créer une communauté d'artistes qui se soutiennent, qui partagent, qui grandissent ensemble. Ce livre est le prolongement de cette vision — mettre à disposition de chaque artiste les outils qui, jusque-là, n'étaient accessibles qu'à ceux qui avaient les bons contacts ou les bons moyens.</Body>
            <Body>Lis ce guide avec un crayon à la main. Souligne. Note. Applique. Reviens-y dans six mois et mesure ton évolution. Le talent t'a amené jusqu'ici. La stratégie t'amènera au sommet.</Body>
            <Body>Je crois en toi. Maintenant, crois en toi aussi.</Body>
            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #E5DFD0" }}>
              <p style={{ fontFamily: FD, fontSize: "16px", fontStyle: "italic", color: DARK, margin: "0 0 4px" }}>Avec foi et gratitude,</p>
              <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 700, color: GOLD, margin: "0 0 2px" }}>Amset</p>
              <p style={{ fontFamily: F, fontSize: "9px", color: "#78716C", margin: 0 }}>Artiste Gospel Pro · Fondateur du Galsen Gospel Urbain<br />Promoteur du Sunu Impact Festival · Dakar, Sénégal</p>
            </div>
          </div>
          <div style={{ padding: "10px 36px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E5E1DC" }}>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>KEKELI Creative Agency — {LABEL}</p>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>5 / {TOTAL}</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* P6 — REMERCIEMENTS [PLACEHOLDER]                 */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="ebook-page" style={{
        width: "210mm", minHeight: "297mm", background: CREAM,
        display: "flex", pageBreakAfter: "always",
      }}>
        <div style={{ width: "5px", flexShrink: 0, background: `linear-gradient(180deg, ${ACC} 0%, ${ACC}88 100%)` }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 36px", flexShrink: 0, background: DARK }}>
            <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: ACC, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Remerciements</p>
          </div>
          <div style={{ flex: 1, padding: "24px 36px 16px" }}>
            <p style={{ fontFamily: FD, fontSize: "24px", fontWeight: 700, color: DARK, margin: "0 0 16px" }}>Remerciements</p>
            <Body>Ce livre n'est pas le fruit d'un travail solitaire. Il est le résultat de rencontres, de soutiens, de grâces reçues et d'une communauté qui a toujours cru avant même que les résultats soient visibles.</Body>
            <Body><strong>À Dieu en premier</strong> — source de tout talent, de toute vision, de toute persévérance. Ce livre n'existe que parce que Tu l'as voulu. À Toi toute la gloire.</Body>
            <Body><strong>À ma femme Anna DeSion</strong> — pour ta patience, ton amour sans condition, et pour avoir cru en ce projet même dans les moments où moi-même je doutais. Tu es mon ancre et ma force. Et à mon fils <strong>Jotham</strong>, qui me rappelle chaque jour pour quelle génération je construis.</Body>
            <Body><strong>À toute ma famille</strong>, de près et de loin — vos prières, vos encouragements et votre amour m'ont porté bien au-delà de ce que je méritais.</Body>
            <Body><strong>À l'équipe de KEKELI Creative Agency</strong> — pour avoir cru en la vision, pour le travail acharné dans l'ombre, et pour faire de chaque projet une œuvre qui porte la lumière. Ce livre porte votre empreinte.</Body>
            <Body><strong>À la communauté Galsen Gospel Urbain</strong> — vous êtes la preuve vivante que l'excellence gospel est possible depuis Dakar. Chaque artiste de cette communauté m'inspire à donner plus et à exiger davantage de moi-même.</Body>
            <Body><strong>À toute l'équipe du Sunu Impact Festival</strong> — pour votre engagement à créer des espaces où l'art africain est célébré avec dignité et ambition. Vous avez changé la conversation sur ce qu'un festival peut être en Afrique de l'Ouest.</Body>
            <Body><strong>À CMM</strong> et à tous les partenaires qui ont soutenu le travail au fil des années — votre confiance a ouvert des portes que je n'aurais pas pu ouvrir seul.</Body>
            <Body><strong>À toute l'équipe d'organisation du Galsen Gospel Urbain et du Sunu Impact Festival</strong> — derrière chaque événement réussi, il y a des bras qui travaillent dans l'ombre. Vous savez qui vous êtes. Merci.</Body>
            <Body>Une mention spéciale et sincère à des personnes qui ont marqué ce parcours de leur présence, leur soutien et leur foi : <strong>Emmanuel Lhebreux, Jean Michel Zié, ID Music, Dany Governor, Covenant Mic, Tahicia, Odeline, Jeriel, Benie Merveilles, Pierre Damien</strong> et <strong>Murphy Fall</strong>. Chacun d'entre vous a apporté quelque chose d'unique — une parole au bon moment, une porte ouverte, une main tendue, une prière. Je n'oublie pas.</Body>
            <Body><strong>À la communauté "Amset — Today na today"</strong> — vous qui suivez, encouragez, partagez et priez depuis le début. Votre fidélité est le carburant qui m'a permis de continuer les jours difficiles. Ce livre est autant le vôtre que le mien.</Body>
            <Body><strong>À tous ceux qui croient en cette vision que Dieu a mise dans mon cœur</strong> — même quand les résultats ne se voyaient pas encore, vous avez cru. Cette foi collective a été plus forte que tous les doutes.</Body>
            <Body><strong>À tous les artistes</strong> qui m'ont fait confiance, qui ont partagé leurs histoires, leurs doutes et leurs victoires — ce livre est aussi le vôtre.</Body>
            <Body>Et à toi, lecteur, qui as choisi d'investir ton temps dans ces pages — merci de croire que le sommet est possible. Ce livre a été écrit pour toi.</Body>
          </div>
          <div style={{ padding: "10px 36px 14px", display: "flex", justifyContent: "space-between", borderTop: "1px solid #E5E1DC" }}>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>KEKELI Creative Agency — {LABEL}</p>
            <p style={{ fontFamily: F, fontSize: "8px", color: "#B0A89E", margin: 0 }}>6 / {TOTAL}</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* P2 — QUOTE (décalée à 7)                         */}
      {/* ══════════════════════════════════════════════════ */}
      <QuotePage
        accent={ACC}
        pageNum={2}
        total={TOTAL}
        guideLabel={LABEL}
        quote="Le talent sans stratégie reste un rêve. La stratégie sans talent reste du bruit. Ce livre t'apprend à marier les deux — pour construire une carrière qui dure."
        source="Amset — Artiste Gospel Pro · Fondateur du Galsen Gospel Urbain · Promoteur du Sunu Impact Festival"
      />

      {/* ══════════════════════════════════════════════════ */}
      {/* P3–P4 — TABLE DES MATIÈRES                        */}
      {/* ══════════════════════════════════════════════════ */}
      <TOCPage
        accent={ACC}
        pageNum={3}
        total={TOTAL}
        guideLabel={LABEL}
        chapters={[
          { num: 0,  title: "INTRODUCTION — L'histoire qui a tout changé", sub: "Le chemin d'Amset — de la passion au professionnalisme" },
          { num: 1,  title: "PRO 01 — Pense comme un Artiste Pro", sub: "Amateur vs Pro : les différences qui changent tout" },
          { num: 2,  title: "PRO 02 — Construis ta Marque Pro", sub: "Branding, positionnement, archétypes, avatar fan" },
          { num: 3,  title: "PRO 03 — Définis ta Direction Artistique", sub: "ADN artistique, moodboard, cohérence visuelle" },
          { num: 4,  title: "PRO 04 — Produis comme un Pro", sub: "Budgets FCFA, beats, studio, mixing, mastering, clip" },
          { num: 5,  title: "PRO 05 — Distribue partout dans le monde", sub: "DistroKid, ISRC, Payoneer — tutoriel complet" },
          { num: 6,  title: "PRO 06 — Maîtrise Spotify", sub: "Profil optimisé, playlists, Canvas — comme les pros" },
          { num: 7,  title: "PRO 07 — Domine YouTube", sub: "CPM par pays, Shorts, stratégie pro de contenu" },
          { num: 8,  title: "PRO 08 — Publicité Pro : YouTube & Meta Ads", sub: "Campagnes avec budgets réels en FCFA" },
          { num: 9,  title: "PRO 09 — TikTok : la Machine Virale Pro", sub: "Plan 90 jours, hooks, algorithme maîtrisé" },
          { num: 10, title: "PRO 10 — Instagram Pro : Feed & Engagement", sub: "5 piliers, Reels, Stories, calendrier éditorial" },
          { num: 11, title: "PRO 11 — WhatsApp Pro : l'Arme Secrète", sub: "Broadcast, Business, Communautés, vente directe" },
          { num: 12, title: "PRO 12 — Communauté Pro : 0 → 10 000 Fans", sub: "Les 4 étapes pro, ambassadeurs, système de contenu" },
          { num: 13, title: "PRO 13 — Droits & Contrats comme un Pro", sub: "BSDA, ISRC, Split Sheet, modèles professionnels" },
          { num: 14, title: "PRO 14 — Monétisation Pro : 1 Million FCFA/mois", sub: "10 sources de revenus + plan chiffré complet" },
          { num: 15, title: "PRO 15 — Plan de Carrière Pro sur 5 Ans", sub: "Objectifs, KPIs, checklist mensuelle du pro" },
        ]}
      />

      {/* ── P4 TOC SUITE ── */}
      <ContentPage chapter="Table des matières — Suite" accent={ACC} pageNum={4} total={TOTAL} guideLabel={LABEL}>
        <TOCPage
          accent={SEC}
          pageNum={4}
          total={TOTAL}
          guideLabel={LABEL}
          chapters={[
            { num: 16, title: "PRO 16 — Réseaux Sociaux Avancés", sub: "Algorithmes TikTok, Instagram, YouTube maîtrisés" },
            { num: 17, title: "PRO 17 — L'Artiste Indépendant Pro", sub: "Sans label, sans avance — et pourtant professionnel" },
            { num: 18, title: "PRO 18 — Études de Cas : Les Pros qui Réussissent", sub: "Nix, Wally Seck, artistes gospel — leurs vraies leçons" },
            { num: 19, title: "PRO 19 — Guide des Outils Pro", sub: "Quel outil choisir et pourquoi — comparatifs complets" },
            { num: 20, title: "PRO 20 — L'Artiste Gospel Pro", sub: "Chantre vs artiste, marché gospel AOF, stratégie" },
            { num: 21, title: "PRO 21 — Budget Pro par niveau", sub: "3 budgets (100K / 300K / 1M FCFA) + allocation" },
            { num: 22, title: "PRO 22 — Tutoriels Visuels Pro", sub: "Spotify, Google Ads, WhatsApp — écrans simulés" },
            { num: 23, title: "PRO 23 — Plan 90 Jours du Pro", sub: "Programme complet semaine par semaine" },
            { num: 24, title: "PRO 24 — Documents Pro : Modèles officiels", sub: "Bio, contrats, Split Sheet, EPK complet" },
            { num: 25, title: "PRO 25 — Concerts & Live Pro", sub: "Booking, setlist, présence scénique professionnelle" },
            { num: 26, title: "PRO 26 — Marchés AOF & Diaspora Pro", sub: "7 pays + stratégie diaspora Europe" },
            { num: 27, title: "PRO 27 — L'Équipe Pro autour de l'artiste", sub: "Manager, booker, DA, CM — rôles et rémunérations" },
            { num: 28, title: "PRO 28 — Booking & Festivals Pro", sub: "Dossier de candidature, négociation, erreurs fatales" },
            { num: 29, title: "PRO 29 — Certifications & Vérifications", sub: "YouTube, Spotify, Instagram, Boomplay — badges officiels" },
            { num: 30, title: "PRO 30 — Contrats Avancés Pro", sub: "Sponsoring, sync, licences — clauses et pièges" },
          ]}
        />
      </ContentPage>

      {/* ── P5 TOC SUITE 2 ── */}
      <ContentPage chapter="Table des matières — Suite" accent={GOLD} pageNum={5} total={TOTAL} guideLabel={LABEL}>
        <TOCPage
          accent={GOLD}
          pageNum={5}
          total={TOTAL}
          guideLabel={LABEL}
          chapters={[
            { num: 31, title: "PRO 31 — Contrats Pro : Marques & Licences", sub: "Sponsoring, synchronisation, licences — clauses et pièges contractuels" },
            { num: 32, title: "PRO 32 — Le Storytelling de l'Artiste", sub: "Construire une narration puissante autour de sa carrière" },
            { num: 33, title: "PRO 33 — Communiquer autour de ses Sorties", sub: "Plan de lancement complet : avant, pendant, après la sortie" },
            { num: 34, title: "PRO 34 — Prendre la Parole en Public", sub: "Interview radio, TV, podcast — les règles d'or + devoirs de l'artiste" },
            { num: 35, title: "PRO 35 — Gérer son Équipe : Leadership & Management", sub: "Recruter, rémunérer, gérer conflits et départs d'équipe" },
            { num: 36, title: "PRO 36 — Avoir les Contacts de l'Industrie", sub: "Construire et entretenir un réseau professionnel puissant" },
            { num: 37, title: "PRO 37 — Relations Presse & Visibilité", sub: "Dossier de presse, communiqué, influenceurs — se faire couvrir" },
            { num: 38, title: "PRO 38 — Les Droits Méconnus de l'Artiste", sub: "8 droits ignorés + plan d'action 30 jours pour les activer" },
            { num: 39, title: "PRO 39 — Récupérer ses Droits & Royalties", sub: "BSDA, SACEM, CISAC, Content ID, SoundExchange — guide complet" },
            { num: 40, title: "PRO 40 — Songwriting : L'Art d'Écrire une Chanson", sub: "Structure, mélodie, texte — les fondamentaux du métier" },
            { num: 41, title: "PRO 41 — Home Studio : Produire depuis chez Soi", sub: "Setup budget FCFA, traitement acoustique DIY, DAW et enregistrement" },
            { num: 42, title: "PRO 42 — Fiscalité & Finances de l'Artiste", sub: "NINEA, BSDA, règle des 3 comptes, DER/FONSIS — guide complet Sénégal" },
            { num: 43, title: "PRO 43 — Gestion de Crise & Bad Buzz", sub: "Protocole 24h, scripts par type de crise, reconstruire son image" },
            { num: 44, title: "PRO 44 — Le Merchandising Professionnel", sub: "Produits, production Dakar, pricing, vente concert et en ligne" },
            { num: 45, title: "PRO 45 — La Tournée Professionnelle en AOF", sub: "7 pays CEDEAO, booking, logistique, budget tournée réaliste" },
            { num: 46, title: "PRO 46 — Featurings & Collaborations", sub: "Approche, négociation, contrat feat. — guide complet" },
            { num: 47, title: "PRO 47 — Le Planning Annuel Artistique", sub: "4 saisons artistiques, calendrier type, outils et bilan annuel" },
          ]}
        />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* P5–P7 — INTRODUCTION                              */}
      {/* ══════════════════════════════════════════════════ */}
      {/* ── P5–P7 INTRODUCTION ── */}
      <ChapterPage num={0} title="Devenir un Artiste Pro : l'histoire qui a tout changé" accent={ACC} pageNum={5} total={TOTAL} guideLabel={LABEL}
        hook="Il y a une différence entre faire de la musique et être un artiste professionnel. Ce livre est l'histoire de cette différence — et le chemin concret pour la franchir." />

      <ContentPage chapter="Introduction — Devenir un Artiste Pro" accent={ACC} pageNum={6} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Ce que signifie vraiment être un Artiste Pro</SH2>
        <Body>Je suis Amset, artiste gospel basé à Dakar, au Sénégal. Comme beaucoup de jeunes artistes de ma génération, j'ai commencé la musique porté par une passion sincère et une foi profonde — sans vraiment comprendre comment fonctionnait l'industrie musicale professionnelle.</Body>
        <Body>La première leçon que j'ai apprise est celle-ci : <strong>être pro ne signifie pas être célèbre</strong>. Un artiste professionnel, c'est un artiste qui traite sa musique comme un business — qui planifie, qui investit, qui mesure, qui s'améliore continuellement, et qui génère des revenus réels grâce à son travail.</Body>
        <MiniTable color={ACC}
          headers={["Artiste Amateur", "Artiste Pro"]}
          rows={[
            ["Sort de la musique et espère", "Planifie chaque sortie comme un lancement produit"],
            ["Attend d'être repéré", "Crée sa propre visibilité activement"],
            ["Ignore ses droits d'auteur", "Est inscrit au BSDA, déclare chaque œuvre"],
            ["0 budget en promotion", "Investit 40-50% du budget en publicité"],
            ["Parle de sa musique en artiste", "Parle de sa musique en entrepreneur"],
            ["Réseaux gérés au hasard", "Stratégie éditoriale hebdomadaire documentée"],
            ["Aucun contrat signé", "Contrats pour CHAQUE prestation ou collaboration"],
          ]}
        />
        <Callout color={ACC} title="Le vrai déclic"
          text="Ce n'est pas le manque de talent qui bloque les artistes sénégalais. C'est le manque de connaissance professionnelle. Personne ne leur a enseigné la distribution, le booking, les droits, la publicité digitale ou la monétisation. Ce livre corrige cela." />
      </ContentPage>

      <ContentPage chapter="Introduction — Devenir un Artiste Pro" accent={ACC} pageNum={7} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'origine de ce guide : Galsen Gospel Urbain & Sunu Impact Festival</SH2>
        <Body>Pour comprendre pourquoi ce livre existe, il faut comprendre ce que nous avons construit à Dakar. Face au constat que la scène gospel sénégalaise était sous-exploitée et peu professionnalisée, nous avons décidé de passer à l'action — non pas en nous plaignant de la situation, mais en créant les espaces qui manquaient.</Body>
        <InfoGrid color={ACC} cols={2} items={[
          { emoji: "🎪", title: "Galsen Gospel Urbain", desc: "Festival fondé par Amset pour réunir les artistes gospel de Dakar et la sous-région dans un format moderne. Scènes, workshops, networking.", badge: "Fondateur : Amset" },
          { emoji: "💡", title: "Sunu Impact Festival", desc: "Événement multidisciplinaire co-organisé avec CMM : musique, ateliers pro, formation, networking industrie. «Sunu» = «notre» en wolof.", badge: "Promoteur : Amset · CMM" },
          { emoji: "🎓", title: "Formation continue", desc: "Ateliers pratiques sur la distribution, le branding, les droits et la stratégie digitale pour les artistes émergents.", badge: "Formation" },
          { emoji: "🌍", title: "Réseau sous-régional", desc: "Connexions avec artistes et professionnels du Sénégal, Côte d'Ivoire, Gabon, Cameroun et diaspora Europe.", badge: "Réseau" },
        ]} />
        <Body>Ce livre est la synthèse de tout ce que nous avons appris en organisant ces événements, en accompagnant des artistes et en naviguant dans les réalités concrètes de l'industrie musicale africaine.</Body>
        <Testimony
          text="Ce que nous voulons prouver avec Galsen Gospel Urbain et Sunu Impact Festival, c'est qu'il est possible de bâtir une industrie gospel professionnelle depuis Dakar. Avec nos artistes, nos standards, notre identité. Ce livre est l'outil que nous aurions voulu avoir au début."
          author="Amset"
          role="Artiste Gospel Pro · Fondateur du Galsen Gospel Urbain · Promoteur du Sunu Impact Festival (co-org. CMM) · Dakar, Sénégal"
          color={ACC}
        />
      </ContentPage>

      <ContentPage chapter="Introduction — Comment utiliser ce guide" accent={ACC} pageNum={8} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment utiliser ce guide pour devenir pro</SH2>
        <Body>Ce livre n'est pas fait pour être lu une fois puis posé sur une étagère. Il est fait pour être utilisé — annoté, relu, appliqué. Chaque module est un outil concret. Chaque checklist est une action à effectuer. Chaque exemple est une leçon à retenir.</Body>
        <SH3 color={ACC}>Les 3 façons d'utiliser ce guide</SH3>
        <NumberedList color={ACC} items={[
          "LECTURE LINÉAIRE — Lis le livre du début à la fin une première fois pour avoir la vision globale du chemin vers le professionnalisme. Ne saute aucune étape.",
          "RÉFÉRENCE PAR MODULE — Reviens au module dont tu as besoin selon ta situation : tu prépares un single ? Module 5 (Distribution) et 8 (Publicité). Tu veux booker un festival ? Module 28.",
          "PROGRAMME D'ACTION — Suis le Plan 90 Jours (Module 23) en ayant le guide ouvert. Coche chaque étape au fur et à mesure.",
        ]} />
        <TwoCol
          left={
            <GreenBox>
              <BoxLabel color="#16A34A" text="✅ Ce que tu vas apprendre" />
              <BulletList color={GRN} items={[
                { text: "Stratégies 100% adaptées au Sénégal et à l'Afrique francophone" },
                { text: "Chiffres réels en FCFA — pas en dollars théoriques" },
                { text: "Tutoriels visuels étape par étape" },
                { text: "Modèles de contrats et documents officiels" },
                { text: "Études de cas d'artistes africains réels" },
                { text: "Plan d'action chiffré sur 5 ans" },
              ]} />
            </GreenBox>
          }
          right={
            <RedBox>
              <BoxLabel color="#DC2626" text="❌ Ce que ce livre n'est pas" />
              <BulletList color="#DC2626" items={[
                { text: "Un raccourci pour devenir célèbre rapidement" },
                { text: "Une copie de manuels américains inadaptés" },
                { text: "Un guide théorique sans application pratique" },
                { text: "Un substitut au travail créatif et à la discipline" },
                { text: "Valable sans action de ta part" },
              ]} />
            </RedBox>
          }
        />
        <Callout color={GOLD} title="Pour qui est ce guide ?"
          text="Pour tout artiste sénégalais ou africain francophone qui veut passer du statut d'amateur à celui de professionnel. Gospel, afrobeats, mbalax, hip-hop, trap — les stratégies s'appliquent à tous les genres. Avec ou sans budget de départ. Ce qui compte : la volonté d'apprendre et d'appliquer." />
        <BulletList color={ACC} items={[
          { bold: "💡 Conseil Pro :", text: "astuce directement applicable par un artiste pro" },
          { bold: "⚠️ Erreur d'Amateur :", text: "ce que les non-professionnels font et qu'il faut éviter" },
          { bold: "📊 Chiffre Pro :", text: "donnée réelle à intégrer dans ta stratégie" },
          { bold: "✅ Action Pro :", text: "ce que tu dois faire immédiatement pour progresser" },
          { bold: "🇸🇳 Contexte Dakar :", text: "adapté spécifiquement à la réalité sénégalaise" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Introduction" accent={ACC} pageNum={7} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le marché musical sénégalais en chiffres</SH2>
        <MiniTable color={BLU}
          headers={["Indicateur", "Donnée 2026"]}
          rows={[
            ["Utilisateurs internet au Sénégal", "~9 millions (55% de pénétration)"],
            ["Plateforme n°1 pour la musique", "YouTube (gratuit, accessible)"],
            ["App musicale la plus utilisée en AOF", "Boomplay (100M+ utilisateurs Afrique)"],
            ["Réseau qui crée les tubes en 2026", "TikTok (16-30 ans)"],
            ["Marché de la diaspora (France, Italie, USA)", "Très sous-exploité — CPM élevé"],
            ["Artistes sénégalais avec +1M abonnés YT", "Moins de 20 (opportunité massive)"],
          ]}
        />
        <Divider color={BLU} />
        <SH3 color={DARK}>Les genres porteurs</SH3>
        <BulletList color={ACC} items={[
          { bold: "Mbalax modernisé :", text: "valeur sûre, médias classiques, cérémonies" },
          { bold: "Afrobeats / Afrofusion :", text: "fort potentiel export et streaming international" },
          { bold: "Afrotrap / Drill sénégalaise :", text: "audience jeune explosive sur TikTok" },
          { bold: "Hip-hop wolof :", text: "engagement communautaire fort, audience fidèle" },
          { bold: "Gospel / Musique religieuse :", text: "marché stable, très peu concurrencé en digital" },
          { bold: "Zouglou / Coupé-décalé sénégalisé :", text: "marché sous-régional à explorer" },
        ]} />
        <Callout color={GOLD} title="🇸🇳 Avantage sénégalais"
          text="Le Sénégal a une réputation musicale mondiale (grâce au mbalax, Youssou N'Dour, etc.) que les nouvelles générations peuvent capitaliser. Le mélange wolof/français/anglais est un actif différenciant sur les marchés internationaux." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 1 — MINDSET (P8–P17)                       */}
      {/* ══════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FONDATIONS — TALENT, SOMMET & RESPONSABILITÉ (P9–P14)        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <ChapterPage num={0} title="FONDATIONS — Du Talent au Sommet" accent={GOLD} pageNum={9} total={TOTAL} guideLabel={LABEL}
        hook="Avant les stratégies, les outils et les plateformes — il y a deux mots que tu dois comprendre profondément : TALENT et SOMMET. Ce que tu crois qu'ils signifient déterminera ton chemin. Ce qu'ils signifient vraiment changera ta vie." />

      <ContentPage chapter="Fondations — Qu'est-ce que le Talent ?" accent={GOLD} pageNum={10} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Qu'est-ce que le Talent ?</SH2>
        <Body>Le mot «talent» est l'un des plus mal compris dans l'industrie musicale africaine. Beaucoup d'artistes croient que le talent est une qualité innée — quelque chose qu'on a ou qu'on n'a pas. Cette croyance est la première chose qui empêche de progresser.</Body>
        <BigQuote text="Le talent n'est pas ce que tu possèdes. C'est ce que tu choisis de développer chaque jour." author="Principe des artistes qui durent" color={GOLD} />
        <SH3 color={GOLD}>Le talent brut vs le talent développé</SH3>
        <TwoCol
          left={
            <RedBox>
              <BoxLabel color="#92400E" text="Talent Brut (Point de départ)" />
              <Body>C'est ce que tu as reçu naturellement — une belle voix, une oreille musicale, un sens du rythme. C'est ton point de départ. Rien de plus.</Body>
              <BulletList color="#B45309" items={[
                { text: "Inné, non mérite" },
                { text: "Commun à des milliers d'artistes" },
                { text: "Ne garantit aucun succès seul" },
                { text: "Se perd sans travail" },
              ]} />
            </RedBox>
          }
          right={
            <GreenBox>
              <BoxLabel color="#16A34A" text="Talent Développé (Ce qui compte)" />
              <Body>C'est ce que tu construis avec discipline, formation et expérience. C'est lui qui fait la différence sur la durée.</Body>
              <BulletList color={GRN} items={[
                { text: "Acquis par l'effort quotidien" },
                { text: "Rare — peu osent y investir" },
                { text: "Garantit une progression constante" },
                { text: "Grandit avec chaque sortie" },
              ]} />
            </GreenBox>
          }
        />
        <Body>L'histoire de la musique africaine est remplie d'artistes extraordinairement talentueux qui n'ont jamais percé — et d'artistes «ordinaires» qui ont construit des empires. La différence n'était pas dans le don reçu. Elle était dans la décision de le développer.</Body>
        <Callout color={GOLD} title="La vérité sur le talent"
          text="Au Sénégal, dans chaque quartier de Dakar — Médina, Grand Yoff, Pikine, Parcelles — il y a des voix exceptionnelles qui ne seront jamais entendues. Pas parce qu'elles manquent de talent. Parce qu'elles manquent de stratégie, de constance et de courage de professionnaliser leur don. Ce livre existe pour changer ça." />
      </ContentPage>

      <ContentPage chapter="Fondations — Le Talent est une Responsabilité" accent={GOLD} pageNum={11} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Talent est une Responsabilité</SH2>
        <Body>Recevoir un talent musical n'est pas neutre. C'est une responsabilité — envers toi-même, envers ta famille, envers ta communauté, et pour celui qui croit en la foi, envers Dieu qui te l'a donné.</Body>
        <Banner text="Un talent enterré ne sert ni toi, ni les autres, ni ceux qui t'attendent." sub="La parabole des talents s'applique aussi à la musique." color={GOLD} dark />
        <SH3 color={GOLD}>3 dimensions de la responsabilité du talent</SH3>
        <InfoGrid color={GOLD} cols={3} items={[
          { emoji: "👤", title: "Envers toi-même", desc: "Développer ton talent est la façon la plus honnête de te respecter. Ne pas le faire est une forme de trahison envers ta propre vie.", badge: "Personnel" },
          { emoji: "👨‍👩‍👧", title: "Envers ta communauté", desc: "Ta musique peut transformer une vie, redonner espoir, réunir des gens. Ce pouvoir est réel et il attend d'être activé.", badge: "Social" },
          { emoji: "🌍", title: "Envers l'Afrique", desc: "La musique africaine est l'une des plus puissantes du monde. Chaque artiste pro qui émerge depuis Dakar porte le continent entier.", badge: "Culturel" },
        ]} />
        <Body>Quand Youssou N'Dour a refusé de laisser son talent s'éteindre dans un quartier de Dakar, il n'a pas seulement changé sa vie — il a mis le Sénégal sur la carte musicale mondiale. Ce qu'il a fait, il l'a fait avec les mêmes 24 heures que toi. La même ville. Les mêmes contraintes, en plus dures encore à son époque.</Body>
        <Testimony
          text="Mon talent n'est pas à moi seul. Il appartient à tous ceux qui vont l'entendre. Si je ne le développe pas, je leur vole quelque chose qu'ils auraient reçu."
          author="Amset"
          role="Artiste Gospel Pro · Dakar, Sénégal"
          color={GOLD}
        />
        <Callout color={AMB} title="Pour l'artiste qui doute"
          text="Si tu lis ces lignes en te demandant si tu as assez de talent pour continuer — voici la réponse : la question n'est pas «est-ce que j'ai assez de talent ?». La question est «est-ce que je suis prêt à faire ce qu'il faut pour développer celui que j'ai ?». C'est la seule question qui compte." />
      </ContentPage>

      <ContentPage chapter="Fondations — Qu'est-ce que le Sommet ?" accent={GOLD} pageNum={12} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Qu'est-ce que le Sommet ?</SH2>
        <Body>Le mot «sommet» évoque Hollywood, les Grammy Awards, les stades remplis, les jets privés. Ce n'est pas de ça dont je parle. Pour un artiste africain en 2026, le sommet a une définition plus précise — et plus atteignable.</Body>
        <BigQuote text="Le sommet n'est pas un endroit où tu arrives un jour. C'est un état dans lequel tu vis — quand ta musique nourrit ta famille, impacte ta communauté, et te donne la liberté d'être qui tu es." author="Définition du Sommet — KEKELI Creative Agency" color={GOLD} />
        <SH3 color={GOLD}>Les 5 dimensions du Sommet pour l'Artiste Africain Pro</SH3>
        <NumberedList color={GOLD} items={[
          "LA LIBERTÉ FINANCIÈRE — Vivre de ta musique sans dépendre d'un emploi secondaire. Générer des revenus réguliers depuis plusieurs sources musicales.",
          "L'IMPACT CULTUREL — Voir ta musique changer des vies, donner de l'espoir, rassembler des communautés autour de tes valeurs et de tes messages.",
          "LA RECONNAISSANCE PROFESSIONNELLE — Être considéré comme un professionnel sérieux par l'industrie : labels, organisateurs, médias, marques.",
          "LA LIBERTÉ CRÉATIVE — Créer exactement ce que tu veux sans compromis artistiques imposés par la pression financière ou la dépendance à un label.",
          "L'HÉRITAGE — Laisser une œuvre qui survivra à ta personne — des chansons, des albums, une école artistique, une influence durable.",
        ]} />
        <MiniTable color={GOLD}
          headers={["Niveau", "Description", "Indicateurs concrets"]}
          rows={[
            ["Sommet 1 — Émergent", "Tu es reconnu localement", "1 000 fans, 1er cachet, 1 média"],
            ["Sommet 2 — Établi", "Tu vis de ta musique", "10 000 fans, 300K FCFA/mois réguliers"],
            ["Sommet 3 — Référence", "L'industrie te consulte", "50 000 fans, tournées, partenariats majeurs"],
            ["Sommet 4 — Légende", "Ton œuvre transcende ta personne", "Impact générationnel, héritage culturel"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Fondations — Les Responsabilités du Sommet" accent={GOLD} pageNum={13} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Responsabilités du Sommet</SH2>
        <Body>Beaucoup d'artistes rêvent du sommet sans penser à ce qu'il exige une fois qu'on y est. La montée vers le sommet forge le caractère. Mais le sommet lui-même teste quelque chose de différent : ta maturité, ta sagesse et ta générosité.</Body>
        <InfoGrid color={GOLD} cols={2} items={[
          { emoji: "🪞", title: "Tu deviens un miroir", desc: "Les jeunes artistes qui commencent te regardent. Ce que tu fais — comment tu traites ton équipe, tes fans, tes collaborateurs — devient un modèle pour toute une génération.", badge: "Modèle" },
          { emoji: "🚪", title: "Tu ouvres des portes", desc: "Un artiste au sommet qui ne tend pas la main aux artistes émergents est un artiste qui a oublié d'où il vient. La générosité est le signe de la vraie grandeur.", badge: "Mentor" },
          { emoji: "⚖️", title: "Tu portes une image", desc: "Ton comportement public représente plus que toi — il représente ta ville, ton genre musical, parfois ton pays. La responsabilité est réelle.", badge: "Représentant" },
          { emoji: "🏗️", title: "Tu construis l'industrie", desc: "Les artistes qui arrivent au sommet et ne contribuent pas à structurer l'industrie laissent le chemin aussi difficile pour ceux qui viennent après eux.", badge: "Bâtisseur" },
        ]} />
        <SH3 color={GOLD}>Ce que le Sommet demande</SH3>
        <BulletList color={GOLD} items={[
          { bold: "La gratitude :", text: "Se souvenir toujours de ceux qui t'ont soutenu quand tu n'étais personne." },
          { bold: "L'humilité :", text: "Le succès est une saison, pas un statut permanent. Rester humble est la seule façon de durer." },
          { bold: "La transmission :", text: "Partager tes connaissances, tes contacts, tes ressources avec les artistes qui montent." },
          { bold: "L'intégrité :", text: "Ne jamais compromettre tes valeurs pour rester au sommet. Ce qui monte sans intégrité tombe encore plus vite." },
          { bold: "La responsabilité financière :", text: "Gérer intelligemment les revenus du sommet pour ne pas disparaître financièrement quand la notoriété baisse." },
        ]} />
        <Callout color={GOLD} title="Le sommet n'est pas une arrivée — c'est un devoir"
          text="Youssou N'Dour aurait pu garder son succès pour lui seul. Il a choisi de l'utiliser pour positionner la culture sénégalaise dans le monde entier. C'est ça le vrai sommet. Pas ce que tu reçois — ce que tu donnes une fois que tu l'as atteint." />
      </ContentPage>

      <ContentPage chapter="Fondations — Pour Celui qui Hésite encore" accent={GOLD} pageNum={14} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pour Celui qui a du Talent et Hésite encore</SH2>
        <Body>Cette page est écrite pour toi — l'artiste qui lit ce livre en se posant des questions. Celui qui a une voix, une histoire, un message à partager — mais qui n'a pas encore franchi le pas vers le professionnalisme. Qui hésite. Qui doute. Qui attend «le bon moment».</Body>
        <Banner text="Il n'y a pas de bon moment. Il y a le moment où tu décides." sub="Et ce moment peut être maintenant, si tu le choisis." color={GOLD} dark />
        <SH3 color={GOLD}>Les questions que tu te poses — et les réponses honnêtes</SH3>
        <MiniTable color={GOLD}
          headers={["Ta question", "La réponse honnête"]}
          rows={[
            ["«Est-ce que j'ai assez de talent ?»", "La question n'est pas là. Peux-tu développer celui que tu as ? OUI."],
            ["«Et si ça ne marche pas ?»", "Et si ça marche ? Le regret d'avoir essayé est infiniment moins lourd que le regret de n'avoir jamais essayé."],
            ["«Je n'ai pas de budget»", "Les artistes qui ont construit des empires depuis le Sénégal ont commencé avec un téléphone. Tu en as un."],
            ["«Personne ne me soutient»", "Aucun artiste qui compte ne l'a été au départ. Le soutien vient après que tu as commencé, pas avant."],
            ["«Il y a trop de concurrence»", "Il y a peu d'artistes qui font ça BIEN. La concurrence sérieuse est rare."],
            ["«Je ne sais pas par où commencer»", "Tu tiens ce guide. Tu sais maintenant par où commencer. La page 1 de ta carrière pro commence après ce livre."],
          ]}
        />
        <Testimony
          text="J'ai hésité pendant deux ans avant de prendre au sérieux ma carrière. Ces deux ans sont les seules choses que je regrette dans mon parcours. Pas les erreurs que j'ai faites après avoir commencé — seulement le temps perdu à attendre."
          author="Amset"
          role="Artiste Gospel Pro · Fondateur du Galsen Gospel Urbain · Dakar, Sénégal"
          color={GOLD}
        />
      </ContentPage>

      <ContentPage chapter="Fondations — Les Conseils du Sommet" accent={GOLD} pageNum={15} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Conseils pour Celui qui Sera au Sommet</SH2>
        <Body>Ce chapitre s'adresse à toi du futur — l'artiste que tu seras dans 3, 5 ou 10 ans. Celui qui aura franchi les étapes de ce guide, construit son audience, généré ses revenus, et qui se retrouvera à un niveau de reconnaissance et de responsabilité qu'il n'avait peut-être pas anticipé.</Body>
        <SH3 color={GOLD}>10 vérités pour l'artiste qui atteint le sommet</SH3>
        <NumberedList color={GOLD} items={[
          "GARDE TES VALEURS — Le succès teste ton caractère plus que l'échec. Ceux qui perdent leurs valeurs au sommet perdent aussi leur authenticité, puis leur audience.",
          "NE DEVIENS PAS INACCESSIBLE — Rester proche de tes fans est la chose la plus précieuse que tu puisses faire. L'arrogance tue plus de carrières que le manque de talent.",
          "DIVERSIFIE TOUJOURS — Même au sommet, ne dépends jamais d'une seule source de revenus, d'une seule plateforme, d'un seul marché.",
          "PROTÈGE TON ÉNERGIE CRÉATIVE — Le succès apporte des sollicitations sans fin. Apprends à dire non pour protéger le temps que tu consacres à créer.",
          "ENTOURE-TOI DE VRAIS ALLIÉS — Au sommet, les flatteurs apparaissent en masse. Garde précieusement ceux qui te disaient la vérité quand tu n'avais rien.",
          "GÈRE TON ARGENT SÉRIEUSEMENT — Engage un comptable. Investis. Ne consomme pas tout. Le sommet peut descendre — prépare-toi financièrement pour les périodes basses.",
          "RESTE UN ÉTUDIANT — Les artistes qui durent ne cessent jamais d'apprendre. Continue à lire, à te former, à te remettre en question.",
          "DONNE EN RETOUR — Mentor un jeune artiste. Finance une initiative culturelle. Ouvre des portes que d'autres t'ont ouvertes ou que personne ne t'a ouvertes.",
          "PROTÈGE TA SANTÉ — Mentale et physique. Le burnout au sommet est réel et dévastateur. Prends soin de toi avec la même rigueur que tu prends soin de ta carrière.",
          "SOUVIENS-TOI DU DÉBUT — La mémoire de tes débuts est ton plus grand actif. Elle garde ton art authentique et tes relations humaines.",
        ]} />
        <BigQuote
          text="Le vrai artiste au sommet n'est pas celui que tout le monde connaît. C'est celui que tout le monde respecte — parce qu'il est resté lui-même tout au long du chemin."
          author="Du Talent au Sommet — KEKELI Creative Agency · Dakar 2026"
          color={GOLD}
        />
      </ContentPage>

      <ContentPage chapter="Fondations — L'Artiste Visionnaire" accent={GOLD} pageNum={16} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'Artiste Visionnaire : Voir ce que les Autres ne Voient pas encore</SH2>
        <Body>Tous les grands artistes qui ont marqué l'histoire ont un point commun que leur talent seul n'explique pas : ils ont eu une <strong>vision</strong>. Pas seulement un rêve vague — une image claire et précise de ce qu'ils voulaient créer, de qui ils voulaient toucher, et de l'impact qu'ils voulaient avoir sur le monde.</Body>
        <BigQuote
          text="Un artiste visionnaire ne cherche pas à suivre le marché. Il crée le marché que les autres suivront ensuite."
          author="Principe des artistes qui changent l'industrie"
          color={GOLD}
        />
        <SH3 color={GOLD}>Qu'est-ce que la Vision pour un Artiste ?</SH3>
        <Body>La vision, c'est la capacité à voir clairement une réalité qui n'existe pas encore — et à travailler avec obstination pour la rendre réelle. Ce n'est pas de la naïveté. C'est de la clairvoyance stratégique. Un artiste visionnaire répond à ces 3 questions avant même d'entrer en studio :</Body>
        <NumberedList color={GOLD} items={[
          "Où est-ce que je veux être dans 10 ans — pas juste en termes de notoriété, mais en termes d'impact et de contribution ?",
          "Quelle musique n'existe pas encore sur mon marché et que je suis le seul à pouvoir créer ?",
          "Comment ma carrière va-t-elle changer la vie des gens qui m'écoutent — pas seulement les divertir, mais les transformer ?",
        ]} />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Visionnaires de la musique africaine & mondiale</SH3>
        <MiniTable color={GOLD}
          headers={["Artiste", "Sa Vision", "Ce qu'elle a produit"]}
          rows={[
            ["Youssou N'Dour", "Faire du mbalax sénégalais une musique mondiale, pas régionale", "Le Sénégal sur la carte musicale internationale"],
            ["Fela Kuti (Nigeria)", "La musique comme arme politique et culturelle africaine", "L'afrobeat — genre mondial, message universel"],
            ["Burna Boy", "Devenir «l'African Giant» avant que ça soit populaire de l'assumer", "L'afrobeats mainstream mondial depuis 2018"],
            ["Beyoncé", "Contrôler entièrement sa narration artistique et commerciale", "La définition du pouvoir artistique moderne"],
          ]}
        />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Visionnaires du Gospel mondial — les leçons pour l'Afrique</SH3>
        <MiniTable color={GOLD}
          headers={["Artiste Gospel", "Sa Vision Audacieuse", "Ce qu'elle a prouvé"]}
          rows={[
            ["Kirk Franklin (USA)", "Mélanger gospel, hip-hop et R&B quand l'église condamnait ce mélange", "Le gospel contemporain — des millions de non-chrétiens touchés"],
            ["CeCe Winans (USA)", "40 ans de carrière avec intégrité totale — jamais compromettre le message", "Qu'on peut être au sommet ET rester authentique spirituellement"],
            ["Lecrae (USA)", "Le rap chrétien peut être mainstream — pas besoin de choisir entre la rue et la foi", "Lecrae a prouvé que le Christian hip-hop peut cartonner en séculier"],
            ["Dena Mwana (Congo/France)", "Le gospel africain francophone peut toucher les scènes européennes", "Des millions de vues, concerts en Europe, langue française valorisée"],
            ["Nathaniel Bassey (Nigeria)", "Un simple Live Instagram de prière peut rassembler l'Afrique entière", "Le Hallelujah Challenge — millions de vus, mouvement mondial"],
            ["Moses Bliss (Nigeria)", "Un artiste gospel indépendant peut rivaliser avec les majors gospel", "Preuves que l'indépendance gospel est possible et rentable en 2026"],
          ]}
        />
        <Callout color={GOLD} title="La vision gospel africaine qui manque"
          text="Aucun artiste gospel sénégalais n'a encore atteint la notoriété internationale de Dena Mwana ou Nathaniel Bassey. Ce n'est pas un manque de talent — c'est un manque de vision et de stratégie. Ce vide est une opportunité pour l'artiste qui lit ce livre." />
      </ContentPage>

      <ContentPage chapter="Fondations — Vision & Faibles Commencements" accent={GOLD} pageNum={17} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La Vision commence toujours dans les Faibles Commencements</SH2>
        <Body>Il est tentant de regarder Youssou N'Dour sur les plus grandes scènes du monde, Burna Boy aux Grammy Awards, ou Wally Seck devant des dizaines de milliers de fans — et de croire qu'ils ont toujours été là. La réalité est très différente. Et cette réalité est précisément ce qui doit t'inspirer.</Body>
        <Banner text="Ne méprise pas les jours de faibles commencements." sub="Ce n'est pas où tu commences qui compte. C'est la vision que tu portes dès le premier jour." color={GOLD} dark />
        <SH3 color={GOLD}>Les petits débuts des grands artistes africains</SH3>
        <InfoGrid color={GOLD} cols={2} items={[
          { emoji: "🥁", title: "Youssou N'Dour", desc: "A commencé à 12 ans dans les cérémonies de sabar de la Médina à Dakar. Des années de griot local avant la scène mondiale.", badge: "Dakar, Sénégal" },
          { emoji: "🎤", title: "Burna Boy", desc: "Premier album en 2013, quasi-inconnu 4 ans durant. 7 ans de faibles commencements avant «Outside» (2018) qui a tout changé.", badge: "Lagos, Nigeria" },
          { emoji: "🦅", title: "Dip Doundou Guiss", desc: "Underground hip-hop wolof pendant des années. Personne ne croyait que le rap en wolof pur pouvait percer à cette échelle.", badge: "Dakar, Sénégal" },
          { emoji: "👑", title: "Wally Seck", desc: "Dans l'ombre d'un père légendaire (Thione Seck). Des années à construire sa propre identité avant d'égaler puis dépasser.", badge: "Dakar, Sénégal" },
        ]} />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Les faibles commencements des grands artistes gospel</SH3>
        <InfoGrid color={GOLD} cols={2} items={[
          { emoji: "🎹", title: "Kirk Franklin", desc: "Orphelin adopté, grandi dans la pauvreté au Texas. Quand il a mélangé gospel et hip-hop, l'église l'a rejeté. Il a continué. Résultat : 15 Grammy Awards.", badge: "Fort Worth, USA" },
          { emoji: "🎶", title: "Dena Mwana", desc: "Artiste d'origine congolaise, a commencé à chanter dans les chorales d'église en France. Des années d'anonymat avant de remplir des salles en Europe.", badge: "Congo/France" },
          { emoji: "🙏", title: "Moses Bliss", desc: "Artiste gospel indépendant nigérian. A construit toute sa carrière sans label majeur, avec une stratégie digitale disciplinée. Preuve que l'indépendance gospel fonctionne.", badge: "Lagos, Nigeria" },
          { emoji: "🎤", title: "Lecrae", desc: "Refusé par l'industrie rap séculière ET jugé par l'église. A créé son propre label (Reach Records) quand personne ne voulait du rap chrétien mainstream.", badge: "Atlanta, USA" },
          { emoji: "🌟", title: "Nathaniel Bassey", desc: "Musicien de worship discret pendant des années. Un soir de Live Instagram (Hallelujah Challenge) a rassemblé des millions et changé sa trajectoire pour toujours.", badge: "Lagos, Nigeria" },
          { emoji: "🌊", title: "Limoblaze", desc: "Artiste Christian hip-hop nigérian complètement indépendant. Construit sa carrière entièrement via les réseaux sociaux et les plateformes digitales.", badge: "Lagos, Nigeria" },
        ]} />
        <Body>Ce que ces artistes avaient en commun dans leurs débuts : <strong>une vision plus grande que leur situation et une foi plus forte que les rejets.</strong> Kirk Franklin a été rejeté par l'église. Dena Mwana a chanté dans des salles vides. Lecrae a été ignoré par l'industrie. Chacun a continué. Ce livre existe pour que tu continues toi aussi.</Body>
        <Callout color={GOLD} title="La leçon des faibles commencements"
          text="Tes débuts modestes ne définissent pas ta destination. Ils définissent ton point de départ. Et ton point de départ ne dit rien de ce que tu peux atteindre si tu combines talent, vision, stratégie et persévérance. Chaque artiste dans ce guide a eu un jour 0, une première chanson enregistrée, un premier concert devant 10 personnes. Ce jour 0, peut-être, c'est aujourd'hui pour toi." />
        <Testimony
          text="Quand j'ai organisé le premier Galsen Gospel Urbain, beaucoup ont dit que ça ne marcherait pas. Que le gospel sénégalais ne pouvait pas remplir une salle. C'était leurs limites, pas les miennes. La vision, c'est voir clairement ce que les autres ne voient pas encore."
          author="Amset"
          role="Artiste Gospel Pro · Fondateur du Galsen Gospel Urbain · Dakar, Sénégal"
          color={GOLD}
        />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION A — L'IMPACT DE LA MUSIQUE (P18–P22)                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={0} title="SECTION A — La Musique Change le Monde" accent={SEC} pageNum={18} total={TOTAL} guideLabel={LABEL}
        hook="La musique n'est pas seulement un produit à vendre. C'est une force qui guérit, libère, unit et transforme les sociétés. Les artistes qui comprennent ça ne font pas juste une carrière — ils laissent une empreinte sur l'histoire." />

      <ContentPage chapter="Section A — L'Impact de la Musique" accent={SEC} pageNum={19} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Qu'est-ce que l'Impact de la Musique ?</SH2>
        <Body>Avant de parler de streams, d'abonnés et de revenus — il faut comprendre pourquoi la musique existe. Pas la musique comme industrie. La musique comme force humaine fondamentale. Elle est l'un des seuls arts capables de toucher simultanément l'intellect, les émotions et l'âme.</Body>
        <InfoGrid color={SEC} cols={3} items={[
          { emoji: "💊", title: "La musique guérit", desc: "Des études scientifiques prouvent que la musique réduit la douleur, l'anxiété et la dépression. Elle est utilisée en thérapie dans les hôpitaux du monde entier.", badge: "Médical" },
          { emoji: "🤝", title: "La musique unit", desc: "Elle dépasse les barrières de langue, de tribu, de religion, de génération. Un concert est l'un des rares endroits où des milliers de personnes different coexistent en harmonie.", badge: "Social" },
          { emoji: "🔥", title: "La musique libère", desc: "Elle a alimenté des révolutions, renversé des régimes, donné une voix aux sans-voix. Fela Kuti, Bob Marley, Miriam Makeba — la musique comme arme de liberté.", badge: "Politique" },
          { emoji: "🙏", title: "La musique élève", desc: "Le gospel, le worship, la musique spirituelle — elle connecte l'humain au divin. Des millions de personnes ont rencontré Dieu à travers une chanson.", badge: "Spirituel" },
          { emoji: "🧠", title: "La musique forme", desc: "Elle éduque, transmet les valeurs d'une culture, enseigne l'histoire d'un peuple. Elle est la mémoire vivante d'une société.", badge: "Culturel" },
          { emoji: "💡", title: "La musique inspire", desc: "Elle pousse à l'action, donne de l'espoir, fait croire que les impossibles sont possibles. Elle a sauvé des vies qui voulaient s'arrêter.", badge: "Motivationnel" },
        ]} />
        <BigQuote
          text="Si tu ne comprends pas pourquoi tu fais de la musique, tes fans non plus. Mais si tu sais que ta musique peut changer une vie — même une seule — tu n'arrêteras jamais."
          author="Du Talent au Sommet — KEKELI Creative Agency"
          color={SEC}
        />
      </ContentPage>

      <ContentPage chapter="Section A — L'Impact de la Musique" accent={SEC} pageNum={20} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Artistes qui ont Changé le Monde par leur Musique</SH2>
        <Body>Ces artistes ne sont pas simplement devenus célèbres. Ils ont utilisé leur plateforme pour transformer des sociétés entières. Leur exemple est la preuve que la musique est bien plus qu'un divertissement — c'est une responsabilité.</Body>
        <MiniTable color={SEC}
          headers={["Artiste", "L'impact réel", "Ce que ça nous enseigne"]}
          rows={[
            ["Fela Kuti (Nigeria)", "A dénoncé la dictature militaire nigériane par la musique. Emprisonné 200 fois, jamais brisé. L'afrobeat est né de cette résistance.", "La musique peut tenir tête au pouvoir. Ton art a le droit d'être courageux."],
            ["Bob Marley (Jamaïque)", "A réuni les deux partis politiques jamaïcains en guerre lors d'un concert de paix (1978). Sa musique a traversé 150 pays.", "Une chanson peut arrêter une guerre. L'universalité est une force."],
            ["Miriam Makeba (Afrique du Sud)", "Sa musique a contribué à internationaliser la lutte contre l'apartheid. Bannie de son pays 30 ans, elle a chanté devant l'ONU.", "L'artiste peut parler au nom de tout un peuple. Ta voix porte plus loin que tu ne le crois."],
            ["Youssou N'Dour (Sénégal)", "A milité pour l'annulation de la dette africaine, a chanté contre le sida quand c'était tabou. A utilisé sa célébrité pour des causes qui dépassent la musique.", "Le sommet donne du pouvoir. Le vrai artiste pro le met au service du bien commun."],
            ["Kirk Franklin (USA)", "A parlé publiquement de sa dépendance à la pornographie, de ses luttes intérieures. Sa transparence a sauvé des vies — des milliers lui ont écrit pour dire que sa musique les avait empêchés de se suicider.", "La vulnérabilité authentique est plus puissante que la perfection. Ton témoignage est ton arme la plus forte."],
            ["Nathaniel Bassey (Nigeria)", "Le Hallelujah Challenge (Live Instagram prière à minuit) a rassemblé des millions de personnes en Afrique et dans la diaspora, ramenant des gens à la foi.", "Une simple intention sincère, un outil digital — et tu peux créer un mouvement continental."],
          ]}
        />
        <Callout color={SEC} title="La question que chaque artiste doit se poser"
          text="Qu'est-ce que ma musique change dans la vie de ceux qui l'écoutent ? Si tu ne peux pas répondre à cette question, tu fais de la musique pour toi seul. Le vrai artiste pro fait de la musique pour les autres — et c'est précisément ce qui finit par le rendre immortel." />
      </ContentPage>

      <ContentPage chapter="Section A — L'Impact de la Musique" accent={SEC} pageNum={21} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'Impact du Gospel Africain : des Exemples Réels</SH2>
        <Body>Le gospel africain a un pouvoir d'impact particulier dans nos sociétés. Il parle à la fois à la foi, à la culture et à la communauté. Les artistes gospel qui ont compris ça ont construit des mouvements, pas seulement des carrières.</Body>
        <VerticalTimeline color={GOLD} events={[
          {
            year: "Dena Mwana",
            title: "Le gospel congolais francophone franchit les frontières",
            desc: "Ses chansons ont accompagné des milliers d'Africains de la diaspora dans leurs moments de douleur (exil, deuil, solitude). Elle a chanté pour des gens qui n'avaient plus d'autre lien avec leur culture d'origine que la foi.",
          },
          {
            year: "CeCe Winans",
            title: "40 ans de guérison émotionnelle par le gospel",
            desc: "Ses fans témoignent : «J'ai entendu Alabaster Box pendant le deuil de mon enfant. Je ne savais pas que Dieu pouvait toucher une douleur comme celle-là à travers une chanson.»",
          },
          {
            year: "Kirk Franklin",
            title: "La transparence qui a sauvé des vies",
            desc: "En parlant publiquement de son addiction, de sa douleur, de ses doutes — il a créé un espace de permission pour que des milliers d'autres chrétiens admettent leur propre lutte. Le tabou brisé, des vies sauvées.",
          },
          {
            year: "Lecrae",
            title: "Le rap chrétien dans les endroits où l'église n'allait pas",
            desc: "Sa musique a atteint des jeunes dans les prisons, les banlieues défavorisées, les cercles urbains qui ne mettraient jamais les pieds dans une église. Le message de foi là où personne ne l'attendait.",
          },
          {
            year: "Amset / Galsen Gospel Urbain",
            title: "La scène gospel sénégalaise comme espace de transformation",
            desc: "Créer un festival gospel au Sénégal, c'est créer un espace où des jeunes qui ne connaissent pas la foi la rencontrent à travers une musique qu'ils reconnaissent comme la leur.",
          },
        ]} />
        <Callout color={GOLD} title="L'impact commence avant la célébrité"
          text="Aucun des artistes cités n'a attendu d'être célèbre pour avoir un impact. Leur impact a commencé avec leur première chanson sincère. Fela Kuti jouait dans des clubs locaux avant de changer le Nigeria. Nathaniel Bassey faisait de petits lives avant le Hallelujah Challenge. Ton impact commence maintenant, avec ce que tu as." />
      </ContentPage>

      <ContentPage chapter="Section A — L'Impact de la Musique" accent={SEC} pageNum={22} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment Construire ton Impact Intentionnellement</SH2>
        <Body>L'impact ne se construit pas par accident. Les artistes dont on parle encore 30 ans après leur mort n'ont pas juste fait de la bonne musique — ils ont eu une intention claire sur l'effet qu'ils voulaient produire dans le monde. Voici comment définir et construire ton impact de façon intentionnelle.</Body>
        <SH3 color={SEC}>Étape 1 — Définis ton impact en une phrase</SH3>
        <Body>Cette phrase est différente de ta phrase d'ADN artistique. Elle répond à : <strong>"Qu'est-ce que je veux que le monde soit différent parce que j'ai existé et fait de la musique ?"</strong></Body>
        <div style={{ padding: "12px 14px", borderRadius: "10px", background: `${SEC}08`, border: `1px solid ${SEC}25`, margin: "8px 0" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: SEC, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Exemples de phrases d'impact</p>
          <BulletList color={SEC} items={[
            { bold: "Amset :", text: "«Je veux que les jeunes chrétiens sénégalais soient fiers de leur foi à travers une musique moderne qui leur ressemble vraiment.»" },
            { bold: "Artiste afrobeats :", text: "«Je veux que l'Afrique de l'Ouest soit vue comme un creuset culturel puissant, pas comme un continent en difficulté.»" },
            { bold: "Artiste hip-hop social :", text: "«Je veux que la jeunesse de Dakar comprenne qu'elle peut changer son destin par l'éducation et l'ambition.»" },
          ]} />
        </div>
        <SH3 color={SEC}>Les 4 niveaux d'impact de l'artiste</SH3>
        <MiniTable color={SEC}
          headers={["Niveau", "Zone d'impact", "Comment y contribuer"]}
          rows={[
            ["Niveau 1 — Individuel", "Changer la vie d'une personne à la fois", "Répondre aux messages, témoigner, rester accessible"],
            ["Niveau 2 — Communautaire", "Transformer un quartier, une église, une ville", "Concerts locaux, collaborations sociales, mentorat artistes"],
            ["Niveau 3 — National", "Devenir une voix de ta génération", "Médias, engagements publics, positionnement sur les sujets qui comptent"],
            ["Niveau 4 — Continental", "Représenter l'Afrique au monde", "Distribution internationale, scènes mondiales, diaspora touchée"],
          ]}
        />
        <Checklist color={SEC} title="Questions à te poser chaque année sur ton impact" items={[
          "Ai-je reçu des témoignages de personnes dont ma musique a changé la vie ?",
          "Est-ce que ma plateforme est utilisée pour des causes qui dépassent ma carrière ?",
          "Ai-je formé ou aidé un artiste plus jeune que moi cette année ?",
          "Est-ce que ma communauté sait clairement ce que je représente et défends ?",
          "Dans 20 ans, qu'est-ce que les gens diront de l'impact de ma musique ?",
        ]} />
      </ContentPage>

      <ContentPage chapter="Section A — L'Impact de la Musique" accent={SEC} pageNum={23} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Toi, Futur Exemple pour les Artistes qui Viennent</SH2>
        <Body>Ce livre a été écrit avec une conviction profonde : <strong>les artistes qui vont suivre ce guide deviendront eux-mêmes des exemples pour la génération suivante.</strong> C'est l'intention derrière chaque page — pas juste te donner des outils, mais t'aider à construire un héritage.</Body>
        <Banner text="Dans 10 ans, un artiste qui débutera lira peut-être un guide écrit par toi." sub="Tout ce que tu apprends aujourd'hui, tu le transmettras demain. C'est le cycle de l'excellence." color={SEC} dark />
        <SH3 color={SEC}>Ce que font déjà les artistes d'impact pour préparer la prochaine génération</SH3>
        <BulletList color={SEC} items={[
          { bold: "Youssou N'Dour :", text: "A créé le studio Xippi à Dakar pour que les artistes sénégalais aient accès à des équipements professionnels. Un artiste au sommet qui construit l'infrastructure pour ceux qui viennent." },
          { bold: "Kirk Franklin :", text: "Mentor actif pour des dizaines d'artistes gospel plus jeunes. Son label Fo Yo Soul a lancé des carrières entières. Il partage ses connaissances sans les cacher." },
          { bold: "Amset & Galsen Gospel Urbain :", text: "Créer un festival dédié aux artistes gospel émergents, c'est déjà construire un tremplin pour la prochaine génération. L'impact commence maintenant, avec ce que tu fais déjà." },
          { bold: "Lecrae :", text: "Partage publiquement ses stratégies, ses chiffres, ses erreurs. Il a démystifié l'industrie pour une génération entière d'artistes chrétiens." },
          { bold: "Nathaniel Bassey :", text: "A transformé un simple live de prière en mouvement mondial. Il a prouvé que n'importe quel artiste avec une intention sincère peut créer quelque chose de plus grand que lui-même." },
        ]} />
        <Testimony
          text="Ce que je veux, c'est qu'un jour un jeune artiste gospel du Sénégal tienne ce livre entre ses mains et se dise : «C'est grâce à ce guide que j'ai compris comment bâtir ma carrière.» Et que ce jeune artiste, à son tour, transmette à d'autres. C'est ça l'impact durable."
          author="Amset"
          role="Artiste Gospel Pro · Fondateur du Galsen Gospel Urbain · Sunu Impact Festival · Dakar, Sénégal"
          color={SEC}
        />
        <Callout color={SEC} title="Tu seras l'exemple que tu cherches aujourd'hui"
          text="Les artistes dont tu lis le parcours dans ce livre ont tous été, un jour, à ta place exacte — cherchant un guide, un exemple, quelqu'un qui avait déjà tracé le chemin. Ce guide existe parce que ces exemples ont existé. Ton chemin existe pour que les suivants n'aient pas à tout réinventer." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION B — LA SANTÉ DE L'ARTISTE PRO (P24–P27)                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={0} title="SECTION B — Prends Soin de Toi pour Durer" accent={GRN} pageNum={24} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste dont la santé est brisée ne peut rien créer. La carrière la plus brillante peut s'effondrer en quelques mois si l'artiste ne prend pas soin de lui. Ce chapitre parle de ce dont personne ne parle — et qui pourtant conditionne tout le reste." />

      <ContentPage chapter="Section B — La Santé de l'Artiste Pro" accent={GRN} pageNum={25} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La Santé Mentale de l'Artiste : le Sujet Tabou</SH2>
        <Body>Les études sont claires : <strong>73% des artistes professionnels souffrent d'anxiété ou de dépression</strong> à un moment de leur carrière. Pourtant, dans l'industrie musicale africaine, ce sujet est presque totalement absent des conversations. On parle de streams, de cachets, de followers — jamais de ce que ressent vraiment l'artiste derrière l'écran.</Body>
        <MiniTable color={GRN}
          headers={["Défi mental", "Pourquoi ça arrive", "Comment le gérer pro"]}
          rows={[
            ["Le syndrome de l'imposteur", "«Je ne mérite pas ce succès / Je ne suis pas assez bon»", "Documenter ses progrès, relire ses témoignages positifs, thérapie"],
            ["La comparaison toxique", "Voir les succès des autres sur les réseaux, se sentir en retard", "Désactiver les notifs, comparer ton présent à ton passé seulement"],
            ["La peur du jugement", "Publier un son et avoir peur des critiques — parfois ne pas publier du tout", "Comprendre que la critique est le signe que tu existes artistiquement"],
            ["La pression de la constance", "Devoir publier tous les jours épuise émotionnellement", "Préparer du contenu en avance, avoir des jours sans création"],
            ["La solitude créative", "Créer seul, douter seul, gérer ses échecs seul", "Trouver une communauté d'artistes (Galsen Gospel Urbain, ateliers KEKELI)"],
            ["Le burnout post-succès", "Après un succès, vide émotionnel profond", "Anticiper ce vide, se reposer activement, ne pas enchaîner immédiatement"],
          ]}
        />
        <Callout color={GRN} title="Des artistes qui ont parlé de leur santé mentale"
          text="Kirk Franklin a parlé de sa dépendance et de sa souffrance intérieure. Lecrae a documenté publiquement sa dépression et son PTSD. Kanye West a exposé ses crises bipolaires. Naomi Judd a perdu la vie à la dépression. Ces témoignages ne sont pas des faiblesses — ce sont des actes de courage qui ont sauvé d'autres vies. Parler de ta santé mentale est un acte de leadership, pas une admission de faiblesse." />
      </ContentPage>

      <ContentPage chapter="Section B — La Santé de l'Artiste Pro" accent={GRN} pageNum={26} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La Santé Vocale & Physique : ton Instrument, c'est toi</SH2>
        <Body>Aucun musicien ne laisserait sa guitare se dégrader. Mais beaucoup d'artistes traitent leur voix et leur corps avec bien moins de soin qu'un simple instrument. Pourtant, ta voix est ton capital le plus précieux — et il est irremplaçable.</Body>
        <SH3 color={GRN}>Prendre soin de sa voix : les règles d'or</SH3>
        <InfoGrid color={GRN} cols={2} items={[
          { emoji: "💧", title: "L'hydratation", desc: "Boire 2-3 litres d'eau par jour minimum. Eau tiède avant et pendant les sessions. Jamais d'alcool ni de soda avant d'enregistrer ou de performer.", badge: "Quotidien" },
          { emoji: "🌡️", title: "L'échauffement vocal", desc: "15-20 minutes d'exercices vocaux avant chaque session studio ou concert. Un sportif s'échauffe — un chanteur aussi.", badge: "Avant chaque session" },
          { emoji: "😴", title: "Le sommeil réparateur", desc: "7-8 heures de sommeil minimum. La voix se répare pendant le sommeil. Privation = voix fatiguée, moins puissante, moins juste.", badge: "Chaque nuit" },
          { emoji: "🤧", title: "La prévention maladie", desc: "Éviter le contact prolongé avec des personnes malades avant un concert ou enregistrement. Protéger sa gorge (écharpe en saison fraîche).", badge: "Protection" },
          { emoji: "🚫", title: "Les ennemis de la voix", desc: "Crier sans nécessité, chuchoter longtemps (pire que crier), fumer, lait avant de chanter, air conditionné trop froid.", badge: "À éviter" },
          { emoji: "🏃", title: "La forme physique", desc: "L'endurance physique améliore directement les performances scéniques. Marcher, nager, exercices de respiration — l'artiste athlète dure plus longtemps.", badge: "3x/semaine" },
        ]} />
        <Divider color={GRN} />
        <SH3 color={GRN}>Le repos créatif : une nécessité, pas une paresse</SH3>
        <Body>La créativité n'est pas un robinet qui coule en permanence. Elle se recharge. Les artistes les plus prolifiques de l'histoire avaient tous des rituels de repos créatif — des périodes intentionnelles où ils ne créaient pas pour mieux revenir.</Body>
        <BulletList color={GRN} items={[
          { bold: "1 jour complet sans musique :", text: "Par semaine — pas de création, pas d'analyse, pas de réseaux liés à la musique" },
          { bold: "1 semaine de déconnexion :", text: "Par trimestre — voyager, lire, vivre des expériences nouvelles qui nourriront ta prochaine création" },
          { bold: "Les activités créatives non musicales :", text: "Peindre, photographier, écrire, cuisiner — stimuler la créativité autrement" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Section B — La Santé de l'Artiste Pro" accent={GRN} pageNum={27} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La Santé Spirituelle : la Source de l'Artiste Gospel</SH2>
        <Body>Pour l'artiste gospel, la santé spirituelle n'est pas séparable de la santé artistique. Ta musique vient de ce que tu vis avec Dieu. Quand la source spirituelle se tarit, la créativité suit. Quand elle est vive, l'inspiration est inépuisable.</Body>
        <InfoGrid color={GOLD} cols={2} items={[
          { emoji: "📖", title: "La vie dévotionnelle", desc: "Lire la Parole quotidiennement nourrit l'inspiration du chanteur gospel. Les plus grands textes de gospel sont nés de méditations bibliques profondes.", badge: "Fondation" },
          { emoji: "🙏", title: "La prière personnelle", desc: "Pas la prière pour le public ou les réseaux — la prière intime, honnête, non performée. C'est là que naissent les vrais cantiques.", badge: "Intimité" },
          { emoji: "👥", title: "La communauté spirituelle", desc: "Rester ancré dans une communauté de foi qui te connaît avant ta carrière. Elle te garde honnête et équilibré.", badge: "Ancrage" },
          { emoji: "🌱", title: "La croissance spirituelle", desc: "Continuer à se former : lectures, retraites spirituelles, mentors de foi. La profondeur spirituelle se retrouve dans la profondeur artistique.", badge: "Développement" },
        ]} />
        <Testimony
          text="Quand je ne suis pas bien spirituellement, mes sons le reflètent. Quand je suis dans la Parole et la prière, je crée différemment. Mon réservoir de créativité est directement connecté à mon intimité avec Dieu. C'est mon secret le plus concret."
          author="Amset"
          role="Artiste Gospel Pro · Dakar, Sénégal"
          color={GOLD}
        />
        <Divider color={GRN} />
        <SH3 color={GRN}>Les 10 habitudes de l'artiste qui dure — le triangle santé complet</SH3>
        <NumberedList color={GRN} items={[
          "DORMIR 7-8 heures — pas négociable si tu veux rester créatif et performant sur le long terme",
          "BOIRE de l'eau en quantité — surtout si tu chantes. La voix est 70% hydratation.",
          "FAIRE DE L'EXERCICE 3 fois par semaine — l'endurance physique améliore les performances scéniques",
          "MÉDITER ou PRIER chaque matin avant de toucher ton téléphone — protège l'espace créatif interne",
          "LIRE des livres (pas des fils d'actualité) — nourrir l'intellect enrichit les textes et la vision",
          "PASSER DU TEMPS avec des non-artistes — éviter la chambre d'écho créative, s'alimenter à d'autres réalités",
          "PARLER de tes émotions — avec un ami de confiance, un mentor, un thérapeute. Le silence tue plus d'artistes que les critiques.",
          "FIXER DES LIMITES numériques — heures sans réseaux, notifications désactivées pendant la création",
          "CÉLÉBRER tes victoires — même petites. Le cerveau de l'artiste a besoin de reconnaissance, même venant de soi-même.",
          "PLANIFIER des vacances créatives — 1 semaine par trimestre minimum sans production, sans réseaux. La recharge n'est pas du temps perdu.",
        ]} />
      </ContentPage>

      <ContentPage chapter="Section B — La Santé de l'Artiste Pro" accent={GRN} pageNum={28} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Quand la Célébrité Arrive : Gérer la Notoriété</SH2>
        <Body>La célébrité est l'objectif de beaucoup d'artistes. Mais très peu sont préparés à ce qu'elle apporte réellement. La notoriété est à la fois un cadeau et une épreuve. Les artistes qui la gèrent bien durent. Les autres disparaissent en quelques années, souvent brisés.</Body>
        <CaseStudy
          title="Deux artistes face à la célébrité soudaine"
          color={GRN}
          left={{
            label: "❌ L'artiste non préparé",
            emoji: "😵",
            items: [
              "Suit tous les follwers et lit tous les commentaires",
              "Répond aux haters publiquement, s'épuise",
              "Dépense les premiers revenus en luxe visible",
              "S'isole de ses amis d'avant, s'entoure de flatteurs",
              "Change son image pour plaire à plus de monde",
              "Perd son fil créatif en voulant reproduire le succès",
              "Craque mentalement en 18 mois",
            ],
            result: "Burnout, dettes, perte d'authenticité, disparition du radar"
          }}
          right={{
            label: "✅ L'artiste préparé",
            emoji: "🌟",
            items: [
              "Désactive les notifications, filtre ses lectures",
              "A une équipe qui gère la relation public",
              "Garde 3 amis d'avant la célébrité pour la vérité",
              "Investit les premiers revenus avant de les dépenser",
              "Reste fidèle à son positionnement artistique initial",
              "Continue ses habitudes de santé malgré le succès",
              "Consulte un coach ou thérapeute préentivement",
            ],
            result: "Carrière qui dure 10 ans+, revenus qui croissent, santé préservée"
          }}
        />
        <SH3 color={GRN}>Les pièges spécifiques de la célébrité africaine</SH3>
        <BulletList color={GRN} items={[
          { bold: "La pression familiale :", text: "Au Sénégal, le succès d'un enfant devient automatiquement la responsabilité financière de toute la famille élargie. Définir des limites claires dès le départ." },
          { bold: "Les «faux proches» :", text: "Ceux qui apparaissent quand le succès arrive. Garder les amis d'avant. Ils te connaissent toi, pas ta notoriété." },
          { bold: "La pression de reproduire le succès :", text: "Après un hit, l'obligation de faire pareil ou mieux. Résister à cette pression pour rester créatif librement." },
          { bold: "La comparaison des revenus :", text: "La culture sénégalaise rend parfois la richesse visible obligatoire. C'est un piège financier majeur — dépenser pour paraître riche empêche de devenir réellement riche." },
        ]} />
        <Callout color={GRN} title="Prépare-toi au succès avant qu'il arrive"
          text="Les problèmes de la célébrité se gèrent mieux si on y a réfléchi avant. Décide maintenant : qui aura accès à toi ? Comment tu géreras les critiques ? Combien tu mettras de côté sur chaque cachet ? Quelles limites familiales tu poseras ? Ces décisions prises à froid, en dehors du succès, sont infiniment plus sages que celles prises dans l'euphorie du moment." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE PRO 01                                      */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={1} title="PRO 01 — Pense comme un Artiste Pro" accent={ACC} pageNum={9} total={TOTAL} guideLabel={LABEL}
        hook="La seule différence entre un artiste amateur et un artiste professionnel ne se trouve pas dans le studio — elle se trouve dans la tête. Voici comment reprogrammer ta façon de penser pour construire une vraie carrière." />

      <ContentPage chapter="Module 01 — Mindset" accent={ACC} pageNum={9} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Artiste Amateur vs Artiste Professionnel</SH2>
        <Body>La différence entre un artiste qui réussit et un artiste qui abandonne n'est presque jamais une question de talent. C'est une question de mentalité.</Body>
        <MiniTable color={ACC}
          headers={["Artiste Amateur", "Artiste Professionnel"]}
          rows={[
            ["Attend d'être \"prêt\"", "Commence imparfait et améliore en chemin"],
            ["\"Ma musique parle d'elle-même\"", "Crée ET communique chaque jour"],
            ["Mesure le succès par les likes", "Mesure par les revenus et la croissance"],
            ["Investit 0 FCFA, attend des millions", "Investit stratégiquement, mesure le ROI"],
            ["Juste sortir une chanson", "Préparer une campagne de lancement"],
            ["Pense court terme (le buzz)", "Pense long terme (la carrière)"],
            ["Travaille seul, refuse les conseils", "S'entoure de professionnels"],
            ["Dépend d'un seul revenu", "Diversifie ses 10 sources de revenus"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="PRO 01 — Mindset Pro" accent={ACC} pageNum={10} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>PRO vs Amateur : Le Grand Comparatif</SH2>
        <Body>Deux artistes sortent leur premier single le même jour depuis Dakar. Même niveau de talent, même genre musical, même budget de départ. Voici pourquoi l'un devient pro et l'autre abandonne.</Body>
        <CaseStudy
          title="Même point de départ — Résultats radicalement différents après 12 mois"
          subtitle="Deux artistes gospel dakarois, lancés en janvier 2026"
          color={ACC}
          left={{
            label: "❌ L'Amateur — Moussa",
            emoji: "😔",
            items: [
              "Enregistre en studio un samedi",
              "Envoie le lien à 15 amis WhatsApp",
              "Poste sur Facebook une fois, sans image",
              "Attend que les gens partagent naturellement",
              "Déçu après 2 semaines : 47 vues YouTube",
              "«Les gens ne soutiennent pas les artistes»",
              "Abandonne après 3 singles sans résultat",
            ],
            result: "Après 12 mois : 340 vues YouTube, 0 revenu musical, abandon"
          }}
          right={{
            label: "✅ Le Pro — Ibrahima",
            emoji: "🚀",
            items: [
              "Prépare 3 semaines avant : teasing TikTok quotidien",
              "Construit liste WhatsApp 300 fans avant la sortie",
              "Artwork, bio Spotify, pitch éditorial soumis",
              "Jour J : notification à 300 contacts simultanément",
              "Semaine 2 : 50 000 FCFA YouTube Ads ciblés",
              "Semaine 3 : Meta Ads diaspora France/Italie",
              "2 collaborations avec artistes locaux",
            ],
            result: "Après 12 mois : 28 000 vues YT, 6 200 TikTok, 185 000 FCFA/mois"
          }}
        />
        <Body>La qualité musicale était identique. La seule différence : Ibrahima avait le mindset du pro. Il a traité son lancement comme un entrepreneur traite le lancement d'un produit commercial — avec un plan, un budget promotionnel, et une mesure des résultats.</Body>
        <Callout color={ACC} title="La leçon du pro"
          text="Ce n'est pas le marché qui est mauvais. Ce n'est pas le manque de soutien. C'est l'absence de stratégie. Les artistes qui disent «personne ne soutient les artistes ici» n'ont jamais créé les conditions pour être soutenus." />
      </ContentPage>

      <ContentPage chapter="Module 01 — Mindset" accent={ACC} pageNum={11} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 7 erreurs qui détruisent les carrières</SH2>
        <NumberedList color="#DC2626" items={[
          "ATTENDRE LA PERFECTION — Sortir dans 3 mois quand le son sera parfait. Résultat : ne jamais sortir.",
          "IGNORER LES DONNÉES — Ne jamais regarder ses analytics YouTube/TikTok pour comprendre ce qui marche.",
          "COPIER UN ARTISTE ÉTRANGER — Essayer d'être le \"Burna Boy sénégalais\" au lieu d'être soi-même.",
          "DÉPENSER TOUT EN PRODUCTION, RIEN EN PROMOTION — 200 000 FCFA de studio + 0 FCFA de publicité.",
          "CHANGER DE STYLE TOUS LES 3 MOIS — Perdre son audience à chaque nouveau virage artistique.",
          "NÉGLIGER SA COMMUNAUTÉ — Répondre aux commentaires seulement quand un artiste \"buzz\".",
          "TRAVAILLER SEUL — Refuser les collaborations, les managers, les agences par peur ou orgueil.",
        ]} />
        <Callout color={AMB} title="⚠️ L'erreur numéro 1 au Sénégal"
          text="Investir 150 000 à 500 000 FCFA dans un clip puis ne dépenser aucun budget en publicité. Un clip sans promotion ne se voit pas — même avec 4K et des effets visuels incroyables. La règle : dépense au minimum autant en promotion qu'en production." />
      </ContentPage>

      <ContentPage chapter="PRO 01 — Mindset Pro" accent={ACC} pageNum={12} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Objectifs Pro : Penser sur 1, 3 et 5 ans</SH2>
        <Body>Un artiste amateur vit dans le présent immédiat. Un artiste pro a une vision à long terme et des jalons précis. Sans objectifs chiffrés, il est impossible de savoir si tu progresses. Voici le plan de progression réaliste pour un artiste sénégalais émergent qui applique ce guide.</Body>
        <MiniTable color={ACC}
          headers={["Horizon", "Objectifs chiffrés du Pro"]}
          rows={[
            ["Année 1 — Poser les bases pro", "1 000 YT · 3 000 TikTok · 1er concert payant · 3 singles distribués · 300 contacts WhatsApp"],
            ["Année 2 — Développer les revenus", "10 000 YT · 10 000 TikTok · 300 000 FCFA/mois · 1er partenariat marque locale"],
            ["Année 3 — Conquérir la sous-région", "50 000 YT · Présence diaspora Europe · Concert solo Dakar · Tournée AOF débutée"],
            ["Année 4 — Sponsors et reconnaissance", "100 000 YT · Contrat sponsoring · Manager pro · 700 000 FCFA/mois"],
            ["Année 5 — Le statut Pro établi", "200 000+ YT · Tournée internationale · 1 000 000 FCFA/mois · Équipe complète"],
          ]}
        />
        <SH3 color={ACC}>La méthode SMART du Pro — 5 critères non négociables</SH3>
        <InfoGrid color={ACC} cols={3} items={[
          { emoji: "🎯", title: "Spécifique", desc: "«1 000 abonnés YouTube» — jamais «devenir connu»", badge: "S" },
          { emoji: "📊", title: "Mesurable", desc: "Un chiffre, une date, un résultat vérifiable", badge: "M" },
          { emoji: "✅", title: "Atteignable", desc: "Ambitieux mais réaliste vu ton point de départ", badge: "A" },
          { emoji: "🔗", title: "Relevant", desc: "Aligné avec ta vision à long terme", badge: "R" },
          { emoji: "⏰", title: "Temporel", desc: "Une deadline précise — pas «un jour»", badge: "T" },
          { emoji: "📝", title: "Écrit", desc: "Un objectif non écrit n'existe pas encore", badge: "+" },
        ]} />
        <Callout color={GRN} title="✅ Action Pro immédiate"
          text="Ce soir — pas demain, ce soir — écris tes 3 objectifs prioritaires pour les 12 prochains mois. Chaque objectif doit avoir un chiffre précis ET une date limite. Affiche-les là où tu les vois chaque matin. Relis-les avant chaque session de création ou de publication." />
      </ContentPage>

      <ContentPage chapter="PRO 01 — Mindset Pro" accent={ACC} pageNum={13} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Habitudes Quotidiennes du Pro</SH2>
        <Body>La différence entre un artiste qui progresse et un artiste qui stagne n'est pas le talent — c'est la constance des actions quotidiennes. Un pro ne se demande pas «est-ce que j'ai le temps» — il a des routines et les respecte. Voici le système d'habitudes des artistes qui réussissent.</Body>
        <MiniTable color={ACC}
          headers={["Habitude Pro", "Fréquence", "Résultat sur 365 jours"]}
          rows={[
            ["Publier du contenu (TikTok/Instagram/Shorts)", "Quotidien", "365 contenus = algorithme qui te connaît et te pousse"],
            ["Répondre à chaque commentaire et DM", "Quotidien", "Communauté engagée qui devient ambassadrice"],
            ["Analyser ses statistiques (analytics)", "Hebdomadaire", "Compréhension précise de ce qui marche pour toi"],
            ["Créer en studio ou en home studio", "3-4x/semaine", "Catalogue musical croissant — jamais en panne de contenu"],
            ["Contacter un professionnel du secteur", "Hebdomadaire", "Réseau professionnel solide au bout de 12 mois"],
            ["Lire sur le business musical/digital", "2x/semaine", "Compétences business toujours à jour"],
            ["Écouter et analyser les artistes de ta niche", "3x/semaine", "Veille artistique et inspiration stratégique"],
          ]}
        />
        <Banner text="La règle des 1% — la règle d'or du pro" sub="Améliore-toi de 1% chaque jour. Après 365 jours, tu es 37 fois meilleur. Les pros ne font pas de révolutions — ils font des progrès constants, tous les jours." color={ACC} />
        <Divider color={ACC} />
        <BigQuote
          text="La discipline est choisir entre ce que tu veux maintenant et ce que tu veux le plus."
          author="Principe de tout artiste qui dure"
          color={ACC}
        />
        <InfoGrid color={ACC} cols={3} items={[
          { emoji: "⏰", title: "Cohérence", desc: "Publier tous les jours, même imparfait, bat le perfectionnisme", badge: "Règle n°1" },
          { emoji: "📊", title: "Données", desc: "Décide sur les chiffres, pas sur les émotions ou les opinions", badge: "Règle n°2" },
          { emoji: "🤝", title: "Réseau", desc: "1 connexion professionnelle par semaine change une carrière", badge: "Règle n°3" },
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 2 — BRANDING (P14–P24)                     */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={2} title="PRO 02 — Construis ta Marque comme un Pro" accent={SEC} pageNum={14} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste amateur a un nom. Un artiste pro a une marque. La marque, c'est ce qui reste dans la tête des gens bien après que la musique s'est arrêtée. Voici comment la construire méthodiquement." />

      <ContentPage chapter="Module 02 — Branding" accent={SEC} pageNum={15} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Qu'est-ce que le branding artistique ?</SH2>
        <Body>Le branding est la somme de toutes les perceptions que les gens ont de toi. C'est ce qu'ils pensent de toi quand tu n'es pas dans la pièce, ce qu'ils disent de toi à leurs amis, l'image qui surgit immédiatement quand ils entendent ton nom.</Body>
        <MiniTable color={SEC}
          headers={["Artiste", "Perception immédiate"]}
          rows={[
            ["Wally Seck", "Générosité, tradition modernisée, famille, chaleur"],
            ["Dip Doundou Guiss", "Rue, authenticité, wolof pur, underground devenu mainstream"],
            ["Viviane Chidid", "Élégance, mbalax féminin, scène, prestige"],
            ["Nix", "International, afrobeats sénégalais, diaspora, danse"],
            ["Sidy Diop", "Romantisme, masses, accessibilité, wolof populaire"],
          ]}
        />
        <Body>Aucun de ces artistes n'a laissé son image au hasard. Chaque détail — le style vestimentaire, la langue utilisée, le type de clips, les collaborations — a construit cette perception.</Body>
        <Callout color={SEC} title="Le test de la perception"
          text="Demande à 5 personnes qui te connaissent musicalement : «Si tu devais me décrire en 3 mots à quelqu'un qui ne me connaît pas, tu dirais quoi ?». Si les réponses sont incohérentes entre elles, ton branding est flou." />
      </ContentPage>

      <ContentPage chapter="Module 02 — Branding" accent={SEC} pageNum={16} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 7 piliers du branding artistique</SH2>
        <NumberedList color={SEC} items={[
          "LE NOM — Court, mémorable, unique, fonctionne en wolof et en français, disponible sur toutes les plateformes.",
          "LE MESSAGE — Quel problème émotionnel résous-tu ? Qu'est-ce que tes fans ressentent en écoutant ta musique ?",
          "LES VALEURS — 5 valeurs qui définissent tout ce que tu crées. Exemple : Foi · Excellence · Authenticité · Discipline · Impact.",
          "LES COULEURS — 2 à 3 couleurs maximum. Elles doivent raconter quelque chose (noir + or = premium, vert + jaune = roots).",
          "LE STYLE VISUEL — Les gens doivent pouvoir te reconnaître sans lire ton nom sur les photos.",
          "LE TON DE COMMUNICATION — Es-tu inspirant ? Drôle ? Provocateur ? Enseignant ? Ce ton doit être constant.",
          "L'UNIVERS — Chaque publication, clip, flyer doit appartenir au même monde visuel et émotionnel.",
        ]} />
        <Callout color={GOLD} title="Exercice : La Phrase d'ADN"
          text={`Complète cette phrase : "Je suis un artiste qui aide _______ à ressentir _______ grâce à _______." Exemple : "Je suis un artiste qui aide les jeunes chrétiens sénégalais à retrouver l'espoir grâce au Gospel Urbain." Cette phrase devient ta boussole pour chaque décision artistique.`} />
      </ContentPage>

      <ContentPage chapter="Module 02 — Branding" accent={SEC} pageNum={17} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le positionnement : ta niche</SH2>
        <Body>La plus grande erreur en branding est d'essayer de plaire à tout le monde. Un artiste qui tente de toucher tout le monde ne touche personne vraiment.</Body>
        <TwoCol
          left={
            <RedBox>
              <BoxLabel color="#DC2626" text="❌ Positionnement flou" />
              <p style={{ fontFamily: F, fontSize: "10px", color: "#44403C", lineHeight: 1.6, margin: 0 }}>
                "Je fais de la musique africaine, mélange de mbalax, afrobeats et un peu de hip-hop, pour les jeunes et les adultes, au Sénégal et en Europe..."
              </p>
            </RedBox>
          }
          right={
            <GreenBox>
              <BoxLabel color="#16A34A" text="✅ Positionnement précis" />
              <p style={{ fontFamily: F, fontSize: "10px", color: "#166534", lineHeight: 1.6, margin: 0 }}>
                "Gospel Urbain pour les jeunes chrétiens sénégalais de 18 à 30 ans, avec un mélange wolof/français."
              </p>
            </GreenBox>
          }
        />
        <Divider color={SEC} />
        <SH3 color={SEC}>Les 5 questions de positionnement</SH3>
        <NumberedList color={SEC} items={[
          "Quel genre musical spécifique ? (pas \"africain\" — trop large)",
          "Pour qui exactement ? (âge, ville, valeurs, habitudes)",
          "Quelle émotion unique apportes-tu que les autres n'apportent pas ?",
          "Quel problème de ta communauté tu résous avec ta musique ?",
          "Pourquoi toi et pas un autre artiste de ton genre ?",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 02 — Branding" accent={SEC} pageNum={18} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les archétypes de marque</SH2>
        <Body>Chaque marque forte correspond à un archétype — une personnalité universelle que les gens reconnaissent et à laquelle ils s'attachent instinctivement. Identifie le tien.</Body>
        <MiniTable color={SEC}
          headers={["Archétype", "Caractéristiques", "Exemples africains"]}
          rows={[
            ["Le Leader", "Confiance, autorité, vision", "Youssou N'Dour"],
            ["Le Révolutionnaire", "Rupture, authenticité, contre-culture", "Dip Doundou Guiss"],
            ["Le Prophète / Sage", "Spiritualité, sagesse, message profond", "Artistes gospel"],
            ["Le Héros", "Courage, dépassement, triomphe", "Artistes afrotrap"],
            ["L'Amoureux", "Romance, séduction, émotion", "Sidy Diop, Wally Seck"],
            ["Le Joyeux / Entertainer", "Joie, fête, légèreté, énergie", "Artistes coupé-décalé"],
            ["Le Créateur", "Originalité, art, vision unique", "Nix, YaYa Diallo"],
          ]}
        />
        <Callout color={SEC} title="Ton archétype = ta boussole créative"
          text="Une fois ton archétype identifié, chaque décision créative devient plus facile : les clips à faire, les collaborations à accepter, le style vestimentaire, le ton de tes textes, la façon de parler sur les réseaux." />
      </ContentPage>

      <ContentPage chapter="Module 02 — Branding" accent={SEC} pageNum={19} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Créer son Avatar Fan</SH2>
        <Body>Un avatar fan est une description fictive mais précise de ton fan idéal. Chaque contenu que tu crées doit s'adresser à cette personne. Exemple pour un artiste Gospel Urbain :</Body>
        <div style={{ padding: "14px 16px", borderRadius: "10px", background: `${SEC}0A`, border: `1px solid ${SEC}25`, margin: "8px 0" }}>
          <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 800, color: SEC, margin: "0 0 8px", letterSpacing: "0.05em" }}>AVATAR : AWA, 22 ANS</p>
          <BulletList color={SEC} items={[
            { bold: "Vit à :", text: "Dakar (Parcelles Assainies)" },
            { bold: "Études :", text: "Étudiante en commerce à l'UCAD" },
            { bold: "Croit en :", text: "Dieu, famille, excellence personnelle" },
            { bold: "Réseaux :", text: "TikTok (1h/jour), Instagram, YouTube, WhatsApp" },
            { bold: "Écoute :", text: "Gospel moderne, Afrobeats, musique EDM chrétienne" },
            { bold: "Problème :", text: "Veut de la musique moderne qui correspond à ses valeurs" },
            { bold: "Rêve :", text: "Trouver sa voie, voyager, être une femme accomplie" },
            { bold: "Dépense :", text: "Données internet, concerts, tenues pour les cérémonies" },
          ]} />
        </div>
        <Body>Désormais, avant chaque publication, tu te demandes : <strong>"Est-ce qu'Awa aimerait ça ? Est-ce que ça lui parle ?"</strong></Body>
        <Callout color={GRN} title="✅ Action immédiate"
          text='Crée ton avatar fan sur une feuille. Donne-lui un prénom, un âge, une ville, 3 valeurs, 3 plateformes, et "son problème que ta musique résout". Garde cette fiche visible en permanence.' />
      </ContentPage>

      <ContentPage chapter="Module 02 — Branding" accent={SEC} pageNum={20} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La charte graphique artistique</SH2>
        <Body>Ta charte graphique est le document qui définit tous les éléments visuels de ta marque. Elle garantit que ton feed Instagram, tes flyers, tes clips et tes pochettes d'albums racontent la même histoire.</Body>
        <NumberedList color={SEC} items={[
          "LOGO / SIGNATURE — Peut être simplement ton nom stylisé. Doit être lisible en petit (photo de profil) et en grand (bannière).",
          "PALETTE DE COULEURS — Couleur principale + 1 ou 2 couleurs secondaires. Jamais plus de 3. Choisir avec intention (ex : violet + or = spiritualité + prestige).",
          "TYPOGRAPHIES — 1 police pour les titres (expressif), 1 pour les textes (lisible). Max 2 polices.",
          "STYLE PHOTO — Définir les types de cadrage, la lumière (naturelle/studio), les décors récurrents, les tenues.",
          "ÉLÉMENTS GRAPHIQUES — Motifs récurrents, textures, icônes. Exemple : éléments wax, calligraphie arabe, géométrie africaine.",
          "TON VISUEL — Lumineux et coloré, ou sombre et contrasté ? Défini une fois pour toutes.",
        ]} />
        <Callout color={GOLD} title="🇸🇳 Conseil sénégalais"
          text="Intègre des éléments culturels locaux réinterprétés de façon contemporaine : tissu wax en fond, architecture de Dakar (Plateau, Médina), couchers de soleil sur la Corniche. Ton identité sénégalaise est ta force différenciante à l'international — ne la cache pas, amplifie-la." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 3 — DIRECTION ARTISTIQUE (P21–P27)         */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={3} title="PRO 03 — Ta Direction Artistique Professionnelle" accent={GOLD} pageNum={21} total={TOTAL} guideLabel={LABEL}
        hook="Les artistes pros ne publient jamais au hasard. Chaque image, chaque clip, chaque flyer appartient au même univers. C'est ça la direction artistique — et c'est ce qui transforme un artiste en marque reconnaissable." />

      <ContentPage chapter="Module 03 — Direction artistique" accent={GOLD} pageNum={22} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Définir son ADN artistique</SH2>
        <Body>La direction artistique répond à une question simple : <strong>"À quoi ressemble mon monde artistique ?"</strong></Body>
        <InfoGrid color={GOLD} cols={2} items={[
          { emoji: "🎨", title: "Esthétique visuelle", desc: "Couleurs dominantes, textures, lumière, décors de tes clips et photos.", badge: "Pilier 1" },
          { emoji: "🎵", title: "Identité sonore", desc: "Instruments signature, rythmiques récurrentes, sons distinctifs.", badge: "Pilier 2" },
          { emoji: "📖", title: "Narrativité", desc: "Thèmes récurrents : spiritualité, famille, amour, résistance, joie.", badge: "Pilier 3" },
          { emoji: "🎭", title: "Présence scénique", desc: "Ton look, tes mouvements, ton rapport au public en live.", badge: "Pilier 4" },
        ]} />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Le moodboard : ton outil n°1</SH3>
        <Body>Avant chaque projet, crée un moodboard — un dossier d'images qui définit visuellement la direction à suivre. Utilise <strong>Pinterest</strong> ou <strong>Canva</strong>.</Body>
        <Banner
          text={`Exemple — EP "Gospel Urbain Nocturne" par Amset`}
          sub="Moodboard : photos Dakar la nuit, bougies, couleurs bordeaux + or, références Justin Bieber Changes + Cece Winans + esthétique africaine moderne. Partagé avec le photographe, le vidéaste et le graphiste AVANT tout tournage."
          color={GOLD}
        />
        <Callout color={GOLD} title="Règle d'or"
          text="Un moodboard n'est pas optionnel. Sans lui, chaque membre de ton équipe a une vision différente de ton projet. Avec lui, tout le monde parle le même langage visuel." />
      </ContentPage>

      <ContentPage chapter="Module 03 — Direction artistique" accent={GOLD} pageNum={23} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La cohérence : ton actif le plus précieux</SH2>
        <Body>La cohérence sur la durée est ce qui transforme un artiste en marque. Elle crée la confiance et la reconnaissance chez tes fans.</Body>
        <MiniTable color={GOLD}
          headers={["Élément", "Cohérence requise", "Conséquence si incohérent"]}
          rows={[
            ["Feed Instagram", "Même palette, même ambiance", "Profil qui paraît amateur"],
            ["Couvertures", "Style graphique identifiable", "Artiste sans identité claire"],
            ["Tenues/looks", "Cohérent avec l'archétype", "Image confuse, non mémorable"],
            ["Thèmes des textes", "Fil conducteur musical", "Fans perdus à chaque sortie"],
            ["Ton sur les réseaux", "Voix reconnaissable", "Pas de personnalité distincte"],
          ]}
        />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>La règle des saisons artistiques</SH3>
        <Body>Organise ta carrière en "saisons" de 6 à 12 mois. Chaque saison a son propre univers visuel cohérent, mais l'ADN global reste le même. C'est ce que font les plus grands : Beyoncé (Renaissance), Drake (certifications), Burna Boy (Space Drift).</Body>
        <Callout color={SEC} title="Application au Sénégal"
          text={`Décide d'une "saison" pour ton prochain EP : définis 1 thème, 1 palette de couleurs, 1 état d'esprit. Tous tes contenus (posts, clips, photos promo) pour cette saison respectent cette direction. C'est ce qui crée l'impression d'un artiste professionnel.`} />
      </ContentPage>

      <ContentPage chapter="Module 03 — Direction artistique" accent={GOLD} pageNum={24} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Travailler avec un directeur artistique</SH2>
        <Body>Une fois que tu as les moyens, l'investissement dans un directeur artistique ou une agence créative est l'un des plus rentables de ta carrière. Voici ce qu'il faut savoir avant de contacter une agence.</Body>
        <SH3 color={GOLD}>Ce que tu dois préparer avant de rencontrer une agence</SH3>
        <NumberedList color={GOLD} items={[
          "Ton ADN artistique formalisé (la phrase, les valeurs, le genre)",
          "Ton avatar fan décrit précisément",
          "3 à 5 artistes dont tu aimes l'esthétique visuelle (pas forcément musicale)",
          "Un budget approximatif (sois honnête — ça aide à prioriser)",
          "Tes projets à venir sur 6 mois (EP, clip, concert, collaboration)",
        ]} />
        <MiniTable color={GOLD}
          headers={["Service", "Budget indicatif (FCFA)"]}
          rows={[
            ["Charte graphique complète", "75 000 — 300 000"],
            ["Logo + éléments visuels", "50 000 — 150 000"],
            ["Shooting photo pro (demi-journée)", "50 000 — 200 000"],
            ["Direction artistique EP complet", "200 000 — 800 000"],
            ["Templates réseaux sociaux (Canva)", "30 000 — 100 000"],
          ]}
        />
        <Callout color={GRN} title="💡 Conseil budget serré"
          text="Si ton budget est limité, priorise dans cet ordre : (1) photo presse professionnelle, (2) logo/signature visuelle, (3) palette de couleurs et charte graphique. Ces 3 éléments te donnent 80% de l'impact visuel." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 4 — PRODUCTION MUSICALE (P25–P32)          */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={4} title="PRO 04 — Produis comme un Professionnel" accent={AMB} pageNum={25} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste amateur dépense tout son budget en studio et sort sans promotion. Un artiste pro planifie chaque centime, choisit ses investissements avec précision, et lance chaque son comme un chef de projet lance un produit." />

      <ContentPage chapter="Module 04 — Production" accent={AMB} pageNum={26} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le budget de production réaliste au Sénégal</SH2>
        <Body>Voici les fourchettes de prix réels à Dakar en 2026 pour une production musicale professionnelle.</Body>
        <MiniTable color={AMB}
          headers={["Poste", "Budget Entrée", "Budget Pro", "Budget Premium"]}
          rows={[
            ["Beat (non-exclusif)", "5 000", "15 000 — 50 000", "—"],
            ["Beat (exclusif)", "25 000", "75 000 — 150 000", "250 000+"],
            ["Studio d'enregistrement (session)", "20 000", "50 000 — 100 000", "150 000+"],
            ["Mixage", "25 000", "75 000 — 150 000", "250 000+"],
            ["Mastering", "15 000", "50 000 — 100 000", "150 000+"],
            ["Artwork / cover", "10 000", "35 000 — 75 000", "150 000+"],
            ["Clip vidéo", "100 000", "500 000 — 1 500 000", "3 000 000+"],
            ["Shooting photo pro", "50 000", "100 000 — 200 000", "400 000+"],
          ]}
        />
        <Callout color={AMB} title="La règle d'or de la production"
          text="Si ton budget total est de 200 000 FCFA, investis maximum 100 000 FCFA en production et garde 100 000 FCFA pour la promotion et la publicité. Un son excellent sans promotion ne dépasse pas 500 vues. Un son moyen avec une bonne stratégie peut atteindre 100 000 vues." />
      </ContentPage>

      <ContentPage chapter="Module 04 — Production" accent={AMB} pageNum={27} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Choisir un beat</SH2>
        <SH3 color={AMB}>Beat non-exclusif vs Beat exclusif</SH3>
        <TwoCol
          left={
            <div style={{ padding: "10px", borderRadius: "8px", background: "#FFFBEB", border: "1px solid #FDE68A" }}>
              <BoxLabel color="#92400E" text="Non-exclusif" />
              <BulletList color="#B45309" items={[
                { text: "Plusieurs artistes peuvent l'utiliser" },
                { text: "Prix : 5 000 — 50 000 FCFA" },
                { text: "Idéal pour débuter, tester" },
                { text: "Ne pas utiliser pour ton single principal" },
                { text: "Risque : un autre artiste sort avant toi" },
              ]} />
            </div>
          }
          right={
            <GreenBox>
              <BoxLabel color="#16A34A" text="Exclusif" />
              <BulletList color={GRN} items={[
                { text: "Tu es le seul à pouvoir l'utiliser" },
                { text: "Prix : 25 000 — 250 000 FCFA" },
                { text: "Obligatoire pour tes singles majeurs" },
                { text: "Surtout si tu fais de la pub dessus" },
                { text: "Protège ton investissement" },
              ]} />
            </GreenBox>
          }
        />
        <Divider color={AMB} />
        <SH3 color={DARK}>Où trouver des beats de qualité</SH3>
        <BulletList color={AMB} items={[
          { bold: "BeatStars :", text: "plateforme internationale, centaines de beats afrobeats/trap/gospel" },
          { bold: "Airbit :", text: "similaire à BeatStars, bonne sélection africaine" },
          { bold: "Producteurs locaux :", text: "les meilleurs beats africains viennent souvent de Dakar, Abidjan, Lagos — cherche sur Instagram" },
          { bold: "YouTube :", text: "beaucoup de beats gratuits pour freestyle/demo, jamais pour release commerciale" },
        ]} />
        <Callout color={GOLD} title="💡 Conseil"
          text="Avant d'acheter un beat, vérifie : (1) la qualité du mix du beat lui-même, (2) les conditions de licence (droit de distribuer commercialement), (3) si le producteur est sur les plateformes de streaming (pour déclarer correctement les droits)." />
      </ContentPage>

      <ContentPage chapter="Module 04 — Production" accent={AMB} pageNum={28} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le studio : comment optimiser ta session</SH2>
        <Body>Le temps en studio = argent. Voici comment maximiser chaque session.</Body>
        <SH3 color={AMB}>Avant la session</SH3>
        <BulletList color={AMB} items={[
          { text: "Connais tes paroles par cœur — ne va jamais en studio avec un texte que tu n'as pas mémorisé" },
          { text: "Écoute le beat 50 fois minimum avant d'entrer — ta voix doit être familière avec chaque mesure" },
          { text: "Chauffe ta voix 15-20 minutes avant d'arriver (humming, échauffements vocaux)" },
          { text: "Apporte de l'eau tiède avec du miel — jamais de lait, d'alcool ou de soda avant d'enregistrer" },
          { text: "Confirme le tarif et la durée en avance — pas de surprise en sortant" },
        ]} />
        <SH3 color={AMB}>Le mixage et le mastering</SH3>
        <Body>Le mixage équilibre les instruments et les voix. Le mastering optimise le son pour toutes les enceintes et plateformes. <strong>Ces deux étapes sont non-négociables</strong> pour une sortie professionnelle.</Body>
        <Callout color={SEC} title="⚠️ Erreur fréquente"
          text="Distribuer un son non-masterisé sur Spotify ou YouTube. Les plateformes ont leurs propres normes de loudness. Un son trop fort sera atténué automatiquement. Un son mal mastérisé sonne amateur sur n'importe quelle enceinte." />
      </ContentPage>

      <ContentPage chapter="Module 04 — Production" accent={AMB} pageNum={29} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La cover artwork : ton premier argument de vente</SH2>
        <Body>L'artwork est la première chose que voit un auditeur sur Spotify, Boomplay ou YouTube. Elle détermine s'il clique ou non. <strong>Un mauvais artwork détruit un bon son.</strong></Body>
        <SH3 color={AMB}>Les règles d'une cover qui convertit</SH3>
        <NumberedList color={AMB} items={[
          "Format obligatoire : 3 000 x 3 000 pixels minimum (carré parfait)",
          "Lisible en petit : ta cover doit être reconnaissable même en 50x50 pixels (taille miniature Spotify)",
          "Cohérente avec ton branding : mêmes couleurs, même style que tes autres visuels",
          "Nom de l'artiste lisible : si ce n'est pas évident, ajoute ton nom dans un coin",
          "Éviter : photos floues, collages amateurs, polices Comic Sans ou Impact",
          "Utiliser : Canva Pro, Adobe Photoshop, ou un graphiste professionnel",
        ]} />
        <Divider color={AMB} />
        <SH3 color={DARK}>Le clip vidéo : investissement stratégique</SH3>
        <Body>Un clip n'est pas obligatoire pour chaque morceau. Mais quand tu en fais un, c'est ton meilleur outil de promotion à long terme.</Body>
        <MiniTable color={AMB}
          headers={["Type de clip", "Budget indicatif", "Idéal pour"]}
          rows={[
            ["Clip simple (lieu unique, 1 tenue)", "100 000 — 300 000", "Singles de découverte, budget limité"],
            ["Clip mid-range (2-3 lieux, équipe)", "300 000 — 800 000", "Singles principaux"],
            ["Clip premium (concept, multicams)", "800 000 — 2 000 000", "Lead singles, EP/Album"],
            ["Clip réalisateur reconnu", "2 000 000 — 5 000 000+", "Artistes établis"],
          ]}
        />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 5 — DISTRIBUTION (P30–P38)                 */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={5} title="PRO 05 — Distribue ta Musique Partout dans le Monde" accent={BLU} pageNum={30} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste amateur met sa musique sur SoundCloud et attend. Un artiste pro distribue sur 150+ plateformes mondiales depuis son téléphone à Dakar, récupère ses royalties en FCFA, et est présent là où ses fans l'écoutent déjà — Boomplay, Spotify, Apple Music, YouTube Music." />

      <ContentPage chapter="Module 05 — Distribution" accent={BLU} pageNum={31} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comprendre la distribution digitale</SH2>
        <Body>Avant 2010, distribuer sa musique nécessitait un label ou un distributeur physique. Aujourd'hui, n'importe quel artiste peut mettre sa musique sur Spotify, Apple Music, Boomplay, Audiomack et 150+ plateformes mondiales depuis Dakar.</Body>
        <MiniTable color={BLU}
          headers={["Distributeur", "Prix annuel", "Avantage principal", "Recommandé pour"]}
          rows={[
            ["DistroKid", "19$ / an", "Illimité, rapide", "Artistes actifs (5+ sorties/an)"],
            ["TuneCore", "9.99$ / single", "Royalties 100%", "Artistes occasionnels"],
            ["Distrokid Africa (Boomplay)", "Gratuit partiel", "Focus marché africain", "Priorité Afrique de l'Ouest"],
            ["CD Baby", "9.95$ / single", "Solide, historique", "Artistes rock/classique"],
            ["Amuse", "Gratuit (limité)", "Gratuit", "Tout débuter sans argent"],
          ]}
        />
        <Callout color={BLU} title="Notre recommandation pour les artistes sénégalais"
          text="DistroKid + Boomplay Direct. DistroKid pour la couverture mondiale (Spotify, Apple, YouTube Music, Deezer, etc.) et Boomplay directement pour maximiser tes revenus sur le marché africain. Ces deux outils ensemble donnent la couverture la plus complète." />
      </ContentPage>

      <ContentPage chapter="Module 05 — Distribution" accent={BLU} pageNum={32} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Tutoriel DistroKid : étape par étape</SH2>
        <StepBox num="1" color={BLU} title="Créer ton compte" desc="Va sur distrokid.com. Inscris-toi avec ton email. Choisis le plan Musician à 19.99$/an (paiement par carte Visa ou PayPal)." />
        <StepBox num="2" color={BLU} title="Préparer tes fichiers" desc="Fichier audio : WAV 16 bits, 44.1kHz (jamais MP3). Cover : JPG/PNG, 3000x3000 pixels, sans logos ni URLs." />
        <StepBox num="3" color={BLU} title="Remplir les métadonnées" desc={`Titre exact, nom d'artiste exact (cohérent avec tous tes profils), genre musical, langue des paroles. Ces infos sont permanentes une fois soumis.`} />
        <StepBox num="4" color={BLU} title="Déclarer les auteurs et compositeurs" desc="Section CRUCIAL. Ajoute tous les auteurs, compositeurs et producteurs avec leur part exacte (Split Sheet). Si tu n'es pas inscrit au BSDA, fais-le avant." />
        <StepBox num="5" color={BLU} title="Choisir les plateformes" desc="Coche TOUTES les plateformes. N'en exclut aucune — tu ne sais jamais d'où viendront tes streams." />
        <StepBox num="6" color={BLU} title="Configurer la date de sortie" desc="Prévoir minimum 7 jours (idéalement 3-4 semaines) pour soumission à Spotify for Artists et placement éditorial." />
        <StepBox num="7" color={BLU} title="Configurer le paiement" desc="Compte bancaire local via Payoneer (gratuit à créer). Payoneer accepte les transferts depuis DistroKid vers ton compte sénégalais." />
      </ContentPage>

      <ContentPage chapter="Module 05 — Distribution" accent={BLU} pageNum={33} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>ISRC, UPC et métadonnées : comprendre les codes</SH2>
        <MiniTable color={BLU}
          headers={["Code", "Pour quoi", "Comment l'obtenir"]}
          rows={[
            ["ISRC", "Identifie chaque enregistrement spécifique", "DistroKid le génère automatiquement OU via BSDA"],
            ["UPC", "Identifie l'album/EP dans son ensemble", "DistroKid le génère automatiquement"],
            ["ISWC", "Identifie l'œuvre musicale (composition)", "BSDA ou SACEM lors de l'enregistrement des droits"],
          ]}
        />
        <Callout color={BLU} title="Pourquoi c'est crucial"
          text="Sans ISRC, tu ne peux pas réclamer tes royalties de performance. Sans ISWC, tu ne peux pas percevoir tes droits d'auteur via le BSDA. Ces codes sont les numéros d'immatriculation de ta musique — absolument indispensables." />
        <Divider color={BLU} />
        <SH3 color={DARK}>Configurer Payoneer pour recevoir tes royalties</SH3>
        <NumberedList color={BLU} items={[
          "Aller sur payoneer.com et créer un compte (gratuit)",
          "Vérifier ton identité avec CNI ou passeport sénégalais",
          "Ajouter un compte bancaire sénégalais (UBA, Ecobank, CBAO, BIS etc.)",
          "Dans DistroKid > Settings > Banking, entrer tes informations Payoneer",
          "Les paiements arrivent mensuellemnt (seuil minimum ~25$)",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 05 — Distribution" accent={BLU} pageNum={34} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'écosystème de streaming en Afrique de l'Ouest</SH2>
        <MiniTable color={BLU}
          headers={["Plateforme", "Priorité", "Pourquoi"]}
          rows={[
            ["YouTube", "★★★★★ Absolue", "Gratuit, accessible avec data limitée, partage facile"],
            ["Boomplay", "★★★★★ Priorité Afrique", "100M+ utilisateurs africains, royalties en CFA"],
            ["Audiomack", "★★★★☆", "Fort en Afrique + diaspora USA, gratuit pour les fans"],
            ["TikTok Music", "★★★★☆", "Intégration TikTok, viral potential élevé"],
            ["Spotify", "★★★☆☆", "Priorité diaspora Europe/Canada/USA"],
            ["Apple Music", "★★★☆☆", "Public premium, diaspora"],
            ["Deezer", "★★☆☆☆", "Présence utile, audience française"],
            ["Amazon Music", "★★☆☆☆", "Marché secondaire"],
          ]}
        />
        <Callout color={GOLD} title="🇸🇳 Stratégie Afrique de l'Ouest"
          text="Cible YouTube en priorité absolue (algorithme accessible, pas besoin d'abonnement payant). Ensuite Boomplay pour le marché local. Spotify pour la diaspora en Europe. Cette triade couvre 90% de ta base de fans potentiels." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 6 — SPOTIFY (P35–P41)                      */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={6} title="PRO 06 — Maîtrise Spotify comme un Pro" accent={GRN} pageNum={35} total={TOTAL} guideLabel={LABEL}
        hook="Spotify n'est pas juste une plateforme d'écoute — c'est ta carte de visite internationale. Quand un label, un manager ou un organisateur de festival veut vérifier ton sérieux, il va d'abord sur ton profil Spotify. Voici comment le rendre irréprochable." />

      <ContentPage chapter="Module 06 — Spotify" accent={GRN} pageNum={36} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Spotify for Artists : optimiser ton profil</SH2>
        <Body>Spotify for Artists est l'interface qui te permet de gérer et optimiser ta présence sur Spotify. Accessible sur artists.spotify.com ou l'application mobile.</Body>
        <NumberedList color={GRN} items={[
          "REVENDIQUER TON PROFIL — Va sur artists.spotify.com, connecte-toi avec tes infos DistroKid et revendique ta page officielle.",
          "PHOTO DE PROFIL — Format: 750x750 pixels minimum. Haute résolution, reconnaissable. Met à jour à chaque saison.",
          "PHOTO DE HEADER — Format: 2660x1140 pixels. Paysage/ambiance de ton univers, pas une photo de visage.",
          "BIOGRAPHIE — 1 500 caractères maximum. Parle de ton univers, ta vision, tes influences. Ajoute des mots-clés (genre, ville, style).",
          "ARTISTES SIMILAIRES — Spotify te suggère des artistes proches. Vérifie qu'ils reflètent bien ton positionnement.",
          "CANVAS — Vidéos courtes en boucle (3-8 secondes) qui remplacent la cover statique dans l'app. Augmente l'engagement de 20%.",
        ]} />
        <Callout color={GRN} title="Canvas : l'outil sous-estimé"
          text="Le Canvas est une vidéo verticale courte en boucle qui s'affiche quand ton morceau est en écoute. Les études Spotify montrent qu'il augmente les partages de 145% et les saves de 20%. À créer en priorité pour chaque single." />
      </ContentPage>

      <ContentPage chapter="Module 06 — Spotify" accent={GRN} pageNum={37} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comprendre les playlists Spotify</SH2>
        <MiniTable color={GRN}
          headers={["Type", "Créé par", "Comment y entrer"]}
          rows={[
            ["Éditoriaux (Today's Top Hits, etc.)", "Equipe Spotify", "Pitch via Spotify for Artists (4 semaines avant)"],
            ["Algorithmiques (Discover Weekly, etc.)", "Algorithme Spotify", "Streams + saves + durée d'écoute élevés"],
            ["Indépendants (curateurs)", "Utilisateurs influents", "Contact direct + plateforme SubmitHub"],
            ["Personnels (utilisateurs)", "Tes fans", "Encourager les fans à sauvegarder"],
          ]}
        />
        <Divider color={GRN} />
        <SH3 color={GRN}>Le pitch éditorial Spotify</SH3>
        <Body>4 semaines avant ta sortie, Spotify te permet de pitcher ton morceau aux équipes éditoriales. C'est gratuit et c'est ta meilleure chance d'intégrer une playlist officielle.</Body>
        <NumberedList color={GRN} items={[
          "Dans Spotify for Artists, va dans l'onglet «Music»",
          "Clique sur le morceau à venir (doit être soumis via DistroKid)",
          "Remplis le formulaire : genre, ambiance, langue, instruments, description",
          "Décris en 500 caractères pourquoi ce morceau mérite une playlist (contexte, histoire, impact attendu)",
          "Soumets. L'équipe évalue dans les 7 jours suivants.",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 06 — Spotify" accent={GRN} pageNum={38} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Stratégie pour atteindre 1 000 000 de streams</SH2>
        <Body>1 million de streams Spotify = environ 3 000 à 5 000 $ de royalties (selon les pays d'écoute). Voici le chemin réaliste.</Body>
        <MiniTable color={GRN}
          headers={["Étape", "Objectif streams", "Actions prioritaires"]}
          rows={[
            ["Phase 1 (mois 1)", "0 → 10 000", "Communauté + WhatsApp + playlists indépendantes"],
            ["Phase 2 (mois 2-3)", "10 000 → 50 000", "Publicité Meta + TikTok viral + press coverage"],
            ["Phase 3 (mois 4-6)", "50 000 → 200 000", "Algorithme Discover Weekly + playlist éditoriaux"],
            ["Phase 4 (mois 7-12)", "200 000 → 1M", "Collab internationale + playlist diaspora + maintenance"],
          ]}
        />
        <Callout color={GRN} title="📊 Revenus Spotify par pays"
          text="100 000 streams depuis le Sénégal ≈ 30-50$. 100 000 streams depuis la France ≈ 300-400$. 100 000 streams depuis le Canada/USA ≈ 400-600$. La diaspora est ta mine d'or — elle écoute avec des abonnements premium dans des pays à CPM élevé." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 7 — YOUTUBE (P39–P47)                      */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={7} title="PRO 07 — YouTube : Ta Chaîne TV Professionnelle" accent={SEC} pageNum={39} total={TOTAL} guideLabel={LABEL}
        hook="Un amateur poste un clip tous les six mois. Un pro nourrit sa chaîne YouTube chaque semaine : Shorts, lives acoustiques, making-of, covers — et génère des revenus publicitaires pendant qu'il dort. Voici comment construire ce système." />

      <ContentPage chapter="Module 07 — YouTube" accent={SEC} pageNum={40} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi YouTube est ta priorité absolue</SH2>
        <BulletList color={SEC} items={[
          { text: "Fonctionne même avec une connexion limitée via YouTube Lite" },
          { text: "Accessible sans abonnement payant (contrairement à Spotify/Apple Music)" },
          { text: "Génère des revenus publicitaires ET des streams musicaux" },
          { text: "Les vidéos durent des années — une vidéo de 2022 peut encore générer des vues en 2026" },
          { text: "Algorithme accessible même pour les petits créateurs avec du contenu régulier" },
          { text: "Permet de diversifier le contenu : clips, live, documentaires, making-of, shorts" },
        ]} />
        <Divider color={SEC} />
        <SH3 color={SEC}>Les conditions de monétisation YouTube 2026</SH3>
        <MiniTable color={SEC}
          headers={["Programme", "Condition", "Ce que tu gagnes"]}
          rows={[
            ["YPP Standard", "500 abonnés + 3 000h vues publiques (12 mois)", "Super Thanks, Channel Memberships"],
            ["YPP Complet", "1 000 abonnés + 4 000h vues OU 10M vues Shorts (90j)", "Revenus publicitaires sur toutes vidéos"],
            ["Shorts Fund", "Intégré au YPP depuis 2024", "Revenus publicitaires sur Shorts"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 07 — YouTube" accent={SEC} pageNum={41} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le CPM et les revenus par pays</SH2>
        <Body>CPM = Cost Per Mille = combien rapportent 1 000 vues. Ce chiffre change TOUT pour un artiste africain qui cible la diaspora.</Body>
        <BarChart color={SEC} title="Revenus pour 100 000 vues YouTube selon le pays" bars={[
          { label: "USA", value: 600, display: "600 $" },
          { label: "Canada", value: 450, display: "450 $" },
          { label: "Belgique/Suisse", value: 425, display: "425 $" },
          { label: "France", value: 375, display: "375 $" },
          { label: "Italie/Espagne", value: 280, display: "280 $" },
          { label: "Côte d'Ivoire", value: 35, display: "35 $" },
          { label: "Sénégal", value: 25, display: "25 $" },
        ]} />
        <Banner
          text="La diaspora = 15× plus de revenus pour le même contenu"
          sub="100 000 vues depuis la France rapportent autant que 1 500 000 vues depuis le Sénégal"
          color={GOLD}
        />
        <Callout color={GOLD} title="La leçon des chiffres"
          text="Voilà pourquoi la diaspora est stratégiquement cruciale. Une vidéo qui cartonne en France, en Italie ou au Canada peut rapporter 15 à 20 fois plus que la même vidéo vue uniquement au Sénégal. Cibler la diaspora n'est pas un luxe — c'est une nécessité économique." />
      </ContentPage>

      <ContentPage chapter="Module 07 — YouTube" accent={SEC} pageNum={42} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Stratégie de contenu YouTube</SH2>
        <Body>Un seul clip ne suffit pas à faire grandir une chaîne. Il faut nourrir l'algorithme avec du contenu régulier et varié.</Body>
        <MiniTable color={SEC}
          headers={["Contenu", "Fréquence", "Objectif"]}
          rows={[
            ["YouTube Shorts (vertical, 60 sec)", "3-5x / semaine", "Découverte, viral, redirige vers la chaîne"],
            ["Live performance acoustique", "1x / semaine", "Engagement, démo talent, SEO"],
            ["Making-of / coulisses studio", "1-2x / mois", "Humanisation, fidélisation fans"],
            ["Clip officiel", "1x / 2-3 mois", "Actif principal, publicité ciblée"],
            ["Interview / Q&A", "1x / mois", "Notoriété, presse, partenariats"],
            ["Cover de chanson connue", "Occasionnel", "SEO (gens cherchent la chanson)"],
          ]}
        />
        <Divider color={SEC} />
        <SH3 color={SEC}>Les Shorts : ton moteur de croissance en 2026</SH3>
        <Body>YouTube Shorts est l'équivalent de TikTok sur YouTube. L'algorithme les pousse agressivement. C'est ton meilleur outil pour atteindre de nouvelles audiences sans budget publicitaire.</Body>
        <Callout color={GRN} title="Astuce Shorts → Long format"
          text="Publie un Short extrait de ton clip ou de ta performance. Mets en description : «Clip complet sur ma chaîne». L'algorithme YouTube favorise les créateurs qui convertissent les viewers Shorts en abonnés longue durée." />
      </ContentPage>

      <ContentPage chapter="Module 07 — YouTube" accent={SEC} pageNum={43} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Optimiser chaque vidéo YouTube</SH2>
        <SH3 color={SEC}>Le titre</SH3>
        <Body>Le titre est le facteur SEO n°1. Il doit contenir le nom du morceau ET des mots-clés que les gens cherchent.</Body>
        <TwoCol
          left={
            <RedBox>
              <BoxLabel color="#DC2626" text="❌ Titre faible" />
              <p style={{ fontFamily: F, fontSize: "10px", color: "#44403C", margin: 0 }}>"Nouveau son 2026"</p>
            </RedBox>
          }
          right={
            <GreenBox>
              <BoxLabel color="#16A34A" text="✅ Titre optimisé" />
              <p style={{ fontFamily: F, fontSize: "10px", color: "#166534", margin: 0 }}>"Amset — Lumière (Gospel Urbain Sénégal 2026) Clip Officiel"</p>
            </GreenBox>
          }
        />
        <SH3 color={SEC}>La description (les 3 premières lignes sont cruciales)</SH3>
        <Body>Les 100 premiers caractères s'affichent sans cliquer sur «Plus». Commence par une phrase d'accroche + le lien de streaming.</Body>
        <SH3 color={SEC}>Les miniatures (thumbnails)</SH3>
        <BulletList color={SEC} items={[
          { text: "1280 x 720 pixels minimum" },
          { text: "Visage expressif en gros plan (les visages attirent l'œil)" },
          { text: "Texte court et lisible (3-4 mots max)" },
          { text: "Couleurs cohérentes avec ton branding" },
          { text: "Fort contraste pour ressortir dans les recommandations" },
        ]} />
        <Callout color={BLU} title="Les tags YouTube"
          text="Utilise 5-10 tags pertinents : nom de l'artiste, titre du morceau, genre (afrobeats sénégal, gospel dakar, etc.), noms d'artistes similaires. Les tags aident YouTube à comprendre où placer ta vidéo dans les recommandations." />
        <div style={{ margin: "12px 0", padding: "14px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #FFF1F1, #FFF7F7)", border: "2px solid #FF000025", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10px", right: "12px", background: "#FF0000", borderRadius: "4px", padding: "2px 8px" }}>
            <span style={{ fontFamily: F, fontSize: "7px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>FORMATION INCLUSE</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "18px" }}>▶</span>
            </div>
            <div>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: "#CC0000", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>KEKELI Academy · Ressource Pratique</p>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: DARK, margin: "2px 0 0" }}>Formation YouTube Pro — Tutoriels complets</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#44403C", lineHeight: 1.6, margin: "0 0 10px" }}>
            Accède aux tutoriels vidéo pas à pas sur YouTube Pro : optimisation de chaîne, monétisation, SEO vidéo, YouTube Shorts, analytics et stratégie de contenu pour artiste africain.
          </p>
          <a href="https://drive.google.com/drive/folders/1sOzBKGTPzVKG-rbi3ezmg6QOwt0dYFoQ?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "6px", background: "#FF0000", textDecoration: "none", marginRight: "8px" }}>
            <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "#fff" }}>📂 Accéder à la formation YouTube →</span>
          </a>
          <p style={{ fontFamily: F, fontSize: "7.5px", color: "#9CA3AF", margin: "6px 0 0" }}>Lien : drive.google.com → Formation YouTube KEKELI Academy</p>
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 8 — PUBLICITÉ (P44–P50)                    */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={8} title="PRO 08 — Publicité Pro : YouTube & Meta Ads" accent={BLU} pageNum={44} total={TOTAL} guideLabel={LABEL}
        hook="Les amateurs font confiance à l'organique uniquement. Les pros investissent intelligemment en publicité pour accélérer leur croissance. Avec 50 000 FCFA bien utilisés, tu peux toucher 50 000 personnes ciblées — ta diaspora, tes futurs fans, tes futurs clients." />

      <ContentPage chapter="Module 08 — Publicité" accent={BLU} pageNum={45} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>YouTube Ads : le guide complet</SH2>
        <Body>YouTube Ads (via Google Ads) te permet de faire passer ton clip devant des personnes précises : par pays, âge, intérêts musicaux et même mots-clés recherchés.</Body>
        <SH3 color={BLU}>Les 3 types de campagnes musicales</SH3>
        <NumberedList color={BLU} items={[
          "IN-STREAM SKIPPABLE — L'annonce joue avant une vidéo. Le spectateur peut la passer après 5 secondes. Tu paies seulement s'il regarde 30 secondes ou plus. Idéal pour les clips vidéo.",
          "IN-STREAM NON-SKIPPABLE — L'annonce dure 15 à 20 secondes et ne peut pas être passée. Tu paies au CPM. Idéal pour les teasers courts.",
          "VIDEO DISCOVERY — Ta vidéo s'affiche dans les résultats de recherche YouTube et en recommandation. Tu paies au clic. Idéal pour augmenter les vues organiques.",
        ]} />
        <MiniTable color={BLU}
          headers={["Budget", "Durée", "Résultat attendu"]}
          rows={[
            ["50 000 FCFA (~80$)", "7 jours", "10 000 — 40 000 vues selon clip + ciblage"],
            ["150 000 FCFA (~240$)", "15 jours", "30 000 — 100 000 vues"],
            ["300 000 FCFA (~480$)", "30 jours", "80 000 — 300 000 vues"],
            ["1 000 000 FCFA (~1 600$)", "30 jours", "300 000 — 1 000 000 vues (avec bon contenu)"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 08 — Publicité" accent={BLU} pageNum={46} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Ciblage stratégique pour artistes sénégalais</SH2>
        <Body>Le ciblage est plus important que le budget. Un bon ciblage avec 50 000 FCFA dépasse un mauvais ciblage avec 500 000 FCFA.</Body>
        <SH3 color={BLU}>Campagne locale (Sénégal)</SH3>
        <BulletList color={BLU} items={[
          { bold: "Pays :", text: "Sénégal" },
          { bold: "Âge :", text: "16-35 ans (adapter à ton genre)" },
          { bold: "Intérêts :", text: "Musique africaine, afrobeats, hip-hop, gospel (selon ton genre)" },
          { bold: "Appareils :", text: "Mobile uniquement (85% des vues au Sénégal viennent du mobile)" },
          { bold: "Heures :", text: "18h-23h (soirée, après le travail/l'école)" },
        ]} />
        <Divider color={BLU} />
        <SH3 color={BLU}>Campagne diaspora (très rentable)</SH3>
        <BulletList color={BLU} items={[
          { bold: "Pays :", text: "France, Italie, Espagne, USA, Canada, Portugal" },
          { bold: "Langue :", text: "Français" },
          { bold: "Intérêts :", text: "Musique sénégalaise, afrobeats, communautés africaines" },
          { bold: "Budget :", text: "100 000 FCFA = 3 à 5x plus de revenus publicitaires vs. même budget en Sénégal" },
        ]} />
        <Callout color={GOLD} title="La puissance de la diaspora"
          text="La communauté sénégalaise en France compte plus de 150 000 personnes. En Italie plus de 100 000. En Espagne plus de 50 000. Ces personnes écoutent de la musique sénégalaise activement, ont des abonnements premium et leur engagement génère un CPM 10x supérieur à celui du Sénégal." />
      </ContentPage>

      <ContentPage chapter="Module 08 — Publicité" accent={BLU} pageNum={47} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Meta Ads (Facebook & Instagram)</SH2>
        <Body>Facebook reste extrêmement puissant au Sénégal pour les 25-45 ans et la diaspora. Instagram domine pour les 18-30 ans. Une campagne Meta combine les deux.</Body>
        <SH3 color={BLU}>Types de campagnes musicales Meta</SH3>
        <NumberedList color={BLU} items={[
          "TRAFIC VERS YOUTUBE — Publie un extrait de 15 à 30 secondes sur Facebook/Instagram, le CTA mène au clip complet sur YouTube.",
          "NOTORIÉTÉ — Ton clip en vidéo native Facebook/Instagram (téléchargé directement, pas lié). Meilleure portée organique.",
          "AUDIENCE PERSONNALISÉE — Cibler les personnes qui ont déjà interagi avec ta page ou ton profil Instagram.",
          "LOOKALIKE AUDIENCE — Meta crée une audience similaire à tes fans actuels. Très puissant pour trouver de nouveaux fans.",
        ]} />
        <MiniTable color={BLU}
          headers={["Campagne", "Budget", "Durée", "Résultat attendu"]}
          rows={[
            ["Découverte locale (SN)", "30 000 FCFA", "7 jours", "5 000-15 000 vues vidéo"],
            ["Lancement single (SN + diaspora)", "100 000 FCFA", "14 jours", "20 000-60 000 impressions"],
            ["Campagne diaspora uniquement", "75 000 FCFA", "14 jours", "Audience premium, streams qualité"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 08 — Publicité" accent={BLU} pageNum={48} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Plan de lancement d'un single : semaines 1 à 4</SH2>
        <MiniTable color={BLU}
          headers={["Semaine", "Actions", "Budget"]}
          rows={[
            ["J-21 à J-14", "Teasing TikTok + Instagram Stories (30 sec extrait)", "0 FCFA"],
            ["J-14 à J-7", "Annonce officielle, pre-save Spotify, email list WhatsApp", "0 FCFA"],
            ["J-7 à J-1", "Contenu BTS (coulisses), engagement communauté, 1 collab TikTok", "0 FCFA"],
            ["J0 (jour de sortie)", "Post sur TOUS les réseaux + notification WhatsApp + Live IG", "0 FCFA"],
            ["J+1 à J+7", "YouTube Ads (découverte locale)", "50 000 FCFA"],
            ["J+7 à J+21", "Meta Ads (diaspora France/Italie/Canada)", "100 000 FCFA"],
            ["J+21 à J+30", "Maintain momentum, playlists curateurs, interviews médias", "Gratuit"],
          ]}
        />
        <Callout color={GRN} title="✅ Budget total recommandé par single"
          text="Pour un artiste émergent sérieux : 150 000 à 250 000 FCFA en promotion pour chaque single majeur. Ce budget, bien utilisé, peut générer 50 000 à 200 000 vues et poser les bases d'une audience durable." />
        <div style={{ margin: "12px 0", padding: "14px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #EFF6FF, #F0FFF4)", border: "2px solid #1877F225", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10px", right: "12px", background: "#1877F2", borderRadius: "4px", padding: "2px 8px" }}>
            <span style={{ fontFamily: F, fontSize: "7px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>FORMATIONS INCLUSES</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #1877F2, #FF0000)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: F, fontSize: "12px", fontWeight: 900, color: "#fff" }}>ADS</span>
            </div>
            <div>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: "#1877F2", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>KEKELI Academy · Publicité Digitale</p>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: DARK, margin: "2px 0 0" }}>Formations Meta Ads + YouTube Ads — Accès complet</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#44403C", lineHeight: 1.6, margin: "0 0 10px" }}>
            Meta Ads (Facebook + Instagram) et YouTube Ads — deux plateformes, deux formations distinctes. Tutoriels pour créer, cibler et optimiser tes campagnes avec des budgets en FCFA adaptés au marché sénégalais.
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href="https://drive.google.com/drive/folders/1nxm2fVRsQWKVNtA_sPoz_rcxRLVf_oAX?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "6px", background: "#1877F2", textDecoration: "none" }}>
              <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "#fff" }}>📂 Formation Facebook Ads →</span>
            </a>
            <a href="https://drive.google.com/drive/folders/1sOzBKGTPzVKG-rbi3ezmg6QOwt0dYFoQ?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "6px", background: "#FF0000", textDecoration: "none" }}>
              <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "#fff" }}>📂 Formation YouTube Ads →</span>
            </a>
          </div>
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 9 — TIKTOK (P49–P58)                       */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={9} title="PRO 09 — TikTok Pro : La Machine Virale Maîtrisée" accent={SEC} pageNum={49} total={TOTAL} guideLabel={LABEL}
        hook="Un amateur poste sur TikTok quand il a le temps. Un pro publie 3 vidéos par jour avec une stratégie précise, analyse ses données chaque semaine, et transforme l'algorithme en partenaire de carrière. Voici le système complet du pro TikTok." />

      <ContentPage chapter="Module 09 — TikTok" accent={SEC} pageNum={50} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi TikTok change tout pour les artistes africains</SH2>
        <TwoColumnText color={SEC}
          left={
            <>
              <BulletList color={SEC} items={[
                { text: "Algorithme : montre ton contenu à des inconnus sans abonnés au départ" },
                { text: "1 vidéo peut devenir virale avec 0 followers" },
                { text: "Sons → tendances mondiales en 48h" },
                { text: "Diaspora sénégalaise très active" },
                { text: "Burna Boy, Wizkid, Davido → explosion Occident grâce à TikTok" },
              ]} />
            </>
          }
          right={
            <PhoneShowcase color={SEC} phones={[{
              label: "Profil TikTok artiste",
              platform: "TikTok",
              lines: [
                { type: "avatar", content: "@amset_officiel", sub: "8.2K abonnés" },
                { type: "stat", content: "8.2K:Abonnés|142K:Likes|270:Vidéos" },
                { type: "image", content: "Gospel Urbain" },
                { type: "text", content: "✝️ Gospel Urbain Dakar 🇸🇳" },
                { type: "text", content: "🎵 Streaming partout" },
                { type: "button", content: "Suivre" },
              ]
            }]} />
          }
        />
        <Divider color={SEC} />
        <SH3 color={SEC}>Le plan 90 jours TikTok</SH3>
        <MiniTable color={SEC}
          headers={["Période", "Objectif", "Focus"]}
          rows={[
            ["Jours 1-30", "Comprendre l'algorithme", "Tester différents formats, noter ce qui marche"],
            ["Jours 31-60", "Trouver sa formule", "Reproduire les formats qui ont généré des vues"],
            ["Jours 61-90", "Optimiser et scaler", "Doubler sur les meilleurs formats, viser les 10 000 followers"],
          ]}
        />
        <Callout color={AMB} title="⚠️ L'erreur de débutant"
          text="Publier 3 vidéos sur 3 jours puis arrêter parce que «ça ne marche pas». TikTok récompense la constance. Il faut construire un historique de contenu pour que l'algorithme te comprenne et te pousse." />
      </ContentPage>

      <ContentPage chapter="Module 09 — TikTok" accent={SEC} pageNum={51} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La formule des vidéos virales</SH2>
        <SH3 color={SEC}>Structure d'une vidéo TikTok musicale qui performe</SH3>
        <NumberedList color={SEC} items={[
          "LE HOOK (0-3 secondes) — La première seconde détermine si quelqu'un swipe ou reste. Commence par quelque chose de visuel ou sonore fort IMMÉDIATEMENT.",
          "LE DÉVELOPPEMENT (3-20 secondes) — Ta musique, ta performance, ton message. Garde un rythme soutenu.",
          "LE PUNCH FINAL (dernières 3 secondes) — Un élément qui donne envie de revoir ou de partager.",
        ]} />
        <Divider color={SEC} />
        <SH3 color={DARK}>Les 5 types de hooks qui marchent</SH3>
        <BulletList color={SEC} items={[
          { bold: "L'accroche narrative :", text: "\"Personne ne croyait que ce son allait marcher...\" puis la musique démarre" },
          { bold: "La transformation :", text: "Avant / Après (look, studio, performance)" },
          { bold: "La question intrigue :", text: "\"Pourquoi ce son est différent de tout ce que tu as entendu ?\"" },
          { bold: "La démonstration de talent :", text: "Commencer directement par la partie la plus impressionnante" },
          { bold: "L'émotion brute :", text: "Témoignage sincère, moment vulnérable ou de joie authentique" },
        ]} />
        <Callout color={SEC} title="💡 Astuce viralité musicale"
          text="Crée un challenge ou une chorégraphie simple autour de ton son. Les sons avec un movement TikTok associé obtiennent 10 à 50 fois plus de créations UGC (User Generated Content) — chaque création est une publicité gratuite pour ton son." />
      </ContentPage>

      <ContentPage chapter="Module 09 — TikTok" accent={SEC} pageNum={52} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Calendrier de contenu TikTok (30 jours)</SH2>
        <MiniTable color={SEC}
          headers={["Jour", "Vidéo 1 (8h)", "Vidéo 2 (13h)", "Vidéo 3 (20h)"]}
          rows={[
            ["Lundi", "Performance live extrait", "Making-of / coulisses", "Tendance du moment + ton son"],
            ["Mardi", "Texte + émotion (histoire)", "BTS studio / création", "Duet ou Stitch artiste similaire"],
            ["Mercredi", "Cover courte (chanson connue)", "Ta routine de création", "Extrait live performance"],
            ["Jeudi", "Challenge / mouvement", "Q&A ou témoignage fan", "Nouveau son teaser"],
            ["Vendredi", "Clip extrait 15 sec", "Coulisses tournage clip", "Collab ou mention artiste"],
            ["Samedi", "Performance acoustique", "Lifestyle / quotidien", "Motivation / message communauté"],
            ["Dimanche", "Recap semaine / gratitude", "Son signature en boucle", "Annonce de la semaine suivante"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 09 — TikTok" accent={SEC} pageNum={53} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Optimiser son profil TikTok</SH2>
        <NumberedList color={SEC} items={[
          "COMPTE ARTISTE (Pro) — Passer en compte Pro dans les paramètres pour accéder aux analytics.",
          "PHOTO DE PROFIL — Même photo que sur tous tes autres réseaux (cohérence de marque).",
          "NOM D'UTILISATEUR — Exact comme partout : @nomartiste. Pas de chiffres ou underscores si possible.",
          "BIO — 3 lignes max. Ligne 1 : qui tu es et ton genre. Ligne 2 : ta proposition de valeur. Ligne 3 : lien vers ta musique.",
          "LIEN EN BIO — Utilise Linktree ou Beacons.ai pour mettre tous tes liens (YouTube, Spotify, WhatsApp, site web) en un seul lien.",
          "SON SIGNATURE — Enregistre chaque son que tu publies avec un nom reconnaissable (ex : «Lumière - Amset»).",
        ]} />
        <Divider color={SEC} />
        <SH3 color={SEC}>Les hashtags TikTok</SH3>
        <Body>Sur TikTok, les hashtags sont moins importants que la qualité du contenu, mais ils aident à la découverte initiale. Utilise 3 à 5 hashtags pertinents par vidéo.</Body>
        <BulletList color={SEC} items={[
          { bold: "Grand (milliards de vues) :", text: "#musique #newmusic #afrobeats" },
          { bold: "Moyen (centaines de millions) :", text: "#senegalmusic #goldenboysn #dakar" },
          { bold: "Niche (millions) :", text: "#gospelafricain #musicafrican #afrotrap" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 09 — TikTok" accent={SEC} pageNum={54} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Monétiser TikTok</SH2>
        <MiniTable color={SEC}
          headers={["Source de revenus", "Condition", "Revenus estimés"]}
          rows={[
            ["TikTok Creator Fund", "10 000 followers + 100 000 vues/30j", "Très faible (0.02-0.04$/1000 vues)"],
            ["TikTok LIVE Gifts", "1 000 followers + 16 ans", "Variable selon fans fidèles"],
            ["TikTok Music (son)", "Distribution via DistroKid", "Royalties si son utilisé dans d'autres vidéos"],
            ["Marques & partenariats", "Engagement > follower count", "10 000 — 500 000 FCFA / post"],
            ["Promotion de tes propres concerts", "Toute taille d'audience", "Ventes directes de billets"],
          ]}
        />
        <Callout color={GRN} title="La vraie monétisation TikTok"
          text="Ne compte pas sur les revenus directs TikTok — ils sont minuscules. La vraie valeur de TikTok est de construire une audience qui achète tes concerts, tes produits dérivés, et attire des marques locales (opérateurs télécom, boissons, mode) pour des partenariats." />
        <div style={{ margin: "12px 0", padding: "14px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #0D0D0D08, #EC489908)", border: "2px solid #EC489925", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10px", right: "12px", background: "#EC4899", borderRadius: "4px", padding: "2px 8px" }}>
            <span style={{ fontFamily: F, fontSize: "7px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>FORMATION INCLUSE</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #010101, #EC4899)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: F, fontSize: "14px", fontWeight: 900, color: "#fff" }}>♪</span>
            </div>
            <div>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: "#EC4899", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>KEKELI Academy · Réseau Social</p>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: DARK, margin: "2px 0 0" }}>Formation TikTok Pro — Tutoriels complets</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#44403C", lineHeight: 1.6, margin: "0 0 10px" }}>
            Maîtrise TikTok de A à Z : créer des vidéos virales, comprendre l'algorithme, utiliser les sons tendance, construire une communauté engagée et convertir les vues en fans réels et en revenus. Adapté au marché africain.
          </p>
          <a href="https://drive.google.com/drive/folders/1688rB68G39Edmql2wRxvmz5QTVdbatfx?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "6px", background: "linear-gradient(135deg, #010101, #EC4899)", textDecoration: "none" }}>
            <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "#fff" }}>📂 Accéder à la formation TikTok →</span>
          </a>
          <p style={{ fontFamily: F, fontSize: "7.5px", color: "#9CA3AF", margin: "6px 0 0" }}>Lien : drive.google.com → Formation TikTok KEKELI Academy</p>
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 10 — INSTAGRAM (P55–P62)                   */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={10} title="PRO 10 — Instagram : Ta Vitrine Professionnelle" accent={ACC} pageNum={55} total={TOTAL} guideLabel={LABEL}
        hook="Instagram est l'équivalent digital de ta carte de visite professionnelle — mais en 10 000 fois plus puissant. Un feed incohérent, une bio vide, un profil sans stratégie : tu perds des contrats avant même d'avoir eu une conversation. Voici comment construire un profil qui convertit." />

      <ContentPage chapter="Module 10 — Instagram" accent={ACC} pageNum={56} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Optimiser son profil Instagram</SH2>
        <TwoColumnText color={ACC}
          left={
            <>
              <SH3 color={ACC}>Les 6 éléments clés</SH3>
              <NumberedList color={ACC} items={[
                "Compte CRÉATEUR (pas Business) — meilleur reach",
                "Nom : «Amset | Gospel Urbain Dakar» — mots-clés",
                "Photo pro, même partout, visible en petit",
                "Bio : 5 lignes — Identité · Genre · Ville · Valeur · Lien",
                "Story Highlights : Musique · Lives · Backstage · Presse",
                "Lien Linktree avec tous tes canaux",
              ]} />
            </>
          }
          right={
            <PhoneShowcase color={ACC} phones={[{
              label: "Bio optimisée Amset",
              platform: "Instagram",
              lines: [
                { type: "avatar", content: "@amset_officiel", sub: "Gospel Urbain · Dakar 🇸🇳" },
                { type: "stat", content: "89:Posts|4.2K:Abonnés|312:Abonnements" },
                { type: "text", content: "🎵 Gospel Urbain · Dakar" },
                { type: "text", content: "🌍 Artiste | FR/EN/Wolof" },
                { type: "text", content: '✨ "Lumière" disponible' },
                { type: "text", content: "📩 Booking via lien ⬇️" },
                { type: "button", content: "🔗 Toute ma musique" },
              ]
            }]} />
          }
        />
        <Callout color={ACC} title="La règle du premier regard"
          text="Tu as 3 secondes pour convaincre un visiteur de s'abonner. Si ta photo de profil est floue, ta bio vide et ton feed incohérent, il repart sans revenir. Soigne ces 3 éléments avant tout le reste." />
      </ContentPage>

      <ContentPage chapter="Module 10 — Instagram" accent={ACC} pageNum={57} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 5 piliers de contenu Instagram</SH2>
        <Body>Chaque pilier représente un type de contenu régulier. Ensemble, ils créent une image complète et engageante.</Body>
        <InfoGrid color={ACC} cols={2} items={[
          { emoji: "🎵", title: "Musique (30%)", desc: "Extraits, clips, performances live, lyrics visuels.", badge: "Pilier 1" },
          { emoji: "🌅", title: "Lifestyle (25%)", desc: "Quotidien authentique, passions, valeurs partagées.", badge: "Pilier 2" },
          { emoji: "🙏", title: "Foi & Valeurs (20%)", desc: "Messages d'inspiration, témoignages, spiritualité.", badge: "Pilier 3" },
          { emoji: "🎬", title: "Backstage (15%)", desc: "Studio, répétitions, tournages, coulisses concerts.", badge: "Pilier 4" },
          { emoji: "👥", title: "Communauté (10%)", desc: "Partages de fans, remerciements, interactions.", badge: "Pilier 5" },
        ]} />
        <Banner text="La règle 70/20/10" sub="70% valeur · 20% personnalité · 10% promotion. Si tu inverses ce ratio, les gens se désabonnent." color={ACC} />
        <Callout color={ACC} title="Pour les artistes gospel"
          text="Le pilier Foi & Valeurs est votre arme secrète. Un post de témoignage sincère ou un message de foi authentique génère souvent plus d'engagement qu'un extrait musical. N'ayez pas honte d'utiliser votre foi comme contenu — c'est votre différence." />
      </ContentPage>

      <ContentPage chapter="Module 10 — Instagram" accent={ACC} pageNum={58} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Maîtriser les Reels Instagram</SH2>
        <Body>Les Reels sont le contenu le plus poussé par l'algorithme Instagram en 2026. Ils offrent une portée organique jusqu'à 10x supérieure aux posts photos.</Body>
        <SH3 color={ACC}>Caractéristiques d'un Reel qui performe</SH3>
        <BulletList color={ACC} items={[
          { bold: "Durée :", text: "15-30 secondes pour la découverte, 30-60 secondes pour l'engagement" },
          { bold: "Format :", text: "Vertical 9:16, plein écran" },
          { bold: "Hook visuel :", text: "Les 3 premières secondes déterminent tout" },
          { bold: "Sous-titres :", text: "60% des personnes regardent sans son — sous-titre ta voix" },
          { bold: "CTA :", text: "Toujours finir par un appel à l'action (partage, commentaire, lien en bio)" },
        ]} />
        <Divider color={ACC} />
        <SH3 color={DARK}>Les Stories : fidéliser tes fans existants</SH3>
        <Body>Les Stories ne touchent que tes abonnés actuels, mais elles créent une connexion intime et quotidienne. Elles sont cruciales pour fidéliser ta communauté.</Body>
        <BulletList color={ACC} items={[
          { text: "Publier 5 à 10 Stories par jour" },
          { text: "Mélanger : texte, vidéo, sondages, questions, countdown" },
          { text: "Montrer les coulisses que tu ne montres nulle part ailleurs" },
          { text: "Répondre à tous les DMs reçus via Stories" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 10 — Instagram" accent={ACC} pageNum={59} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Calendrier éditorial Instagram (30 jours)</SH2>
        <MiniTable color={ACC}
          headers={["Jour", "Format", "Contenu suggéré"]}
          rows={[
            ["Lundi", "Reel", "Extrait musical avec sous-titres / lyrics"],
            ["Mardi", "Story (x5)", "Coulisses journée + sondage fan"],
            ["Mercredi", "Carrousel", "5 choses à savoir sur moi / mon parcours"],
            ["Jeudi", "Reel", "Performance live (acoustique ou studio)"],
            ["Vendredi", "Post photo", "Shooting officiel + annonce/nouvelle"],
            ["Samedi", "Story (x5)", "Weekend lifestyle + question communauté"],
            ["Dimanche", "Reel", "Motivation / message de foi ou d'inspiration"],
          ]}
        />
        <Callout color={GRN} title="💡 Les meilleures heures de publication (Sénégal)"
          text="Reels : Vendredi-Samedi 19h-22h. Posts photos : Mercredi-Jeudi 12h ou 20h. Stories : Toute la journée, mais pic d'engagement 7h-9h (réveil) et 20h-23h (soirée). Ces horaires varient selon ton audience — vérifie tes propres analytics." />
      </ContentPage>

      <ContentPage chapter="Module 10 — Instagram" accent={ACC} pageNum={60} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Croissance Instagram : stratégies organiques</SH2>
        <NumberedList color={ACC} items={[
          "ENGAGEMENT CIBLÉ — Chaque jour, interagis sincèrement avec 20 comptes de ta niche. Pas des likes en masse : de vrais commentaires.",
          "COLLABORATIONS — Les Lives avec d'autres artistes, les Collab posts (deux profils sur un seul post), les Duets Reels.",
          "HASHTAGS STRATÉGIQUES — 5 hashtags max : 2 grands, 2 moyens, 1 ultra-niche. Teste différentes combinaisons chaque semaine.",
          "RÉPONDRE À TOUS LES COMMENTAIRES — Surtout dans les premières heures. L'algorithme voit les commentaires comme signal de qualité.",
          "PARTAGER EN STORIES SES PROPRES REELS — Augmente la visibilité et pousse les abonnés à regarder.",
          "CONSISTENT AESTHETIC — Mêmes couleurs, même ambiance, même style. Un feed cohérent convertit les visiteurs en abonnés.",
        ]} />
        <div style={{ margin: "12px 0", padding: "14px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #FFF0FA, #F3EEFF)", border: "2px solid #C13584 25", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10px", right: "12px", background: "linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)", borderRadius: "4px", padding: "2px 8px" }}>
            <span style={{ fontFamily: F, fontSize: "7px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>ASTUCE META</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: F, fontSize: "18px" }}>📸</span>
            </div>
            <div>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: "#C13584", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>KEKELI Academy · Instagram & Meta</p>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: DARK, margin: "2px 0 0" }}>Formation Meta Ads — Valable Instagram ET Facebook</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#44403C", lineHeight: 1.6, margin: "0 0 10px" }}>
            <strong>Bonne nouvelle :</strong> la formation Facebook Ads couvre intégralement Instagram Ads — les deux plateformes sont gérées depuis le même outil (Meta Business Manager). En maîtrisant la formation Facebook, tu sais aussi faire des publicités Instagram de façon professionnelle.
          </p>
          <a href="https://drive.google.com/drive/folders/1nxm2fVRsQWKVNtA_sPoz_rcxRLVf_oAX?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "6px", background: "linear-gradient(135deg, #833AB4, #FD1D1D)", textDecoration: "none" }}>
            <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "#fff" }}>📂 Formation Meta Ads (Facebook + Instagram) →</span>
          </a>
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 11 — WHATSAPP (P61–P66)                    */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={11} title="PRO 11 — WhatsApp Pro : L'Arme Secrète Sénégalaise" accent={GRN} pageNum={61} total={TOTAL} guideLabel={LABEL}
        hook="Pendant que tous les artistes courent après les algorithmes Instagram et TikTok, les artistes pros sénégalais savent que WhatsApp reste le canal de communication le plus direct et le plus puissant au Sénégal. 97% de pénétration. 0% d'algorithme filtrant. 100% de portée garantie." />

      <ContentPage chapter="Module 11 — WhatsApp" accent={GRN} pageNum={62} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi WhatsApp est unique au Sénégal</SH2>
        <BulletList color={GRN} items={[
          { text: "97% des Sénégalais avec un smartphone ont WhatsApp installé" },
          { text: "Les statuts WhatsApp ont un taux de consultation de 70-80% (vs. 3-5% sur Instagram)" },
          { text: "Le partage de musique par WhatsApp est la forme de recommandation n°1 au Sénégal" },
          { text: "Aucun algorithme ne filtre tes messages — tu atteins directement tes contacts" },
          { text: "La vente directe via WhatsApp (billets, merchandise) est la plus simple à faire" },
        ]} />
        <Divider color={GRN} />
        <SH3 color={GRN}>Statuts WhatsApp : minimum 5 par jour</SH3>
        <Body>Tes statuts doivent raconter ton quotidien artistique. Les gens regardent les statuts de manière passive — c'est une exposition gratuite et constante.</Body>
        <BulletList color={GRN} items={[
          { bold: "Matin :", text: "Citation motivante ou verset (si artiste chrétien/musliman)" },
          { bold: "Midi :", text: "Extrait de ton morceau ou BTS studio" },
          { bold: "Après-midi :", text: "Annonce ou nouvelle (sortie, concert, collab)" },
          { bold: "Soir :", text: "Remerciement, interaction avec fans, question" },
          { bold: "Nuit :", text: "Moment personnel, méditation, fin de journée" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 11 — WhatsApp" accent={GRN} pageNum={63} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>WhatsApp Business : configurer son compte pro</SH2>
        <NumberedList color={GRN} items={[
          "TÉLÉCHARGER — WhatsApp Business (application séparée de WhatsApp classique)",
          "PROFIL PRO — Photo, nom d'artiste, description (genre, localisation, email de booking)",
          "CATÉGORIE — «Musicien/Groupe» ou «Arts & Entertainment»",
          "RÉPONSES AUTOMATIQUES — Message de bienvenue automatique quand quelqu'un écrit pour la première fois",
          "RÉPONSES RAPIDES — Prépare des réponses prêtes pour : tarifs concerts, booking, lien musique, merci",
          "CATALOGUE — Crée un catalogue avec tes services : Prestation concert, Cours de chant, Merchandise",
          "LIEN CLIQUABLE — Génère ton lien wa.me/221781672819 et mets-le dans toutes tes bios",
        ]} />
        <Callout color={GRN} title="La diffusion (Broadcast)"
          text="WhatsApp permet d'envoyer un même message à 256 contacts maximum dans une liste de diffusion (ils ne voient pas les autres destinataires). Crée plusieurs listes : Fans, DJs, Médias, Organisateurs. Le jour de ta sortie, une diffusion à ces listes = notification directe à des centaines de personnes." />
      </ContentPage>

      <ContentPage chapter="Module 11 — WhatsApp" accent={GRN} pageNum={64} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Communautés WhatsApp</SH2>
        <Body>En 2023, WhatsApp a introduit les «Communautés» — une structure avec un groupe principal et des sous-groupes thématiques. C'est ton écosystème de fans le plus intime.</Body>
        <SH3 color={GRN}>Structure recommandée pour ta communauté</SH3>
        <div style={{ padding: "12px 14px", borderRadius: "10px", background: `${GRN}08`, border: `1px solid ${GRN}20`, margin: "8px 0" }}>
          <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 800, color: GRN, margin: "0 0 8px" }}>🏠 COMMUNAUTÉ : [TON NOM] FAMILY</p>
          <BulletList color={GRN} items={[
            { bold: "📢 Annonces :", text: "Nouvelles officielles uniquement (sorties, concerts, nouvelles)" },
            { bold: "🎵 Musique :", text: "Partage de tes sons, lyrics, making-of audio" },
            { bold: "🙏 Prière & Foi :", text: "Pour artistes gospel — communion spirituelle avec les fans" },
            { bold: "🎟️ Événements :", text: "Infos concerts, billetterie, organisation" },
            { bold: "💬 Discussion :", text: "Les fans parlent entre eux, feedback, témoignages" },
          ]} />
        </div>
        <Callout color={GRN} title="Vente directe via WhatsApp"
          text="Les billets de concert, les photos dédicacées, les produits dérivés se vendent très bien directement via WhatsApp au Sénégal. Annonce dans ta communauté, fais payer par Wave/Orange Money, envoie la confirmation. Simple, efficace, 0% de commission." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 12 — COMMUNAUTÉ 0→10K (P65–P73)            */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={12} title="PRO 12 — Bâtis ta Communauté Pro : 0 → 10 000 Fans" accent={AMB} pageNum={65} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste amateur accumule des followers. Un artiste pro construit une communauté. La différence ? Les followers cliquent «J'aime» et oublient. La communauté achète des billets, partage tes sons et amène ses amis à tes concerts. Voici le système pour construire cette différence." />

      <ContentPage chapter="Module 12 — Communauté" accent={AMB} pageNum={66} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 4 étapes de la croissance communautaire</SH2>
        <StepBox num="1" color={AMB} title="Trouver les 100 premiers vrais fans"
          desc="Pas 100 abonnés — 100 personnes qui aiment vraiment ta musique et sont prêtes à la partager. Cherche-les dans ton cercle réel : église, université, quartier, famille, amis." />
        <StepBox num="2" color={AMB} title="Transformer ces 100 fans en ambassadeurs"
          desc="Chaque fan doit partager, commenter, liker et parler de toi. Offre-leur de l'exclusivité (before premiere, accès coulisses, mention en public). Fais-les se sentir spéciaux." />
        <StepBox num="3" color={AMB} title="Créer une communauté WhatsApp dédiée"
          desc="Pas un groupe de diffusion — une vraie communauté avec des canaux thématiques. Nourris-la quotidiennement avec du contenu exclusif." />
        <StepBox num="4" color={AMB} title="Créer du contenu régulier sur tous les réseaux"
          desc="La règle simple : publier chaque jour. Les gens suivent des personnes, pas des chansons. Montre ton quotidien, ta créativité, ta personnalité." />
        <div style={{ padding: "12px 14px", borderRadius: "10px", background: `${AMB}10`, border: `1px solid ${AMB}25`, margin: "8px 0", textAlign: "center" }}>
          <p style={{ fontFamily: FD, fontSize: "20px", fontWeight: 700, color: AMB, margin: "0 0 4px" }}>100 fans × 10 partages chacun = 1 000 personnes atteintes</p>
          <p style={{ fontFamily: F, fontSize: "10px", color: "#78716C", margin: 0 }}>1 000 × 10 partages chacun = 10 000 personnes — sans dépenser 1 FCFA</p>
        </div>
      </ContentPage>

      <ContentPage chapter="Module 12 — Communauté" accent={AMB} pageNum={67} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le système de contenu quotidien</SH2>
        <Body>Les artistes qui construisent une communauté solide ne parlent pas seulement de leur musique. Ils partagent leur vie, leurs valeurs, leurs histoires. Les gens suivent des personnes, pas des produits.</Body>
        <MiniTable color={AMB}
          headers={["Contenu", "Fréquence", "Plateforme"]}
          rows={[
            ["Performance musicale (extrait)", "1x/jour", "TikTok + Instagram Reel"],
            ["Statuts WhatsApp", "5x/jour", "WhatsApp"],
            ["Story Instagram (coulisses)", "3-5x/jour", "Instagram"],
            ["Post Instagram (image/carrousel)", "4-5x/semaine", "Instagram"],
            ["Vidéo YouTube (Short)", "3-5x/semaine", "YouTube"],
            ["Diffusion WhatsApp communauté", "3x/semaine", "WhatsApp"],
            ["YouTube longue durée", "1x/semaine", "YouTube"],
            ["Facebook (extrait ou post)", "2-3x/semaine", "Facebook"],
          ]}
        />
        <Callout color={AMB} title="La règle de la valeur d'abord"
          text="Avant de demander quoi que ce soit à ta communauté (acheter un billet, partager une chanson, voter pour toi), assure-toi d'avoir apporté 10 fois plus de valeur que tu ne demandes. Les fans qui reçoivent donne naturellement en retour." />
      </ContentPage>

      <ContentPage chapter="Module 12 — Communauté" accent={AMB} pageNum={68} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Construire sa liste de contacts</SH2>
        <Body>La liste de contacts (numéros WhatsApp, emails) est l'actif le plus précieux d'un artiste. Si Instagram ferme ton compte demain, tu perds tout. Mais pas ta liste.</Body>
        <SH3 color={AMB}>Comment collecter des contacts</SH3>
        <NumberedList color={AMB} items={[
          "CONCERTS ET ÉVÉNEMENTS — Fais passer une liste de contacts «Pour recevoir mes nouvelles en exclusivité»",
          "QR CODE EN BIO — Crée un QR code qui ouvre directement un message WhatsApp vers toi",
          "EXCLUSIVITÉ EN ÉCHANGE — «Envoie-moi «MUSIQUE» sur WhatsApp pour recevoir mon single en avant-première»",
          "LANDING PAGE — Une simple page (Google Forms ou Carrd.co) avec prénom + numéro contre contenu exclusif",
          "CONCOURS — «Partage ce post + envoie-moi «CONCOURS» sur WhatsApp pour participer»",
        ]} />
        <Callout color={GRN} title="L'objectif : 1 000 contacts WhatsApp actifs"
          text="1 000 contacts WhatsApp actifs (qui ouvrent tes statuts et répondent à tes messages) = une force de promotion qui, le jour d'une sortie ou d'un concert, surpasse n'importe quelle publicité payante de 50 000 FCFA." />
      </ContentPage>

      <ContentPage chapter="Module 12 — Communauté" accent={AMB} pageNum={69} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les collaborations : accélérer la croissance</SH2>
        <Body>Une collaboration avec un artiste qui a une audience différente de la tienne est l'une des façons les plus rapides de grandir.</Body>
        <SH3 color={AMB}>Les 3 types de collaborations</SH3>
        <NumberedList color={AMB} items={[
          "FEAT MUSICAL — Co-création d'un morceau. Les fans de chacun découvrent l'autre artiste. Plus impactant si les genres sont complémentaires.",
          "LIVE COMMUN — Live Instagram ou TikTok en duo. Chacun présente l'autre à sa communauté. Simple, gratuit, efficace.",
          "CONTENU CROISÉ — Apparition dans les contenus de l'autre artiste (TikTok, Reel). Même sans morceau commun.",
        ]} />
        <MiniTable color={AMB}
          headers={["Profil collaborateur", "Gain attendu", "Effort"]}
          rows={[
            ["Artiste même taille que toi", "+200 à +500 followers", "Moyen (logistique à coordonner)"],
            ["Artiste 5x plus grand que toi", "+500 à +2 000 followers", "Élevé (difficile à obtenir)"],
            ["Influenceur non-musical de ta ville", "+300 à +1 000 followers", "Facile (contenu lifestyle)"],
            ["Artiste international (feat)", "+1 000 à +10 000+", "Très élevé + budget beat/prod"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 12 — Communauté" accent={AMB} pageNum={70} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Plan d'action : 0 à 10 000 fans en 12 mois</SH2>
        <MiniTable color={AMB}
          headers={["Mois", "Objectif", "Actions clés"]}
          rows={[
            ["1-2", "100 vrais fans + setup complet", "Créer tous les profils, sortir 1 son, WhatsApp list"],
            ["3-4", "500 followers TikTok + 200 YT", "3 vidéos TikTok/jour, 1 Reel/jour, 1 collab"],
            ["5-6", "2 000 TikTok + 500 YT", "Premier single avec budget pub (50K FCFA)"],
            ["7-8", "5 000 TikTok + 1 000 YT", "Deuxième single + campagne diaspora 75K FCFA"],
            ["9-10", "7 000 TikTok + 2 000 YT", "Premier concert payant + EP ou album en préparation"],
            ["11-12", "10 000+ TikTok + 5 000 YT", "EP sorti + tournée locale + partenariat marque"],
          ]}
        />
        <Callout color={AMB} title="La vérité sur la croissance"
          text="Ces chiffres sont atteignables avec de la constance. Mais rien n'est garanti. Certains mois seront meilleurs que d'autres. Ce qui compte : ne jamais arrêter de créer et de publier. Les artistes qui abandonnent à 800 followers ne savent pas qu'ils étaient à 2 semaines de décoller." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 13 — DROITS BSDA (P71–P78)                 */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={13} title="PRO 13 — Droits & Contrats : Protège ton Travail" accent={GOLD} pageNum={71} total={TOTAL} guideLabel={LABEL}
        hook="L'amateur crée de la musique. Le pro protège sa musique. Chaque morceau non déclaré au BSDA est de l'argent que tu ne récupéreras jamais. Chaque contrat signé sans lecture est un piège que tu n'as pas vu venir. Ce module te donne les outils du pro pour protéger chaque œuvre et chaque accord." />

      <ContentPage chapter="Module 13 — Droits & BSDA" accent={GOLD} pageNum={72} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les droits musicaux : comprendre les bases</SH2>
        <MiniTable color={GOLD}
          headers={["Droit", "Pour quoi", "Qui le perçoit"]}
          rows={[
            ["Droits d'auteur", "La composition (mélodie + paroles)", "Auteur(s) + compositeur(s)"],
            ["Droits voisins", "L'enregistrement sonore (master)", "Artiste interprète + producteur phonographique"],
            ["Droits de diffusion", "La diffusion publique (radio, TV, événements)", "BSDA (Sénégal) via les organisateurs"],
            ["Droits de reproduction", "La copie physique ou digitale", "Label ou artiste indépendant"],
            ["Droits synchronisation", "L'utilisation dans un film, pub, série", "Auteur + label (négocié)"],
          ]}
        />
        <Callout color={GOLD} title="Ce que ça veut dire pour toi"
          text="Quand ton morceau passe à la radio sénégalaise, l'organisateur doit payer le BSDA. Le BSDA collecte et reverse une partie à toi. Quand ton morceau est streamé sur Spotify ou Boomplay, tu perçois des royalties de streaming. Chacun de ces flux nécessite que tu sois correctement inscrit et déclaré." />
      </ContentPage>

      <ContentPage chapter="Module 13 — Droits & BSDA" accent={GOLD} pageNum={73} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le BSDA : Bureau Sénégalais du Droit d'Auteur</SH2>
        <Body>Le BSDA est l'organisme officiel de gestion collective des droits d'auteur au Sénégal. Il collecte les redevances auprès des diffuseurs (radios, TV, organisateurs d'événements) et les redistribue aux artistes inscrits.</Body>
        <SH3 color={GOLD}>Comment s'inscrire au BSDA</SH3>
        <NumberedList color={GOLD} items={[
          "Se présenter au BSDA (Avenue Roume, Dakar) avec CNI + 2 photos d'identité",
          "Remplir le formulaire d'adhésion (artiste interprète et/ou auteur-compositeur)",
          "Déposer ses œuvres : liste des chansons avec titres, co-auteurs et dates de création",
          "Payer les frais d'adhésion (modestes, quelques milliers de FCFA)",
          "Recevoir son numéro d'artiste BSDA",
          "Mettre à jour régulièrement son catalogue à chaque nouvelle sortie",
        ]} />
        <Callout color={GOLD} title="⚠️ Important"
          text="Les droits BSDA ne sont perçus que si tu es inscrit ET si tes œuvres sont déclarées. Des artistes sénégalais populaires ont perdu des années de redevances faute d'inscription. L'argent est collecté mais non distribué — il finit dans les caisses générales." />
      </ContentPage>

      <ContentPage chapter="Module 13 — Droits & BSDA" accent={GOLD} pageNum={74} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'ISRC : le code d'identité de ta musique</SH2>
        <Body>L'ISRC (International Standard Recording Code) est un code unique de 12 caractères qui identifie chaque enregistrement spécifique. C'est le numéro de série de ta chanson.</Body>
        <BulletList color={GOLD} items={[
          { bold: "Format :", text: "XX-XXX-YY-NNNNN (pays-distributeur-année-numéro séquentiel)" },
          { bold: "Attribué par :", text: "DistroKid automatiquement lors de la distribution (ou via BSDA)" },
          { bold: "Importance :", text: "Sans ISRC, impossible de tracer les streams et de réclamer les royalties" },
          { bold: "Permanence :", text: "Un ISRC attribué à un enregistrement lui appartient pour toujours" },
        ]} />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Le Split Sheet : protège tes collaborations</SH3>
        <Body>Le Split Sheet est un document simple qui répartit les droits d'auteur d'une chanson entre tous les créateurs impliqués. Il doit être signé AVANT la sortie du morceau.</Body>
        <MiniTable color={GOLD}
          headers={["Contributeur", "Rôle", "% Part"]}
          rows={[
            ["Artiste principal", "Interprète + co-auteur paroles", "40%"],
            ["Auteur des paroles", "Auteur", "25%"],
            ["Compositeur (beat)", "Compositeur musique", "25%"],
            ["Producteur exécutif", "Production", "10%"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 13 — Droits & BSDA" accent={GOLD} pageNum={75} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les contrats : ce qu'il faut savoir</SH2>
        <Callout color="#DC2626" title="⚠️ Règle absolue"
          text="Ne signe jamais un contrat sans le lire complètement. Si tu ne comprends pas un article, fais-le lire par quelqu'un de confiance ou un juriste. Un mauvais contrat peut te lier pendant des années." />
        <SH3 color={GOLD}>Les contrats courants dans l'industrie musicale sénégalaise</SH3>
        <MiniTable color={GOLD}
          headers={["Type de contrat", "Ce qu'il couvre", "Point de vigilance"]}
          rows={[
            ["Contrat d'artiste (label)", "Exclusivité, avance, partage de revenus", "Durée, territoires, récupération des masters"],
            ["Contrat de management", "Représentation, commission", "% commission (max 20%), durée, résiliation"],
            ["Contrat de prestation", "Concert, événement payant", "Cachet, conditions techniques, annulation"],
            ["Contrat de beat (exclusif)", "Droits sur la composition musicale", "Droit de modifier, de distribuer commercialement"],
            ["Contrat de licence", "Utilisation de ta musique dans un projet tiers", "Durée, territoire, montant, usage précis"],
          ]}
        />
        <Callout color={GRN} title="💡 Conseil"
          text="Pour les contrats de prestation concert, insiste toujours sur : (1) un acompte de 30-50% à la signature, (2) le solde avant la montée sur scène, (3) une clause d'annulation avec dédommagement. Ne compte jamais sur un accord verbal." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 14 — MONÉTISATION (P76–P86)                */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={14} title="PRO 14 — Monétisation Pro : 1 Million FCFA / Mois" accent={GRN} pageNum={76} total={TOTAL} guideLabel={LABEL}
        hook="Un amateur attend que la musique lui rapporte de l'argent. Un pro construit 10 sources de revenus différentes autour de sa musique. Ce module te montre exactement comment atteindre 1 million FCFA par mois avec un plan chiffré, réaliste, depuis Dakar." />

      <ContentPage chapter="Module 14 — Monétisation" accent={GRN} pageNum={77} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 10 sources de revenus d'un artiste complet</SH2>
        <InfoGrid color={GRN} cols={2} items={[
          { emoji: "🎵", title: "Streaming", desc: "Spotify, Boomplay, YouTube Music, Apple Music. Croît avec le temps.", badge: "Source 1" },
          { emoji: "📺", title: "YouTube Adsense", desc: "Revenus pub sur tes vidéos YouTube (YPP requis).", badge: "Source 2" },
          { emoji: "🎤", title: "Concerts & Prestations", desc: "La source la plus immédiate. Mariages, événements, scènes.", badge: "Source 3" },
          { emoji: "🏢", title: "Événements Corporate", desc: "Entreprises, conférences, inaugurations. Très rémunérateur.", badge: "Source 4" },
          { emoji: "🤝", title: "Marketing d'Influence", desc: "Partenariats marques : télécoms, boissons, mode locale.", badge: "Source 5" },
          { emoji: "👕", title: "Vente Directe", desc: "Merchandise, photos dédicacées, NFTs musicaux.", badge: "Source 6" },
          { emoji: "📚", title: "Formations & Coaching", desc: "Enseigner le chant, la prod, la stratégie digitale.", badge: "Source 7" },
          { emoji: "⚖️", title: "Droits BSDA", desc: "Redevances radio, TV, événements via le BSDA.", badge: "Source 8" },
          { emoji: "💰", title: "Contenu Sponsorisé", desc: "Marques dans tes vidéos TikTok/YouTube/Instagram.", badge: "Source 9" },
          { emoji: "🎬", title: "Synchronisation", desc: "Ta musique dans des films, séries, publicités.", badge: "Source 10" },
        ]} />
        <Banner text="Un artiste avec 10 sources de revenus ne craint pas la perte d'une seule." sub="Diversifier = sécuriser sa carrière contre les aléas de l'industrie" color={GRN} />
      </ContentPage>

      <ContentPage chapter="Module 14 — Monétisation" accent={GRN} pageNum={78} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le tableau : comment atteindre 1 000 000 FCFA / mois</SH2>
        <MiniTable color={GRN}
          headers={["Source de revenus", "Scénario réaliste", "Montant mensuel"]}
          rows={[
            ["Concerts (2 prestations/mois)", "200 000 FCFA par prestation", "400 000 FCFA"],
            ["Événements corporate/mariages (1/mois)", "200 000 FCFA par événement", "200 000 FCFA"],
            ["Marketing d'influence (1 collab/mois)", "Marque locale : 75 000 FCFA", "75 000 FCFA"],
            ["Streaming (Boomplay + YouTube Music)", "200 000 streams totaux", "80 000 FCFA"],
            ["YouTube Adsense", "100 000 vues/mois YT", "50 000 FCFA"],
            ["Formations / coaching", "2 élèves × 75 000 FCFA", "150 000 FCFA"],
            ["Droits d'auteur BSDA", "Diffusions radio/TV/événements", "30 000 FCFA"],
            ["Vente directe (merch/photos)", "Ventes événements + WhatsApp", "15 000 FCFA"],
          ]}
        />
        <div style={{ padding: "10px 12px", borderRadius: "8px", background: `${GRN}15`, border: `2px solid ${GRN}`, margin: "8px 0", textAlign: "center" }}>
          <p style={{ fontFamily: FD, fontSize: "22px", fontWeight: 700, color: GRN, margin: 0 }}>TOTAL : 1 000 000 FCFA / mois</p>
        </div>
        <Body>Ce tableau n'est pas un rêve. Ce sont des chiffres atteignables pour un artiste avec 5 000 à 10 000 abonnés engagés, 2 ans d'efforts et une stratégie cohérente.</Body>
      </ContentPage>

      <ContentPage chapter="Module 14 — Monétisation" accent={GRN} pageNum={79} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les concerts : maximiser ses revenus live</SH2>
        <Body>Le concert est ta source de revenus la plus directe et souvent la plus importante. Voici comment progresser dans le barème des cachets.</Body>
        <MiniTable color={GRN}
          headers={["Stade de carrière", "Taille d'événement", "Cachet indicatif"]}
          rows={[
            ["Débutant (0-1 000 followers)", "Soirées privées, petits bars", "15 000 — 50 000 FCFA"],
            ["Émergent (1 000-5 000)", "Événements corpo, mariages", "50 000 — 150 000 FCFA"],
            ["Artiste établi (5 000-20 000)", "Festivals moyens, salles 200-500", "150 000 — 500 000 FCFA"],
            ["Star locale (20 000-100 000)", "Événements majeurs, concerts solo", "500 000 — 2 000 000 FCFA"],
            ["Star nationale (100 000+)", "Concerts nationaux, tournées", "2 000 000 FCFA+"],
          ]}
        />
        <Callout color={GRN} title="💡 Les événements corporate : la mine d'or sous-exploitée"
          text="Les entreprises (banques, opérateurs télécoms, marques internationales) organisent régulièrement des événements internes, des soirées clients, des fêtes d'anniversaire d'entreprise. Ces événements paient bien (100 000 à 500 000 FCFA pour 30-45 minutes) et ne nécessitent pas une grande notoriété publique — juste une bonne prestation et un réseau professionnel." />
      </ContentPage>

      <ContentPage chapter="Module 14 — Monétisation" accent={GRN} pageNum={80} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le marketing d'influence : devenir une marque</SH2>
        <Body>Quand tu as une audience engagée, les marques locales veulent travailler avec toi. En 2026, une audience de 5 000 à 10 000 followers très engagés est suffisante pour obtenir des partenariats rémunérés.</Body>
        <SH3 color={GRN}>Les marques qui travaillent avec des artistes au Sénégal</SH3>
        <BulletList color={GRN} items={[
          { bold: "Opérateurs télécoms :", text: "Orange, Free, Expresso — partenariats sonneries, streaming, événements" },
          { bold: "Boissons :", text: "Kirène, Coca-Cola Afrique, brasseries — événements, placements" },
          { bold: "Mode & textile :", text: "Marques locales, wax, prêt-à-porter sénégalais" },
          { bold: "Finance & mobile money :", text: "Wave, Orange Money, Wizall — ambassadeurs" },
          { bold: "Immobilier & automobile :", text: "Événements de lancement, inaugurations" },
        ]} />
        <MiniTable color={GRN}
          headers={["Type de partenariat", "Description", "Tarif indicatif"]}
          rows={[
            ["Post sponsorisé Instagram/TikTok", "1 post mentionnant la marque", "25 000 — 200 000 FCFA"],
            ["Ambassadeur mensuel", "Mentions régulières + événements", "100 000 — 500 000 FCFA/mois"],
            ["Apparition événement marque", "Performance ou présence", "100 000 — 1 000 000 FCFA"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 14 — Monétisation" accent={GRN} pageNum={81} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Facebook : la plateforme de monetisation africaine</SH2>
        <Body>Facebook reste dominant au Sénégal pour les 25-50 ans et la diaspora. Mais peu d'artistes savent qu'il existe aussi des opportunités de monétisation directe.</Body>
        <SH3 color={GRN}>Monétisation Facebook pour artistes</SH3>
        <BulletList color={GRN} items={[
          { bold: "Stars (pourboires Live) :", text: "Tes fans peuvent t'envoyer des «Stars» pendant tes Lives Facebook. 1 Star = ~0.01$" },
          { bold: "Abonnements Fans :", text: "Accès payant à du contenu exclusif sur ta Page (5$/mois)" },
          { bold: "Publicité In-stream :", text: "Si tu atteins 10 000 fans Page + 600 000 minutes vues, tu peux insérer des pubs dans tes vidéos" },
          { bold: "Lives rémunérés :", text: "Organiser des Lives avec accès payant (badge Live)" },
        ]} />
        <Divider color={GRN} />
        <SH3 color={DARK}>Instagram Subscriptions</SH3>
        <Body>Instagram permet désormais aux créateurs de proposer un abonnement mensuel payant à leurs fans pour accéder à du contenu exclusif (Reels, Stories, Lives). Disponible depuis 2023 pour les créateurs africains éligibles.</Body>
        <Callout color={GRN} title="L'artiste entrepreneur"
          text="Tu n'es plus seulement un musicien. Tu es le PDG de ta marque musicale. Traite chaque source de revenus comme une ligne de business à développer. Diversifie. N'attends jamais qu'une seule source paie tout." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 15 — PLAN 5 ANS (P82–P90)                  */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={15} title="PRO 15 — Le Plan de Carrière Pro sur 5 Ans" accent={BLU} pageNum={82} total={TOTAL} guideLabel={LABEL}
        hook="Un amateur improvise année après année. Un pro a un plan sur 5 ans, des objectifs trimestriels, des KPIs hebdomadaires — et s'y tient même quand la motivation baisse. Voici le plan concret du professionnel de la musique au Sénégal." />

      <ContentPage chapter="Module 15 — Plan 5 ans" accent={BLU} pageNum={83} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La vision à 5 ans</SH2>
        <MiniTable color={BLU}
          headers={["Année", "Focus principal", "Objectifs concrets"]}
          rows={[
            ["Année 1", "Construire les fondations", "1 000 followers YT · 3 000 TikTok · 1 EP sorti · 1er concert payant"],
            ["Année 2", "Développer les revenus", "5 000 YT · 10 000 TikTok · 300 000 FCFA/mois · Partenariat marque"],
            ["Année 3", "Conquérir la sous-région", "20 000 YT · Concert Dakar solo · Diffusion Côte d'Ivoire + Mali"],
            ["Année 4", "Sponsors & professionnalisation", "50 000 YT · Tournée AOF · Contrat sponsoring · Manager professionnel"],
            ["Année 5", "Établissement & diaspora", "200 000 YT · Concerts Europe · 1M FCFA/mois · Équipe complète"],
          ]}
        />
        <Callout color={BLU} title="La règle des horizons"
          text="Pense à 5 ans pour la vision. Pense à 1 an pour la stratégie. Pense à 90 jours pour l'exécution. Pense à aujourd'hui pour l'action. Ne laisse pas la vision à 5 ans te paralyser — concentre-toi sur ce que tu fais cette semaine." />
      </ContentPage>

      <ContentPage chapter="Module 15 — Plan 5 ans" accent={BLU} pageNum={84} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le plan d'action 90 jours</SH2>
        <Body>Les 90 premiers jours après avoir lu ce livre sont les plus importants. Voici un plan concret.</Body>
        <MiniTable color={BLU}
          headers={["Semaine", "Actions prioritaires"]}
          rows={[
            ["1-2", "Créer/optimiser TOUS les profils · Définir ADN + Avatar fan · Rejoindre BSDA · Télécharger DistroKid"],
            ["3-4", "Créer 21 vidéos TikTok de stock · Préparer artwork + son à sortir · Liste WhatsApp 100 premiers fans"],
            ["5-8", "Lancer le 1er single + campagne pub 50K FCFA · 3 TikTok/jour · Collab avec 1 artiste local"],
            ["9-10", "Analyser les résultats · Ajuster la stratégie · Pitcher Spotify · Travailler le prochain son"],
            ["11-12", "Lancer le 2ème single · Campagne diaspora 75K FCFA · Préparer 1er concert"],
            ["13 (semaine 13)", "Bilan 90 jours : quels objectifs atteints ? Définir le plan pour les 90 jours suivants"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 15 — Plan 5 ans" accent={BLU} pageNum={85} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les KPIs à suivre chaque mois</SH2>
        <Body>KPI = Key Performance Indicator. Ces chiffres te disent si ta stratégie fonctionne ou non.</Body>
        <MiniTable color={BLU}
          headers={["KPI", "Comment mesurer", "Outils"]}
          rows={[
            ["Abonnés YouTube (total + croissance)", "Chaque 1er du mois", "YouTube Studio"],
            ["Vues totales YouTube (30 derniers jours)", "Hebdomadaire", "YouTube Studio"],
            ["Followers TikTok + croissance", "Hebdomadaire", "TikTok Analytics"],
            ["Taux d'engagement Instagram (%)", "Mensuel", "(Likes+Commentaires) / Abonnés × 100"],
            ["Streams Boomplay + Spotify (mensuel)", "Mensuel", "DistroKid + Boomplay Artist"],
            ["Revenus totaux (toutes sources)", "Mensuel", "Tableau Excel personnel"],
            ["Contacts WhatsApp actifs", "Mensuel", "Liste WhatsApp Business"],
            ["Nombre de concerts / prestations", "Mensuel", "Agenda personnel"],
          ]}
        />
        <Callout color={BLU} title="Le tableau de bord mensuel"
          text="Crée un Google Sheets simple avec ces 8 KPIs. Remplis-le le 1er de chaque mois. Après 6 mois, tu verras clairement tes tendances — ce qui monte, ce qui stagne, où investir ton énergie." />
      </ContentPage>

      <ContentPage chapter="Module 15 — Plan 5 ans" accent={BLU} pageNum={86} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Construire son équipe</SH2>
        <Body>Au départ tu travailles seul. Mais à mesure que ta carrière grandit, tu as besoin de personnes qui te libèrent pour te concentrer sur la création.</Body>
        <MiniTable color={BLU}
          headers={["Profil", "Rôle", "Quand recruter"]}
          rows={[
            ["Manager", "Organisation, négociation, booking", "Dès 5 000 followers + revenus réguliers"],
            ["Community Manager", "Gestion réseaux au quotidien", "Quand les réseaux prennent > 3h/jour"],
            ["Graphiste", "Visuels, flyers, artworks réguliers", "Dès le début (freelance)"],
            ["Photographe/Vidéaste", "Contenu pro régulier", "Dès les premiers revenus stables"],
            ["Comptable / conseiller fiscal", "Gérer les revenus et déclarations", "Dès 500 000 FCFA/mois de revenus"],
            ["Agent / Booker", "Trouver des concerts réguliers", "Dès la notoriété locale établie"],
          ]}
        />
        <Callout color={GOLD} title="La règle de délégation"
          text="Délègue tout ce qui te prend du temps sans apporter de valeur créative directe. Garde pour toi : la création musicale, les décisions stratégiques, la relation avec tes fans. Délègue : les publications réseaux, la comptabilité, le montage vidéo routine." />
      </ContentPage>

      <ContentPage chapter="Module 15 — Plan 5 ans" accent={BLU} pageNum={87} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La checklist mensuelle de l'artiste professionnel</SH2>
        <SH3 color={BLU}>Création & Production</SH3>
        <BulletList color={BLU} items={[
          { text: "Au moins 1 nouveau morceau enregistré ou en cours" },
          { text: "Plan de sortie du prochain single défini" },
          { text: "Moodboard de la prochaine saison artistique" },
        ]} />
        <SH3 color={BLU}>Distribution & Droits</SH3>
        <BulletList color={BLU} items={[
          { text: "Vérifier les royalties DistroKid et Boomplay" },
          { text: "Mettre à jour le catalogue BSDA si nouvelle sortie" },
          { text: "Split Sheet signé pour toute nouvelle collaboration" },
        ]} />
        <SH3 color={BLU}>Réseaux & Communauté</SH3>
        <BulletList color={BLU} items={[
          { text: "30+ Stories Instagram publiées dans le mois" },
          { text: "60+ vidéos TikTok publiées dans le mois" },
          { text: "4+ Reels/Shorts publiés dans le mois" },
          { text: "1 contenu exclusif partagé à la communauté WhatsApp" },
          { text: "Tous les commentaires et DMs importants traités" },
        ]} />
        <SH3 color={BLU}>Finances</SH3>
        <BulletList color={BLU} items={[
          { text: "Tableau de bord mensuel mis à jour" },
          { text: "Factures / contrats de prestation archivés" },
          { text: "Budget promotion du prochain single défini" },
          { text: "Objectif de revenu du mois suivant fixé" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 15 — Plan 5 ans" accent={BLU} pageNum={88} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Travailler avec une agence créative</SH2>
        <Body>Une agence comme KEKELI Creative Agency peut accélérer ta carrière en prenant en charge les aspects stratégiques et créatifs qui te prennent le plus de temps.</Body>
        <SH3 color={BLU}>Ce qu'une agence peut faire pour toi</SH3>
        <BulletList color={BLU} items={[
          { bold: "Branding complet :", text: "Logo, charte graphique, templates, direction artistique" },
          { bold: "Clips & photos :", text: "Réalisation professionnelle, shooting, montage" },
          { bold: "Stratégie digitale :", text: "Plan de contenu, calendrier éditorial, croissance réseaux" },
          { bold: "Distribution & droits :", text: "Setup DistroKid, BSDA, gestion des plateformes" },
          { bold: "Campagnes publicitaires :", text: "YouTube Ads et Meta Ads avec ciblage optimisé" },
          { bold: "Community management :", text: "Gestion quotidienne de tes réseaux sociaux" },
        ]} />
        <Callout color={GOLD} title="KEKELI Creative Agency — Dakar"
          text="Notre mission depuis notre création : mettre la lumière sur les projets qui méritent d'être vus. Nous accompagnons artistes et entreprises de Dakar à la diaspora. Guide gratuit, outils IA, accompagnement personnalisé — tout est disponible sur kekelicreativeagency.com" />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* PAGES BONUS : FACEBOOK & OUTILS IA (P89–P95)      */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={16} title="PRO 16 — Facebook Pro & IA : Les Outils du Pro" accent={ACC} pageNum={89} total={TOTAL} guideLabel={LABEL}
        hook="Un pro ne se limite pas à TikTok et Instagram. Il exploite Facebook pour la diaspora et l'IA pour multiplier sa productivité par 3. Voici comment les artistes professionnels utilisent ces outils souvent négligés pour dominer leur marché." />

      <ContentPage chapter="Bonus — Facebook & IA" accent={ACC} pageNum={90} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Facebook : stratégie pour artistes sénégalais</SH2>
        <Body>Au Sénégal, Facebook reste dominant pour les 25-50 ans, les familles, les professionnels et la diaspora. Ne le néglige pas.</Body>
        <SH3 color={ACC}>Page Facebook Artiste : les fondamentaux</SH3>
        <NumberedList color={ACC} items={[
          "Crée une PAGE (pas un profil personnel) — les Pages ont des analytics, des outils de pub et peuvent être vérifiées",
          "Même nom que partout ailleurs — cohérence absolue",
          "Photo de couverture : 820x312 pixels — mets un visuel impact qui annonce une sortie ou un concert",
          "Catégorie : «Musicien/Groupe» pour les avantages spécifiques",
          "Active les messages — réponds dans les 24h pour maintenir ton «Badge de réactivité»",
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Contenu qui performe sur Facebook (Sénégal)</SH3>
        <BulletList color={ACC} items={[
          { text: "Vidéos natives (uploadées directement) : reach 3x supérieur aux liens externes" },
          { text: "Lives Facebook : l'algorithme les pousse fortement, les diaspora les regardent" },
          { text: "Photos de famille / authenticité : très fort engagement au Sénégal" },
          { text: "Annonces de concerts avec localisation : partagés massivement" },
          { text: "Extraits sonores avec cover art : format idéal pour la découverte musicale" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Bonus — Facebook & IA" accent={ACC} pageNum={91} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'IA au service de ta carrière musicale</SH2>
        <Body>L'intelligence artificielle n'est pas là pour remplacer l'artiste. Elle est là pour amplifier sa productivité, automatiser les tâches répétitives et prendre de meilleures décisions stratégiques.</Body>
        <SH3 color={ACC}>Les outils IA gratuits disponibles</SH3>
        <MiniTable color={ACC}
          headers={["Outil IA", "Pour quoi", "Plateforme"]}
          rows={[
            ["ChatGPT / Claude", "Rédiger bios, textes de chansons, stratégies", "Web (gratuit)"],
            ["Udio / Suno", "Générer des idées musicales, maquettes", "Web (freemium)"],
            ["Canva AI", "Créer covers, flyers, visuels en secondes", "Canva.com"],
            ["CapCut AI", "Monter des vidéos TikTok automatiquement", "Mobile (gratuit)"],
            ["KEKELI Vision de Carrière", "Analyse IA de ta carrière sur 6 axes", "kekelicreativeagency.com (gratuit)"],
            ["KEKELI Analyse Réseaux", "Audit IA de tes profils sociaux", "kekelicreativeagency.com (gratuit)"],
            ["KEKELI Stratégie Lancement", "Plan 90 jours personnalisé pour ton single", "kekelicreativeagency.com (gratuit)"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Bonus — Facebook & IA" accent={ACC} pageNum={92} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Utiliser l'IA pour créer du contenu plus vite</SH2>
        <Body>La plus grande excuse des artistes pour ne pas publier : «Je n'ai pas d'idées» ou «Je n'ai pas le temps». L'IA résout les deux problèmes.</Body>
        <SH3 color={ACC}>Exemple : 1 chanson = 30 contenus</SH3>
        <BulletList color={ACC} items={[
          { bold: "5 TikToks :", text: "hook différent, même chanson, angles différents" },
          { bold: "5 Reels :", text: "paroles illustrées, BTS, performance live, lyric video, making-of" },
          { bold: "5 Stories :", text: "teasing, poll, countdown, extrait, reaction" },
          { bold: "3 posts Instagram :", text: "annonce officielle, carrousel «histoire de la chanson», citation" },
          { bold: "3 Shorts YouTube :", text: "extrait 60 sec, live acoustique, réponse à un commentaire" },
          { bold: "5 Statuts WhatsApp :", text: "un par jour pendant la semaine de sortie" },
          { bold: "2 vidéos YouTube :", text: "clip officiel + making-of" },
          { bold: "2 posts Facebook :", text: "vidéo native + texte storytelling" },
        ]} />
        <Callout color={GRN} title="Le résultat"
          text="30 contenus à partir d'UNE seule chanson. Avec 1 sortie par mois = 30 contenus/mois = 1 contenu par jour. Plus jamais «je n'ai rien à publier»." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* RÉCAPITULATIF & PLAN D'ACTION IMMÉDIAT (P93–P96) */}
      {/* ══════════════════════════════════════════════════ */}
      <DarkPage title="Les 20 actions à faire cette semaine" accent={GOLD} pageNum={93} total={TOTAL} guideLabel={LABEL}>
        <TwoCol
          left={
            <div>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>📱 Réseaux & Profils</p>
              <BulletList color={GOLD} items={[
                { text: "Optimiser ton profil Instagram (bio + lien Linktree)" },
                { text: "Passer en compte Artiste TikTok Pro" },
                { text: "Créer ta Page Facebook Artiste" },
                { text: "Configurer WhatsApp Business" },
                { text: "Revendiquer ton profil Spotify for Artists" },
              ]} />
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: SEC, textTransform: "uppercase", letterSpacing: "0.1em", margin: "12px 0 8px" }}>🎵 Musique & Distribution</p>
              <BulletList color={SEC} items={[
                { text: "S'inscrire au BSDA si pas encore fait" },
                { text: "Créer un compte DistroKid" },
                { text: "Créer un compte Payoneer" },
                { text: "Vérifier que tous tes sons ont un ISRC" },
                { text: "Pitcher ton dernier single sur Spotify for Artists" },
              ]} />
            </div>
          }
          right={
            <div>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: GRN, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>📝 Stratégie & Contenu</p>
              <BulletList color={GRN} items={[
                { text: "Écrire ta phrase d'ADN artistique" },
                { text: "Créer ton Avatar Fan" },
                { text: "Créer ton moodboard sur Pinterest" },
                { text: "Écrire tes objectifs sur 12 mois" },
                { text: "Créer ton calendrier de contenu (30 jours)" },
              ]} />
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: BLU, textTransform: "uppercase", letterSpacing: "0.1em", margin: "12px 0 8px" }}>👥 Communauté</p>
              <BulletList color={BLU} items={[
                { text: "Créer ta liste de diffusion WhatsApp" },
                { text: "Collecter 50 premiers numéros de vrais fans" },
                { text: "Publier 3 vidéos TikTok aujourd'hui" },
                { text: "Répondre à tous tes commentaires non répondus" },
                { text: "Contacter 1 artiste pour une collaboration" },
              ]} />
            </div>
          }
        />
      </DarkPage>

      <ContentPage chapter="Conclusion" accent={GOLD} pageNum={94} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les vérités que personne ne te dit</SH2>
        <NumberedList color={GOLD} items={[
          "Le succès en musique prend 2 à 5 ans de travail cohérent — pas 2 semaines après un single viral.",
          "Il n'y a pas de raccourci. Ni l'achat de followers, ni les faux streams ne construisent une vraie carrière.",
          "Ta famille et tes proches ne sont peut-être pas ton audience cible. Ne te décourage pas s'ils ne réagissent pas.",
          "Les artistes qui réussissent ne sont pas ceux qui ont le plus de talent — ce sont ceux qui persistent le plus longtemps.",
          "Chaque refus, chaque vidéo qui fait 50 vues, chaque concert devant 20 personnes fait partie du chemin.",
          "La musique sénégalaise a un potentiel mondial encore largement inexploité. Tu arrives au bon moment.",
          "Ce livre t'a donné les outils. La suite dépend uniquement de toi.",
        ]} />
        <Callout color={GOLD} title="Le mot de la fin"
          text={`KEKELI signifie "Lumière" en langue Ewe. Ce manuel existe pour une seule raison : mettre la lumière sur ton chemin d'artiste. Tu as maintenant la carte. Il te reste à marcher.`} />
        <div style={{ margin: "12px 0", padding: "14px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #EFF6FF, #F0F9FF)", border: "2px solid #1877F225", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10px", right: "12px", background: "#1877F2", borderRadius: "4px", padding: "2px 8px" }}>
            <span style={{ fontFamily: F, fontSize: "7px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>FORMATION INCLUSE</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: F, fontSize: "18px" }}>f</span>
            </div>
            <div>
              <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: "#1877F2", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>KEKELI Academy · Publicité Digitale</p>
              <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color: DARK, margin: "2px 0 0" }}>Formation Facebook Ads Pro — Meta Business Manager</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#44403C", lineHeight: 1.6, margin: "0 0 10px" }}>
            Crée, cible et optimise tes campagnes Facebook Ads comme un professionnel. Cette formation couvre le Business Manager, les audiences personnalisées, le retargeting, les formats vidéo et les budgets adaptés au marché sénégalais et ouest-africain. Valable aussi pour Instagram Ads (même plateforme Meta).
          </p>
          <a href="https://drive.google.com/drive/folders/1nxm2fVRsQWKVNtA_sPoz_rcxRLVf_oAX?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "6px", background: "#1877F2", textDecoration: "none" }}>
            <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "#fff" }}>📂 Accéder à la formation Facebook Ads →</span>
          </a>
          <p style={{ fontFamily: F, fontSize: "7.5px", color: "#9CA3AF", margin: "6px 0 0" }}>Lien : drive.google.com → Formation Facebook KEKELI Academy</p>
        </div>
        <div style={{ marginTop: "16px", padding: "14px", borderRadius: "10px", background: `${GOLD}10`, border: `1px solid ${GOLD}30`, textAlign: "center" }}>
          <p style={{ fontFamily: FD, fontSize: "18px", color: DARK, margin: "0 0 4px" }}>Construis ta carrière avec intention.</p>
          <p style={{ fontFamily: F, fontSize: "11px", color: "#78716C", margin: 0 }}>Et si jamais tu as besoin d'aide, nous sommes là.</p>
        </div>
      </ContentPage>

      {/* ── P95 — RESSOURCES & GLOSSAIRE ── */}
      <ContentPage chapter="Ressources & Glossaire" accent={ACC} pageNum={95} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Glossaire : les termes essentiels</SH2>
        <MiniTable color={ACC}
          headers={["Terme", "Définition"]}
          rows={[
            ["BSDA", "Bureau Sénégalais du Droit d'Auteur — organisme de gestion collective des droits au Sénégal"],
            ["ISRC", "International Standard Recording Code — code unique pour chaque enregistrement musical"],
            ["UPC", "Universal Product Code — code unique pour chaque album ou EP distribué"],
            ["Split Sheet", "Document qui définit la répartition des droits entre tous les créateurs d'un morceau"],
            ["EPK", "Electronic Press Kit — dossier de presse numérique de l'artiste"],
            ["Master", "L'enregistrement original d'un morceau — celui qui détient les masters contrôle la musique"],
            ["Royalties", "Redevances perçues à chaque écoute, téléchargement ou diffusion d'un morceau"],
            ["CPM", "Cost Per Mille — revenu pour 1 000 vues publicitaires sur YouTube"],
            ["DAW", "Digital Audio Workstation — logiciel de production musicale (FL Studio, Logic, Ableton)"],
            ["DSP", "Digital Service Provider — plateforme de streaming (Spotify, Boomplay, Apple Music)"],
            ["Pitch", "Soumission d'un morceau à une équipe éditoriale Spotify pour placement en playlist"],
            ["Canvas", "Vidéo courte en boucle (3-8 sec) affichée sur Spotify pendant l'écoute d'un morceau"],
            ["Hook", "L'accroche — les premières secondes d'une vidéo qui décident si quelqu'un regarde"],
            ["UGC", "User Generated Content — contenu créé par les fans autour de ton son (TikTok)"],
            ["YPP", "YouTube Partner Program — programme de monétisation des vidéos YouTube"],
          ]}
        />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* PARTIE 2 — APPROFONDISSEMENT (P96–P150)           */}
      {/* ══════════════════════════════════════════════════ */}

      {/* ── MODULE 17 : L'ARTISTE INDÉPENDANT (P96–P106) ── */}
      <ChapterPage num={17} title="PRO 17 — L'Artiste Indépendant Pro : Sans Label, Mais Pro" accent={ACC} pageNum={96} total={TOTAL} guideLabel={LABEL}
        hook="Pas de label, pas d'avance, pas de manager — et pourtant plus libre, plus rentable et plus en contrôle que n'importe quel artiste signé en Afrique. En 2026, l'indépendance n'est plus un manque de chance. C'est un choix stratégique de pro." />

      <ContentPage chapter="Module 17 — Artiste Indépendant" accent={ACC} pageNum={97} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi ne pas signer avec un label (encore)</SH2>
        <Body>Beaucoup d'artistes sénégalais rêvent de signature avec un label. Mais la réalité de l'industrie africaine en 2026 est que les labels locaux offrent rarement les conditions qui bénéficient à l'artiste.</Body>
        <MiniTable color={ACC}
          headers={["Critère", "Label traditionnel", "Artiste indépendant"]}
          rows={[
            ["Revenus streaming", "30-50% pour l'artiste", "100% pour l'artiste"],
            ["Contrôle artistique", "Label décide", "Tu décides tout"],
            ["Droits sur les masters", "Label les garde (souvent)", "Tu les gardes toujours"],
            ["Avance récupérée sur royalties", "Oui — tu dois rembourser", "N/A — pas d'avance"],
            ["Durée du contrat", "3-5 ans minimum", "Libre à tout moment"],
            ["Besoin de permission", "Oui pour chaque sortie", "Non — tu décides"],
          ]}
        />
        <Callout color={ACC} title="Quand considérer un label ?"
          text="Un label devient intéressant quand il t'offre : (1) une avance non récupérable, (2) une équipe de promotion dédiée avec un réseau réel, (3) un accès à des marchés que tu ne peux pas atteindre seul (tournées internationales, syncs). Si ces 3 conditions ne sont pas réunies, reste indépendant." />
      </ContentPage>

      <ContentPage chapter="Module 17 — Artiste Indépendant" accent={ACC} pageNum={98} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 3 modèles de carrière indépendante</SH2>
        <NumberedList color={ACC} items={[
          "LE MODÈLE STREAMING-FIRST — Priorité absolue sur la distribution digitale et la croissance des plateformes. Revenus principaux : streaming + YouTube Adsense. Idéal pour les genres internationaux (afrobeats, afrofusion).",
          "LE MODÈLE LIVE-FIRST — Priorité sur les concerts, mariages, événements corporate. Le digital sert de vitrine pour attirer des bookings. Idéal pour le mbalax, le gospel, la musique de cérémonie.",
          "LE MODÈLE CRÉATEUR-FIRST — Priorité sur le contenu digital (TikTok, YouTube, Instagram). Revenus principaux : partenariats marques, influence, formations. Idéal pour les profils polyvalents (chanteur + créateur de contenu).",
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Quel modèle choisir ?</SH3>
        <MiniTable color={ACC}
          headers={["Situation", "Modèle recommandé"]}
          rows={[
            ["Début de carrière, peu de budget", "Créateur-First (coût zéro)"],
            ["Bonne voix, réseau ecclésiastique/social", "Live-First (revenus rapides)"],
            ["Genre moderne, cible diaspora", "Streaming-First (long terme)"],
            ["Multitalents, présence forte en ligne", "Hybride Créateur + Streaming"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 17 — Artiste Indépendant" accent={ACC} pageNum={99} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Étude de cas comparative : Moussa vs Ibrahima</SH2>
        <CaseStudy
          title="Artiste A vs Artiste B — Même point de départ, résultats différents"
          subtitle="Deux artistes dakarois, gospel urbain, 0 budget de départ, lancés en janvier 2023"
          color={ACC}
          left={{
            label: "MOUSSA — Stratégie passive",
            emoji: "❌",
            items: [
              "Sort 1 chanson, attend les résultats",
              "Publie sur Facebook 1 fois par semaine",
              "Compte sur les amis pour partager",
              "0 FCFA en publicité",
              "Pas de stratégie de contenu",
              "Répond aux DMs une fois par semaine",
              "Refuse les collaborations",
            ],
            result: "Après 12 mois : 340 vues YouTube, 89 abonnés TikTok, 0 revenus, abandon envisagé"
          }}
          right={{
            label: "IBRAHIMA — Stratégie active",
            emoji: "✅",
            items: [
              "3 TikToks par jour pendant 90 jours",
              "WhatsApp Business configuré",
              "500 contacts WhatsApp notifiés le jour J",
              "50 000 FCFA en YouTube Ads semaine 2",
              "2 collaborations avec artistes locaux",
              "Réponse à tous les commentaires H24",
              "Pitch Spotify for Artists soumis",
            ],
            result: "Après 12 mois : 28 000 vues YT, 6 200 TikTok, 2 concerts payants, 185 000 FCFA/mois"
          }}
        />
        <Body>La différence n'était pas la qualité musicale — les deux artistes avaient un niveau similaire. La différence était uniquement stratégique.</Body>
      </ContentPage>

      <ContentPage chapter="Module 17 — Artiste Indépendant" accent={ACC} pageNum={100} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Construire son équipe indépendante avec 0 budget</SH2>
        <Body>Tu n'as pas besoin de payer une équipe pour commencer. Tu as besoin de trouver des personnes qui croient en toi et qui ont des compétences complémentaires.</Body>
        <MiniTable color={ACC}
          headers={["Rôle", "Où trouver", "Arrangement possible"]}
          rows={[
            ["Graphiste", "Écoles d'art, UCAD, Instagram", "Crédit sur les œuvres + exposition"],
            ["Vidéaste", "Étudiants cinéma, Instagram", "Portfolio building + crédit"],
            ["Community Manager", "Fac de communication", "Stage + référence professionnelle"],
            ["Beatmaker", "Réseau gospel/urbain local", "Part sur les royalties (Split Sheet)"],
            ["Photographe", "Instagram local, groupes FB", "Portfolio + crédit photo officiel"],
          ]}
        />
        <Callout color={GRN} title="La règle de la réciprocité"
          text="Offre quelque chose avant de demander. Un graphiste qui débute veut du portfolio visible. Un vidéaste qui commence veut des projets à montrer. Propose une collaboration gagnant-gagnant, pas de l'exploitation. Chaque personne qui travaille avec toi est ton ambassadeur." />
        <Checklist color={ACC} title="Équipe minimale recommandée (Année 1)" items={[
          "Toi : création musicale + présence sur les réseaux (quotidien)",
          "1 graphiste : covers, flyers, templates réseaux (1-2x/mois)",
          "1 vidéaste : 1 clip tous les 2-3 mois + BTS",
          "1 photographe : shooting presse tous les 6 mois",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 17 — Artiste Indépendant" accent={ACC} pageNum={101} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'artiste indépendant et les contrats : ce qu'il faut savoir</SH2>
        <Testimony text="J'ai perdu mes droits sur mes 3 premiers singles parce que j'ai signé un «contrat de collaboration» sans le lire. L'autre partie s'est approprié mes masters. Maintenant ces sons génèrent des revenus que je ne perçois plus." author="Artiste sénégalais anonyme" role="Dakar, expérience 2022" color="#DC2626" />
        <SH3 color={ACC}>Les 5 clauses à vérifier dans TOUT contrat</SH3>
        <NumberedList color={ACC} items={[
          "QUI DÉTIENT LES MASTERS ? — Si le label garde les masters, tu ne peux jamais redistribuer ou licencier ta propre musique sans permission.",
          "DURÉE DU CONTRAT — Maximum 2-3 ans avec option de renouvellement mutuel. Refuse les contrats de plus de 5 ans.",
          "TERRITOIRES — Le contrat couvre quelle zone géographique ? Si «monde entier», négocie une clause de résiliation si les objectifs ne sont pas atteints.",
          "TAUX DE ROYALTIES — Pour les artistes africains émergents : jamais moins de 50% après récupération des avances.",
          "CLAUSE DE RÉSILIATION — Comment sortir du contrat ? Quelles conditions ? Quelle durée de préavis ?",
        ]} />
        <Callout color={GOLD} title="Règle d'or"
          text="Ne signe jamais un contrat le jour même où on te le présente. Demande 72 heures minimum. Si l'autre partie insiste pour que tu signes immédiatement, c'est un signal d'alarme." />
      </ContentPage>

      {/* ── MODULE 18 : ÉTUDES DE CAS RÉELS (P102–P110) ── */}
      <ChapterPage num={18} title="PRO 18 — Cas Réels : Comment Ils Sont Devenus Pros" accent={GRN} pageNum={102} total={TOTAL} guideLabel={LABEL}
        hook="La meilleure façon d'apprendre à devenir pro, c'est d'étudier des pros qui l'ont fait avant toi. Voici des cas réels d'artistes africains — leurs stratégies exactes, leurs erreurs évitées, et les leçons applicables dès aujourd'hui." />

      <ContentPage chapter="Module 18 — Études de cas" accent={GRN} pageNum={103} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Cas 1 : Nix — Du Sénégal au monde sans major</SH2>
        <ArtistCard name="Nix" genre="Afropop / Afrobeats" country="Dakar, Sénégal" followers="500K+ YouTube" revenue="Tournées Europe + Afrique" status="success" color={GRN} />
        <SH3 color={GRN}>Ce qu'il a fait différemment</SH3>
        <BulletList color={GRN} items={[
          { bold: "Identité visuelle forte :", text: "Style reconnaissable immédiatement, esthétique cohérente sur toutes les plateformes" },
          { bold: "Bilinguisme stratégique :", text: "Wolof + Français + Anglais — permet de toucher Sénégal, diaspora ET marché international" },
          { bold: "Distribution internationale précoce :", text: "Sur Spotify et Apple Music avant que ce soit courant pour les artistes sénégalais" },
          { bold: "Collaborations ciblées :", text: "Feats avec artistes nigérians et ivoiriens pour accéder à leurs audiences" },
          { bold: "Live performance :", text: "Présence scénique travaillée, concerts en Europe dès les débuts" },
        ]} />
        <Callout color={GRN} title="La leçon de Nix"
          text="Son identité «afrobeats sénégalais» était claire et assumée avant que ce soit populaire. Il n'a pas attendu d'être validé localement pour viser l'international. La diaspora sénégalaise en Europe a été son premier marché cible." />
      </ContentPage>

      <ContentPage chapter="Module 18 — Études de cas" accent={GRN} pageNum={104} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Cas 2 : L'artiste gospel qui a échoué (cas réel anonymisé)</SH2>
        <ArtistCard name="Artiste X (anonymisé)" genre="Gospel Urbain" country="Dakar, Sénégal" followers="1 200 YouTube (après 3 ans)" revenue="0 FCFA de revenus musicaux" status="fail" color="#DC2626" />
        <SH3 color="#DC2626">Les erreurs identifiées</SH3>
        <BulletList color="#DC2626" items={[
          { bold: "Sortie sans préparation :", text: "Single publié sans promotion, sans liste WhatsApp, sans budget pub" },
          { bold: "Identité visuelle inexistante :", text: "Photos amateur, covers créées sur une application téléphone gratuite" },
          { bold: "Contenu rare :", text: "1 publication par mois maximum, parfois 3 mois de silence" },
          { bold: "Genre flou :", text: "Gospel traditionnel + RnB + Mbalax dans un même EP — audience perdue" },
          { bold: "Pas de BSDA :", text: "3 ans de diffusions radio non déclarées = royalties perdues pour toujours" },
          { bold: "Confusion chantre/artiste :", text: "Priorité au service dans l'église sur le développement de la carrière" },
        ]} />
        <Callout color={AMB} title="Ce que ce cas nous enseigne"
          text="Ce n'est pas un manque de talent qui a causé l'échec — cet artiste avait une voix exceptionnelle. C'est l'absence de stratégie, de constance et d'investissement dans sa communication. Le talent sans stratégie reste invisible." />
      </ContentPage>

      <ContentPage chapter="Module 18 — Études de cas" accent={GRN} pageNum={105} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Cas 3 : La méthode TikTok → Concert en 6 mois</SH2>
        <Body>Voici la trajectoire réelle d'un artiste afrotrap dakarois qui a utilisé TikTok comme seul outil de lancement.</Body>
        <MiniTable color={GRN}
          headers={["Mois", "Action", "Résultat"]}
          rows={[
            ["Janv.", "Crée compte TikTok, 3 vidéos/jour, extraits de 15 sec", "0 followers au départ"],
            ["Févr.", "Continue, 1 vidéo virale (40 000 vues)", "2 800 followers TikTok"],
            ["Mars", "Annonce sortie single, teasing quotidien", "6 100 followers, 500 pre-saves"],
            ["Avr.", "Sort le single, YouTube Ads 75 000 FCFA", "45 000 vues YouTube, 8 500 TikTok"],
            ["Mai", "2e single + Lives TikTok réguliers", "12 000 TikTok, 1er contact organisateur"],
            ["Juin", "Concert à Dakar — 180 personnes, billet 3 000 FCFA", "540 000 FCFA de recettes brutes"],
          ]}
        />
        <Callout color={GRN} title="Budget total investi : 150 000 FCFA"
          text="75 000 FCFA en YouTube Ads + 75 000 FCFA en Meta Ads. Retour sur investissement : 540 000 FCFA en un seul concert. Ratio ROI : 3,6x en 6 mois. Ce n'est pas un miracle — c'est une stratégie appliquée avec constance." />
      </ContentPage>

      <ContentPage chapter="Module 18 — Études de cas" accent={GRN} pageNum={106} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Cas 4 : Wally Seck — Les leçons d'un géant</SH2>
        <Body>Wally Seck est l'exemple parfait d'un artiste africain qui a construit une marque globale tout en restant ancré dans son identité culturelle sénégalaise. Voici ce que chaque artiste peut apprendre de lui.</Body>
        <ArtistCard name="Wally Seck" genre="Mbalax Modernisé" country="Dakar, Sénégal" followers="2M+ tous réseaux" revenue="Concerts internationaux + streaming" status="success" color={GRN} />
        <SH3 color={GRN}>Les 5 principes de sa réussite</SH3>
        <NumberedList color={GRN} items={[
          "IDENTITÉ CULTURELLE ASSUMÉE — N'a jamais renié le mbalax pour plaire à un marché international. Son authenticité EST sa différence.",
          "GÉNÉROSITÉ PUBLIQUE — Sa réputation de générosité envers ses fans et son entourage crée une loyauté extraordinaire.",
          "QUALITÉ DE PRODUCTION CONSTANTE — Chaque sortie est soignée visuellement et musicalement. Jamais de contenu amateur.",
          "PRÉSENCE LIVE IRREMPLAÇABLE — Concert = expérience unique que le streaming ne peut pas reproduire. Prix du billet élevé = valeur perçue.",
          "EXPANSION SOUS-RÉGIONALE — A investi dans des marchés hors Sénégal (Côte d'Ivoire, Mali, Guinée) avant de viser l'Europe.",
        ]} />
      </ContentPage>

      {/* ── MODULE 19 : COMPARATIF OUTILS (P107–P115) ── */}
      <ChapterPage num={19} title="PRO 19 — Guide des Outils Pro : Lequel Choisir et Pourquoi" accent={BLU} pageNum={107} total={TOTAL} guideLabel={LABEL}
        hook="Un amateur utilise les outils gratuits qu'il connaît. Un pro choisit ses outils en fonction de ses objectifs et de son contexte sénégalais. Voici le comparatif complet de chaque catégorie d'outils — avec un verdict clair pour chaque situation." />

      <ContentPage chapter="Module 19 — Guide des outils" accent={BLU} pageNum={108} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Distributeurs : Comparatif complet 2026</SH2>
        <ToolCard name="DistroKid" logo="🟢" price="19$/an (illimité)" for="Artistes actifs (3+ sorties/an)"
          pros={["Sorties illimitées pour un tarif fixe", "Livraison rapide (24-48h)", "Paiement 100% royalties", "Interface simple, mobile-friendly", "TikTok + Instagram inclus"]}
          cons={["Abonnement annuel obligatoire", "Support client lent", "Pas idéal pour artistes occasionnels"]}
          verdict="Notre recommandation #1 pour les artistes sénégalais actifs." color={BLU} />
        <ToolCard name="TuneCore" logo="🔵" price="9.99$/single ou 29.99$/album/an" for="Artistes occasionnels (1-2 sorties/an)"
          pros={["Paiement 100% royalties", "Bon support client", "Rapports détaillés", "Solide réputation internationale"]}
          cons={["Coûteux si tu sors beaucoup", "Interface moins intuitive", "Renouvellement annuel payant"]}
          verdict="Bon choix si tu sors 1 à 2 singles par an seulement." color={BLU} />
      </ContentPage>

      <ContentPage chapter="Module 19 — Guide des outils" accent={BLU} pageNum={109} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Distributeurs (suite)</SH2>
        <ToolCard name="CD Baby" logo="⚪" price="9.95$/single, 29$/album" for="Artistes établis cherchant la stabilité"
          pros={["Présent depuis 1998 — très fiable", "Sync licensing disponible", "Publishing administration", "Support téléphonique"]}
          cons={["Prend 9% sur les royalties", "Interface datée", "Moins adapté aux marchés africains"]}
          verdict="Bon pour artistes qui veulent aussi placer leur musique en films/pubs (syncs)." color={BLU} />
        <ToolCard name="Amuse" logo="🟡" price="Gratuit (limité) ou 19.99$/an" for="Artistes débutants sans budget"
          pros={["Version gratuite disponible", "Interface propre", "Livraison Spotify + Apple Music"]}
          cons={["Couverture de plateformes limitée en gratuit", "Pas disponible sur Boomplay", "Moins fiable pour le marché africain"]}
          verdict="Pour commencer sans argent, mais passe à DistroKid dès que tu as du budget." color={BLU} />
        <Callout color={BLU} title="Notre verdict final"
          text="Pour 90% des artistes sénégalais : DistroKid + compte Boomplay direct = couverture idéale. DistroKid gère le monde, Boomplay gère l'Afrique. Ces deux outils ensemble coûtent environ 19$/an et couvrent 150+ plateformes." />
      </ContentPage>

      <ContentPage chapter="Module 19 — Guide des outils" accent={BLU} pageNum={110} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Outils de création de contenu : comparatif</SH2>
        <ToolCard name="Canva Pro" logo="🎨" price="6 000 FCFA/mois (~13$)" for="Graphisme facile pour non-designers"
          pros={["Templates professionnels prêts", "Taille pour tous les réseaux auto", "Brand kit (couleurs, logo, fonts)", "Collaboration en équipe"]}
          cons={["Designs reconnaissables si pas personnalisés", "Limites créatives vs Photoshop"]}
          verdict="Indispensable. L'investissement le plus rentable pour un artiste solo." color={BLU} />
        <ToolCard name="CapCut" logo="📱" price="Gratuit" for="Montage vidéo TikTok/Reels"
          pros={["Gratuit et très complet", "Effets TikTok intégrés", "Sous-titres automatiques IA", "Transitions professionnelles"]}
          cons={["Watermark sur certains effets premium", "Moins puissant que Premiere Pro"]}
          verdict="L'outil n°1 pour créer des Reels et TikToks rapidement. Utilise-le quotidiennement." color={BLU} />
        <ToolCard name="InShot" logo="✂️" price="Gratuit / 3 500 FCFA/mois" for="Montage vidéo mobile"
          pros={["Simple et rapide", "Format vertical parfait TikTok", "Textes et stickers musicaux"]}
          cons={["Fonctionnalités limitées vs CapCut", "Publicités en version gratuite"]}
          verdict="Alternative à CapCut si tu préfères une interface plus simple." color={BLU} />
      </ContentPage>

      <ContentPage chapter="Module 19 — Guide des outils" accent={BLU} pageNum={111} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Outils de paiement et de vente au Sénégal</SH2>
        <Body>La question que tout artiste sénégalais se pose : comment recevoir de l'argent en ligne ? Voici les solutions qui fonctionnent réellement.</Body>
        <MiniTable color={BLU}
          headers={["Outil", "Pour quoi", "Commission", "Disponible au SN"]}
          rows={[
            ["Wave", "Paiements locaux (billets, merch)", "Gratuit entre particuliers", "Oui"],
            ["Orange Money", "Paiements locaux", "Variable", "Oui"],
            ["Payoneer", "Recevoir royalties étrangères", "2-3% par retrait", "Oui (avec compte bancaire)"],
            ["PayPal", "Paiements internationaux", "3-5%", "Limité au Sénégal"],
            ["Stripe / Sumup", "Paiements carte bancaire", "1.5-2.9% + frais", "Limité"],
            ["Gumroad", "Vente directe produits numériques", "10% + frais Paypal", "Accessible"],
          ]}
        />
        <Callout color={BLU} title="La combinaison recommandée"
          text="Wave + Orange Money pour la vente locale (billets, merch, formations). Payoneer pour recevoir tes royalties DistroKid/Spotify. Ces deux combinés couvrent 95% de tes besoins financiers en tant qu'artiste sénégalais." />
      </ContentPage>

      <ContentPage chapter="Module 19 — Guide des outils" accent={BLU} pageNum={112} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Outils analytics : comprendre ses données</SH2>
        <Body>Tu ne peux pas améliorer ce que tu ne mesures pas. Ces outils gratuits te donnent toutes les informations nécessaires pour prendre de meilleures décisions.</Body>
        <MiniTable color={BLU}
          headers={["Outil", "Données disponibles", "Accès"]}
          rows={[
            ["YouTube Studio", "Vues, watch time, abonnés, revenus, démographie", "Gratuit - youtube.com/studio"],
            ["TikTok Analytics", "Vues, followers, engagement, pays, heures", "Gratuit - compte Pro requis"],
            ["Spotify for Artists", "Streams, saves, playlists, pays des auditeurs", "Gratuit - artists.spotify.com"],
            ["Instagram Insights", "Reach, impressions, clics profil, followers", "Gratuit - compte Créateur"],
            ["DistroKid Reports", "Royalties par plateforme et par pays", "Inclus dans l'abonnement"],
            ["Boomplay for Artists", "Streams, pays, tendances Afrique", "Gratuit - pour artistes distribués"],
          ]}
        />
        <Checklist color={BLU} title="À vérifier chaque semaine" items={[
          "YouTube : quelle vidéo a le plus de vues ce mois ? Quel pays tes viewers viennent ?",
          "TikTok : quelles vidéos ont le meilleur taux de complétion ? Quel jour performe le mieux ?",
          "Spotify : tes streams augmentent ou baissent ? Qui te sauvegarde dans ses playlists ?",
          "DistroKid : tes royalties de quel pays sont les plus élevées ?",
        ]} />
      </ContentPage>

      {/* ── MODULE 20 : ARTISTE GOSPEL AU SÉNÉGAL (P113–P122) ── */}
      <ChapterPage num={20} title="PRO 20 — L'Artiste Gospel Pro : Manuel Spécialisé" accent={GOLD} pageNum={113} total={TOTAL} guideLabel={LABEL}
        hook="Le gospel africain est le segment musical le moins compétitif et le plus sous-exploité du digital en Afrique francophone. Pendant que des centaines d'artistes se battent en afrobeats, l'artiste gospel pro qui maîtrise ce module devient LA référence de son marché." />

      <ContentPage chapter="Module 20 — Artiste Gospel" accent={GOLD} pageNum={114} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La distinction fondamentale : Chantre vs Artiste Gospel</SH2>
        <Body>Cette distinction est fondamentale et souvent incomprise en Afrique de l'Ouest. Beaucoup d'artistes gospel démarrent leur parcours sans jamais l'avoir clairement définie — et c'est précisément ce flou qui freine leur développement professionnel. Ce module y répond de façon directe.</Body>
        <MiniTable color={GOLD}
          headers={["Critère", "Le Chantre", "L'Artiste Gospel"]}
          rows={[
            ["Mission", "Service spirituel dans le temple", "Proclamer l'Évangile par l'art + carrière"],
            ["Public", "Assemblée de l'église uniquement", "Monde entier — croyants et non-croyants"],
            ["Inspiration", "Don spirituel, sacerdoce", "Don + stratégie + travail"],
            ["Revenus", "Généralement bénévole", "Professionnalisation, monétisation"],
            ["Outils", "Pas nécessaires", "Distribution, réseaux, marketing, BSDA"],
            ["Formation requise", "Spirituelle", "Spirituelle + business + technique"],
          ]}
        />
        <Callout color={GOLD} title="La vérité que personne ne dit"
          text="Être un excellent chantre ne prépare pas à être un artiste gospel. Un artiste gospel est un entrepreneur de la foi. Il a les mêmes responsabilités stratégiques qu'un artiste non-gospel, avec en plus une responsabilité spirituelle envers son audience." />
      </ContentPage>

      <ContentPage chapter="Module 20 — Artiste Gospel" accent={GOLD} pageNum={115} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le marché du gospel en Afrique francophone</SH2>
        <StatRow color={GOLD} stats={[
          { value: "300M+", label: "Chrétiens en Afrique sub-saharienne", sub: "Marché potentiel énorme" },
          { value: "<500", label: "Artistes gospel distribués digitalement", sub: "Très peu de concurrence" },
          { value: "×5", label: "Engagement moyen gospel vs pop", sub: "Communauté très fidèle" },
          { value: "72h", label: "Durée d'écoute weekly gospel", sub: "VS 45h pour autres genres" },
        ]} />
        <Callout color={GOLD} title="L'opportunité masquée"
          text="Le gospel africain francophone est l'un des genres les moins saturés sur les plateformes digitales. Pendant que des centaines d'artistes se battent pour percer en afrobeats, le gospel francophone africain attend d'être colonisé par des artistes stratégiques." />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Plateformes prioritaires pour le gospel africain</SH3>
        <MiniTable color={GOLD}
          headers={["Plateforme", "Raison de priorité"]}
          rows={[
            ["YouTube", "Les témoignages et worship sessions font des millions de vues"],
            ["Facebook", "Les chrétiens africains de 30-60 ans sont majoritairement sur Facebook"],
            ["WhatsApp", "Le gospel se partage massivement via WhatsApp dans les communautés"],
            ["Boomplay", "Forte pénétration dans les églises africaines"],
            ["Spotify", "Diaspora chrétienne africaine en Europe"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 20 — Artiste Gospel" accent={GOLD} pageNum={116} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le personal branding d'un artiste gospel</SH2>
        <Body>Contrairement à ce que pensent beaucoup d'artistes gospel africains, le personal branding n'est pas une trahison de la foi. C'est l'outil qui permet à ton message d'atteindre plus de personnes.</Body>
        <SH3 color={GOLD}>Les 4 dimensions du branding gospel</SH3>
        <NumberedList color={GOLD} items={[
          "LA DIMENSION SPIRITUELLE — Tes valeurs, ta foi, ta mission évangélique. C'est le fondement qui rend ton message authentique et non compromis.",
          "LA DIMENSION ARTISTIQUE — Ton genre (gospel urbain, contemporain, traditionnel, worship), ton style vocal, ton univers musical distinctif.",
          "LA DIMENSION PROFESSIONNELLE — Ta biographie, ton EPK, tes photos presse, ton dossier de presse. La face que voient les médias, les organisateurs, les labels gospel.",
          "LA DIMENSION COMMUNAUTAIRE — Comment tu te connectes avec tes fans, comment tu les engages au-delà de la musique (groupes de prière, témoignages, étude biblique).",
        ]} />
        <Callout color={GOLD} title="L'équation du gospel qui performe"
          text="Message authentique + Esthétique contemporaine + Stratégie digitale = Impact maximum. Le gospel qui touche les jeunes en 2026 ressemble à la musique qu'ils aiment déjà (afrobeats, trap, RnB) mais avec un message de vie. C'est exactement ce que font les plus grands artistes gospel US et brésiliens." />
      </ContentPage>

      <ContentPage chapter="Module 20 — Artiste Gospel" accent={GOLD} pageNum={117} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Artistes Gospel de Référence : Ce qu'ils font bien</SH2>
        <Body>Ces artistes sont tes modèles professionnels. Chacun a une stratégie distincte que tu peux étudier, adapter et appliquer à ta réalité sénégalaise. Ce n'est pas les copier — c'est s'en inspirer intelligemment.</Body>
        <MiniTable color={GOLD}
          headers={["Artiste", "Stratégie distincte", "Leçon applicable"]}
          rows={[
            ["Kirk Franklin (USA)", "A modernisé le gospel avec hip-hop/R&B malgré les critiques de l'église", "Innover musicalement sans trahir le message — le contexte change, pas la foi"],
            ["CeCe Winans (USA)", "40 ans de carrière sans compromis — intégrité absolue sur le long terme", "La longévité est une stratégie. Mieux vaut durer 30 ans que buzzer 3 mois"],
            ["Nathaniel Bassey (Nigeria)", "Hallelujah Challenge : Live Instagram prière = millions de vus, mouvement mondial", "Un simple live de worship peut devenir viral si l'intention est pure et la constance réelle"],
            ["Moses Bliss (Nigeria)", "Artiste 100% indépendant — aucun label majeur, carrière construite digitalement", "L'indépendance gospel est possible et rentable si tu maîtrises les outils de ce livre"],
            ["Dena Mwana (Congo/France)", "Gospel francophone africain porté jusqu'aux grandes scènes européennes", "Ta langue est un atout. Le français + les langues africaines = marché francophone mondial"],
            ["Lecrae (USA)", "Rap chrétien dans les charts séculiers — a refusé la ségrégation gospel/monde", "Le gospel urbain moderne ne doit pas avoir peur du mainstream. Le message s'y diffuse mieux"],
            ["Chandler Moore (USA)", "Maverick City Music : worship authentique, diversité, production moderne", "L'authenticité et la modernité ne s'excluent pas — elles se renforcent"],
            ["Limoblaze (Nigeria)", "Christian hip-hop 100% digital, aucune dépendance aux médias traditionnels", "TikTok + YouTube + Instagram suffisent pour une vraie carrière gospel urbaine"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 20 — Artiste Gospel" accent={GOLD} pageNum={118} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Études de cas : Profiles Détaillés</SH2>
        <div style={{ padding: "8px 12px", borderRadius: "8px", background: "#FFF8E7", border: "1px dashed #C8A84B", marginBottom: "8px" }}>
          <p style={{ fontFamily: F, fontSize: "7.5px", fontWeight: 800, color: GOLD, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 4px" }}>
            [DESIGNER — Insérer ici les photos officielles de chaque artiste (portrait HD, même style)]
          </p>
          <p style={{ fontFamily: F, fontSize: "8px", color: "#92400E", margin: 0 }}>
            Photos recommandées : Amset (photo presse officielle), Deborah Lukalu, KS Bloom, Tito Prince — toutes en couleur, fond cohérent. Demander autorisation si nécessaire.
          </p>
        </div>
        <ArtistCard name="Amset (Sénégal)" genre="Gospel Urbain · Wolof/Français" country="Dakar, Sénégal" followers="Fondateur Galsen Gospel Urbain" revenue="Stratégie gospel urbain africaine moderne" status="success" color={GOLD} />
        <ArtistCard name="Deborah Lukalu (Congo/UK)" genre="Gospel Contemporain" country="Congo / Royaume-Uni" followers="Millions de vues YouTube" revenue="Scènes internationales + streaming fort" status="success" color={GOLD} />
        <ArtistCard name="KS Bloom (Nigeria)" genre="Gospel Contemporain Digital" country="Lagos, Nigeria" followers="Forte présence digitale" revenue="Carrière gospel entièrement digitale" status="success" color={GOLD} />
        <ArtistCard name="Tito Prince" genre="Gospel / Worship Francophone" country="Afrique Francophone" followers="Communauté fidèle et engagée" revenue="Artiste worship francophone de référence" status="success" color={GOLD} />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Ce que font les artistes gospel qui réussissent en 2026</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Identité musicale africaine forte :", text: "Pas une copie du gospel américain — une identité propre, avec les instruments et les langues locales" },
          { bold: "Production moderne sans compromis doctrinaux :", text: "Comme Kirk Franklin et Chandler Moore — le son évolue, le message reste pur" },
          { bold: "Stratégie digitale disciplinée :", text: "Moses Bliss et Limoblaze prouvent qu'un artiste gospel indépendant peut percer en 2026" },
          { bold: "Connexion communauté chrétienne ET public général :", text: "Le talent de Lecrae : toucher les non-croyants sans trahir les croyants" },
          { bold: "Présence francophone revendiquée :", text: "Dena Mwana et Tito Prince montrent la voie — le gospel francophone africain est un marché inexploité" },
          { bold: "Performances live mémorables :", text: "CeCe Winans et Deborah Lukalu — la scène est l'endroit où les fans deviennent des convertis" },
        ]} />
        <Callout color={GOLD} title="Le vide à combler au Sénégal"
          text="Moses Bliss représente le Nigeria. Dena Mwana représente les Congolais de France. KS Bloom représente le gospel digital nigérian. Deborah Lukalu représente le gospel africain anglophone. Qui représente le gospel sénégalais au niveau mondial ? Ce vide est ton opportunité." />
      </ContentPage>

      <ContentPage chapter="Module 20 — Artiste Gospel" accent={GOLD} pageNum={119} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Stratégie de contenu Pro pour l'artiste gospel</SH2>
        <Body>L'artiste gospel a un avantage que n'a aucun autre genre musical : un contenu naturellement authentique, émotionnel et partageable. La foi, les témoignages, les moments de prière sont des contenus que l'algorithme récompense parce que les gens les ressentent profondément.</Body>
        <MiniTable color={GOLD}
          headers={["Type de contenu", "Fréquence", "Engagement attendu", "Exemple référence"]}
          rows={[
            ["Témoignage personnel", "1x/semaine", "Très élevé — partagé en masse", "Nathaniel Bassey — testimonies viraux"],
            ["Worship session acoustique", "2x/semaine", "Élevé — saves et playlists", "CeCe Winans — intimité vocale"],
            ["Verset + message inspirant", "Quotidien", "Moyen mais fidélise", "Kirk Franklin — contenu quotidien"],
            ["Live de prière communauté", "1x/mois", "Très élevé — engagement profond", "Nathaniel Bassey — Hallelujah Challenge"],
            ["Behind the scenes studio", "1x/semaine", "Moyen-élevé — humanisation", "Moses Bliss — coulisses création"],
            ["Extrait clip + Making-of", "À chaque sortie", "Variable selon promo", "Dena Mwana — clips cinématiques"],
            ["Collab artistes gospel", "2-3x/an", "Très élevé — audiences croisées", "Chandler Moore + Maverick City"],
            ["Covers chants d'adoration connus", "Mensuel", "Élevé — SEO et découverte", "Deborah Lukalu — reprises puissantes"],
          ]}
        />
        <Banner text="La stratégie gospel pro : Worship + Témoignage + Vision + Cohérence" sub="Copie ce que Kirk Franklin, Moses Bliss et Nathaniel Bassey ont en commun — pas leur son, mais leur discipline." color={GOLD} />
      </ContentPage>

      {/* ── MODULE 21 : BUDGET COMPLET (P119–P126) ── */}
      <ChapterPage num={21} title="PRO 21 — Le Budget Pro de l'Artiste Sénégalais" accent={AMB} pageNum={119} total={TOTAL} guideLabel={LABEL}
        hook="L'argent n'est jamais le vrai problème — c'est toujours son allocation. Un artiste amateur dépense 100 000 FCFA en studio et sort invisible. Un artiste pro budgète chaque centime avec précision et maximise chaque investissement. Voici les budgets pros à 3 niveaux." />

      <ContentPage chapter="Module 21 — Budget" accent={AMB} pageNum={120} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Budget Lancement Single — 3 niveaux</SH2>
        <BudgetTable color={AMB} title="Budget MINI — 100 000 FCFA" rows={[
          { item: "Production (beat non-exclusif)", min: "15 000", max: "30 000", priority: "haute" },
          { item: "Studio d'enregistrement", min: "20 000", max: "30 000", priority: "haute" },
          { item: "Mixage", min: "25 000", max: "35 000", priority: "haute" },
          { item: "Artwork cover", min: "10 000", max: "20 000", priority: "haute" },
          { item: "DistroKid (annuel)", min: "12 000", max: "12 000", priority: "haute" },
          { item: "Publicité YouTube/Meta", min: "30 000", max: "50 000", priority: "haute" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 21 — Budget" accent={AMB} pageNum={121} total={TOTAL} guideLabel={LABEL}>
        <BudgetTable color={AMB} title="Budget STANDARD — 300 000 FCFA" rows={[
          { item: "Beat exclusif", min: "50 000", max: "100 000", priority: "haute" },
          { item: "Studio + voix (2 sessions)", min: "60 000", max: "80 000", priority: "haute" },
          { item: "Mixage professionnel", min: "75 000", max: "100 000", priority: "haute" },
          { item: "Mastering", min: "35 000", max: "50 000", priority: "haute" },
          { item: "Artwork + shootting photo", min: "50 000", max: "80 000", priority: "haute" },
          { item: "DistroKid", min: "12 000", max: "12 000", priority: "haute" },
          { item: "YouTube Ads + Meta Ads", min: "100 000", max: "150 000", priority: "haute" },
          { item: "Clip vidéo simple", min: "100 000", max: "200 000", priority: "moyenne" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 21 — Budget" accent={AMB} pageNum={122} total={TOTAL} guideLabel={LABEL}>
        <BudgetTable color={AMB} title="Budget PREMIUM — 1 000 000 FCFA" rows={[
          { item: "Beat exclusif premium", min: "150 000", max: "300 000", priority: "haute" },
          { item: "Studio + voix (pack complet)", min: "100 000", max: "150 000", priority: "haute" },
          { item: "Mixage ingénieur référencé", min: "150 000", max: "250 000", priority: "haute" },
          { item: "Mastering professionnel", min: "100 000", max: "150 000", priority: "haute" },
          { item: "Direction artistique + Shooting", min: "150 000", max: "300 000", priority: "haute" },
          { item: "Clip vidéo mid-range", min: "300 000", max: "600 000", priority: "haute" },
          { item: "Campagne pub (30 jours)", min: "300 000", max: "500 000", priority: "haute" },
          { item: "Relations presse", min: "50 000", max: "100 000", priority: "moyenne" },
        ]} />
        <Callout color={AMB} title="La règle d'allocation budgétaire"
          text="Peu importe ton budget : alloue toujours 40-50% en promotion. Un son de qualité moyenne bien promu > un son excellent sans promotion. Si tu as 200 000 FCFA : 100 000 en production, 100 000 en pub." />
      </ContentPage>

      {/* ── MODULE 22 : CAPTURES D'ÉCRAN SIMULÉES (P123–P130) ── */}
      <ChapterPage num={22} title="PRO 22 — Tutoriels Visuels Pro : Écran par Écran" accent={GRN} pageNum={123} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste pro n'improvise pas avec ses outils — il les maîtrise totalement. Ces pages montrent exactement chaque étape, chaque écran, chaque paramètre à configurer pour Spotify, Google Ads et WhatsApp Business. Aucune approximation, aucune excuse." />

      <ContentPage chapter="Module 22 — Tutoriels visuels" accent={GRN} pageNum={124} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Tutoriel : Optimiser son profil Spotify for Artists</SH2>
        <ScreenMock platform="artists.spotify.com" title="Profil Spotify For Artists — Onglet Profile" color={GRN}>
          <MiniTable color={GRN}
            headers={["Section", "Ce que tu dois remplir", "Importance"]}
            rows={[
              ["Profile Image", "Photo 750x750px minimum, haute qualité", "★★★★★"],
              ["Header Image", "2660x1140px — ton univers artistique", "★★★★☆"],
              ["Artist Biography", "1500 chars max, mots-clés, ta ville, ton style", "★★★★★"],
              ["Gallery", "3-5 photos officielles HD récentes", "★★★★☆"],
              ["Canvas Videos", "Vidéos 3-8 sec en boucle pour chaque single", "★★★★★"],
              ["Upcoming Events", "Connecter Songkick ou Bandsintown", "★★★☆☆"],
            ]}
          />
        </ScreenMock>
        <Callout color={GRN} title="⚠️ Erreur classique"
          text="Laisser la biographie vide ou écrire «artiste sénégalais qui aime la musique». Ta bio est ton pitch commercial. Elle doit convaincre un éditeur de playlist de te sélectionner en 30 secondes." />
      </ContentPage>

      <ContentPage chapter="Module 22 — Tutoriels visuels" accent={GRN} pageNum={125} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Tutoriel : Configurer une campagne YouTube Ads</SH2>
        <ScreenMock platform="ads.google.com" title="Google Ads — Nouvelle Campagne Vidéo" color={GRN}>
          <ProcessLine color={GRN} steps={[
            { num: "1", title: "Type", desc: "«Campagne vidéo» → «Notoriété de la marque»" },
            { num: "2", title: "Budget", desc: "Ex: 50 000 FCFA / 7 jours = ~7 000 FCFA/jour" },
            { num: "3", title: "Réseau", desc: "YouTube uniquement (décocher Google Display)" },
            { num: "4", title: "Zones", desc: "Sénégal + France + Italie (diaspora)" },
            { num: "5", title: "Audience", desc: "Intérêts: Musique africaine, Afrobeats, Gospel" },
            { num: "6", title: "Vidéo", desc: "URL YouTube de ton clip officiel" },
          ]} />
        </ScreenMock>
        <Callout color={GRN} title="💡 Ciblage avancé"
          text="Dans la section «Audiences», utilise «Affinités personnalisées» : entre les URL de channels YouTube d'artistes similaires (Wally Seck, Nix, etc.). YouTube va cibler les personnes qui regardent ces artistes — ton audience idéale." />
      </ContentPage>

      <ContentPage chapter="Module 22 — Tutoriels visuels" accent={GRN} pageNum={126} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Tutoriel : Créer sa communauté WhatsApp d'artiste</SH2>
        <ScreenMock platform="WhatsApp Business" title="Créer une Communauté WhatsApp — Guide" color={GRN}>
          <NumberedList color={GRN} items={[
            "Ouvrir WhatsApp Business → «Communautés» (icône en bas)",
            "Tap «Nouvelle communauté» → Nom : [TON NOM] FAMILY",
            "Description : «Communauté officielle de [ton nom] — exclusivités, annonces, prière»",
            "Créer les sous-groupes : 📢 Annonces | 🎵 Musique | 🙏 Prière | 🎟️ Events | 💬 Fans",
            "Partager le lien d'invitation dans tes Stories Instagram et TikTok",
            "Premier message : «Bienvenue dans ma famille ! Voici ce que vous obtiendrez en exclusivité ici...»",
          ]} />
        </ScreenMock>
        <Callout color={GRN} title="Croissance rapide"
          text="Offre quelque chose d'exclusif aux membres fondateurs : un son inédit, un extrait avant tout le monde, une vidéo privée. Les 100 premiers membres deviennent tes ambassadeurs les plus loyaux." />
      </ContentPage>

      {/* ── MODULE 23 : RÉSEAUX SOCIAUX AVANCÉ (P127–P134) ── */}
      <ChapterPage num={23} title="PRO 23 — Réseaux Sociaux Avancés : Niveau Expert" accent={SEC} pageNum={127} total={TOTAL} guideLabel={LABEL}
        hook="Tu maîtrises maintenant les bases. Ce module passe à la vitesse supérieure — algorithmes décryptés, stratégies avancées de croissance, techniques que les pros utilisent pour transformer leurs réseaux en machines à générer des fans et des revenus." />

      <ContentPage chapter="Module 23 — Réseaux avancés" accent={SEC} pageNum={128} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'algorithme TikTok : comment il fonctionne vraiment</SH2>
        <Body>TikTok ne montre pas tes vidéos aléatoirement. Voici exactement comment l'algorithme décide à combien de personnes montrer ta vidéo.</Body>
        <MiniTable color={SEC}
          headers={["Phase", "Taille d'audience", "Signal analysé"]}
          rows={[
            ["Test initial", "200-500 personnes", "Taux de complétion (la métrique n°1)"],
            ["Phase 2 (si >30% complétion)", "2 000-5 000 personnes", "Likes, commentaires, partages"],
            ["Phase 3 (si engagement positif)", "20 000-100 000 personnes", "Sauvegardes, follows générés"],
            ["Phase virale", "100 000+", "Partages externes (WhatsApp, autres apps)"],
          ]}
        />
        <Callout color={SEC} title="La métrique numéro 1 : le taux de complétion"
          text="Si les gens ne regardent pas ta vidéo jusqu'à la fin, TikTok l'enterre immédiatement. L'objectif est que 60%+ des spectateurs regardent jusqu'à la dernière seconde. C'est pourquoi le hook (les 3 premières secondes) est absolument critique." />
        <SH3 color={SEC}>Tactiques pour augmenter le taux de complétion</SH3>
        <BulletList color={SEC} items={[
          { bold: "Vidéos courtes :", text: "15-20 secondes ont un taux de complétion 3x supérieur aux vidéos de 60 secondes" },
          { bold: "Couper court :", text: "Ne laisse jamais de silence ou de temps mort — chaque seconde doit être intentionnelle" },
          { bold: "Boucle parfaite :", text: "La fin de la vidéo peut se connecter au début — l'algorithme récompense les boucles" },
          { bold: "Pattern interrupt :", text: "Change visuellement toutes les 3-5 secondes (coup de caméra, texte, transition)" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 23 — Réseaux avancés" accent={SEC} pageNum={129} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Instagram : les secrets de l'algorithme Reels 2026</SH2>
        <Body>Instagram priorise les Reels qui gardent les gens sur la plateforme. Voici comment l'algorithme te favorise.</Body>
        <MiniTable color={SEC}
          headers={["Signal", "Impact algorithmique", "Comment l'optimiser"]}
          rows={[
            ["Watch time total", "Très élevé", "Vidéos courtes + bonne accroche"],
            ["Sauvegardes (saves)", "Élevé", "Contenus «à revoir plus tard» (tutoriel, info)"],
            ["Partages", "Très élevé", "Contenu émotionnel ou très utile"],
            ["Commentaires", "Élevé", "Poser une question en fin de vidéo"],
            ["Likes", "Moyen", "Ne pas en dépendre"],
            ["Follows depuis le Reel", "Élevé", "Profil optimisé pour convertir"],
          ]}
        />
        <Callout color={SEC} title="La tactique des saves"
          text="Crée des Reels de type «5 choses à savoir sur X» ou «Comment faire Y en 30 secondes». Ce type de contenu pousse les gens à sauvegarder pour y revenir. Les saves sont le signal le plus fort que tu peux envoyer à l'algorithme Instagram." />
      </ContentPage>

      <ContentPage chapter="Module 23 — Réseaux avancés" accent={SEC} pageNum={130} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>YouTube Shorts vs TikTok vs Instagram Reels : lequel prioriser ?</SH2>
        <MiniTable color={SEC}
          headers={["Plateforme", "Portée organique", "Conversion en fans", "Monétisation"]}
          rows={[
            ["TikTok", "★★★★★ La meilleure", "★★★☆☆ Moyenne", "★★☆☆☆ Faible directe"],
            ["Instagram Reels", "★★★★☆ Très bonne", "★★★★☆ Bonne", "★★★☆☆ Partenariats"],
            ["YouTube Shorts", "★★★★☆ Très bonne", "★★★★★ Excellente", "★★★★☆ Bonne (YPP)"],
            ["Facebook Reels", "★★★☆☆ Bonne (35-50 ans)", "★★★☆☆ Moyenne", "★★★☆☆ Stars Lives"],
          ]}
        />
        <Callout color={SEC} title="Stratégie multi-plateforme recommandée"
          text="Crée UNE seule vidéo verticale de qualité. Publie-la sur TikTok d'abord (sans le filigrane). Ensuite republie sur Instagram Reels et YouTube Shorts avec des légendes adaptées à chaque plateforme. 1 vidéo = 3-4 publications = maximum de portée." />
        <SH3 color={DARK}>Outil recommandé : Metricool ou Buffer</SH3>
        <Body>Ces outils permettent de programmer tes publications sur toutes les plateformes depuis un seul endroit. Metricool est gratuit jusqu'à 50 posts/mois — parfait pour commencer.</Body>
      </ContentPage>

      {/* ── MODULE 24 : PLAN D'ACTION 90 JOURS DÉTAILLÉ (P131–P140) ── */}
      <ChapterPage num={24} title="PRO 24 — Plan 90 Jours Pro : Le Programme Intensif" accent={BLU} pageNum={131} total={TOTAL} guideLabel={LABEL}
        hook="90 jours. C'est tout ce qu'il faut pour transformer une situation musicale stagnante en carrière qui progresse. Ce programme est exact, semaine par semaine, action par action. Les pros ne rêvent pas — ils exécutent. C'est exactement ce que tu vas faire pendant les 90 prochains jours." />

      <ContentPage chapter="Module 24 — Plan 90 jours" accent={BLU} pageNum={132} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Semaine 1-2 : La mise en place totale</SH2>
        <Checklist color={BLU} title="JOUR 1-3 : Infrastructure digitale" items={[
          "Créer ou optimiser tous tes profils (TikTok Pro, Instagram Créateur, YouTube, Facebook Page, Spotify for Artists)",
          "Même photo de profil sur tous les réseaux — cohérence visuelle",
          "Créer ton Linktree : tous tes liens en un (YouTube, Spotify, WhatsApp, site)",
          "Mettre le lien Linktree dans TOUTES tes bios",
          "Créer ton compte DistroKid et Payoneer si pas déjà fait",
          "S'inscrire au BSDA si pas encore fait",
        ]} />
        <Checklist color={BLU} title="JOUR 4-7 : Stratégie et contenu" items={[
          "Écrire ta phrase d'ADN artistique (1 heure de travail)",
          "Créer ton Avatar Fan (description précise de ton fan idéal)",
          "Créer ton moodboard sur Pinterest ou Canva",
          "Préparer 21 idées de vidéos TikTok (stock de 3 semaines)",
          "Photographier 5-10 photos de lifestyle authentiques pour Stories",
          "Créer ton groupe WhatsApp + inviter les 50 premiers contacts",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 24 — Plan 90 jours" accent={BLU} pageNum={133} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Semaine 3-6 : La construction de l'audience</SH2>
        <MiniTable color={BLU}
          headers={["Semaine", "TikTok", "Instagram", "YouTube", "WhatsApp"]}
          rows={[
            ["S3", "3 vidéos/jour", "1 Reel + 3 Stories", "2 Shorts", "Diffusion quotidienne"],
            ["S4", "3 vidéos/jour + analyse", "1 Reel + 3 Stories", "2 Shorts + 1 video", "Contenu exclusif fans"],
            ["S5", "3 vidéos/jour + 1er collab", "2 Reels + Stories", "3 Shorts", "Concours partage"],
            ["S6", "3 vidéos/jour + Live TikTok", "2 Reels + 1 carrousel", "3 Shorts + Live", "Annonce sortie single"],
          ]}
        />
        <Callout color={BLU} title="La règle de l'analyse hebdomadaire"
          text="Chaque dimanche soir (30 minutes) : analyse tes 3 meilleures vidéos TikTok de la semaine. Qu'ont-elles en commun ? Le format ? Le sujet ? L'heure de publication ? Reproduis ces éléments la semaine suivante. C'est ainsi que tu trouves ta formule." />
      </ContentPage>

      <ContentPage chapter="Module 24 — Plan 90 jours" accent={BLU} pageNum={134} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Semaine 7-10 : Le lancement du single</SH2>
        <ProcessLine color={BLU} steps={[
          { num: "J-21", title: "Teasing", desc: "30 sec extrait sur TikTok + Stories. «Quelque chose arrive...»" },
          { num: "J-14", title: "Annonce", desc: "Annonce officielle + date + pre-save Spotify + titre" },
          { num: "J-7", title: "Intensification", desc: "BTS studio, lyric cards, challenges, email WhatsApp" },
          { num: "J0", title: "Jour J", desc: "Publication partout simultanément + notification WhatsApp" },
          { num: "J+3", title: "Pub", desc: "50 000 FCFA YouTube Ads pendant 7 jours" },
          { num: "J+10", title: "Diaspora", desc: "75 000 FCFA Meta Ads ciblant France/Italie" },
        ]} />
        <Checklist color={BLU} title="Checklist du Jour J" items={[
          "Morceau disponible sur toutes les plateformes (vérifier !)",
          "Post Instagram : clip ou lyric video + caption soignée",
          "Story Instagram : lien direct Spotify + YouTube",
          "TikTok : 2 vidéos avec le son en featured",
          "Facebook : vidéo native (uploaded directement, pas lien YT)",
          "Diffusion WhatsApp : 3 listes (fans, médias, DJs)",
          "Email WhatsApp communauté avec lien direct",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 24 — Plan 90 jours" accent={BLU} pageNum={135} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Semaine 11-13 : Maintien et optimisation</SH2>
        <Body>Après le lancement, la majorité des artistes s'arrêtent. C'est exactement à ce moment qu'il faut accélérer.</Body>
        <Checklist color={BLU} title="Actions semaines 11-13" items={[
          "Continuer 3 TikToks/jour avec le son featured",
          "Contacter 5 curators de playlists Spotify (via SubmitHub)",
          "Envoyer le single à 10 radios sénégalaises (DFM, RFM, ZIK FM, etc.)",
          "Préparer un Live Instagram ou TikTok de remerciement",
          "Analyser : quelle ville, quel pays, quel âge écoute le plus ?",
          "Commencer le teasing du prochain single (le cycle recommence)",
          "Pitcher le single sur Spotify for Artists pour éditoriaux",
        ]} />
        <Callout color={BLU} title="Bilan à 90 jours : ce que tu dois avoir accompli"
          text="Si tu as suivi ce plan rigoureusement : 2 000-10 000 followers TikTok, 500-3 000 abonnés YouTube, 1 single distribué avec 10 000-100 000 vues, 300+ contacts WhatsApp actifs, et les bases d'une audience engagée. Ce n'est pas la célébrité — c'est le début d'une vraie carrière." />
      </ContentPage>

      {/* ── MODULE 25 : MODÈLES DE DOCUMENTS (P136–P145) ── */}
      <ChapterPage num={25} title="PRO 25 — Documents Pro : Tes Outils Officiels" accent={GOLD} pageNum={136} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste pro ne se présente jamais sans ses documents. Bio parfaite, EPK complet, contrats prêts, Split Sheet signé avant chaque collaboration. Ces modèles sont tes outils officiels — personnalise-les, utilise-les, et protège-toi juridiquement dès aujourd'hui." />

      <ContentPage chapter="Module 25 — Modèles de documents" accent={GOLD} pageNum={137} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Modèle : Biographie Artiste (Court Format)</SH2>
        <div style={{ padding: "14px 16px", borderRadius: "10px", background: CREAM, border: `1px solid ${GOLD}40`, margin: "8px 0" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>TEMPLATE — À ADAPTER</p>
          <p style={{ fontFamily: F, fontSize: "10.5px", color: DARK, lineHeight: 1.7, margin: "0 0 8px" }}>
            <strong>[NOM D'ARTISTE]</strong> est un·e artiste <strong>[GENRE]</strong> originaire de <strong>[VILLE, PAYS]</strong>.
            Avec une musique qui mêle <strong>[INFLUENCES 1]</strong> et <strong>[INFLUENCES 2]</strong>, [il/elle] construit
            depuis <strong>[ANNÉE]</strong> une identité sonore unique ancrée dans <strong>[CULTURE/VALEURS]</strong>.
          </p>
          <p style={{ fontFamily: F, fontSize: "10.5px", color: DARK, lineHeight: 1.7, margin: "0 0 8px" }}>
            Ses morceaux <strong>[TITRES]</strong> ont cumulé plus de <strong>[CHIFFRE]</strong> streams sur les plateformes
            digitales et lui ont valu une présence remarquée sur <strong>[MÉDIAS OU ÉVÉNEMENTS]</strong>.
          </p>
          <p style={{ fontFamily: F, fontSize: "10.5px", color: DARK, lineHeight: 1.7, margin: 0 }}>
            Aujourd'hui, <strong>[NOM D'ARTISTE]</strong> prépare <strong>[PROCHAIN PROJET]</strong> avec pour ambition
            <strong>[OBJECTIF]</strong>. Contact booking : <strong>[EMAIL]</strong>
          </p>
        </div>
        <Callout color={GOLD} title="Règles d'une bonne bio"
          text="Pas plus de 3 paragraphes. Commence toujours par une réalisation concrète, pas par une introduction («Je suis né à...»). Mets à jour à chaque nouveau succès. Avoir une version courte (150 mots) et une version longue (400 mots)." />
      </ContentPage>

      <ContentPage chapter="Module 25 — Modèles de documents" accent={GOLD} pageNum={138} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Modèle : Contrat de Prestation (Concert)</SH2>
        <div style={{ padding: "12px 16px", borderRadius: "10px", background: CREAM, border: `1px solid ${GOLD}40`, margin: "8px 0" }}>
          <p style={{ fontFamily: FD, fontSize: "14px", fontWeight: 700, color: DARK, margin: "0 0 10px", textAlign: "center" }}>CONTRAT DE PRESTATION ARTISTIQUE</p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#374151", lineHeight: 1.7, margin: "0 0 6px" }}>
            <strong>ENTRE :</strong> [NOM ORGANISATEUR], ci-après désigné «L'Organisateur»<br />
            <strong>ET :</strong> [NOM ARTISTE], ci-après désigné «L'Artiste»
          </p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#374151", lineHeight: 1.7, margin: "0 0 6px" }}>
            <strong>OBJET :</strong> L'Organisateur engage l'Artiste pour une prestation musicale lors de [ÉVÉNEMENT]<br />
            <strong>DATE :</strong> [DATE] · <strong>LIEU :</strong> [LIEU] · <strong>DURÉE :</strong> [X] minutes<br />
            <strong>CACHET :</strong> [MONTANT] FCFA, dont [%] à la signature et [%] avant la montée sur scène
          </p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#374151", lineHeight: 1.7, margin: "0 0 6px" }}>
            <strong>OBLIGATIONS DE L'ORGANISATEUR :</strong> Fournir son et lumière selon fiche technique fournie,
            repas et boissons pour [X] personnes, transport aller-retour si déplacement.
          </p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
            <strong>ANNULATION :</strong> Si annulation par l'organisateur à moins de [X] jours,
            l'acompte reste dû. Fait à Dakar, le _____ · Signatures des deux parties.
          </p>
        </div>
      </ContentPage>

      <ContentPage chapter="Module 25 — Modèles de documents" accent={GOLD} pageNum={139} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Modèle : Split Sheet (Répartition des droits)</SH2>
        <div style={{ padding: "12px 16px", borderRadius: "10px", background: CREAM, border: `1px solid ${GOLD}40`, margin: "8px 0" }}>
          <p style={{ fontFamily: FD, fontSize: "13px", fontWeight: 700, color: DARK, margin: "0 0 8px", textAlign: "center" }}>FEUILLE DE RÉPARTITION DES DROITS (SPLIT SHEET)</p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#374151", margin: "0 0 8px" }}>
            <strong>Titre du morceau :</strong> _____________________ · <strong>Date de création :</strong> _____
          </p>
          <MiniTable color={GOLD}
            headers={["Nom complet", "Rôle", "% Composition", "% Master", "Signature"]}
            rows={[
              ["_____________", "Auteur-Compositeur", "____%", "____%", "________"],
              ["_____________", "Artiste interprète", "____%", "____%", "________"],
              ["_____________", "Producteur musical", "____%", "____%", "________"],
              ["_____________", "Co-auteur paroles", "____%", "____%", "________"],
              ["TOTAL", "", "100%", "100%", ""],
            ]}
          />
          <p style={{ fontFamily: F, fontSize: "8px", color: "#78716C", margin: "6px 0 0" }}>
            Ce document engage toutes les parties signataires. À conserver en copie avec les enregistrements
            pour déclaration au BSDA. ISRC du morceau : ________________
          </p>
        </div>
      </ContentPage>

      <ContentPage chapter="Module 25 — Modèles de documents" accent={GOLD} pageNum={140} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'EPK (Electronic Press Kit) : Contenu complet</SH2>
        <Body>Ton EPK est ton CV d'artiste. C'est le premier document qu'un journaliste, organisateur ou label reçoit de toi. Il doit être parfait.</Body>
        <Checklist color={GOLD} title="Contenu obligatoire de ton EPK" items={[
          "Biographie courte (150 mots) et longue (400 mots)",
          "Photos presse HD (minimum 3 : portrait, live, artistique) — fichiers JPEG haute résolution",
          "Discographie complète avec liens streaming (Spotify, Boomplay, YouTube)",
          "Extraits audio/vidéo des meilleurs morceaux (2-3 maximum)",
          "Revue de presse (articles, interviews, mentions médias) — même petits médias",
          "Chiffres clés (nombre de streams, vues YouTube, followers réseaux, nombre de concerts)",
          "Rider technique (exigences son et scène pour les concerts)",
          "Informations de contact (email booking, WhatsApp, manager si applicable)",
          "Réseaux sociaux — liens cliquables vers chaque profil",
        ]} />
        <Callout color={GOLD} title="Outil recommandé : Presskit.to ou Adobe Express"
          text="Presskit.to crée une page web EPK professionnelle gratuite. Adobe Express permet de créer un EPK PDF visuel. Les deux sont accessibles sans compétences techniques et donnent un rendu professionnel immédiat." />
      </ContentPage>

      {/* ── MODULE 26 : LA SCÈNE ET LES CONCERTS (P141–P148) ── */}
      <ChapterPage num={26} title="PRO 26 — Concerts & Live Pro : Scène et Booking" accent={ACC} pageNum={141} total={TOTAL} guideLabel={LABEL}
        hook="Un amateur attend d'être invité sur scène. Un pro crée ses propres opportunités, remplit ses propres salles, et transforme chaque concert en expérience mémorable qui fidélise à vie. La scène est l'endroit où les amateurs deviennent des pros — et où les pros deviennent des légendes." />

      <ContentPage chapter="Module 26 — Concerts & live" accent={ACC} pageNum={142} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment obtenir ton premier concert payant</SH2>
        <ProcessLine color={ACC} steps={[
          { num: "1", title: "Preuve", desc: "Vidéos de toi en live (même chez toi ou en église) — les organisateurs veulent voir tu performe" },
          { num: "2", title: "Réseau", desc: "Identifier les organisateurs locaux : DJ, gérant de restaurant/bar, coordinateurs d'événements" },
          { num: "3", title: "Offre", desc: "Première prestation à tarif réduit ou gratuit contre vidéo et photos professionnelles" },
          { num: "4", title: "Preuve sociale", desc: "Ces vidéos deviennent ta démo live pour les prochains organisateurs" },
          { num: "5", title: "Tarif", desc: "Augmenter progressivement le cachet à mesure que ta notoriété grandit" },
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Les types d'événements accessibles dès le début</SH3>
        <MiniTable color={ACC}
          headers={["Type d'événement", "Qui contacter", "Cachet possible"]}
          rows={[
            ["Mariages (cérémonie)", "DJ de mariages, coordinateurs d'événements", "50 000 — 150 000 FCFA"],
            ["Baptêmes / anniversaires", "Traiteurs, organisateurs familiaux", "30 000 — 100 000 FCFA"],
            ["Soirées restaurant/bar", "Gérant directement", "15 000 — 50 000 FCFA + boissons"],
            ["Événements corporates", "RH, assistante de direction", "100 000 — 500 000 FCFA"],
            ["Fêtes d'église / Conventions", "Responsable culturel d'église", "Variable, souvent honoraires"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 26 — Concerts & live" accent={ACC} pageNum={143} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Préparer sa setlist et sa présence scénique</SH2>
        <SH3 color={ACC}>La structure d'une setlist professionnelle</SH3>
        <MiniTable color={ACC}
          headers={["Moment", "Type de morceau", "Durée", "Objectif"]}
          rows={[
            ["Entrée", "Morceau énergique, connu", "3-4 min", "Capter l'attention immédiatement"],
            ["Milieu-début", "Morceau émotionnel fort", "3-4 min", "Créer une connexion"],
            ["Milieu", "Morceau participatif", "3-4 min", "Impliquer le public"],
            ["Avant-clôture", "Morceau le plus populaire", "3-4 min", "Pic d'énergie avant la fin"],
            ["Clôture", "Remerciements + meilleur single", "3-5 min", "Laisser une impression durable"],
          ]}
        />
        <SH3 color={ACC}>Les 5 habitudes des performers professionnels</SH3>
        <NumberedList color={ACC} items={[
          "REGARDER LE PUBLIC — Jamais les pieds ni le sol. Le contact visuel crée la connexion.",
          "BOUGER SUR SCÈNE — Utiliser tout l'espace disponible. L'immobilité tue l'énergie.",
          "PARLER ENTRE LES MORCEAUX — Partager une histoire courte liée au prochain morceau.",
          "INTERAGIR AVEC LE PUBLIC — Faire chanter, faire lever les mains, demander des réponses.",
          "RÉPÉTER DEBOUT — Toujours répéter en position de performance, jamais assis.",
        ]} />
      </ContentPage>

      {/* ── PAGES FINALES ENRICHIES (P144–P155) ── */}
      <ChapterPage num={27} title="PRO 27 — Marchés Pro AOF & Diaspora" accent={BLU} pageNum={144} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste amateur pense local. Un artiste pro pense sous-régional dès le début. Le Sénégal est ton point de départ — mais la Côte d'Ivoire, le Mali, le Cameroun, et surtout la diaspora en Europe représentent des marchés 10 fois plus rentables. Voici la cartographie pro de ces opportunités." />

      <ContentPage chapter="Module 27 — Marchés AOF" accent={BLU} pageNum={145} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Carte des marchés musicaux en Afrique de l'Ouest francophone</SH2>
        <MiniTable color={BLU}
          headers={["Pays", "Population", "Plateforme n°1", "Opportunité clé"]}
          rows={[
            ["Sénégal", "17M hab.", "YouTube + Boomplay", "Base locale solide, diaspora en Europe"],
            ["Côte d'Ivoire", "27M hab.", "YouTube + Boomplay", "Marché coupé-décalé / Zouglou très actif"],
            ["Mali", "22M hab.", "YouTube + radio", "Musique traditionnelle + urban fusion"],
            ["Burkina Faso", "22M hab.", "YouTube + Facebook", "Forte audience gospel et musique sacrée"],
            ["Guinée", "13M hab.", "YouTube + WhatsApp", "Forte culture musicale, peu d'artistes digitaux"],
            ["Cameroun", "27M hab.", "YouTube + Boomplay", "Pont entre Afrique centrale et occidentale"],
            ["Bénin / Togo", "12M + 8M", "YouTube + Facebook", "Artistes peu nombreux = moins de concurrence"],
          ]}
        />
        <Callout color={BLU} title="La stratégie sous-régionale"
          text="Si tu parles wolof + français, tu peux atteindre directement 17 millions de Sénégalais + 5 millions de Malinkés. En ajoutant l'anglais à certains morceaux, tu ouvres le Nigeria, le Ghana et la diaspora mondiale. La combinaison de langues est ton passeport pour la sous-région." />
      </ContentPage>

      <ContentPage chapter="Module 27 — Marchés AOF" accent={BLU} pageNum={146} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Conquérir la diaspora sénégalaise en Europe</SH2>
        <StatRow color={BLU} stats={[
          { value: "150K+", label: "Sénégalais en France", sub: "Lyon, Paris, Marseille" },
          { value: "100K+", label: "En Italie", sub: "Milan, Rome, Turin" },
          { value: "50K+", label: "En Espagne", sub: "Madrid, Barcelone" },
          { value: "40K+", label: "Aux USA/Canada", sub: "New York, Montréal" },
        ]} />
        <SH3 color={BLU}>Stratégie diaspora pas à pas</SH3>
        <NumberedList color={BLU} items={[
          "CIBLAGE PUBLICITAIRE — Créer des publicités Meta spécifiquement pour la France, l'Italie, l'Espagne avec mention «artiste sénégalais» dans le texte",
          "GROUPES FACEBOOK DIASPORA — Rejoindre et s'engager dans les groupes «Sénégalais en France», «Sénégalais en Italie» etc.",
          "COLLABORATIONS DIASPORA — Feat avec des artistes sénégalais basés en Europe = double audience",
          "CONCERTS EN EUROPE — Même une salle de 100 personnes en France rapporte plus qu'une salle de 500 au Sénégal",
          "CONTENU BILINGUE — Certaines vidéos TikTok sous-titrées en français pour la diaspora non-wolophone",
        ]} />
      </ContentPage>

      <DarkPage title="Les 30 Règles d'Or de l'Artiste Pro Africain" accent={GOLD} pageNum={147} total={TOTAL} guideLabel={LABEL}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            "Sortir sans stratégie = argent gaspillé",
            "Ton branding EST ta carrière",
            "TikTok d'abord, label ensuite",
            "Inscris-toi au BSDA aujourd'hui",
            "Publie chaque jour, sans exception",
            "La diaspora = ton marché premium",
            "1 morceau = 30 contenus différents",
            "Split Sheet avant toute collab",
            "Lis TOUS tes contrats avant de signer",
            "YouTube Shorts = croissance gratuite",
            "WhatsApp > Spotify au Sénégal",
            "50% du budget en promotion toujours",
            "Dépenses en beat exclusif pour tes singles",
            "Canvas Spotify sur chaque single",
            "Pitch Spotify 4 semaines avant la sortie",
            "Checklist le jour de chaque sortie",
            "Analytics chaque semaine sans faute",
            "Réseaux sociaux = vitrines, pas de musée",
            "Répondre à tous les commentaires",
            "1 collab par mois minimum",
            "Payoneer pour tes royalties internationales",
            "Canva Pro = investissement indispensable",
            "CapCut gratuit suffit pour TikTok",
            "EPK à jour en permanence",
            "Biographie réécrite chaque année",
            "Concours / giveaway pour la croissance",
            "Live mensuel pour fidéliser tes fans",
            "Plan sur 5 ans, action sur 90 jours",
            "Le talent se travaille, la stratégie aussi",
            "La constance bat le talent non-stratégique",
          ].map((rule, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", padding: "4px 0" }}>
              <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color: GOLD, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
              <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5 }}>{rule}</p>
            </div>
          ))}
        </div>
      </DarkPage>

      <ContentPage chapter="Conclusion" accent={GOLD} pageNum={148} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Tu as maintenant tout pour devenir un Artiste Pro</SH2>
        <Body>Nous sommes en 2026. L'artiste africain qui comprend les outils de ce guide a exactement les mêmes armes que les meilleurs artistes mondiaux. La même technologie, les mêmes plateformes, les mêmes algorithmes. La seule différence désormais : la décision d'appliquer ou non ce que tu viens d'apprendre.</Body>
        <StatRow color={ACC} stats={[
          { value: "2026", label: "L'année de la décision", sub: "Commences-tu ou attends-tu encore ?" },
          { value: "95%", label: "Artistes qui abandonnent", sub: "Avant d'avoir réellement essayé" },
          { value: "5%", label: "Artistes qui persistent", sub: "Et qui construisent des carrières réelles" },
        ]} />
        <Testimony
          text="Ce livre n'a pas été écrit pour les artistes qui veulent être stars. Il a été écrit pour les artistes qui veulent construire quelque chose de durable — une audience vraie, des revenus réels, un impact mesurable."
          author="KEKELI Creative Agency"
          role="Dakar, Sénégal — 2026"
          color={GOLD}
        />
        <Callout color={GOLD} title="La dernière question"
          text="Dans 5 ans, est-ce que tu veux regarder en arrière et dire «J'ai commencé aujourd'hui» ou «J'aurais dû commencer il y a 5 ans» ? La réponse détermine ce que tu fais dans les prochaines 24 heures." />
      </ContentPage>

      {/* ── P149 — INDEX & CONTACTS UTILES ── */}
      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 28 — L'ÉQUIPE COMPLÈTE (P151–P158)         */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={28} title="PRO 28 — L'Équipe Pro Autour de l'Artiste" accent={AMB} pageNum={151} total={TOTAL} guideLabel={LABEL}
        hook="Derrière chaque artiste professionnel, il y a une équipe. Manager, booker, directeur artistique, community manager, graphiste, vidéaste — chacun a un rôle précis, un tarif réel, un contrat clair. Un amateur travaille seul. Un pro construit son équipe méthodiquement." />

      <ContentPage chapter="Module 28 — L'Équipe complète" accent={AMB} pageNum={152} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Vue d'ensemble : les 8 rôles clés</SH2>
        <MiniTable color={AMB}
          headers={["Rôle", "Mission principale", "Quand recruter"]}
          rows={[
            ["Manager", "Coordination globale, stratégie, négociation", "Dès 5 000 followers + revenus réguliers"],
            ["Booker / Agent", "Trouver et négocier les concerts et festivals", "Dès notoriété locale établie"],
            ["Directeur Artistique", "Cohérence visuelle, univers, direction créative", "Dès le premier projet sérieux"],
            ["Community Manager", "Gestion quotidienne des réseaux sociaux", "Quand les réseaux prennent +3h/jour"],
            ["Graphiste", "Visuels, covers, flyers, templates", "Dès le début (freelance)"],
            ["Vidéaste / Réalisateur", "Clips, Reels, BTS, contenu vidéo", "Dès les premiers revenus stables"],
            ["Photographe", "Shooting presse, contenu Instagram", "Shooting trimestriel minimum"],
            ["Attaché de Presse", "Relations médias, couverture presse", "Avant chaque sortie majeure"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 28 — L'Équipe complète" accent={AMB} pageNum={153} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Manager : chef d'orchestre de ta carrière</SH2>
        <Body>Le manager est la personne la plus importante autour d'un artiste. Il ne crée pas — il organise, protège et fait grandir. Un bon manager peut multiplier ta carrière par 10. Un mauvais peut la détruire.</Body>
        <SH3 color={AMB}>Ce que fait un manager (au quotidien)</SH3>
        <BulletList color={AMB} items={[
          { bold: "Stratégie de carrière :", text: "Il définit avec toi la trajectoire sur 1, 3 et 5 ans et s'assure que chaque décision s'y aligne." },
          { bold: "Négociation :", text: "Il négocie les cachets de concerts, les contrats avec les labels, les deals de sponsoring — tu ne négocies jamais toi-même." },
          { bold: "Coordination d'équipe :", text: "Il coordonne le graphiste, le vidéaste, le CM, le booker. Il est le chef de projet." },
          { bold: "Relations industrie :", text: "Il maintient les relations avec les radios, les médias, les organisateurs, les labels." },
          { bold: "Protection :", text: "Il lit les contrats avant toi, alerte sur les clauses dangereuses, protège tes intérêts." },
        ]} />
        <MiniTable color={AMB}
          headers={["Type de rémunération", "Taux standard", "Calculé sur"]}
          rows={[
            ["Commission standard", "15% à 20%", "Tous les revenus générés grâce à lui"],
            ["Manager débutant", "10% à 15%", "Concerts et partenariats uniquement"],
            ["Manager établi", "20% à 25%", "Revenus totaux (streaming inclus)"],
          ]}
        />
        <Callout color="#DC2626" title="⚠️ Ce qu'il ne faut pas faire"
          text="Ne donne jamais à ton manager l'accès total à tes comptes bancaires ou plateformes. Ne signe jamais un contrat de management sans clause de résiliation. Un contrat de management ne devrait jamais dépasser 2 ans sans option de renouvellement mutuel." />
      </ContentPage>

      <ContentPage chapter="Module 28 — L'Équipe complète" accent={AMB} pageNum={154} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Booker / Agent : celui qui remplit ton agenda</SH2>
        <Body>Le booker est spécialisé dans la recherche et la négociation de concerts, festivals, événements corporate et mariages. Il est souvent différent du manager — les deux rôles peuvent néanmoins être fusionnés au début.</Body>
        <SH3 color={AMB}>Ce que fait un booker</SH3>
        <BulletList color={AMB} items={[
          { bold: "Prospection :", text: "Il contacte proactivement les organisateurs d'événements, les festivals, les entreprises." },
          { bold: "Négociation des cachets :", text: "Il obtient le meilleur tarif tout en restant réaliste par rapport à ta notoriété." },
          { bold: "Gestion des contrats de prestation :", text: "Il s'assure que chaque concert est couvert par un contrat signé avec acompte." },
          { bold: "Rider technique :", text: "Il transmet ta fiche technique (besoins son, scène, lumière) aux organisateurs." },
          { bold: "Suivi post-concert :", text: "Il s'assure que le solde du cachet est payé et archive tout pour les prochaines négociations." },
        ]} />
        <MiniTable color={AMB}
          headers={["Rémunération booker", "Taux", "Sur quoi"]}
          rows={[
            ["Commission standard", "10% à 15%", "Cachet brut de chaque prestation bookée"],
            ["Accord sur objectif", "Fixe + commission", "Salaire mensuel + % sur résultats dépassés"],
          ]}
        />
        <Callout color={AMB} title="Comment trouver un bon booker à Dakar ?"
          text="Commence par les DJs et organisateurs d'événements locaux qui ont déjà un carnet d'adresses. Les meilleurs bookers en Afrique de l'Ouest sont souvent d'anciens managers d'artistes ou des organisateurs reconvertis. Demande des références et vérifie leur track record." />
      </ContentPage>

      <ContentPage chapter="Module 28 — L'Équipe complète" accent={AMB} pageNum={155} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Directeur Artistique : gardien de ton univers</SH2>
        <Body>Le DA (Directeur Artistique) assure que tout ce que tu produis — clips, photos, flyers, covers — raconte la même histoire et transmet la même émotion. C'est lui qui empêche les incohérences visuelles qui diluent une image de marque.</Body>
        <BulletList color={AMB} items={[
          { bold: "Moodboards et directions créatives :", text: "Avant chaque projet, il définit l'univers visuel (couleurs, textures, ambiance)." },
          { bold: "Supervision des shootings :", text: "Il est présent sur les tournages pour s'assurer que le résultat correspond à la vision." },
          { bold: "Charte graphique :", text: "Il crée et maintient la charte graphique de l'artiste — la bible visuelle." },
          { bold: "Cohérence sur les réseaux :", text: "Il valide chaque visuel avant publication pour garantir la cohérence du feed." },
        ]} />
        <Divider color={AMB} />
        <SH3 color={AMB}>Community Manager : la voix quotidienne</SH3>
        <BulletList color={AMB} items={[
          { bold: "Publications quotidiennes :", text: "3-5 Stories, 1 Reel ou post par jour sur tous les réseaux." },
          { bold: "Engagement :", text: "Répondre aux commentaires et DMs au nom de l'artiste." },
          { bold: "Veille :", text: "Identifier les tendances et les utiliser pour le compte de l'artiste." },
          { bold: "Reporting :", text: "Envoyer un bilan hebdomadaire des performances (reach, engagement, followers)." },
        ]} />
        <MiniTable color={AMB}
          headers={["Rôle", "Tarif Dakar (mensuel)", "Mode"]}
          rows={[
            ["Directeur Artistique", "50 000 — 200 000 FCFA", "Freelance par projet ou mensuel"],
            ["Community Manager", "60 000 — 150 000 FCFA", "Mensuel (temps partiel ou plein)"],
            ["Graphiste", "30 000 — 100 000 FCFA", "À la pièce ou forfait mensuel"],
            ["Vidéaste (clip)", "100 000 — 500 000 FCFA", "Par projet"],
            ["Photographe (shooting)", "50 000 — 150 000 FCFA", "Par session"],
            ["Attaché de presse", "50 000 — 200 000 FCFA", "Par campagne ou mensuel"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 28 — L'Équipe complète" accent={AMB} pageNum={156} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'équipe autour de l'église : cas spécifique gospel</SH2>
        <Body>Pour l'artiste gospel, l'équipe a une dimension supplémentaire : la communauté ecclésiastique. Voici comment structurer cette dimension sans créer de conflits.</Body>
        <MiniTable color={AMB}
          headers={["Rôle ecclésiastique", "Rôle dans la carrière", "Limite à respecter"]}
          rows={[
            ["Pasteur / Leader spirituel", "Soutien moral, légitimité, prières", "Ne pas mélanger autorité spirituelle et décisions business"],
            ["Responsable culturel d'église", "Accès aux événements internes, networking", "Il n'est pas ton manager — définir clairement les rôles"],
            ["Chorale / musiciens église", "Soutien live, featuring musicaux", "Contrats de prestation même entre frères en foi"],
            ["Membres de l'église (fans)", "Première fanbase, ambassadeurs naturels", "Ne pas les exploiter — les récompenser sincèrement"],
          ]}
        />
        <Callout color={AMB} title="La règle d'or pour l'équipe gospel"
          text="Sépare le ministère de la carrière. Tu peux être béni dans ton ministère ET professionnel dans ta carrière. Les deux ne s'excluent pas. Mais mélanger les deux sans clarté crée confusion, jalousies et conflits. Contractualise même avec tes frères et sœurs en foi." />
        <SH3 color={AMB}>Ce qu'il ne faut jamais faire avec son équipe</SH3>
        <NumberedList color={AMB} items={[
          "Donner l'accès total à tes comptes plateformes ou bancaires à quelqu'un sans contrat",
          "Travailler sur une promesse verbale sans aucun écrit — même avec des amis proches",
          "Laisser quelqu'un gérer tes réseaux sans définir une ligne éditoriale validée par toi",
          "Payer quelqu'un irregulièrement ou en retard — cela détruit la confiance et la motivation",
          "Permettre à ton manager de signer des contrats en ton nom sans ta validation préalable",
          "Confondre popularité et compétence — un ami avec beaucoup de followers n'est pas forcément un bon CM",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 28 — L'Équipe complète" accent={AMB} pageNum={157} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les contrats avec les marques : ce qu'il faut savoir</SH2>
        <Body>Dès que tu as une audience engagée, les marques vont te contacter pour des partenariats. Voici comment gérer ces opportunités de façon professionnelle.</Body>
        <SH3 color={AMB}>Types de contrats marques</SH3>
        <MiniTable color={AMB}
          headers={["Type", "Description", "Durée", "Tarif indicatif"]}
          rows={[
            ["Post sponsorisé unique", "1 post mentionnant la marque", "1 publication", "25 000 — 150 000 FCFA"],
            ["Campagne multi-posts", "3 à 10 publications sur une période", "1 — 4 semaines", "100 000 — 500 000 FCFA"],
            ["Ambassadeur mensuel", "Visibilité régulière sur tes réseaux", "1 — 6 mois", "150 000 — 1 000 000 FCFA/mois"],
            ["Endorsement produit", "Tu utilises/portes le produit", "Durée variable", "Produit gratuit + cachet"],
            ["Apparition événement", "Tu es présent à un événement marque", "1 jour", "100 000 — 500 000 FCFA"],
          ]}
        />
        <SH3 color={AMB}>5 clauses obligatoires dans tout contrat de sponsoring</SH3>
        <NumberedList color={AMB} items={[
          "Nombre exact de publications (posts, Stories, Reels) et délai de livraison",
          "Droit de validation du contenu avant publication (tu gardes le contrôle éditorial)",
          "Exclusivité ou non — la marque peut-elle t'empêcher de collaborer avec des concurrents ?",
          "Mode et délai de paiement (évite le paiement uniquement à la fin — demande 50% à la signature)",
          "Droits d'utilisation — la marque peut-elle réutiliser ton contenu dans ses propres publicités ?",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 28 — L'Équipe complète" accent={AMB} pageNum={158} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment négocier son cachet : guide pratique</SH2>
        <Body>La négociation est une compétence qui s'apprend. Voici les principes fondamentaux pour négocier sans se sous-évaluer ni perdre l'opportunité.</Body>
        <NumberedList color={AMB} items={[
          "NE JAMAIS DONNER LE PREMIER CHIFFRE — Demande toujours : «Quel est votre budget pour ce type de prestation ?» L'organisateur révèle souvent un budget plus élevé que ce que tu aurais demandé.",
          "CONNAÎTRE TON TARIF PLANCHER — Définis en avance le minimum en dessous duquel tu ne descends pas. Ne négocie jamais en dessous de ce seuil.",
          "JUSTIFIER PAR LA VALEUR — «Avec mes 8 000 abonnés et mon engagement de 12%, votre marque touchera directement 15 000 personnes qualifiées.» Les chiffres convainquent.",
          "NÉGOCIER EN PACKAGE — Si le cachet ne peut pas monter, négocie des extras : transport, hébergement, photos professionnelles, visibilité sur les supports de l'événement.",
          "METTRE UN DÉLAI — «Mon agenda se remplit vite — je vous donne jusqu'au vendredi pour confirmer.» La rareté a une valeur.",
          "TOUT EN ÉCRIT — Après toute négociation verbale, envoie immédiatement un récapitulatif écrit par WhatsApp ou email.",
        ]} />
        <Callout color={AMB} title="Script de réponse à une offre trop basse"
          text="«Je comprends votre budget. Malheureusement, mon tarif pour ce type de prestation est de [X] FCFA. Si votre budget est de [Y], voici ce que je peux proposer dans cette enveloppe : [service réduit]. Si vous souhaitez la prestation complète, le tarif reste [X]. Qu'est-ce qui vous conviendrait ?»" />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 29 — BOOKING & FESTIVALS (P159–P164)       */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={29} title="PRO 29 — Booking Pro : Festivals & Grandes Scènes" accent={SEC} pageNum={159} total={TOTAL} guideLabel={LABEL}
        hook="Un amateur envoie un message Instagram à un festival en espérant une réponse. Un pro soumet un dossier de candidature complet, avec une vidéo live convaincante, un cachet négocié à l'avance, et un contrat signé avant de monter sur scène. Voici la méthode pro du booking." />

      <ContentPage chapter="Module 29 — Booking & Festivals" accent={SEC} pageNum={160} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment fonctionne le booking de festival</SH2>
        <Body>Les festivals reçoivent des centaines de candidatures. La sélection se fait sur des critères précis et souvent méconnus des artistes. Voici comment le processus fonctionne vraiment.</Body>
        <ProcessLine color={SEC} steps={[
          { num: "1", title: "Appel à candidatures", desc: "Le festival publie ses critères (genre, zone géographique, notoriété minimum)" },
          { num: "2", title: "Dossier soumis", desc: "Tu envoies ton EPK + liens plateformes + vidéo live" },
          { num: "3", title: "Présélection", desc: "L'équipe artistique évalue et fait une shortlist" },
          { num: "4", title: "Écoute & visionnage", desc: "Ils écoutent ta musique et regardent tes performances live" },
          { num: "5", title: "Décision & contrat", desc: "Sélection + négociation du cachet et des conditions" },
          { num: "6", title: "Préparation", desc: "Fiche technique, répétitions, communication pré-festival" },
        ]} />
        <Divider color={SEC} />
        <SH3 color={SEC}>Ce que les festivals regardent en premier</SH3>
        <BulletList color={SEC} items={[
          { bold: "Présence scénique :", text: "Une vidéo live de bonne qualité est indispensable — aucun festival ne sélectionne sur les enregistrements studio seuls" },
          { bold: "Cohérence artistique :", text: "Ton profil social et ta musique doivent raconter la même histoire" },
          { bold: "Audience locale :", text: "Un artiste qui attire son propre public réduit le risque pour l'organisateur" },
          { bold: "Professionnalisme :", text: "La qualité de ton dossier, la rapidité de tes réponses, ta réputation dans l'industrie" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 29 — Booking & Festivals" accent={SEC} pageNum={161} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les festivals au Sénégal et en AOF à cibler</SH2>
        <MiniTable color={SEC}
          headers={["Festival", "Genre", "Lieu", "Opportunité"]}
          rows={[
            ["Galsen Gospel Urbain", "Gospel Urbain africain", "Dakar, Sénégal", "Fondé par Amset — festival dédié au gospel sénégalais moderne"],
            ["Sunu Impact Festival", "Gospel / Urbain / Culture", "Dakar, Sénégal", "Promu par Amset, co-organisé avec CMM — multidisciplinaire"],
            ["Dakar Music Expo", "Tous genres", "Dakar", "Networking industrie + scène B2B"],
            ["Festival Cultura Dakar", "Musiques africaines", "Dakar", "Vitrine culturelle, artistes émergents"],
            ["FESPAM", "Panafricaine", "Brazzaville, Congo", "Rayonnement sous-régional, réseau AOF"],
            ["Festival Gnawa", "Spirituel / World Music", "Essaouira, Maroc", "Pont Afrique-Europe pour artistes spirituels"],
            ["Kouroukan Fuga", "Mandingue / Afro", "Mali", "Marché Musical mandingue et sahélien"],
          ]}
        />
        <Callout color={SEC} title="Galsen Gospel Urbain & Sunu Impact Festival — deux portes d'entrée pro"
          text="Galsen Gospel Urbain (fondé par Amset) est la scène dédiée aux artistes gospel sénégalais modernes. Sunu Impact Festival (promu par Amset, co-organisé avec CMM) est l'événement multidisciplinaire qui offre formation, networking professionnel et visibilité médiatique. Ces deux événements sont des tremplins concrets pour les artistes qui veulent franchir le cap du professionnalisme." />
      </ContentPage>

      <ContentPage chapter="Module 29 — Booking & Festivals" accent={SEC} pageNum={162} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le dossier de candidature festival parfait</SH2>
        <Checklist color={SEC} title="Contenu obligatoire d'un dossier de candidature festival" items={[
          "Biographie courte (150 mots) adaptée au thème du festival",
          "Photo presse HD récente (format paysage 1920x1080 minimum)",
          "Vidéo d'une performance live récente (YouTube ou Drive — 3-5 minutes)",
          "Liens streaming : Spotify, Boomplay, YouTube avec chiffres visibles",
          "Rider technique simplifié (besoins son : micros, retours, instruments)",
          "Références : autres festivals ou événements où tu as joué",
          "Lien vers ton meilleur clip (YouTube — must be recent)",
          "Contact direct du manager ou de toi-même (WhatsApp + email)",
        ]} />
        <Divider color={SEC} />
        <SH3 color={SEC}>Email type de candidature</SH3>
        <div style={{ padding: "10px 12px", borderRadius: "8px", background: CREAM, border: `1px solid ${SEC}30`, margin: "6px 0" }}>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
            <strong>Objet :</strong> Candidature artiste — [Ton nom] — [Nom du Festival]<br /><br />
            Bonjour [Responsable artistique],<br /><br />
            Je suis [Nom], artiste [genre] basé(e) à Dakar. Je vous contacte pour soumettre ma candidature pour [Nom du Festival].<br /><br />
            En résumé : [2 lignes sur ton projet et pourquoi tu corresponds au festival].<br /><br />
            Vous trouverez en pièce jointe mon dossier complet. Liens rapides :<br />
            • Performance live : [URL YouTube]<br />
            • Musique : [URL Spotify/Boomplay]<br />
            • Instagram : [URL]<br /><br />
            Disponible pour un échange téléphonique à votre convenance.<br />
            Cordialement, [Ton nom] — [WhatsApp]
          </p>
        </div>
      </ContentPage>

      <ContentPage chapter="Module 29 — Booking & Festivals" accent={SEC} pageNum={163} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Organiser son propre concert : guide complet</SH2>
        <Body>Avant de vouloir jouer dans les grands festivals, organise ton propre concert. C'est la meilleure façon de prouver ta capacité à mobiliser un public et de générer des revenus directs.</Body>
        <MiniTable color={SEC}
          headers={["Étape", "Action", "Délai avant le concert"]}
          rows={[
            ["Concept & lieu", "Définir le format, réserver la salle, estimer la capacité", "3 — 4 mois avant"],
            ["Budget", "Chiffrer les coûts (salle, son, lumière, communication)", "3 mois avant"],
            ["Équipe", "Son, lumière, sécurité, accueil, photographe officiel", "2 — 3 mois avant"],
            ["Billetterie", "Wave, Orange Money, vente sur place — fixer le prix", "2 mois avant"],
            ["Communication", "Flyers, réseaux, WhatsApp broadcast, radios", "6 semaines avant"],
            ["Répétitions", "Au minimum 3 répétitions complètes", "2 — 3 semaines avant"],
            ["Jour J", "Arrivée 3h avant, soundcheck, accueil public", "Jour du concert"],
            ["Après-concert", "Remercier les fans, photos, bilan financier", "24h après"],
          ]}
        />
        <Callout color={SEC} title="Taille de salle recommandée selon la notoriété"
          text="Artiste débutant : 50-100 places (restaurant, espace culturel). Artiste émergent (2 000-10 000 followers) : 200-500 places (salle polyvalente, rooftop). Artiste établi : 500-2 000 places. Ne vise jamais trop grand trop tôt — une salle à moitié vide est pire qu'une petite salle sold out." />
      </ContentPage>

      <ContentPage chapter="Module 29 — Booking & Festivals" accent={SEC} pageNum={164} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les erreurs fatales en booking et concerts</SH2>
        <CaseStudy
          title="Deux artistes, deux approches des concerts"
          color={SEC}
          left={{
            label: "❌ Les erreurs classiques",
            emoji: "⚠️",
            items: [
              "Réserver une salle de 500 places avec 300 followers",
              "Aucun contrat avec l'organisateur — accord verbal",
              "Pas d'acompte demandé avant le concert",
              "Soundcheck annulé faute de temps",
              "Aucune communication digitale avant l'événement",
              "Billetterie ouverte uniquement le jour J",
            ],
            result: "100 personnes, salle vide à 80%, pas rentable, mauvaise réputation"
          }}
          right={{
            label: "✅ Les bonnes pratiques",
            emoji: "🎯",
            items: [
              "Salle de 200 places pour 3 000 followers — juste équilibré",
              "Contrat signé 6 semaines avant avec 50% d'acompte",
              "Campagne WhatsApp + réseaux 4 semaines avant",
              "Pre-vente ouverte 3 semaines avant l'événement",
              "Soundcheck complet la veille ou le matin même",
              "5 répétitions complètes avec les musiciens",
            ],
            result: "200 places sold out, 600 000 FCFA de recettes, press coverage"
          }}
        />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 30 — CERTIFICATIONS (P165–P169)            */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={30} title="PRO 30 — Certifications Pro : Obtiens le Badge Officiel" accent={GRN} pageNum={165} total={TOTAL} guideLabel={LABEL}
        hook="Le badge de vérification — la coche bleue Instagram, le profil Artist Spotify, le bouton YouTube — n'est pas un symbole de vanité. C'est une preuve de professionnalisme que les organisateurs, les marques et les médias vérifient avant de te contacter. Voici comment l'obtenir sur chaque plateforme." />

      <ContentPage chapter="Module 30 — Certifications" accent={GRN} pageNum={166} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Certification YouTube : la coche grise puis dorée</SH2>
        <MiniTable color={GRN}
          headers={["Badge", "Seuil requis", "Avantages"]}
          rows={[
            ["✓ Coche grise (Custom URL)", "100 abonnés + 30 jours d'ancienneté", "URL personnalisée : youtube.com/@tonnom"],
            ["✓ Artiste officiel (Artist Channel)", "Distribution via label ou DistroKid", "Profil enrichi, section Music, méga-profil"],
            ["✓ Coche grise (Vérification)", "100 000 abonnés", "Badge gris sur le nom de la chaîne"],
            ["⭐ Bouton Argent", "100 000 abonnés", "Plaque YouTube envoyée + badge"],
            ["⭐ Bouton Or", "1 000 000 abonnés", "Plaque Or + badge + accompagnement YouTube"],
          ]}
        />
        <SH3 color={GRN}>Comment obtenir le profil Artist Channel</SH3>
        <Body>Le profil Artist Channel est le profil enrichi réservé aux artistes musicaux. Il affiche automatiquement tes singles et albums en vedette, et te donne un profil distinct des créateurs classiques.</Body>
        <NumberedList color={GRN} items={[
          "Distribue ta musique via DistroKid (ou tout autre distributeur reconnu)",
          "DistroKid soumet automatiquement ta demande à YouTube pour le profil Artist",
          "YouTube vérifie que ton profil correspond bien à l'artiste distribué",
          "Délai : 2 à 6 semaines après la première distribution",
          "Tu peux aussi demander manuellement via le formulaire YouTube for Artists",
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 30 — Certifications" accent={GRN} pageNum={167} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Vérification Instagram & Facebook : le badge bleu</SH2>
        <Body>Le badge bleu Meta (Instagram + Facebook) signifie que le compte est «authentique et notable». Il est attribué par Meta sur demande — il ne s'achète pas, il se mérite.</Body>
        <SH3 color={GRN}>Critères officiels Meta pour la vérification</SH3>
        <BulletList color={GRN} items={[
          { bold: "Authenticité :", text: "Le compte doit représenter une vraie personne ou une vraie entité — pièce d'identité requise" },
          { bold: "Unicité :", text: "Un seul compte par personne/entreprise (sauf les comptes de langue)" },
          { bold: "Notoriété :", text: "L'entité doit être fréquemment recherchée et présente dans les médias" },
          { bold: "Complétude :", text: "Profil complet avec photo, bio, au moins un post" },
          { bold: "Activité :", text: "Compte actif avec publications régulières" },
        ]} />
        <MiniTable color={GRN}
          headers={["Plateforme", "Comment demander", "Délai"]}
          rows={[
            ["Instagram", "Paramètres → Compte → Demander vérification", "4 à 8 semaines"],
            ["Facebook", "Paramètres Page → Authentification → Vérifier", "4 à 8 semaines"],
            ["TikTok", "Formulaire dédié TikTok Creator Center", "Variable"],
            ["Twitter/X", "Abonnement X Premium obligatoire (3$/mois)", "Immédiat avec abonnement"],
            ["Spotify", "Via Spotify for Artists (profil artiste)", "Automatique avec distribution"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 30 — Certifications" accent={GRN} pageNum={168} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Certification Spotify : profil artiste officiel</SH2>
        <Body>Sur Spotify, la certification prend la forme d'un profil artiste «revendiqué» accessible via Spotify for Artists. C'est différent des autres plateformes — ici, n'importe quel artiste distribué peut revendiquer son profil.</Body>
        <ProcessLine color={GRN} steps={[
          { num: "1", title: "Distribution", desc: "Mettre au moins 1 morceau sur Spotify via DistroKid ou TuneCore" },
          { num: "2", title: "Inscription", desc: "Aller sur artists.spotify.com et cliquer «Revendiquer mon profil»" },
          { num: "3", title: "Vérification", desc: "Spotify vérifie que tu es bien l'artiste (email du distributeur)" },
          { num: "4", title: "Accès", desc: "Accès complet au tableau de bord en 3 à 10 jours" },
          { num: "5", title: "Optimisation", desc: "Ajouter photo, bio, Canvas, et pitcher les playlists éditoriales" },
        ]} />
        <Divider color={GRN} />
        <SH3 color={GRN}>Certification Boomplay for Artists</SH3>
        <Body>Boomplay (la plateforme n°1 en Afrique) propose également un profil artiste officiel. Cruciale pour les artistes sénégalais qui veulent maximiser leur présence sur le marché africain.</Body>
        <BulletList color={GRN} items={[
          { bold: "Comment accéder :", text: "Boomplaymusic.com/artist → soumettre une demande avec preuve d'identité + liens musique" },
          { bold: "Avantages :", text: "Analytics Afrique, upload direct, profil premium, playlists éditoriales africaines" },
          { bold: "Délai :", text: "2 à 4 semaines après soumission" },
        ]} />
      </ContentPage>

      <ContentPage chapter="Module 30 — Certifications" accent={GRN} pageNum={169} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Checklist complète : être certifié partout</SH2>
        <Checklist color={GRN} title="Avant de demander une vérification — prérequis" items={[
          "Photo de profil professionnelle (même sur toutes les plateformes)",
          "Biographie complète et optimisée avec mots-clés",
          "Au moins 12 posts récents sur les 30 derniers jours",
          "Un article de presse ou une mention dans un média (même local)",
          "Musique distribuée sur au moins une plateforme officielle",
          "Pièce d'identité valide prête pour la soumission",
          "Nom exact et cohérent sur toutes les plateformes",
        ]} />
        <Callout color={GRN} title="Le rôle des médias dans la vérification"
          text="Instagram et Facebook accordent plus facilement la vérification aux artistes mentionnés dans des articles de presse. Même un article sur un blog de musique sénégalais ou une interview sur une radio locale compte. Construis ta présence médiatique AVANT de demander la vérification." />
        <SH3 color={GRN}>Priorité de certification recommandée</SH3>
        <NumberedList color={GRN} items={[
          "Spotify for Artists (accès immédiat dès distribution — priorité absolue)",
          "Boomplay for Artists (marché africain — priorité pour artistes sénégalais)",
          "YouTube Artist Channel (via distribution DistroKid — automatique)",
          "Instagram badge bleu (quand tu as une présence médiatique réelle)",
          "Facebook badge bleu (en même temps qu'Instagram — même dossier)",
          "TikTok (quand tu as 10 000+ followers — critère informel)",
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* MODULE 31 — CONTRATS AVANCÉS (P170–P174)          */}
      {/* ══════════════════════════════════════════════════ */}
      <ChapterPage num={31} title="PRO 31 — Contrats Pro : Marques, Événements & Licences" accent={GOLD} pageNum={170} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste amateur signe ce qu'on lui met devant. Un artiste pro négocie chaque clause, refuse les contrats déséquilibrés, et sait exactement quand dire non. Les contrats sont le terrain où se gagne ou se perd une carrière — voici tout ce que le pro doit maîtriser." />

      <ContentPage chapter="Module 31 — Contrats avancés" accent={GOLD} pageNum={171} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le contrat de sponsoring avec une marque : clauses détaillées</SH2>
        <Body>Quand une marque te contacte pour un partenariat, elle a souvent un contrat type très favorable à elle. Voici les clauses à négocier pour protéger tes intérêts.</Body>
        <MiniTable color={GOLD}
          headers={["Clause", "Ce que veut la marque", "Ce que tu dois négocier"]}
          rows={[
            ["Exclusivité", "Tu ne travailles pas avec leurs concurrents", "Limitée à 3-6 mois, pas 1 an ou plus"],
            ["Droits d'utilisation", "Réutiliser ton contenu dans leur pub", "Durée limitée (6 mois max), territoire défini"],
            ["Approbation contenu", "Approuver tout avant publication", "Délai max de 48h pour leur feedback"],
            ["Modification créative", "Modifier le contenu que tu produis", "Tu gardes le droit de refuser si ça nuit à ton image"],
            ["Pénalités retard", "Te pénaliser si tu publies en retard", "Clause symétrique — eux aussi si ils paient en retard"],
            ["Résiliation", "Résiliation unilatérale à tout moment", "Indemnité de rupture si la marque annule"],
          ]}
        />
        <Callout color={GOLD} title="La question de l'authenticité"
          text="Ne prends jamais un partenariat avec une marque dont tu ne croirais pas sincèrement au produit. Ton audience sénégalaise est très perspicace — elle détectera immédiatement l'inauthenticité. Un partenariat qui semble forcé peut endommager ta crédibilité plus que n'importe quelle erreur créative." />
      </ContentPage>

      <ContentPage chapter="Module 31 — Contrats avancés" accent={GOLD} pageNum={172} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le contrat de synchronisation (Sync) : ta musique dans un film</SH2>
        <Body>Un contrat de sync (synchronisation) autorise l'utilisation de ta musique dans un film, une série, une publicité ou un jeu vidéo. C'est une source de revenus excellente et souvent sous-exploitée par les artistes africains.</Body>
        <BulletList color={GOLD} items={[
          { bold: "Droits de master :", text: "Pour l'enregistrement sonore — perçu par celui qui détient les masters (souvent l'artiste si indépendant)" },
          { bold: "Droits de composition :", text: "Pour la mélodie et les paroles — perçu par l'auteur-compositeur (toi + co-auteurs)" },
          { bold: "One-time fee :", text: "Paiement unique pour l'utilisation — de 50 000 à 500 000 FCFA selon la visibilité" },
          { bold: "Royalties de diffusion :", text: "Perçues chaque fois que le contenu est diffusé (TV, cinéma) via le BSDA" },
        ]} />
        <MiniTable color={GOLD}
          headers={["Type d'utilisation sync", "Tarif estimé", "Qui paye"]}
          rows={[
            ["Publicité locale (TV Sénégal)", "50 000 — 200 000 FCFA", "L'agence de pub ou la marque"],
            ["Film court-métrage africain", "25 000 — 100 000 FCFA", "Le producteur du film"],
            ["Série TV africaine (1 épisode)", "75 000 — 300 000 FCFA", "La chaîne TV ou le producteur"],
            ["Contenu international (Netflix Africa)", "300 000 — 1 500 000 FCFA", "Le producteur exécutif"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="Module 31 — Contrats avancés" accent={GOLD} pageNum={173} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Protéger ses droits : les 5 documents indispensables</SH2>
        <NumberedList color={GOLD} items={[
          "LE SPLIT SHEET — À signer AVANT chaque enregistrement d'un morceau collaboratif. Il définit qui possède quoi et à quel pourcentage. Sans split sheet, les droits sont ambigus et litigieux.",
          "LE CONTRAT DE PRESTATION — Pour chaque concert ou performance payante. Il couvre le cachet, les conditions techniques, les clauses d'annulation et le calendrier de paiement.",
          "LE CONTRAT DE LICENCE — Quand tu cèdes temporairement des droits sur ta musique (sync, utilisation commerciale, remix). Durée limitée, territoire défini, tarif clair.",
          "LE CONTRAT DE MANAGEMENT — Si tu signes avec un manager. Maximum 2 ans avec clause de résiliation. Commission max 20%. Accès limité à tes finances.",
          "L'ACCORD DE CONFIDENTIALITÉ (NDA) — Pour les négociations sensibles (labels, gros deals) avant d'échanger des informations commerciales.",
        ]} />
        <Callout color={GOLD} title="Ressource gratuite"
          text="Des modèles de contrats musicaux adaptés au droit sénégalais sont disponibles auprès du BSDA (Bureau Sénégalais du Droit d'Auteur, Avenue Roume, Dakar). Tu peux également faire réviser tes contrats par un juriste spécialisé en propriété intellectuelle — service souvent accessible pour 10 000 à 30 000 FCFA." />
      </ContentPage>

      <ContentPage chapter="Module 31 — Contrats avancés" accent={GOLD} pageNum={174} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Checklist avant de signer n'importe quel contrat</SH2>
        <Checklist color={GOLD} title="À vérifier AVANT de signer" items={[
          "J'ai lu le contrat intégralement (pas juste les parties soulignées)",
          "Je comprends chaque clause — si non, j'ai posé des questions ou consulté un juriste",
          "La durée du contrat est acceptable et il y a une clause de résiliation claire",
          "Les territoires sont définis (mondial ? Afrique ? Sénégal seulement ?)",
          "Les pourcentages/montants sont clairement chiffrés, pas vagues",
          "Le mode et délai de paiement sont précisés avec des pénalités de retard",
          "J'ai négocié et obtenu les modifications importantes pour moi",
          "Je n'ai pas signé sous pression ou le jour même de la présentation",
          "J'ai une copie signée des deux parties en ma possession",
          "Les droits sur mes masters et compositions sont clairement attribués",
        ]} />
        <Callout color="#DC2626" title="⚠️ Signal d'alarme — ne signe JAMAIS si"
          text="On te demande de signer sur le champ. Le contrat est uniquement verbal. On te dit «c'est standard, pas besoin de lire». Les parties en blanc ne sont pas remplies. Il n'y a pas de clause de résiliation. Le contrat dure plus de 3 ans sans option de renouvellement. Tu cèdes tes masters définitivement." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 32 — STORYTELLING (P180–P183)                                */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={32} title="PRO 32 — Le Storytelling de l'Artiste" accent={SEC} pageNum={180} total={TOTAL} guideLabel={LABEL}
        hook="Les gens n'achètent pas ta musique. Ils achètent ton histoire. Chaque grand artiste qui dure est avant tout un grand raconteur d'histoires. Ton talent crée la musique — ton storytelling crée les fans à vie." />

      <ContentPage chapter="PRO 32 — Storytelling" accent={SEC} pageNum={181} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Qu'est-ce que le Storytelling pour un Artiste ?</SH2>
        <Body>Le storytelling artistique, c'est l'art de construire et de communiquer ton histoire de façon cohérente, émotionnelle et mémorable — sur tous tes supports, en permanence. Ce n'est pas mentir sur ta vie. C'est choisir quels aspects de ta vie raconter, comment les raconter, et quand.</Body>
        <SH3 color={SEC}>Les 5 éléments d'une histoire d'artiste puissante</SH3>
        <InfoGrid color={SEC} cols={2} items={[
          { emoji: "🌱", title: "L'Origine", desc: "D'où tu viens réellement. Ton quartier, ta famille, tes premières galères. L'authenticité ici est capitale — les gens sentent le faux.", badge: "Élément 1" },
          { emoji: "⚡", title: "Le Déclic", desc: "Le moment exact où tu as décidé de faire de la musique ton chemin. Le plus précis et concret, le plus mémorable.", badge: "Élément 2" },
          { emoji: "🌊", title: "Les Épreuves", desc: "Ce que tu as traversé pour en être là. Les refus, les doutes, les sacrifices. Ce sont ces moments qui créent l'empathie et la connexion.", badge: "Élément 3" },
          { emoji: "🔥", title: "La Mission", desc: "Pourquoi tu fais de la musique — au-delà de la célébrité. Qu'est-ce que tu veux changer dans la vie des gens qui t'écoutent ?", badge: "Élément 4" },
          { emoji: "🎯", title: "La Vision", desc: "Où tu vas. Pas le succès vague — la vision précise. Ce que tu veux que le monde soit différent grâce à ta musique.", badge: "Élément 5" },
        ]} />
        <Callout color={SEC} title="Exemple : le storytelling de Kirk Franklin"
          text="Orphelin adopté. Grandi dans la pauvreté. Passionné de musique mais rejeté par l'église pour ses sons trop «séculiers». A persisté. A révolutionné le gospel contemporain. Ce récit en 4 lignes crée immédiatement une connexion émotionnelle — avant même qu'on entende une seule note." />
        <Banner text="✅ À faire · ❌ À éviter" sub="" color={SEC} />
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ À faire" /><BulletList color={GRN} items={[{ text: "Raconter des moments précis, pas des généralités" }, { text: "Être vulnérable sur les vraies difficultés" }, { text: "Connecter ton histoire à ton message musical" }, { text: "Avoir 3 versions : 30 sec, 3 min, 10 min" }]} /></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ À éviter" /><BulletList color="#DC2626" items={[{ text: "Inventer ou exagérer son histoire" }, { text: "Copier le récit d'un autre artiste" }, { text: "Rester trop vague (\"j'aime la musique depuis petit\")" }, { text: "Changer son histoire selon l'interlocuteur" }]} /></RedBox>}
        />
        <Callout color={GOLD} title="⏱ Exercice — 2 heures ce week-end"
          text="Écris les 5 éléments de ton histoire sur papier. Ensuite rédige ta bio en 3 versions : (1) 30 secondes — pour les réseaux. (2) 3 minutes — pour une interview radio. (3) 10 minutes — pour une conférence ou un podcast. Ces 3 versions doivent être prêtes avant ta prochaine sortie." />
      </ContentPage>

      <ContentPage chapter="PRO 32 — Storytelling" accent={SEC} pageNum={182} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Storytelling au quotidien : chaque contenu raconte ton histoire</SH2>
        <Body>Le storytelling ne se fait pas seulement dans les interviews ou les bios. Il se construit chaque jour, chaque publication, chaque story. La cohérence de ton récit sur le long terme est ce qui transforme un inconnu en artiste de référence.</Body>
        <MiniTable color={SEC}
          headers={["Support", "Comment raconter ton histoire ici", "Fréquence"]}
          rows={[
            ["TikTok / Reels", "Vidéos «behind the story» : pourquoi tu as écrit ce son", "1x/semaine"],
            ["Instagram Stories", "Montrer le processus, les coulisses, les moments authentiques", "Quotidien"],
            ["Bio réseaux", "Ta version 30 secondes — à mettre à jour chaque saison", "Chaque saison"],
            ["Interviews", "Ta version 3 minutes bien préparée — jamais improviser", "À chaque sortie"],
            ["Paroles de chansons", "Ton histoire la plus intime — c'est là qu'elle est la plus puissante", "À chaque projet"],
            ["Podcasts", "Ta version 10 minutes — développer l'origine, les épreuves, la mission", "Trimestriel"],
          ]}
        />
        <SH3 color={SEC}>Les 4 types de storytelling qui fonctionnent sur les réseaux</SH3>
        <NumberedList color={SEC} items={[
          "LE STORYTELLING D'ORIGINE — «Voici d'où je viens» — Montrer ton quartier, ta famille, tes débuts. Les gens s'identifient à une géographie réelle.",
          "LE STORYTELLING DE CRÉATION — «Voici comment est né ce son» — Expliquer l'histoire derrière un morceau spécifique. Toujours très engageant.",
          "LE STORYTELLING DE TRANSFORMATION — «Voici ce qui a changé ma vie / ma carrière» — Les moments pivots. Les victoires après les épreuves.",
          "LE STORYTELLING DE MISSION — «Voici pourquoi je fais ça» — Ta vision. Ce que tu veux que ta musique change dans le monde.",
        ]} />
      </ContentPage>

      <ContentPage chapter="PRO 32 — Storytelling" accent={SEC} pageNum={183} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment Raconter l'Histoire de Chaque Projet Musical</SH2>
        <Body>Chaque single, EP, album ou collaboration a sa propre histoire. Cette histoire, bien racontée, multiplie par 3 l'impact de ta promotion. Voici comment construire le récit autour de chaque type de projet.</Body>
        <MiniTable color={SEC}
          headers={["Projet", "Questions clés pour le storytelling", "Où le raconter"]}
          rows={[
            ["Single", "Qu'est-ce qui t'a inspiré ce son ? Quelle émotion veux-tu transmettre ? C'est quoi le contexte de ta vie quand tu l'as écrit ?", "TikTok, Instagram, interview radio avant la sortie"],
            ["Clip vidéo", "Pourquoi ce concept visuel ? Qui a contribué ? Qu'est-ce que le clip raconte que la chanson seule ne raconte pas ?", "Behind the scenes YouTube, making-of Instagram"],
            ["EP", "Quel fil conducteur relie les morceaux ? Qu'est-ce que tu veux que l'auditeur ressorte après l'écoute ?", "Teaser YouTube, interview TV, Lives Instagram"],
            ["Album", "Quelle période de ta vie raconte cet album ? Pourquoi maintenant ? Qu'est-ce qui change dans ton univers musical ?", "Presse, TV, documentaire, podcast long format"],
            ["Feat", "Comment vous êtes-vous rencontrés ? Pourquoi cet artiste spécifiquement ? Qu'est-ce que la collaboration t'a appris ?", "Post conjoint, Live commun, interview duo"],
          ]}
        />
        <Checklist color={SEC} title="⏱ Checklist Storytelling — à préparer 3 semaines avant chaque sortie (3h de travail)" items={[
          "Écrire l'histoire du morceau en 5 lignes (origine, émotion, contexte personnel)",
          "Préparer 3 anecdotes différentes sur la création de ce projet",
          "Créer 5 posts storytelling pour les réseaux (1 par pilier de contenu)",
          "Préparer ta réponse à la question «C'est quoi l'histoire de ce son ?» pour les interviews",
          "Planifier 1 vidéo TikTok «behind the story» pour le jour de la sortie",
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 33 — COMMUNIQUER AUTOUR DES SORTIES (P184–P187)              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={33} title="PRO 33 — Communiquer autour de ses Sorties" accent={BLU} pageNum={184} total={TOTAL} guideLabel={LABEL}
        hook="Sortir un son sans plan de communication, c'est ouvrir un restaurant sans mettre d'enseigne. La meilleure musique du monde reste invisible sans une communication maîtrisée. Voici le protocole pro pour chaque type de sortie." />

      <ContentPage chapter="PRO 33 — Communication & Sorties" accent={BLU} pageNum={185} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Communication Single : le Plan Semaine par Semaine</SH2>
        <MiniTable color={BLU}
          headers={["Semaine", "Actions communication", "Plateformes"]}
          rows={[
            ["S-4 (4 sem. avant)", "Préparer le plan complet. Photos presse prises. Artwork finalisé. Bio à jour.", "Interne / équipe"],
            ["S-3", "Teasing indirect : extraits 5 sec sans titrer. Storys mystérieuses. 'Quelque chose arrive...'", "TikTok, Stories IG"],
            ["S-2", "Annonce officielle : titre, date, artwork. Pre-save Spotify activé. Diffusion WhatsApp.", "Tous les réseaux"],
            ["S-1", "Contenu BTS quotidien. Q&A fans. Countdown stories. Contact médias et radios.", "IG, TikTok, WhatsApp"],
            ["Jour J", "Publication synchronisée partout. Notification WhatsApp. Live Instagram soir. Merci fans.", "Tous les réseaux"],
            ["S+1", "YouTube Ads (50K FCFA). Réponse à tous les commentaires. Presse locale contactée.", "YouTube, Meta"],
            ["S+2", "Meta Ads diaspora. Contenu réaction fans. Statistiques analysées.", "Facebook, Instagram"],
            ["S+3", "Maintien : nouvelles vidéos TikTok avec le son. Pitching playlists Spotify.", "TikTok, Spotify"],
          ]}
        />
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ À faire" /><BulletList color={GRN} items={[{ text: "Préparer le contenu 4 semaines à l'avance" }, { text: "Avoir l'artwork finalisé avant l'annonce" }, { text: "Activer le pre-save Spotify 2 semaines avant" }, { text: "Notifier sa liste WhatsApp le jour J" }]} /></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ À éviter" /><BulletList color="#DC2626" items={[{ text: "Annoncer et sortir le même jour" }, { text: "Poster une seule fois et attendre" }, { text: "Oublier la diaspora dans la communication" }, { text: "Sortir sans budget publicité prévu" }]} /></RedBox>}
        />
        <Callout color={BLU} title="⏱ Temps requis pour un lancement single pro" text="Planning (2h) + Contenu créé à l'avance (6-8h) + Communication quotidienne (30 min/jour sur 4 semaines) = environ 30 heures d'investissement total pour un lancement bien fait." />
      </ContentPage>

      <ContentPage chapter="PRO 33 — Communication & Sorties" accent={BLU} pageNum={186} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>EP, Album et Feat : Stratégies Distinctes</SH2>
        <SH3 color={BLU}>Communication EP (Extended Play — 3 à 6 titres)</SH3>
        <Body>L'EP est ton premier argument de crédibilité. Plus qu'un simple single, il établit ton univers artistique. Sa communication s'étale sur 6 à 8 semaines.</Body>
        <BulletList color={BLU} items={[
          { bold: "S-8 à S-5 :", text: "Teasing de l'univers visuel (couleurs, ambiance, moodboard partagé progressivement)" },
          { bold: "S-4 :", text: "Révélation du titre de l'EP + artwork + premier single extrait" },
          { bold: "S-2 :", text: "Deuxième extrait ou lyric video + interviews médias" },
          { bold: "Jour J :", text: "Sortie complète + Live écoute commentée + concert de lancement si possible" },
        ]} />
        <Divider color={BLU} />
        <SH3 color={BLU}>Communication Album (7 titres et plus)</SH3>
        <Body>L'album est un événement culturel. Sa communication mérite 3 à 6 mois de préparation et un budget publicitaire significatif.</Body>
        <BulletList color={BLU} items={[
          { bold: "Phase 1 (M-6 à M-3) :", text: "Teasing de l'univers, 2-3 singles préparatoires, buildup d'audience" },
          { bold: "Phase 2 (M-2) :", text: "Révélation du titre, tracklist, pré-commandes, interviews presse" },
          { bold: "Phase 3 (Semaine J) :", text: "Sortie + concert de lancement + campagne publicitaire maximale" },
          { bold: "Phase 4 (M+1 à M+3) :", text: "Clips des singles majeurs, tournée locale ou régionale" },
        ]} />
        <Divider color={BLU} />
        <SH3 color={BLU}>Communication Feat (apparition sur le projet d'un autre artiste)</SH3>
        <MiniTable color={BLU}
          headers={["Action", "Timing", "Objectif"]}
          rows={[
            ["Partager le projet de l'autre artiste activement", "Jour J", "Soutien sincère visible par les deux audiences"],
            ["Créer ton propre contenu autour du feat", "Jour J + 2", "Montrer ta contribution, ta perspective"],
            ["Live ou post commun avec l'artiste hôte", "Semaine J", "Maximiser la visibilité croisée"],
            ["Pas de sur-promotion — reste respectueux", "Toujours", "Le feat est son projet, pas le tien"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="PRO 33 — Communication & Sorties" accent={BLU} pageNum={187} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment Réaliser son Clip Vidéo Professionnellement</SH2>
        <Body>Un clip n'est pas juste une vidéo. C'est le visage de ta musique — il dure des années sur YouTube. Un bon clip valorise même un son ordinaire. Un mauvais clip peut saborder un excellent son.</Body>
        <SH3 color={BLU}>Les 5 étapes de réalisation d'un clip pro</SH3>
        <ProcessLine color={BLU} steps={[
          { num: "1", title: "Concept", desc: "Définir l'histoire visuelle. Cohérent avec ton branding et les émotions du son." },
          { num: "2", title: "Pré-prod", desc: "Casting, décors, tenues, storyboard. Tout décider avant le tournage." },
          { num: "3", title: "Tournage", desc: "1 à 2 jours max. Checklist technique, soundcheck playback, photos BTS." },
          { num: "4", title: "Post-prod", desc: "Montage, étalonnage couleur, effets. Livraison en 4K, format 16:9 et vertical." },
          { num: "5", title: "Distribution", desc: "Upload YouTube optimisé + Instagram Reel (extrait 60 sec) + TikTok." },
        ]} />
        <MiniTable color={BLU}
          headers={["Budget", "Ce que tu peux avoir", "Pour quel niveau"]}
          rows={[
            ["100 000 FCFA", "Clip simple (1 lieu, 1 tenue, caméra iPhone + étalonnage)", "Artiste débutant — validation du concept"],
            ["300 000 FCFA", "Clip mid-range (2-3 lieux, équipe 3-4 personnes, caméra pro)", "Single principal émergent"],
            ["800 000+ FCFA", "Clip premium (concept élaboré, réalisateur reconnu, éclairage)", "Lead single — artiste établi"],
          ]}
        />
        <Checklist color={BLU} title="⏱ Checklist clip — 2 semaines de préparation (10h de travail)" items={[
          "Définir le concept visuel (1h) — cohérent avec ton univers et le message du son",
          "Choisir et contacter le réalisateur (2h) — voir son portfolio, négocier le tarif",
          "Préparer le storyboard simplifié (2h) — liste des plans à tourner",
          "Arranger décors, tenues, casting (3h) — tout valider avant le jour J",
          "Préparer le jour du tournage : alimentation, eau, équipe confirmée, horaires (2h)",
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 34 — PRISE DE PAROLE PUBLIQUE (P188–P190)                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={34} title="PRO 34 — Prendre la Parole en Public" accent={ACC} pageNum={188} total={TOTAL} guideLabel={LABEL}
        hook="Ta musique parle. Mais quand on te met un micro devant — est-ce que tu parles aussi bien ? La prise de parole en public est une compétence qui se travaille. Les artistes qui savent parler d'eux ouvrent 3 fois plus de portes que ceux qui ne savent pas." />

      <ContentPage chapter="PRO 34 — Prise de Parole Publique" accent={ACC} pageNum={189} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Interview Radio, TV et Podcast : le Guide Complet</SH2>
        <SH3 color={ACC}>Avant l'interview : la préparation pro</SH3>
        <NumberedList color={ACC} items={[
          "RENSEIGNE-TOI SUR LE MÉDIA — Qui l'écoute/regarde ? Quel est le style ? Quelles questions posent-ils habituellement ?",
          "PRÉPARE TES 5 MESSAGES CLÉS — 5 choses que tu veux absolument dire pendant cette interview. Si tu n'as pas de liste, tu oublies l'essentiel.",
          "PRATIQUE À VOIX HAUTE — Pas dans ta tête. Enregistre-toi sur ton téléphone et réécoute. C'est souvent choquant mais très utile.",
          "PRÉPARE TA RÉPONSE À LA QUESTION DIFFICILE — Celle qui te met mal à l'aise. Elle arrivera un jour. Mieux vaut être prêt.",
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Pendant l'interview : les règles d'or</SH3>
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ À faire" /><BulletList color={GRN} items={[{ text: "Regarder l'interlocuteur, pas la caméra" }, { text: "Parler lentement — tu as le temps" }, { text: "Ramener aux messages clés même si la question est différente" }, { text: "Sourire — même à la radio, ça s'entend" }, { text: "Dire «je ne sais pas» plutôt que d'inventer" }]} /></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ À éviter" /><BulletList color="#DC2626" items={[{ text: "Critiquer d'autres artistes" }, { text: "Parler de sujets sensibles sans préparation" }, { text: "Monopoliser la parole — laisser le journaliste parler" }, { text: "Commenter l'actualité politique si ce n'est pas ton terrain" }, { text: "Être défensif face aux questions difficiles" }]} /></RedBox>}
        />
        <Callout color={ACC} title="⏱ Exercice pratique — 1h par semaine"
          text="Enregistre-toi pendant 3 minutes en répondant à la question «Parle-moi de toi et de ta musique». Réécoute. Note ce qui sonne faux, hésitant ou vague. Refais jusqu'à ce que tu aimes ce que tu entends. Fais ça chaque semaine. En 2 mois, tu seras un bon communicant." />
        <SH3 color={ACC}>La différence Radio / TV / Podcast</SH3>
        <MiniTable color={ACC}
          headers={["Média", "Ce qui compte le plus", "Ce qu'il faut préparer"]}
          rows={[
            ["Radio", "Ta voix, ton rythme, tes mots — image mentale créée par les mots", "Parler clairement, rythme soutenu, anecdotes courtes et vivantes"],
            ["Télévision", "Image, posture, vêtements, regard — tout est visible", "Tenue soignée, posture droite, regard caméra/interviewer selon le type"],
            ["Podcast", "Profondeur, authenticité, longueur — les gens sont là pour te connaître", "Anecdotes longues, vulnérabilité acceptable, expertise réelle"],
            ["Live Instagram/TikTok", "Connexion directe, spontanéité, interaction fans", "Être naturel, répondre aux commentaires, rester dans ton univers"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="PRO 34 — Prise de Parole Publique" accent={ACC} pageNum={190} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Devoirs de l'Artiste : ce que personne n'enseigne</SH2>
        <Body>Un artiste a des droits — nous y reviendrons. Mais il a aussi des devoirs. Des obligations envers son art, envers son public, envers son industrie et envers lui-même. Les ignorer est la source de la plupart des carrières avortées.</Body>
        <InfoGrid color={ACC} cols={2} items={[
          { emoji: "🎨", title: "Devoir artistique", desc: "Livrer de la qualité à chaque sortie. Ne jamais sortir quelque chose dont tu n'es pas fier juste pour «exister».", badge: "Art" },
          { emoji: "📅", title: "Devoir de constance", desc: "Être régulier. Tes fans ont besoin de te voir et de t'entendre. L'irrégularité brise la fidélité.", badge: "Présence" },
          { emoji: "🤝", title: "Devoir envers les fans", desc: "Répondre. Reconnaître. Remercier. Tes fans sont ton capital humain le plus précieux.", badge: "Relation" },
          { emoji: "⚖️", title: "Devoir légal", desc: "Déclarer tes œuvres au BSDA. Signer des contrats clairs. Payer tes collaborateurs.", badge: "Légal" },
          { emoji: "📈", title: "Devoir professionnel", desc: "Être ponctuel, préparé, fiable. Ta réputation professionnelle précède ta musique.", badge: "Pro" },
          { emoji: "🌍", title: "Devoir social", desc: "Utiliser ta plateforme avec responsabilité. Ce que tu dis influence tes fans.", badge: "Société" },
        ]} />
        <MiniTable color={ACC}
          headers={["Devoir", "Ce qu'il faut faire concrètement", "Ce qu'il ne faut pas faire"]}
          rows={[
            ["Qualité artistique", "Prendre le temps qu'il faut pour chaque production", "Sortir précipitamment par peur de la concurrence"],
            ["Ponctualité", "Arriver TOUJOURS à l'heure — studio, concert, interview", "Faire attendre les professionnels — cela se retient"],
            ["Honnêteté", "Tenir ses engagements — si tu dis que tu vas livrer, tu livres", "Promettre ce que tu ne peux pas tenir"],
            ["Développement", "Continuer à se former, à écouter, à apprendre", "Penser savoir tout parce qu'on a eu du succès"],
            ["Déclarations légales", "BSDA, ISRC, Split Sheet à chaque création", "Ignorer ses obligations légales par paresse"],
          ]}
        />
        <Callout color={GOLD} title="⏱ Temps requis — revue mensuelle des devoirs (1h/mois)"
          text="Chaque 1er du mois, 1 heure de bilan : Ai-je tenu mes engagements ce mois-ci ? Mes œuvres sont-elles déclarées ? Mes collaborateurs sont-ils payés ? Ai-je répondu à mes fans ? Cette heure mensuelle te protège contre les erreurs professionnelles les plus fréquentes." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 35 — GESTION D'ÉQUIPE (P191–P193)                            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={35} title="PRO 35 — Gérer son Équipe : Leadership ou Management ?" accent={AMB} pageNum={191} total={TOTAL} guideLabel={LABEL}
        hook="Un artiste seul plafonne rapidement. Mais un artiste mal entouré peut être détruit par son propre entourage. La gestion d'équipe est l'une des compétences les plus sous-estimées dans la musique africaine." />

      <ContentPage chapter="PRO 35 — Gestion d'Équipe" accent={AMB} pageNum={192} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Leadership vs Management : comprendre la différence</SH2>
        <Body>Ces deux mots sont souvent confondus — et pourtant ils décrivent deux réalités très différentes. Un artiste pro doit maîtriser les deux, mais pas les confondre.</Body>
        <MiniTable color={AMB}
          headers={["Critère", "Leadership", "Management"]}
          rows={[
            ["Question centrale", "«Pourquoi allons-nous dans cette direction ?»", "«Comment allons-nous y aller ?»"],
            ["Focus", "Vision, inspiration, sens", "Organisation, exécution, processus"],
            ["Relation à l'équipe", "Inspire, donne de la vision, crée l'adhésion", "Coordonne, délègue, contrôle, recadre"],
            ["Horizon temporel", "Long terme — la mission globale", "Court terme — les livrables et les délais"],
            ["Rôle de l'artiste", "Toujours leader de sa vision artistique", "Peut déléguer le management à un manager"],
          ]}
        />
        <Callout color={AMB} title="La règle d'or pour l'artiste"
          text="Tu ne peux pas déléguer ton leadership — c'est toi l'artiste, tu es le seul à connaître ta vision. Mais tu peux et tu DOIS déléguer le management (organisation, coordination, suivi) dès que tu en as les moyens. Un artiste qui fait tout lui-même ne grandit jamais assez vite." />
        <SH3 color={AMB}>Comment gérer son équipe concrètement</SH3>
        <NumberedList color={AMB} items={[
          "BRIEFER CLAIREMENT — Avant chaque projet, brief écrit : objectif, délai, budget, standard de qualité attendu. Pas de brief = pas de résultat prévisible.",
          "DONNER LA VISION D'ABORD — Avant de dire «fais ça», explique pourquoi. Une équipe qui comprend le sens travaille mieux et avec plus d'initiative.",
          "FIXER DES DÉLAIS RÉELS — Ne jamais dire «dès que possible». Toujours donner une date et heure précises.",
          "FÉLICITER EN PUBLIC, RECADRER EN PRIVÉ — Règle d'or du leadership. L'inverse détruit la confiance et crée de la honte.",
          "RÉUNION HEBDOMADAIRE COURTE — 30 minutes, en équipe, pour aligner tout le monde. Évite les malentendus et les décalages.",
        ]} />
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ Ce qu'un bon leader fait" /><BulletList color={GRN} items={[{ text: "Partage la vision clairement et régulièrement" }, { text: "Reconnaît le travail de chacun publiquement" }, { text: "Fixe des objectifs mesurables" }, { text: "Fait confiance et délègue vraiment" }]} /></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ Ce qu'un mauvais leader fait" /><BulletList color="#DC2626" items={[{ text: "Change d'avis constamment sans explication" }, { text: "Critique en public, humilie l'équipe" }, { text: "Veut tout contrôler sans déléguer" }, { text: "Ne paie pas ou paie en retard" }]} /></RedBox>}
        />
        <Callout color={GOLD} title="⏱ Réunion d'équipe — 30 min/semaine"
          text="Chaque semaine : 10 min pour aligner sur les projets en cours. 10 min pour identifier les blocages. 10 min pour fixer les priorités de la semaine suivante. Cette réunion courte et régulière est ce qui fait la différence entre une équipe chaotique et une équipe performante." />
      </ContentPage>

      <ContentPage chapter="PRO 35 — Gestion d'Équipe" accent={AMB} pageNum={193} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Recruter son Équipe : Les Bons Rôles au Bon Moment</SH2>
        <Body>Beaucoup d'artistes font l'erreur de recruter trop tôt ou de mal recruter. Voici les rôles à intégrer progressivement, dans l'ordre logique du développement d'une carrière sénégalaise.</Body>
        <MiniTable color={AMB}
          headers={["Rôle", "Quand l'intégrer", "Mission principale", "Rémunération typique"]}
          rows={[
            ["Assistant / Bras droit", "Dès 50 000+ FCFA/mois réguliers", "Agenda, logistique, WhatsApp pro, courriers", "15 000 – 30 000 FCFA/mois ou % cachets"],
            ["Community Manager", "Dès 1 000 abonnés engagés", "Contenu quotidien, stories, analytics, réponses fans", "20 000 – 50 000 FCFA/mois ou freelance"],
            ["Manager artistique", "Dès des demandes booking régulières", "Négociation contrats, booking, relations industrie", "10 – 20% des cachets bruts"],
            ["Directeur Artistique (DA)", "Pour un EP ou album majeur", "Direction visuelle : clips, visuels, identité globale", "50 000 – 200 000 FCFA par projet"],
            ["Attaché(e) de presse", "Pour une sortie importante ou tournée", "Relations médias, communiqués, interviews radio/TV", "30 000 – 100 000 FCFA/mois ou par campagne"],
            ["Comptable / Conseiller fiscal", "Dès 500 000 FCFA/mois stables", "Déclarations fiscales, optimisation, suivi comptable", "30 000 – 60 000 FCFA/mois"],
          ]}
        />
        <SH3 color={AMB}>Comment rémunérer son équipe sans se ruiner</SH3>
        <BulletList color={AMB} items={[
          { bold: "Salaire fixe :", text: "Pour les rôles réguliers (CM, assistant). Même petit, un salaire fixe crée la loyauté. La sécurité qu'il reçoit devient l'engagement qu'il te donne." },
          { bold: "Pourcentage des cachets :", text: "Pour le manager et le booker. Ils gagnent quand tu gagnes — alignement total des intérêts. Zéro coût si zéro revenu." },
          { bold: "Paiement par projet :", text: "Pour le DA, le photographe, l'ingénieur son. Pas de charges fixes — tu paies à la commande, selon les besoins réels." },
          { bold: "Échange de services :", text: "En phase de démarrage : ton contenu contre son expertise. Valide uniquement si formalisé par écrit et si la valeur échangée est réellement équitable." },
        ]} />
        <Callout color={AMB} title="La règle d'or du recrutement artistique"
          text="Recrute pour tes faiblesses, pas pour tes forces. Si tu es excellent en création mais nul en organisation — recrute un manager méthodique. Si tu es fort en scène mais nul en visuels — recrute un DA brillant. Ton équipe doit couvrir ce que tu ne fais pas bien, pas dupliquer ce que tu fais déjà bien." />
      </ContentPage>

      <ContentPage chapter="PRO 35 — Gestion d'Équipe" accent={AMB} pageNum={194} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Gérer les Conflits, les Départs et les Contrats d'Équipe</SH2>
        <Body>Les conflits dans une équipe artistique sont inévitables. L'argent, la reconnaissance, les décisions créatives, les délais — autant de sources de tension. Un artiste pro sait gérer ces moments sans laisser les émotions détruire ce qu'il a construit.</Body>
        <MiniTable color={AMB}
          headers={["Source de conflit", "Ce qui se passe concrètement", "Comment le prévenir dès le départ"]}
          rows={[
            ["Argent mal réparti", "Un membre se sent sous-payé vs sa contribution réelle", "Accord écrit avec % ou montants précis dès le démarrage"],
            ["Crédits non reconnus", "Quelqu'un contribue mais n'est jamais crédité publiquement", "Créditer systématiquement chaque collaboration, même petite"],
            ["Décisions sans consultation", "L'artiste décide seul de choses qui impactent l'équipe", "Réunion hebdomadaire + partage des décisions importantes"],
            ["Délais non respectés", "Quelqu'un ne livre pas à temps et bloque tout le projet", "Deadlines écrits + clause de préavis dans le contrat d'équipe"],
            ["Favoritisme perçu", "Un membre pense que l'artiste en favorise un autre", "Transparence totale sur les décisions et leurs raisons"],
          ]}
        />
        <SH3 color={AMB}>Protocole de gestion d'un conflit — 4 étapes</SH3>
        <ProcessLine color={AMB} steps={[
          { num: "1", title: "Écouter sans interrompre", desc: "Laisser la personne exprimer son problème complètement. Ne pas se défendre immédiatement. Objectif : comprendre, pas convaincre." },
          { num: "2", title: "Reformuler pour valider", desc: "'Si je comprends bien, tu te sens... parce que...' Cette reformulation montre que tu as écouté et désamorce 80% des tensions." },
          { num: "3", title: "Proposer une solution concrète", desc: "Une action précise avec une date. 'Je vais faire X avant le [date].' Pas de vagues promesses. Mettre par écrit si nécessaire." },
          { num: "4", title: "Assurer le suivi", desc: "Une semaine après : revenir sur le conflit. La solution fonctionne-t-elle ? Ce suivi montre que tu prends l'équipe au sérieux." },
        ]} />
        <SH3 color={AMB}>Les départs — comment les gérer professionnellement</SH3>
        <BulletList color={AMB} items={[
          { bold: "Prévoir les départs dès le début :", text: "Tout contrat d'équipe doit inclure une clause de sortie : préavis (1 mois minimum), transfert des accès comptes, règlement des dus." },
          { bold: "Ne jamais brûler les ponts :", text: "L'industrie musicale est petite. L'ancien CM que tu as mal remercié peut devenir responsable d'une grande radio dans 2 ans. Finir proprement." },
          { bold: "Protéger ses données avant tout départ :", text: "Récupérer TOUS les accès comptes (Instagram, YouTube, distrib., Drive). Ne jamais laisser une seule personne détenir le seul accès à un compte critique." },
        ]} />
        <Banner text="Une équipe bien traitée est la meilleure promotion qu'un artiste puisse avoir." sub="Tes collaborateurs parlent de toi dans leur réseau. Fais en sorte qu'ils disent du bien." color={AMB} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 36 — NETWORKING & CONTACTS (P193–P195)                       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={36} title="PRO 36 — Avoir les Contacts de l'Industrie" accent={GRN} pageNum={193} total={TOTAL} guideLabel={LABEL}
        hook="Dans l'industrie musicale, ce que tu sais compte. Qui tu connais compte autant. Mais la façon dont tu entretiens ces relations compte encore plus. Un bon réseau professionnel se construit avec méthode — pas avec chance." />

      <ContentPage chapter="PRO 36 — Networking & Contacts" accent={GRN} pageNum={194} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Construire son Réseau Professionnel dans la Musique</SH2>
        <Body>Le réseau professionnel n'est pas une liste de contacts. C'est un ensemble de relations dans lesquelles tu apportes de la valeur et tu en reçois. Un réseau sain est fondé sur la réciprocité, pas sur l'exploitation.</Body>
        <SH3 color={GRN}>Où rencontrer les professionnels de l'industrie</SH3>
        <InfoGrid color={GRN} cols={2} items={[
          { emoji: "🎪", title: "Festivals & Événements", desc: "Galsen Gospel Urbain, Sunu Impact Festival, Dakar Music Expo — ces événements concentrent en 2 jours des contacts que tu mettrais des années à trouver ailleurs.", badge: "Priorité 1" },
          { emoji: "🎙️", title: "Studios d'enregistrement", desc: "Les studios sont des carrefours naturels. Les artistes, ingénieurs, managers et beatmakers s'y croisent constamment.", badge: "Priorité 2" },
          { emoji: "📱", title: "Instagram & LinkedIn", desc: "Un DM bien rédigé à un professionnel peut ouvrir une vraie porte. La qualité du message compte plus que la quantité.", badge: "Digital" },
          { emoji: "⛪", title: "Communautés religieuses", desc: "Pour l'artiste gospel, les grandes conventions, les concerts d'église et les rassemblements chrétiens sont des réseaux puissants et souvent négligés.", badge: "Gospel" },
          { emoji: "🎓", title: "Ateliers & Formations", desc: "AAIM Music Business, ateliers KEKELI — ces espaces réunissent artistes et professionnels dans un contexte d'apprentissage ouvert.", badge: "Formation" },
          { emoji: "🏢", title: "Radios & Médias locaux", desc: "Visiter les rédactions, inviter les journalistes à tes événements, envoyer ta musique régulièrement — construire la relation avant d'en avoir besoin.", badge: "Presse" },
        ]} />
        <SH3 color={GRN}>Comment approcher un professionnel sans être intrusif</SH3>
        <NumberedList color={GRN} items={[
          "OFFRIR DE LA VALEUR EN PREMIER — Partage leur travail, commente sincèrement, félicite une réalisation récente. Existe dans leur radar avant de demander quoi que ce soit.",
          "LE DM PARFAIT — Bref (5 lignes max), personnalisé (montre que tu connais leur travail), proposition de valeur claire, appel à l'action simple.",
          "LA RENCONTRE EN PERSONNE — Plus impactante qu'un message. Prépare ton pitch de 30 secondes. Écoute plus que tu ne parles.",
          "LE SUIVI — 1 semaine après une rencontre, envoyer un message de suivi sincère. 95% des gens ne le font pas. Toi, fais-le.",
        ]} />
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ Bonne approche DM" /><p style={{ fontFamily: F, fontSize: "9px", color: "#166534", lineHeight: 1.6, margin: 0 }}>«Bonjour [Nom], j'ai écouté [projet récent] — vraiment impressionnant sur [détail précis]. Je suis Amset, artiste gospel dakarois. J'aimerais discuter d'une possible collaboration sur [sujet précis]. Disponible pour un échange de 15 minutes ?»</p></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ DM à ne pas envoyer" /><p style={{ fontFamily: F, fontSize: "9px", color: "#991B1B", lineHeight: 1.6, margin: 0 }}>«Bonjour j'aimerais travailler avec vous je suis artiste j'ai sorti des sons et j'ai besoin d'un contact pour percer dans l'industrie musicale merci de me répondre»</p></RedBox>}
        />
        <Callout color={GOLD} title="⏱ Networking — 2h par semaine"
          text="Lundi : identifier 3 professionnels à contacter cette semaine. Mardi-Jeudi : envoyer un message personnalisé à chacun. Vendredi : faire le suivi des contacts de la semaine précédente. Ce rythme, tenu sur 12 mois, construit un réseau professionnel solide." />
      </ContentPage>

      <ContentPage chapter="PRO 36 — Networking & Contacts" accent={GRN} pageNum={195} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Entretenir son Réseau dans la Durée et la Liste des Contacts Clés</SH2>
        <Body>Construire un contact n'est que la première étape. La vraie compétence, c'est de maintenir ce contact dans le temps — sans paraître intéressé, sans disparaître entre deux demandes. Le réseau professionnel s'entretient comme une plante : régulièrement, pas uniquement quand on en a besoin.</Body>
        <SH3 color={GRN}>La règle du "donner avant de demander"</SH3>
        <BulletList color={GRN} items={[
          { bold: "Partager leur contenu (sans demander de retour) :", text: "Relayer une sortie, commenter une interview, féliciter un projet — sans rien attendre en retour. C'est l'investissement qui paie le plus." },
          { bold: "Inviter aux événements :", text: "Un contact invité à ton concert et bien accueilli devient un ambassadeur naturel. L'expérience vécue crée plus de lien que 10 messages WhatsApp." },
          { bold: "Envoyer des opportunités :", text: "Si tu vois un appel à projets, un festival, une opportunité qui concerne quelqu'un dans ton réseau — envoie-le-lui. On se souvient de ceux qui pensent à vous." },
          { bold: "Message d'anniversaire ou de felicitation :", text: "Féliciter sincèrement une sortie, un succès, une promotion. Deux lignes suffisent. C'est rare, donc mémorable." },
        ]} />
        <SH3 color={GRN}>Les 10 contacts à développer en priorité dans l'industrie sénégalaise</SH3>
        <MiniTable color={GRN}
          headers={["Profil à avoir dans son réseau", "Pourquoi c'est stratégique", "Comment le trouver"]}
          rows={[
            ["Un journaliste radio (DFM, RFM, Zik FM)", "Accès à la diffusion et interviews", "Instagram, LinkedIn, événements musicaux"],
            ["Un organisateur d'événements Dakar", "Dates de concerts, mise en avant", "Via promoteurs sur Instagram"],
            ["Un autre artiste de même niveau", "Featurings, tournées communes, soutien moral", "Concerts, studios, événements"],
            ["Un graphiste / DA de confiance", "Visuels pro sans avoir à embaucher en fixe", "Behance, Instagram portfolios"],
            ["Un ingénieur son (studio à Dakar)", "Qualité de production, tarifs négociés", "Réseaux d'artistes, recommandations"],
            ["Un blogueur / YouTubeur musical sénégalais", "Couverture presse digital, chroniques", "Recherche sur YouTube, Instagram"],
            ["Un manager ou agent expérimenté", "Conseil, orientations, contacts avancés", "Associations (AAIM, etc.), salons"],
            ["Un professionnel de la diaspora (France, IT, ES)", "Accès au marché européen et aux dates diaspora", "Groupes Facebook diaspora, Instagram"],
            ["Un représentant BSDA ou Ministère Culture", "Droits, subventions, informations légales", "En personne ou via associations"],
            ["Un entrepreneur / chef d'entreprise", "Sponsoring, brand deals, collaborations commerciales", "LinkedIn, événements business Dakar"],
          ]}
        />
        <Callout color={GRN} title="L'outil le plus sous-estimé du networking : le CRM artiste"
          text="Crée un fichier Google Sheets avec 5 colonnes : Nom | Rôle | Contact | Dernier contact | Notes. Mets à jour après chaque interaction. Ce fichier de 50 contacts bien entretenus vaut plus que 1 000 abonnés Instagram que tu ne connais pas. C'est ton vrai capital relationnel." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 37 — RELATIONS PRESSE & VISIBILITÉ (P195–P197)               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={37} title="PRO 37 — Comment Faire Parler de Toi" accent={SEC} pageNum={195} total={TOTAL} guideLabel={LABEL}
        hook="Attendre que les médias viennent te chercher est la stratégie de l'amateur. Le pro sait que la visibilité médiatique se construit activement — avec une méthode, une régularité et des bons outils." />

      <ContentPage chapter="PRO 37 — Relations Presse & Visibilité" accent={SEC} pageNum={196} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment Obtenir une Couverture Médiatique</SH2>
        <SH3 color={SEC}>Le communiqué de presse : l'outil de base</SH3>
        <Body>Un communiqué de presse est un document court (1 page) que tu envoies aux journalistes pour annoncer une actualité. Il doit répondre à : Qui ? Quoi ? Quand ? Où ? Pourquoi ?</Body>
        <div style={{ padding: "12px 14px", borderRadius: "8px", background: CREAM, border: `1px solid ${SEC}25`, margin: "8px 0" }}>
          <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: SEC, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Structure type d'un communiqué de presse</p>
          <BulletList color={SEC} items={[
            { bold: "TITRE :", text: "[Nom Artiste] sort [Titre du projet] le [Date] — [Accroche en 10 mots]" },
            { bold: "PARAGRAPHE 1 :", text: "Le fait principal — qui, quoi, quand, où" },
            { bold: "PARAGRAPHE 2 :", text: "Le contexte — l'histoire du projet, ce qui le rend unique" },
            { bold: "PARAGRAPHE 3 :", text: "Citation de l'artiste — une phrase forte et mémorable" },
            { bold: "FIN :", text: "Contact presse, liens streaming, réseaux sociaux" },
          ]} />
        </div>
        <MiniTable color={SEC}
          headers={["Média à cibler", "Comment les approcher", "Timing"]}
          rows={[
            ["Radios (DFM, RFM, Zik FM)", "Envoyer le son + communiqué 3 semaines avant la sortie", "S-3"],
            ["Blogs musicaux sénégalais", "DM Instagram ou email — demander une chronique", "S-2"],
            ["Journalistes presse écrite", "Email professionnel + dossier de presse complet", "S-2"],
            ["YouTubeurs / Créateurs", "Demander une réaction ou une mention", "Jour J"],
            ["Influenceurs locaux", "Envoyer le son + proposition de collaboration", "S-1"],
          ]}
        />
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ À faire" /><BulletList color={GRN} items={[{ text: "Créer et maintenir une liste de contacts presse" }, { text: "Relancer une seule fois si pas de réponse" }, { text: "Envoyer ton dossier de presse à jour" }, { text: "Remercier chaque journaliste qui parle de toi" }]} /></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ À éviter" /><BulletList color="#DC2626" items={[{ text: "Envoyer en masse sans personnalisation" }, { text: "Harceler les médias qui n'ont pas répondu" }, { text: "Critiquer un média qui n'a pas parlé de toi" }, { text: "Contacter sans dossier de presse ni lien écoute" }]} /></RedBox>}
        />
        <Callout color={GOLD} title="⏱ Relations presse — 3h avant chaque sortie"
          text="Mise à jour dossier de presse (1h) + rédaction du communiqué (1h) + envoi personnalisé à 10-15 contacts (1h). À faire 3 semaines avant la sortie pour que les médias aient le temps de programmer une diffusion." />
      </ContentPage>

      <ContentPage chapter="PRO 37 — Relations Presse & Visibilité" accent={SEC} pageNum={197} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Construire son Dossier de Presse Professionnel</SH2>
        <Body>Un dossier de presse (ou <strong>EPK — Electronic Press Kit</strong>) est le document de référence que tu envoies à tous les professionnels qui ont besoin d'information sur toi : journalistes, organisateurs, labels, festivals, partenaires. Un EPK bien fait ouvre des portes — un EPK bâclé les ferme.</Body>
        <SH3 color={SEC}>Les 8 éléments d'un EPK professionnel</SH3>
        <Checklist color={SEC} items={[
          "Bio artiste (version courte 50 mots + version longue 200 mots) — en français ET en anglais si possible",
          "Photo professionnelle HD (minimum 3 visuels de qualité — portrait, scène, ambiance)",
          "Liens streaming (Spotify, Boomplay, YouTube, Apple Music) avec les chiffres clés actualisés",
          "Vidéo live ou clip (le meilleur, vu comme carte de visite principale)",
          "Revue de presse : extraits d'articles ou citations de médias qui ont déjà parlé de toi",
          "Liste des dates passées (concerts, événements, festivals — avec noms et capacités)",
          "Fichier technique (rider scène) + besoins logistiques",
          "Contact direct (téléphone WhatsApp, email pro — réponse sous 24h garantie)",
        ]} />
        <SH3 color={SEC}>Les influenceurs et créateurs comme nouveaux relais de presse</SH3>
        <Body>En 2026, les influenceurs et créateurs de contenu ont souvent plus d'impact que les médias traditionnels pour un artiste émergent. Leur audience est ciblée, engagée, et fait confiance à leurs recommandations.</Body>
        <MiniTable color={SEC}
          headers={["Type d'influenceur", "Audience typique", "Ce qu'il peut faire pour toi", "Comment l'approcher"]}
          rows={[
            ["Blogueur/Vlogger musical sénégalais", "5 000 – 100 000 vues", "Chronique, interview, découverte artiste", "DM Instagram + envoi lien streaming + bio"],
            ["Créateur TikTok musical (AOF)", "10 000 – 500 000 followers", "Cover, duet, usage de ton son dans ses vidéos", "Envoyer le son + brief créatif court"],
            ["Présentateur radio jeune (DFM, Pulse)", "Audience 18-30 ans fidèle", "Passage en rotation, interview rapide", "Email pro + dossier de presse + lien envoi"],
            ["Instagrameur lifestyle dakarois", "20 000 – 200 000 followers", "Mention dans story, collaboration de contenu", "DM personnalisé + proposition collaboration"],
            ["Podcast culture/musique sénégalais", "1 000 – 20 000 écoutes/épisode", "Interview longue forme — crédibilité forte", "Email avec bio + angle d'interview proposé"],
          ]}
        />
        <Callout color={SEC} title="Le micro-influenceur : souvent plus efficace que le macro"
          text="Un influenceur à 5 000 abonnés très engagés dans ta ville fait souvent plus de conversions qu'un compte à 500 000 abonnés génériques. Le taux d'engagement et la proximité géographique/culturelle comptent plus que le nombre. 10 micro-influenceurs ciblés > 1 macro-influenceur généraliste." />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 38 — DROITS MÉCONNUS (P197–P200)                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={38} title="PRO 38 — Les Droits Méconnus de l'Artiste" accent={GOLD} pageNum={197} total={TOTAL} guideLabel={LABEL}
        hook="Des millions de FCFA en royalties dorment dans des comptes que les artistes africains ne savent pas qu'ils possèdent. Ces droits existent. Ils te reviennent. Personne ne viendra te les apporter — c'est à toi d'aller les chercher." />

      <ContentPage chapter="PRO 38 — Droits Méconnus" accent={GOLD} pageNum={198} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les 8 Types de Droits que la Plupart des Artistes Ignorent</SH2>
        <InfoGrid color={GOLD} cols={2} items={[
          { emoji: "📻", title: "Droits de diffusion publique", desc: "Chaque fois que ton son passe à la radio, à la TV ou dans un lieu public (hôtel, restaurant, avion), tu as droit à une rémunération. Collecté via le BSDA.", badge: "Méconnu" },
          { emoji: "🎵", title: "Droits voisins (interprète)", desc: "Distinct des droits d'auteur — c'est ta rémunération en tant qu'interprète de l'enregistrement. Différent du droit de compositeur.", badge: "Méconnu" },
          { emoji: "🎬", title: "Droits de synchronisation", desc: "Quand ta musique est utilisée dans un film, une série, une pub ou un jeu vidéo. Très rémunérateur, négocié séparément.", badge: "Inexploité" },
          { emoji: "📱", title: "Droits de streaming digital", desc: "Spotify, Boomplay, Apple Music — chaque stream génère des royalties. Récupérées via ton distributeur (DistroKid, TuneCore).", badge: "Partiellement connu" },
          { emoji: "📀", title: "Droits mécaniques", desc: "À chaque reproduction de ton œuvre (CD, vinyle, téléchargement, sonnerie), tu perçois des droits mécaniques — même si tu n'es que compositeur.", badge: "Très méconnu" },
          { emoji: "🎤", title: "Droits de performance live", desc: "Les organisateurs d'événements payent une redevance à la BSDA pour les œuvres interprétées. L'artiste enregistré perçoit une part.", badge: "Méconnu" },
          { emoji: "🔤", title: "Droit au nom artistique", desc: "Ton nom d'artiste peut être protégé comme marque. Personne ne peut l'utiliser commercialement sans ton accord.", badge: "Ignoré" },
          { emoji: "🖼️", title: "Droits d'image", desc: "Tes photos, vidéos, et représentations physiques ou digitales ne peuvent pas être utilisées sans contrat. Très souvent violé.", badge: "Ignoré" },
        ]} />
        <Callout color={GOLD} title="Opportunité spécifique pour l'artiste gospel sénégalais"
          text="Les artistes gospel sous-déclarent massivement leurs droits de diffusion. Pourtant, les églises qui diffusent votre musique lors de services, les radios chrétiennes, les plateformes de streaming religieuses — tout cela génère des droits. Ces revenus existent. Il faut s'inscrire pour les percevoir." />
      </ContentPage>

      <ContentPage chapter="PRO 38 — Droits Méconnus" accent={GOLD} pageNum={199} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Plan d'Action : Activer tous ses Droits en 30 Jours</SH2>
        <Body>Les droits ne s'activent pas automatiquement — tu dois faire les démarches. Ce plan de 30 jours te permet d'activer tous tes droits de façon méthodique, sans te noyer dans la complexité administrative.</Body>
        <MiniTable color={GOLD}
          headers={["Semaine", "Actions à faire", "Temps requis", "Résultat attendu"]}
          rows={[
            ["Semaine 1", "S'inscrire au BSDA (en personne à Dakar) + déclarer toutes les œuvres existantes", "3-4h", "Accès aux royalties de diffusion locale + droits voisins"],
            ["Semaine 2", "Activer Content ID YouTube via DistroKid + créer compte Payoneer si pas encore fait", "2-3h", "Récupération automatique des revenus YouTube mondiaux"],
            ["Semaine 3", "Vérifier que chaque morceau a un ISRC sur DistroKid + mettre à jour les métadonnées", "2h", "Traçabilité complète de tous les streams et diffusions"],
            ["Semaine 4", "Créer un tableau de suivi trimestriel des droits (Google Sheets) + 1er bilan", "2h", "Système de suivi permanent pour ne plus perdre un centime"],
          ]}
        />
        <SH3 color={GOLD}>Les droits d'image — souvent violés, rarement réclamés</SH3>
        <Body>Chaque fois qu'une photo ou vidéo de toi est utilisée dans une publicité, un événement, un post commercial sans ton accord écrit, c'est une violation de ton droit à l'image. C'est très fréquent dans l'industrie musicale africaine — et presque toujours ignoré.</Body>
        <BulletList color={GOLD} items={[
          { bold: "Ce qui est autorisé sans accord :", text: "Photos prises lors de concerts publics (usage éditorial, presse). Partages non commerciaux de fans sur les réseaux sociaux." },
          { bold: "Ce qui nécessite un contrat :", text: "Utilisation de ton image dans une publicité, un affiche commerciale, un post sponsorisé, un produit. Même si tu étais ami avec le prestataire." },
          { bold: "Comment réagir si ton image est utilisée sans accord :", text: "(1) Capture d'écran avec date. (2) Message WhatsApp documenté demandant le retrait ou la régularisation. (3) Si résistance : lettre formelle ou avocat selon l'enjeu financier." },
          { bold: "Comment se protéger en amont :", text: "Avant tout événement professionnel, envoyer un 'usage d'image memo' aux organisateurs : 'Toute photo ou vidéo de ma personne dans un contexte commercial nécessite mon accord écrit.'" },
        ]} />
        <SH3 color={GOLD}>La protection du nom d'artiste — OAPI et BSDA</SH3>
        <BulletList color={GOLD} items={[
          { bold: "OAPI (Organisation Africaine de la Propriété Intellectuelle) :", text: "Protège ton nom d'artiste comme marque dans 17 pays africains d'un seul dépôt. Coût : environ 100 000 à 150 000 FCFA. Si ton nom commence à avoir de la valeur commerciale, cet investissement s'impose." },
          { bold: "BSDA :", text: "Inscription du nom artistique dans les registres de droits d'auteur. Moins fort qu'un dépôt de marque mais crée un historique daté qui prouve ton antériorité." },
          { bold: "Vérifier qu'aucun autre artiste ne porte le même nom :", text: "Recherche sur Spotify, Boomplay, Google. Si ton nom est déjà pris, mieux vaut le découvrir maintenant — avant d'avoir investi 5 ans de carrière dessus." },
        ]} />
        <Banner text="Tes droits ne viendront pas te chercher — c'est à toi d'aller les chercher." sub="Chaque semaine sans inscription au BSDA est une semaine de royalties perdues à jamais. Commence aujourd'hui." color={GOLD} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 39 — RÉCUPÉRER SES DROITS & ROYALTIES (P200–P203)            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={39} title="PRO 39 — Récupérer ses Droits et Royalties" accent={GOLD} pageNum={200} total={TOTAL} guideLabel={LABEL}
        hook="Savoir que tu as des droits ne suffit pas. Il faut savoir comment les activer, où les récupérer, et quelles étapes suivre pour chaque plateforme et chaque organisme. Voici le guide complet, étape par étape." />

      <ContentPage chapter="PRO 39 — Récupérer ses Droits" accent={GOLD} pageNum={201} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Étape par Étape : récupérer ses droits en 2026</SH2>
        <SH3 color={GOLD}>1. Le BSDA — Sénégal (droits de diffusion locale)</SH3>
        <ProcessLine color={GOLD} steps={[
          { num: "1", title: "Inscription", desc: "Se présenter au BSDA (Avenue Roume, Dakar) avec CNI + photos" },
          { num: "2", title: "Déclaration", desc: "Déclarer chaque œuvre : titre, co-auteurs, date création" },
          { num: "3", title: "ISRC", desc: "Obtenir un code ISRC pour chaque enregistrement" },
          { num: "4", title: "Suivi", desc: "Vérifier annuellement ses relevés de droits perçus" },
          { num: "5", title: "Perception", desc: "Retrait des droits sur présentation de pièce d'identité" },
        ]} />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>2. Spotify — Droits de streaming</SH3>
        <NumberedList color={GOLD} items={[
          "Distribuer via DistroKid ou TuneCore — c'est eux qui collectent et reversent les royalties Spotify",
          "Créer son compte Payoneer pour recevoir les paiements en FCFA",
          "Dans DistroKid : aller dans «Earnings» pour voir les royalties par morceau et par pays",
          "Les paiements arrivent mensuellement (seuil minimum ~25$)",
          "Pour les droits d'auteur (composition) : s'inscrire à la SACEM si tu es en France, ou à la BSDA au Sénégal",
        ]} />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>3. YouTube — Droits Content ID et Adsense</SH3>
        <NumberedList color={GOLD} items={[
          "Activer la monétisation YouTube (1 000 abonnés + 4 000h de visionnage)",
          "Enregistrer ses sons dans YouTube Content ID via DistroKid pour récupérer les droits si quelqu'un utilise ton son",
          "Les revenus publicitaires arrivent mensuellement via Google AdSense",
          "Pour récupérer des droits sur des anciennes vidéos non monétisées : contacter YouTube via le formulaire de réclamation",
        ]} />
        <Callout color={GOLD} title="⏱ Vérification trimestrielle des droits — 2h tous les 3 mois"
          text="Chaque trimestre : (1) Vérifier DistroKid/TuneCore — nouveaux revenus ? (2) Vérifier Payoneer — paiements reçus ? (3) BSDA — droits en attente de perception ? (4) YouTube Studio — revenus à vérifier. Ce suivi trimestriel assure que pas un centime ne reste non perçu." />
      </ContentPage>

      <ContentPage chapter="PRO 39 — Récupérer ses Droits" accent={GOLD} pageNum={202} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Récupérer ses Droits via la SACEM (pour la diaspora et l'international)</SH2>
        <Body>Si tu es artiste sénégalais avec une présence en France ou dans d'autres pays francophones, la SACEM (Société des Auteurs, Compositeurs et Éditeurs de Musique) est une organisation essentielle à connaître.</Body>
        <MiniTable color={GOLD}
          headers={["Organisme", "Pays / Zone", "Ce qu'il gère", "Comment s'inscrire"]}
          rows={[
            ["BSDA", "Sénégal", "Droits diffusion locale, radio, TV, événements", "En personne, Avenue Roume, Dakar"],
            ["SACEM", "France + international", "Droits auteurs francophones à l'international", "sacem.fr — formulaire en ligne"],
            ["CISAC", "Réseau mondial", "Coordination entre sociétés de droits du monde entier", "Via BSDA ou SACEM (membres du réseau)"],
            ["SoundExchange", "USA", "Droits streaming digital USA (Pandora, etc.)", "soundexchange.com — gratuit"],
            ["DistroKid / TuneCore", "Mondial", "Royalties streaming plateformes digitales", "Compte distributeur déjà créé"],
          ]}
        />
        <Callout color={GOLD} title="Le réseau CISAC : ton filet de sécurité international"
          text="Le BSDA est membre de la CISAC (Confédération Internationale des Sociétés d'Auteurs et Compositeurs). Cela signifie que si ton son est diffusé en France, en Belgique ou au Canada, la société locale collecte les droits et les reverse au BSDA qui te les redistribue. La condition : être inscrit au BSDA ET avoir déclaré tes œuvres." />
        <SH3 color={GOLD}>Les droits que personne ne réclame — et qui restent non distribués</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Droits non réclamés au BSDA :", text: "Des millions de FCFA collectés chaque année restent non distribués faute d'inscription des artistes. Inscris-toi maintenant, même si tu n'as pas encore de succès commercial." },
          { bold: "Droits SACEM pour artistes francophones :", text: "Les artistes africains francophones dont les sons passent en Europe perçoivent rarement ces droits — non pas parce qu'ils n'existent pas, mais parce qu'ils ne sont pas inscrits." },
          { bold: "Content ID YouTube non activé :", text: "Si quelqu'un sur YouTube utilise ton son et que tu n'as pas activé le Content ID, il perçoit les revenus à ta place — ou personne ne les perçoit." },
          { bold: "Streaming dans les salons et hôtels :", text: "Les chaînes musicales diffusées dans les lieux publics génèrent des droits voisins. Ces droits existent mais sont rarement collectés en Afrique francophone." },
        ]} />
        <Checklist color={GOLD} title="⏱ Checklist droits — à compléter une fois pour toutes (6-8h de travail)" items={[
          "S'inscrire au BSDA si pas encore fait (1h — en personne à Dakar)",
          "Déclarer TOUTES ses œuvres existantes au BSDA (2h)",
          "Vérifier que chaque morceau distribué a un ISRC (30 min sur DistroKid)",
          "Activer le Content ID YouTube via DistroKid (15 min)",
          "Créer un compte Payoneer si pas encore fait (30 min)",
          "Vérifier s'il faut s'inscrire à la SACEM (si présence en France) (1h de vérification)",
          "Mettre à jour ses Split Sheets pour tous les morceaux collaboratifs (2h)",
        ]} />
      </ContentPage>

      <ContentPage chapter="PRO 39 — Récupérer ses Droits" accent={GOLD} pageNum={203} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Récapitulatif : Tous les Droits, Tous les Organismes</SH2>
        <MiniTable color={GOLD}
          headers={["Situation", "Droit concerné", "Organisme", "Action à faire"]}
          rows={[
            ["Ton son passe à la radio sénégalaise", "Droit de diffusion publique", "BSDA", "Être inscrit au BSDA et œuvre déclarée"],
            ["Ton son est streamé sur Spotify", "Royalties streaming", "DistroKid → Payoneer", "Compte DistroKid actif + Payoneer"],
            ["Ton son est sur YouTube", "Adsense + Content ID", "YouTube Studio", "YPP activé + Content ID via DistroKid"],
            ["Ton son est utilisé dans une pub/film", "Droit de synchronisation", "Négociation directe ou via manager", "Contrat de licence à signer avant utilisation"],
            ["Ton son passe en France (radio/event)", "Droits SACEM/CISAC", "BSDA (membre CISAC)", "Inscription BSDA + déclaration œuvres"],
            ["Quelqu'un utilise ton son sans permission", "Droits d'auteur", "Plainte BSDA ou YouTube", "Signalement + réclamation Content ID"],
            ["Photo de toi utilisée sans accord", "Droit à l'image", "Avocat ou mise en demeure", "Lettre de mise en demeure + suppression"],
            ["Ton nom d'artiste utilisé par un autre", "Droit au nom / marque", "OAPI (Sénégal)", "Dépôt de marque à l'OAPI si possible"],
          ]}
        />
        <Banner text="Chaque droit non réclamé est de l'argent que tu laisses sur la table." sub="Ce tableau est ta feuille de route pour ne jamais laisser un centime qui t'appartient à quelqu'un d'autre." color={GOLD} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 40 — SONGWRITING (P204–P208)                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={40} title="PRO 40 — Songwriting : L'Art d'Écrire une Chanson" accent={ACC} pageNum={204} total={TOTAL} guideLabel={LABEL}
        hook="Tu peux avoir la meilleure voix du Sénégal, le meilleur beat d'Afrique — si le texte ne touche pas, la chanson ne reste pas. Le songwriting est la compétence la plus puissante et la plus mal enseignée dans l'industrie musicale africaine." />

      <ContentPage chapter="PRO 40 — Songwriting" accent={ACC} pageNum={205} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La Anatomie d'une Chanson : comprendre la structure</SH2>
        <Body>Avant d'écrire, il faut comprendre comment une chanson est construite. Chaque partie a un rôle précis — et comprendre ce rôle change tout à ta façon de composer.</Body>
        <MiniTable color={ACC}
          headers={["Partie", "Rôle", "Durée typique", "Exemple"]}
          rows={[
            ["Intro", "Créer l'atmosphère, accrocher l'oreille dès la première seconde", "5-15 sec", "Un riff de guitare, une mélodie a cappella, un son signature"],
            ["Couplet (Verse)", "Raconter l'histoire, poser le contexte, construire l'émotion", "16-32 mesures", "Les détails de l'histoire, les images concrètes"],
            ["Pré-Refrain (Pre-chorus)", "Créer la tension avant le refrain — monter l'attente", "4-8 mesures", "Phrase qui amène naturellement au refrain"],
            ["Refrain (Chorus)", "Le moment culminant — mélodie mémorable, message principal", "8-16 mesures", "Ce que les gens retiennent et chantent"],
            ["Pont (Bridge)", "Rupture — nouvelle perspective, nouveau souffle musical", "8 mesures", "Changement de mélodie, nouvelle idée"],
            ["Outro", "Clôturer l'émotion, laisser une impression finale", "5-30 sec", "Fade-out, reprise du refrain, silence"],
          ]}
        />
        <Callout color={ACC} title="La structure la plus utilisée dans la musique moderne"
          text="Intro → Couplet 1 → Pré-Refrain → Refrain → Couplet 2 → Pré-Refrain → Refrain → Pont → Refrain × 2 → Outro. Cette structure fonctionne dans presque tous les genres : gospel, afrobeats, mbalax, hip-hop. Comprends-la avant de la casser." />
        <SH3 color={ACC}>La différence entre une bonne chanson et une grande chanson</SH3>
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ Une grande chanson" /><BulletList color={GRN} items={[{ text: "Un refrain qu'on se retrouve à fredonner 3 jours après" }, { text: "Des images concrètes — pas des généralités" }, { text: "Une émotion unique et précise" }, { text: "Une cohérence entre le son et le texte" }, { text: "Un moment de surprise (le pont, la modulation)" }]} /></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ Une chanson oubliable" /><BulletList color="#DC2626" items={[{ text: "Un refrain vague que personne ne retient" }, { text: "Trop de clichés (amour, succès, Dieu) sans précision" }, { text: "Mélange d'émotions contradictoires sans fil" }, { text: "Un texte qui ne correspond pas au beat" }, { text: "Aucune surprise ni évolution" }]} /></RedBox>}
        />
      </ContentPage>

      <ContentPage chapter="PRO 40 — Songwriting" accent={ACC} pageNum={206} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Écrire un Refrain Inoubliable : le Cœur de la Chanson</SH2>
        <Body>Le refrain est la partie que les gens retiennent. Si ton refrain n'est pas fort, ta chanson ne restera pas. Les plus grands producteurs disent : <em>«Si tu n'as pas un refrain en 30 secondes, tu n'as pas une chanson.»</em></Body>
        <SH3 color={ACC}>Les 5 règles d'un refrain fort</SH3>
        <NumberedList color={ACC} items={[
          "RÉPÉTITION — Le refrain se répète plusieurs fois. Les mots principaux doivent être simples et mémorables. Évite les mots rares ou complexes.",
          "ÉMOTION MAXIMALE — C'est le point émotionnel le plus haut de la chanson. La voix doit monter, l'énergie doit exploser.",
          "MESSAGE CENTRAL — En 4 à 8 lignes, ton message principal doit être dit clairement. Qu'est-ce que tu veux que les gens retiennent ?",
          "MÉLODIE DISTINCTE — La mélodie du refrain doit être différente du couplet. Elle doit «décrocher» dans la tête de l'auditeur.",
          "UNIVERSEL — Le refrain doit parler à un maximum de gens. Pas trop personnel, pas trop général. Le juste milieu de l'universel.",
        ]} />
        <Divider color={ACC} />
        <SH3 color={ACC}>Exemples analysés</SH3>
        <MiniTable color={ACC}
          headers={["Chanson / Artiste", "Pourquoi le refrain fonctionne"]}
          rows={[
            ["Hossana — Kirk Franklin", "3 mots en boucle. Émotion maximale. Universel — tous les chrétiens peuvent l'identifier."],
            ["Come As You Are — Crowder", "Message simple et inclusif. Mélodie douce et montante. Aucun mot difficile."],
            ["Sinner — Chandler Moore", "Contraste fort entre le couplet narratif et le refrain libérateur. Surprise émotionnelle."],
            ["Gentleman — Patoranking", "Répétition du mot clé. Mélodie accrochante. Court et mémorable."],
          ]}
        />
        <Callout color={GOLD} title="⏱ Exercice refrain — 1h"
          text="Prends ta prochaine chanson. Écris 5 versions différentes du refrain. Change les mots, la longueur, l'approche. Chante chacune à voix haute. La meilleure est celle que tu te retrouves à fredonner après coup — pas celle que tu penses être la meilleure intellectuellement." />
      </ContentPage>

      <ContentPage chapter="PRO 40 — Songwriting" accent={ACC} pageNum={207} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Écrire un Couplet qui Raconte une Histoire</SH2>
        <Body>Un couplet fort n'est pas une liste d'idées générales. C'est une scène — concrète, précise, qui crée une image dans la tête de l'auditeur. La différence entre un grand et un petit parolier tient souvent à ceci : le détail spécifique vs la généralité vague.</Body>
        <TwoCol
          left={<RedBox><BoxLabel color="#DC2626" text="❌ Couplet vague (à éviter)" /><p style={{ fontFamily: F, fontSize: "9.5px", color: "#991B1B", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>«Je souffre dans la vie chaque jour, les gens me font du mal autour de moi, je cherche la paix dans mon cœur, Dieu est mon seul espoir...»</p><p style={{ fontFamily: F, fontSize: "8.5px", color: "#DC2626", margin: "6px 0 0" }}>Vague, cliché, aucune image concrète — l'auditeur ne ressent rien de particulier.</p></RedBox>}
          right={<GreenBox><BoxLabel color="#16A34A" text="✅ Couplet précis (à imiter)" /><p style={{ fontFamily: F, fontSize: "9.5px", color: "#166534", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>«À 3h du matin, dans ce studio vide de la Médina, j'avais plus un franc et le loyer en retard — mais j'entendais cette mélodie que Dieu mettait dans ma bouche...»</p><p style={{ fontFamily: F, fontSize: "8.5px", color: "#16A34A", margin: "6px 0 0" }}>Heure, lieu, situation précise — l'auditeur voit la scène. Il la ressent.</p></GreenBox>}
        />
        <SH3 color={ACC}>Techniques de songwriting avancées</SH3>
        <BulletList color={ACC} items={[
          { bold: "La méthode «Show don't tell» :", text: "Ne dis pas «j'étais triste». Montre ce que la tristesse fait : «je regardais la pluie tomber sans bouger»." },
          { bold: "La question rhétorique :", text: "Commencer un couplet par une question engage immédiatement l'auditeur dans une réflexion." },
          { bold: "Le contraste :", text: "«Tout le monde chantait, moi je pleurais» — la tension entre deux réalités opposées crée une émotion immédiate." },
          { bold: "L'ancrage culturel :", text: "Mentionner Dakar, le Plateau, le marché Sandaga, le sabar — les détails locaux créent une connexion immédiate avec le public cible." },
          { bold: "La progression narrative :", text: "Le couplet 1 plante le décor. Le couplet 2 fait avancer l'histoire. Ne pas répéter les mêmes idées dans les deux couplets." },
        ]} />
        <Callout color={GOLD} title="⏱ Exercice couplet — 45 min"
          text="Prends un souvenir réel de ta vie — un moment précis, difficile ou heureux. Décris ce souvenir en 4 lignes avec le maximum de détails sensoriels (ce que tu voyais, entendais, ressentais dans ton corps). C'est ça l'écriture de chanson authentique. À partir de ce souvenir précis, construis ton premier couplet." />
      </ContentPage>

      <ContentPage chapter="PRO 40 — Songwriting" accent={ACC} pageNum={208} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Écrire en Wolof, Français et Anglais : la Force du Multilinguisme</SH2>
        <Body>L'artiste sénégalais a une arme que les artistes américains, français ou nigérians n'ont pas : il peut écrire et chanter authentiquement dans 3 langues. Cette capacité, bien utilisée, crée une identité unique et un accès à plusieurs marchés simultanément.</Body>
        <MiniTable color={ACC}
          headers={["Langue", "Son impact", "Quand l'utiliser"]}
          rows={[
            ["Wolof", "Connexion émotionnelle maximale avec le public sénégalais. Authenticité perçue comme très forte.", "Pour les parties les plus intimes et émotionnelles de la chanson"],
            ["Français", "Accès au marché africain francophone + diaspora en Europe. Presse et médias francophones.", "Pour la narration, le storytelling, les couplets explicatifs"],
            ["Anglais", "Accès potentiel aux marchés anglophones (Nigeria, Ghana, USA, UK). Crédibilité internationale.", "Pour le refrain si tu vises l'international. Avec parcimonie."],
          ]}
        />
        <SH3 color={ACC}>Le processus d'écriture professionnel</SH3>
        <ProcessLine color={ACC} steps={[
          { num: "1", title: "L'idée", desc: "Une émotion, une expérience, une image. Noter immédiatement sur téléphone — les idées disparaissent vite." },
          { num: "2", title: "Le refrain", desc: "Écrire le refrain en premier. Si le refrain est fort, le reste suivra." },
          { num: "3", title: "Le titre", desc: "Trouver un titre mémorable qui contient l'essence du message." },
          { num: "4", title: "Les couplets", desc: "Construire l'histoire autour du refrain. Couplet 1 : contexte. Couplet 2 : approfondissement." },
          { num: "5", title: "Le pont", desc: "Apporter une nouvelle perspective, une rupture émotionnelle." },
          { num: "6", title: "La révision", desc: "Lire à voix haute. Changer ce qui sonne faux. Couper ce qui est superflu." },
        ]} />
        <Checklist color={ACC} title="⏱ Habitude songwriting — 30 min/jour (minimum 3x semaine)" items={[
          "Garder un carnet d'idées (notes téléphone) : noter chaque phrase, image ou émotion forte au moment où elle arrive",
          "Écouter activement des grands textes gospel et en analyser la structure (Kirk Franklin, CeCe Winans, Moses Bliss)",
          "Écrire un refrain complet par semaine — même s'il n'est pas utilisé, c'est un muscle qui se développe",
          "Lire de la poésie wolof et française — les meilleurs paroliers sont souvent de grands lecteurs",
          "Enregistrer des maquettes vocales de toutes tes idées, même brutes — ne jamais laisser une idée disparaître",
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 41 — HOME STUDIO (P209–P212)                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={41} title="PRO 41 — Home Studio : Produire depuis chez Soi" accent={AMB} pageNum={209} total={TOTAL} guideLabel={LABEL}
        hook="Les plus grandes chansons de l'histoire récente ont été enregistrées dans des chambres, des appartements, des garages. En 2026, la qualité d'un home studio accessible est équivalente à celle d'un studio professionnel des années 2000. Tu n'as plus besoin de payer 50 000 FCFA par session pour enregistrer." />

      <ContentPage chapter="PRO 41 — Home Studio" accent={AMB} pageNum={210} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi un Home Studio Change Tout</SH2>
        <Body>Un home studio ne remplace pas entièrement le studio professionnel — mais il te donne quelque chose que le studio pro ne peut pas donner : <strong>la liberté de créer à n'importe quelle heure, sans pression de temps et sans coût par session.</strong> C'est dans cet espace de liberté que les meilleures idées naissent.</Body>
        <InfoGrid color={AMB} cols={2} items={[
          { emoji: "⏰", title: "Créer à n'importe quelle heure", desc: "L'inspiration à 3h du matin ? Tu enregistres. Plus besoin d'attendre la disponibilité d'un studio.", badge: "Liberté" },
          { emoji: "💰", title: "Économiser sur les sessions", desc: "Au lieu de payer 30 000-50 000 FCFA par session studio, tu amortis ton équipement en quelques mois.", badge: "Économie" },
          { emoji: "🎨", title: "Expérimenter sans pression", desc: "Au studio, chaque minute coûte. Chez toi, tu peux rater, recommencer, explorer librement.", badge: "Créativité" },
          { emoji: "📱", title: "Enregistrer des maquettes", desc: "Capturer immédiatement tes idées en qualité suffisante pour les soumettre à des labels ou collaborateurs.", badge: "Productivité" },
        ]} />
        <Divider color={AMB} />
        <SH2 color={DARK}>Les 3 Niveaux de Home Studio avec Budgets en FCFA</SH2>
        <MiniTable color={AMB}
          headers={["Niveau", "Budget", "Ce que tu peux faire"]}
          rows={[
            ["Starter — Smartphone pro", "0 — 50 000 FCFA", "Maquettes vocales, idées, démos. iPhone + GarageBand + bonnets d'oreilles."],
            ["Intermédiaire — Setup complet", "150 000 — 400 000 FCFA", "Enregistrements propres publiables. Micro USB + interface audio + casque pro + DAW."],
            ["Avancé — Semi-pro", "600 000 — 1 500 000 FCFA", "Qualité studio professionnel. Micro à condensateur + préampli + traitement acoustique."],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="PRO 41 — Home Studio" accent={AMB} pageNum={211} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>L'Équipement Home Studio Niveau par Niveau</SH2>
        <SH3 color={AMB}>Setup Intermédiaire — 150 000 à 400 000 FCFA (recommandé pour débuter)</SH3>
        <MiniTable color={AMB}
          headers={["Équipement", "Rôle", "Budget indicatif", "Recommandation"]}
          rows={[
            ["Micro USB (Blue Yeti / Rode NT-USB)", "Enregistrer ta voix", "75 000 — 150 000 FCFA", "Rode NT-USB Mini — excellent rapport qualité/prix"],
            ["Interface audio (Focusrite Scarlett Solo)", "Connecter micro XLR à l'ordinateur", "60 000 — 100 000 FCFA", "Focusrite Scarlett Solo — standard de l'industrie"],
            ["Casque studio (Audio-Technica ATH-M20x)", "Écouter sans coloration", "30 000 — 60 000 FCFA", "Ne pas enregistrer avec des écouteurs Bluetooth"],
            ["DAW (logiciel)", "Enregistrer, mixer, produire", "Gratuit — 60 000 FCFA/an", "GarageBand (Mac, gratuit) ou FL Studio (Windows)"],
            ["Pied de micro + bonnette", "Tenue du micro + filtre pop", "15 000 — 25 000 FCFA", "Indispensable pour la qualité vocale"],
          ]}
        />
        <SH3 color={AMB}>À quoi sert exactement chaque équipement ?</SH3>
        <BulletList color={AMB} items={[
          { bold: "Le Microphone :", text: "Capte les vibrations sonores de ta voix et les convertit en signal électrique. Un micro USB se branche directement à l'ordinateur (simple). Un micro XLR (plus pro) nécessite une interface audio entre lui et l'ordinateur. La qualité du micro détermine 50% du rendu final de ta voix." },
          { bold: "L'Interface Audio (ex: Focusrite Scarlett Solo) :", text: "C'est le \"traducteur\" entre ton micro et ton ordinateur. Elle convertit le signal analogique (voix) en signal numérique que le logiciel peut traiter. Elle améliore fortement la qualité sonore par rapport à la carte son intégrée de l'ordinateur. Sans elle avec un micro XLR : rien ne fonctionne." },
          { bold: "Le Casque Studio (ex: Audio-Technica ATH-M20x) :", text: "Différent des écouteurs ordinaires — il reproduit le son sans l'améliorer artificiellement. Tu entends ta voix telle qu'elle a vraiment été enregistrée. Indispensable pour détecter les défauts de son et mixer correctement. Ne jamais mixer avec des écouteurs Bluetooth ou des AirPods." },
          { bold: "La Bonnette / Filtre Anti-Pop :", text: "S'installe entre toi et le micro. Arrête les sons explosifs (P, B, T) qui créent des \"pops\" disgracieux dans l'enregistrement. Sans bonnette, ces sons cassent la qualité même avec le meilleur micro du monde. Obligatoire dès le premier jour." },
          { bold: "Le DAW (GarageBand, FL Studio, Logic Pro…) :", text: "C'est ton studio numérique complet. C'est là que tu enregistres les pistes vocales, places les beats, arranges les éléments, corriges la voix (hauteur, timing), ajoutes des effets (réverbération, compression, EQ), et exportes le fichier audio final (MP3 ou WAV)." },
        ]} />
        <Divider color={AMB} />
        <SH3 color={AMB}>Traitement acoustique — le secret le moins cher</SH3>
        <Body>Le plus grand problème d'un home studio n'est pas le micro — c'est l'acoustique de la pièce. Les murs nus créent de la réverbération qui salit les enregistrements. Voici comment traiter acoustiquement à petit budget :</Body>
        <BulletList color={AMB} items={[
          { bold: "Option 1 — La penderie :", text: "Enregistre dans une penderie pleine de vêtements. Les vêtements absorbent les réflexions sonores. Résultat surprenant pour zéro FCFA." },
          { bold: "Option 2 — Matelas + couvertures :", text: "Entoure-toi de couvertures épaisses accrochées aux murs. Amélioration notable et gratuite." },
          { bold: "Option 3 — Mousse acoustique :", text: "Des panneaux de mousse acoustique (3 000-5 000 FCFA chacun sur Jumia ou marchés locaux) collés aux murs transforment une pièce ordinaire." },
          { bold: "Option 4 — Coin de la pièce :", text: "Enregistre dans un angle de pièce — les angles ont naturellement moins de réverbération que le centre." },
        ]} />
        <Callout color={AMB} title="⏱ Setup home studio — week-end de mise en place (8-10h)"
          text="Vendredi soir : commander/acheter l'équipement. Samedi : installation matérielle (2h) + traitement acoustique DIY (2h) + configuration du logiciel (2h). Dimanche : premiers enregistrements tests (2h) + réglages fins (2h). À la fin du week-end, tu as un home studio fonctionnel." />
      </ContentPage>

      <ContentPage chapter="PRO 41 — Home Studio" accent={AMB} pageNum={212} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les DAW (Logiciels de Production) : Lequel Choisir ?</SH2>
        <MiniTable color={AMB}
          headers={["DAW", "Système", "Prix", "Idéal pour", "Niveau"]}
          rows={[
            ["GarageBand", "Mac / iPhone uniquement", "Gratuit", "Débutants, maquettes, enregistrement vocal", "Débutant"],
            ["FL Studio", "Windows + Mac", "150 000 FCFA (licence à vie)", "Production musicale, beats, arrangements", "Intermédiaire"],
            ["Logic Pro", "Mac uniquement", "20 000 FCFA/an", "Production complète, mixage pro", "Intermédiaire-Avancé"],
            ["Ableton Live", "Windows + Mac", "300 000 FCFA+", "Performance live, musique électronique", "Avancé"],
            ["Pro Tools", "Windows + Mac", "Abonnement mensuel", "Standard studios professionnels", "Professionnel"],
          ]}
        />
        <SH3 color={AMB}>Quel logiciel pour quel usage ?</SH3>
        <MiniTable color={AMB}
          headers={["Objectif", "Logiciel recommandé", "Prix", "Disponible sur"]}
          rows={[
            ["Faire des beats / produire de la musique", "FL Studio", "150 000 FCFA (licence à vie)", "Windows + Mac"],
            ["Débuter la production (Mac/iPhone)", "GarageBand", "Gratuit", "Mac + iPhone uniquement"],
            ["Production complète + mixage (Mac)", "Logic Pro", "20 000 FCFA/an", "Mac uniquement"],
            ["Mixer sa voix sur des beats", "FL Studio ou Logic Pro", "Inclus dans ton DAW", "Windows + Mac"],
            ["Mastering automatique (débutant)", "LANDR (en ligne)", "~8 000 FCFA/mois", "Navigateur web — tout système"],
            ["Mastering avancé (niveau pro)", "iZotope Ozone", "~45 000 FCFA", "Windows + Mac"],
            ["Correction vocale (autotune)", "Antares Auto-Tune", "~50 000 FCFA/an", "Windows + Mac (plugin)"],
          ]}
        />
        <SH3 color={AMB}>Plugins vocaux essentiels à connaître</SH3>
        <BulletList color={AMB} items={[
          { bold: "Antares Auto-Tune (antarestech.com) :", text: "Corrige la justesse de ta voix. Mode transparent = correction naturelle que personne ne détecte. Mode effect = le son robotique popularisé par T-Pain. Standard mondial utilisé dans tous les studios pro. ~50 000 FCFA/an." },
          { bold: "iZotope Nectar (izotope.com) :", text: "Suite complète de traitement vocal en un seul plugin — EQ (équalization des fréquences), compression (homogénéisation du volume), réverbération, pitch correction. Tout ce dont ta voix a besoin. ~30 000 FCFA." },
          { bold: "Waves Vocal Rider (waves.com) :", text: "Ajuste automatiquement le volume de ta voix en temps réel selon l'intensité. Évite les sautes de volume entre les passages chantés fort et doucement. Souvent en promo flash à ~8 000 FCFA." },
          { bold: "Gratuits pour commencer :", text: "MAutoPitch (meldaproduction.com) pour la correction vocale, Voxengo Span pour analyser le son — téléchargeables gratuitement sans abonnement." },
        ]} />
        <SH3 color={AMB}>Règles d'or pour enregistrer des voix propres</SH3>
        <NumberedList color={AMB} items={[
          "CHAUFFER SA VOIX avant d'enregistrer — 15 minutes d'exercices vocaux minimum.",
          "BOIRE DE L'EAU TIÈDE — jamais froide, jamais glacée juste avant. L'eau chaude détend les cordes vocales.",
          "ÉVITER LES BRUITS PARASITES — éteindre le ventilateur, la climatisation, fermer les fenêtres pendant l'enregistrement.",
          "METTRE LE MICRO EN ANGLE — jamais face directement au micro (son explosif). Légèrement décalé ou utilisé une bonnette.",
          "ENREGISTRER PLUSIEURS PRISES — au minimum 3 prises complètes. Choisir la meilleure ou faire une compilation.",
          "DOUBLER SA VOIX — enregistrer deux fois la même piste vocale et les superposer crée un effet de plénitude sans égaliseur.",
          "NE PAS MIXER SOI-MÊME SES PROPRES VOIX — l'oreille s'habitue. Toujours faire écouter à quelqu'un d'extérieur avant de valider.",
        ]} />
        <TwoCol
          left={<GreenBox><BoxLabel color="#16A34A" text="✅ Home Studio — ce qu'il faut faire" /><BulletList color={GRN} items={[{ text: "Sauvegarder tous tes projets sur un disque dur externe" }, { text: "Nommer tes fichiers clairement (Titre_Date_V1)" }, { text: "Garder toutes les pistes séparées (stems)" }, { text: "Faire écouter tes maquettes sur différents appareils" }]} /></GreenBox>}
          right={<RedBox><BoxLabel color="#DC2626" text="❌ Erreurs fréquentes" /><BulletList color="#DC2626" items={[{ text: "Enregistrer avec un micro de téléphone pour une sortie officielle" }, { text: "Mixer dans une pièce avec beaucoup de réverbération" }, { text: "Trop compresser sa voix au moment de l'enregistrement" }, { text: "Ne pas faire de backup et perdre ses projets" }]} /></RedBox>}
        />
        <Callout color={GOLD} title="Quand aller en studio professionnel malgré le home studio ?"
          text="Le home studio pour : maquettes, démos, enregistrements rapides, expérimentation. Le studio pro pour : single ou EP destiné à être vendu ou fortement promu, quand le son final a besoin d'un traitement acoustique parfait. La règle : maquetter chez toi, finaliser en studio pour les sorties majeures." />
      </ContentPage>

      <ContentPage chapter="PRO 41 — Home Studio" accent={AMB} pageNum={213} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Où Acheter son Équipement depuis le Sénégal ?</SH2>
        <Body>L'équipement home studio est rarement disponible en boutique à Dakar — mais il est accessible. Voici toutes tes options avec délais, prix et conseils concrets.</Body>
        <MiniTable color={AMB}
          headers={["Plateforme", "Avantages", "Délais", "Conseil pratique"]}
          rows={[
            ["Jumia Sénégal (jumia.sn)", "Livraison locale, paiement Wave/Orange Money, retour possible", "2–5 jours ouvrés", "Idéal pour câbles, pieds de micro, mousses acoustiques. Sélection limitée pour le matériel pro."],
            ["AliExpress (aliexpress.com)", "Prix jusqu'à 60% moins chers qu'en boutique", "15–30 jours", "Bon pour les accessoires. Méfiance sur les micros — qualité très variable selon le vendeur."],
            ["Thomann (thomann.de)", "Spécialiste musique européen, catalogue immense, qualité garantie", "10–15 jours livraison internationale", "Meilleure option pour micro, interface audio, casque pro. Expédition vers le Sénégal disponible."],
            ["Amazon.fr + transitaire", "Large choix, prix compétitifs", "7–14 jours avec DHL/Chronopost", "Utiliser un transitaire local ou un contact en France. Budget livraison : 15 000–40 000 FCFA."],
            ["Facebook Marketplace Dakar", "Matériel d'occasion, prix négociable, disponible immédiatement", "Immédiat", "Toujours demander une démonstration avant d'acheter. Vérifier l'état des câbles et connecteurs."],
            ["Boutiques Dakar (Plateau, Médina)", "Voir le produit avant d'acheter, pas de frais d'expédition", "Immédiat", "Stock très limité. Chercher dans les boutiques d'électronique au Plateau ou vers Colobane."],
          ]}
        />
        <SH3 color={AMB}>Budget total selon le niveau de départ</SH3>
        <MiniTable color={AMB}
          headers={["Niveau", "Équipement minimum", "Budget total", "Ce que tu peux produire"]}
          rows={[
            ["Starter (smartphone)", "iPhone/Android + GarageBand + écouteurs intra", "0 FCFA", "Maquettes vocales, idées, démos envoyables à un beatmaker"],
            ["Débutant (micro USB)", "Micro USB Rode NT-USB Mini + pied + bonnette + GarageBand", "100 000–150 000 FCFA", "Enregistrements propres publiables sur les réseaux"],
            ["Intermédiaire", "Micro XLR + Interface Focusrite + Casque ATH-M20x + FL Studio", "300 000–450 000 FCFA", "Titres professionnels, featurings, soumissions à des labels"],
            ["Semi-pro", "Micro condensateur AKG/Rode + Préampli + Traitement acoustique + Logic Pro", "700 000–1 500 000 FCFA", "Qualité studio professionnel — EP et albums complets"],
          ]}
        />
        <Divider color={AMB} />
        <SH2 color={DARK}>ACTION PRATIQUE — Home Studio en 4 Semaines</SH2>
        <Checklist color={AMB} title="Plan d'action — ton home studio opérationnel en 30 jours" items={[
          "AUJOURD'HUI — Logiciel : Télécharge GarageBand (Mac/iPhone, gratuit) ou la démo FL Studio (Windows, gratuit). Crée un premier projet vide. Familiarise-toi avec l'interface pendant 30 minutes.",
          "SEMAINE 1 — Premier test : Enregistre 30 secondes de voix avec ton smartphone dans ta penderie fermée. Écoute le résultat. Compare avec une version enregistrée au centre de ta chambre. Tu entendras immédiatement la différence acoustique.",
          "SEMAINE 2 — Commande ton kit de départ : Bonnette anti-pop + pied de micro sur Jumia (15 000–25 000 FCFA). Si ton budget le permet, commande aussi ton micro USB (Rode NT-USB Mini recommandé, ~100 000 FCFA sur Thomann.de).",
          "SEMAINE 3 — Installation et configuration : Connecte ton micro à ton ordinateur. Configure le DAW pour qu'il reconnaisse le micro comme source d'entrée. Fais tes premiers tests d'enregistrement. Règle le gain (volume d'entrée) pour que la voix soit entre -12 et -6 dB.",
          "SEMAINE 4 — Première vraie maquette : Enregistre un couplet complet + refrain avec un beat (téléchargeable gratuitement sur YouTube Audio Library). Partage avec 3 personnes pour feedback honnête. C'est ta référence de départ.",
          "MOIS 2 — Mixage : Regarde 10 tutoriels YouTube sur le mixage vocal dans ton DAW (cherche «vocal mixing FL Studio tutorial» ou «Logic Pro vocal mixing»). Applique sur ta prise de semaine 4. Tu vas entendre la transformation.",
        ]} />
        <Banner text="La maquette imparfaite enregistrée vaut plus que la chanson parfaite dans ta tête." sub="Commence avec ce que tu as. Améliore avec ce que tu gagnes." color={AMB} dark />
      </ContentPage>

      {/* ── PAGE 214 — BUDGET 500 000 FCFA & COMMANDER EN CHINE ── */}
      <ContentPage chapter="PRO 41 — Home Studio · Budget 500 000 FCFA & Chine" accent={AMB} pageNum={214} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Budget 500 000 FCFA : Setup Pro depuis la Chine</SH2>
        <Body>Avec 500 000 FCFA et une commande intelligente sur <strong>AliExpress</strong>, tu peux te construire un home studio de niveau intermédiaire-pro pour <strong>deux à trois fois moins cher</strong> qu'en achetant localement ou en Europe. Voici exactement quoi acheter, où, et comment faire arriver tout ça à Dakar.</Body>
        <Callout color={"#DC2626"} title="Important : Shein ≠ équipement audio" text="Shein (shein.com) est un site de vêtements — tu n'y trouveras pas de micros ni d'interfaces audio. La bonne plateforme pour le matériel audio depuis la Chine est AliExpress (aliexpress.com). Alibaba (alibaba.com) existe aussi mais c'est pour les achats en gros (minimum 10-50 unités) — pas pour un artiste qui commande 1 micro." />
        <SH3 color={AMB}>Liste d'équipement 500 000 FCFA — commande AliExpress</SH3>
        <MiniTable color={AMB}
          headers={["Équipement", "Modèle recommandé", "Prix AliExpress", "À quoi il sert"]}
          rows={[
            ["Micro condensateur XLR", "FIFINE AM8 ou Maono AU-PM420", "20 000–35 000 FCFA", "Enregistrer la voix en qualité studio"],
            ["Interface audio", "Focusrite Scarlett Solo (3rd gen)", "55 000–75 000 FCFA", "Connecter le micro XLR à l'ordinateur + améliore le son"],
            ["Casque studio fermé", "OneOdio Monitor 60 ou ATH-M20x", "20 000–35 000 FCFA", "Écouter sans coloration — indispensable pour mixer"],
            ["Pied de micro + bras articulé", "Bras de bureau réglable (générique)", "8 000–15 000 FCFA", "Tenir le micro à la bonne hauteur, libérer tes mains"],
            ["Câble XLR mâle-femelle 3m", "Cable XLR 3m (générique)", "3 000–5 000 FCFA", "Relier le micro à l'interface audio"],
            ["Bonnette anti-pop", "Filtre pop double couche (générique)", "2 000–4 000 FCFA", "Éliminer les sons explosifs P/B/T dans la voix"],
            ["Panneaux mousse acoustique x12", "Lot 12 panneaux 30x30 cm", "10 000–18 000 FCFA", "Traitement acoustique de la pièce d'enregistrement"],
            ["Clavier MIDI (optionnel)", "AKAI MPK Mini MK3 ou Arteck", "20 000–40 000 FCFA", "Programmer des beats et des mélodies dans le DAW"],
            ["Frais de livraison (estimation)", "AliExpress Standard Shipping", "10 000–30 000 FCFA", "Livraison au Sénégal en 15-35 jours"],
          ]}
        />
        <Body><strong>Total équipement : 148 000 — 257 000 FCFA.</strong> Il te reste entre <strong>243 000 et 352 000 FCFA</strong> du budget pour investir dans :</Body>
        <BulletList color={AMB} items={[
          { bold: "FL Studio (licence à vie) :", text: "150 000 FCFA — ton DAW principal pour produire des beats et mixer. image-line.com/fl-studio" },
          { bold: "LANDR (mastering en ligne) :", text: "8 000 FCFA/mois — pour finaliser tes sons en qualité radio. landr.com" },
          { bold: "Antares Auto-Tune (abonnement) :", text: "~50 000 FCFA/an — correction vocale professionnelle. antarestech.com" },
          { bold: "Premières sessions de promotion :", text: "Budget publicité Meta Ads pour lancer tes premiers sons sur Facebook/Instagram." },
        ]} />
      </ContentPage>

      {/* ── PAGE 215 — COMMANDER SUR ALIEXPRESS DEPUIS LE SÉNÉGAL ── */}
      <ContentPage chapter="PRO 41 — Home Studio · Commander depuis la Chine" accent={AMB} pageNum={215} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comment Commander sur AliExpress depuis le Sénégal</SH2>
        <Body>Commander depuis la Chine n'est pas compliqué — mais il y a des étapes précises à suivre pour recevoir ta commande sans problème. Voici le guide complet pas à pas.</Body>
        <SH3 color={AMB}>Les plateformes à connaître</SH3>
        <MiniTable color={AMB}
          headers={["Plateforme", "Site web", "Pour qui", "Conseil"]}
          rows={[
            ["AliExpress", "aliexpress.com", "Particuliers — acheter 1 à 5 articles", "La meilleure option pour toi. Pas de minimum de commande."],
            ["Alibaba", "alibaba.com", "Entreprises — acheter en gros (50-1000 unités)", "Pas adapté pour un artiste solo. Réservé aux revendeurs."],
            ["DHgate", "dhgate.com", "Intermédiaire — quelques unités", "Alternative à AliExpress, moins connu mais fiable."],
            ["Temu", "temu.com", "Particuliers — prix très bas", "Bon pour les accessoires (câbles, supports) mais pas pour le matériel audio sérieux."],
            ["Shein", "shein.com", "Vêtements uniquement", "Ne vend pas d'équipement audio. Mauvaise option."],
          ]}
        />
        <SH3 color={AMB}>Guide pas à pas — Commander sur AliExpress</SH3>
        <NumberedList color={AMB} items={[
          "CRÉER TON COMPTE (5 minutes) — Va sur aliexpress.com. Clique sur «Sign in / Register». Crée un compte avec ton adresse email ou via Google. C'est gratuit et sans engagement.",
          "CHERCHER LE PRODUIT EN ANGLAIS — Les résultats sont meilleurs en anglais. Exemples : «USB condenser microphone», «audio interface focusrite», «studio headphones». Filtre par 4+ étoiles et minimum 50 avis.",
          "VÉRIFIER LE VENDEUR — Cherche le badge «AliExpress Choice» ou «Top Brand». Vérifie le taux de satisfaction (minimum 95%). Lis les avis avec photos — ce sont les plus fiables.",
          "VÉRIFIER LA LIVRAISON AU SÉNÉGAL — Sur la fiche produit, clique sur «Shipping». Entre «Senegal» comme destination. Vérifie les délais et le coût. Si la livraison au Sénégal n'est pas disponible, cherche un autre vendeur.",
          "CHOISIR LE MODE DE LIVRAISON — AliExpress Standard (gratuit, 20-35 jours) = option économique. AliExpress Premium (3 000-8 000 FCFA, 15-22 jours) = bon équilibre. DHL Express (20 000-50 000 FCFA, 5-8 jours) = quand tu es pressé.",
          "PAYER — Carte Visa/Mastercard internationale (UBA, Ecobank, Société Générale, CBAO). Certaines banques sénégalaises bloquent les paiements internationaux : appelle ta banque avant pour les prévenir. Alternative : carte Visa prépayée Ecobank ou UBA disponible à Dakar (sans compte bancaire).",
          "SUIVRE TA COMMANDE — AliExpress t'envoie un numéro de tracking automatiquement. Utilise 17track.net pour suivre la position de ton colis en temps réel depuis la Chine jusqu'à Dakar.",
        ]} />
        <SH3 color={AMB}>La Douane au Sénégal — Ce qu'il Faut Savoir</SH3>
        <MiniTable color={AMB}
          headers={["Valeur déclarée du colis", "Ce qui se passe", "Conseil"]}
          rows={[
            ["Moins de 150 000 FCFA", "Généralement exempt de droits de douane — livraison directe", "Commande en plusieurs petits colis si tu achètes beaucoup"],
            ["150 000 à 500 000 FCFA", "Possible TVA (18%) + droits de douane (5-20%)", "Prévoir 15-25% du montant en plus pour les frais de douane"],
            ["Plus de 500 000 FCFA", "Déclaration obligatoire, dédouanement formel", "Faire appel à un transitaire local pour gérer le dédouanement"],
          ]}
        />
        <BulletList color={AMB} items={[
          { bold: "Astuce livraison :", text: "Demande au vendeur AliExpress de marquer le colis comme «Gift» (cadeau) avec une valeur déclarée basse. C'est une pratique très courante sur AliExpress — beaucoup de vendeurs le font automatiquement." },
          { bold: "Si ton colis est retenu à la douane :", text: "Tu reçois un avis de la Direction Générale des Douanes (douanes.sn). Tu dois te présenter avec ta facture AliExpress, ton passeport ou CNI, et payer les frais indiqués. En général, les délais sont de 3-7 jours ouvrés pour récupérer le colis." },
          { bold: "Transitaires locaux à Dakar :", text: "Pour les grosses commandes (+500 000 FCFA), utilise un transitaire professionnel. Exemples : DHL Express Dakar (dhl.com/sn), Chronopost Sénégal, ou contacte l'agence SAGA/Bolloré Logistics au Port de Dakar." },
        ]} />
        <Callout color={GOLD} title="Sites web essentiels à sauvegarder"
          text="AliExpress : aliexpress.com · Alibaba (grossiste) : alibaba.com · Thomann (Europe) : thomann.de · Suivi colis universel : 17track.net · Douanes Sénégal : douanes.sn · DHL Sénégal : dhl.com/sn · LANDR mastering : landr.com · FL Studio : image-line.com/fl-studio · Auto-Tune : antarestech.com" />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* AVERTISSEMENT — LA FAUSSE CROISSANCE (P191–P194)                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={0} title="L'Avertissement — Le Piège de la Fausse Croissance" accent={"#DC2626"} pageNum={191} total={TOTAL} guideLabel={LABEL}
        hook="Il existe un raccourci que beaucoup d'artistes empruntent. Il semble rapide, il est peu coûteux, et il donne l'illusion du succès. C'est le mensonge le plus dangereux de l'industrie musicale digitale. Ce chapitre est l'un des plus importants de ce livre." />

      <ContentPage chapter="Avertissement — La Fausse Croissance" accent={"#DC2626"} pageNum={192} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Acheter des Followers, des Vues et des Likes : La Vérité Complète</SH2>
        <Body>Chaque jour, des centaines d'artistes africains dépensent de l'argent pour acheter des abonnés, des vues YouTube, des streams Spotify, des likes Instagram. Ils pensent que ça les aidera à paraître plus établis, à convaincre des organisateurs, à obtenir des contrats. <strong>C'est l'une des erreurs les plus coûteuses qu'un artiste puisse faire.</strong></Body>
        <Banner text="Les faux chiffres donnent une vraie illusion — et de vraies conséquences." sub="L'algorithme ne se trompe pas. Les marques ne se trompent pas. Et toi, tu ne te trompes pas non plus." color={"#DC2626"} dark />
        <SH3 color={"#DC2626"}>Pourquoi les artistes le font — et pourquoi ils ont tort</SH3>
        <MiniTable color={"#DC2626"}
          headers={["La fausse logique", "La réalité"]}
          rows={[
            ["«Si j'ai 10 000 followers, les gens me prendront au sérieux»", "Un taux d'engagement de 0.1% dit exactement le contraire aux professionnels"],
            ["«Si j'ai 100 000 vues YouTube, les organisateurs m'appelleront»", "Les organisateurs vérifient si ces vues viennent de vraies personnes. Ils savent."],
            ["«Ça va m'aider à décoller algorithmiquement»", "L'algorithme détecte l'engagement non authentique et punit le compte"],
            ["«Tout le monde le fait»", "Les artistes qui durent ne le font pas. Ce sont ceux qui disparaissent qui le font."],
            ["«C'est juste pour démarrer»", "Une fondation fausse ne supporte pas une vraie carrière"],
          ]}
        />
        <Callout color={"#DC2626"} title="Ce que tu achètes vraiment quand tu achètes des followers"
          text="Tu achètes des comptes robots ou des gens payés dans d'autres pays pour cliquer. Ces «followers» n'écouteront jamais ta musique. Ils ne viendront jamais à tes concerts. Ils ne partageront jamais ton contenu. Tu paies pour un mensonge — et ce mensonge sabote ta vraie croissance." />
      </ContentPage>

      <ContentPage chapter="Avertissement — La Fausse Croissance" accent={"#DC2626"} pageNum={193} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Conséquences Réelles Plateforme par Plateforme</SH2>
        <Body>Chaque plateforme a ses propres mécanismes de détection — et ses propres sanctions. Voici ce qui se passe réellement quand tu achètes de l'engagement artificiel.</Body>
        <InfoGrid color={"#DC2626"} cols={2} items={[
          {
            emoji: "📸",
            title: "Instagram — Le Shadow Ban",
            desc: "L'algorithme détecte l'afflux anormal d'abonnés. Il réduit drastiquement ta portée organique — sans te prévenir. Tes posts ne sont plus montrés même à tes vrais abonnés. Tu publie dans le vide sans le savoir.",
            badge: "Sanction silencieuse"
          },
          {
            emoji: "🎵",
            title: "TikTok — Mort algorithmique",
            desc: "TikTok mesure le taux de complétion et l'engagement réel. Des followers achetés ne regardent rien → signal négatif → l'algorithme arrête de pousser tes vidéos. Tu reviens à zéro, pire qu'avant.",
            badge: "Portée bloquée"
          },
          {
            emoji: "▶️",
            title: "YouTube — Suppression des vues",
            desc: "YouTube détecte et supprime les vues frauduleuses après vérification. Résultat : compteur qui baisse publiquement, avertissement sur le compte, et dans les cas graves : suspension ou suppression définitive de la chaîne.",
            badge: "Compte suspendu"
          },
          {
            emoji: "🎧",
            title: "Spotify — Bannissement et remboursement",
            desc: "Les streams achetés violent directement les conditions d'utilisation. Spotify bannit les artistes détectés. Les royalties déjà versées sont réclamées en remboursement. Des artistes ont perdu leurs comptes Spotify définitivement.",
            badge: "Compte supprimé"
          },
          {
            emoji: "🎯",
            title: "Les Marques — Taux d'engagement révélateur",
            desc: "Toute marque sérieuse vérifie le taux d'engagement avant de signer. 50 000 followers avec 50 likes par post = taux de 0.1% → red flag immédiat. L'outil SocialBlade ou HypeAuditor expose tout en 30 secondes.",
            badge: "Deal perdu"
          },
          {
            emoji: "🎪",
            title: "Les Festivals & Organisateurs",
            desc: "Ils regardent tes analytics réels. Nombre de vues locales, pays d'où viennent tes fans. Si tes «fans» viennent du Bangladesh alors que tu joues à Dakar, tu ne seras pas sélectionné. La supercherie est visible.",
            badge: "Candidature rejetée"
          },
        ]} />
        <Callout color={"#DC2626"} title="Le taux d'engagement — la métrique qui expose tout"
          text="Un compte sain a un taux d'engagement de 3% à 8% (likes + commentaires / followers). Un compte avec des followers achetés tombe souvent en dessous de 0.5%. N'importe quel professionnel qui veut travailler avec toi vérifiera ce chiffre. Il dira immédiatement : «Ces abonnés ne sont pas réels.» Et la conversation s'arrête là." />
      </ContentPage>

      <ContentPage chapter="Avertissement — Patience & Chacun son Temps" accent={GOLD} pageNum={194} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Patience : Chacun a sa Saison pour Éclore</SH2>
        <Body>Voici la vérité que l'impatience fait oublier : <strong>tous les grands artistes ont eu une période d'invisibilité.</strong> Pas de quelques semaines. De plusieurs années. Et ce n'est pas du temps perdu — c'est du temps de construction. Ce que tu construis dans l'ombre, tu le montres au grand jour.</Body>
        <BigQuote
          text="Ne te décourage pas parce que tu n'as pas encore éclos. Le bambou passe 4 ans sous terre avant d'exploser à 30 mètres en 6 semaines. Ces 4 ans ne sont pas du silence — c'est de l'enracinement."
          author="Métaphore du bambou — sagesse universelle"
          color={GOLD}
        />
        <SH3 color={GOLD}>Les saisons de croissance que personne ne montre</SH3>
        <MiniTable color={GOLD}
          headers={["Artiste", "Années d'invisibilité", "Ce qui se passait vraiment"]}
          rows={[
            ["Burna Boy", "7 ans (2010–2017)", "Il enregistrait, apprenait, construisait son identité artistique profonde"],
            ["Dena Mwana", "5 ans dans les chorales locales", "Elle perfectionnait sa voix, construisait sa foi, trouvait son message"],
            ["Wally Seck", "8 ans dans l'ombre de son père", "Il absorbait tout, développait sa propre voix artistique"],
            ["Moses Bliss", "4 ans de sorties inaperçues", "Il construisait sa base de fans fidèles une personne à la fois"],
            ["Lecrae", "5 ans de rejet de l'industrie", "Il construisait son label, son réseau, sa philosophie artistique"],
          ]}
        />
        <Divider color={GOLD} />
        <SH3 color={GOLD}>La différence entre attendre et construire dans l'ombre</SH3>
        <TwoCol
          left={
            <RedBox>
              <BoxLabel color="#DC2626" text="❌ Attendre passivement" />
              <BulletList color="#DC2626" items={[
                { text: "Publier rarement en espérant le miracle" },
                { text: "Se comparer quotidiennement aux autres" },
                { text: "Acheter des followers pour «compenser»" },
                { text: "Changer de style à chaque tendance" },
                { text: "Douter de soi et parfois arrêter" },
              ]} />
            </RedBox>
          }
          right={
            <GreenBox>
              <BoxLabel color="#16A34A" text="✅ Construire dans l'ombre" />
              <BulletList color={GRN} items={[
                { text: "Publier chaque jour, même sans audience" },
                { text: "Améliorer sa technique et son identité" },
                { text: "Construire ses 100 premiers vrais fans" },
                { text: "Rester cohérent avec son positionnement" },
                { text: "Faire confiance au processus et à Dieu" },
              ]} />
            </GreenBox>
          }
        />
        <Callout color={GOLD} title="Chacun a son temps — ne vole pas le tien avec l'impatience"
          text="La graine ne peut pas décider du jour où elle deviendra arbre. Mais elle peut décider chaque jour de s'enraciner profondément. Ton rôle n'est pas de contrôler quand tu perceras. Ton rôle est de t'assurer que quand ce moment viendra, tu seras prêt — artistiquement, stratégiquement, et spirituellement. Ce livre t'y prépare. Le reste appartient à Dieu et au temps." />
        <Banner text="Bosser dur. Être patient. Rester vrai. Compter sur Dieu." sub="Cette formule ne garantit pas une date. Elle garantit un résultat." color={GOLD} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ÉPILOGUE — LA QUESTION PHARE (P195–P199)                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}

      {/* Page sombre d'ouverture de l'épilogue */}
      <div className="ebook-page" style={{
        width: "210mm", minHeight: "297mm",
        background: "linear-gradient(160deg, #08060F 0%, #1A0A2E 50%, #0D0C0A 100%)",
        display: "flex", flexDirection: "column", pageBreakAfter: "always",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.08)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.05)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(200,168,75,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: GOLD, letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 20px" }}>ÉPILOGUE</p>
          <h2 style={{ fontFamily: FD, fontSize: "52px", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.05 }}>
            La Question<br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>que personne<br />ne te pose</em>
          </h2>
          <div style={{ width: "48px", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "20px 0" }} />
          <p style={{ fontFamily: F, fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "380px", margin: 0 }}>
            Tu as maintenant tous les outils. Mais avant de fermer ce livre — il reste une conversation que nous devons avoir.
          </p>
        </div>
        <div style={{ padding: "14px 48px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.2)", margin: 0 }}>KEKELI Creative Agency — {LABEL}</p>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.2)", margin: 0 }}>195 / {TOTAL}</p>
        </div>
      </div>

      <ContentPage chapter="Épilogue — La Question Phare" accent={GOLD} pageNum={196} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>À quel Prix veux-tu le Sommet ?</SH2>
        <Body>Ce livre t'a tout appris sur comment monter. La stratégie, les outils, les plateformes, les contrats, les équipes. Mais il reste une question que très peu de guides osent poser — et pourtant, c'est la plus importante de toutes.</Body>
        <BigQuote
          text="Es-tu prêt à monter au sommet en restant qui tu es vraiment — ou es-tu prêt à devenir quelqu'un d'autre pour y arriver ?"
          author="La question que chaque artiste doit se poser avant de commencer"
          color={GOLD}
        />
        <Body>Il faut être honnête. Dans l'industrie musicale — africaine comme mondiale — il existe des chemins sombres. Des artistes qui ont sacrifié leur intégrité pour un contrat. Des deals qui ne se signent pas sur papier. Des compromis qui semblent anodins au départ et qui détruisent tout ensuite. Des succès qui arrivent vite, brillent fort, et disparaissent encore plus vite — laissant derrière eux une vie brisée.</Body>
        <TwoCol
          left={
            <RedBox>
              <BoxLabel color="#DC2626" text="❌ Le sommet sans fondation" />
              <BulletList color="#DC2626" items={[
                { text: "Arrivé vite, parti encore plus vite" },
                { text: "Construit sur des compromis qui rongent" },
                { text: "Une célébrité qui coûte la paix intérieure" },
                { text: "Un succès que tu ne peux pas partager avec Dieu" },
                { text: "Une carrière qui finit dans le vide ou la honte" },
                { text: "Ce que les autres voient ne correspond pas à ce que tu vis" },
              ]} />
            </RedBox>
          }
          right={
            <GreenBox>
              <BoxLabel color="#16A34A" text="✅ Le sommet avec fondation" />
              <BulletList color={GRN} items={[
                { text: "Construit lentement, mais solidement" },
                { text: "Chaque succès est un témoignage vivant" },
                { text: "La paix intérieure est réelle, pas jouée" },
                { text: "Tu peux remercier Dieu pour chaque étape" },
                { text: "Durable — 10 ans, 20 ans, une vie entière" },
                { text: "Ce que les autres voient correspond à qui tu es vraiment" },
              ]} />
            </GreenBox>
          }
        />
        <Callout color={GOLD} title="Ce livre ne conseille ni ne tolère les chemins sombres"
          text="Ce guide a été conçu pour t'équiper avec les vrais outils du professionnel — le travail, la discipline, la stratégie, la foi. Il n'existe aucun raccourci qui vaille le prix de ton intégrité. Aucun contrat ne vaut la perte de ta paix. Aucun hit ne vaut la destruction de qui tu es." />
      </ContentPage>

      <ContentPage chapter="Épilogue — Le Travail et la Grâce" accent={GOLD} pageNum={197} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Travail ET la Grâce : les deux pilliers du vrai succès</SH2>
        <Body>Il y a une erreur que font beaucoup de croyants dans leur approche de la carrière musicale. Certains disent : <em>«Je vais travailler dur et Dieu fera le reste.»</em> D'autres disent : <em>«Je vais prier et Dieu ouvrira les portes.»</em> Les deux ont tort — parce que les deux ont raison, mais séparément.</Body>
        <Banner text="Le vrai succès est à l'intersection du travail humain et de la grâce divine." sub="L'un sans l'autre ne suffit pas. Les deux ensemble sont imbattables." color={GOLD} dark />
        <SH3 color={GOLD}>Ce que Dieu ne fera pas à ta place</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Dieu ne publiera pas tes TikToks :", text: "La discipline de créer chaque jour est ta responsabilité. La persévérance t'appartient." },
          { bold: "Dieu ne signera pas tes contrats à ta place :", text: "Comprendre tes droits, négocier intelligemment, refuser les mauvais accords — c'est ton travail." },
          { bold: "Dieu ne construira pas ton audience à ta place :", text: "Répondre à tes fans, être constant, construire une communauté — c'est l'œuvre de tes mains." },
          { bold: "Dieu ne protégera pas ta voix si tu ne la soignes pas :", text: "L'hydratation, le repos, l'échauffement — ta santé est ton instrument, ta responsabilité." },
        ]} />
        <SH3 color={GOLD}>Ce que toi tu ne peux pas faire sans Dieu</SH3>
        <BulletList color={GRN} items={[
          { bold: "La grâce d'être au bon endroit au bon moment :", text: "Certaines portes ne s'ouvrent pas par stratégie — elles s'ouvrent par grâce divine." },
          { bold: "La créativité qui touche les cœurs :", text: "L'inspiration qui change une vie ne vient pas d'un algorithme — elle vient d'En Haut." },
          { bold: "La force de continuer quand tout dit d'arrêter :", text: "La résilience qui dépasse l'humain a une source surnaturelle." },
          { bold: "L'ouverture des portes fermées :", text: "Les connexions providentielles, les opportunités inexplicables — ce n'est pas la chance. C'est la grâce." },
          { bold: "La durabilité et la protection :", text: "Ce que Dieu bâtit, personne ne peut le démolir. Ce que l'homme seul construit peut s'effondrer en une nuit." },
        ]} />
        <Callout color={GOLD} title="La formule du vrai artiste pro"
          text="Travaille comme si tout dépendait de toi. Prie comme si tout dépendait de Dieu. Les deux en même temps, toujours. Cette formule a fait les Youssou N'Dour, les Kirk Franklin, les Nathaniel Bassey de ce monde. Elle peut te faire aussi." />
      </ContentPage>

      <ContentPage chapter="Épilogue — Monter et Rester" accent={GOLD} pageNum={198} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Monter au Sommet, c'est bien. Y Rester, c'est Dieu.</SH2>
        <Body>C'est vrai — beaucoup arrivent au sommet. Moins nombreux sont ceux qui y restent. Et encore moins nombreux sont ceux qui y restent en étant toujours eux-mêmes, toujours en paix, toujours dans l'intégrité. La différence entre ceux qui durent et ceux qui disparaissent n'est presque jamais une question de talent ou de stratégie. C'est une question de fondation.</Body>
        <VerticalTimeline color={GOLD} events={[
          {
            year: "Le démarrage",
            title: "Tout le monde commence avec de l'énergie",
            desc: "La motivation est haute, les rêves sont grands, la foi est fraîche. Tout artiste commence avec de l'enthousiasme. C'est facile au départ.",
          },
          {
            year: "Les épreuves",
            title: "C'est là que les chemins divergent",
            desc: "Les refus, les sillences, les doutes, les comparaisons, les tentations. Certains cherchent des raccourcis à n'importe quel prix. D'autres s'accrochent à leur intégrité et à leur foi.",
          },
          {
            year: "Le premier succès",
            title: "La première vraie épreuve de caractère",
            desc: "Le succès révèle qui tu es vraiment plus que l'échec. C'est là que certains changent d'arrogance, que d'autres oublient Dieu, que beaucoup gaspillent en une saison ce qui a pris des années.",
          },
          {
            year: "Le sommet",
            title: "Deux types d'artistes arrivent ici",
            desc: "Ceux qui ont construit sur du sable — leur sommet est fragile, temporaire, épuisant. Et ceux qui ont construit sur la roche — leur sommet est stable, béni et transmissible.",
          },
          {
            year: "L'héritage",
            title: "Seul subsiste ce qui avait une vraie fondation",
            desc: "Dans 20 ans, on ne parlera que des artistes qui avaient quelque chose de réel à dire et qui l'ont dit avec intégrité. Youssou N'Dour, CeCe Winans, Kirk Franklin — tous des bâtisseurs sur la roche.",
          },
        ]} />
        <Callout color={GOLD} title="La vérité que ce livre veut graver en toi"
          text="Un succès qui ne vient pas de Dieu n'est pas un succès — c'est un emprunt que tu devras rembourser. Mais une carrière bâtie dans le travail, la discipline, l'intégrité et la foi est une carrière que ni les hommes, ni le temps, ni les algorithmes ne peuvent effacer." />
      </ContentPage>

      <ContentPage chapter="Épilogue — La Question Finale" accent={GOLD} pageNum={199} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>La Question que je te pose en fermant ce livre</SH2>
        <Body>Tu as lu ces pages. Tu as appris les stratégies, les outils, les méthodes. Tu connais maintenant ce que font les artistes pros, ce qu'ils évitent, comment ils pensent, comment ils construisent.</Body>
        <Body>Mais avant de refermer ce livre et de commencer à appliquer — je veux que tu t'arrêtes quelques minutes. Et que tu te poses, honnêtement, la question que peu d'artistes osent se poser :</Body>
        <div style={{ margin: "12px 0", padding: "20px 22px", borderRadius: "14px", background: `linear-gradient(135deg, ${GOLD}12, ${GOLD}06)`, border: `2px solid ${GOLD}35`, textAlign: "center" }}>
          <p style={{ fontFamily: FD, fontSize: "19px", fontStyle: "italic", color: DARK, lineHeight: 1.65, margin: 0 }}>
            «Si Dieu ne bénissait pas ma carrière,<br />
            est-ce que je continuerais à faire de la musique<br />
            de la même façon, avec la même intégrité ?»
          </p>
        </div>
        <Body>Si ta réponse est oui — tu es prêt pour le vrai sommet. Si ta réponse hésite — ce livre a encore quelque chose à te dire. Relis la section Fondations.</Body>
        <Divider color={GOLD} />
        <SH3 color={GOLD}>Ce que ce livre t'encourage à faire</SH3>
        <NumberedList color={GOLD} items={[
          "TRAVAILLER DUR — pas parce que le succès est garanti, mais parce que ton talent mérite d'être développé à sa pleine mesure.",
          "ÊTRE DISCIPLINÉ — les habitudes quotidiennes que tu as apprises ne sont pas une option. Elles sont le chemin.",
          "AGIR AVEC INTÉGRITÉ — chaque décision que tu prends, même quand personne ne regarde, construit ou détruit ta fondation.",
          "COMPTER SUR DIEU — après avoir tout fait de ton côté, lever les mains et confier le résultat à Celui qui ouvre les portes que personne ne peut fermer.",
          "RESTER TOI-MÊME AU SOMMET — la plus grande victoire n'est pas d'y arriver. C'est d'y arriver en étant encore toi.",
        ]} />
        <Testimony
          text="Ce livre n'est pas un raccourci vers le succès. C'est une invitation à construire quelque chose de réel — quelque chose que Dieu peut bénir, que les hommes peuvent respecter, et que le temps ne peut pas effacer. Si tu travailles dur et tu comptes sur Dieu, tu n'as pas besoin de vendre ton âme pour arriver au sommet. Tu as besoin de ce livre, de ta discipline, et de Sa grâce."
          author="Amset"
          role="Artiste Gospel Pro · Fondateur du Galsen Gospel Urbain · Promoteur du Sunu Impact Festival · Dakar, Sénégal"
          color={GOLD}
        />
        <div style={{ margin: "10px 0", padding: "14px 16px", borderRadius: "10px", background: `linear-gradient(135deg, ${GOLD}15, ${GOLD}08)`, border: `1px solid ${GOLD}30`, textAlign: "center" }}>
          <p style={{ fontFamily: FD, fontSize: "16px", color: DARK, lineHeight: 1.6, margin: "0 0 6px" }}>
            Du Talent au Sommet —<br />
            <em style={{ color: GOLD }}>avec le travail de tes mains et la grâce de Dieu.</em>
          </p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#78716C", margin: 0 }}>
            KEKELI Creative Agency · Dakar, Sénégal · 2026
          </p>
        </div>
      </ContentPage>

      {/* ══════════════════════════════════════════════════ */}
      {/* BIBLIOGRAPHIE & SOURCES                           */}
      {/* ══════════════════════════════════════════════════ */}
      <ContentPage chapter="Bibliographie & Sources" accent={GOLD} pageNum={173} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Bibliographie & Sources</SH2>
        <Body>Les informations, statistiques et stratégies présentées dans ce guide sont issues de recherches, d'expériences de terrain, de sources publiques et des ouvrages suivants. Pour aller plus loin, ces ressources sont recommandées.</Body>

        <SH3 color={GOLD}>Ouvrages de référence</SH3>
        <BulletList color={GOLD} items={[
{ bold: "James Clear (2018) —", text: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones. Penguin Random House." },
          { bold: "Donald Miller (2017) —", text: "Building a StoryBrand. HarperCollins Leadership." },
          { bold: "Russell Brunson (2015) —", text: "DotCom Secrets. Morgan James Publishing." },
          { bold: "Allan Dib (2016) —", text: "The 1-Page Marketing Plan. Successwise." },
        ]} />

        <Divider color={GOLD} />
        <SH3 color={GOLD}>Sources en ligne & Documentation officielle</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Spotify for Artists —", text: "artists.spotify.com — Documentation officielle, outils analytics, guide pitch éditorial" },
          { bold: "YouTube for Artists —", text: "artists.youtube.com — Conditions monétisation YPP, YouTube Studio, guide créateurs" },
          { bold: "TikTok Creator Center —", text: "creators.tiktok.com — Politique d'utilisation, Creator Fund, analytics" },
          { bold: "Meta Business Suite —", text: "business.facebook.com — Guides publicité Facebook & Instagram, Meta Ads" },
          { bold: "DistroKid Help Center —", text: "support.distrokid.com — Documentation distribution, ISRC, paiements" },
          { bold: "BSDA Sénégal —", text: "bsda.sn — Bureau Sénégalais du Droit d'Auteur, procédures d'inscription" },
        ]} />

        <Divider color={GOLD} />
        <SH3 color={GOLD}>Études & Statistiques</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Help Musicians (2019) —", text: "Can Music Make You Sick? Study on mental health in the music industry (73% anxiety/depression)." },
          { bold: "IFPI Global Music Report (2025) —", text: "Données mondiales sur le streaming musical et les marchés africains." },
          { bold: "Pew Research Center —", text: "Christianity in Sub-Saharan Africa — données sur la population chrétienne africaine." },
          { bold: "Boomplay Media —", text: "Données d'utilisation Boomplay en Afrique de l'Ouest (100M+ utilisateurs)." },
          { bold: "ARTP Sénégal —", text: "Rapport annuel sur la pénétration internet et mobile au Sénégal." },
        ]} />

      </ContentPage>

      <ContentPage chapter="Index & Contacts utiles" accent={ACC} pageNum={175} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Contacts et ressources utiles au Sénégal</SH2>
        <MiniTable color={ACC}
          headers={["Ressource", "Pour quoi", "Contact / Accès"]}
          rows={[
            ["BSDA", "Inscription droits d'auteur, royalties", "Avenue Roume, Dakar — bsda.sn"],
            ["DistroKid", "Distribution musicale mondiale", "distrokid.com"],
            ["Boomplay for Artists", "Distribution & analytics Afrique", "boomplaymusic.com/artist"],
            ["Spotify for Artists", "Gestion profil & analytics", "artists.spotify.com"],
            ["YouTube Studio", "Analytics & monétisation", "studio.youtube.com"],
            ["Payoneer", "Recevoir royalties internationales", "payoneer.com"],
            ["Canva Pro", "Création visuels professionnels", "canva.com"],
            ["CapCut", "Montage vidéo TikTok/Reels", "Application mobile gratuite"],
            ["SubmitHub", "Pitching playlists & blogs", "submithub.com"],
            ["Metricool", "Gestion multi-réseaux sociaux", "metricool.com"],
            ["Linktree", "Page de liens centrale", "linktr.ee"],
            ["KEKELI Creative Agency", "Branding, clips, stratégie digitale, outils IA", "kekelicreativeagency@gmail.com"],
            ["KEKELI WhatsApp", "Contact direct — réponse sous 24h", "+221 78 167 28 19"],
            ["KEKELI Instagram", "Contenus, inspirations, actualités", "@kekeli_agency"],
            ["KEKELI YouTube", "Tutoriels, cases études, guides", "@kekelicreativeagency"],
          ]}
        />
        <Divider color={ACC} />
        <SH3 color={ACC}>Radios sénégalaises à cibler pour la promotion</SH3>
        <BulletList color={ACC} items={[
          { bold: "DFM (Dakar FM) :", text: "Radio la plus écoutée au Sénégal — contact via réseaux sociaux ou email direct" },
          { bold: "RFM :", text: "Radio Future Médias — forte audience 20-40 ans, bonne couverture gospel et afrobeats" },
          { bold: "ZIK FM :", text: "Référence du mbalax moderne et de l'afrobeats sénégalais" },
          { bold: "RTS Radio :", text: "Radio nationale — crédibilité institutionnelle, fort auprès de la diaspora" },
          { bold: "Walf FM :", text: "Forte audience diaspora et jeune public urbain dakarois" },
          { bold: "Pulse FM :", text: "Orientation urbaine et internationale, cible 18-30 ans" },
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 42 — FISCALITÉ & FINANCES DE L'ARTISTE (P213–P217)           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={42} title="PRO 42 — Fiscalité & Finances de l'Artiste au Sénégal" accent={GRN} pageNum={213} total={TOTAL} guideLabel={LABEL}
        hook="L'argent arrive, mais sans structure il repart aussi vite qu'il est venu. Comprendre la fiscalité et la gestion financière d'un artiste au Sénégal n'est pas optionnel — c'est la différence entre construire une carrière durable et courir perpétuellement après ses propres gains." />

      <ContentPage chapter="PRO 42 — Fiscalité & Finances" accent={GRN} pageNum={214} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Quel Statut Juridique pour un Artiste au Sénégal ?</SH2>
        <Body>La loi sénégalaise reconnaît plusieurs statuts pour exercer une activité artistique. Choisir le bon statut détermine comment tu paies tes impôts, si tu es protégé par la sécurité sociale, et comment tu peux signer des contrats officiels.</Body>
        <MiniTable color={GRN}
          headers={["Statut", "Pour qui", "Avantages", "Inconvénients"]}
          rows={[
            ["Artiste-interprète salarié (CDD d'usage)", "Concerts, événements, spectacles", "Accès IPRES + CSS, droits chômage, fiche de paie officielle", "Dépend de l'employeur (organisateur, label)"],
            ["Auto-entrepreneur / Professionnel libéral", "Artiste solo indépendant", "Liberté totale, simple à déclarer, peu de charges", "Protection sociale limitée, tout repose sur toi"],
            ["SARL ou SAS artiste", "Artiste avec équipe, label, plusieurs projets", "Crédibilité, séparation patrimoine, optimisation fiscale", "Coût de création, comptable obligatoire"],
            ["Association loi 1901 (ou sénégalaise)", "Collectifs, groupes, projets culturels subventionnés", "Accès aux subventions publiques et privées", "Gestion collective, pas de bénéfices personnels directs"],
          ]}
        />
        <Callout color={GRN} title="Le CDD d'usage artistique : ton meilleur allié pour les événements"
          text="Chaque fois qu'un organisateur te paie pour un concert, il peut établir un CDD d'usage. Ce contrat te donne droit à une fiche de paie, aux cotisations retraite (IPRES) et à la couverture maladie (CSS). Exige ce contrat systématiquement — c'est ton droit légal au Sénégal." />
        <SH3 color={GRN}>Les documents à avoir impérativement</SH3>
        <BulletList color={GRN} items={[
          { bold: "NINEA (Numéro d'Identification National des Entreprises et Associations) :", text: "Obtenu gratuitement auprès de la DGID. Obligatoire pour toute activité commerciale ou culturelle professionnelle." },
          { bold: "Registre du Commerce (RC) :", text: "Si tu as une SARL ou SAS. Coût : environ 30 000 à 50 000 FCFA selon la structure." },
          { bold: "Enregistrement BSDA :", text: "Bureau Sénégalais du Droit d'Auteur — indispensable pour percevoir tes droits d'auteur et droits voisins." },
          { bold: "Compte bancaire professionnel :", text: "Sépare TOUJOURS tes revenus artistiques de tes dépenses personnelles. UBA, SGBS, CBAO ou Wave Business sont adaptés." },
        ]} />
        <Banner text="NINEA + BSDA + compte pro = base minimale de tout artiste professionnel sénégalais." sub="Ces trois documents te donnent une existence légale, te protègent contre les arnaques contractuelles et ouvrent les portes des institutions." color={GRN} dark />
      </ContentPage>

      <ContentPage chapter="PRO 42 — Fiscalité & Finances" accent={GRN} pageNum={215} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comprendre et Déclarer ses Revenus d'Artiste</SH2>
        <Body>En tant qu'artiste indépendant au Sénégal, tes revenus sont considérés comme des <strong>Bénéfices Non Commerciaux (BNC)</strong>. La Direction Générale des Impôts et des Domaines (DGID) attend une déclaration annuelle. Voici comment t'y prendre sans stress.</Body>
        <SH3 color={GRN}>Les principaux types de revenus artistiques à déclarer</SH3>
        <MiniTable color={GRN}
          headers={["Type de revenu", "Exemples concrets", "Comment déclarer"]}
          rows={[
            ["Cachets de spectacle", "Concert, événement, wedding", "Via CDD d'usage ou déclaration BNC"],
            ["Droits d'auteur / droits voisins", "Streams, diffusions radio/TV, reprises", "Via BSDA — déclaration annuelle"],
            ["Ventes musicales directes", "Albums physiques, Bandcamp, shows privés", "BNC — à inclure dans la déclaration annuelle"],
            ["Revenus sponsoring / partenariats", "Posts payants Instagram, collaborations marques", "BNC — facture obligatoire"],
            ["Revenus YouTube / plateformes", "AdSense, Content ID, Boomplay", "BNC — via relevés de compte"],
          ]}
        />
        <SH3 color={GRN}>Les cotisations sociales de l'artiste au Sénégal</SH3>
        <TwoCol
          left={<GreenBox>
            <BoxLabel color="#16A34A" text="IPRES — Retraite" />
            <Body>Institution de Prévoyance Retraite du Sénégal. Si tu travailles sous CDD d'usage, l'organisateur cotise pour toi. En indépendant, tu peux adhérer volontairement. Cotisation : environ 8,4% du salaire de référence. C'est ton futur — ne l'ignore pas.</Body>
          </GreenBox>}
          right={<GreenBox>
            <BoxLabel color="#16A34A" text="CSS — Maladie" />
            <Body>Caisse de Sécurité Sociale. Elle couvre les accidents du travail, les maladies professionnelles et la famille. Adhésion obligatoire pour les salariés, volontaire pour les indépendants. Renseignes-toi auprès du bureau CSS de ton quartier.</Body>
          </GreenBox>}
        />
        <Callout color={AMB} title="Calendrier fiscal simplifié de l'artiste indépendant"
          text="Janvier-Mars : Rassemble tous tes justificatifs de revenus de l'année précédente (relevés bancaires, contrats, factures). Avant fin Mars : Dépose ta déclaration BNC à la DGID (direction des impôts de ton secteur). Courant de l'année : Garde une trace de TOUTES tes dépenses professionnelles (matériel studio, déplacements, promotion) — elles sont déductibles." />
        <SH3 color={GRN}>Les dépenses professionnelles déductibles</SH3>
        <BulletList color={GRN} items={[
          { bold: "Équipement professionnel :", text: "Micro, interface audio, instruments, ordinateur dédié à la musique." },
          { bold: "Promotion et marketing :", text: "Création de visuels, publicités Facebook/Instagram, impression d'affiches." },
          { bold: "Déplacements professionnels :", text: "Transport pour concerts, studios, réunions avec partenaires." },
          { bold: "Formations et livres :", text: "Tout investissement dans ton développement artistique." },
          { bold: "Abonnements pro :", text: "DistroKid, Adobe Creative Cloud, logiciels de production musicale." },
        ]} />
      </ContentPage>

      <ContentPage chapter="PRO 42 — Fiscalité & Finances" accent={GRN} pageNum={216} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Gestion Financière Pratique : La Règle des 3 Comptes</SH2>
        <Body>Les revenus d'un artiste sont irréguliers par nature — un mois 500 000 FCFA, le suivant 50 000. Sans système de gestion, cette irrégularité crée une illusion de richesse suivie de crises de liquidité. La règle des 3 comptes résout ce problème.</Body>
        <ProcessLine color={GRN} steps={[
          { num: "1", title: "Compte OPÉRATIONNEL", desc: "Tous tes revenus arrivent ici. Tu paies tes dépenses du quotidien depuis ce compte. Maximum 60% de tes revenus mensuels." },
          { num: "2", title: "Compte ÉPARGNE", desc: "Minimum 20% de chaque revenu, dès réception — AVANT de dépenser quoi que ce soit. Fonds d'urgence (3 mois de charges fixes minimum)." },
          { num: "3", title: "Compte INVESTISSEMENT", desc: "Minimum 20% pour réinvestir dans ta carrière : équipement, clips, promotion, formations. C'est le carburant de ta croissance." },
        ]} />
        <SH3 color={GRN}>Budgétiser ses revenus artistiques irréguliers</SH3>
        <Callout color={GRN} title="La méthode du 'salaire fixe fictif'"
          text="Calcule la moyenne de tes 3 derniers mois de revenus. C'est ton 'salaire fictif' mensuel. En mois fort, tu mets le surplus directement en épargne. En mois creux, tu utilises ce que tu as épargné. Résultat : tu vis sur une base stable même si tes revenus fluctuent énormément." />
        <SH3 color={GRN}>Budget type d'un artiste émergent à Dakar (mois moyen)</SH3>
        <MiniTable color={GRN}
          headers={["Poste", "% recommandé", "Exemple 300 000 FCFA/mois"]}
          rows={[
            ["Logement + charges fixes", "30%", "90 000 FCFA"],
            ["Alimentation + transport", "20%", "60 000 FCFA"],
            ["Épargne d'urgence", "15%", "45 000 FCFA"],
            ["Investissement carrière (studio, promo, équip.)", "20%", "60 000 FCFA"],
            ["Cotisations sociales (IPRES/CSS si possible)", "5%", "15 000 FCFA"],
            ["Divertissement, personnel", "10%", "30 000 FCFA"],
          ]}
        />
        <SH3 color={GRN}>Les erreurs financières qui tuent les carrières artistiques</SH3>
        <TwoCol
          left={<RedBox>
            <BoxLabel color="#DC2626" text="❌ Erreurs fréquentes" />
            <BulletList color="#DC2626" items={[
              { text: "Dépenser 100% d'un gros cachet immédiatement" },
              { text: "Mélanger argent personnel et revenus artiste" },
              { text: "Ne garder aucune trace écrite des transactions" },
              { text: "Prêter de l'argent à la famille avant de se payer" },
              { text: "Investir dans le luxe avant d'investir dans la carrière" },
            ]} />
          </RedBox>}
          right={<GreenBox>
            <BoxLabel color="#16A34A" text="✅ Bons réflexes" />
            <BulletList color={GRN} items={[
              { text: "Garder une feuille Excel simple de tous tes revenus et dépenses" },
              { text: "Facturer systématiquement chaque prestation" },
              { text: "Prévoir 3 mois de charges avant chaque projet" },
              { text: "Négocier tes cachets à la hausse chaque année" },
              { text: "Épargner d'abord, dépenser ensuite" },
            ]} />
          </GreenBox>}
        />
      </ContentPage>

      <ContentPage chapter="PRO 42 — Fiscalité & Finances" accent={GRN} pageNum={217} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Financements, Aides & Outils Disponibles pour l'Artiste Sénégalais</SH2>
        <Body>De nombreuses structures de financement existent au Sénégal et dans la sous-région pour soutenir les artistes et créateurs. La plupart des artistes ne les connaissent pas — tu as un avantage si tu t'en empares.</Body>
        <MiniTable color={GRN}
          headers={["Structure", "Type d'aide", "Comment accéder"]}
          rows={[
            ["DER/FJ (Délégation Générale à l'Entrepreneuriat Rapide)", "Financement projets entrepreneurs créatifs (jusqu'à 5 M FCFA)", "der.sn — dossier en ligne ou agences régionales"],
            ["FONSIS (Fonds Souverain d'Investissements Stratégiques)", "Investissements secteurs stratégiques dont culture", "Contact via fonsis.sn — projets structurants"],
            ["FONGIP (Fonds de Garantie des Investissements)", "Garantie bancaire pour prêts professionnels artistes", "fongip.sn — facilite l'accès au crédit bancaire"],
            ["Fonds de développement culturel (Ministère Culture)", "Subventions projets culturels, albums, spectacles", "Dossier auprès du Ministère de la Culture de Dakar"],
            ["Institut Français du Sénégal", "Coproductions, résidences artistiques, tournées France", "institutfrancais-senegal.com — appels à projets réguliers"],
            ["Union Européenne / ACP-UE", "Fonds Afrique Créative — projets culturels régionaux", "afrique-creative.eu — appels à projets annuels"],
          ]}
        />
        <SH3 color={GRN}>Outils de gestion financière simples pour artiste</SH3>
        <BulletList color={GRN} items={[
          { bold: "Excel / Google Sheets :", text: "Crée un tableau avec Date | Source de revenu | Montant | Catégorie dépense | Solde. Simple, gratuit, suffisant pour commencer." },
          { bold: "Wave (application mobile) :", text: "Paiements mobile money, suivi des entrées/sorties, factures PDF. Idéal pour le marché sénégalais." },
          { bold: "Orange Money Business :", text: "Recevoir des paiements professionnels, historique des transactions, compatible avec la facturation." },
          { bold: "Indy (pour les français de la diaspora) :", text: "Application de comptabilité auto-entrepreneur, synchronisation bancaire automatique." },
          { bold: "Debitoor / Facture.net :", text: "Génération de factures professionnelles gratuites en ligne — ne jamais prester sans facture." },
        ]} />
        <Callout color={GOLD} title="Conseil d'or : un comptable peut te faire économiser plus qu'il ne coûte"
          text="À partir de 500 000 FCFA/mois de revenus réguliers, l'investissement dans un comptable (30 000 à 60 000 FCFA/mois) devient rentable. Il optimise ta déclaration, te signale les aides disponibles, et te libère du temps pour créer. KEKELI peut t'orienter vers des comptables partenaires spécialisés en artistes." />
        <Divider color={GRN} />
        <Banner text="Ta carrière est une entreprise. Gère-la comme telle." sub="Les artistes qui durent 10 ans ne sont pas forcément les plus talentueux — ce sont ceux qui ont appris à gérer l'argent intelligemment." color={GRN} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 43 — GESTION DE CRISE & BAD BUZZ (P218–P221)                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={43} title="PRO 43 — Gestion de Crise & Bad Buzz" accent={"#DC2626"} pageNum={218} total={TOTAL} guideLabel={LABEL}
        hook="Un bad buzz peut surgir en quelques heures et effacer des années de travail. Mais une crise bien gérée peut aussi révéler ton caractère, renforcer ta communauté et te sortir plus fort qu'avant. La différence ? Un protocole clair, une tête froide, et les bonnes paroles au bon moment." />

      <ContentPage chapter="PRO 43 — Gestion de Crise & Bad Buzz" accent={"#DC2626"} pageNum={219} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Comprendre les Types de Crises qui Touchent les Artistes</SH2>
        <Body>Toutes les crises ne se gèrent pas de la même façon. Avant de réagir, identifie précisément à quel type de situation tu fais face — une mauvaise lecture de la situation est souvent plus catastrophique que la crise elle-même.</Body>
        <MiniTable color={"#DC2626"}
          headers={["Type de crise", "Exemples", "Niveau de gravité", "Réponse initiale"]}
          rows={[
            ["Malentendu / Interprétation erronée", "Paroles mal comprises, sortie de contexte, montage vidéo", "Moyen", "Clarification rapide avec preuve"],
            ["Erreur personnelle avérée", "Propos blessants, comportement inapproprié en public", "Élevé", "Reconnaissance + excuses sincères"],
            ["Scandale privé rendu public", "Conflit relationnel, photo/vidéo privée divulguée", "Très élevé", "Silence temporaire + gestion légale"],
            ["Attaque coordonnée (cancel culture)", "Campagne organisée de dénigrement, faux profils", "Variable", "Pas de réponse directe — attendre"],
            ["Problème contractuel / financier", "Cachet impayé, contrat rompu, dette artistique", "Moyen-Élevé", "Voie légale discrète avant communication"],
            ["Crise de santé / absence imprévue", "Annulation de concert, hospitalisation, burn-out", "Faible-Moyen", "Annonce officielle honnête et rapide"],
          ]}
        />
        <SH3 color={"#DC2626"}>La Règle des 24h — Ne Jamais Réagir à Chaud</SH3>
        <Callout color={"#DC2626"} title="Les premières 24h sont déterminantes"
          text="Quand une crise éclate, le réflexe est de répondre immédiatement. C'est presque toujours une erreur. Les premières 24h servent à observer, mesurer l'ampleur, rassembler les faits — pas à répondre. Une réponse précipitée, émotionnelle ou imprécise empire systématiquement la situation. Prends le temps de respirer avant de parler." />
        <ProcessLine color={"#DC2626"} steps={[
          { num: "H+0", title: "Observer sans réagir", desc: "Lis tout, note les sources, identifie les principaux relayeurs. Ne commente pas, ne like pas, ne partage pas encore." },
          { num: "H+2", title: "Évaluer l'ampleur réelle", desc: "Est-ce viral ou limité ? Qui en parle vraiment ? Des célébrités ? Des journalistes ? Ou seulement quelques comptes ?" },
          { num: "H+6", title: "Rassembler les preuves", desc: "Screenshot tout. Collecte les faits en ta faveur. Contacte ton manager / avocat si nécessaire." },
          { num: "H+12 à H+24", title: "Rédiger la réponse", desc: "Maintenant seulement, rédige une réponse posée, factuelle, sans attaque. Fais-la relire avant de publier." },
        ]} />
        <SH3 color={"#DC2626"}>Ce qu'il ne faut JAMAIS faire dans les premières heures</SH3>
        <BulletList color={"#DC2626"} items={[
          { bold: "Bloquer en masse :", text: "Ça amplifie la crise et donne l'impression que tu as quelque chose à cacher." },
          { bold: "Insulter ou attaquer les critiques :", text: "Même si c'est injuste. Tu perds le statut de victime et tu deviens l'agresseur." },
          { bold: "Publier des stories Instagram énervé :", text: "Les captures d'écran durent éternellement. Tout peut être retourné contre toi." },
          { bold: "Supprimer des publications sans explication :", text: "La suppression silencieuse est perçue comme un aveu. Si tu supprimes, explique pourquoi." },
          { bold: "Ignorer complètement une crise grave :", text: "Le silence sur une accusation sérieuse est interprété comme une confirmation tacite." },
        ]} />
      </ContentPage>

      <ContentPage chapter="PRO 43 — Gestion de Crise & Bad Buzz" accent={"#DC2626"} pageNum={220} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Protocole de Réponse par Type de Crise</SH2>
        <Body>Voici les scripts de communication éprouvés pour chaque type de crise. Adapte le ton à ta personnalité, mais respecte la structure — elle est conçue pour désamorcer sans amplifier.</Body>
        <SH3 color={"#DC2626"}>Script 1 — Malentendu / Propos sortis de contexte</SH3>
        <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA", margin: "6px 0" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "10px", color: "#1C1917", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
            "Je vois circuler [description neutre de la situation]. Je tiens à mettre les choses au clair : [contextualisation factuelle]. Ce que j'ai dit / fait réellement, c'est [clarification avec preuve si possible]. Je comprends que certains aient pu se sentir [émotion], et c'est important pour moi d'être compris correctement. [Preuve ou contexte additionnel si disponible]."
          </p>
        </div>
        <SH3 color={"#DC2626"}>Script 2 — Erreur personnelle reconnue</SH3>
        <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA", margin: "6px 0" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "10px", color: "#1C1917", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
            "J'ai pris le temps de réfléchir avant de vous parler. Ce que j'ai [dit/fait] était [tort/inapproprié/blessant] et je l'assume pleinement. Je m'en excuse sincèrement, en particulier envers [personnes concernées]. Ce n'est pas qui je veux être. Je prends [action concrète] pour que cela ne se reproduise pas."
          </p>
        </div>
        <Callout color={AMB} title="La règle des excuses qui fonctionnent vraiment"
          text="Les vraies excuses contiennent : (1) la reconnaissance de l'acte spécifique, (2) l'impact sur les autres sans minimiser, (3) une action concrète de réparation. Ce qui ne fonctionne pas : 'Je m'excuse si tu as été blessé' (conditionnel = pas d'excuses). 'Je suis désolé mais...' (le 'mais' annule tout). 'Ce n'était pas mon intention' (l'intention ne défait pas l'impact)." />
        <SH3 color={"#DC2626"}>Script 3 — Attaque injuste / Cancel culture</SH3>
        <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA", margin: "6px 0" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "10px", color: "#1C1917", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
            "Certaines choses circulent sur mon compte. Je choisis de ne pas alimenter cette conversation, car les faits parlent d'eux-mêmes. Ceux qui me connaissent savent qui je suis. Je continue mon travail et ma route. Merci pour votre soutien."
          </p>
        </div>
        <MiniTable color={"#DC2626"}
          headers={["Plateforme", "Stratégie spécifique"]}
          rows={[
            ["Twitter/X", "Un seul tweet factuel, bien tourné, pas de thread long. Épingle-le."],
            ["Instagram", "Story + highlight 'Ma position' — pas de live en colère"],
            ["TikTok", "Vidéo calme, face caméra, 60-90 secondes maximum"],
            ["Facebook", "Post long format possible — audience plus âgée, plus réfléchie"],
            ["WhatsApp / Proche", "Message audio personnalisé à tes proches avant la publication officielle"],
          ]}
        />
      </ContentPage>

      <ContentPage chapter="PRO 43 — Gestion de Crise & Bad Buzz" accent={"#DC2626"} pageNum={221} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Après la Crise : Reconstruire et Rebondir</SH2>
        <Body>Une crise est une parenthèse, pas une fin. Les plus grandes carrières artistiques mondiales et africaines ont traversé des scandales — Youssou N'Dour, Akon, Fally Ipupa — et en sont sortis renforcés. Ce qui compte, c'est ce que tu fais dans les semaines qui suivent.</Body>
        <ProcessLine color={"#DC2626"} steps={[
          { num: "1", title: "Reprendre le contenu créatif", desc: "Ne disparais pas. Reprends tes publications régulières dans les 48-72h après ta réponse. Le silence prolongé maintient la crise en vie." },
          { num: "2", title: "Mobiliser ta communauté authentique", desc: "Tes vrais fans savent qui tu es. Engage-les : réponds à leurs commentaires, fais un live intimiste, montre ta résilience." },
          { num: "3", title: "Livrer de la valeur en excès", desc: "Sortie surprise, contenu gratuit, anecdote personnelle touchante. Donne à ta communauté une raison de parler de toi positivement." },
          { num: "4", title: "Ne pas ressasser publiquement", desc: "Une fois la crise gérée, n'y revenez pas sauf si on te le demande. Avancer est le meilleur message." },
          { num: "5", title: "Tirer les leçons en privé", desc: "Qu'est-ce qui a causé cette crise ? Qu'aurais-tu pu faire différemment ? Note-le. Une bonne crise mal gérée + une leçon tirée vaut mieux qu'une bonne crise mal gérée + rien." },
        ]} />
        <SH3 color={"#DC2626"}>Transformer une Crise en Opportunité</SH3>
        <Callout color={GRN} title="Le paradoxe du bad buzz bien géré"
          text="Certaines crises bien gérées génèrent plus de notoriété que des années de contenu normal. Pourquoi ? Parce qu'elles montrent qui tu es vraiment. Une reconnaissance honnête de ses erreurs, une clarification factuelle convaincante, ou une résilience remarquable face à une attaque injuste peuvent transformer des critiques en fans. La clé : authenticité absolue, jamais de posture." />
        <MiniTable color={"#DC2626"}
          headers={["Après la crise", "À faire", "À éviter"]}
          rows={[
            ["Semaine 1", "Reprendre le contenu, répondre aux fans fidèles", "Relancer le débat, attaquer en retour"],
            ["Semaine 2-3", "Sortir du nouveau contenu fort, engagement communauté", "Ressasser la crise, y faire référence sans raison"],
            ["Mois 1-3", "Focus total sur le travail, montrer la progression", "S'auto-apitoyer publiquement, victimisation excessive"],
            ["Mois 3+", "Éventuellement partager la leçon (si pertinent), avec recul", "Prétendre que ça n'a jamais existé"],
          ]}
        />
        <Banner text="Ta réputation, c'est ce que les gens disent de toi quand tu n'es pas dans la pièce." sub="Construis-la chaque jour avec cohérence — elle sera ton meilleur bouclier le jour où une crise surviendra." color={"#DC2626"} dark />
        <Divider color={"#DC2626"} />
        <SH3 color={"#DC2626"}>Qui appeler en cas de crise grave ?</SH3>
        <BulletList color={"#DC2626"} items={[
          { bold: "Ton manager ou agent :", text: "En première ligne. Il a la distance émotionnelle pour évaluer froidement la situation." },
          { bold: "Un avocat spécialisé en droit de la presse / diffamation :", text: "Si des informations fausses et graves circulent, une mise en demeure légale peut stopper l'hémorragie." },
          { bold: "KEKELI Creative Agency :", text: "Accompagnement stratégique communication de crise, rédaction des messages officiels, gestion des réseaux." },
          { bold: "Un ami de confiance (hors milieu musical) :", text: "Quelqu'un qui te connaît avant ta carrière. Sa perspective est précieuse pour rester ancré." },
        ]} />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 44 — LE MERCHANDISING PROFESSIONNEL (P222–P225)              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={44} title="PRO 44 — Le Merchandising Professionnel" accent={SEC} pageNum={222} total={TOTAL} guideLabel={LABEL}
        hook="Beyoncé génère plus d'argent avec son merch qu'avec ses albums. Travis Scott a transformé un drop de t-shirts en phénomène culturel. Au Sénégal, les artistes laissent des millions sur la table en ignorant cette source de revenus. Le merchandising n'est pas un gadget — c'est un pilier de monétisation professionnelle." />

      <ContentPage chapter="PRO 44 — Le Merchandising Professionnel" accent={SEC} pageNum={223} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi le Merch est Indispensable à ta Stratégie</SH2>
        <Body>Le merchandising (merch) désigne tous les produits physiques ou numériques créés à ton image et vendus à tes fans. C'est une source de revenus <strong>directe, récurrente et indépendante des plateformes</strong> — personne ne peut te couper l'accès à tes produits comme Spotify peut te retirer d'une playlist.</Body>
        <StatRow color={SEC} stats={[
          { value: "30-50%", label: "revenus additionnels en tournée grâce au merch pour les artistes qui le font bien" },
          { value: "3x", label: "fois plus de revenus par fan engagé avec une boutique merch active vs sans merch" },
          { value: "85%", label: "des fans seraient prêts à acheter un produit de leur artiste favori s'il était disponible" },
          { value: "0 FCFA", label: "de coût minimum avec le modèle print-on-demand (impression à la commande)" },
        ]} />
        <SH3 color={SEC}>Les 3 fonctions du merch au-delà de l'argent</SH3>
        <BulletList color={SEC} items={[
          { bold: "Marketing ambulant :", text: "Chaque personne qui porte ton t-shirt devient une publicité vivante dans sa ville, son quartier, son lycée. C'est du reach gratuit permanent." },
          { bold: "Connexion émotionnelle :", text: "Posséder un objet physique d'un artiste qu'on aime crée un lien différent du streaming. C'est tangible, réel. Ça forge une appartenance à une communauté." },
          { bold: "Signal de professionnalisme :", text: "Un artiste avec une ligne de merch est perçu comme établi, sérieux. Les organisateurs et partenaires le voient." },
        ]} />
        <SH3 color={SEC}>Quel Merch pour Quel Profil d'Artiste ?</SH3>
        <MiniTable color={SEC}
          headers={["Profil artistique", "Merch recommandé", "Pourquoi ça marche"]}
          rows={[
            ["Artiste afrobeats / pop", "T-shirts graphiques, casquettes, stickers, téléphones", "Fan base large, jeune, mode-consciente"],
            ["Artiste gospel / chrétien", "Tote bags, versets en design, cd physiques, bibles offerts", "Communauté forte, achats symboliques et cadeaux"],
            ["DJ / producteur", "Casquettes, vinyls, USB musicaux, matériel brandé", "Public technique, collectionneur"],
            ["Artiste mbalax / traditionnel", "Boubous, tissu wax brandé, albums physiques", "Public fidèle, valeur culturelle, diaspora"],
            ["Rappeur / hip-hop", "Hoodies, casquettes, patches, éditions limitées", "Culture streetwear, collections capsule"],
            ["Artiste émergent (budget limité)", "Stickers, affiches signées, tote bags simples", "Peu coûteux à produire, prix accessible pour les fans"],
          ]}
        />
        <Callout color={SEC} title="Le merch idéal pour commencer en 2026 au Sénégal"
          text="T-shirt premium (qualité tissu importante), 2-3 designs maximum, édition limitée numérotée (crée la rareté). Prix de vente : 8 000 à 15 000 FCFA selon qualité. Coût de production : 2 500 à 5 000 FCFA/pièce à Dakar. Marge : 3 000 à 10 000 FCFA par pièce vendue. Avec 50 pièces vendues : 150 000 à 500 000 FCFA de marge nette." />
      </ContentPage>

      <ContentPage chapter="PRO 44 — Le Merchandising Professionnel" accent={SEC} pageNum={224} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Production de Merch au Sénégal : Coûts et Fournisseurs</SH2>
        <Body>La production locale au Sénégal est avantageuse : coûts raisonnables, délais courts, personnalisation flexible. Voici les options selon ton budget et ta quantité.</Body>
        <MiniTable color={SEC}
          headers={["Type de produit", "Où produire à Dakar", "Prix unitaire (50 pièces)", "Prix unitaire (200 pièces)"]}
          rows={[
            ["T-shirts imprimés sérigraphie", "Marché Sandaga, HLM, Zone industrielle", "3 500 – 5 000 FCFA", "2 000 – 3 000 FCFA"],
            ["T-shirts impression numérique", "Prestataires digitaux (ex: PrintDakar)", "4 000 – 6 000 FCFA", "2 500 – 4 000 FCFA"],
            ["Casquettes brodées", "Fournisseurs HLM, marché Colobane", "4 000 – 7 000 FCFA", "2 500 – 4 500 FCFA"],
            ["Tote bags sérigraphiés", "Marché Sandaga / imprimeurs Plateau", "1 500 – 3 000 FCFA", "800 – 1 800 FCFA"],
            ["Stickers / autocollants", "Imprimeries numériques (Plateau, Almadies)", "150 – 500 FCFA/unité", "80 – 200 FCFA/unité"],
            ["Tissu wax brandé (mètre)", "Marché Sandaga, ateliers Pikine", "2 500 – 5 000 FCFA/m", "1 500 – 3 000 FCFA/m"],
            ["Hoodies / sweats", "Ateliers de confection Dakar", "8 000 – 15 000 FCFA", "5 000 – 10 000 FCFA"],
          ]}
        />
        <SH3 color={SEC}>Stratégie de prix : comment tarifer son merch</SH3>
        <Callout color={SEC} title="La règle x3 pour le pricing merch"
          text="Prix de vente minimum = Coût de production × 3. Exemple : un t-shirt te coûte 3 500 FCFA à produire → prix de vente minimum 10 500 FCFA, arrondi à 10 000 ou 12 000 FCFA. Cette règle couvre : le coût de production, tes frais de logistique / déplacement, et te laisse une marge nette significative. En concert, tu peux aller jusqu'à x4 ou x5 sans problème — l'émotion du direct justifie le prix premium." />
        <SH3 color={SEC}>Print-on-demand : zéro stock, zéro risque</SH3>
        <Body>Si tu ne veux pas investir en stock, les plateformes <strong>print-on-demand</strong> impriment et expédient à chaque commande. Tu n'achètes rien d'avance.</Body>
        <BulletList color={SEC} items={[
          { bold: "Printful / Printify :", text: "Les leaders mondiaux. Intégration Shopify, Etsy, WooCommerce. Livraison internationale depuis Europe ou USA. Idéal pour la diaspora." },
          { bold: "Teespring / Spring :", text: "Plateforme tout-en-un avec boutique intégrée. Lien direct YouTube possible pour les artistes YouTube." },
          { bold: "Redbubble :", text: "Marketplace — tu déposes tes designs, ils s'occupent de tout. Marge plus faible mais sans effort logistique." },
          { bold: "Expédition depuis Dakar :", text: "Pour le marché local, travailler avec un service de livraison (Jumia Express, DHL Sénégal, livreurs moto locaux) depuis un stock physique reste plus rapide et moins coûteux." },
        ]} />
      </ContentPage>

      <ContentPage chapter="PRO 44 — Le Merchandising Professionnel" accent={SEC} pageNum={225} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Vendre son Merch : En Concert, en Ligne, en Édition Limitée</SH2>
        <SH3 color={SEC}>En concert — le canal de vente le plus puissant</SH3>
        <Body>Le concert est l'environnement idéal pour vendre du merch. L'émotion est à son comble, la connexion avec l'artiste est maximale, et les fans veulent emporter un souvenir physique de la soirée.</Body>
        <Checklist color={SEC} items={[
          "Installer un stand merch VISIBLE à l'entrée et à la sortie de la salle",
          "Afficher les prix clairement — pas de négociation, ça ralentit les ventes",
          "Accepter Wave, Orange Money ET cash — ne perdre aucune vente pour problème de paiement",
          "Proposer une photo avec toi pour tout achat de plus de 15 000 FCFA — crée un souvenir supplémentaire",
          "Créer une urgence : 'Il reste seulement 20 pièces de cette édition limitée'",
          "Annoncer le merch depuis la scène — 'Après le show, retrouvez-moi au stand'",
          "Avoir une personne dédiée au stand pendant que tu es sur scène",
        ]} />
        <SH3 color={SEC}>En ligne — construire ta boutique</SH3>
        <MiniTable color={SEC}
          headers={["Solution", "Facilité", "Coût", "Idéal pour"]}
          rows={[
            ["Lien WhatsApp Business + Wave/OM", "⭐⭐⭐⭐⭐ Très simple", "Gratuit", "Démarrer rapidement, marché sénégalais local"],
            ["Instagram Shopping", "⭐⭐⭐⭐", "Gratuit (compte pro)", "Artistes avec 1 000+ followers engagés"],
            ["TikTok Shop", "⭐⭐⭐", "Gratuit", "Artistes TikTok avec fort engagement vidéo"],
            ["Jumia (vendeur tiers)", "⭐⭐⭐", "Commission 5-15%", "Grande audience locale, logistique gérée"],
            ["Shopify", "⭐⭐", "~15 000 FCFA/mois", "Artistes avec marque forte, volume élevé"],
          ]}
        />
        <SH3 color={SEC}>Les Éditions Limitées : l'arme secrète du merch</SH3>
        <Callout color={GOLD} title="Pourquoi les éditions limitées surperforment systématiquement"
          text="La rareté crée le désir. Une édition limitée à 100 exemplaires numérotés et signés se vend bien mieux — et plus cher — qu'un stock illimité du même t-shirt. Stratégie : annonce la limitation dès le début ('100 pièces, numérotées de 1 à 100, jamais reproduites'), photographie chaque pièce avec son numéro, et crée un compte à rebours. Les fans craignent de rater — ils achètent maintenant." />
        <SH3 color={SEC}>Calendrier merch annuel recommandé</SH3>
        <VerticalTimeline color={SEC} events={[
          { year: "Janvier", title: "Nouvel An", desc: "Drop capsule 'Nouvelle année' — petit format, prix accessible, design frais." },
          { year: "Février", title: "Saint-Valentin", desc: "Coffrets duo, designs romantiques, édition limitée couple." },
          { year: "Sortie musicale", title: "Single / Album", desc: "Merch assorti à la cover — la sortie musicale et le merch se boostent mutuellement." },
          { year: "Saison concerts", title: "Tournée / Festival", desc: "Merch exclusif tourné — pièce disponible uniquement aux concerts, numérotée." },
          { year: "Décembre", title: "Fin d'année", desc: "Coffret collector de l'année, bilan artistique, édition premium cadeau." },
        ]} />
        <Divider color={SEC} />
        <Banner text="Chaque fan qui porte ton logo est un ambassadeur gratuit. Donne-leur quelque chose à porter." sub="Le merch n'est pas une option pour les artistes sérieux — c'est un pilier de la monétisation durable." color={SEC} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 45 — LA TOURNÉE PROFESSIONNELLE EN AOF (P226–P230)           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={45} title="PRO 45 — La Tournée Professionnelle en AOF" accent={BLU} pageNum={226} total={TOTAL} guideLabel={LABEL}
        hook="La scène sénégalaise est ta base, mais l'Afrique de l'Ouest est ton marché. Côte d'Ivoire, Mali, Burkina, Guinée, Togo, Bénin — des millions de fans qui écoutent les mêmes sons, parlent les mêmes langues, vibrent aux mêmes rythmes. Une tournée bien montée en AOF change une carrière locale en carrière continentale." />

      <ContentPage chapter="PRO 45 — Tournée AOF" accent={BLU} pageNum={227} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Planifier sa Tournée AOF : Pays, Timing et Stratégie</SH2>
        <Body>Une tournée réussie se prépare <strong>3 à 6 mois à l'avance</strong>. L'improvisation coûte cher — un billet d'avion réservé 48h avant coûte 3 fois plus cher que le même billet réservé 2 mois avant. Voici la méthode de planification étape par étape.</Body>
        <MiniTable color={BLU}
          headers={["Pays AOF", "Capitale musicale", "Scène principale", "Meilleure période", "Spécificité"]}
          rows={[
            ["Côte d'Ivoire", "Abidjan", "La Brasserie, L'Annexe, Nuit d'Afrique", "Nov–Fév", "Plus gros marché musical AOF — Coupé-décalé & Afrobeats"],
            ["Mali", "Bamako", "Festival au Désert, clubs de Lafiabougou", "Jan–Mar (Festival)", "Public très fidèle, musique mandingue & fusion"],
            ["Burkina Faso", "Ouagadougou", "FESPACO, Palais des Sports", "Fév (FESPACO)", "Scène culturelle très riche, festivals réguliers"],
            ["Guinée", "Conakry", "Palais du Peuple, clubs Kaloum", "Oct–Déc", "Public passionné, marché en forte croissance"],
            ["Togo", "Lomé", "Palais des Congrès, clubs de Lomé", "Toute l'année", "Carrefour AOF, bonne connexion diaspora Europe"],
            ["Bénin", "Cotonou", "Festival Vodoun, scènes Cotonou", "Jan (Vodoun)", "Marché culturel premium, artistes bien payés"],
            ["Sénégal", "Dakar", "Grand Théâtre, arènes, Thiossane", "Toute l'année", "Ta base — construis d'abord ici avant de rayonner"],
          ]}
        />
        <SH3 color={BLU}>Les 3 types de tournées AOF selon ton niveau</SH3>
        <BulletList color={BLU} items={[
          { bold: "Tournée test (1-2 pays, 3-5 dates) :", text: "Artiste émergent. Objectif : tester l'accueil hors Sénégal, construire un réseau de contacts locaux, valider la demande. Budget : 500 000 à 1 500 000 FCFA." },
          { bold: "Tournée régionale (3-4 pays, 8-15 dates) :", text: "Artiste en développement avec base de fans établie. Objectif : ancrer sa présence sous-régionale, signer avec des promoteurs locaux. Budget : 2 000 000 à 5 000 000 FCFA." },
          { bold: "Tournée majeure (5+ pays, 20+ dates) :", text: "Artiste établi. Partenariats avec labels ou sponsors, couverture presse internationale. Budget : 5 000 000 FCFA et plus, souvent avec apport externe." },
        ]} />
        <Callout color={BLU} title="Commencer petit mais commencer vrai"
          text="Beaucoup d'artistes sénégalais attendent d'être 'prêts' pour tourner en AOF. La vérité : tu ne seras jamais entièrement prêt — et c'est sur scène, face à un public ivoirien ou guinéen, que tu le deviendras. Une tournée de 3 dates à Abidjan avec 200 personnes par soir vaut mieux que 2 ans d'attente." />
      </ContentPage>

      <ContentPage chapter="PRO 45 — Tournée AOF" accent={BLU} pageNum={228} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Logistique : Visas, Transport, Hébergement, Rider Technique</SH2>
        <SH3 color={BLU}>Visas et documents en zone CEDEAO</SH3>
        <Body>La bonne nouvelle : en tant que ressortissant sénégalais, tu circules <strong>librement dans toute la CEDEAO</strong> (Communauté Économique des États de l'Afrique de l'Ouest) avec ton seul passeport ou ta carte d'identité nationale. Côte d'Ivoire, Mali, Burkina, Guinée, Togo, Bénin — pas de visa requis pour les citoyens des États membres.</Body>
        <Callout color={GRN} title="Documents à avoir avant chaque tournée AOF"
          text="Passeport valide (ou CNIB pour CEDEAO) · Lettre d'invitation de l'organisateur local · Contrat de prestation signé · Assurance voyage (AXA Sénégal ou Allianz) · Certificat de vaccination à jour (fièvre jaune obligatoire pour plusieurs pays) · Copie numérique de tous tes documents sur cloud et téléphone." />
        <SH3 color={BLU}>Transport : choisir le bon mode</SH3>
        <MiniTable color={BLU}
          headers={["Trajet", "Avion", "Bus / Voiture", "Recommandation"]}
          rows={[
            ["Dakar → Abidjan", "1h45 — 80 000 à 200 000 FCFA A/R", "Non recommandé (distance)", "✈ Avion — réserver 6-8 semaines avant pour les meilleurs tarifs"],
            ["Dakar → Bamako", "1h30 — 70 000 à 180 000 FCFA A/R", "12-16h — 15 000 à 25 000 FCFA", "✈ Avion si délai serré · 🚌 Bus si budget limité (Dakar Dem Dikk)"],
            ["Dakar → Conakry", "1h15 — 100 000 à 200 000 FCFA A/R", "15-20h — 20 000 FCFA", "✈ Avion recommandé (routes terrestres difficiles)"],
            ["Dakar → Ouagadougou", "2h — 120 000 à 250 000 FCFA A/R", "24h+ — non recommandé", "✈ Avion uniquement"],
            ["Abidjan → Lomé (en tournée)", "45 min avion ou 6h bus", "Bus confortable disponible", "🚌 Bus STIF ou CTM si tournée groupée Abidjan-Lomé-Cotonou"],
          ]}
        />
        <SH3 color={BLU}>Le Rider Technique : ce que tu exiges de chaque organisateur</SH3>
        <Body>Le <strong>rider technique</strong> est le document qui liste tout ce que tu as besoin sur scène. L'envoyer AVANT la signature du contrat protège contre les mauvaises surprises.</Body>
        <Checklist color={BLU} items={[
          "Système son PA de qualité adaptée à la salle (puissance en watts précisée)",
          "Moniteurs de scène (floor monitors) — minimum 2 retours scène",
          "Microphones (nombre précis selon configuration : chant, instruments)",
          "Table de mixage avec minimum 16 canaux et ingénieur son local",
          "Éclairage scène : PAR LED minimum, moving heads si spectacle",
          "Loge artiste propre et sécurisée avec miroir, eau, snacks",
          "Accès soundcheck minimum 2h avant l'événement",
          "Connexion Wi-Fi ou données mobiles pour l'équipe technique",
          "Transport depuis l'hébergement jusqu'au lieu du spectacle",
        ]} />
      </ContentPage>

      <ContentPage chapter="PRO 45 — Tournée AOF" accent={BLU} pageNum={229} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Booking et Promoteurs Locaux : Comment Entrer dans les Marchés</SH2>
        <Body>La clé d'une tournée AOF réussie est d'avoir des <strong>relais locaux dans chaque pays</strong>. Un promoteur local connaît son marché, ses codes, ses contraintes — et il a déjà les contacts des organisateurs, radios et médias. Sans lui, tu travailles à l'aveugle.</Body>
        <ProcessLine color={BLU} steps={[
          { num: "1", title: "Identifier les promoteurs par pays", desc: "Cherche sur Instagram les hashtags locaux (#concertsabidjan #livemusiquebamako). Identifie qui organise les concerts des artistes de ta catégorie." },
          { num: "2", title: "Approcher via message professionnel", desc: "Envoie un DM court : ton nom, un lien vers ta musique, une proposition claire. Pas de long texte — ils reçoivent des dizaines de demandes." },
          { num: "3", title: "Envoyer ton dossier artiste", desc: "EPK professionnel (bio, photos HD, liens streaming, vidéo live, liste dates passées, cachet indicatif). KEKELI peut créer ton dossier artiste." },
          { num: "4", title: "Négocier le deal en 3 modèles", desc: "Cachet fixe (sécurité, tu as ton argent quoi qu'il arrive) · Part de billetterie (risque mais potentiel fort si salle pleine) · Deal mixte : cachet minimum + % billetterie au-delà d'un seuil." },
          { num: "5", title: "Signer un contrat avant de partir", desc: "JAMAIS de voyage sans contrat signé et acompte versé (minimum 30-50%). Exige le paiement via virement ou Wave — pas de 'on règle à l'arrivée'." },
        ]} />
        <SH3 color={BLU}>Promotion locale : s'activer avant d'arriver</SH3>
        <BulletList color={BLU} items={[
          { bold: "3-4 semaines avant :", text: "Annoncer la date sur tes réseaux avec visuels pro. Taguer les pages musicales locales du pays cible (ex : @abidjanmusic, @bamakoconcerts)." },
          { bold: "2 semaines avant :", text: "Interview radio locale (contacte les radios directement ou via ton promoteur). Même une interview téléphonique depuis Dakar fonctionne." },
          { bold: "Semaine J :", text: "Countdown sur Instagram/TikTok depuis Dakar, puis stories depuis le pays dès ton arrivée. Le voyage lui-même est du contenu." },
          { bold: "Jour J :", text: "Soundcheck filmé, backstage, ambiance — du contenu authentique qui fait monter l'excitation." },
          { bold: "Après le concert :", text: "Repost les contenus du public, remerciements personnalisés, annonce si retour ou prochaine date dans le pays." },
        ]} />
        <Callout color={AMB} title="La règle d'or du booking AOF"
          text="Le premier concert dans un nouveau pays sert à construire un réseau — pas à te rembourser. Si tu rentres même financièrement (zéro profit mais zéro perte), avec 3 nouveaux contacts promoteurs, une interview radio publiée et 500 nouveaux followers locaux, la tournée est un succès. Le retour sur investissement arrive lors de la deuxième tournée dans ce même pays." />
      </ContentPage>

      <ContentPage chapter="PRO 45 — Tournée AOF" accent={BLU} pageNum={230} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Budget Tournée Type & Checklist Départ</SH2>
        <Body>Voici un budget réaliste pour une première tournée test de 3 pays (Dakar → Abidjan → Bamako → retour Dakar), 5 dates en 10 jours, avec 2 personnes dans l'équipe (artiste + manager / DJ).</Body>
        <MiniTable color={BLU}
          headers={["Poste de dépense", "Estimation basse", "Estimation haute", "Conseils"]}
          rows={[
            ["Billets d'avion × 2 (aller-retour, 3 vols)", "200 000 FCFA", "500 000 FCFA", "Réserver 6 semaines avant, Air Sénégal, Ethiopian, Air Côte d'Ivoire"],
            ["Hébergement (10 nuits × 2 pers)", "150 000 FCFA", "350 000 FCFA", "Guesthouses ou hôtels 2* recommandés par le promoteur local"],
            ["Transport local dans chaque ville", "50 000 FCFA", "120 000 FCFA", "Taxi ou moto-taxi, grouper les déplacements"],
            ["Alimentation (10 jours × 2 pers)", "100 000 FCFA", "200 000 FCFA", "Restaurants locaux — bien meilleur marché que les hôtels"],
            ["Téléphonie / data (3 pays)", "15 000 FCFA", "40 000 FCFA", "SIM locale dans chaque pays (Airtel, MTN, Orange)"],
            ["Imprévus / urgences", "50 000 FCFA", "150 000 FCFA", "Toujours prévoir une enveloppe urgence — sans exception"],
            ["Matériel transport (valise perso)", "0 FCFA", "50 000 FCFA", "Excédents bagages si tu voyages avec matériel scène"],
            ["TOTAL dépenses artiste", "565 000 FCFA", "1 410 000 FCFA", "Le promoteur couvre souvent hébergement + transport local"],
          ]}
        />
        <SH3 color={BLU}>Revenus attendus sur 5 dates</SH3>
        <Callout color={GRN} title="Projection réaliste — 5 dates / artiste émergent AOF"
          text="Cachet fixe artiste émergent : 150 000 à 500 000 FCFA par date selon le pays et la salle. Sur 5 dates : 750 000 à 2 500 000 FCFA de cachets bruts. Déduction dépenses (565 000 à 1 410 000) → marge nette : de 0 à 2 000 000 FCFA. C'est réaliste. La première tournée AOF enrichit rarement, mais elle ouvre des portes qui valent bien plus." />
        <SH3 color={BLU}>Checklist 48h avant le départ</SH3>
        <Checklist color={BLU} items={[
          "Contrats signés ET acomptes reçus pour toutes les dates",
          "Passeport / CNI valide (+ 6 mois de validité minimum)",
          "Carnet de vaccination à jour (fièvre jaune indispensable)",
          "Assurance voyage souscrite",
          "Contacts locaux enregistrés (promoteur, hôtel, urgences pays)",
          "Kit merch emballé et pesé (attention surpoids bagage)",
          "Matériel scène vérifié (câbles, micro perso, HDD avec playbacks)",
          "Argent liquide dans la monnaie locale du premier pays",
          "Backup de tous tes titres sur USB + cloud (Dropbox, Drive)",
          "Posts Instagram programmés pour la durée de la tournée",
          "Quelqu'un de confiance au Sénégal pour gérer l'arrière",
        ]} />
        <Banner text="La tournée AOF n'est pas un rêve lointain — c'est un projet qui se planifie." sub="Avec 3 à 6 mois de préparation, un réseau de 2-3 promoteurs locaux, et un contrat signé, tout artiste sénégalais sérieux peut jouer hors de ses frontières." color={BLU} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 46 — FEATURINGS & COLLABORATIONS (P231–P234)                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={46} title="PRO 46 — Featurings & Collaborations : Le Guide Complet" accent={AMB} pageNum={231} total={TOTAL} guideLabel={LABEL}
        hook="Un featuring bien choisi peut te faire gagner des années. Drake a propulsé des dizaines d'artistes inconnus vers des millions de streams en une nuit. À ton échelle sénégalaise et africaine, une collaboration avec le bon artiste peut doubler ta fanbase, ouvrir un nouveau marché ou valider ta crédibilité dans un genre. Mais un mauvais featuring peut aussi te coûter cher. Voici comment naviguer ce terrain stratégique." />

      <ContentPage chapter="PRO 46 — Featurings & Collaborations" accent={AMB} pageNum={232} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Pourquoi Faire des Featurings et Comment Choisir ses Partenaires</SH2>
        <Body>Un featuring (ou "feat.") est une collaboration musicale où un artiste invité apparaît sur le titre d'un autre artiste. La collaboration peut être musicale (voix, instruments), créative (co-écriture, co-production) ou promotionnelle (partage d'audience). Dans tous les cas, c'est un <strong>outil de croissance mutuelle</strong> — mais seulement si les deux parties y trouvent leur compte.</Body>
        <SH3 color={AMB}>Les 5 types de collaborations pour un artiste en 2026</SH3>
        <BulletList color={AMB} items={[
          { bold: "Featuring musical classique :", text: "Artiste A sort un titre, Artiste B apparaît en voix invitée. Le plus répandu. Crédité 'Artiste A ft. Artiste B'." },
          { bold: "Collaboration de production :", text: "Deux artistes co-produisent un titre ou un EP. Crédits partagés, droits partagés dès le départ." },
          { bold: "Remix officiel :", text: "Tu demandes à un autre artiste de remixer ton titre (ou l'inverse). Souvent plus simple juridiquement — les droits originaux restent clairs." },
          { bold: "Collaboration de contenu :", text: "Pas forcément musical — deux artistes font ensemble un clip, une session TikTok, un live Instagram. Moins formel mais très efficace." },
          { bold: "Co-headlining concert :", text: "Deux artistes partagent l'affiche d'un concert. Mutualisent les fans et les coûts de production." },
        ]} />
        <SH3 color={AMB}>Comment choisir le bon partenaire de featuring</SH3>
        <MiniTable color={AMB}
          headers={["Critère", "Questions à se poser", "Signaux positifs", "Signaux d'alerte"]}
          rows={[
            ["Alignement artistique", "Nos univers sont-ils compatibles sans se cannibiliser ?", "Sons complémentaires, styles différents mais cohérents", "Trop similaires (redondance) ou trop opposés (incohérence)"],
            ["Compatibilité d'audience", "Sa fanbase va-t-elle écouter mon style ?", "Audiences qui se recoupent partiellement mais pas totalement", "Audiences totalement incompatibles (ex: gospel extrême + trap hardcore)"],
            ["Niveau de notoriété", "Est-ce équitable ? Qui bénéficie le plus de qui ?", "Niveaux proches ou écart justifié (montée en gamme assumée)", "Artiste 100x plus grand que toi qui demande un deal égal"],
            ["Réputation et image", "Sa réputation peut-elle nuire à mon image ?", "Artiste respecté, sans scandales récents", "Controverses récentes non résolues, image toxique"],
            ["Sérieux professionnel", "Est-il fiable pour les délais, les engagements ?", "Références vérifiables, collaborations passées solides", "Réputation de ne pas respecter les délais ou les contrats"],
          ]}
        />
        <Callout color={AMB} title="La règle du 1/3 pour les featurings stratégiques"
          text="Dans une carrière saine : 1/3 de tes collaborations avec des artistes plus grands que toi (montée en gamme), 1/3 avec des artistes de ton niveau (mutualisation), 1/3 avec des artistes émergents que tu crois (solidarité et découverte de nouveaux publics). Cette répartition maximise à la fois ta croissance et ta crédibilité dans le milieu." />
      </ContentPage>

      <ContentPage chapter="PRO 46 — Featurings & Collaborations" accent={AMB} pageNum={233} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Le Processus d'Approche et la Négociation</SH2>
        <Body>Approcher un artiste pour un featuring est un exercice délicat. Trop informel, tu sembles amateur. Trop froid, tu crées une distance. Voici le protocole qui fonctionne dans le milieu artistique sénégalais et africain.</Body>
        <ProcessLine color={AMB} steps={[
          { num: "1", title: "Établir un contact humain d'abord", desc: "Ne jamais commencer par 'Je veux te faire un featuring'. D'abord : suivre, commenter sincèrement, engager sur leur contenu. Le milieu musical fonctionne beaucoup à la relation interpersonnelle." },
          { num: "2", title: "Passer par le réseau commun si possible", desc: "Une introduction par un contact commun (manager, producteur, organisateur) vaut 10 fois un message à froid. Qui dans ton réseau connaît cet artiste ?" },
          { num: "3", title: "Envoyer le message d'approche", desc: "Court, professionnel, personnel. Pas de copier-coller. Montre que tu connais vraiment son travail. Propose un appel plutôt qu'un accord immédiat." },
          { num: "4", title: "Partager le projet en avant-première", desc: "Une maquette ou un démо du titre dès l'approche initiale augmente fortement les chances d'acceptation. L'artiste peut entendre le potentiel." },
          { num: "5", title: "Négocier les termes clairement", desc: "Droits, crédits, promotion, délais, paiement si applicable. Mettre par écrit même entre amis — les amitiés survivent mieux avec des contrats clairs." },
        ]} />
        <SH3 color={AMB}>Template de message d'approche featuring</SH3>
        <div style={{ padding: "14px 16px", borderRadius: "8px", background: "#FFFBEB", border: "2px solid #FCD34D", margin: "8px 0" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "9.5px", color: "#1C1917", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
            "Bonjour [Prénom], je suis [Ton nom], artiste [genre] basé à [ville]. J'ai découvert ton univers avec [titre spécifique] — [ce qui t'a vraiment marqué, sois précis]. Je travaille actuellement sur [description du projet], et j'ai un morceau qui m'évoque fortement ta couleur musicale. Je pense qu'une collab entre nous aurait quelque chose de vrai. Tu serais ouvert à écouter une maquette ? Je peux t'envoyer le lien, ou on peut se parler rapidement si tu préfères. Respect."
          </p>
        </div>
        <SH3 color={AMB}>Les 3 modèles économiques d'un featuring</SH3>
        <MiniTable color={AMB}
          headers={["Modèle", "Comment ça marche", "Pour qui", "Risque"]}
          rows={[
            ["Gratuit / Échange", "Aucun argent échangé — collaboration pure, mutuellement bénéfique", "Artistes de même niveau ou amis proches", "Pas de contrat = potentiellement pas de respect des engagements"],
            ["Cachet de featuring", "L'artiste A paie l'artiste B pour son intervention vocale (sans partage de droits)", "Artiste établi invité sur le projet d'un plus petit", "Coût : 50 000 à 500 000 FCFA+ selon la notoriété de l'artiste invité"],
            ["Partage de droits", "Les deux artistes co-propriétaires du titre — revenus partagés à long terme", "Vraie collaboration créative, co-écriture, co-production", "Complexité juridique — nécessite un accord écrit clair dès le départ"],
          ]}
        />
        <Callout color={AMB} title="Les featurings avec artistes de la diaspora sénégalaise"
          text="N'oublie pas la diaspora : des artistes sénégalais ou d'origine sénégalaise basés en France, aux USA, en Italie ou en Espagne peuvent être des partenaires idéaux. Ils ont des audiences occidentales que tu n'as pas, et tu as une authenticité africaine qu'ils recherchent. Ce pont diaspora-continent est sous-exploité et très puissant." />
      </ContentPage>

      <ContentPage chapter="PRO 46 — Featurings & Collaborations" accent={AMB} pageNum={234} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Les Clauses Clés d'un Accord de Featuring & Partage des Droits</SH2>
        <Body>Même entre amis, un accord écrit est indispensable pour un featuring. Il n'a pas besoin d'être un document juridique complexe — une feuille simple signée par les deux parties suffit pour la plupart des situations. Voici les points à couvrir absolument.</Body>
        <Checklist color={AMB} items={[
          "Noms complets des parties (artiste principal et artiste invité)",
          "Titre de l'œuvre concernée et description (genre, durée approximative)",
          "Nature de la collaboration (voix, instrument, co-écriture, co-production)",
          "Crédits officiels : comment le titre sera crédité publiquement",
          "Droits d'auteur : répartition des parts BSDA/SACEM (% précis)",
          "Droits voisins / Master : qui possède l'enregistrement ? À quelle hauteur ?",
          "Utilisation autorisée : plateformes, durée, territoire, usages commerciaux",
          "Paiement éventuel et conditions (si cachet : montant, date, mode de paiement)",
          "Délais : date limite de livraison des éléments par l'artiste invité",
          "Clause de sortie : que se passe-t-il si l'un des deux veut retirer le titre ?",
          "Promotion : qui est responsable de quoi ? Dates de publication coordonnées ?",
          "Signatures et date",
        ]} />
        <SH3 color={AMB}>Les erreurs classiques de featuring qui tournent mal</SH3>
        <TwoCol
          left={<RedBox>
            <BoxLabel color="#DC2626" text="❌ Ce qui fait foirer un featuring" />
            <BulletList color="#DC2626" items={[
              { text: "Partir en studio sans accord sur les droits" },
              { text: "Publier le titre sans que l'artiste invité ait validé" },
              { text: "Changer le titre après la livraison sans accord" },
              { text: "Ne pas respecter les délais de livraison des éléments" },
              { text: "Prendre 100% des revenus en prétendant 'oublier' l'accord" },
              { text: "Sortir le titre pendant une crise impliquant l'artiste invité" },
            ]} />
          </RedBox>}
          right={<GreenBox>
            <BoxLabel color="#16A34A" text="✅ Ce qui fait réussir un featuring" />
            <BulletList color={GRN} items={[
              { text: "Accord écrit signé avant tout travail en studio" },
              { text: "Communication régulière sur l'avancement du projet" },
              { text: "Plan de promotion coordonné et validé par les deux" },
              { text: "Sortie en simultané sur tous les réseaux des deux artistes" },
              { text: "Respect des délais et des engagements mutuels" },
              { text: "Relation entretenue même après la sortie du titre" },
            ]} />
          </GreenBox>}
        />
        <Divider color={AMB} />
        <Banner text="Un bon featuring n'est pas un raccourci — c'est une vraie relation professionnelle." sub="Les collaborations qui durent sont celles où les deux artistes ont le sentiment d'avoir gagné quelque chose de réel." color={AMB} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRO 47 — LE PLANNING ANNUEL ARTISTIQUE (P235–P238)               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ChapterPage num={47} title="PRO 47 — Le Planning Annuel Artistique" accent={GOLD} pageNum={235} total={TOTAL} guideLabel={LABEL}
        hook="Les artistes qui percent ne sont pas ceux qui travaillent le plus — ce sont ceux qui travaillent le plus intelligemment. Un planning annuel clair transforme une énergie dispersée en momentum continu. Il n'y a pas de 'bon moment' pour sortir, pas de saison magique pour se lancer — il y a des cycles à connaître et à exploiter." />

      <ContentPage chapter="PRO 47 — Planning Annuel Artistique" accent={GOLD} pageNum={236} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Structurer son Année : Les 4 Saisons Artistiques</SH2>
        <Body>Comme les saisons de la nature, l'année musicale a ses cycles. Comprendre ces cycles te permet de sortir au bon moment, de créer quand c'est le bon moment de créer, et de te reposer sans culpabilité quand c'est le bon moment de se reposer.</Body>
        <MiniTable color={GOLD}
          headers={["Saison", "Mois", "Énergie dominante", "Activité recommandée"]}
          rows={[
            ["🌱 Saison Création", "Jan–Mars", "Introspection, nouveauté", "Studio intensif, R&D musical, nouvelles directions artistiques"],
            ["🔥 Saison Lancement", "Avr–Juil", "Énergie, mouvement, chaleur", "Sorties de singles/EP, concerts, campagnes digitales, collaborations"],
            ["🌊 Saison Récolte", "Août–Oct", "Maturité, consolidation", "Clip de l'album, tournée, renforcement de la communauté, partenariats"],
            ["❄️ Saison Bilan", "Nov–Déc", "Clôture, évaluation, rechargement", "Bilan annuel, fêtes de fin d'année (concerts lucratifs), planification N+1"],
          ]}
        />
        <SH3 color={GOLD}>Les moments clés de l'agenda musical sénégalais et AOF</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Janvier-Février (Saint-Valentin) :", text: "Sorties romantiques, titres feel-good, forte consommation musicale — idéal pour les artistes pop, afrobeats, R&B." },
          { bold: "Avril (Vacances de Pâques) :", text: "Concerts familiaux, sorties albums en phase avec le début de la saison chaude. Public disponible, fêtes nombreuses." },
          { bold: "Juin-Juillet (Fin Ramadan / Korité / Tabaski) :", text: "Grosse période de fêtes au Sénégal — concerts très lucratifs, dépenses des ménages élevées, ambiance festive. Réserve tes dates MAINTENANT." },
          { bold: "Août-Septembre (Saison des pluies) :", text: "Moins de concerts en plein air au Sénégal. Période idéale pour créer, enregistrer, visionner les analytics, préparer la fin d'année." },
          { bold: "Novembre-Décembre (Fêtes de fin d'année) :", text: "La période la plus lucrative. Concerts privés en entreprises (très bien payés), galas, fêtes de quartier, événements corporate. À réserver à l'avance." },
        ]} />
        <Callout color={GOLD} title="La règle du 'sortir 6 semaines avant'"
          text="Pour qu'un titre soit à son pic le jour d'un événement majeur (Korité, concert, tournée), il doit sortir 6 semaines avant. L'algorithme a besoin de ce temps pour propager le titre, les radios ont besoin de ce temps pour l'intégrer en rotation. Une sortie trop proche de l'événement arrive trop tard sur les playlists." />
      </ContentPage>

      <ContentPage chapter="PRO 47 — Planning Annuel Artistique" accent={GOLD} pageNum={237} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Planning Type Mois par Mois — L'Artiste Sénégalais Pro</SH2>
        <Body>Voici un exemple de planning annuel pour un artiste qui sort 2 singles, 1 EP de 6 titres, et fait 2 tournées (nationale + AOF) dans l'année. Adapte les mois selon ton propre rythme et tes objectifs.</Body>
        <VerticalTimeline color={GOLD} events={[
          { year: "Janvier", title: "Studio & Stratégie", desc: "Enregistrement des nouvelles productions. Bilan de l'année précédente. Définir les 3 objectifs de l'année. Renouveler les abonnements (DistroKid, outils)." },
          { year: "Février", title: "Single #1 — Saint-Valentin", desc: "Sortie du premier single de l'année (thème feel-good / romantique). Clip vidéo vertical pour TikTok/Reels. Campagne digitale 2 semaines." },
          { year: "Mars", title: "Featurings & Réseau", desc: "Enregistrement des collaborations (featurings pour l'EP). Booking des dates d'avril-juin. Approche promoteurs AOF pour tournée estivale." },
          { year: "Avril", title: "Sorties EP + Promo intensive", desc: "Sortie de l'EP (idéalement 1er avril ou fin mars). 6 semaines de promo intensive : interviews, radios, concerts de lancement, contenu quotidien." },
          { year: "Mai-Juin", title: "Tournée nationale + Korité", desc: "Concerts dans les villes du Sénégal (Saint-Louis, Ziguinchor, Thiès, Touba). Maximiser les dates autour de la Korité (one of the most lucrative periods)." },
          { year: "Juillet", title: "Single #2 + Clip majeur", desc: "Sortie du deuxième single. Clip vidéo cinématique (full production). Début de la promo AOF pour la tournée de septembre." },
          { year: "Août", title: "Studio & Repos stratégique", desc: "Pas de sorties (saison creuse). Enregistrement des projets futurs. Recharge physique et mentale. Review des analytics semestriels." },
          { year: "Septembre-Octobre", title: "Tournée AOF", desc: "3-5 pays de la sous-région. Abidjan, Bamako, Conakry ou Lomé selon les deals signés. Contenu de tournée quotidien sur les réseaux." },
          { year: "Novembre-Décembre", title: "Saison des fêtes — Maximiser", desc: "Concerts corporate (très bien payés). Galas et événements privés. Sortie d'un titre festif pour les fêtes. Bilan annuel complet." },
        ]} />
      </ContentPage>

      <ContentPage chapter="PRO 47 — Planning Annuel Artistique" accent={GOLD} pageNum={238} total={TOTAL} guideLabel={LABEL}>
        <SH2 color={DARK}>Outils de Gestion du Temps et Bilan Annuel</SH2>
        <Body>Un planning sur papier ne sert à rien s'il n'est pas consulté chaque semaine. Voici les outils simples et les rituels de gestion du temps qui font la différence entre un artiste qui avance et un artiste qui s'éparpille.</Body>
        <SH3 color={GOLD}>Les outils de planification artistique recommandés</SH3>
        <MiniTable color={GOLD}
          headers={["Outil", "Usage", "Gratuit ?", "Idéal pour"]}
          rows={[
            ["Google Calendar", "Planning dates, deadlines, rappels automatiques", "Oui", "Vue mensuelle, partage avec manager/équipe"],
            ["Notion", "Base de données projets, suivi des tâches, wiki artiste", "Oui (base)", "Organisation complexe, tracker de projets multiples"],
            ["Trello", "Tableau Kanban : À faire / En cours / Terminé", "Oui", "Suivi visuel simple des étapes de chaque projet"],
            ["Google Sheets", "Tracker financier, analytics mensuels, budget tournée", "Oui", "Données chiffrées, tableaux de bord personnalisés"],
            ["DistroKid / Spotify for Artists", "Analytics streaming, suivi des sorties", "Inclus abonnement", "Données réelles de performance musicale"],
            ["Instagram Insights / TikTok Analytics", "Performance contenu, croissance audience", "Oui", "Décisions de contenu basées sur les vrais chiffres"],
          ]}
        />
        <SH3 color={GOLD}>Les 3 rituels de gestion du temps d'un artiste pro</SH3>
        <BulletList color={GOLD} items={[
          { bold: "Le Lundi Bilan (30 minutes) :", text: "Chaque lundi matin. Revoir la semaine passée : qu'est-ce qui a été accompli ? Qu'est-ce qui n'a pas été fait ? Pourquoi ? Ajuster le planning de la semaine. Pas négociable." },
          { bold: "Le Mois Review (2 heures) :", text: "Le 1er ou 2 de chaque mois. Analytics complets (streaming + réseaux). Bilan financier du mois. Vérification des objectifs trimestriels. Ajustements si nécessaire." },
          { bold: "Le Bilan Annuel (demi-journée) :", text: "En décembre ou janvier. L'exercice le plus important. Qu'as-tu accompli cette année ? Quels objectifs n'ont pas été atteints et pourquoi ? Quels sont tes 3 grands objectifs pour l'année suivante ?" },
        ]} />
        <SH3 color={GOLD}>Template de Bilan Annuel — Les 10 questions essentielles</SH3>
        <NumberedList color={GOLD} items={[
          "Combien de titres ai-je sorti cette année ? Lesquels ont le mieux performé ? Pourquoi ?",
          "Combien de concerts ai-je joués ? Dans combien de villes / pays ?",
          "Quel était mon revenu artistique total cette année ? Vs l'année précédente ?",
          "Quelle a été ma croissance sur chaque plateforme (followers, streams, vues) ?",
          "Quelle collaboration a eu le plus d'impact ? Que refaire ?",
          "Qu'est-ce que j'aurais dû faire que je n'ai pas fait ?",
          "Quel investissement dans ma carrière a eu le meilleur retour ?",
          "Comment a évolué mon image / branding cette année ?",
          "Qu'ai-je appris sur moi en tant qu'artiste ?",
          "Quel est mon objectif numéro 1 pour l'année prochaine — et mon plan concret pour l'atteindre ?",
        ]} />
        <Callout color={GOLD} title="Le secret des artistes qui durent 10 ans, 20 ans, 30 ans"
          text="Ils planifient. Youssou N'Dour ne laisse pas le hasard décider de ses sorties. Burna Boy sort ses albums avec 18 mois de préparation. Les artistes qui disparaissent après un tube sont souvent ceux qui n'avaient pas de plan au-delà du hit. Un planning annuel n'étouffe pas la créativité — il lui donne une direction. Et une direction sans contrainte reste libre." />
        <Divider color={GOLD} />
        <Banner text="La carrière artistique parfaite n'existe pas. La carrière planifiée, elle, existe." sub="Commence par planifier les 90 prochains jours. Ensuite les 6 prochains mois. Ensuite l'année entière. Étape par étape." color={GOLD} dark />
      </ContentPage>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CLOSING PAGE                                                      */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <ClosingPage
        title="Tu es maintenant"
        titleHighlight="Un Artiste Pro !"
        pageNum={239}
        total={TOTAL}
        guideLabel={LABEL}
        accent={ACC}
      />

    </EbookViewerShell>
  );
}
