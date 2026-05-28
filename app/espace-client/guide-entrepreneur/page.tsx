"use client";

import dynamic from "next/dynamic";
import { BookOpen } from "lucide-react";

const EbookEntrepreneurViewer = dynamic(
  () => import("@/components/admin/ebooks/EbookEntrepreneurViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse"
          style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.2)" }}>
          <BookOpen size={20} style={{ color: "#0EA5E9" }} />
        </div>
        <p className="font-body text-sm text-[#78716C]">Chargement du guide…</p>
      </div>
    ),
  }
);

export default function GuideEntrepreneurPage() {
  return <EbookEntrepreneurViewer />;
}
