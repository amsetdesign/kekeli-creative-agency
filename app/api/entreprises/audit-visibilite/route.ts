import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un expert en visibilité digitale pour les entreprises africaines, spécialisé dans le marché sénégalais et ouest-africain. Tu travailles avec KEKELI Creative Agency à Dakar.

MISSION CRITIQUE : Avant toute analyse, tu DOIS utiliser l'outil web_search pour chercher les VRAIES données de l'entreprise en ligne. Effectue au minimum 3-4 recherches :
1. "[nom_entreprise] [secteur] Dakar Sénégal" → présence générale, site web
2. "[nom_entreprise] Instagram Facebook" → présence réseaux sociaux
3. "[nom_entreprise] avis clients Google" → réputation en ligne
4. "[nom_entreprise] [secteur] concurrents Dakar" → contexte concurrentiel

Utilise les données RÉELLES trouvées. Si l'entreprise n'est pas trouvée en ligne, c'est une information critique — note-le.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après le JSON.
2. Tous les scores sont entre 0 et 100.
3. Sois honnête — une entreprise introuvable en ligne a un score de présence très faible.
4. Le message_personnel doit être personnalisé au nom de l'entreprise.

FORMAT JSON OBLIGATOIRE :
{
  "score_global": 0,
  "niveau": "Invisible | Débutant | Visible | Établi | Leader",
  "infos_trouvees": {
    "site_web": "url ou null",
    "instagram": "url ou null",
    "facebook": "url ou null",
    "google_my_business": "trouvé ou non",
    "avis_clients": "nombre ou estimation",
    "derniere_activite": "date ou description"
  },
  "scores": {
    "site_web": 0,
    "reseaux_sociaux": 0,
    "reputation_ligne": 0,
    "visibilite_google": 0,
    "coherence_digitale": 0
  },
  "opportunites": ["string", "string"],
  "problemes_detectes": ["string", "string"],
  "recommandations": [
    { "priorite": "Urgente | Importante | Optionnelle", "action": "string", "impact": "string" }
  ],
  "services_recommandes": ["slug1", "slug2"],
  "message_personnel": "string",
  "plan_action_30j": ["Action 1", "Action 2", "Action 3"]
}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom_entreprise, secteur, ville } = body;
    if (!nom_entreprise) {
      return NextResponse.json({ error: "Nom de l'entreprise requis." }, { status: 400 });
    }

    const userContent = `
Entreprise à analyser : ${nom_entreprise}
Secteur : ${secteur || "Non précisé"}
Ville : ${ville || "Dakar, Sénégal"}

Effectue les recherches web et génère l'audit de visibilité digitale complet.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      tools: [{ type: "web_search_20250305" as "web_search_20250305", name: "web_search" }],
      messages: [{ role: "user", content: userContent }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const text = textBlock?.type === "text" ? textBlock.text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON");
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Audit visibilité error:", err);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
