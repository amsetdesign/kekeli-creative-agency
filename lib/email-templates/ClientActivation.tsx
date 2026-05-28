import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Preview, Link,
} from "@react-email/components";

interface Props {
  full_name: string;
  siteUrl: string;
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";

export default function ClientActivation({ full_name, siteUrl }: Props) {
  const firstName = full_name.split(" ")[0];
  return (
    <Html lang="fr">
      <Head />
      <Preview>✅ Votre accès à l'espace client KEKELI est activé !</Preview>
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
              Votre accès est activé ! ✅
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>
              Espace Client KEKELI Creative Agency
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "24px", marginBottom: 16, border: `1px solid ${border}` }}>
            <Text style={{ color: dark, fontSize: 15, margin: "0 0 12px" }}>
              Bonjour <strong>{firstName}</strong>,
            </Text>
            <Text style={{ color: muted, fontSize: 14, lineHeight: "1.7", margin: "0 0 20px" }}>
              Bonne nouvelle ! Votre demande d'accès à l'espace client KEKELI Creative Agency a été validée.
              Vous pouvez désormais vous connecter pour suivre l'avancement de vos projets, consulter
              les mises à jour et échanger avec notre équipe.
            </Text>
            <div style={{ textAlign: "center" }}>
              <Link
                href={`${siteUrl}/espace-client/login`}
                style={{
                  display: "inline-block",
                  backgroundColor: dark,
                  color: "#FFFFFF",
                  padding: "14px 32px",
                  borderRadius: 12,
                  fontWeight: "600",
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Accéder à mon espace →
              </Link>
            </div>
          </Section>

          <Section style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 24px", marginBottom: 24, border: `1px solid ${border}` }}>
            <Text style={{ color: muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 10px" }}>
              Dans votre espace vous pouvez
            </Text>
            {[
              "📊 Suivre l'avancement de vos projets en temps réel",
              "🔔 Recevoir les mises à jour de notre équipe",
              "💬 Communiquer directement avec nous",
            ].map((item) => (
              <Text key={item} style={{ color: dark, fontSize: 13, margin: "0 0 8px" }}>{item}</Text>
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
