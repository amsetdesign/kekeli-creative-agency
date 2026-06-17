import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "KEKELI Creative Agency — Mettre la lumière sur votre projet";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: "#0C0B09",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Cercles décoratifs */}
        <div style={{
          position: "absolute", top: -180, right: -180,
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,168,75,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -120, left: -120,
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,168,75,0.08) 0%, transparent 70%)",
        }} />

        {/* Ligne dorée haut */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #C8A84B, transparent)",
        }} />

        {/* Logo K */}
        <div style={{
          width: 88, height: 88, borderRadius: 22,
          background: "rgba(200,168,75,0.12)",
          border: "1.5px solid rgba(200,168,75,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32,
        }}>
          <span style={{ color: "#C8A84B", fontSize: 48, fontWeight: 700 }}>K</span>
        </div>

        {/* Titre */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{
            color: "#FFFFFF", fontSize: 56, fontWeight: 700, letterSpacing: "-1px",
            lineHeight: 1.1, textAlign: "center",
          }}>
            KEKELI Creative Agency
          </span>
          <span style={{
            color: "#C8A84B", fontSize: 22, fontWeight: 400, letterSpacing: "3px",
            textTransform: "uppercase",
          }}>
            Mettre la lumière sur votre projet
          </span>
        </div>

        {/* Séparateur */}
        <div style={{
          width: 64, height: 1.5, background: "rgba(200,168,75,0.4)",
          marginTop: 36, marginBottom: 28,
        }} />

        {/* Chips */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Artistes", "Entreprises", "Personnalités", "Dakar, Sénégal"].map((tag) => (
            <div key={tag} style={{
              padding: "8px 18px", borderRadius: 50,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.55)", fontSize: 15, fontFamily: "sans-serif",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <span style={{
          position: "absolute", bottom: 30,
          color: "rgba(200,168,75,0.45)", fontSize: 14,
          fontFamily: "sans-serif", letterSpacing: "1px",
        }}>
          kekeli.agency
        </span>

        {/* Ligne dorée bas */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #C8A84B, transparent)",
        }} />
      </div>
    ),
    { ...size },
  );
}
