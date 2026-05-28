import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un consultant expert de l'industrie musicale africaine avec 15 ans d'expérience, spécialisé dans le développement de carrière des artistes d'Afrique de l'Ouest et de la diaspora. Tu travailles avec KEKELI Creative Agency, basée à Dakar, Sénégal.

MISSION CRITIQUE : Avant toute analyse, tu DOIS utiliser l'outil web_search pour chercher les VRAIES données de l'artiste en ligne. Effectue au minimum 3-4 recherches :
1. "[nom_artiste] Instagram TikTok YouTube followers abonnés" → présence réseaux sociaux
2. "[nom_artiste] Spotify Boomplay streams écoutes mensuelles" → données streaming
3. "[nom_artiste] concerts events musique 2024 2025" → activité live récente
4. "[nom_artiste] musique Sénégal Afrique sortie récente" → contexte et sorties musicales

Utilise les données RÉELLES trouvées pour enrichir l'analyse. Si l'artiste n'est pas trouvé en ligne, note-le et analyse uniquement avec les données déclarées.

TON RÔLE : Analyser objectivement le profil d'un artiste et générer une "Vision de Carrière" personnalisée, honnête et actionnable.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après le JSON.
2. Tous les scores sont entre 0 et 100, basés strictement sur les données fournies + données web trouvées.
3. Sois honnête et précis — ne gonfle pas les scores pour flatter.
4. Tes recommandations doivent être spécifiques à la musique africaine et au marché sénégalais/ouest-africain.
5. Le message_personnel doit être chaleureux, personnalisé au nom de l'artiste et motivant.
6. Le champ infos_web doit contenir ce que tu as VRAIMENT trouvé en ligne.

CRITÈRES DE SCORING OBJECTIFS :
- branding (0-100) : logo pro (+25), charte graphique (+20), cohérence visuelle excellente (+20) ou bonne (+10), EPK (+15), site web (+20)
- presence_digitale (0-100) : chaque plateforme active (+10, max 50pts), abonnés 1k-5k (+10), 5k-20k (+25), 20k-100k (+45), 100k+ (+50)
- visibilite (0-100) : sorties 1/an (+15), 2-3/an (+30), 4-6/an (+50), 6+/an (+70) ; collaborations régulières (+20) ; streams >10k (+10), >50k (+30), >200k (+50)
- coherence_artistique (0-100) : cohérence visuelle excellente (+35), bonne (+20) ; qualité pro (+30), correct (+15) ; identité claire selon le genre (+20)
- communication (0-100) : publication quotidienne (+40), 3-4x/sem (+30), 1-2x/sem (+15), rarement (+5) ; stratégie définie (+30) ; vague (+15)
- monetisation (0-100) : chaque source de revenus active (+12, max 60pts) ; booking manager (+25) ; collaborations régulières (+15)

score_global = moyenne pondérée (branding×0.15 + presence×0.20 + visibilite×0.20 + coherence×0.15 + communication×0.15 + monetisation×0.15)

NIVEAUX :
- 0-30 : Artiste Débutant
- 31-50 : Artiste Émergent
- 51-70 : Artiste Confirmé
- 71-100 : Artiste Établi

SERVICES DISPONIBLES (slugs à utiliser) : clips, monetisation, branding, photo, direction, accompagnement, strategie, marketing, identite, distribution

FORMAT JSON STRICT :
{
  "nom": "string — nom tel que confirmé ou trouvé en ligne",
  "niveau": "Artiste Débutant|Artiste Émergent|Artiste Confirmé|Artiste Établi",
  "score_global": number,
  "scores": {
    "branding": number,
    "presence_digitale": number,
    "visibilite": number,
    "coherence_artistique": number,
    "communication": number,
    "monetisation": number
  },
  "points_forts": ["string", "string", "string"],
  "points_faibles": ["string", "string", "string"],
  "opportunites": ["string", "string", "string"],
  "roadmap": [
    {"periode": "0–30 jours", "titre": "string court", "actions": ["string", "string", "string"]},
    {"periode": "30–60 jours", "titre": "string court", "actions": ["string", "string", "string"]},
    {"periode": "60–90 jours", "titre": "string court", "actions": ["string", "string", "string"]}
  ],
  "analyse_branding": "2-3 phrases précises et personnalisées incluant données réelles si trouvées",
  "analyse_visibilite": "2-3 phrases précises et personnalisées incluant chiffres réels si trouvés",
  "strategie_monetisation": "2-3 phrases précises et personnalisées",
  "message_personnel": "Message personnel chaleureux et motivant de 3-4 phrases adressé à l'artiste par son nom",
  "services_recommandes": ["2 à 4 slugs les plus pertinents pour ce profil"],
  "infos_web": {
    "recherche_effectuee": true,
    "trouve_en_ligne": boolean,
    "abonnes_verifies": {
      "Instagram": "string — ex: '12 400 abonnés' ou null",
      "TikTok": "string — ex: '3.2K followers' ou null",
      "YouTube": "string — ex: '890 abonnés' ou null"
    },
    "streams_verifies": "string — ex: '45K écoutes/mois Spotify' ou null",
    "derniere_sortie": "string — titre + date si trouvé ou null",
    "activite_live": "string — concerts/événements récents ou null",
    "presence_digitale_score": "Forte|Modérée|Faible|Introuvable",
    "insights_web": "string — 2-3 observations concrètes et précises tirées de la recherche web"
  }
}`;

function buildPrompt(data: Record<string, unknown>): string {
  return `ARTISTE À ANALYSER : ${data.nomArtiste}

