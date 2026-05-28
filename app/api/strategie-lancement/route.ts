import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un expert en stratégie de lancement musical pour le marché africain (Sénégal, Afrique de l'Ouest, diaspora). Tu maîtrises les codes du lancement d'un single, EP ou album en 2024-2025 : TikTok virality, DSPs (Spotify, Boomplay, Deezer), press kit, playlist pitching, booking, influence marketing.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après.
2. Sois ultra-concret et actionnable — pas de vagues recommandations génériques.
3. Adapte au marché africain francophone : Sénégal, Côte d'Ivoire, Mali, Cameroun, France (diaspora).
4. Tiens compte des ressources réelles déclarées (budget, équipe).
5. Le plan doit être réalisable par un artiste indépendant.

CALCUL DU SCORE DE PRÉPARATION (0-100) :
- Délai suffisant (45j+: +25, 30j: +15, <30j: +5)
- Présence digitale existante (>10k followers: +20, 1k-10k: +12, <1k: +5)
- Budget disponible (500k+: +20, 200k-500k: +15, 50k-200k: +10, <50k: +5)
- Équipe (label/équipe: +15, manager: +10, solo: +5)
- Collaboration prévue (+10 si oui)
- Sorties précédentes (+10 si oui)

FORMAT JSON STRICT :
{
  "score_lancement": number,
  "niveau_preparatif": "Lancement Basique|Lancement Solide|Lancement Pro|Lancement Elite",
  "resume_strategie": "3-4 phrases synthétisant la stratégie globale adaptée au profil",
  "phases": [
    {
      "nom": "string",
      "periode": "string",
      "objectif": "string court",
      "actions_cles": ["action1", "action2", "action3", "action4"],
      "contenu_type": ["type1", "type2", "type3"]
    }
  ],
  "plan_semaine_type": [
    {"jour": "Lundi", "action": "string"},
    {"jour": "Mardi", "action": "string"},
    {"jour": "Mercredi", "action": "string"},
    {"jour": "Jeudi", "action": "string"},
    {"jour": "Vendredi", "action": "string"},
    {"jour": "Samedi", "action": "string"},
    {"jour": "Dimanche", "action": "string"}
  ],
  "canaux_prioritaires": [
    {"canal": "string", "priorite": "Essentiel|Important|Bonus", "action": "string"}
  ],
  "budget_repartition": [
    {"poste": "string", "pourcentage": number, "details": "string"}
  ],
  "kpis_objectifs": [
    {"metrique": "string", "objectif_30j": "string", "objectif_90j": "string"}
  ],
  "contenus_a_preparer": ["contenu1", "contenu2", "contenu3", "contenu4", "contenu5", "contenu6"],
  "erreurs_a_eviter": ["erreur1", "erreur2", "erreur3"],
  "message_lancement": "Message court, percutant et personnel (2-3 phrases)"
}

Les phases doivent couvrir : Teasing (J-45 à J-15), Pré-lancement (J-14 à J-1), Jour J, Amplification (J+1 à J+30), Consolidation (J+31 à J+90). Adapte selon le délai disponible — si <30j, compresse les phases.`;

function buildPrompt(data: Record<string, unknown>): string {
  return `Voici le projet musical à lancer :

**PROJET**
- Nom : ${data.nomProjet || "N/R"}
- Type : ${data.typeProjet || "N/R"}
- Genre musical : ${data.genre || "N/R"}
- Délai avant sortie : ${data.delaiSortie || "N/R"}
- Plateformes de sortie : ${Array.isArray(data.plateformes) ? (data.plateformes as string[]).join(", ") : "N/R"}

**PRÉSENCE ACTUELLE**
- Abonnés Instagram : ${data.abonnesInstagram || "Non renseigné"}
- Abonnés TikTok : ${data.abonnesTiktok || "Non renseigné"}
- Abonnés YouTube : ${data.abonnesYoutube || "Non renseigné"}
- Streams mensuels actuels : ${data.streamsActuels || "Non renseigné"}
- A déjà sorti de la musique : ${data.sortiesPrecedentes || "N/R"}
- Collaboration prévue : ${data.collaboration || "N/R"}
${data.collaboration === "Oui" ? `- Artiste en collab : ${data.artisteCollab || "Non précisé"}` : ""}

**RESSOURCES & OBJECTIFS**
- Budget disponible : ${data.budget || "N/R"}
- Équipe : ${data.equipe || "N/R"}
- Objectif principal : ${data.objectif || "N/R"}
- Marché(s) cible(s) : ${Array.isArray(data.marches) ? (data.marches as string[]).join(", ") : "N/R"}
- Inspirations / artistes similaires : ${data.inspirations || "Non renseigné"}

Génère la stratégie de lancement complète en JSON uniquement.`;
}

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    if (!data?.nomProjet || !data?.typeProjet) {
      return NextResponse.json({ error: "Informations projet requises" }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildPrompt(data) }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON in response");

    return NextResponse.json({ strategy: JSON.parse(match[0]) });
  } catch (err) {
    console.error("Stratégie lancement API error:", err);
    return NextResponse.json({ error: "Erreur de génération" }, { status: 500 });
  }
}
