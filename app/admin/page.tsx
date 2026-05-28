import type { Metadata } from "next";
import { Suspense } from "react";
import { getSupabase, type Lead, type ClientProfile, type Project } from "@/lib/supabase";
import LeadsTable from "@/components/admin/LeadsTable";
import ConversationsPanel, { type Conversation } from "@/components/admin/ConversationsPanel";
import ClientsPanel from "@/components/admin/ClientsPanel";
import ProjectsPanel from "@/components/admin/ProjectsPanel";
import AdminCharts from "@/components/admin/AdminCharts";
import AdminSidebar from "@/components/admin/AdminSidebar";
import RoadmapGuide from "@/components/admin/RoadmapGuide";
import {
  Users, MessageSquare, Zap, BarChart2, Sparkles,
  FolderOpen, Mic2, Building2, TrendingUp, Clock,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard — KEKELI Admin" };
export const dynamic = "force-dynamic";

async function getData() {
  const db = getSupabase();
  const [leadsRes, convsRes, clientsRes, projectsRes] = await Promise.all([
    db.from("leads").select("*").order("created_at", { ascending: false }),
    db.from("conversations").select("*").order("updated_at", { ascending: false }),
    db.from("client_profiles").select("*").order("created_at", { ascending: false }),
    db.from("projects").select("*, client_profiles(full_name, company, email)").order("updated_at", { ascending: false }),
  ]);
  return {
    leads: (leadsRes.data ?? []) as Lead[],
    conversations: (convsRes.data ?? []) as Conversation[],
    clients: (clientsRes.data ?? []) as ClientProfile[],
    projects: (projectsRes.data ?? []) as (Project & { client_profiles: Pick<ClientProfile, "full_name" | "company" | "email"> | null })[],
  };
}

function StatCard({
  icon, label, value, sub, color = "#C8A84B", accent = false,
}: {
  icon: React.ReactNode; label: string; value: string | number;
  sub?: string; color?: string; accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3"
      style={{
        border: accent ? `1px solid ${color}35` : "1px solid #E7E5E4",
        boxShadow: accent ? `0 0 0 1px ${color}10, 0 2px 16px rgba(0,0,0,0.04)` : "0 1px 4px rgba(0,0,0,0.04)",
      }}>
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {sub && (
          <span className="font-body text-xs px-2 py-0.5 rounded-full"
            style={{ background: `${color}12`, color }}>
            {sub}
          </span>
        )}
      </div>
      <div>
        <p className="font-display text-3xl font-bold text-[#0C0B09]">{value}</p>
        <p className="font-body text-sm text-[#78716C] mt-0.5">{label}</p>
      </div>
      {accent && (
        <div className="h-1 rounded-full mt-auto" style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}50 100%)` }} />
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-body text-xs font-bold uppercase tracking-[0.15em] text-[#A8A29E] mb-4">{children}</h2>
  );
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const { leads, conversations, clients, projects } = await getData();

  /* ── Stats ── */
  const newLeads        = leads.filter((l) => l.status === "new").length;
  const artisteLeads    = leads.filter((l) => l.type === "artiste").length;
  const newArtiste      = leads.filter((l) => l.type === "artiste" && l.status === "new").length;
  const entrepriseLeads = leads.filter((l) => l.type === "entreprise").length;
  const newEntreprise   = leads.filter((l) => l.type === "entreprise" && l.status === "new").length;
  const briefCount      = leads.filter((l) => l.type === "brief").length;
  const contactCount    = leads.filter((l) => l.type === "contact").length;
  const sondageCount    = leads.filter((l) => l.type === "sondage").length;
  const activeClients   = clients.filter((c) => c.status === "active").length;
  const pendingClients  = clients.filter((c) => c.status === "pending").length;
  const activeProjects  = projects.filter((p) => p.status === "en_cours").length;
  const qualifiedConvs  = conversations.filter((c) => c.status === "qualified").length;

  const sidebarCounts = {
    leads: leads.length, newLeads,
    artistes: artisteLeads, newArtistes: newArtiste,
    entreprises: entrepriseLeads, newEntreprises: newEntreprise,
    clients: clients.length, pending: pendingClients,
    projects: projects.length, active: activeProjects,
    conversations: conversations.length,
  };

  /* ── Filtered leads for sub-tabs ── */
  const artisteLeadsList    = leads.filter((l) => l.type === "artiste");
  const entrepriseLeadsList = leads.filter((l) => l.type === "entreprise");

  return (
    <>
      {/* Sidebar */}
      <Suspense fallback={<aside className="w-60 shrink-0 min-h-screen" style={{ background: "#0C0B09" }} />}>
        <AdminSidebar counts={sidebarCounts} />
      </Suspense>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* ── DASHBOARD (tab = null) ── */}
          {!tab && (
            <>
              <div className="mb-8">
                <h1 className="font-display text-2xl text-[#0C0B09] mb-1">Tableau de bord</h1>
                <p className="font-body text-sm text-[#78716C]">
                  {leads.length} lead{leads.length !== 1 ? "s" : ""}
                  {newLeads > 0 && ` · `}
                  {newLeads > 0 && <span className="text-emerald-600 font-semibold">{newLeads} nouveau{newLeads !== 1 ? "x" : ""}</span>}
                  {pendingClients > 0 && ` · ${pendingClients} client${pendingClients !== 1 ? "s" : ""} en attente`}
                </p>
              </div>

              {/* Stats row 1 — Leads */}
              <SectionTitle>Leads & Contacts</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={<MessageSquare size={16} />} label="Leads total"      value={leads.length}    sub={newLeads > 0 ? `${newLeads} nouveau${newLeads > 1 ? "x" : ""}` : undefined} color="#10B981" accent={newLeads > 0} />
                <StatCard icon={<Mic2 size={16} />}          label="Leads artistes"   value={artisteLeads}    sub={newArtiste > 0 ? `${newArtiste} nouveau${newArtiste > 1 ? "x" : ""}` : undefined} color="#EC4899" accent={newArtiste > 0} />
                <StatCard icon={<Building2 size={16} />}     label="Leads entreprises" value={entrepriseLeads} sub={newEntreprise > 0 ? `${newEntreprise} nouveau${newEntreprise > 1 ? "x" : ""}` : undefined} color="#3B82F6" accent={newEntreprise > 0} />
                <StatCard icon={<Zap size={16} />}           label="Briefs / Contacts" value={briefCount + contactCount} color="#F97316" />
              </div>

              {/* Stats row 2 — Gestion */}
              <SectionTitle>Gestion</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={<Users size={16} />}      label="Clients actifs"     value={activeClients}        sub={pendingClients > 0 ? `${pendingClients} en attente` : undefined} color="#8B5CF6" accent={pendingClients > 0} />
                <StatCard icon={<FolderOpen size={16} />} label="Projets total"       value={projects.length}      sub={activeProjects > 0 ? `${activeProjects} en cours` : undefined}   color="#F59E0B" accent={activeProjects > 0} />
                <StatCard icon={<Sparkles size={16} />}   label="Conversations IA"   value={conversations.length} sub={qualifiedConvs > 0 ? `${qualifiedConvs} qualifiées` : undefined}  color="#06B6D4" />
                <StatCard icon={<BarChart2 size={16} />}  label="Sondages"           value={sondageCount}          color="#A855F7" />
              </div>

              {/* Charts */}
              <SectionTitle>Évolution</SectionTitle>
              <AdminCharts leads={leads} />

              {/* Recent leads */}
              <div className="mt-8">
                <SectionTitle>Derniers leads</SectionTitle>
                <LeadsTable leads={leads.slice(0, 10)} />
              </div>
            </>
          )}

          {/* ── LEADS (all) ── */}
          {tab === "leads" && (
            <>
              <div className="mb-6">
                <h1 className="font-display text-2xl text-[#0C0B09] mb-1">Tous les leads</h1>
                <p className="font-body text-sm text-[#78716C]">{leads.length} entrées · {newLeads} non lus</p>
              </div>
              <LeadsTable leads={leads} />
            </>
          )}

          {/* ── ARTISTES ── */}
          {tab === "artistes" && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#EC489920" }}>
                  <Mic2 size={18} style={{ color: "#EC4899" }} />
                </div>
                <div>
                  <h1 className="font-display text-2xl text-[#0C0B09]">Leads Artistes</h1>
                  <p className="font-body text-sm text-[#78716C]">{artisteLeads} artiste{artisteLeads !== 1 ? "s" : ""} · {newArtiste} nouveau{newArtiste !== 1 ? "x" : ""}</p>
                </div>
              </div>
              <LeadsTable leads={artisteLeadsList} />
            </>
          )}

          {/* ── ENTREPRISES ── */}
          {tab === "entreprises" && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#3B82F620" }}>
                  <Building2 size={18} style={{ color: "#3B82F6" }} />
                </div>
                <div>
                  <h1 className="font-display text-2xl text-[#0C0B09]">Leads Entreprises</h1>
                  <p className="font-body text-sm text-[#78716C]">{entrepriseLeads} entreprise{entrepriseLeads !== 1 ? "s" : ""} · {newEntreprise} nouveau{newEntreprise !== 1 ? "x" : ""}</p>
                </div>
              </div>
              <LeadsTable leads={entrepriseLeadsList} />
            </>
          )}

          {/* ── CLIENTS ── */}
          {tab === "clients" && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#8B5CF620" }}>
                  <Users size={18} style={{ color: "#8B5CF6" }} />
                </div>
                <div>
                  <h1 className="font-display text-2xl text-[#0C0B09]">Clients</h1>
                  <p className="font-body text-sm text-[#78716C]">{clients.length} clients · {activeClients} actifs · {pendingClients} en attente</p>
                </div>
              </div>
              <ClientsPanel clients={clients} />
            </>
          )}

          {/* ── PROJECTS ── */}
          {tab === "projects" && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F59E0B20" }}>
                  <FolderOpen size={18} style={{ color: "#F59E0B" }} />
                </div>
                <div>
                  <h1 className="font-display text-2xl text-[#0C0B09]">Projets</h1>
                  <p className="font-body text-sm text-[#78716C]">{projects.length} projets · {activeProjects} en cours</p>
                </div>
              </div>
              <ProjectsPanel projects={projects} clients={clients} />
            </>
          )}

          {/* ── ROADMAP ── */}
          {tab === "roadmap" && <RoadmapGuide />}

          {/* ── CONVERSATIONS ── */}
          {tab === "conversations" && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#06B6D420" }}>
                  <Sparkles size={18} style={{ color: "#06B6D4" }} />
                </div>
                <div>
                  <h1 className="font-display text-2xl text-[#0C0B09]">Conversations IA</h1>
                  <p className="font-body text-sm text-[#78716C]">{conversations.length} conversations · {qualifiedConvs} qualifiées</p>
                </div>
              </div>
              <ConversationsPanel conversations={conversations} />
            </>
          )}

        </div>
      </main>
    </>
  );
}
