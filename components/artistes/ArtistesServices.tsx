"use client";

import Image from "next/image";
import {
  Palette, Music2, Video, Camera, Users, TrendingUp,
  Headphones, Target, Globe, Coins, Mic2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/providers/LanguageProvider";

interface ServiceText { title: string; desc: string; items: string[] }

const SERVICE_TEXT_FR: ServiceText[] = [
  { title: "Direction Artistique", desc: "Construisez une identité artistique cohérente et mémorable.", items: ["Identité artistique & univers visuel", "Storytelling artiste", "Positionnement musical", "Vision artistique & esthétique globale", "Direction créative complète"] },
  { title: "Branding Artiste", desc: "Une image de marque qui vous distingue.", items: ["Logo artiste & identité visuelle", "Covers singles et albums", "Templates réseaux sociaux", "Branding premium cohérent", "Univers de marque artistique"] },
  { title: "Clips & Vidéos", desc: "Des visuels qui racontent votre histoire.", items: ["Réalisation clips professionnels", "Visualizers & lyrics vidéos animées", "Reels & contenus TikTok", "Shorts YouTube & teasers", "Storytelling vidéo cinématique"] },
  { title: "Photo Shooting", desc: "Des images qui captent votre essence.", items: ["Shooting studio & extérieur", "Portraits artistes premium", "Cover artworks", "Contenus réseaux sociaux", "Editing & retouche professionnels"] },
  { title: "Accompagnement Artistique", desc: "De zéro à professionnel, on est là.", items: ["Coaching artistique personnalisé", "Stratégie carrière long terme", "Préparation sorties musicales", "Développement image & mindset", "Structuration carrière artistique"] },
  { title: "Stratégie Digitale", desc: "Votre visibilité, amplifiée.", items: ["Stratégie lancement d'album/single", "Communication réseaux sociaux", "Campagnes digitales ciblées", "Branding viral & storytelling", "Campagnes TikTok & Instagram"] },
  { title: "Distribution Musicale", desc: "Vos sons sur toutes les plateformes.", items: ["Spotify, Apple Music, Deezer", "Audiomack, Boomplay, YouTube Music", "Optimisation métadonnées", "Stratégie streaming & playlisting", "Monétisation plateformes"] },
  { title: "Marketing Digital", desc: "Construisez et fédérez votre fanbase.", items: ["Croissance audience organique", "SEO YouTube & Spotify", "Stratégie TikTok virale", "Campagnes publicité digitale", "Analytics & reporting artiste"] },
  { title: "Identité Digitale", desc: "Votre présence digitale au niveau supérieur.", items: ["Site web artiste professionnel", "EPK (Electronic Press Kit)", "Portfolio & landing pages", "Merchandising digital", "Newsletter & espace fan"] },
  { title: "Événementiel & Showcase", desc: "Des lives mémorables.", items: ["Organisation showcases", "Branding concerts & scénographie", "Captation live professionnelle", "Livestream & contenus événementiels", "Communication événementielle"] },
  { title: "Monétisation & Business", desc: "Vivez enfin de votre musique.", items: ["Stratégies revenus diversifiées", "Inscription SACEM / SODAV", "Gestion droits d'auteur & royalties", "Sponsoring & partenariats marques", "Merchandising & produits digitaux"] },
];

const SERVICE_TEXT_EN: ServiceText[] = [
  { title: "Artistic Direction", desc: "Build a coherent and memorable artistic identity.", items: ["Artistic identity & visual universe", "Artist storytelling", "Musical positioning", "Artistic vision & global aesthetic", "Complete creative direction"] },
  { title: "Artist Branding", desc: "A brand image that sets you apart.", items: ["Artist logo & visual identity", "Single and album covers", "Social media templates", "Premium coherent branding", "Artistic brand universe"] },
  { title: "Clips & Videos", desc: "Visuals that tell your story.", items: ["Professional music video production", "Visualizers & animated lyrics videos", "Reels & TikTok content", "YouTube Shorts & teasers", "Cinematic video storytelling"] },
  { title: "Photo Shooting", desc: "Images that capture your essence.", items: ["Studio & outdoor shooting", "Premium artist portraits", "Cover artworks", "Social media content", "Professional editing & retouching"] },
  { title: "Artist Coaching", desc: "From zero to professional, we're here.", items: ["Personalized artistic coaching", "Long-term career strategy", "Music release preparation", "Image & mindset development", "Artistic career structuring"] },
  { title: "Digital Strategy", desc: "Your visibility, amplified.", items: ["Album/single launch strategy", "Social media communication", "Targeted digital campaigns", "Viral branding & storytelling", "TikTok & Instagram campaigns"] },
  { title: "Music Distribution", desc: "Your music on all platforms.", items: ["Spotify, Apple Music, Deezer", "Audiomack, Boomplay, YouTube Music", "Metadata optimization", "Streaming & playlist strategy", "Platform monetization"] },
  { title: "Digital Marketing", desc: "Build and unite your fanbase.", items: ["Organic audience growth", "YouTube & Spotify SEO", "Viral TikTok strategy", "Digital advertising campaigns", "Analytics & artist reporting"] },
  { title: "Digital Identity", desc: "Your digital presence at the next level.", items: ["Professional artist website", "EPK (Electronic Press Kit)", "Portfolio & landing pages", "Digital merchandising", "Newsletter & fan space"] },
  { title: "Events & Showcases", desc: "Memorable live performances.", items: ["Showcase organization", "Concert branding & scenography", "Professional live capture", "Livestream & event content", "Event communication"] },
  { title: "Monetization & Business", desc: "Finally live off your music.", items: ["Diversified revenue strategies", "SACEM / SODAV registration", "Copyright & royalties management", "Brand sponsorships & partnerships", "Merchandising & digital products"] },
];

const SERVICE_STATIC = [
  { id: "direction",     icon: Palette,    color: "#8B5CF6", img: "photo-1493676304819-0d7a8d026dcf" },
  { id: "branding",      icon: Music2,     color: "#C8A84B", img: "photo-1558618666-fcd25c85cd64" },
  { id: "clips",         icon: Video,      color: "#EC4899", img: "photo-1598452963314-b09f397a5c48" },
  { id: "photo",         icon: Camera,     color: "#0891B2", img: "photo-1520523839897-bd0b52f945a0" },
  { id: "accompagnement",icon: Users,      color: "#10B981", img: "photo-1499364615650-ec38552f4f34" },
  { id: "strategie",     icon: TrendingUp, color: "#3B82F6", img: "photo-1611162617213-7d7a39e9b1d7" },
  { id: "distribution",  icon: Headphones, color: "#C8A84B", img: "photo-1505740420928-5e560c06d30e" },
  { id: "marketing",     icon: Target,     color: "#F97316", img: "photo-1611162616305-c69b3fa7fbe0" },
  { id: "identite",      icon: Globe,      color: "#EC4899", img: "photo-1467232004584-a241de8bcf5d" },
  { id: "evenementiel",  icon: Mic2,       color: "#9333EA", img: "photo-1470229722913-7c0e2dbbafd3" },
  { id: "monetisation",  icon: Coins,      color: "#16A34A", img: "photo-1554224155-6726b3ff858f" },
];

interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  desc: string;
  items: string[];
  img: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const isDark = index % 2 === 0;
  const isReversed = index % 2 !== 0;
  const Icon = service.icon;

  return (
    <section
      id={service.id}
      className={`scroll-mt-24 py-20 ${isDark ? "bg-bg-dark" : "bg-bg-primary"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            isReversed ? "lg:grid-flow-col-reverse" : ""
          }`}
        >
          {/* Image */}
          <FadeIn direction={isReversed ? "right" : "left"} className={isReversed ? "lg:order-2" : ""}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
              <Image
                src={`https://images.unsplash.com/${service.img}?w=800&h=600&q=80&auto=format&fit=crop`}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Colored overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-40"
                style={{ background: service.color }}
              />
              {/* Badge */}
              <div
                className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
                style={{ background: `${service.color}33`, border: `1px solid ${service.color}44` }}
              >
                <Icon size={15} style={{ color: service.color }} />
                <span className="font-body text-xs font-semibold text-white tracking-wide">
                  {service.title}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction={isReversed ? "left" : "right"} delay={0.1} className={isReversed ? "lg:order-1" : ""}>
            <div>
              {/* Icon badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}
              >
                <Icon size={15} style={{ color: service.color }} />
                <span
                  className="font-body text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: service.color }}
                >
                  {service.title}
                </span>
              </div>

              <h2
                className={`font-display text-4xl md:text-5xl mb-4 leading-tight ${
                  isDark ? "text-white" : "text-text-primary"
                }`}
              >
                {service.title}
              </h2>

              <p
                className={`font-body text-lg mb-8 leading-relaxed ${
                  isDark ? "text-white/60" : "text-text-muted"
                }`}
              >
                {service.desc}
              </p>

              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: service.color }}
                    />
                    <span
                      className={`font-body text-sm ${
                        isDark ? "text-white/75" : "text-text-secondary"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default function ArtistesServices() {
  const tr = useT();
  const a = tr.pages.artists;
  const { locale } = useLanguage();
  const textArr = locale === "fr" ? SERVICE_TEXT_FR : SERVICE_TEXT_EN;
  const services: Service[] = SERVICE_STATIC.map((s, i) => ({ ...s, ...textArr[i] }));

  return (
    <>
      {/* Section header */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              eyebrow={a.servicesEyebrow}
              title={
                <>
                  {a.servicesTitle1}{" "}
                  <em className="text-gold not-italic">{a.servicesTitleHL}</em>{" "}
                  {a.servicesTitleRest}
                </>
              }
              subtitle={a.servicesSub}
              centered
            />
          </FadeIn>
        </div>
      </section>

      {/* Service cards */}
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </>
  );
}
