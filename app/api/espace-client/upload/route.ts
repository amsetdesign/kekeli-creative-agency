import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase } from "@/lib/supabase";

const MAX_BYTES = 10 * 1024 * 1024; // 10 Mo

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg":      ".jpg",
  "image/png":       ".png",
  "image/gif":       ".gif",
  "image/webp":      ".webp",
  "image/svg+xml":   ".svg",
  "application/pdf": ".pdf",
  "application/zip": ".zip",
  "application/x-zip-compressed": ".zip",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/msword": ".doc",
};

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const project_id = formData.get("project_id") as string | null;

    if (!file || !project_id) {
      return NextResponse.json({ error: "Fichier et project_id requis." }, { status: 422 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)." }, { status: 422 });
    }

    if (!ALLOWED_TYPES[file.type]) {
      return NextResponse.json({ error: "Type de fichier non autorisé (images, PDF, ZIP, Word)." }, { status: 422 });
    }

    const db = getSupabase();

    // Vérifie que le projet appartient à l'utilisateur
    const { data: project } = await db
      .from("projects")
      .select("id")
      .eq("id", project_id)
      .eq("client_id", user.id)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${project_id}/${user.id}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await db.storage
      .from("project-files")
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      console.error("Storage upload error:", uploadError.message);
      return NextResponse.json({ error: "Erreur lors de l'upload du fichier." }, { status: 500 });
    }

    const { data: { publicUrl } } = db.storage
      .from("project-files")
      .getPublicUrl(path);

    return NextResponse.json({
      url: publicUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (err) {
    console.error("Upload route error:", err);
    return NextResponse.json({ error: "Erreur inattendue." }, { status: 500 });
  }
}
