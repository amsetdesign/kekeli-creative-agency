import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Link, Preview,
} from "@react-email/components";
import type { SondageConfig, UserInfo } from "@/data/sondages/types";

interface Props {
  config: SondageConfig;
  score: number;
  userInfo: UserInfo;
  siteUrl: string;
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";
const goldPale = "#F5EDD4";

function levelInfo(score: number) {
  if (score < 20) return { label: "Débutant", color: "#ef4444", desc: "Votre présence digitale est à construire. Un accompagnement complet est recommandé." };
  if (score < 40) return { label: "En développement", color: "#f97316", desc: "Des lacunes importantes freinent votre visibilité. Des actions ciblées peuvent rapidement changer la donne." };
  if (score < 60) return { label: "Intermédiaire", color: "#ca8a04", desc: "Vous avez posé de bonnes bases. L'heure est à l'optimisation." };
  if (score < 80) return { label: "Avancé", color: "#16a34a", desc: "Votre stratégie digitale est solide. Quelques ajustements vous propulseront au niveau supérieur." };
  return { label: "Expert", color: "#6B21A8", desc: "Félicitations — vous maîtrisez votre présence digitale. Affinons ensemble la performance." };
}

export default function SondageConfirmation({ config, score, userInfo, siteUrl }: Props) {
  const level = levelInfo(score);
  const isTu = config.tone === "tu";
  const prenom = userInfo.prenom;

  const greeting = isTu ? `Bravo ${prenom} !` : `Merci ${prenom} !`;
  const subheading = isTu
    ? "Ton audit de visibilité digitale est prêt."
    : "Votre audit de visibilité digitale est prêt.";
  const pdfNote = isTu
    ? "Ton rapport complet est joint à cet email en pièce jointe (PDF)."
    : "Votre rapport complet est joint à cet email en pièce jointe (PDF).";
  const ctaText = isTu ? "Voir les audits disponibles →" : "Voir les audits disponibles →";
  const contactText = isTu
    ? "Notre équipe te contacte sous 24h pour un plan d'action personnalisé."
    : "Notre équipe vous contacte sous 24h pour un plan d'action personnalisé.";

  return (
    <Html lang="fr">
      <Head />
      <Preview>
        {`✅ ${isTu ? "Ton" : "Votre"} rapport d'audit KEKELI est prêt — Score ${score}/100`}
      </Preview>
      <Body style={{ backgroundColor: "#FAFAF8", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px" }}>

          {/* Header */}
          <Section style={{ backgroundColor: dark, borderRadius: "16px 16px 0 0", padding: "28px 32px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                backgroundColor: "rgba(200,168,75,0.15)",
                border: `1px solid ${gold}`,
                textAlign: "center",
              }}>
                <span style={{ color: gold, fontWeight: "bold", fontSize: 18, lineHeight: "36px" }}>K</span>
              </div>
              <span style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14, letterSpacing: "0.12em" }}>
                KEKELI<span style={{ color: gold }}>.</span>AGENCY
              </span>
            </div>
            <Heading style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "600", margin: "0 0 6px" }}>
              {greeting}
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              {subheading}
            </Text>
          </Section>

          {/* Gold accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${gold}, #E8C96A, ${gold})` }} />

          {/* Body */}
          <Section style={{ backgroundColor: "#FFFFFF", padding: "28px 32px", borderRadius: "0 0 16px 16px", border: `1px solid ${border}`, borderTop: "none" }}>

            {/* Score box */}
            <Section style={{ backgroundColor: goldPale, borderRadius: 12, padding: "20px 24px", marginBottom: 24, border: `1px solid rgba(200,168,75,0.3)` }}>
              <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 10px" }}>
                {isTu ? "Ton score" : "Votre score"}
              </Text>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 42, fontWeight: "700", color: level.color, lineHeight: 1 }}>{score}</span>
                <div>
                  <span style={{ color: muted, fontSize: 14 }}>/ 100</span>
                  <br />
                  <span style={{
                    display: "inline-block",
                    backgroundColor: level.color,
                    color: "#fff",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: "600",
                    marginTop: 4,
                  }}>
                    {level.label}
                  </span>
                </div>
              </div>
              <Text style={{ color: dark, fontSize: 13, margin: "12px 0 0", lineHeight: 1.6 }}>
                {level.desc}
              </Text>
            </Section>

            {/* PDF note */}
            <Text style={{ color: dark, fontSize: 14, margin: "0 0 8px", lineHeight: 1.6 }}>
              📎 {pdfNote}
            </Text>

            <Hr style={{ borderColor: border, margin: "20px 0" }} />

            {/* Recommendations preview */}
            <Text style={{ color: dark, fontSize: 15, fontWeight: "600", margin: "0 0 14px" }}>
              {isTu ? "Nos recommandations pour toi :" : "Nos recommandations :"}
            </Text>

            {config.recommendations.slice(0, 3).map((reco) => (
              <div key={reco.title} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                <span style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  backgroundColor: gold,
                  borderRadius: "50%",
                  marginTop: 5,
                  flexShrink: 0,
                }} />
                <div>
                  <Text style={{ color: dark, fontSize: 13, fontWeight: "600", margin: "0 0 2px" }}>
                    {reco.title}
                  </Text>
                  <Text style={{ color: muted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                    {reco.desc}
                  </Text>
                </div>
              </div>
            ))}

            <Text style={{ color: muted, fontSize: 12, fontStyle: "italic", margin: "4px 0 0" }}>
              + {config.recommendations.length - 3} autres recommandations dans votre rapport PDF.
            </Text>

            <Hr style={{ borderColor: border, margin: "20px 0" }} />

            {/* CTA */}
            <Text style={{ color: muted, fontSize: 13, marginBottom: 8 }}>
              {contactText}
            </Text>
            <Link
              href={`${siteUrl}/contact`}
              style={{
                display: "inline-block",
                backgroundColor: gold,
                color: dark,
                padding: "11px 22px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: "600",
                textDecoration: "none",
                marginBottom: 20,
              }}
            >
              Prendre rendez-vous →
            </Link>

            <Hr style={{ borderColor: border, margin: "0 0 16px" }} />

            {/* Audit link */}
            <Text style={{ color: muted, fontSize: 12, margin: "0 0 6px" }}>
              Découvrez nos autres profils d'audit :
            </Text>
            <Link
              href={`${siteUrl}/sondage`}
              style={{ color: gold, fontSize: 13, fontWeight: "600" }}
            >
              {ctaText}
            </Link>

            <Hr style={{ borderColor: border, margin: "20px 0 16px" }} />

            <Text style={{ color: muted, fontSize: 12, margin: "0 0 4px" }}>
              📧{" "}
              <Link href="mailto:kekelicreativeagency@gmail.com" style={{ color: gold }}>
                kekelicreativeagency@gmail.com
              </Link>
            </Text>
            <Text style={{ color: muted, fontSize: 12, margin: 0 }}>
              📍 Dakar, Sénégal
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ padding: "20px 0" }}>
            <Text style={{ color: muted, fontSize: 11, textAlign: "center", margin: "0 0 4px" }}>
              L&apos;équipe KEKELI Creative Agency
            </Text>
            <Text style={{ color: muted, fontSize: 11, textAlign: "center", fontStyle: "italic", margin: 0 }}>
              &ldquo;Mettre la lumière sur votre projet&rdquo; — Dakar, Sénégal
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
