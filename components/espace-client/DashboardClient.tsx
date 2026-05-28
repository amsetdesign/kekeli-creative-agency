"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ProjectRequestModal from "./ProjectRequestModal";

interface Props {
  clientName: string;
}

export default function DashboardClient({ clientName }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-tour="new-project"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C8A84B] text-black font-body text-sm font-semibold hover:bg-[#b8963d] transition-colors shrink-0"
      >
        <Plus size={16} />
        Nouveau projet
      </button>

      <ProjectRequestModal
        open={open}
        onClose={() => setOpen(false)}
        clientName={clientName}
      />
    </>
  );
}
