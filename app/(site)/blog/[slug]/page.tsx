import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { getSupabase } from "@/lib/supabase";

export const revalidate = 60;

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

/* ── Minimal markdown → React nodes ────────────────────────── */
function BlogContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];
  let listBuf: string[] = [];

  function flushList(key: string) {
    if (!listBuf.length) return;
    nodes.push(
      <ul key={key} className="list-disc pl-6 mb-5 space-y-1.5">
        {listBuf.map((item, i) => (
          <li key={i} className="font-body text-[#44403C] text-base leading-relaxed">{inlineFormat(item)}</li>
        ))}
      </ul>
    );
    listBuf = [];
  }

  function inlineFormat(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold text-[#0C0B09]">{p.slice(2, -2)}</strong>;
      if (p.startsWith("*") && p.endsWith("*"))   return <em key={i}>{p.slice(1, -1)}</em>;
      return p;
    });
  }

  lines.forEach((line, i) => {
    const key = `l${i}`;
    if (line.startsWith("# ")) {
      flushList(key);
      nodes.push(<h2 key={key} className="font-display text-3xl sm:text-4xl text-[#0C0B09] mt-10 mb-4 leading-tight">{line.slice(2)}</h2>);
    } else if (line.startsWith("## ")) {
      flushList(key);
      nodes.push(<h3 key={key} className="font-display text-2xl text-[#0C0B09] mt-8 mb-3">{line.slice(3)}</h3>);
    } else if (line.startsWith("### ")) {
      flushList(key);
      nodes.push(<h4 key={key} className="font-body text-lg font-semibold text-[#0C0B09] mt-6 mb-2">{line.slice(4)}</h4>);
    } else if (line.startsWith("- ")) {
      listBuf.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList(key);
    } else {
      flushList(key);
      nodes.push(<p key={key} className="font-body text-[#44403C] text-base sm:text-lg leading-relaxed mb-5">{inlineFormat(line)}</p>);
    }
  });
  flushList("end");

  return <>{nodes}</>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const db = getSupabase();
  const { data } = await db.from("blog_posts").select("title, excerpt, cover_image").eq("slug", slug).eq("published", true).single();
  if (!data) return { title: "Article — KEKELI Creative Agency" };
  return {
    title: data.title,
    description: data.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${data.title} — KEKELI Creative Agency`,
      description: data.excerpt ?? undefined,
      url: `/blog/${slug}`,
      images: data.cover_image ? [{ url: data.cover_image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = getSupabase();

  const { data: post } = await db
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  // Related posts (same category, excluding current)
  const { data: related } = await db
    .from("blog_posts")
    .select("id, title, slug, excerpt, category, cover_image, published_at")
    .eq("published", true)
    .eq("category", post.category)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(3);

  const accentColor = CAT_COLORS[post.category] ?? "#C8A84B";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[52vh] flex items-end pb-14 overflow-hidden bg-[#0C0B09]">
        {post.cover_image && (
          <div className="absolute inset-0">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover opacity-20" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09] via-[#0C0B09]/70 to-[#0C0B09]/30" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-[#C8A84B] transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#C8A84B] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/70 truncate max-w-[200px]">{post.title}</span>
            </nav>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full font-body text-xs font-semibold uppercase tracking-wider"
                style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}>
                {CATEGORIES[post.category] ?? post.category}
              </span>
              <span className="font-body text-xs text-white/40 flex items-center gap-1">
                <Clock size={11} /> {fmtDate(post.published_at ?? post.created_at)}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-body text-lg text-white/60 max-w-2xl">{post.excerpt}</p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────── */}
      <div className="bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Cover image (if hero bg wasn't set, show it here) */}
          {post.cover_image && (
            <FadeIn direction="up" className="mb-12">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden [box-shadow:0_8px_48px_rgba(12,11,9,0.14)]">
                <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
              </div>
            </FadeIn>
          )}

          {/* Content */}
          <FadeIn direction="up" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <BlogContent content={post.content} />
            </div>
          </FadeIn>

          {/* Divider */}
          <div className="max-w-2xl mx-auto mt-14 pt-8 border-t border-[#E7E5E4]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Tag size={13} className="text-[#A8A29E]" />
                <span className="font-body text-sm px-3 py-1 rounded-full border border-[#E7E5E4] text-[#44403C]">
                  {CATEGORIES[post.category] ?? post.category}
                </span>
              </div>
              <Link href="/blog"
                className="font-body text-sm text-[#78716C] hover:text-[#0C0B09] flex items-center gap-1 transition-colors">
                <ArrowLeft size={13} /> Retour au blog
              </Link>
            </div>
          </div>

          {/* CTA */}
          <FadeIn direction="up" className="mt-14">
            <div className="bg-[#0C0B09] rounded-3xl p-10 text-center">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-3">Passons à l&apos;action</p>
              <h2 className="font-display text-3xl text-white mb-3">
                Besoin d&apos;un accompagnement <em className="text-[#C8A84B] not-italic">personnalisé</em> ?
              </h2>
              <p className="font-body text-white/55 mb-7 max-w-md mx-auto">
                KEKELI vous accompagne dans votre stratégie digitale. Réponse sous 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/brief"
                  className="inline-flex items-center gap-2 bg-[#C8A84B] text-white px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-[#b8963d] transition-colors">
                  Brief Express <ArrowRight size={14} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-body text-sm hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors">
                  Nous contacter
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Related posts */}
          {related && related.length > 0 && (
            <div className="mt-16">
              <FadeIn direction="up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl text-[#0C0B09]">Articles similaires</h3>
                  <Link href="/blog" className="font-body text-sm text-[#C8A84B] hover:text-[#b8963d] transition-colors flex items-center gap-1">
                    Voir tout <ArrowRight size={13} />
                  </Link>
                </div>
              </FadeIn>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {related.map((r, i) => (
                  <FadeIn key={r.id} direction="up" delay={i * 0.08}>
                    <Link href={`/blog/${r.slug}`}
                      className="group block bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:[box-shadow:0_6px_24px_rgba(12,11,9,0.10)] hover:-translate-y-0.5 transition-all duration-300">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {r.cover_image ? (
                          <Image src={r.cover_image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0C0B09] to-[#1a1208] flex items-center justify-center">
                            <span className="font-display text-4xl text-[#C8A84B]/20">K</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-display text-sm font-semibold text-[#0C0B09] group-hover:text-[#C8A84B] transition-colors leading-snug">
                          {r.title}
                        </p>
                        {r.excerpt && (
                          <p className="font-body text-xs text-[#78716C] mt-1 line-clamp-2">{r.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back link */}
      <div className="bg-[#FAFAF8] border-t border-[#E7E5E4] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog"
            className="inline-flex items-center gap-2 font-body text-sm text-[#78716C] hover:text-[#0C0B09] transition-colors">
            <ArrowLeft size={14} /> Retour au blog
          </Link>
        </div>
      </div>
    </>
  );
}
