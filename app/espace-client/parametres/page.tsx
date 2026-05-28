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
      <Suspense>
        <ParametresForm />
      </Suspense>
    </div>
  );
}
