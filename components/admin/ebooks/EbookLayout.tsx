"use client";

/* ─── Design tokens ──────────────────────────────────────── */
export const F  = "'Outfit', sans-serif";
export const FD = "'Cormorant Garamond', serif";
export const DARK = "#0D0C0A";
export const CREAM = "#F8F6F2";
export const GOLD = "#C8A84B";

/* ─── Shared helpers ─────────────────────────────────────── */
export function Spine({ color }: { color: string }) {
  return (
    <div style={{
      width: "5px", flexShrink: 0,
      background: `linear-gradient(180deg, ${color} 0%, ${color}CC 50%, ${color}88 100%)`,
    }} />
  );
}

export function PageFooter({ label, page, total, dark }: { label: string; page: number; total: number; dark?: boolean }) {
  const c = dark ? "rgba(255,255,255,0.2)" : "#B0A89E";
  const border = dark ? "rgba(255,255,255,0.07)" : "#E5E1DC";
  return (
    <div style={{ padding: "10px 36px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${border}`, flexShrink: 0 }}>
      <p style={{ fontFamily: F, fontSize: "8px", color: c, margin: 0, letterSpacing: "0.05em" }}>KEKELI Creative Agency — {label}</p>
      <p style={{ fontFamily: F, fontSize: "8px", color: c, margin: 0 }}>{page} / {total}</p>
    </div>
  );
}

export function PageHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{
      padding: "10px 36px", flexShrink: 0,
      background: DARK,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>{label}</p>
    </div>
  );
}

/* ─── Section components (used inside ContentPage) ──────── */
export function SH2({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontFamily: FD, fontSize: "18px", fontWeight: 700, color: color ?? DARK, margin: "18px 0 6px", lineHeight: 1.2 }}>
      {children}
    </p>
  );
}

export function SH3({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontFamily: F, fontSize: "12px", fontWeight: 700, color: color ?? DARK, margin: "12px 0 4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {children}
    </p>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: F, fontSize: "10.5px", color: "#2A2520", margin: "0 0 8px", lineHeight: 1.75 }}>
      {children}
    </p>
  );
}

