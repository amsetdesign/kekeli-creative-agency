"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, Users, FolderOpen, Mic2 } from "lucide-react";

interface Props {
  leadsContent: React.ReactNode;
  conversationsContent: React.ReactNode;
  clientsContent: React.ReactNode;
  projectsContent: React.ReactNode;
  leadsCount: number;
  conversationsCount: number;
  newLeadsCount: number;
  newArtiste: number;
  clientsCount: number;
  pendingClientsCount: number;
  projectsCount: number;
}

type Tab = "leads" | "conversations" | "clients" | "projects";

export default function AdminTabs({
  leadsContent,
  conversationsContent,
  clientsContent,
  projectsContent,
  leadsCount,
  conversationsCount,
  newLeadsCount,
  newArtiste,
  clientsCount,
  pendingClientsCount,
  projectsCount,
}: Props) {
  const [tab, setTab] = useState<Tab>("leads");

  const tabs: {
    id: Tab;
    label: string;
    icon: React.ReactNode;
    badge?: { count: number; className: string };
    extra?: { count: number; label: string; className: string };
  }[] = [
    {
      id: "leads",
      label: "Leads",
      icon: <MessageSquare size={14} />,
      badge: newLeadsCount > 0 ? { count: newLeadsCount, className: "bg-emerald-100 text-emerald-700" } : undefined,
      extra: newArtiste > 0 ? { count: newArtiste, label: "artiste", className: "bg-pink-100 text-pink-700" } : undefined,
    },
    {
      id: "conversations",
      label: "Conversations IA",
      icon: <Sparkles size={14} />,
      badge: conversationsCount > 0 ? { count: conversationsCount, className: "bg-[#C8A84B]/15 text-[#C8A84B]" } : undefined,
    },
    {
      id: "clients",
      label: "Clients",
      icon: <Users size={14} />,
      badge: pendingClientsCount > 0 ? { count: pendingClientsCount, className: "bg-amber-100 text-amber-700" } : undefined,
    },
    {
      id: "projects",
      label: "Projets",
      icon: <FolderOpen size={14} />,
    },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 border-b border-[#E7E5E4] overflow-x-auto">
        {tabs.map(({ id, label, icon, badge, extra }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-3 font-body text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
              tab === id
                ? "border-[#0C0B09] text-[#0C0B09]"
                : "border-transparent text-[#A8A29E] hover:text-[#78716C]"
            }`}
          >
            {icon}
            {label}
            {badge && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none ${badge.className}`}>
                {badge.count}
              </span>
            )}
            {extra && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none flex items-center gap-0.5 ${extra.className}`}>
                <Mic2 size={9} />
                {extra.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "leads" && leadsContent}
      {tab === "conversations" && conversationsContent}
      {tab === "clients" && clientsContent}
      {tab === "projects" && projectsContent}
    </div>
  );
}
