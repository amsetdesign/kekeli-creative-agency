import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Link, Preview,
} from "@react-email/components";
import type { ContactFormData } from "@/lib/validations/contact";

interface Props {
  data: ContactFormData;
  siteUrl: string;
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";
const goldPale = "#F5EDD4";

const services = [
  "Couverture médiatique",
  "Stratégie digitale",
  "Photo shooting",
  "Développement web & mobile",
  "Réseaux sociaux",
  "Communication artistes",
];

export default function ContactConfirmation({ data, siteUrl }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>
        ✅ KEKELI Creative Agency a bien reçu votre message — Réponse sous 24h
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
              Bonjour {data.prenom},
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              Votre message a bien été reçu. Merci pour votre confiance !
            </Text>
          </Section>

          {/* Gold accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${gold}, #E8C96A, ${gold})` }} />

          {/* Body */}
          <Section style={{ backgroundColor: "#FFFFFF", padding: "28px 32px", borderRadius: "0 0 16px 16px", border: `1px solid ${border}`, borderTop: "none" }}>

            {/* Confirmation */}
            <Section style={{ backgroundColor: goldPale, borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: `1px solid rgba(200,168,75,0.3)` }}>
              <Text style={{ color: dark, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                ✅ Nous avons bien reçu votre demande concernant{" "}
                <strong style={{ color: gold }}>{data.typeProjet}</strong>.
                Notre équipe vous répondra <strong>sous 24 heures</strong>.
              </Text>
            </Section>

            {/* Services rappel */}
            <Text style={{ color: dark, fontSize: 15, fontWeight: "600", margin: "0 0 12px" }}>
              En attendant, découvrez nos services :
            </Text>
            <div style={{ marginBottom: 24 }}>
              {services.map((s) => (
                <Text key={s} style={{ color: muted, fontSize: 13, margin: "0 0 6px" }}>
                  · {s}
                </Text>
              ))}
            </div>

            <Hr style={{ borderColor: border, margin: "0 0 20px" }} />

            {/* Audit CTA */}
            <Text style={{ color: muted, fontSize: 13, marginBottom: 8 }}>
              Profitez de notre audit gratuit de visibilité digitale :
            </Text>
            <Link
              href={`${siteUrl}/sondage`}
              style={{
                display: "inline-block",
                backgroundColor: gold,
                color: dark,
                padding: "10px 20px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: "600",
                textDecoration: "none",
                marginBottom: 24,
              }}
            >
              Tester ma visibilité →
            </Link>

            <Hr style={{ borderColor: border, margin: "0 0 20px" }} />

            {/* Coordonnées */}
            <Text style={{ color: muted, fontSize: 13, margin: "0 0 6px" }}>
              📧 <Link href="mailto:kekelicreativeagency@gmail.com" style={{ color: gold }}>kekelicreativeagency@gmail.com</Link>
            </Text>
            <Text style={{ color: muted, fontSize: 13, margin: "0 0 6px" }}>
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
