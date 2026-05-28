export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 48 48" className="w-full h-full animate-spin" style={{ animationDuration: "1.1s" }}>
          <circle cx="24" cy="24" r="20" fill="none"
            stroke="rgba(200,168,75,0.15)" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="20" fill="none"
            stroke="#C8A84B" strokeWidth="2.5"
            strokeLinecap="round" strokeDasharray="20 106" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold"
          style={{ color: "#C8A84B" }}>
          K
        </span>
      </div>
    </div>
  );
}
