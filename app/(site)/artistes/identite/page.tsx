import type { Metadata } from "next";
import IdentiteForm from "@/components/identite/IdentiteForm";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Identité Digitale | KEKELI Creative Agency",
  description: "Site web artiste, EPK, biographie professionnelle et pack réseaux sociaux pour artistes africains.",
};

const ACCENT       = "#FF6B6B";
const ACCENT_LIGHT = "#FECACA";
const DARK_BG      = "#0C0B09";
const CREAM_BG     = "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)";

const services = [
  {
    emoji: "🌐",
    title: "Site web artiste",
    desc: "Un site professionnel qui reflète votre univers et s'ouvre les portes des bookings, des médias et des collaborations.",
    items: ["Design sur mesure", "Mobile-first & rapide", "Intégration streaming", "Espace presse", "Formulaire contact"],
  },
  {
    emoji: "📁",
    title: "EPK (Electronic Press Kit)",
    desc: "Le dossier de presse numérique incontournable pour décrocher des festivals, des interviews et des partenariats stratégiques.",
    items: ["Biographie percutante", "Discographie illustrée", "Revue de presse", "Liens streaming & vidéos", "Version PDF + Web"],
  },
  {
    emoji: "✍️",
    title: "Bio & Textes",
    desc: "Des textes qui racontent votre histoire avec authenticité et impact — en français, en anglais, adaptés à chaque support.",
    items: ["Bio courte, standard, longue", "3 tons au choix", "Bilingue FR / EN", "Textes réseaux sociaux", "Pitch artistique"],
  },
  {
    emoji: "📱",
    title: "Pack réseaux sociaux",
    desc: "Une identité visuelle cohérente sur toutes vos plateformes : photo de profil, bannières, templates stories et posts.",
    items: ["Instagram & TikTok", "Facebook & YouTube", "Templates réutilisables", "Highlights covers", "Bio optimisée"],
  },
];

const impacts = [
  { stat: "4×", label: "plus de contacts", sub: "avec un EPK pro" },
  { stat: "72h", label: "délai moyen", sub: "pour un EPK complet" },
  { stat: "100%", label: "sur mesure", sub: "votre univers, votre style" },
  { stat: "5★", label: "satisfaction", sub: "artistes accompagnés" },
];

const processSteps = [
  { n: "01", title: "Consultation & Découverte",  desc: "Vous remplissez le formulaire et nous échangeons pour comprendre votre univers, vos objectifs et votre audience cible." },
  { n: "02", title: "Moodboard & Validation",      desc: "Nous vous présentons une direction artistique avec moodboard, palette de couleurs et références visuelles pour validation." },
  { n: "03", title: "Création & Rédaction",        desc: "Notre équipe crée vos assets visuels et rédige vos textes en respectant votre univers et le brief validé ensemble." },
  { n: "04", title: "Révisions",                   desc: "Deux rounds de révisions inclus pour affiner chaque détail jusqu'à ce que le résultat vous corresponde parfaitement." },
  { n: "05", title: "Livraison & Formation",       desc: "Vous recevez tous vos fichiers + un guide d'utilisation pour mettre à jour vos profils et utiliser vos templates en autonomie." },
];

const whyItems = [
  { emoji: "🎨", title: "Créatifs & Culturels",    desc: "Notre équipe comprend les codes visuels de la musique africaine et crée des identités authentiquement ancrées dans leur culture." },
  { emoji: "🌍", title: "Pensé pour l'Afrique",    desc: "Des sites rapides même avec une connexion limitée, des visuels adaptés aux goûts de l'audience africaine et de la diaspora." },
  { emoji: "✍️", title: "Copywriting expert",       desc: "Des textes qui convertissent : biographies qui touchent, descriptions qui vendent, pitchs qui ouvrent des portes." },
  { emoji: "🔄", title: "Cohérence totale",         desc: "Site, EPK, bio et réseaux forment un tout cohérent — votre identité digitale parle d'une seule voix partout." },
];

export default function IdentitePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ background: DARK_BG }} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT}12 0%, transparent 70%)` }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-semibold mb-8"
              style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}>
              <span>🌐</span> Identité Digitale
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              Votre présence en ligne,<br />
              <em className="not-italic" style={{ color: ACCENT }}>enfin à votre hauteur</em>
            </h1>
            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Site web, EPK, biographie et visuels réseaux — nous construisons une identité digitale complète et cohérente qui ouvre des portes et marque les esprits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#formulaire"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-body font-bold text-base text-black transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.40)" }}>
                Créer mon identité →
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
              <h2 className="font-display text-3xl sm:text-4xl text-[#1C0A40] mb-4">Tout ce dont vous avez besoin</h2>
              <p className="font-body text-base text-[#78716C] max-w-2xl mx-auto">
                Site web, EPK, bio et réseaux sociaux : une identité digitale 360° pensée pour les artistes africains qui veulent s&apos;imposer.
              </p>
            </div>
          </FadeIn>
          <FadeInStagger>
            <div className="grid md:grid-cols-2 gap-6">
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
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">De zéro à une identité complète</h2>
              <p className="font-body text-base text-white/50 max-w-xl mx-auto">
                Un processus structuré qui garantit un résultat à votre image, livré dans les délais.
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
              <h2 className="font-display text-3xl sm:text-4xl text-[#1C0A40] mb-4">Une identité qui vous ressemble</h2>
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
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">Construisons votre identité</h2>
              <p className="font-body text-base text-white/50">
                Décrivez votre univers et vos besoins — notre équipe vous répond sous 24h avec une proposition sur mesure.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="rounded-3xl p-8 md:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <IdentiteForm />
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
