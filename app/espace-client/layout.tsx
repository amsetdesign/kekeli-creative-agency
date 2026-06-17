import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase } from "@/lib/supabase";
import ClientSidebar from "@/components/espace-client/ClientSidebar";
import MobileClientNav from "@/components/espace-client/MobileClientNav";
import OnboardingTour from "@/components/espace-client/OnboardingTour";
import { logoutClient } from "./actions";

export default async function EspaceClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F5F4]">
        {children}
      </div>
    );
  }

  const db = getSupabase();

  const { data: profile } = await db
    .from("client_profiles")
    .select("full_name, company, email, artist_profile")
    .eq("id", user.id)
    .single();

  /* ── Notifications : messages agence non lus ── */
  const { data: userProjects } = await db.from("projects").select("id").eq("client_id", user.id);
  const projectIds = (userProjects ?? []).map((p) => p.id);
  let unreadMessages = 0;
  if (projectIds.length > 0) {
    const { count } = await db
      .from("project_messages")
      .select("id", { count: "exact", head: true })
      .eq("sender_type", "agency")
      .is("read_at", null)
      .in("project_id", projectIds);
    unreadMessages = count ?? 0;
  }

  const displayName = profile?.full_name ?? user.email ?? "Client";
  const displayCompany = profile?.company ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasArtistProfile = !!(profile as any)?.artist_profile;

  // Determine account type: metadata first, then infer from profile
  const metaType = user.user_metadata?.account_type as "artiste" | "entrepreneur" | "personnalite" | undefined;
  const accountType: "artiste" | "entrepreneur" | "personnalite" = metaType
    ?? (hasArtistProfile ? "artiste" : "entrepreneur");

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex">
      <ClientSidebar
        displayName={displayName}
        displayCompany={displayCompany}
        hasArtistProfile={hasArtistProfile}
        accountType={accountType}
        logoutAction={logoutClient}
        unreadMessages={unreadMessages}
      />

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 flex items-center px-4 border-b border-white/10"
        style={{ background: "linear-gradient(90deg, #1A0A3C 0%, #0A0618 100%)" }}
      >
        <Link href="/espace-client/dashboard" className="font-display text-base font-semibold text-white">
          KEKELI <span className="text-[#C8A84B]">Portail</span>
        </Link>
      </div>

      <main className="flex-1 md:ml-64 pt-14 md:pt-0 pb-16 md:pb-0 min-h-screen overflow-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>

      <MobileClientNav accountType={accountType} unreadMessages={unreadMessages} />
      <OnboardingTour />
    </div>
  );
}
