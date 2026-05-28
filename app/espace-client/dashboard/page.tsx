import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase, type Project } from "@/lib/supabase";
import {
  FolderOpen, MessageSquare, CheckCircle, ArrowRight, Sparkles,
  Mic2, Music2, Zap, BrainCircuit, Clock, BookOpen, Download,
} from "lucide-react";
import DashboardClient from "@/components/espace-client/DashboardClient";
import LevelBadge from "@/components/espace-client/LevelBadge";
import { computeLevel } from "@/lib/computeLevel";
import DashboardStats from "@/components/espace-client/DashboardStats";

export const metadata: Metadata = { title: "Tableau de bord — Espace Client KEKELI" };
export const dynamic = "force-dynamic";

/* ── Status helpers ─────────────────────────────────────── */
const STATUS_LABELS: Record<Project["status"], string> = {
  en_attente: "En attente", en_cours: "En cours", termine: "Terminé", suspendu: "Suspendu",
};
const STATUS_COLORS: Record<Project["status"], { bg: string; text: string; dot: string }> = {
  en_attente: { bg: "bg-amber-50",   text: "text-amber-700",   dot: "#F59E0B" },
  en_cours:   { bg: "bg-blue-50",    text: "text-blue-700",    dot: "#3B82F6" },
  termine:    { bg: "bg-emerald-50", text: "text-emerald-700", dot: "#10B981" },
  suspendu:   { bg: "bg-stone-100",  text: "text-stone-500",   dot: "#A8A29E" },
};

/* ── Service recommendations from besoins[] ─────────────── */
const BESOINS_MAP: Record<string, { label: string; href: string; color: string; icon: string }> = {
  "Identité visuelle / Branding": { label: "Branding",         href: "/artistes/branding",       color: "#8B5CF6", icon: "🎨" },
  "Clips & Vidéos":               { label: "Clips & Vidéos",   href: "/artistes/clips",           color: "#EC4899", icon: "🎬" },
  "Photo shooting":               { label: "Photo Shooting",   href: "/artistes/photo",           color: "#06B6D4", icon: "📷" },
  "Stratégie digitale":           { label: "Stratégie",        href: "/artistes/strategie",       color: "#4C9BFF", icon: "📈" },
  "Distribution musicale":        { label: "Distribution",     href: "/artistes/distribution",    color: "#F59E0B", icon: "🎵" },
  "Marketing & Publicité":        { label: "Marketing",        href: "/artistes/marketing",       color: "#F97316", icon: "📣" },
  "Site web / EPK":               { label: "Identité Digitale",href: "/artistes/identite",        color: "#FF6B6B", icon: "🌐" },
  "Monétisation":                 { label: "Monétisation",     href: "/artistes/monetisation",    color: "#16A34A", icon: "💰" },
  "Accompagnement carrière":      { label: "Accompagnement",   href: "/artistes/accompagnement",  color: "#10B981", icon: "🤝" },
  "Direction artistique":         { label: "Direction Artistique",href:"/artistes/direction",     color: "#7C3AED", icon: "✨" },
};

/* ── Mini progress ring ─────────────────────────────────── */
function ProgressRing({ progress, color = "#C8A84B" }: { progress: number; color?: string }) {
  const r = 14, circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90 shrink-0">
      <circle cx="18" cy="18" r={r} fill="none" stroke="#F5F5F4" strokeWidth="3" />
      <circle cx="18" cy="18" r={r} fill="none" stroke={color} strokeWidth="3"
        strokeDasharray={`${(progress / 100) * circ} ${circ}`} strokeLinecap="round" />
    </svg>
  );
}

/* ── Relative time ──────────────────────────────────────── */
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "À l'instant";
  if (m < 60) return `Il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `Il y a ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7)  return `Il y a ${d}j`;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

