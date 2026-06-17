import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabase } from "@/lib/supabase";

async function requireAdmin() {
  const store = await cookies();
  return store.get("kekeli_admin")?.value === process.env.ADMIN_SESSION_SECRET;
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getSupabase();
  const { data, error } = await db
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const db = getSupabase();
  const now = new Date().toISOString();
  const { data, error } = await db
    .from("blog_posts")
    .insert({
      title:       body.title,
      slug:        body.slug,
      excerpt:     body.excerpt ?? null,
      content:     body.content ?? "",
      category:    body.category ?? "communication",
      cover_image: body.cover_image ?? null,
      published:   body.published ?? false,
      published_at: body.published ? now : null,
      created_at:  now,
      updated_at:  now,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...body } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = getSupabase();
  const now = new Date().toISOString();

  // Preserve original published_at if already set
  const { data: existing } = await db.from("blog_posts").select("published_at").eq("id", id).single();
  const publishedAt = body.published
    ? (existing?.published_at ?? now)
    : null;

  const { data, error } = await db
    .from("blog_posts")
    .update({
      title:        body.title,
      slug:         body.slug,
      excerpt:      body.excerpt ?? null,
      content:      body.content ?? "",
      category:     body.category ?? "communication",
      cover_image:  body.cover_image ?? null,
      published:    body.published ?? false,
      published_at: publishedAt,
      updated_at:   now,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const db = getSupabase();
  const { error } = await db.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
