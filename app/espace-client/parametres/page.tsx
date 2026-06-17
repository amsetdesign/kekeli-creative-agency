import type { Metadata } from "next";
import { Suspense } from "react";
import ParametresForm from "./ParametresForm";

export const metadata: Metadata = { title: "Paramètres — Espace Client KEKELI" };

export default function ParametresPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-[#0C0B09] mb-1">Paramètres</h1>
        <p className="font-body text-sm text-[#78716C]">Gérez votre profil et votre mot de passe</p>
      </div>
      <Suspense fallback={
        <div className="max-w-lg space-y-6 animate-pulse">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6">
            <div className="h-4 w-40 bg-[#E7E5E4] rounded-full mb-4" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F5F5F4]">
              <div className="w-10 h-10 rounded-full bg-[#E7E5E4] shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3.5 w-48 bg-[#E7E5E4] rounded-full" />
                <div className="h-3 w-24 bg-[#E7E5E4] rounded-full" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-4">
            <div className="h-4 w-44 bg-[#E7E5E4] rounded-full mb-2" />
            <div className="h-11 w-full bg-[#F5F5F4] rounded-xl" />
            <div className="h-11 w-full bg-[#F5F5F4] rounded-xl" />
            <div className="h-11 w-full bg-[#E7E5E4] rounded-xl" />
          </div>
        </div>
      }>
        <ParametresForm />
      </Suspense>
    </div>
  );
}
