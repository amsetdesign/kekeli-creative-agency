import type { Metadata } from "next";
import { Suspense } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CatalogueViewer from "@/components/admin/CatalogueViewer";

export const metadata: Metadata = { title: "Catalogue Services — KEKELI Admin" };

export default function CataloguePage() {
  const emptyCounts = {
    leads: 0, newLeads: 0,
    artistes: 0, newArtistes: 0,
    entreprises: 0, newEntreprises: 0,
    clients: 0, pending: 0,
    projects: 0, active: 0,
    conversations: 0, newsletter: 0, blog: 0,
  };

  return (
    <>
      <Suspense fallback={<aside className="w-60 shrink-0 min-h-screen" style={{ background: "#0C0B09" }} />}>
        <AdminSidebar counts={emptyCounts} />
      </Suspense>
      <CatalogueViewer />
    </>
  );
}
