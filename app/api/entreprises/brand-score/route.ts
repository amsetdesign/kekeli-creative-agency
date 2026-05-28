import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un expert en branding et image de marque pour les PME africaines, avec 15 ans d'expérience au Sénégal et en Afrique de l'Ouest. Tu travailles avec KEKELI Creative Agency à Dakar.

MISSION : Analyser les réponses d'une entreprise et générer un "Brand Score" complet — un diagnostic de son image de marque.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après le JSON.
2. Tous les scores sont entre 0 et 100, basés strictement sur les réponses fournies.
3. Sois honnête et précis — ne gonfle pas les scores.
4. Tes recommandations doivent être spécifiques au contexte africain/sénégalais.
5. Le message_personnel doit être chaleureux, personnalisé au nom de l'entreprise et motivant.

FORMAT JSON OBLIGATOIRE :
{
  "score_global": 0,
  "niveau": "Débutant | En développement | Professionnel | Premium",
  "scores": {
    "identite_visuelle": 0,
    "coherence_marque": 0,
    "presence_digitale": 0,
    "communication": 0,
    "confiance_client": 0
  },
  "points_forts": ["string", "string"],
  "points_amelioration": ["string", "string", "string"],
  "recommandations": [
    { "priorite": "Urgente | Importante | Optionnelle", "action": "string", "impact": "string", "service": "branding | site-web | community | publicite | strategie | photo-video | coaching" }
  ],
  "services_recommandes": ["slug1", "slug2"],
  "message_personnel": "string",
  "plan_action_30j": ["Action 1", "Action 2", "Action 3"]
}

SCORING :
- identite_visuelle : logo pro (+30), charte graphique (+25), cohérence visuelle (+25), supports print (+20)
- coherence_marque : nom mémorable (+20), positionnement clair (+30), valeurs définies (+25), ton cohérent (+25)
- presence_digitale : site web (+30), Instagram actif (+20), Facebook actif (+15), autre réseau (+10), Google My Business (+15), moins de 5 avis en ligne (-10)
- communication : publications régulières (+30), contenu de qualité (+30), engagement (+20), cohérence des messages (+20)
- confiance_client : témoignages/avis (+30), portfolio (+25), professionnalisme perçu (+25), ancienneté (+20)`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom_entreprise, secteur, reponses } = body;
    if (!nom_entreprise || !reponses) {
      return NextResponse.json({ error: "Données manquantes." }, { status: 400 });
    }

    const userContent = `
Entreprise : ${nom_entreprise}
Secteur : ${secteur || "Non précisé"}

Réponses au questionnaire Brand Score :
${Object.entries(reponses).map(([q, r]) => `- ${q}: ${r}`).join("\n")}

Génère le Brand Score complet pour cette entreprise.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Brand Score error:", err);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
