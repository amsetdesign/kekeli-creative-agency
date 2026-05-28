import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es un expert senior en stratégie social media pour artistes musicaux africains, basé à Dakar. Tu travailles pour KEKELI Creative Agency.

MISSION CRITIQUE : Avant toute analyse, tu DOIS utiliser l'outil web_search pour chercher les VRAIES données de l'artiste en ligne. Effectue au minimum 3-4 recherches :
1. "[nom_artiste] Instagram followers abonnés" → stats réelles Instagram
2. "[nom_artiste] TikTok viral meilleure vidéo vues" → meilleur contenu TikTok
3. "[nom_artiste] YouTube channel abonnés" → chaîne YouTube
4. "[nom_artiste] musique Sénégal 2024 2025" → contexte artiste, sorties récentes

Utilise les données RÉELLES trouvées pour enrichir l'analyse. Si l'artiste n'est pas trouvé en ligne, note-le et analyse uniquement avec les données déclarées.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du JSON valide. Zéro texte avant ou après le JSON.
2. Scores strictement objectifs basés sur données fournies + données web trouvées.
3. Spécifique au marché musical africain (Afrobeats, Mbalax, Afropop, Rap francophone, etc.).
4. Inclus uniquement les plateformes actives dans analyse_par_plateforme.
5. Le champ infos_web doit contenir ce que tu as VRAIMENT trouvé en ligne.

CRITÈRES DE SCORING :
- optimisation_profil (0-100): photo pro(+20), bio optimisée(+20), lien bio(+20), nom reconnaissable(+20), contact bio(+20)
- coherence_visuelle (0-100): style défini(+30), cohérence excellente(+35)/moyenne(+20)/faible(+5), qualité pro(+35)/correcte(+20)/amateur(+5)
- strategie_contenu (0-100): ligne éditoriale(+25), diversité formats(+20), fréq≥3x/sem(+25)/1-2x(+15)/rarement(+5), hashtags(+15), légendes engageantes(+15)
- engagement_communaute (0-100): répond commentaires toujours(+30)/parfois(+15), Lives réguliers(+20)/parfois(+10), collabs(+20), stories actives(+15), sondages(+15)
- croissance_potentielle (0-100): potentiel basé sur cohérence+fréquence+diversité+engagement

FORMAT JSON STRICT :
{
  "nom_artiste_confirme": "string — nom tel que trouvé ou confirmé en ligne",
  "plateformes_analysees": ["string"],
  "score_global": number,
  "niveau": "Profil Basique|Profil en Progression|Profil Engagé|Profil Expert",
  "scores": {
    "optimisation_profil": number,
    "coherence_visuelle": number,
    "strategie_contenu": number,
    "engagement_communaute": number,
    "croissance_potentielle": number
  },
  "points_forts": ["string", "string", "string"],
  "points_ameliorer": ["string", "string", "string"],
  "analyse_par_plateforme": {
    "Instagram": "2-3 phrases précises incluant chiffres réels si trouvés, ou null si inactif",
    "TikTok": "2-3 phrases précises incluant chiffres réels si trouvés, ou null si inactif",
    "YouTube": "2-3 phrases précises incluant chiffres réels si trouvés, ou null si inactif"
  },
  "infos_web": {
    "recherche_effectuee": true,
    "trouve_en_ligne": boolean,
    "abonnes_verifies": {
      "Instagram": "string — ex: '12 400 abonnés' ou null",
      "TikTok": "string — ex: '3.2K followers' ou null",
      "YouTube": "string — ex: '890 abonnés' ou null"
    },
    "meilleure_video": {
      "titre": "string — titre exact ou description du contenu le plus viral",
      "vues": "string — ex: '1.2M vues', '45K likes', '890 commentaires'",
      "plateforme": "TikTok|YouTube|Instagram Reels",
      "date": "string — ex: 'Mars 2024', 'Il y a 3 mois'",
      "pourquoi_viral": "string — 3-4 phrases analysant précisément pourquoi ce contenu a performé (hook, timing, format, audience, trend utilisé)"
    },
    "derniere_sortie_musicale": "string|null — titre + date si trouvé en ligne",
    "presence_digitale_score": "Forte|Modérée|Faible|Introuvable",
    "insights_specifiques": "string — 2-3 observations concrètes et précises tirées de la recherche web"
  },
  "plan_action_30_jours": [
    {"semaine": "Semaine 1", "titre": "string", "actions": ["string", "string", "string"]},
    {"semaine": "Semaine 2", "titre": "string", "actions": ["string", "string", "string"]},
    {"semaine": "Semaine 3", "titre": "string", "actions": ["string", "string", "string"]},
    {"semaine": "Semaine 4", "titre": "string", "actions": ["string", "string", "string"]}
  ],
  "format_contenu_recommande": ["format1", "format2", "format3", "format4"],
  "conseils_hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "message_motivation": "Message court, personnel, adressé à l'artiste par son NOM, chaleureux et motivant (2-3 phrases)"
}`;

function buildPrompt(data: Record<string, unknown>): string {
  const nomArtiste = data.nomArtiste as string || "cet artiste";
  const plateformes: string[] = [];
  if (data.instagram) plateformes.push("Instagram");
  if (data.tiktok)    plateformes.push("TikTok");
  if (data.youtube)   plateformes.push("YouTube");

  return `ARTISTE À ANALYSER : ${nomArtiste}

