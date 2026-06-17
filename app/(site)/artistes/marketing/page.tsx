import type { Metadata } from "next";
import MarketingForm from "@/components/marketing/MarketingForm";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Marketing Digital | KEKELI Creative Agency",
  description: "Publicité payante, promotion de sorties et placements influenceurs pour artistes africains.",
};

const ACCENT       = "#F97316";
const ACCENT_LIGHT = "#FED7AA";
const DARK_BG      = "#0C0B09";
const CREAM_BG     = "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)";

const services = [
  {
    emoji: "📣",
    title: "Publicité payante (Ads)",
    desc: "Campagnes Facebook Ads, Instagram Ads, TikTok Ads et YouTube Ads ultra-ciblées pour toucher votre audience idéale au bon moment.",
    items: ["Facebook & Instagram Ads", "TikTok Ads performantes", "YouTube Ads pré-roll", "Google Display Ads", "Boomplay & Spotify Ads"],
  },
  {
    emoji: "🎯",
    title: "Promotion clips & sorties",
    desc: "Stratégie de lancement complète pour maximiser vues, streams et téléchargements dès la première semaine de sortie.",
    items: ["Boost YouTube & TikTok", "Playlist Spotify & Boomplay", "Distribution presse digitale", "Push réseaux sociaux", "Suivi analytics en temps réel"],
  },
  {
    emoji: "🌟",
    title: "Influenceurs & placements",
    desc: "Réseau qualifié de créateurs africains et de la diaspora pour amplifier votre message auprès d'audiences engagées.",
    items: ["Pages musicales africaines", "Influenceurs lifestyle Dakar", "Blogueurs & critiques musicaux", "DJs & animateurs radio", "Créateurs TikTok musicaux"],
  },
];

const impacts = [
  { stat: "3×", label: "plus de streams", sub: "en première semaine" },
  { stat: "500+", label: "influenceurs", sub: "dans notre réseau" },
  { stat: "15", label: "pays couverts", sub: "Afrique & diaspora" },
  { stat: "24h", label: "pour démarrer", sub: "campagne active" },
];

const processSteps = [
  { n: "01", title: "Brief & Objectifs",     desc: "Vous remplissez le formulaire détaillant votre projet, vos objectifs et votre budget. Nous analysons votre brief sous 24h." },
  { n: "02", title: "Stratégie personnalisée", desc: "Notre équipe conçoit un plan de campagne sur mesure : plateformes, ciblage, formats, calendrier et KPIs attendus." },
  { n: "03", title: "Création des contenus",  desc: "Rédaction des copies publicitaires, sélection des visuels et adaptation des formats pour chaque plateforme." },
  { n: "04", title: "Lancement & Suivi",       desc: "Mise en ligne des campagnes avec monitoring quotidien et optimisations en temps réel pour maximiser les performances." },
  { n: "05", title: "Rapport & Analyse",       desc: "Rapport complet à la fin de chaque campagne avec les KPIs atteints, les insights et les recommandations pour la suite." },
];

