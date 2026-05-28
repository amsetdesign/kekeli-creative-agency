import type { Lead } from "@/lib/supabase";

interface Props {
  leads: Lead[];
}

const TYPE_COLORS: Record<string, string> = {
  contact: "#4C9BFF",
  brief:   "#8B5CF6",
  artiste: "#C8A84B",
  sondage: "#10B981",
  projet:  "#14B8A6",
};

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact",
  brief:   "Brief",
  artiste: "Artiste",
  sondage: "Sondage",
  projet:  "Projet",
};

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function dayLabel(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("fr-FR", { weekday: "short" }).charAt(0).toUpperCase() +
    d.toLocaleDateString("fr-FR", { weekday: "short" }).slice(1, 3);
}

function BarChart({ leads }: { leads: Lead[] }) {
  const days = getLast7Days();

  const countByDay: Record<string, number> = {};
  for (const d of days) countByDay[d] = 0;
  for (const lead of leads) {
    const day = lead.created_at.slice(0, 10);
    if (day in countByDay) countByDay[day]++;
  }

  const counts = days.map((d) => countByDay[d]);
  const max = Math.max(...counts, 1);

  // viewBox 0 0 280 130, chart area y:10–100, labels y:110–130
  const CHART_H = 80;
  const CHART_TOP = 14;
  const BAR_W = 24;
  const COL_W = 40;

  // Count leads in last 7 days vs previous 7
  const thisWeek = counts.reduce((a, b) => a + b, 0);
  const prevWeekLeads = leads.filter((l) => {
    const d = new Date(l.created_at);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 86400000;
    return diff >= 7 && diff < 14;
  }).length;
  const delta = thisWeek - prevWeekLeads;

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-body text-xs font-semibold text-[#78716C] uppercase tracking-wide mb-0.5">Leads — 7 derniers jours</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-[#0C0B09]">{thisWeek}</span>
            {delta !== 0 && (
              <span className={`font-body text-xs font-semibold ${delta > 0 ? "text-emerald-600" : "text-red-500"}`}>
                {delta > 0 ? `+${delta}` : delta} vs semaine préc.
              </span>
            )}
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 280 ${CHART_TOP + CHART_H + 30}`} className="w-full">
        {/* Gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = CHART_TOP + CHART_H - t * CHART_H;
          return (
            <g key={t}>
              <line x1="0" y1={y} x2="280" y2={y} stroke="#F5F5F4" strokeWidth="1" />
              {t > 0 && (
                <text x="0" y={y - 2} fill="#A8A29E" fontSize="8" fontFamily="sans-serif">
                  {Math.round(t * max)}
                </text>
              )}
            </g>
          );
        })}

        {/* Bars */}
        {days.map((day, i) => {
          const count = countByDay[day];
          const barH = (count / max) * CHART_H;
          const x = i * COL_W + (COL_W - BAR_W) / 2;
          const y = CHART_TOP + CHART_H - barH;
          const isToday = i === 6;

          return (
            <g key={day}>
              {/* Background track */}
              <rect x={x} y={CHART_TOP} width={BAR_W} height={CHART_H}
                fill="#F5F5F4" rx="4" />
              {/* Value bar */}
              {count > 0 && (
                <rect x={x} y={y} width={BAR_W} height={barH}
                  fill={isToday ? "#C8A84B" : "#0C0B09"} rx="4" />
              )}
              {/* Count above bar */}
              {count > 0 && (
                <text x={x + BAR_W / 2} y={y - 4} fill={isToday ? "#C8A84B" : "#78716C"}
                  fontSize="9" textAnchor="middle" fontFamily="sans-serif" fontWeight="600">
                  {count}
                </text>
              )}
              {/* Day label */}
              <text x={x + BAR_W / 2} y={CHART_TOP + CHART_H + 16}
                fill={isToday ? "#C8A84B" : "#A8A29E"}
                fontSize="9" textAnchor="middle" fontFamily="sans-serif"
                fontWeight={isToday ? "700" : "400"}>
                {dayLabel(day)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DonutChart({ leads }: { leads: Lead[] }) {
  const types = ["contact", "brief", "artiste", "sondage", "projet"];
  const counts = types.map((t) => ({ type: t, count: leads.filter((l) => l.type === t).length }));
  const total = leads.length;

  const R = 44;
  const STROKE_W = 14;
  const CX = 60;
  const CY = 60;
  const circumference = 2 * Math.PI * R;

  let offsetDeg = 0;
  const segments = counts.map(({ type, count }) => {
    const pct = total > 0 ? count / total : 0;
    const len = pct * circumference;
    const seg = { type, count, pct, len, offset: offsetDeg };
    offsetDeg += len;
    return seg;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5">
      <p className="font-body text-xs font-semibold text-[#78716C] uppercase tracking-wide mb-1">Répartition par type</p>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-display text-2xl font-bold text-[#0C0B09]">{total}</span>
        <span className="font-body text-xs text-[#A8A29E]">leads au total</span>
      </div>

      <div className="flex items-center gap-5">
        {/* Donut */}
        <svg viewBox="0 0 120 120" className="w-28 h-28 shrink-0">
          {total === 0 ? (
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F5F5F4" strokeWidth={STROKE_W} />
          ) : (
            segments.map(({ type, len, offset }) => (
              <circle key={type}
                cx={CX} cy={CY} r={R}
                fill="none"
                stroke={TYPE_COLORS[type] ?? "#E7E5E4"}
                strokeWidth={STROKE_W}
                strokeLinecap="butt"
                strokeDasharray={`${len} ${circumference}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${CX} ${CY})`}
              />
            ))
          )}
          {/* Center total */}
          <text x={CX} y={CY - 4} fill="#0C0B09" fontSize="16" textAnchor="middle"
            fontFamily="sans-serif" fontWeight="700">{total}</text>
          <text x={CX} y={CY + 9} fill="#A8A29E" fontSize="8" textAnchor="middle"
            fontFamily="sans-serif">total</text>
        </svg>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {segments.filter(({ count }) => count > 0).map(({ type, count, pct }) => (
            <div key={type} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: TYPE_COLORS[type] ?? "#E7E5E4" }} />
                <span className="font-body text-xs text-[#44403C] truncate">
                  {TYPE_LABELS[type] ?? type}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-body text-xs font-semibold text-[#0C0B09]">{count}</span>
                <span className="font-body text-[10px] text-[#A8A29E]">
                  {Math.round(pct * 100)}%
                </span>
              </div>
            </div>
          ))}
          {total === 0 && (
            <p className="font-body text-xs text-[#A8A29E]">Aucun lead pour l&apos;instant</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminCharts({ leads }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <BarChart leads={leads} />
      <DonutChart leads={leads} />
    </div>
  );
}
