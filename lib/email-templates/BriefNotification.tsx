import {
  Html, Head, Body, Container, Section, Row, Column,
  Heading, Text, Hr, Preview,
} from "@react-email/components";
import type { BriefData } from "@/lib/validations/brief";

interface Props {
  data: BriefData;
  projetLabel: string;
  budgetLabel: string;
  delaiLabel: string;
  receivedAt: string;
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";

export default function BriefNotification({ data, projetLabel, budgetLabel, delaiLabel, receivedAt }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{`⚡ Brief Express — ${projetLabel} — ${data.prenom}`}</Preview>
      <Body style={{ backgroundColor: "#FAFAF8", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px" }}>

          {/* Header */}
          <Section style={{ backgroundColor: dark, borderRadius: 16, padding: "24px 32px", marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(200,168,75,0.15)", border: `1px solid ${gold}`, textAlign: "center" }}>
                <span style={{ color: gold, fontWeight: "bold", fontSize: 18, lineHeight: "36px" }}>K</span>
              </div>
              <span style={{ color: "#FFF", fontWeight: "600", fontSize: 14, letterSpacing: "0.12em" }}>
                KEKELI<span style={{ color: gold }}>.</span>AGENCY
              </span>
            </div>
            <Heading style={{ color: "#FFF", fontSize: 20, fontWeight: "600", margin: "0 0 4px" }}>
              ⚡ Nouveau Brief Express
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>{receivedAt}</Text>
          </Section>

          {/* Brief summary */}
          <Section style={{ backgroundColor: "#FFF", borderRadius: 16, padding: "20px 24px", marginBottom: 16, border: `1px solid ${border}` }}>
            {[
              { label: "Type de projet", value: projetLabel },
              { label: "Budget estimé", value: budgetLabel },
              { label: "Délai souhaité", value: delaiLabel },
            ].map(({ label, value }) => (
              <Row key={label} style={{ marginBottom: 12 }}>
                <Column style={{ width: "40%" }}>
                  <Text style={{ color: muted, fontSize: 12, margin: 0 }}>{label}</Text>
                </Column>
                <Column style={{ width: "60%" }}>
                  <Text style={{ color: dark, fontSize: 14, fontWeight: "600", margin: 0 }}>{value}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Contact */}
          <Section style={{ backgroundColor: "#FFF", borderRadius: 16, padding: "20px 24px", marginBottom: 24, border: `1px solid ${border}` }}>
            <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 12px" }}>Contact</Text>
            {[
              { label: "Prénom", value: data.prenom },
              { label: "WhatsApp", value: data.whatsapp },
              ...(data.email ? [{ label: "Email", value: data.email }] : []),
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
