import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kekeli.agency";
  const now = new Date();

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/realisations/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    // Core
    { url: base,                             lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/services`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/realisations`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/a-propos`,               lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,                lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/brief`,                  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/experience`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/impact`,                 lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/certification`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Sondage
    { url: `${base}/sondage`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sondage/entreprise`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sondage/artiste`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sondage/vendeur`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sondage/marque`,         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sondage/evenement`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Services artistes
    { url: `${base}/artistes`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/artistes/direction`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/branding`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/clips`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/photo`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/accompagnement`,lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/strategie`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/distribution`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/marketing`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/identite`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artistes/monetisation`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Services entreprises
    { url: `${base}/entreprises`,                  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/entreprises/branding`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprises/site-web`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprises/community`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprises/publicite`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprises/strategie`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprises/photo-video`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprises/coaching`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprises/applications`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Outils IA entreprises
    { url: `${base}/entreprises/brand-score`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/entreprises/audit-visibilite`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/entreprises/reseau-ideal`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/entreprises/diagnostic`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Outils IA artistes
    { url: `${base}/artistes/vision`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/artistes/analyse-reseaux`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/artistes/strategie-lancement`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/artistes/moodboard`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...servicePages,
    ...projectPages,
  ];
}
