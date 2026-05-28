import { ImageResponse } from "next/og";

export const alt = "KEKELI Creative Agency — Agence de communication à Dakar, Sénégal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0C0B09",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #C8A84B 0%, #E8C96A 50%, #C8A84B 100%)",
            display: "flex",
          }}
        />

        {/* Logo row — top left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            position: "absolute",
            top: 56,
            left: 80,
          }}
        >
          {/* K circle */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "2px solid #C8A84B",
              backgroundColor: "rgba(200,168,75,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C8A84B",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            K
          </div>

          {/* KEKELI.AGENCY text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.2em",
              }}
            >
              <span>KEKELI</span>
              <span style={{ color: "#C8A84B" }}>.</span>
              <span>AGENCY</span>
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                letterSpacing: "0.2em",
                display: "flex",
              }}
            >
              DAKAR, SÉNÉGAL
            </div>
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 28,
            gap: "0 16px",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Mettre la</span>
          <span style={{ color: "#C8A84B", fontStyle: "italic" }}>lumière</span>
          <span style={{ color: "#FFFFFF" }}>sur votre projet.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            letterSpacing: "0.04em",
          }}
        >
          Communication · Stratégie digitale · Photo &amp; Vidéo
        </div>
      </div>
    ),
    { ...size }
  );
}
