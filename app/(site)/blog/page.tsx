import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Tag } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { getSupabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conseils en communication digitale, stratégie marketing, branding et actualités de KEKELI Creative Agency.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — KEKELI Creative Agency",
    description: "Conseils en communication digitale, stratégie marketing et branding.",
    url: "/blog",
  },
};

export const revalidate = 60;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
}

const CATEGORIES: Record<string, string> = {
  communication: "Communication digitale",
  artiste:       "Artistes & musique",
  strategie:     "Stratégie & marketing",
  evenement:     "Événements",
  conseil:       "Conseils & astuces",
  agence:        "Vie de l'agence",
};

const CAT_COLORS: Record<string, string> = {
  communication: "#C8A84B",
  artiste:       "#EC4899",
  strategie:     "#3B82F6",
  evenement:     "#10B981",
  conseil:       "#8B5CF6",
  agence:        "#F97316",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const db = getSupabase();
  const { data: posts } = await db
    .from("blog_posts")
    .select("id, title, slug, excerpt, category, cover_image, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const articles = (posts ?? []) as BlogPost[];
  const featured = articles[0];
  const rest     = articles.slice(1);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[38vh] flex items-end pb-14 overflow-hidden bg-[#0C0B09]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C0B09] via-[#1a1208] to-[#0C0B09]" />
        {/* Gold accent */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C8A84B 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-4">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-[#C8A84B] transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Blog</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-3">Ressources</p>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-3">
              Le <em className="text-[#C8A84B] not-italic">blog</em> KEKELI
            </h1>
            <p className="font-body text-lg text-white/55 max-w-lg">
              Stratégie digitale, communication, branding — nos conseils pour les artistes et entreprises africaines.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────── */}
      <div className="bg-[#FAFAF8] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {articles.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl text-[#0C0B09] mb-3">Bientôt disponible</p>
              <p className="font-body text-[#78716C]">Les premiers articles arrivent très prochainement.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <FadeIn direction="up" className="mb-12">
                  <Link href={`/blog/${featured.slug}`}
                    className="group block bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden hover:[box-shadow:0_12px_48px_rgba(12,11,9,0.12)] hover:-translate-y-1 transition-all duration-300">
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-1/2 relative aspect-[16/10] md:aspect-auto">
                        {featured.cover_image ? (
                          <Image src={featured.cover_image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0C0B09] to-[#2a1a00] flex items-center justify-center">
                            <span className="font-display text-7xl text-[#C8A84B]/20">K</span>
                          </div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-2.5 py-0.5 rounded-full font-body text-[11px] font-semibold uppercase tracking-wider border"
                            style={{ color: CAT_COLORS[featured.category] ?? "#C8A84B", borderColor: `${CAT_COLORS[featured.category] ?? "#C8A84B"}40`, background: `${CAT_COLORS[featured.category] ?? "#C8A84B"}10` }}>
                            {CATEGORIES[featured.category] ?? featured.category}
                          </span>
                          <span className="font-body text-xs text-[#A8A29E] flex items-center gap-1">
                            <Clock size={11} /> {fmtDate(featured.published_at ?? featured.created_at)}
                          </span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09] leading-tight mb-4 group-hover:text-[#C8A84B] transition-colors">
                          {featured.title}
                        </h2>
                        {featured.excerpt && (
                          <p className="font-body text-[#78716C] leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                        )}
                        <span className="font-body text-sm font-semibold text-[#C8A84B] group-hover:text-[#b8963d] transition-colors">
                          Lire l&apos;article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <FadeIn key={post.id} direction="up" delay={i * 0.07}>
                      <Link href={`/blog/${post.slug}`}
                        className="group flex flex-col bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:[box-shadow:0_8px_32px_rgba(12,11,9,0.10)] hover:-translate-y-1 transition-all duration-300 h-full">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          {post.cover_image ? (
                            <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0C0B09] to-[#1a1208] flex items-center justify-center">
                              <span className="font-display text-5xl text-[#C8A84B]/20">K</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 rounded-full font-body text-[10px] font-semibold text-white"
                              style={{ background: CAT_COLORS[post.category] ?? "#C8A84B" }}>
                              {CATEGORIES[post.category] ?? post.category}
                            </span>
                          </div>
                        </div>
                        {/* Content */}
                        <div className="flex flex-col flex-1 p-5">
                          <p className="font-body text-xs text-[#A8A29E] mb-2 flex items-center gap-1">
                            <Clock size={10} /> {fmtDate(post.published_at ?? post.created_at)}
                          </p>
                          <h3 className="font-display text-xl text-[#0C0B09] leading-tight mb-2 group-hover:text-[#C8A84B] transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="font-body text-sm text-[#78716C] leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                          )}
                          <span className="font-body text-xs font-semibold text-[#C8A84B] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            Lire →
                          </span>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
