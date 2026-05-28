import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sondageConfigs } from "@/data/sondages";
import SondageEngine from "@/components/sondage/SondageEngine";

export function generateStaticParams() {
  return ["entreprise", "artiste", "vendeur", "marque", "evenement"].map((type) => ({
    type,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const config = sondageConfigs[type];
  if (!config) return { title: "Audit — KEKELI" };
  return {
    title: `${config.heroTitle} — KEKELI Creative Agency`,
    description: config.heroSubtitle,
    alternates: { canonical: `/sondage/${type}` },
    openGraph: {
      title: `${config.heroTitle} — KEKELI Creative Agency`,
      description: config.heroSubtitle,
      url: `/sondage/${type}`,
    },
  };
}

export default async function SondageTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = sondageConfigs[type];

  if (!config) notFound();

  return (
    <main>
      <SondageEngine config={config} />
    </main>
  );
}
