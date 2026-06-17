"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Sparkles, Mic2, Settings, BarChart2, Building2 } from "lucide-react";
import { clsx } from "clsx";

type AccountType = "artiste" | "entrepreneur" | "personnalite";

interface Props {
  accountType?: AccountType;
  unreadMessages?: number;
}

type MobileItem = {
  href: string; label: string; icon: React.ElementType; tourId: string; gold?: boolean;
};

function getItems(accountType: AccountType): MobileItem[] {
  const middle: MobileItem =
    accountType === "artiste"
      ? { href: "/espace-client/artiste",    label: "Profil",   icon: Mic2,       tourId: "mob-artiste" }
      : accountType === "personnalite"
      ? { href: "/artistes/analyse-reseaux", label: "Analyse",  icon: BarChart2,  tourId: "mob-analyse" }
      : { href: "/entreprises",              label: "Services",  icon: Building2,  tourId: "mob-services" };

  return [
    { href: "/espace-client/dashboard",  label: "Accueil",  icon: LayoutDashboard, tourId: "mob-dashboard" },
    { href: "/espace-client/projets",    label: "Projets",  icon: FolderOpen,       tourId: "mob-projets" },
    { href: "/espace-client/chat",       label: "KELI",     icon: Sparkles, gold: true, tourId: "mob-chat" },
    middle,
    { href: "/espace-client/parametres", label: "Réglages", icon: Settings,         tourId: "mob-parametres" },
  ];
}

export default function MobileClientNav({ accountType = "entrepreneur", unreadMessages = 0 }: Props) {
  const pathname = usePathname();
  const items = getItems(accountType);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 flex items-stretch border-t border-white/10"
      style={{ background: "linear-gradient(180deg, #1A0A3C 0%, #0A0618 100%)", boxShadow: "0 -4px 24px rgba(0,0,0,0.4)" }}
    >
      {items.map(({ href, label, icon: Icon, gold, tourId }) => {
        const isExternal = href.startsWith("/entreprises") || href.startsWith("/artistes/analyse");
        const active = !isExternal && (pathname === href || (href !== "/espace-client/dashboard" && pathname.startsWith(href)));
        const showBadge = href === "/espace-client/projets" && unreadMessages > 0;
        return (
          <Link
            key={href}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            data-tour={tourId}
            className={clsx(
              "flex-1 flex flex-col items-center justify-center gap-0.5 text-center transition-colors",
              active
                ? gold ? "text-[#C8A84B]" : "text-white"
                : gold ? "text-[#C8A84B]/60" : "text-white/40",
            )}
          >
            <div className="relative">
              <div className={clsx(
                "w-8 h-8 flex items-center justify-center rounded-xl transition-colors",
                active && (gold ? "bg-[#C8A84B]/15" : "bg-white/15"),
              )}>
                <Icon size={17} />
              </div>
              {showBadge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center font-body text-[9px] font-bold text-white">
                  {unreadMessages > 9 ? "9+" : unreadMessages}
                </span>
              )}
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