/* ── Page ───────────────────────────────────────────────── */
export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const db = getSupabase();

  const [profileRes, projectsRes] = await Promise.all([
    db.from("client_profiles").select("full_name, company, artist_profile").eq("id", user.id).single(),
    db.from("projects").select("*").eq("client_id", user.id).order("updated_at", { ascending: false }),
  ]);

  const profile    = profileRes.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const artistProfile = (profile as any)?.artist_profile as {
    nom_artiste?: string; genre_musical?: string; niveau?: string;
    besoins?: string[]; description?: string;
  } | null ?? null;
  const projects        = (projectsRes.data ?? []) as Project[];
  const activeProjects  = projects.filter((p) => p.status === "en_cours").length;
  const completedProjects = projects.filter((p) => p.status === "termine").length;

  /* Unread messages */
  let unreadCount = 0;
  if (projects.length > 0) {
    const { data: msgs } = await db
      .from("project_messages").select("id")
      .in("project_id", projects.map((p) => p.id))
      .eq("sender_type", "agency").is("read_at", null);
    unreadCount = msgs?.length ?? 0;
  }

  /* Recent project updates (activity feed) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentUpdates: any[] = [];
  if (projects.length > 0) {
    const { data } = await db
      .from("project_updates")
      .select("id, title, created_at, project_id")
      .in("project_id", projects.map((p) => p.id))
      .order("created_at", { ascending: false })
      .limit(6);
    recentUpdates = data ?? [];
  }

  const firstName    = profile?.full_name?.split(" ")[0] ?? "Client";
  const isEntrepreneur = !!profile?.company || !artistProfile;
  const level        = computeLevel(artistProfile, projects.length, completedProjects);
  const recommendations = (artistProfile?.besoins ?? [])
    .map((b) => BESOINS_MAP[b]).filter(Boolean).slice(0, 4);

  const statusDotColor = (s: Project["status"]) => STATUS_COLORS[s].dot;

  return (
    <div className="max-w-5xl">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl text-[#0C0B09] mb-0.5">
            Bonjour, {firstName} 👋
          </h1>
          {profile?.company && <p className="font-body text-sm text-[#78716C]">{profile.company}</p>}
        </div>
        <div className="flex items-start gap-3 shrink-0">
          <LevelBadge level={level} showCriteria />
          <DashboardClient clientName={profile?.full_name ?? firstName} />
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────── */}
      <DashboardStats
        total={projects.length}
        active={activeProjects}
        completed={completedProjects}
        unread={unreadCount}
      />

      {/* ── Main grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

        {/* Projects — 3 cols */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-base font-semibold text-[#0C0B09]">Mes projets</h2>
            <Link href="/espace-client/projets"
              className="font-body text-xs text-[#78716C] hover:text-[#0C0B09] flex items-center gap-1 transition-colors">
              Tout voir <ArrowRight size={11} />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F5F4] flex items-center justify-center mx-auto mb-3">
                <FolderOpen size={20} className="text-[#A8A29E]" />
              </div>
              <p className="font-body text-sm text-[#78716C] mb-1">Aucun projet pour le moment</p>
              <p className="font-body text-xs text-[#A8A29E]">Utilisez <strong>Nouveau projet</strong> pour démarrer</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {projects.slice(0, 5).map((project) => {
                const sc = STATUS_COLORS[project.status];
                return (
                  <Link key={project.id} href={`/espace-client/projets/${project.id}`}
                    className="flex items-center gap-4 bg-white rounded-2xl border border-[#E7E5E4] p-4 hover:border-[#C8A84B]/40 hover:shadow-sm transition-all group">
                    {/* Progress ring */}
                    <div className="relative shrink-0">
                      <ProgressRing progress={project.progress} color={statusDotColor(project.status)} />
                      <span className="absolute inset-0 flex items-center justify-center font-body text-[9px] font-bold text-[#0C0B09]">
                        {project.progress}%
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body text-sm font-semibold text-[#0C0B09] truncate group-hover:text-[#C8A84B] transition-colors">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="font-body text-xs text-[#A8A29E] truncate mt-0.5">{project.description}</p>
                      )}
                    </div>
                    {/* Badge */}
                    <span className={`shrink-0 px-2 py-0.5 rounded-full font-body text-xs font-medium ${sc.bg} ${sc.text}`}>
                      {STATUS_LABELS[project.status]}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column — 2 cols */}
        <div className="lg:col-span-2 space-y-4">

          {/* AI Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-[#C8A84B]/12 flex items-center justify-center">
                  <BrainCircuit size={12} className="text-[#C8A84B]" />
                </div>
                <p className="font-body text-xs font-bold text-[#0C0B09] uppercase tracking-wide">Recommandations IA</p>
              </div>
              <p className="font-body text-xs text-[#78716C] mb-3">Services adaptés à votre profil</p>
              <div className="space-y-2">
                {recommendations.map((rec) => rec && (
                  <Link key={rec.href} href={rec.href}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl transition-all hover:opacity-80 group"
                    style={{ background: `${rec.color}0D`, border: `1px solid ${rec.color}20` }}>
                    <span className="text-base">{rec.icon}</span>
                    <span className="font-body text-sm font-medium flex-1" style={{ color: rec.color }}>{rec.label}</span>
                    <ArrowRight size={12} style={{ color: rec.color }} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No profile yet → prompt */}
          {!artistProfile && (
            <Link href="/espace-client/artiste"
              className="flex items-center gap-3 p-4 rounded-2xl border border-dashed transition-all hover:border-[#8B5CF6]/50"
              style={{ borderColor: "rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.03)" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(139,92,246,0.10)" }}>
                <Music2 size={14} style={{ color: "#8B5CF6" }} />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold" style={{ color: "#8B5CF6" }}>Créer votre profil artiste</p>
                <p className="font-body text-xs text-[#78716C]">Pour des recommandations personnalisées</p>
              </div>
              <ArrowRight size={14} style={{ color: "#8B5CF6" }} />
            </Link>
          )}

          {/* Activity feed */}
          {recentUpdates.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-[#F5F5F4] flex items-center justify-center">
                  <Clock size={12} className="text-[#78716C]" />
                </div>
                <p className="font-body text-xs font-bold text-[#0C0B09] uppercase tracking-wide">Activité récente</p>
              </div>
              <div className="space-y-3">
                {recentUpdates.slice(0, 5).map((upd, i) => {
                  const proj = projects.find((p) => p.id === upd.project_id);
                  return (
                    <div key={upd.id} className="relative">
                      {/* Connector line */}
                      {i < recentUpdates.slice(0, 5).length - 1 && (
                        <span className="absolute left-[5px] top-4 bottom-[-8px] w-px bg-[#E7E5E4]" />
                      )}
                      <div className="flex items-start gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C8A84B] shrink-0 mt-1" />
                        <div className="min-w-0">
                          <p className="font-body text-xs font-medium text-[#0C0B09] truncate">{upd.title}</p>
                          {proj && (
                            <p className="font-body text-[10px] text-[#A8A29E] truncate">{proj.title}</p>
                          )}
                          <p className="font-body text-[10px]" style={{ color: "#C8A84B" }}>{relativeTime(upd.created_at)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Artiste profile card ────────────────────────── */}
      {artistProfile && (
        <Link href="/espace-client/artiste"
          className="flex items-center justify-between px-5 py-3.5 rounded-2xl mb-4 group transition-all border"
          style={{ background: "rgba(139,92,246,0.04)", borderColor: "rgba(139,92,246,0.18)" }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(139,92,246,0.10)" }}>
              <Mic2 size={14} style={{ color: "#8B5CF6" }} />
            </div>
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-[#0C0B09] truncate">
                {artistProfile.nom_artiste || "Profil artiste"}
              </p>
              <p className="font-body text-xs text-[#78716C] truncate">
                {[artistProfile.genre_musical, artistProfile.niveau].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-body text-xs" style={{ color: "#8B5CF6" }}>Modifier</span>
            <ArrowRight size={13} style={{ color: "#8B5CF6" }} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      )}

      {/* ── Guides exclusifs ───────────────────────────── */}
      {(isEntrepreneur || artistProfile) && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "rgba(200,168,75,0.12)" }}>
              <BookOpen size={12} className="text-[#C8A84B]" />
            </div>
            <h2 className="font-display text-base font-semibold text-[#0C0B09]">Mes guides exclusifs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* Guide Entrepreneur — visible si entrepreneur ou pas encore de profil artiste */}
            {isEntrepreneur && (
              <Link href="/espace-client/guide-entrepreneur"
                className="group relative overflow-hidden rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #0A1628 0%, #0D2040 100%)", borderColor: "rgba(14,165,233,0.25)" }}>
                {/* Décor */}
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-10 blur-2xl"
                  style={{ background: "#0EA5E9", transform: "translate(30%, -30%)" }} />
                <div className="relative z-10 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
                      <BookOpen size={16} style={{ color: "#0EA5E9" }} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>
                      Gratuit
                    </span>
                  </div>
                  <p className="font-body text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: "rgba(14,165,233,0.7)" }}>33 pages · PDF A4</p>
                  <h3 className="font-display text-base font-bold text-white mb-1 leading-tight">
                    Visibilité de<br />
                    <span style={{ color: "#0EA5E9" }}>l'Entrepreneur Sénégalais</span>
                  </h3>
                  <p className="font-body text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    WhatsApp Business, Facebook Ads, SEO local, Wave & PayDunya…
                  </p>
                  <div className="flex items-center gap-2 font-body text-xs font-semibold"
                    style={{ color: "#0EA5E9" }}>
                    <Download size={12} />
                    Télécharger le guide
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            )}

            {/* Guide Artiste — visible uniquement si profil artiste activé */}
            {artistProfile && (
              <Link href="/espace-client/guide-artiste"
                className="group relative overflow-hidden rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #0D0820 0%, #130A2E 100%)", borderColor: "rgba(139,92,246,0.25)" }}>
                {/* Décor */}
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-10 blur-2xl"
                  style={{ background: "#8B5CF6", transform: "translate(30%, -30%)" }} />
                <div className="relative z-10 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
                      <Music2 size={16} style={{ color: "#8B5CF6" }} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(200,168,75,0.15)", color: "#C8A84B" }}>
                      Exclusif
                    </span>
                  </div>
                  <p className="font-body text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: "rgba(139,92,246,0.7)" }}>30 pages · PDF A4</p>
                  <h3 className="font-display text-base font-bold text-white mb-1 leading-tight">
                    Guide de l'Artiste<br />
                    <span style={{ color: "#8B5CF6" }}>au Sénégal</span>
                  </h3>
                  <p className="font-body text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Distribution, BSDA, streaming, TikTok, festivals, droits & revenus…
                  </p>
                  <div className="flex items-center gap-2 font-body text-xs font-semibold"
                    style={{ color: "#8B5CF6" }}>
                    <Download size={12} />
                    Télécharger le guide
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            )}

            {/* Teaser pour artiste non activé */}
            {!artistProfile && (
              <Link href="/espace-client/artiste"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-dashed transition-all hover:border-[#8B5CF6]/40"
                style={{ borderColor: "rgba(139,92,246,0.2)", background: "rgba(139,92,246,0.02)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)" }}>
                  <Music2 size={16} style={{ color: "#8B5CF6" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-semibold mb-0.5" style={{ color: "#8B5CF6" }}>
                    Guide Artiste Sénégal — 30 pages
                  </p>
                  <p className="font-body text-xs text-[#78716C]">
                    Activez votre profil artiste pour y accéder
                  </p>
                </div>
                <ArrowRight size={14} style={{ color: "#8B5CF6" }} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}

          </div>
        </div>
      )}

      {/* ── Quick actions ───────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { icon: "📁", label: "Nouveau projet", href: "#", onClick: true, color: "#C8A84B" },
          { icon: "💬", label: "Chat avec KELI", href: "/espace-client/chat", color: "#C8A84B" },
          { icon: "🧠", label: "Vision de Carrière", href: "/artistes/vision", color: "#8B5CF6", external: true },
          { icon: "🎤", label: "Profil Artiste", href: "/espace-client/artiste", color: "#10B981" },
        ].map(({ icon, label, href, color, external }) => (
          <Link key={label} href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#C8A84B]/30 hover:shadow-sm transition-all text-center group">
            <span className="text-xl">{icon}</span>
            <span className="font-body text-xs font-medium text-[#78716C] group-hover:text-[#0C0B09] transition-colors leading-tight">{label}</span>
          </Link>
        ))}
      </div>

      {/* ── KELI dark banner ────────────────────────────── */}
      <Link href="/espace-client/chat"
        className="flex items-center justify-between px-5 py-4 rounded-2xl group transition-all"
        style={{ background: "#0F0E0C" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C8A84B]/15 border border-[#C8A84B]/25 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-[#C8A84B]" />
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-white">Discuter avec KELI</p>
            <p className="font-body text-xs text-white/45">Votre conseiller stratégique IA — disponible maintenant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block font-body text-xs px-2 py-1 rounded-full"
            style={{ background: "rgba(200,168,75,0.15)", color: "#C8A84B" }}>
            <Zap size={9} className="inline mr-0.5" />IA
          </span>
          <ArrowRight size={16} className="text-[#C8A84B] group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

    </div>
  );
}
