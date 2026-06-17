const METHODS = [
  { label: "Wave",         dot: "#1A90FF", bg: "rgba(26,144,255,0.12)",  border: "rgba(26,144,255,0.30)" },
  { label: "Orange Money", dot: "#FF6B00", bg: "rgba(255,107,0,0.12)",   border: "rgba(255,107,0,0.30)"  },
  { label: "PayPal",       dot: "#009CDE", bg: "rgba(0,156,222,0.12)",   border: "rgba(0,156,222,0.30)"  },
  { label: "Virement",     dot: "#C8A84B", bg: "rgba(200,168,75,0.12)",  border: "rgba(200,168,75,0.30)" },
];

export default function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <span className="font-body text-[11px] mr-1" style={{ color: "rgba(220,210,255,0.45)" }}>
        Paiement accepté :
      </span>
      {METHODS.map(({ label, dot, bg, border }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-body text-[11px] font-medium"
          style={{ background: bg, border: `1px solid ${border}`, color: "rgba(255,255,255,0.80)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
          {label}
        </span>
      ))}
    </div>
  );
}
