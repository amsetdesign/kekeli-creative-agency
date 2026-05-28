import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un directeur artistique et designer visuel spécialisé dans le branding des artistes musicaux africains. Tu maîtrises la théorie des couleurs, la typographie, la photographie artistique, et les codes visuels du marché musical africain contemporain (Afrobeats, Afropop, Mbalax, Rap africain, etc.).

TON RÔLE : Générer un moodboard visuel complet et un guide de direction artistique personnalisé pour un artiste musical.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après.
2. Les couleurs hex doivent être RÉELLES et COHÉRENTES entre elles — testées pour fonctionner ensemble.
3. Les références visuelles doivent être réelles et connues (films, photographes, artistes).
4. Le guide est pensé pour un artiste africain francophone publiant sur Instagram, TikTok et YouTube.
5. univers_nom doit être évocateur, court et mémorable (2-4 mots max).

FORMAT JSON STRICT :
{
  "univers_nom": "Nom poétique de l'univers visuel (2-4 mots)",
  "palette_principale": [
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Usage principal dans le branding" },
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Usage principal dans le branding" },
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Usage principal dans le branding" },
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Usage principal dans le branding" },
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Usage principal dans le branding" }
  ],
  "palette_complementaire": [
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Accent / détails" },
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Fond / base" },
    { "hex": "#XXXXXX", "nom": "Nom poétique", "usage": "Contraste / texte" }
  ],
  "typographie": {
    "titre": { "style": "Description du style de police idéal", "sensation": "Ce que ça évoque émotionnellement", "exemples": ["Police 1", "Police 2", "Police 3"] },
    "corps": { "style": "Description du style de police pour le corps de texte", "sensation": "Ce que ça évoque", "exemples": ["Police 1", "Police 2", "Police 3"] }
  },
  "direction_visuelle": {
    "concept": "3-4 phrases décrivant l'univers visuel global — atmosphère, textures, lumière, émotion",
    "mots_cles": ["mot1", "mot2", "mot3", "mot4", "mot5", "mot6"],
    "textures": ["texture1", "texture2", "texture3"],
    "eclairage": "Description précise du style de lumière recommandé",
    "composition": "Style de cadrage et composition recommandé"
  },
  "references_visuelles": [
    { "categorie": "Cinéma & Séries", "exemples": ["ref1", "ref2", "ref3"] },
    { "categorie": "Photographie", "exemples": ["ref1", "ref2", "ref3"] },
    { "categorie": "Art visuel & Peinture", "exemples": ["ref1", "ref2", "ref3"] },
    { "categorie": "Mode & Fashion", "exemples": ["ref1", "ref2", "ref3"] }
  ],
  "guide_contenu": {
    "posts_instagram": "Style et type de visuels recommandés pour les posts Instagram",
    "stories": "Format et style pour les stories Instagram",
    "reels_tiktok": "Ambiance et codes visuels pour Reels/TikTok",
    "cover_spotify": "Direction pour les covers de singles/albums"
  },
  "do_dont": {
    "faire": ["conseil1", "conseil2", "conseil3", "conseil4"],
    "eviter": ["erreur1", "erreur2", "erreur3", "erreur4"]
  },
  "message_creatif": "Message personnel, inspirant et spécifique à cet univers (2-3 phrases)"
}`;

function buildPrompt(data: Record<string, unknown>): string {
  return `Voici le profil de l'artiste pour le moodboard :

**IDENTITÉ ARTISTIQUE**
- Nom artistique : ${data.nomArtiste || "N/R"}
- Genre musical : ${data.genre || "N/R"}
- Mood / Ambiance dominant : ${data.mood || "N/R"}
- Moment / Atmosphère : ${data.moment || "N/R"}

**RÉFÉRENCES & INFLUENCES**
- Artistes qui inspirent visuellement : ${data.influencesVisuelles || "N/R"}
- Films / Séries qui correspondent à l'univers : ${data.filmsRef || "Non renseigné"}
- Couleurs appréciées : ${Array.isArray(data.couleursAimees) ? (data.couleursAimees as string[]).join(", ") : "N/R"}
- Couleurs à éviter : ${Array.isArray(data.couleursEviter) ? (data.couleursEviter as string[]).join(", ") : "Aucune"}

**PUBLIC & OBJECTIFS**
- Public cible : ${data.publicCible || "N/R"}
- Message principal à transmettre : ${data.message || "N/R"}
- Plateformes visuelles prioritaires : ${Array.isArray(data.plateformes) ? (data.plateformes as string[]).join(", ") : "N/R"}

Génère le moodboard visuel complet en JSON uniquement.`;
}

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    if (!data?.genre || !data?.mood) {
      return NextResponse.json({ error: "Genre et mood requis" }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildPrompt(data) }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON in response");

    return NextResponse.json({ moodboard: JSON.parse(match[0]) });
  } catch (err) {
    console.error("Moodboard API error:", err);
    return NextResponse.json({ error: "Erreur de génération" }, { status: 500 });
  }
}
