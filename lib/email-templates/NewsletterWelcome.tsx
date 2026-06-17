import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Link, Preview,
} from "@react-email/components";

interface Props {
  name?: string;
  siteUrl: string;
  unsubscribeUrl: string;
}

const gold = "#C8A84B";
const dark = "#0C0B09";
const muted = "#78716C";
const border = "#E7E5E4";
const goldPale = "#F5EDD4";

export default function NewsletterWelcome({ name, siteUrl, unsubscribeUrl }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>
        🎉 Bienvenue dans la newsletter KEKELI — Conseils, actualités & ressources exclusives
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
              {name ? `Bienvenue, ${name} !` : "Bienvenue dans la newsletter !"}
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              Vous faites désormais partie de la communauté KEKELI Creative Agency.
            </Text>
          </Section>

          {/* Gold accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${gold}, #E8C96A, ${gold})` }} />

          {/* Body */}
          <Section style={{ backgroundColor: "#FFFFFF", padding: "28px 32px", borderRadius: "0 0 16px 16px", border: `1px solid ${border}`, borderTop: "none" }}>

            <Section style={{ backgroundColor: goldPale, borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: `1px solid rgba(200,168,75,0.3)` }}>
              <Text style={{ color: dark, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                ✅ Vous êtes abonné(e) à notre newsletter. Attendez-vous à recevoir régulièrement :
              </Text>
            </Section>

            {[
              { emoji: "🎯", label: "Conseils marketing & communication", desc: "Des stratégies concrètes pour artistes, entrepreneurs et personnalités au Sénégal." },
              { emoji: "🚀", label: "Actualités & tendances digitales", desc: "Nouveautés réseaux sociaux, IA, outils digitaux adaptés au marché africain." },
              { emoji: "🎁", label: "Ressources & guides exclusifs", desc: "Accès prioritaire à nos nouveaux guides, templates et outils gratuits." },
              { emoji: "💡", label: "Offres et événements en avant-première", desc: "Soyez les premiers informés de nos nouvelles offres et ateliers." },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.emoji}</span>
                <div>
                  <Text style={{ color: dark, fontSize: 14, fontWeight: "600", margin: "0 0 2px" }}>{item.label}</Text>
                  <Text style={{ color: muted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.desc}</Text>
                </div>
              </div>
            ))}

            <Hr style={{ borderColor: border, margin: "20px 0" }} />

            <Text style={{ color: dark, fontSize: 14, fontWeight: "600", margin: "0 0 10px" }}>
              En attendant notre prochain envoi :
            </Text>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                { label: "Audit gratuit →", href: `${siteUrl}/sondage` },
                { label: "Nos services →", href: `${siteUrl}/services` },
                { label: "Brief en ligne →", href: `${siteUrl}/brief` },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: "600",
                    textDecoration: "none",
                    border: `1px solid ${gold}`,
                    color: dark,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>

            <Hr style={{ borderColor: border, margin: "0 0 20px" }} />

            <Text style={{ color: muted, fontSize: 13, margin: "0 0 4px" }}>
              📧 <Link href="mailto:kekelicreativeagency@gmail.com" style={{ color: gold }}>kekelicreativeagency@gmail.com</Link>
            </Text>
            <Text style={{ color: muted, fontSize: 13, margin: 0 }}>
              📍 Dakar, Sénégal — <Link href={`https://wa.me/221781672819`} style={{ color: gold }}>WhatsApp</Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ padding: "20px 0" }}>
            <Text style={{ color: muted, fontSize: 11, textAlign: "center", margin: "0 0 6px" }}>
              L&apos;équipe KEKELI Creative Agency
            </Text>
            <Text style={{ color: muted, fontSize: 11, textAlign: "center", fontStyle: "italic", margin: "0 0 12px" }}>
              &ldquo;Mettre la lumière sur votre projet&rdquo; — Dakar, Sénégal
            </Text>
            <Text style={{ color: "#B0A89E", fontSize: 10, textAlign: "center", margin: 0 }}>
              Vous recevez cet email car vous vous êtes abonné(e) à la newsletter KEKELI.{" "}
              <Link href={unsubscribeUrl} style={{ color: "#B0A89E", textDecoration: "underline" }}>
                Se désabonner
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