export function BulletList({ items, color }: { items: { bold?: string; text: string }[]; color: string }) {
  return (
    <div style={{ margin: "6px 0 10px" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, marginTop: "6px", flexShrink: 0 }} />
          <p style={{ fontFamily: F, fontSize: "10.5px", color: "#2A2520", margin: 0, lineHeight: 1.65 }}>
            {item.bold && <strong style={{ color: DARK }}>{item.bold} </strong>}
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export function NumberedList({ items, color }: { items: string[]; color: string }) {
  return (
    <div style={{ margin: "6px 0 10px" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
            background: `${color}18`, border: `1px solid ${color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color }}>{i + 1}</span>
          </div>
          <p style={{ fontFamily: F, fontSize: "10.5px", color: "#2A2520", margin: 0, lineHeight: 1.65 }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

export function Callout({ text, title, color }: { text: string; title?: string; color: string }) {
  return (
    <div style={{
      margin: "10px 0", padding: "12px 14px",
      borderLeft: `3px solid ${color}`,
      borderRadius: "0 8px 8px 0",
      background: `${color}0D`,
    }}>
      {title && <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>{title}</p>}
      <p style={{ fontFamily: F, fontSize: "10.5px", color: "#2A2520", margin: 0, lineHeight: 1.65 }}>{text}</p>
    </div>
  );
}

export function MiniTable({ headers, rows, color }: { headers: string[]; rows: string[][]; color: string }) {
  return (
    <div style={{ margin: "10px 0", borderRadius: "8px", overflow: "hidden", border: "1px solid #E5E1DB" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
        {headers.map((h, i) => (
          <div key={i} style={{ padding: "7px 10px", background: DARK }}>
            <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.8)", margin: 0, letterSpacing: "0.05em" }}>{h}</p>
          </div>
        ))}
        {rows.map((row, ri) =>
          row.map((cell, ci) => (
            <div key={`${ri}-${ci}`} style={{ padding: "7px 10px", background: ri % 2 === 0 ? "#fff" : CREAM, borderTop: "1px solid #E5E1DB" }}>
              <p style={{ fontFamily: F, fontSize: "9.5px", color: "#2A2520", margin: 0, lineHeight: 1.5 }}>{cell}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function Divider({ color }: { color: string }) {
  return <div style={{ width: "40px", height: "2px", background: `linear-gradient(90deg, ${color}, transparent)`, margin: "10px 0" }} />;
}

/* ─── PAGE TYPES ─────────────────────────────────────────── */

/** Cover page */
export function CoverPage({
  accent, title, titleHighlight, subtitle, badge, chips, stats, guideLabel,
}: {
  accent: string; title: string; titleHighlight?: string; subtitle: string;
  badge: string; chips: { label: string; color: string }[];
  stats: { value: string; label: string }[];
  guideLabel: string;
}) {
  return (
    <div className="ebook-page" style={{
      width: "210mm", minHeight: "297mm", background: DARK,
      display: "flex", position: "relative", overflow: "hidden", pageBreakAfter: "always",
    }}>
      {/* Left spine */}
      <div style={{ width: "6px", flexShrink: 0, background: `linear-gradient(180deg, ${GOLD} 0%, #E8C96A 50%, #9A7A2E 100%)` }} />

      {/* Decorative rings */}
      <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "420px", height: "420px", borderRadius: "50%", border: `1px solid ${accent}12`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "270px", height: "270px", borderRadius: "50%", border: `1px solid ${accent}1E`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "80px", right: "80px", width: "130px", height: "130px", borderRadius: "50%", border: `1px solid ${accent}30`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "120px", right: "120px", width: "50px", height: "50px", borderRadius: "50%", background: `${accent}10`, border: `1px solid ${accent}40`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 50% at 25% 40%, ${accent}07 0%, transparent 60%)`, pointerEvents: "none" }} />

      <div style={{ flex: 1, padding: "40px 40px 32px", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: `${GOLD}18`, border: `1.5px solid ${GOLD}45` }}>
              <span style={{ fontFamily: FD, fontWeight: 700, color: GOLD, fontSize: "23px", lineHeight: 1 }}>K</span>
            </div>
            <div>
              <p style={{ fontFamily: F, fontWeight: 800, color: "#fff", fontSize: "15px", letterSpacing: "0.12em", margin: 0 }}>KEKELI</p>
              <p style={{ fontFamily: F, fontSize: "8px", color: GOLD, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>Creative Agency</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.2)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>{guideLabel}</p>
        </div>

        {/* Headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "99px", marginBottom: "24px", width: "fit-content", background: `${GOLD}12`, border: `1px solid ${GOLD}30` }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: GOLD }} />
            <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase" }}>{badge}</span>
          </div>

          <h1 style={{ fontFamily: FD, fontSize: "58px", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.05, letterSpacing: "-0.01em" }}>
            {title}<br />
            {titleHighlight && <em style={{ color: GOLD, fontStyle: "italic" }}>{titleHighlight}</em>}
          </h1>

          <div style={{ width: "48px", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "20px 0" }} />

          <p style={{ fontFamily: F, fontSize: "12px", color: "rgba(255,255,255,0.45)", maxWidth: "360px", lineHeight: 1.8, margin: "0 0 24px" }}>{subtitle}</p>

          {/* Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {chips.map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "6px", background: `${c.color}12`, border: `1px solid ${c.color}25` }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: c.color }} />
                <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 600, color: c.color }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", marginBottom: "16px" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ flex: 1, padding: "12px 14px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <p style={{ fontFamily: FD, fontSize: "22px", fontWeight: 700, color: GOLD, margin: "0 0 2px" }}>{s.value}</p>
              <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.3)", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "14px", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.2)", margin: 0 }}>kekeli-agency.com</p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.2)", margin: 0 }}>Édition 2025 — Dakar, Sénégal</p>
        </div>
      </div>
    </div>
  );
}

/** Chapter opener */
export function ChapterPage({
  num, title, hook, accent, pageNum, total, guideLabel,
}: {
  num: number; title: string; hook: string; accent: string;
  pageNum: number; total: number; guideLabel: string;
}) {
  return (
    <div className="ebook-page" style={{
      width: "210mm", minHeight: "297mm", background: DARK,
      display: "flex", position: "relative", overflow: "hidden", pageBreakAfter: "always",
    }}>
      <div style={{ width: "6px", flexShrink: 0, background: `linear-gradient(180deg, ${accent} 0%, ${accent}88 100%)` }} />
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "320px", height: "320px", borderRadius: "50%", border: `1px solid ${accent}10`, pointerEvents: "none" }} />

      <div style={{ flex: 1, padding: "48px 40px 32px", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        {/* Watermark number */}
        <div style={{ position: "absolute", bottom: "80px", right: "32px", fontFamily: FD, fontSize: "200px", fontWeight: 700, color: `${accent}12`, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
          {String(num).padStart(2, "0")}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: accent, letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 16px" }}>
            Chapitre {String(num).padStart(2, "0")}
          </p>
          <h2 style={{ fontFamily: FD, fontSize: "44px", fontWeight: 700, color: "#fff", margin: "0 0 20px", lineHeight: 1.1, maxWidth: "420px" }}>{title}</h2>
          <div style={{ width: "44px", height: "2px", background: `linear-gradient(90deg, ${accent}, transparent)`, marginBottom: "20px" }} />
          <p style={{ fontFamily: F, fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "380px", margin: 0 }}>{hook}</p>
        </div>

        <PageFooter label={guideLabel} page={pageNum} total={total} dark />
      </div>
    </div>
  );
}

/** Light content page */
export function ContentPage({
  chapter, accent, pageNum, total, guideLabel, children,
}: {
  chapter: string; accent: string; pageNum: number; total: number; guideLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ebook-page" style={{
      width: "210mm", minHeight: "297mm", background: CREAM,
      display: "flex", pageBreakAfter: "always",
    }}>
      <Spine color={accent} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <PageHeader label={chapter} accent={accent} />
        <div style={{ flex: 1, padding: "20px 36px 12px", overflow: "hidden" }}>
          {children}
        </div>
        <PageFooter label={guideLabel} page={pageNum} total={total} />
      </div>
    </div>
  );
}

/** Dark content page (for stats, key numbers) */
export function DarkPage({
  title, accent, pageNum, total, guideLabel, children,
}: {
  title?: string; accent: string; pageNum: number; total: number; guideLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ebook-page" style={{
      width: "210mm", minHeight: "297mm", background: DARK,
      display: "flex", pageBreakAfter: "always",
    }}>
      <div style={{ width: "6px", flexShrink: 0, background: `linear-gradient(180deg, ${GOLD} 0%, #E8C96A 50%, #9A7A2E 100%)` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {title && (
          <div style={{ padding: "20px 36px 0" }}>
            <p style={{ fontFamily: FD, fontSize: "28px", fontWeight: 700, color: "#fff", margin: 0 }}>{title}</p>
            <div style={{ width: "36px", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "10px 0 0" }} />
          </div>
        )}
        <div style={{ flex: 1, padding: "16px 36px 12px" }}>
          {children}
        </div>
        <PageFooter label={guideLabel} page={pageNum} total={total} dark />
      </div>
    </div>
  );
}

/** Table of contents page */
export function TOCPage({
  chapters, accent, pageNum, total, guideLabel,
}: {
  chapters: { num: number; title: string; sub?: string }[];
  accent: string; pageNum: number; total: number; guideLabel: string;
}) {
  return (
    <div className="ebook-page" style={{
      width: "210mm", minHeight: "297mm", background: CREAM,
      display: "flex", pageBreakAfter: "always",
    }}>
      <Spine color={accent} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 36px 0" }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 6px" }}>Table des matières</p>
          <h2 style={{ fontFamily: FD, fontSize: "28px", fontWeight: 700, color: DARK, margin: "0 0 4px" }}>Ce que tu vas apprendre</h2>
          <div style={{ width: "36px", height: "2px", background: `linear-gradient(90deg, ${accent}, transparent)`, margin: "10px 0 20px" }} />
        </div>
        <div style={{ flex: 1, padding: "0 36px 12px" }}>
          {chapters.map((ch, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "11px 0", borderBottom: i < chapters.length - 1 ? "1px solid #E5E1DB" : "none" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0, background: `${accent}15`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: "10px", fontWeight: 800, color: accent }}>{String(ch.num).padStart(2, "0")}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: F, fontSize: "12px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{ch.title}</p>
                {ch.sub && <p style={{ fontFamily: F, fontSize: "9.5px", color: "#78716C", margin: 0 }}>{ch.sub}</p>}
              </div>
            </div>
          ))}
        </div>
        <PageFooter label={guideLabel} page={pageNum} total={total} />
      </div>
    </div>
  );
}

