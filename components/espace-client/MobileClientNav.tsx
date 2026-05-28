"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Sparkles, Mic2, Settings } from "lucide-react";
import { clsx } from "clsx";

const items = [
  { href: "/espace-client/dashboard", label: "Accueil",  icon: LayoutDashboard, tourId: "mob-dashboard" },
  { href: "/espace-client/projets",   label: "Projets",  icon: FolderOpen,       tourId: "mob-projets" },
  { href: "/espace-client/chat",      label: "KELI",     icon: Sparkles, gold: true, tourId: "mob-chat" },
  { href: "/espace-client/artiste",   label: "Profil",   icon: Mic2,             tourId: "mob-artiste" },
  { href: "/espace-client/parametres",label: "Réglages", icon: Settings,         tourId: "mob-parametres" },
];

export default function MobileClientNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 flex items-stretch border-t border-white/10"
      style={{ background: "linear-gradient(180deg, #1A0A3C 0%, #0A0618 100%)", boxShadow: "0 -4px 24px rgba(0,0,0,0.4)" }}
    >
      {items.map(({ href, label, icon: Icon, gold, tourId }) => {
        const active = pathname === href || (href !== "/espace-client/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            data-tour={tourId}
            className={clsx(
              "flex-1 flex flex-col items-center justify-center gap-0.5 text-center transition-colors",
              active
                ? gold ? "text-[#C8A84B]" : "text-white"
                : gold ? "text-[#C8A84B]/60" : "text-white/40",
            )}
          >
            <div className={clsx(
              "w-8 h-8 flex items-center justify-center rounded-xl transition-colors",
              active && (gold ? "bg-[#C8A84B]/15" : "bg-white/15"),
            )}>
              <Icon size={17} />
            </div>
            <span className={clsx("font-body text-[10px] font-medium leading-none", active && "font-semibold")}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
