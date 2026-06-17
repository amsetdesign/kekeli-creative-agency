"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#0C0B09", fontFamily: "Arial, sans-serif" }}>
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: "16px", textAlign: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, display: "flex",
            alignItems: "center", justifyContent: "center", marginBottom: 24,
            background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.25)",
          }}>
            <span style={{ color: "#C8A84B", fontSize: 24, fontWeight: 700 }}>K</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>
            Erreur critique
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, margin: "0 0 32px", maxWidth: 360 }}>
            Une erreur inattendue s&apos;est produite. Réessayez ou contactez-nous si le problème persiste.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={reset} style={{
              padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "#C8A84B", color: "#0C0B09", fontWeight: 600, fontSize: 14,
            }}>
              Réessayer
            </button>
            <a href="/" style={{
              padding: "10px 24px", borderRadius: 12, textDecoration: "none",
              background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontSize: 14,
            }}>
              Accueil
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