Commence par effectuer les recherches web suivantes :
- "${nomArtiste} Instagram"
- "${nomArtiste} TikTok meilleure vidéo viral"
- "${nomArtiste} YouTube"
- "${nomArtiste} musique Sénégal 2024 2025"

Après tes recherches, génère l'analyse complète en JSON.

---

DONNÉES DÉCLARÉES PAR L'ARTISTE :

**COMPTES ACTIFS**
${data.instagram ? `- Instagram : @${data.instagram} · Abonnés déclarés : ${data.abonnesInstagram || "N/R"} · Fréquence : ${data.frequenceInstagram || "N/R"}` : ""}
${data.tiktok    ? `- TikTok : @${data.tiktok} · Abonnés déclarés : ${data.abonnesTiktok || "N/R"} · Fréquence : ${data.frequenceTiktok || "N/R"}` : ""}
${data.youtube   ? `- YouTube : ${data.youtube} · Abonnés déclarés : ${data.abonnesYoutube || "N/R"} · Fréquence : ${data.frequenceYoutube || "N/R"}` : ""}

**IDENTITÉ VISUELLE**
- Photo de profil pro : ${data.photoProfil || "N/R"}
- Bio optimisée : ${data.bioOptimisee || "N/R"}
- Lien en bio : ${data.lienBio || "N/R"}
- Cohérence visuelle : ${data.coherenceVisuelle || "N/R"}
- Style dominant : ${data.styleVisuel || "N/R"}
- Types de contenu : ${Array.isArray(data.typesContenu) ? (data.typesContenu as string[]).join(", ") : "N/R"}

**STRATÉGIE & ENGAGEMENT**
- Hashtags : ${data.hashtags || "N/R"}
- Répond aux commentaires : ${data.reponseCommentaires || "N/R"}
- Lives : ${data.lives || "N/R"}
- Collaborations : ${data.collaborations || "N/R"}
- Objectif principal : ${data.objectif || "N/R"}
- À améliorer : ${Array.isArray(data.ameliorations) ? (data.ameliorations as string[]).join(", ") : "N/R"}
- Meilleurs posts déclarés : ${data.meilleursPosts || "Non renseigné"}

Génère maintenant l'audit complet en JSON uniquement.`;
}

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    if (!data?.instagram && !data?.tiktok && !data?.youtube) {
      return NextResponse.json({ error: "Au moins une plateforme requise" }, { status: 400 });
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

    // Extract all text blocks from the response (web search adds tool_use/result blocks)
    let combinedText = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const block of (message.content as any[])) {
      if (block.type === "text") combinedText += block.text;
    }

    const match = combinedText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON in response");

    return NextResponse.json({ analysis: JSON.parse(match[0]) });
  } catch (err) {
    console.error("Analyse réseaux API error:", err);
    // Fallback: try without web search if beta fails
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