Commence par effectuer les recherches web suivantes :
- "${data.nomArtiste} Instagram TikTok YouTube"
- "${data.nomArtiste} Spotify Boomplay streams"
- "${data.nomArtiste} concerts events 2024 2025"
- "${data.nomArtiste} musique Sénégal Afrique sortie"

Après tes recherches, génère la Vision de Carrière complète en JSON.

---

DONNÉES DÉCLARÉES PAR L'ARTISTE :

**PROFIL DE BASE**
- Nom d'artiste : ${data.nomArtiste}
- Genre musical : ${data.genre}
- Années d'activité : ${data.anneesActivite}
- Niveau perçu par l'artiste : ${data.niveauPercu}

**PRÉSENCE DIGITALE**
- Plateformes actives : ${Array.isArray(data.plateformes) ? (data.plateformes as string[]).join(", ") || "Aucune" : "Aucune"}
- Abonnés (plateforme principale) : ${data.abonnes || "Non renseigné"}
- Fréquence de publication : ${data.frequencePublication || "Non renseignée"}
- Streams mensuels Spotify / Boomplay : ${data.streamsMensuels || "Non renseigné"}

**BRANDING & IMAGE**
- Logo professionnel : ${data.aLogo}
- Charte graphique : ${data.aCharte}
- Cohérence visuelle sur les réseaux : ${data.coherenceVisuelle}
- Qualité des contenus visuels (photos/vidéos) : ${data.qualiteContenu}
- Présence web (EPK / site) : ${data.aPresenceWeb}

**STRATÉGIE & MONÉTISATION**
- Sources de revenus actuelles : ${Array.isArray(data.sourcesRevenus) ? (data.sourcesRevenus as string[]).join(", ") || "Aucune" : "Aucune"}
- Sorties musicales par an : ${data.sortiesParAn || "Non renseigné"}
- Stratégie de contenu : ${data.strategieContenu || "Non renseignée"}
- Booking manager / agent : ${data.aBooking}
- Collaborations récentes : ${data.collaborations}

**VISION & AMBITION**
- Marchés géographiques cibles : ${Array.isArray(data.marchesGeographiques) ? (data.marchesGeographiques as string[]).join(", ") || "Non définis" : "Non définis"}
- Objectif principal à 12 mois : ${data.objectif12mois || "Non défini"}
- Ce qui bloque le plus : ${Array.isArray(data.blocages) ? (data.blocages as string[]).join(", ") || "Non renseigné" : "Non renseigné"}
- Message libre : ${data.messageFree || "Rien d'ajouté"}

Génère maintenant la Vision de Carrière complète en JSON valide uniquement.`;
}

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    if (!data?.nomArtiste) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Use Anthropic web search beta tool for real data lookup
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = await (anthropic.beta.messages as any).create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tools: [{ type: "web_search_20250305" as any, name: "web_search", max_uses: 5 }],
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildPrompt(data) }],
      betas: ["web-search-2025-03-05"],
    });

    // Concatenate all text blocks (web search adds tool_use/result blocks)
    let combinedText = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const block of (message.content as any[])) {
      if (block.type === "text") combinedText += block.text;
    }

    const match = combinedText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON in response");

    return NextResponse.json({ analysis: JSON.parse(match[0]) });
  } catch (err) {
    console.error("Vision Carrière API error:", err);
    // Fallback: try without web search
    try {
      const { data } = await req.json().catch(() => ({ data: null }));
      if (!data) return NextResponse.json({ error: "Erreur d'analyse" }, { status: 500 });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildPrompt(data) }],
      });
      const text = message.content[0].type === "text" ? message.content[0].text : "";
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON in response");
      return NextResponse.json({ analysis: JSON.parse(match[0]) });
    } catch {
      return NextResponse.json({ error: "Erreur d'analyse" }, { status: 500 });
    }
  }
}
