"use client";

import { useState, useRef } from "react";
import {
  Plus, Edit2, Trash2, ArrowLeft, Globe, FileText,
  Eye, EyeOff, Bold, Italic, Heading2, List, Image as ImageIcon,
} from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { value: "communication", label: "Communication digitale" },
  { value: "artiste",       label: "Artistes & musique" },
  { value: "strategie",     label: "Stratégie & marketing" },
  { value: "evenement",     label: "Événements" },
  { value: "conseil",       label: "Conseils & astuces" },
  { value: "agence",        label: "Vie de l'agence" },
];

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

/* ── Simple markdown preview ── */
function renderMd(md: string) {
  const lines = md.split("\n");
  const out: React.ReactNode[] = [];
  let listBuf: string[] = [];

  const flushList = (key: number) => {
    if (!listBuf.length) return;
    out.push(
      <ul key={`ul-${key}`} className="list-disc pl-5 mb-3 space-y-1">
        {listBuf.map((item, i) => <li key={i} className="text-sm text-[#44403C]">{item}</li>)}
      </ul>
    );
    listBuf = [];
  };

  lines.forEach((line, i) => {
    if (line.startsWith("# ")) {
      flushList(i);
      out.push(<h2 key={i} className="font-display text-2xl text-[#0C0B09] mt-6 mb-2">{line.slice(2)}</h2>);
    } else if (line.startsWith("## ")) {
      flushList(i);
      out.push(<h3 key={i} className="font-display text-xl text-[#0C0B09] mt-5 mb-2">{line.slice(3)}</h3>);
    } else if (line.startsWith("### ")) {
      flushList(i);
      out.push(<h4 key={i} className="font-body text-base font-semibold text-[#0C0B09] mt-4 mb-1">{line.slice(4)}</h4>);
    } else if (line.startsWith("- ")) {
      listBuf.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList(i);
    } else {
      flushList(i);
      const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      out.push(
        <p key={i} className="text-sm text-[#44403C] leading-relaxed mb-2">
          {parts.map((p, j) => {
            if (p.startsWith("**") && p.endsWith("**")) return <strong key={j}>{p.slice(2, -2)}</strong>;
            if (p.startsWith("*") && p.endsWith("*")) return <em key={j}>{p.slice(1, -1)}</em>;
            return p;
          })}
        </p>
      );
    }
  });
  flushList(lines.length);
  return out;
}

const EMPTY: Omit<BlogPost, "id" | "published_at" | "created_at" | "updated_at" | "published"> = {
  title: "", slug: "", excerpt: "", content: "", category: "communication", cover_image: "",
};

