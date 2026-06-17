"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderOpen, Settings, LogOut, ExternalLink, Sparkles,
  Mic2, BrainCircuit, BarChart2, Award, BookOpen, Briefcase, Building2,
} from "lucide-react";

type AccountType = "artiste" | "entrepreneur" | "personnalite";

interface Props {
  displayName: string;
  displayCompany: string | null;
  hasArtistProfile?: boolean;
  accountType?: AccountType;
  logoutAction: () => Promise<void>;
  unreadMessages?: number;
}

/* ── Nav items by account type ────────────────────────────── */
type NavItem = {
  href: string; label: string; icon: React.ElementType; tourId: string;
  gold?: boolean; purple?: boolean; vision?: boolean; external?: boolean;
};

const NAV_COMMON: NavItem[] = [
  { href: "/espace-client/dashboard", label: "Tableau de bord",   icon: LayoutDashboard, tourId: "nav-dashboard" },
  { href: "/espace-client/projets",   label: "Mes Projets",        icon: FolderOpen,      tourId: "nav-projets" },
  { href: "/espace-client/chat",      label: "Discuter avec KELI", icon: Sparkles, gold: true, tourId: "nav-chat" },
];

const NAV_ARTISTE: NavItem[] = [
  { href: "/espace-client/artiste",    label: "Profil Artiste",    icon: Mic2,         purple: true, tourId: "nav-artiste" },
  { href: "/artistes/vision",          label: "Vision de Carrière", icon: BrainCircuit, vision: true, external: true, tourId: "nav-vision" },
  { href: "/artistes/analyse-reseaux", label: "Analyse Réseaux",   icon: BarChart2,    vision: true, external: true, tourId: "nav-analyse" },
  { href: "/certification",            label: "Certification",      icon: Award,        vision: true, external: true, tourId: "nav-certification" },
];

const NAV_PERSONNALITE: NavItem[] = [
  { href: "/artistes/analyse-reseaux", label: "Analyse Réseaux", icon: BarChart2, vision: true, external: true, tourId: "nav-analyse" },
  { href: "/certification",            label: "Certification",    icon: Award,     vision: true, external: true, tourId: "nav-certification" },
];

const NAV_TAIL: NavItem[] = [
  { href: "/espace-client/parametres", label: "Paramètres", icon: Settings, tourId: "nav-parametres" },
];

function getNavItems(accountType: AccountType): NavItem[] {
  const specific =
    accountType === "artiste"      ? NAV_ARTISTE :
    accountType === "personnalite" ? NAV_PERSONNALITE :
    [];
  return [...NAV_COMMON, ...specific, ...NAV_TAIL];
}

export default function ClientSidebar({
  displayName, displayCompany, hasArtistProfile = false, accountType = "entrepreneur", logoutAction, unreadMessages = 0,
}: Props) {
  const pathname = usePathname();
  const navItems = getNavItems(accountType);

  return (
    <aside
      className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 z-30"
      style={{ background: "linear-gradient(180deg, #1A0A3C 0%, #0D0720 60%, #0A0618 100%)" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <Link href="/espace-client/dashboard" className="font-display text-lg font-semibold text-white">
          KEKELI <span className="text-[#C8A84B]">Portail</span>
        </Link>
      </div>

      {/* Account type badge */}
      <div className="px-4 pt-3 pb-1 shrink-0">
        {accountType === "artiste" && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-body text-[10px] font-semibold"
            style={{ background: "rgba(139,92,246,0.18)", color: "#C084FC", border: "1px solid rgba(139,92,246,0.30)" }}>
            🎤 Artiste
          </span>
        )}
        {accountType === "entrepreneur" && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-body text-[10px] font-semibold"
            style={{ background: "rgba(200,168,75,0.15)", color: "#C8A84B", border: "1px solid rgba(200,168,75,0.30)" }}>
            🏢 Entrepreneur
          </span>
        )}
        {accountType === "personnalite" && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-body text-[10px] font-semibold"
            style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.30)" }}>
            🌟 Personnalité
          </span>
        )}
      </div>

      {/* User card */}
      <div className="px-4 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/10">
          <div className="w-9 h-9 rounded-full bg-[#C8A84B]/25 flex items-center justify-center shrink-0">
            <span className="text-[#C8A84B] font-display font-bold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-body text-sm font-medium text-white truncate">{displayName}</p>
            {displayCompany && (
              <p className="font-body text-xs text-white/50 truncate">{displayCompany}</p>
            )}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, gold, purple, vision, external, tourId }) => {
          const active = !external && (pathname === href || (href !== "/espace-client/dashboard" && pathname.startsWith(href)));
          return (
            <Link
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              data-tour={tourId}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors ${
                active
                  ? gold   ? "bg-[#C8A84B]/20 text-[#C8A84B]"
                  : purple ? "bg-[#8B5CF6]/25 text-[#C084FC]"
                  :          "bg-white/15 text-white"
                  : gold   ? "text-[#C8A84B]/80 hover:bg-[#C8A84B]/10 hover:text-[#C8A84B]"
                  : purple ? "text-[#C084FC]/70 hover:bg-[#8B5CF6]/15 hover:text-[#C084FC]"
                  : vision ? "text-[#A78BFA]/80 hover:bg-[#8B5CF6]/10 hover:text-[#C084FC]"
                  :          "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
              {href === "/espace-client/projets" && unreadMessages > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center font-body text-[10px] font-bold bg-red-500 text-white">
                  {unreadMessages > 9 ? "9+" : unreadMessages}
                </span>
              )}
              {gold && !active && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full font-body text-[9px] font-semibold bg-[#C8A84B]/20 text-[#C8A84B] uppercase tracking-wider">
                  IA
                </span>
              )}
              {purple && !active && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full font-body text-[9px] font-semibold bg-[#8B5CF6]/20 text-[#C084FC] uppercase tracking-wider">
                  NEW
                </span>
              )}
              {vision && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full font-body text-[9px] font-semibold bg-[#8B5CF6]/15 text-[#A78BFA] uppercase tracking-wider">
                  GRATUIT
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Guides section */}
      <div className="px-4 pb-3 border-t border-white/10 pt-3 shrink-0">
        <p className="px-3 mb-1.5 font-body text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">Mes Guides</p>
        {accountType !== "artiste" && (
          <Link
            href="/espace-client/guide-entrepreneur"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors ${
              pathname === "/espace-client/guide-entrepreneur"
                ? "bg-[#0EA5E9]/20 text-[#38BDF8]"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Briefcase size={15} />
            Guide Entrepreneur
          </Link>
        )}
        {accountType === "artiste" && (
          <Link
            href="/espace-client/guide-artiste"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors ${
              pathname === "/espace-client/guide-artiste"
                ? "bg-[#8B5CF6]/25 text-[#C084FC]"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <BookOpen size={15} />
            Guide Artiste
          </Link>
        )}
        {accountType === "entrepreneur" && (
          <Link
            href="/entreprises"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Building2 size={15} />
            Nos services
          </Link>
        )}
      </div>

      {/* Bottom actions */}
      <div className="px-4 py-4 border-t border-white/10 space-y-1 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-xl font-body text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ExternalLink size={13} />
          Voir le site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-white/50 hover:bg-red-500/15 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
