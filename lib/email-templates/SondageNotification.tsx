import {
  Html, Head, Body, Container, Section, Row, Column,
  Heading, Text, Hr, Preview,
} from "@react-email/components";
import type { SondageConfig, UserInfo } from "@/data/sondages/types";

interface Props {
  config: SondageConfig;
  score: number;
  userInfo: UserInfo;
  receivedAt: string;
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";

function levelLabel(score: number) {
  if (score < 20) return { label: "Débutant", color: "#ef4444" };
  if (score < 40) return { label: "En développement", color: "#f97316" };
  if (score < 60) return { label: "Intermédiaire", color: "#ca8a04" };
  if (score < 80) return { label: "Avancé", color: "#16a34a" };
  return { label: "Expert", color: "#6B21A8" };
}

export default function SondageNotification({ config, score, userInfo, receivedAt }: Props) {
  const level = levelLabel(score);

  return (
    <Html lang="fr">
      <Head />
      <Preview>
        {`🎯 Sondage — ${config.title} — ${userInfo.prenom} — Score ${score}/100`}
      </Preview>
      <Body style={{ backgroundColor: "#FAFAF8", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px" }}>

          {/* Header */}
          <Section style={{ backgroundColor: dark, borderRadius: 16, padding: "24px 32px", marginBottom: 24 }}>
            <Row>
              <Column>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    backgroundColor: "rgba(200,168,75,0.15)",
                    border: `1px solid ${gold}`,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    textAlign: "center",
                  }}>
                    <span style={{ color: gold, fontWeight: "bold", fontSize: 18, lineHeight: "36px" }}>K</span>
                  </div>
                  <span style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14, letterSpacing: "0.12em" }}>
                    KEKELI<span style={{ color: gold }}>.</span>AGENCY
                  </span>
                </div>
              </Column>
            </Row>
            <Heading style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "600", margin: "16px 0 4px" }}>
              🎯 Nouveau sondage soumis
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>
              {receivedAt}
            </Text>
          </Section>

          {/* Score */}
          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 24px", marginBottom: 16, border: `1px solid ${border}` }}>
            <Row>
              <Column style={{ width: "50%" }}>
                <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 6px" }}>
                  Profil
                </Text>
                <Text style={{ color: dark, fontSize: 16, fontWeight: "600", margin: 0 }}>
                  {config.title}
                </Text>
              </Column>
              <Column style={{ width: "50%" }}>
                <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 6px" }}>
                  Score
                </Text>
                <Text style={{ color: dark, fontSize: 16, fontWeight: "600", margin: 0 }}>
                  <span style={{ fontSize: 28, color: level.color }}>{score}</span>
                  <span style={{ color: muted, fontSize: 14 }}> / 100</span>
                  {"  "}
                  <span style={{
                    display: "inline-block",
                    backgroundColor: level.color,
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: "600",
                  }}>
                    {level.label}
                  </span>
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Contact info */}
          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 24px", marginBottom: 24, border: `1px solid ${border}` }}>
            <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 14px" }}>
              Contact
            </Text>
            {[
              { label: "Prénom", value: userInfo.prenom },
              { label: "Email", value: userInfo.email },
              ...(userInfo.telephone ? [{ label: "Téléphone", value: userInfo.telephone }] : []),
              ...(userInfo.structure ? [{ label: "Structure", value: userInfo.structure }] : []),
            ].map(({ label, value }) => (
              <Row key={label} style={{ marginBottom: 10 }}>
                <Column style={{ width: "35%" }}>
                  <Text style={{ color: muted, fontSize: 12, margin: 0 }}>{label}</Text>
                </Column>
                <Column style={{ width: "65%" }}>
                  <Text style={{ color: dark, fontSize: 13, fontWeight: "500", margin: 0 }}>{value}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={{ borderColor: border, margin: "0 0 20px" }} />
          <Text style={{ color: muted, fontSize: 11, textAlign: "center", margin: 0 }}>
            KEKELI Creative Agency · Dakar, Sénégal · kekelicreativeagency@gmail.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
