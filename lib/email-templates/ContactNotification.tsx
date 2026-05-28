import {
  Html, Head, Body, Container, Section, Row, Column,
  Heading, Text, Hr, Preview,
} from "@react-email/components";
import type { ContactFormData } from "@/lib/validations/contact";

interface Props {
  data: ContactFormData;
  receivedAt: string;
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";

export default function ContactNotification({ data, receivedAt }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>
        📬 Nouvelle demande — {data.typeProjet} — {data.prenom} {data.nom}
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
            <Heading style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "600", margin: "16px 0 4px" }}>
              📬 Nouvelle demande reçue
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>
              {receivedAt}
            </Text>
          </Section>

          {/* Type de projet */}
          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 24px", marginBottom: 16, border: `1px solid ${border}` }}>
            <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 6px" }}>
              Type de projet
            </Text>
            <Text style={{ color: dark, fontSize: 18, fontWeight: "600", margin: 0 }}>
              {data.typeProjet}
            </Text>
            {data.budget && (
              <Text style={{ color: gold, fontSize: 13, margin: "6px 0 0" }}>
                Budget : {data.budget}
              </Text>
            )}
          </Section>

          {/* Infos contact */}
          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 24px", marginBottom: 16, border: `1px solid ${border}` }}>
            <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 14px" }}>
              Informations contact
            </Text>

            {[
              { label: "Nom complet", value: `${data.prenom} ${data.nom}` },
              { label: "Email", value: data.email },
              ...(data.telephone ? [{ label: "Téléphone / WhatsApp", value: data.telephone }] : []),
              ...(data.structure ? [{ label: "Structure / Entreprise", value: data.structure }] : []),
            ].map(({ label, value }) => (
              <Row key={label} style={{ marginBottom: 10 }}>
                <Column style={{ width: "40%" }}>
                  <Text style={{ color: muted, fontSize: 12, margin: 0 }}>{label}</Text>
                </Column>
                <Column style={{ width: "60%" }}>
                  <Text style={{ color: dark, fontSize: 13, fontWeight: "500", margin: 0 }}>{value}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Message */}
          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 24px", marginBottom: 24, border: `1px solid ${border}` }}>
            <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 12px" }}>
              Message
            </Text>
            <Text style={{ color: dark, fontSize: 14, lineHeight: "1.7", margin: 0, whiteSpace: "pre-wrap" }}>
              {data.message}
            </Text>
          </Section>

          <Hr style={{ borderColor: border, margin: "0 0 20px" }} />

          {/* Footer */}
          <Text style={{ color: muted, fontSize: 11, textAlign: "center", margin: 0 }}>
            KEKELI Creative Agency · Dakar, Sénégal · kekelicreativeagency@gmail.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
