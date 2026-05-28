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

  const { data: profile } = await getSupabase()
    .from("client_profiles")
    .select("full_name, company, email, artist_profile")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name ?? user.email ?? "Client";
  const displayCompany = profile?.company ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasArtistProfile = !!(profile as any)?.artist_profile;

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex">
      <ClientSidebar
        displayName={displayName}
        displayCompany={displayCompany}
        hasArtistProfile={hasArtistProfile}
        logoutAction={logoutClient}
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

      <MobileClientNav />
      <OnboardingTour />
    </div>
  );
}