const whyItems = [
  { emoji: "🌍", title: "Expertise Afrique",       desc: "Nous connaissons les spécificités des marchés africains et de la diaspora. Ciblage précis, coûts optimisés." },
  { emoji: "🎵", title: "Culture musicale",         desc: "Notre équipe est passionnée de musique africaine. Nous parlons le même langage que votre audience." },
  { emoji: "📊", title: "Données & Performance",    desc: "Décisions basées sur les données, pas l'intuition. Chaque euro investi est suivi et justifié." },
  { emoji: "🤝", title: "Partenariat long terme",   desc: "Nous ne faisons pas du one-shot. Nous construisons votre présence digitale sur le long terme." },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ background: DARK_BG }} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT}12 0%, transparent 70%)` }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-semibold mb-8"
              style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}>
              <span>📣</span> Marketing Digital
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              Faites exploser<br />
              <em className="not-italic" style={{ color: ACCENT }}>votre visibilité</em>
            </h1>
            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Publicité payante, promotion de sorties et placements influenceurs — nous mettons votre musique devant des millions d'auditeurs africains et de la diaspora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#formulaire"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-body font-bold text-base text-black transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.40)" }}>
                Lancer ma campagne →
              </a>
              <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-body text-sm text-white/60"
                style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
                ✓ Devis sous 24h &nbsp;·&nbsp; ✓ Sans engagement
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Chiffres clés ──────────────────────────────────────── */}
      <section style={{ background: DARK_BG }} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impacts.map(({ stat, label, sub }) => (
              <FadeIn key={stat}>
                <div className="text-center p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="font-display text-3xl font-bold mb-1" style={{ color: ACCENT }}>{stat}</p>
                  <p className="font-body text-sm font-semibold text-white mb-0.5">{label}</p>
                  <p className="font-body text-xs text-white/40">{sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section style={{ background: CREAM_BG }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Nos services</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1C0A40] mb-4">Marketing complet pour artistes</h2>
              <p className="font-body text-base text-[#78716C] max-w-2xl mx-auto">
                Trois piliers complémentaires pour maximiser l&apos;impact de chaque sortie et construire votre présence digitale sur la durée.
              </p>
            </div>
          </FadeIn>
          <FadeInStagger>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map(({ emoji, title, desc, items }) => (
                <FadeInItem key={title}>
                  <div className="bg-white rounded-3xl p-8 h-full" style={{ boxShadow: "0 4px 24px rgba(28,10,64,0.08)", border: "1px solid rgba(28,10,64,0.06)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                      style={{ background: `${ACCENT}14` }}>
                      {emoji}
                    </div>
                    <h3 className="font-display text-xl text-[#1C0A40] mb-3">{title}</h3>
                    <p className="font-body text-sm text-[#78716C] leading-relaxed mb-5">{desc}</p>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-center gap-2 font-body text-sm text-[#44403C]">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInItem>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────── */}
      <section style={{ background: DARK_BG }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT_LIGHT }}>Notre méthode</p>
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">De l&apos;idée au million de vues</h2>
              <p className="font-body text-base text-white/50 max-w-xl mx-auto">
                Un processus structuré et transparent, de la stratégie au rapport de performance.
              </p>
            </div>
          </FadeIn>
          <FadeInStagger>
            <div className="space-y-4">
              {processSteps.map(({ n, title, desc }) => (
                <FadeInItem key={n}>
                  <div className="flex gap-6 p-6 rounded-2xl items-start" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="font-display text-3xl font-bold shrink-0 mt-0.5" style={{ color: `${ACCENT}50` }}>{n}</span>
                    <div>
                      <h3 className="font-body font-bold text-base text-white mb-1">{title}</h3>
                      <p className="font-body text-sm text-white/50 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </section>

      {/* ── Pourquoi KEKELI ────────────────────────────────────── */}
      <section style={{ background: CREAM_BG }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Pourquoi KEKELI</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1C0A40] mb-4">Votre marketing, notre priorité</h2>
            </div>
          </FadeIn>
          <FadeInStagger>
            <div className="grid sm:grid-cols-2 gap-6">
              {whyItems.map(({ emoji, title, desc }) => (
                <FadeInItem key={title}>
                  <div className="flex gap-4 p-6 rounded-2xl bg-white" style={{ boxShadow: "0 2px 12px rgba(28,10,64,0.06)", border: "1px solid rgba(28,10,64,0.06)" }}>
                    <span className="text-2xl shrink-0">{emoji}</span>
                    <div>
                      <h3 className="font-body font-bold text-base text-[#1C0A40] mb-1">{title}</h3>
                      <p className="font-body text-sm text-[#78716C] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </section>

      {/* ── Formulaire ─────────────────────────────────────────── */}
      <section id="formulaire" style={{ background: DARK_BG }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT_LIGHT }}>Formulaire</p>
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">Parlez-nous de votre campagne</h2>
              <p className="font-body text-base text-white/50">
                Remplissez ce brief et recevez un plan de campagne personnalisé sous 24h.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="rounded-3xl p-8 md:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <MarketingForm />
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
