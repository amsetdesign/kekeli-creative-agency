import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un consultant expert en développement digital des PME africaines, spécialisé dans le marché sénégalais. Tu travailles avec KEKELI Creative Agency à Dakar.

MISSION : Analyser les informations d'une entreprise et répondre à la question "Que manque-t-il à mon entreprise ?" avec un diagnostic complet et un plan d'action priorisé.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après le JSON.
2. Sois direct et honnête — identifie les vraies lacunes sans ménager.
3. Priorise les recommandations par impact business.
4. Le message_personnel doit être motivant et personnalisé.

FORMAT JSON OBLIGATOIRE :
{
  "diagnostic_global": "string (2-3 phrases résumant la situation)",
  "lacunes_identifiees": [
    {
      "domaine": "Branding | Site Web | Réseaux Sociaux | Publicité | Stratégie | Photo/Vidéo | Autres",
      "severite": "Critique | Important | Améliorable",
      "description": "string",
      "impact_business": "string"
    }
  ],
  "points_forts": ["string", "string"],
  "opportunites_manquees": ["string", "string"],
  "plan_action": [
    {
      "priorite": 1,
      "action": "string",
      "delai": "Cette semaine | Ce mois | Dans 3 mois",
      "impact_estime": "Faible | Moyen | Élevé | Très élevé",
      "service_kekeli": "branding | site-web | community | publicite | strategie | photo-video | coaching | null"
    }
  ],
  "services_recommandes": [
    { "slug": "string", "raison": "string", "urgence": "Urgent | Recommandé | Optionnel" }
  ],
  "score_maturite_digitale": 0,
  "potentiel_croissance": "Faible | Moyen | Élevé | Très élevé",
  "message_personnel": "string"
}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom_entreprise, secteur, anciennete, effectif, presence_actuelle, problemes, objectifs } = body;
    if (!secteur || !presence_actuelle) {
      return NextResponse.json({ error: "Données insuffisantes." }, { status: 400 });
    }

    const userContent = `
Entreprise : ${nom_entreprise || "Non précisé"}
Secteur : ${secteur}
Ancienneté : ${anciennete || "Non précisé"}
Effectif : ${effectif || "Non précisé"}

Présence digitale actuelle : ${JSON.stringify(presence_actuelle)}
Problèmes ressentis : ${problemes || "Non précisé"}
Objectifs : ${objectifs || "Développer le business"}

Génère le diagnostic complet : que manque-t-il à cette entreprise ?`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON");
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Diagnostic error:", err);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
