"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, MessageSquare, Mic2, Building2,
  Users, FolderOpen, Sparkles, ExternalLink, LogOut, Map, BookOpen, Music, Briefcase, Mail, FileText,
} from "lucide-react";
import { logout } from "@/app/admin/actions";

const NAV = [
  {
    section: "Vue d'ensemble",
    items: [
      { id: "dashboard", icon: LayoutDashboard, label: "Dashboard",         tab: null,            color: "#C8A84B" },
    ],
  },
  {
    section: "Leads",
    items: [
      { id: "leads",       icon: MessageSquare, label: "Tous les leads",    tab: "leads",         color: "#10B981" },
      { id: "artistes",    icon: Mic2,          label: "Artistes",          tab: "artistes",      color: "#EC4899" },
      { id: "entreprises", icon: Building2,     label: "Entreprises",       tab: "entreprises",   color: "#3B82F6" },
    ],
  },
  {
    section: "Gestion",
    items: [
      { id: "clients",       icon: Users,       label: "Clients",           tab: "clients",       color: "#8B5CF6" },
      { id: "projects",      icon: FolderOpen,  label: "Projets",           tab: "projects",      color: "#F97316" },
      { id: "conversations", icon: Sparkles,    label: "Conversations IA",  tab: "conversations", color: "#06B6D4" },
      { id: "newsletter",    icon: Mail,        label: "Newsletter",        tab: "newsletter",    color: "#10B981" },
      { id: "blog",          icon: FileText,    label: "Blog",              tab: "blog",          color: "#C8A84B" },
    ],
  },
  {
    section: "Ressources",
    items: [
      { id: "roadmap",         icon: Map,       label: "Feuille de route",    tab: "roadmap", color: "#C8A84B" },
      { id: "catalogue",       icon: BookOpen,  label: "Catalogue PDF",       tab: null, href: "/admin/catalogue",        color: "#EC4899" },
      { id: "ebook-artiste",   icon: Music,     label: "Guide Artiste PDF",   tab: null, href: "/admin/ebook-artiste",    color: "#8B5CF6" },
      { id: "ebook-entrepreneur", icon: Briefcase, label: "Guide Entrepreneur PDF", tab: null, href: "/admin/ebook-entrepreneur", color: "#0EA5E9" },
    ],
  },
];

interface Props {
  counts: {
    leads: number;
    newLeads: number;
    artistes: number;
    newArtistes: number;
    entreprises: number;
    newEntreprises: number;
    clients: number;
    pending: number;
    projects: number;
    active: number;
    conversations: number;
    newsletter: number;
    blog: number;
  };
}

export default function AdminSidebar({ counts }: Props) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [, startTransition] = useTransition();
  const router = useRouter();

  const badges: Record<string, { count: number; color: string } | undefined> = {
    leads:         counts.newLeads > 0     ? { count: counts.newLeads,     color: "#10B981" } : undefined,
    artistes:      counts.newArtistes > 0  ? { count: counts.newArtistes,  color: "#EC4899" } : undefined,
    entreprises:   counts.newEntreprises > 0 ? { count: counts.newEntreprises, color: "#3B82F6" } : undefined,
    clients:       counts.pending > 0      ? { count: counts.pending,      color: "#8B5CF6" } : undefined,
    projects:      counts.active > 0       ? { count: counts.active,       color: "#F97316" } : undefined,
    conversations: counts.conversations > 0 ? { count: counts.conversations, color: "#06B6D4" } : undefined,
  };

  const totals: Record<string, number> = {
    leads: counts.leads,
    artistes: counts.artistes,
    entreprises: counts.entreprises,
    clients: counts.clients,
    projects: counts.projects,
    conversations: counts.conversations,
    newsletter: counts.newsletter,
    blog: counts.blog,
  };

  const pathname = usePathname();
  const isActive = (tab: string | null, customHref?: string) => {
    if (customHref) return pathname === customHref;
    if (tab === null) return pathname === "/admin" && currentTab === null;
    return currentTab === tab;
  };

  return (
    <aside className="w-60 shrink-0 flex flex-col min-h-screen"
      style={{ background: "#0C0B09", borderRight: "1px solid rgba(255,255,255,0.07)" }}>

      {/* Brand */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.3)" }}>
            <span className="font-display font-bold text-[#C8A84B] text-base">K</span>
          </div>
          <div>
            <p className="font-body font-bold text-white text-sm tracking-wide">KEKELI</p>
            <p className="font-body text-[10px] uppercase tracking-widest" style={{ color: "#C8A84B" }}>Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            <p className="font-body text-[9px] font-bold uppercase tracking-[0.2em] px-2 mb-2"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              {section}
            </p>
            <div className="space-y-0.5">
              {items.map(({ id, icon: Icon, label, tab, color, href: customHref }: { id: string; icon: React.ElementType; label: string; tab: string | null; color: string; href?: string }) => {
                const active = isActive(tab, customHref);
                const badge = badges[id];
                const total = totals[id];
                const href = customHref ?? (tab ? `/admin?tab=${tab}` : "/admin");

                return (
                  <Link
                    key={id}
                    href={href}
                    className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-150"
                    style={{
                      background: active ? `${color}15` : "transparent",
                      border: active ? `1px solid ${color}25` : "1px solid transparent",
                    }}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                      style={{ background: active ? `${color}20` : "rgba(255,255,255,0.05)" }}>
                      <Icon size={13} style={{ color: active ? color : "rgba(255,255,255,0.4)" }} />
                    </div>
                    <span className="font-body text-sm font-medium flex-1 transition-colors"
                      style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}>
                      {label}
                    </span>
                    <div className="flex items-center gap-1">
                      {badge && (
                        <span className="w-5 h-5 rounded-full flex items-center justify-center font-body text-[10px] font-bold"
                          style={{ background: `${badge.color}30`, color: badge.color }}>
                          {badge.count}
                        </span>
                      )}
                      {total !== undefined && !badge && (
                        <span className="font-body text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                          {total}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 space-y-1 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <Link href="/" target="_blank"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-body text-sm transition-colors hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          <ExternalLink size={13} />
          Voir le site
        </Link>
        <form action={logout}>
          <button type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-body text-sm transition-colors hover:bg-red-500/10"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            <LogOut size={13} />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
