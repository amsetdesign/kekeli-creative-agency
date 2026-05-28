import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Preview, Link,
} from "@react-email/components";

interface Props {
  recipient_name: string;
  sender_name: string;
  project_title: string;
  message_content: string;
  siteUrl: string;
  project_id: string;
  direction: "to_agency" | "to_client";
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";

export default function MessageNotification({
  recipient_name, sender_name, project_title, message_content, siteUrl, project_id, direction,
}: Props) {
  const firstName = recipient_name.split(" ")[0];
  const replyUrl = direction === "to_client"
    ? `${siteUrl}/espace-client/projets/${project_id}`
    : `${siteUrl}/admin`;

  return (
    <Html lang="fr">
      <Head />
      <Preview>💬 Nouveau message de {sender_name} — {project_title}</Preview>
      <Body style={{ backgroundColor: "#FAFAF8", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px" }}>
          <Section style={{ backgroundColor: dark, borderRadius: 16, padding: "24px 32px", marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(200,168,75,0.15)", border: `1px solid ${gold}`, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <span style={{ color: gold, fontWeight: "bold", fontSize: 18, lineHeight: "36px" }}>K</span>
              </div>
              <span style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14, letterSpacing: "0.12em" }}>
                KEKELI<span style={{ color: gold }}>.</span>AGENCY
              </span>
            </div>
            <Heading style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "600", margin: "0 0 4px" }}>
              💬 Nouveau message
            </Heading>
            <Text style={{ color: gold, fontSize: 13, margin: 0 }}>{project_title}</Text>
          </Section>

          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "24px", marginBottom: 16, border: `1px solid ${border}` }}>
            <Text style={{ color: dark, fontSize: 15, margin: "0 0 16px" }}>
              Bonjour <strong>{firstName}</strong>,
            </Text>
            <Text style={{ color: muted, fontSize: 13, margin: "0 0 20px" }}>
              <strong>{sender_name}</strong> vous a envoyé un message concernant le projet{" "}
              <strong>{project_title}</strong> :
            </Text>

            <div style={{ backgroundColor: "#FAFAF8", borderRadius: 12, padding: "16px 20px", borderLeft: `3px solid ${gold}`, marginBottom: 20 }}>
              <Text style={{ color: dark, fontSize: 14, lineHeight: "1.7", margin: 0, whiteSpace: "pre-wrap" }}>
                {message_content}
              </Text>
            </div>

            <div style={{ textAlign: "center" }}>
              <Link
                href={replyUrl}
                style={{
                  display: "inline-block",
                  backgroundColor: dark,
                  color: "#FFFFFF",
                  padding: "12px 28px",
                  borderRadius: 10,
                  fontWeight: "600",
                  fontSize: 13,
                  textDecoration: "none",
                }}
              >
                Répondre →
              </Link>
            </div>
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
