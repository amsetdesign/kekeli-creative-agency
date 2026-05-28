import { generateGuide, type GuideType } from "@/lib/pdf/generateGuide";

const VALID_TYPES: GuideType[] = ["artiste", "entreprise"];

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  if (!VALID_TYPES.includes(type as GuideType)) {
    return new Response("Guide introuvable.", { status: 404 });
  }

  const buffer = generateGuide(type as GuideType);

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="guide-kekeli-${type}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
