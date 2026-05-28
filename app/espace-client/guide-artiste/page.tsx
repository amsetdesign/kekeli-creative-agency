"use client";

import dynamic from "next/dynamic";
import { BookOpen } from "lucide-react";

const EbookArtisteViewer = dynamic(
  () => import("@/components/admin/ebooks/EbookArtisteViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse"
          style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}>
          <BookOpen size={20} style={{ color: "#8B5CF6" }} />
        </div>
        <p className="font-body text-sm text-[#78716C]">Chargement du guide…</p>
      </div>
    ),
  }
);

export default function GuideArtistePage() {
  return <EbookArtisteViewer />;
}
