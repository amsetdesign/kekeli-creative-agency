import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un expert en stratégie des réseaux sociaux pour les PME africaines, spécialisé dans le marché sénégalais et ouest-africain. Tu travailles avec KEKELI Creative Agency à Dakar.

MISSION : Analyser le profil d'une entreprise et recommander les meilleurs réseaux sociaux avec une stratégie adaptée.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après le JSON.
2. Tes recommandations doivent être basées sur le contexte africain/sénégalais (usage réel des plateformes).
3. Le message_personnel doit être chaleureux et spécifique au secteur.

CONTEXTE MARCHÉ SÉNÉGAL (données d'usage) :
- Facebook : plateforme #1 au Sénégal, tout âge, B2C et B2B
- Instagram : 18-35 ans, mode, beauté, food, lifestyle, artisanat
- TikTok : 16-30 ans, entertainment, viral, notoriété rapide
- WhatsApp Business : relation client directe, très fort au Sénégal
- LinkedIn : B2B, services professionnels, RH, formations
- YouTube : tutoriels, documentaires, vidéos longues

FORMAT JSON OBLIGATOIRE :
{
  "reseau_principal": {
    "nom": "Instagram | Facebook | TikTok | LinkedIn | WhatsApp Business | YouTube",
    "score_adequation": 0,
    "raison": "string",
    "strategie": "string",
    "frequence_recommandee": "string",
    "types_contenus": ["string"]
  },
  "reseaux_secondaires": [
    {
      "nom": "string",
      "score_adequation": 0,
      "raison": "string",
      "role": "string"
    }
  ],
  "reseaux_a_eviter": [
    { "nom": "string", "raison": "string" }
  ],
  "plan_contenu_30j": {
    "semaine_1": "string",
    "semaine_2": "string",
    "semaine_3": "string",
    "semaine_4": "string"
  },
  "types_contenus_recommandes": [
    { "format": "string", "frequence": "string", "exemple": "string" }
  ],
  "objectifs_3mois": ["string", "string", "string"],
  "message_personnel": "string"
}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom_entreprise, secteur, cible, objectifs, budget_pub } = body;
    if (!secteur || !cible) {
      return NextResponse.json({ error: "Secteur et cible requis." }, { status: 400 });
    }

    const userContent = `
Entreprise : ${nom_entreprise || "Non précisé"}
Secteur d'activité : ${secteur}
Cible client : ${cible}
Objectifs : ${objectifs || "Notoriété et acquisition clients"}
Budget publicité mensuel : ${budget_pub || "Non précisé"}

Recommande le(s) meilleur(s) réseau(x) social(aux) et la stratégie adaptée.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON");
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Réseau idéal error:", err);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