/** Pull quote page */
export function QuotePage({
  quote, source, accent, pageNum, total, guideLabel,
}: {
  quote: string; source?: string; accent: string; pageNum: number; total: number; guideLabel: string;
}) {
  return (
    <div className="ebook-page" style={{
      width: "210mm", minHeight: "297mm", background: DARK,
      display: "flex", pageBreakAfter: "always",
    }}>
      <div style={{ width: "6px", flexShrink: 0, background: `linear-gradient(180deg, ${accent} 0%, ${accent}88 100%)` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 44px" }}>
          <div style={{ fontFamily: FD, fontSize: "120px", color: `${GOLD}18`, lineHeight: 0.8, marginBottom: "20px" }}>"</div>
          <p style={{ fontFamily: FD, fontSize: "26px", fontStyle: "italic", color: "#fff", lineHeight: 1.55, margin: "0 0 24px" }}>{quote}</p>
          <div style={{ width: "44px", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "16px" }} />
          {source && <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 600, color: GOLD, margin: 0 }}>{source}</p>}
        </div>
        <PageFooter label={guideLabel} page={pageNum} total={total} dark />
      </div>
    </div>
  );
}

/** Closing page */
export function ClosingPage({
  title, titleHighlight, pageNum, total, guideLabel, accent,
}: {
  title: string; titleHighlight?: string; pageNum: number; total: number; guideLabel: string; accent: string;
}) {
  return (
    <div className="ebook-page" style={{
      width: "210mm", minHeight: "297mm", background: DARK,
      display: "flex", pageBreakAfter: "always",
    }}>
      <div style={{ width: "6px", flexShrink: 0, background: `linear-gradient(180deg, ${GOLD} 0%, #E8C96A 50%, #9A7A2E 100%)` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${GOLD}, #E8C96A, #9A7A2E)` }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 40px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${GOLD}18`, border: `1.5px solid ${GOLD}45`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
            <span style={{ fontFamily: FD, fontWeight: 700, color: GOLD, fontSize: "24px", lineHeight: 1 }}>K</span>
          </div>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: GOLD, letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 12px" }}>Pour aller plus loin</p>
          <h3 style={{ fontFamily: FD, fontSize: "36px", fontWeight: 700, color: "#fff", margin: "0 0 8px", lineHeight: 1.15 }}>
            {title}<br />
            {titleHighlight && <em style={{ color: GOLD, fontStyle: "italic" }}>{titleHighlight}</em>}
          </h3>
          <div style={{ width: "40px", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "18px 0" }} />
          <p style={{ fontFamily: F, fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "360px", margin: "0 0 36px" }}>
            L'équipe KEKELI accompagne artistes et entreprises à chaque étape de leur développement.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            {[
              { label: "Site web", value: "kekeli-agency.com" },
              { label: "Email", value: "contact@kekeli-agency.com" },
              { label: "WhatsApp", value: "+221 77 XXX XX XX" },
            ].map((c) => (
              <div key={c.label} style={{ padding: "12px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>{c.label}</p>
                <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 600, color: "#fff", margin: 0 }}>{c.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 40px 18px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.2)", margin: 0 }}>© 2025 KEKELI Creative Agency · Dakar, Sénégal</p>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.2)", margin: 0 }}>{pageNum} / {total}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Viewer shell ───────────────────────────────────────── */
import { useRef } from "react";
import { Download, Eye } from "lucide-react";

export function EbookViewerShell({
  title, subtitle, pageCount, accentColor, children,
}: {
  title: string; subtitle: string; pageCount: number; accentColor: string;
  children: React.ReactNode;
}) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const node = printRef.current;
    if (!node) return;
    const html = node.innerHTML;
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) { alert("Autorisez les popups pour télécharger le PDF."); return; }
    win.document.write(`<!DOCTYPE html><html lang="fr"><head>
<meta charset="UTF-8"/>
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{background:#fff;}
.ebook-page{page-break-after:always;break-after:page;}
.ebook-page:last-child{page-break-after:avoid;break-after:avoid;}
@page{margin:0;size:A4 portrait;}
@media print{html,body{width:210mm;}}
</style></head><body>${html}
<script>document.fonts.ready.then(function(){setTimeout(function(){window.print();},400);});<\/script>
</body></html>`);
    win.document.close();
  };

  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl text-[#0C0B09] mb-1">{title}</h1>
              <p className="font-body text-sm text-[#78716C]">{pageCount} pages · Format A4 · {subtitle}</p>
            </div>
            <button onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`, boxShadow: `0 4px 16px ${accentColor}40` }}>
              <Download size={15} />
              Télécharger PDF
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-6 font-body text-xs"
            style={{ background: "rgba(200,168,75,0.07)", border: "1px solid rgba(200,168,75,0.2)", color: "#78716C" }}>
            <Eye size={13} style={{ color: "#C8A84B", flexShrink: 0 }} />
            <span>Aperçu ci-dessous. Cliquez sur <strong className="text-[#0C0B09]">Télécharger PDF</strong> puis choisissez "Enregistrer en PDF" dans la boîte d'impression.</span>
          </div>
          <div ref={printRef}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
