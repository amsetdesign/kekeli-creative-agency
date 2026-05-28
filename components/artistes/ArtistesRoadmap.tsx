import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const phases = [
  {
    num: "01",
    title: "Découverte & Identité",
    desc: "Audit complet de votre profil artistique, définition de votre univers unique et de votre positionnement.",
    color: "#8B5CF6",
    items: ["Audit artistique", "Définition identité", "Positionnement marché"],
  },
  {
    num: "02",
    title: "Branding & Image",
    desc: "Création de tous les éléments visuels de votre marque artistique : logo, charte, templates.",
    color: "#C8A84B",
    items: ["Logo & identité visuelle", "Charte graphique", "Templates réseaux"],
  },
  {
    num: "03",
    title: "Création Contenu & Visibilité",
    desc: "Production de contenu premium : clips, photos, vidéos, et déploiement sur toutes les plateformes.",
    color: "#EC4899",
    items: ["Clips & visuels", "Shooting photo", "Stratégie contenu"],
  },
  {
    num: "04",
    title: "Distribution & Croissance",
    desc: "Mise en ligne sur toutes les plateformes streaming, stratégie de playlisting et croissance d'audience.",
    color: "#4C9BFF",
    items: ["Distribution streaming", "Stratégie TikTok/IG", "Croissance fanbase"],
  },
  {
    num: "05",
    title: "Monétisation & Rayonnement",
    desc: "Activation de tous les leviers de revenus : droits d'auteur, streaming, partenariats, live.",
    color: "#10B981",
    items: ["SACEM/SODAV", "Partenariats", "Stratégie revenus"],
  },
];

export default function ArtistesRoadmap() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#0C0B09" }}>
      {/* Background decorations */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10"
          style={{ background: "#8B5CF6" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[130px] opacity-10"
          style={{ background: "#C8A84B" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <SectionHeader
            eyebrow="Notre approche"
            title={
              <>
                La roadmap de votre{" "}
                <em className="text-gold not-italic">succès</em>
              </>
            }
            subtitle="5 phases structurées pour transformer votre talent en carrière professionnelle durable."
            centered
            light
          />
        </FadeIn>

        {/* Desktop — horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting gold line */}
          <div
            className="absolute top-[3.25rem] left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-px"
            style={{ background: "linear-gradient(90deg, transparent, #C8A84B, #C8A84B, #C8A84B, transparent)" }}
            aria-hidden
          />

          <FadeInStagger className="grid grid-cols-5 gap-4" staggerDelay={0.12}>
            {phases.map((phase) => (
              <FadeInItem key={phase.num}>
                <div className="flex flex-col items-center text-center">
                  {/* Phase number circle */}
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center z-10 mb-6 shrink-0"
                    style={{
                      background: `${phase.color}22`,
                      border: `2px solid ${phase.color}`,
                      boxShadow: `0 0 24px ${phase.color}44`,
                    }}
                  >
                    <span
                      className="font-display font-bold text-xl"
                      style={{ color: phase.color }}
                    >
                      {phase.num}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-white mb-3 leading-snug px-2">
                    {phase.title}
                  </h3>
                  <p className="font-body text-xs text-white/45 leading-relaxed mb-4 px-1">
                    {phase.desc}
                  </p>

                  <ul className="space-y-1.5 w-full">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 justify-center">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: phase.color }}
                        />
                        <span className="font-body text-[11px] text-white/50">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>

        {/* Mobile — vertical */}
        <div className="lg:hidden space-y-0">
          {phases.map((phase, i) => (
            <FadeIn key={phase.num} delay={i * 0.08}>
              <div className="flex gap-6">
                {/* Left column — circle + line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: `${phase.color}22`,
                      border: `2px solid ${phase.color}`,
                    }}
                  >
                    <span
                      className="font-display font-bold text-base"
                      style={{ color: phase.color }}
                    >
                      {phase.num}
                    </span>
                  </div>
                  {i < phases.length - 1 && (
                    <div
                      className="w-px flex-1 mt-3"
                      style={{ background: `linear-gradient(to bottom, ${phase.color}60, transparent)` }}
                    />
                  )}
                </div>

                {/* Right column — content */}
                <div className="pb-10">
                  <h3 className="font-display text-xl text-white mb-2 leading-snug">
                    {phase.title}
                  </h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-4">
                    {phase.desc}
                  </p>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: phase.color }}
                        />
                        <span className="font-body text-xs text-white/55">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