/* ═══════════════════════════════════════════════════ EDITOR ═══ */
function BlogEditor({
  initial,
  isNew,
  onSave,
  onBack,
}: {
  initial: typeof EMPTY & { published?: boolean };
  isNew: boolean;
  onSave: (data: typeof EMPTY & { published: boolean }) => Promise<void>;
  onBack: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY, published: false, ...initial });
  const [slugLocked, setSlugLocked] = useState(!isNew);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleTitle(v: string) {
    setForm((f) => ({ ...f, title: v, slug: slugLocked ? f.slug : toSlug(v) }));
  }

  function insert(before: string, after = "") {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = form.content.slice(s, e);
    const next = form.content.slice(0, s) + before + sel + after + form.content.slice(e);
    setForm((f) => ({ ...f, content: next }));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(s + before.length, s + before.length + sel.length); }, 0);
  }

  async function submit(publish: boolean) {
    if (!form.title.trim() || !form.slug.trim()) { alert("Titre et slug requis."); return; }
    setSaving(publish ? "publish" : "draft");
    try { await onSave({ ...form, published: publish }); }
    finally { setSaving(null); }
  }

  const catLabel = CATEGORIES.find((c) => c.value === form.category)?.label ?? form.category;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5E4] bg-white shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 font-body text-sm text-[#78716C] hover:text-[#0C0B09] transition-colors">
          <ArrowLeft size={15} /> Retour à la liste
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7E5E4] font-body text-xs text-[#78716C] hover:bg-[#FAFAF8] transition-colors"
          >
            {preview ? <EyeOff size={13} /> : <Eye size={13} />}
            {preview ? "Éditer" : "Aperçu"}
          </button>
          <button
            onClick={() => submit(false)}
            disabled={!!saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-[#E7E5E4] font-body text-xs font-medium text-[#44403C] hover:bg-[#FAFAF8] disabled:opacity-50 transition-colors"
          >
            <FileText size={13} />
            {saving === "draft" ? "Enregistrement…" : "Brouillon"}
          </button>
          <button
            onClick={() => submit(true)}
            disabled={!!saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-body text-xs font-semibold text-white disabled:opacity-50 transition-colors"
            style={{ background: "linear-gradient(135deg, #C8A84B 0%, #b8963d 100%)" }}
          >
            <Globe size={13} />
            {saving === "publish" ? "Publication…" : form.published ? "Mettre à jour" : "Publier"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fields col */}
        <div className="w-72 shrink-0 border-r border-[#E7E5E4] overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block font-body text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-1.5">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full border border-[#E7E5E4] rounded-lg px-3 py-2 font-body text-sm text-[#0C0B09] bg-white focus:outline-none focus:border-[#C8A84B]"
            >
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-1.5">Slug URL</label>
            <div className="flex gap-1">
              <input
                value={form.slug}
                onChange={(e) => { set("slug", e.target.value); setSlugLocked(true); }}
                placeholder="mon-article"
                className="flex-1 min-w-0 border border-[#E7E5E4] rounded-lg px-3 py-2 font-body text-xs text-[#0C0B09] focus:outline-none focus:border-[#C8A84B]"
              />
              {slugLocked && (
                <button
                  onClick={() => { setSlugLocked(false); set("slug", toSlug(form.title)); }}
                  className="px-2 py-1 rounded-lg border border-[#E7E5E4] font-body text-[10px] text-[#78716C] hover:bg-[#FAFAF8]"
                  title="Regénérer"
                >↺</button>
              )}
            </div>
            <p className="font-body text-[10px] text-[#A8A29E] mt-1">/blog/{form.slug || "…"}</p>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-1.5">Extrait</label>
            <textarea
              value={form.excerpt ?? ""}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Résumé court affiché dans la liste…"
              rows={3}
              className="w-full border border-[#E7E5E4] rounded-lg px-3 py-2 font-body text-sm text-[#0C0B09] resize-none focus:outline-none focus:border-[#C8A84B]"
            />
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-1.5">
              <ImageIcon size={11} className="inline mr-1" />Image de couverture (URL)
            </label>
            <input
              value={form.cover_image ?? ""}
              onChange={(e) => set("cover_image", e.target.value)}
              placeholder="https://…"
              className="w-full border border-[#E7E5E4] rounded-lg px-3 py-2 font-body text-xs text-[#0C0B09] focus:outline-none focus:border-[#C8A84B]"
            />
            {form.cover_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.cover_image} alt="" className="mt-2 w-full aspect-video object-cover rounded-lg" />
            )}
          </div>

          <div className="pt-2 border-t border-[#E7E5E4]">
            <p className="font-body text-[10px] text-[#A8A29E] uppercase tracking-wider mb-1">Syntaxe markdown</p>
            <div className="font-body text-[11px] text-[#78716C] space-y-0.5 leading-relaxed">
              <p><code className="bg-[#F5F5F4] px-1 rounded"># Titre 1</code> — Grand titre</p>
              <p><code className="bg-[#F5F5F4] px-1 rounded">## Titre 2</code> — Sous-titre</p>
              <p><code className="bg-[#F5F5F4] px-1 rounded">**gras**</code> — Texte en gras</p>
              <p><code className="bg-[#F5F5F4] px-1 rounded">*italique*</code> — Italique</p>
              <p><code className="bg-[#F5F5F4] px-1 rounded">- item</code> — Liste à puces</p>
            </div>
          </div>
        </div>

        {/* Editor / Preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Title */}
          <div className="px-8 pt-6 pb-3 border-b border-[#E7E5E4]">
            <input
              value={form.title}
              onChange={(e) => handleTitle(e.target.value)}
              placeholder="Titre de l'article…"
              className="w-full font-display text-3xl text-[#0C0B09] placeholder:text-[#D6D3D1] focus:outline-none bg-transparent"
            />
            <p className="font-body text-xs text-[#A8A29E] mt-1">{catLabel}</p>
          </div>

          {!preview ? (
            <>
              {/* Toolbar */}
              <div className="flex items-center gap-1 px-8 py-2 border-b border-[#E7E5E4] bg-[#FAFAF8]">
                <button onClick={() => insert("# ")} title="Titre 1" className="p-1.5 rounded hover:bg-[#E7E5E4] transition-colors">
                  <Heading2 size={14} className="text-[#78716C]" />
                </button>
                <button onClick={() => insert("**", "**")} title="Gras" className="p-1.5 rounded hover:bg-[#E7E5E4] transition-colors">
                  <Bold size={14} className="text-[#78716C]" />
                </button>
                <button onClick={() => insert("*", "*")} title="Italique" className="p-1.5 rounded hover:bg-[#E7E5E4] transition-colors">
                  <Italic size={14} className="text-[#78716C]" />
                </button>
                <button onClick={() => insert("\n- ")} title="Liste" className="p-1.5 rounded hover:bg-[#E7E5E4] transition-colors">
                  <List size={14} className="text-[#78716C]" />
                </button>
              </div>

              {/* Content textarea */}
              <textarea
                ref={taRef}
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder={"Commencez à écrire votre article…\n\nUtilisez # pour les titres, **gras**, *italique*, - pour les listes."}
                className="flex-1 w-full px-8 py-6 font-body text-sm text-[#0C0B09] leading-relaxed resize-none focus:outline-none bg-white"
                style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, lineHeight: 1.7 }}
              />
            </>
          ) : (
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {form.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.cover_image} alt="" className="w-full aspect-video object-cover rounded-2xl mb-8" />
              )}
              {form.excerpt && (
                <p className="font-body text-base text-[#78716C] italic border-l-4 border-[#C8A84B] pl-4 mb-6">{form.excerpt}</p>
              )}
              <div>{renderMd(form.content)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ PANEL ═══ */
export default function BlogPanel({ posts: initial }: { posts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initial);
  const [mode, setMode] = useState<"list" | "editor">("list");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  function openNew() { setEditing(null); setMode("editor"); }
  function openEdit(p: BlogPost) { setEditing(p); setMode("editor"); }

  async function handleSave(data: typeof EMPTY & { published: boolean }) {
    const res = await fetch("/api/admin/blog", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing.id, ...data } : data),
    });
    if (!res.ok) throw new Error(await res.text());
    const saved: BlogPost = await res.json();
    setPosts((prev) =>
      editing ? prev.map((p) => p.id === saved.id ? saved : p) : [saved, ...prev]
    );
    setMode("list");
    setEditing(null);
  }

  async function togglePublish(post: BlogPost) {
    const res = await fetch("/api/admin/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    if (res.ok) {
      const updated: BlogPost = await res.json();
      setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Supprimer cet article définitivement ?")) return;
    setDeleting(id);
    const res = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  const filtered = posts.filter((p) =>
    filter === "published" ? p.published :
    filter === "draft" ? !p.published : true
  );

  const initialData = editing
    ? { title: editing.title, slug: editing.slug, excerpt: editing.excerpt ?? "", content: editing.content, category: editing.category, cover_image: editing.cover_image ?? "", published: editing.published }
    : { ...EMPTY, published: false };

  if (mode === "editor") {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <BlogEditor
          key={editing?.id ?? "new"}
          initial={initialData}
          isNew={!editing}
          onSave={handleSave}
          onBack={() => { setMode("list"); setEditing(null); }}
        />
      </div>
    );
  }

  /* List */
  const published = posts.filter((p) => p.published).length;
  const drafts    = posts.filter((p) => !p.published).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl text-[#0C0B09]">Blog</h2>
          <p className="font-body text-sm text-[#78716C] mt-0.5">
            {published} publié{published !== 1 ? "s" : ""} · {drafts} brouillon{drafts !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm font-semibold text-white transition-colors"
          style={{ background: "linear-gradient(135deg, #C8A84B 0%, #b8963d 100%)" }}
        >
          <Plus size={15} /> Nouvel article
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5">
        {(["all", "published", "draft"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-colors ${
              filter === f ? "bg-[#0C0B09] text-white" : "bg-white border border-[#E7E5E4] text-[#78716C] hover:bg-[#FAFAF8]"
            }`}
          >
            {f === "all" ? "Tous" : f === "published" ? "Publiés" : "Brouillons"}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E7E5E4]">
          <FileText size={32} className="mx-auto text-[#D6D3D1] mb-3" />
          <p className="font-body text-sm text-[#A8A29E]">
            {filter === "all" ? "Aucun article. Commencez à écrire !" : "Aucun article dans cette catégorie."}
          </p>
          {filter === "all" && (
            <button onClick={openNew} className="mt-4 px-4 py-2 rounded-xl font-body text-sm font-semibold text-white"
              style={{ background: "#C8A84B" }}>
              Créer le premier article
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((post) => (
            <div key={post.id}
              className="flex items-center gap-4 bg-white rounded-xl border border-[#E7E5E4] px-5 py-4 hover:[box-shadow:0_2px_12px_rgba(12,11,9,0.06)] transition-shadow">
              {/* Status dot */}
              <div className={`w-2 h-2 rounded-full shrink-0 ${post.published ? "bg-emerald-400" : "bg-[#D6D3D1]"}`} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-[#0C0B09] truncate">{post.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-body text-[11px] px-2 py-0.5 rounded-full bg-[#F5F5F4] text-[#78716C]">
                    {CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
                  </span>
                  <span className="font-body text-[11px] text-[#A8A29E]">
                    {post.published && post.published_at
                      ? `Publié le ${fmtDate(post.published_at)}`
                      : `Modifié le ${fmtDate(post.updated_at)}`}
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <span className={`font-body text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                post.published
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-[#F5F5F4] text-[#78716C] border border-[#E7E5E4]"
              }`}>
                {post.published ? "Publié" : "Brouillon"}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => togglePublish(post)} title={post.published ? "Dépublier" : "Publier"}
                  className="p-1.5 rounded-lg hover:bg-[#FAFAF8] transition-colors text-[#A8A29E] hover:text-[#C8A84B]">
                  {post.published ? <EyeOff size={14} /> : <Globe size={14} />}
                </button>
                <button onClick={() => openEdit(post)} title="Modifier"
                  className="p-1.5 rounded-lg hover:bg-[#FAFAF8] transition-colors text-[#A8A29E] hover:text-[#0C0B09]">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => deletePost(post.id)} disabled={deleting === post.id} title="Supprimer"
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-[#A8A29E] hover:text-red-500 disabled:opacity-40">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
