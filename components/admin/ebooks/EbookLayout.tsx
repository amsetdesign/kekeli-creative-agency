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
          <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.2)", margin: 0 }}>kekelicreativeagency@gmail.com</p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(255,255,255,0.2)", margin: 0 }}>Édition 2026 — Dakar, Sénégal</p>
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
      display: "flex", pageBreakAfter: "always", position: "relative", overflow: "hidden",
    }}>
      {/* Decorative watermark K bottom-right */}
      <span aria-hidden style={{
        position: "absolute", bottom: "-20px", right: "-10px",
        fontFamily: "'Cormorant Garamond', serif", fontSize: "200px", fontWeight: 700,
        color: `${accent}07`, lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>K</span>
      {/* Decorative dot grid top-right */}
      <div aria-hidden style={{
        position: "absolute", top: "40px", right: "16px", width: "40px", height: "40px",
        backgroundImage: `radial-gradient(circle, ${accent}25 1px, transparent 1px)`,
        backgroundSize: "6px 6px", pointerEvents: "none",
      }} />
      <Spine color={accent} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        <PageHeader label={chapter} accent={accent} />
        <div style={{ flex: 1, padding: "20px 36px 12px" }}>
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
              { label: "Site web", value: "kekelicreativeagency.com" },
              { label: "Email", value: "kekelicreativeagency@gmail.com" },
              { label: "WhatsApp", value: "+221 78 167 28 19" },
            ].map((c) => (
              <div key={c.label} style={{ padding: "12px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>{c.label}</p>
                <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 600, color: "#fff", margin: 0 }}>{c.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 40px 18px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.2)", margin: 0 }}>© 2026 KEKELI Creative Agency · Dakar, Sénégal</p>
          <p style={{ fontFamily: F, fontSize: "8px", color: "rgba(255,255,255,0.2)", margin: 0 }}>{pageNum} / {total}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Extended visual components ────────────────────────── */

/** Artiste A vs Artiste B comparison */
export function CaseStudy({
  title, subtitle, left, right, color,
}: {
  title: string; subtitle?: string; color: string;
  left: { label: string; emoji: string; items: string[]; result: string };
  right: { label: string; emoji: string; items: string[]; result: string };
}) {
  return (
    <div style={{ margin: "10px 0", borderRadius: "12px", overflow: "hidden", border: `1px solid ${color}30` }}>
      <div style={{ padding: "10px 14px", background: `${color}15`, borderBottom: `1px solid ${color}20` }}>
        <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 800, color, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</p>
        {subtitle && <p style={{ fontFamily: F, fontSize: "9px", color: "#78716C", margin: 0 }}>{subtitle}</p>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {[left, right].map((side, i) => (
          <div key={i} style={{ padding: "12px", background: i === 0 ? "#FEF2F2" : "#F0FDF4", borderRight: i === 0 ? "1px solid #E5E7EB" : "none" }}>
            <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 800, color: i === 0 ? "#DC2626" : "#16A34A", margin: "0 0 6px" }}>{side.emoji} {side.label}</p>
            {side.items.map((item, j) => (
              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "5px", marginBottom: "4px" }}>
                <span style={{ color: i === 0 ? "#DC2626" : "#16A34A", fontSize: "9px", fontWeight: 700, flexShrink: 0 }}>{i === 0 ? "✗" : "✓"}</span>
                <p style={{ fontFamily: F, fontSize: "9px", color: "#44403C", margin: 0, lineHeight: 1.55 }}>{item}</p>
              </div>
            ))}
            <div style={{ marginTop: "8px", padding: "6px 8px", borderRadius: "6px", background: i === 0 ? "#FCA5A5" : "#86EFAC" }}>
              <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color: i === 0 ? "#991B1B" : "#14532D", margin: 0 }}>{side.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tool comparison card */
export function ToolCard({
  name, logo, price, for: forWho, pros, cons, verdict, color,
}: {
  name: string; logo: string; price: string; for: string;
  pros: string[]; cons: string[]; verdict: string; color: string;
}) {
  return (
    <div style={{ padding: "12px", borderRadius: "10px", background: "#fff", border: `1px solid ${color}25`, boxShadow: `0 2px 8px ${color}10`, marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <p style={{ fontFamily: F, fontSize: "13px", fontWeight: 800, color: DARK, margin: "0 0 2px" }}>{logo} {name}</p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#78716C", margin: 0 }}>{forWho}</p>
        </div>
        <div style={{ padding: "3px 8px", borderRadius: "99px", background: `${color}15`, border: `1px solid ${color}30` }}>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color, margin: 0 }}>{price}</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
        <div>
          <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>✓ Points forts</p>
          {pros.map((p, i) => <p key={i} style={{ fontFamily: F, fontSize: "9px", color: "#374151", margin: "0 0 2px", paddingLeft: "8px" }}>• {p}</p>)}
        </div>
        <div>
          <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>✗ Limites</p>
          {cons.map((c, i) => <p key={i} style={{ fontFamily: F, fontSize: "9px", color: "#374151", margin: "0 0 2px", paddingLeft: "8px" }}>• {c}</p>)}
        </div>
      </div>
      <div style={{ padding: "6px 10px", borderRadius: "6px", background: `${color}10`, borderLeft: `3px solid ${color}` }}>
        <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color, margin: 0 }}>Verdict : {verdict}</p>
      </div>
    </div>
  );
}

/** Big stat / metric display */
export function StatRow({ stats, color }: { stats: { value: string; label: string; sub?: string }[]; color: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: "8px", margin: "10px 0" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ textAlign: "center", padding: "12px 8px", borderRadius: "10px", background: `${color}08`, border: `1px solid ${color}20` }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 700, color, margin: "0 0 2px" }}>{s.value}</p>
          <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 600, color: DARK, margin: "0 0 2px" }}>{s.label}</p>
          {s.sub && <p style={{ fontFamily: F, fontSize: "8px", color: "#78716C", margin: 0 }}>{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}

/** Simulated screenshot / UI mockup */
export function ScreenMock({
  platform, title, color, children,
}: {
  platform: string; title: string; color: string; children: React.ReactNode;
}) {
  return (
    <div style={{ margin: "8px 0", borderRadius: "10px", overflow: "hidden", border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
      <div style={{ padding: "6px 12px", background: DARK, display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {["#FF5F57", "#FFBC2E", "#28C840"].map((c) => <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, height: "16px", borderRadius: "99px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: F, fontSize: "7px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{platform}</p>
        </div>
      </div>
      <div style={{ padding: "10px 12px", background: "#F9FAFB" }}>
        <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>📱 {title}</p>
        {children}
      </div>
    </div>
  );
}

/** Artist profile mini card */
export function ArtistCard({
  name, genre, country, followers, revenue, status, color,
}: {
  name: string; genre: string; country: string;
  followers: string; revenue: string; status: "success" | "fail"; color: string;
}) {
  return (
    <div style={{
      padding: "10px 12px", borderRadius: "10px", background: status === "success" ? "#F0FDF4" : "#FEF2F2",
      border: `1px solid ${status === "success" ? "#86EFAC" : "#FCA5A5"}`, marginBottom: "6px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 800, color: DARK, margin: "0 0 2px" }}>
            {status === "success" ? "✅" : "❌"} {name}
          </p>
          <p style={{ fontFamily: F, fontSize: "9px", color: "#78716C", margin: 0 }}>{genre} · {country}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, color, margin: "0 0 1px" }}>{followers}</p>
          <p style={{ fontFamily: F, fontSize: "8px", color: "#78716C", margin: 0 }}>{revenue}</p>
        </div>
      </div>
    </div>
  );
}

/** Process timeline horizontal */
export function ProcessLine({ steps, color }: {
  steps: { num: string; title: string; desc: string }[]; color: string;
}) {
  return (
    <div style={{ margin: "8px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: "14px", left: "14px", right: "14px", height: "1px", background: `${color}30` }} />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: "6px", position: "relative" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px", flexShrink: 0, position: "relative", zIndex: 1 }}>
              <span style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color: "#fff" }}>{s.num}</span>
            </div>
            <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 700, color: DARK, margin: "0 0 3px" }}>{s.title}</p>
            <p style={{ fontFamily: F, fontSize: "8.5px", color: "#78716C", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Checklist with checkboxes */
export function Checklist({ items, color, title }: { items: string[]; color: string; title?: string }) {
  return (
    <div style={{ margin: "8px 0", padding: "10px 12px", borderRadius: "8px", background: `${color}06`, border: `1px solid ${color}20` }}>
      {title && <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>{title}</p>}
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "14px", height: "14px", borderRadius: "3px", border: `1.5px solid ${color}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color, fontSize: "9px", fontWeight: 700 }}>✓</span>
          </div>
          <p style={{ fontFamily: F, fontSize: "9.5px", color: "#374151", margin: 0, lineHeight: 1.55 }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

/** Inline quote / testimony */
export function Testimony({ text, author, role, color }: { text: string; author: string; role: string; color: string }) {
  return (
    <div style={{ margin: "10px 0", padding: "12px 14px", borderRadius: "10px", background: `${color}08`, border: `1px solid ${color}20`, position: "relative" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", color: `${color}25`, lineHeight: 0.8, marginBottom: "4px" }}>"</div>
      <p style={{ fontFamily: F, fontSize: "10.5px", fontStyle: "italic", color: "#374151", margin: "0 0 8px", lineHeight: 1.65 }}>{text}</p>
      <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color, margin: "0 0 1px" }}>{author}</p>
      <p style={{ fontFamily: F, fontSize: "8px", color: "#78716C", margin: 0 }}>{role}</p>
    </div>
  );
}

/** Budget template row */
export function BudgetTable({ title, rows, color }: {
  title: string; color: string;
  rows: { item: string; min: string; max: string; priority: "haute" | "moyenne" | "basse" }[];
}) {
  const pColors: Record<string, string> = { haute: "#DC2626", moyenne: "#D97706", basse: "#16A34A" };
  return (
    <div style={{ margin: "8px 0", borderRadius: "10px", overflow: "hidden", border: `1px solid ${color}25` }}>
      <div style={{ padding: "8px 12px", background: color }}>
        <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 800, color: "#fff", margin: 0 }}>{title}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", background: DARK }}>
        {["Poste", "Min (FCFA)", "Max (FCFA)", "Priorité"].map((h) => (
          <div key={h} style={{ padding: "5px 8px" }}>
            <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.6)", margin: 0 }}>{h}</p>
          </div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", background: i % 2 === 0 ? "#fff" : CREAM, borderTop: "1px solid #E5E7EB" }}>
          <div style={{ padding: "5px 8px" }}><p style={{ fontFamily: F, fontSize: "9px", color: DARK, margin: 0 }}>{r.item}</p></div>
          <div style={{ padding: "5px 8px" }}><p style={{ fontFamily: F, fontSize: "9px", color: "#374151", margin: 0, whiteSpace: "nowrap" }}>{r.min}</p></div>
          <div style={{ padding: "5px 8px" }}><p style={{ fontFamily: F, fontSize: "9px", color: "#374151", margin: 0, whiteSpace: "nowrap" }}>{r.max}</p></div>
          <div style={{ padding: "5px 8px" }}>
            <span style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color: pColors[r.priority], padding: "1px 6px", borderRadius: "99px", background: `${pColors[r.priority]}15` }}>{r.priority}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Phone mockup — simulates a TikTok/Instagram screen */
export function PhoneMock({ platform, color, lines }: {
  platform: string; color: string;
  lines: { type: "avatar" | "text" | "image" | "stat" | "button"; content?: string; sub?: string }[];
}) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", width: "130px", borderRadius: "18px", overflow: "hidden", border: "2px solid #1F2937", boxShadow: "0 8px 24px rgba(0,0,0,0.18)", margin: "0 auto" }}>
      {/* Status bar */}
      <div style={{ background: DARK, padding: "5px 10px 2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: F, fontSize: "6px", color: "rgba(255,255,255,0.6)" }}>9:41</span>
        <span style={{ fontFamily: F, fontSize: "6px", color: "rgba(255,255,255,0.6)" }}>▓▓ WiFi</span>
      </div>
      {/* App header */}
      <div style={{ background: "#000", padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 800, color, margin: 0, letterSpacing: "0.05em" }}>{platform}</p>
      </div>
      {/* Content */}
      <div style={{ background: "#000", flex: 1, padding: "6px 8px" }}>
        {lines.map((line, i) => {
          if (line.type === "avatar") return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${color}40`, border: `1.5px solid ${color}`, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: F, fontSize: "7px", fontWeight: 700, color: "#fff", margin: 0 }}>{line.content}</p>
                {line.sub && <p style={{ fontFamily: F, fontSize: "6px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{line.sub}</p>}
              </div>
            </div>
          );
          if (line.type === "image") return (
            <div key={i} style={{ width: "100%", height: "60px", borderRadius: "6px", background: `linear-gradient(135deg, ${color}20, ${color}08)`, marginBottom: "4px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${color}20` }}>
              <span style={{ fontFamily: F, fontSize: "8px", color: `${color}80` }}>▶ {line.content}</span>
            </div>
          );
          if (line.type === "stat") return (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
              {(line.content ?? "").split("|").map((s, j) => (
                <div key={j} style={{ flex: 1, textAlign: "center" }}>
                  <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color, margin: 0 }}>{s.split(":")[0]}</p>
                  <p style={{ fontFamily: F, fontSize: "5.5px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{s.split(":")[1]}</p>
                </div>
              ))}
            </div>
          );
          if (line.type === "button") return (
            <div key={i} style={{ padding: "4px 0", borderRadius: "4px", background: color, textAlign: "center", marginBottom: "4px" }}>
              <p style={{ fontFamily: F, fontSize: "7px", fontWeight: 700, color: "#fff", margin: 0 }}>{line.content}</p>
            </div>
          );
          return (
            <p key={i} style={{ fontFamily: F, fontSize: "7px", color: "rgba(255,255,255,0.7)", margin: "0 0 3px", lineHeight: 1.4 }}>{line.content}</p>
          );
        })}
      </div>
    </div>
  );
}

/** Three-phone showcase (side by side) */
export function PhoneShowcase({ phones, color }: {
  color: string;
  phones: { label: string; platform: string; lines: Parameters<typeof PhoneMock>[0]["lines"] }[];
}) {
  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "flex-start", marginBottom: "8px" }}>
        {phones.map((ph, i) => <PhoneMock key={i} platform={ph.platform} color={color} lines={ph.lines} />)}
      </div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        {phones.map((ph, i) => (
          <div key={i} style={{ width: "130px", textAlign: "center" }}>
            <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 700, color, margin: 0 }}>{ph.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Horizontal bar chart */
export function BarChart({ title, bars, color }: {
  title?: string; color: string;
  bars: { label: string; value: number; display: string }[];
}) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div style={{ margin: "8px 0" }}>
      {title && <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>{title}</p>}
      {bars.map((b, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
          <p style={{ fontFamily: F, fontSize: "8.5px", color: DARK, margin: 0, width: "90px", flexShrink: 0, textAlign: "right" }}>{b.label}</p>
          <div style={{ flex: 1, height: "14px", background: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: `${(b.value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}CC)`, borderRadius: "3px" }} />
          </div>
          <p style={{ fontFamily: F, fontSize: "8.5px", fontWeight: 700, color, margin: 0, width: "45px", flexShrink: 0 }}>{b.display}</p>
        </div>
      ))}
    </div>
  );
}

/** Visual info card grid (2 or 3 cols) */
export function InfoGrid({ items, cols = 2, color }: {
  cols?: 2 | 3; color: string;
  items: { emoji: string; title: string; desc: string; badge?: string }[];
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "7px", margin: "8px 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{
          padding: "10px 10px 8px", borderRadius: "8px", background: "#fff",
          border: `1px solid ${color}20`, boxShadow: `0 2px 6px ${color}10`,
          display: "flex", flexDirection: "column",
        }}>
          <span style={{ fontSize: "22px", marginBottom: "5px" }}>{item.emoji}</span>
          {item.badge && (
            <span style={{ fontFamily: F, fontSize: "7px", fontWeight: 700, color, background: `${color}15`, padding: "1px 5px", borderRadius: "99px", width: "fit-content", marginBottom: "4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.badge}</span>
          )}
          <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 700, color: DARK, margin: "0 0 3px" }}>{item.title}</p>
          <p style={{ fontFamily: F, fontSize: "8.5px", color: "#6B7280", margin: 0, lineHeight: 1.55 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** Large pull quote / big typography */
export function BigQuote({ text, author, color }: { text: string; author: string; color: string }) {
  return (
    <div style={{ margin: "10px 0", padding: "16px 18px", borderRadius: "12px", background: `linear-gradient(135deg, ${color}08, ${color}04)`, border: `1px solid ${color}25`, position: "relative" }}>
      <div style={{ position: "absolute", top: "8px", left: "14px", fontFamily: "'Cormorant Garamond', serif", fontSize: "60px", color: `${color}20`, lineHeight: 1 }}>"</div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontStyle: "italic", color: DARK, lineHeight: 1.6, margin: "16px 0 10px", paddingLeft: "8px" }}>{text}</p>
      <div style={{ width: "30px", height: "2px", background: `linear-gradient(90deg, ${color}, transparent)`, marginBottom: "6px" }} />
      <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, color, margin: 0 }}>{author}</p>
    </div>
  );
}

/** Two-column text layout */
export function TwoColumnText({ left, right, color }: {
  left: React.ReactNode; right: React.ReactNode; color: string;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", margin: "8px 0" }}>
      <div style={{ borderRight: `1px dashed ${color}25`, paddingRight: "12px" }}>{left}</div>
      <div>{right}</div>
    </div>
  );
}

/** Highlight banner (full-width accent block) */
export function Banner({ text, sub, color, dark = false }: { text: string; sub?: string; color: string; dark?: boolean }) {
  return (
    <div style={{
      margin: "10px 0", padding: "14px 16px", borderRadius: "10px",
      background: dark ? DARK : `linear-gradient(135deg, ${color}15, ${color}08)`,
      border: `1px solid ${color}${dark ? "30" : "25"}`,
      display: "flex", alignItems: "center", gap: "12px",
    }}>
      <div style={{ width: "4px", height: "36px", borderRadius: "2px", background: color, flexShrink: 0 }} />
      <div>
        <p style={{ fontFamily: F, fontSize: "11px", fontWeight: 800, color: dark ? "#fff" : DARK, margin: "0 0 2px" }}>{text}</p>
        {sub && <p style={{ fontFamily: F, fontSize: "9px", color: dark ? "rgba(255,255,255,0.55)" : "#6B7280", margin: 0 }}>{sub}</p>}
      </div>
    </div>
  );
}

/** Vertical timeline */
export function VerticalTimeline({ events, color }: {
  color: string;
  events: { year: string; title: string; desc: string }[];
}) {
  return (
    <div style={{ margin: "8px 0", position: "relative", paddingLeft: "28px" }}>
      <div style={{ position: "absolute", left: "10px", top: "8px", bottom: "8px", width: "2px", background: `${color}25` }} />
      {events.map((ev, i) => (
        <div key={i} style={{ position: "relative", marginBottom: "10px" }}>
          <div style={{ position: "absolute", left: "-22px", top: "3px", width: "14px", height: "14px", borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />
          </div>
          <div style={{ padding: "7px 10px", borderRadius: "6px", background: "#fff", border: `1px solid ${color}20` }}>
            <p style={{ fontFamily: F, fontSize: "8px", fontWeight: 800, color, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{ev.year}</p>
            <p style={{ fontFamily: F, fontSize: "9.5px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{ev.title}</p>
            <p style={{ fontFamily: F, fontSize: "9px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{ev.desc}</p>
          </div>
        </div>
      ))}
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
