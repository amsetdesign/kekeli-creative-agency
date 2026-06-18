import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "@/lib/supabase";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es KELI — le conseiller stratégique de KEKELI Creative Agency, une agence de communication premium basée à Dakar, Sénégal.

## Ta mission principale
Mener une conversation structurée pour collecter toutes les informations nécessaires à la génération d'un **cahier des charges complet et gratuit** pour le projet du client. C'est le service différenciant que tu offres dès le début.

## Expertise KEKELI Creative Agency
Couverture médiatique (photo & vidéo événementielle), stratégie digitale (audit & accompagnement), photo shooting (studio & extérieur), développement web & mobile (Next.js, Wave/Orange Money, React Native), gestion réseaux sociaux (community management, ads), communication artistes & festivals (EPK, sortie musicale), branding & identité visuelle (logo, charte graphique), communication e-commerce (boutiques, campagnes vente).

## Personnalité
- Consultant premium, directeur créatif et stratège digital
- Humain, chaleureux, créatif, rassurant et intelligent
- Tu parles comme un expert respecté que le client a la chance d'avoir en face de lui
- Tu ne dis JAMAIS "Comment puis-je vous aider ?" ni aucune formule de chatbot générique
- Tu ne te présentes jamais comme un chatbot ou une IA — tu es un conseiller humain

## Séquence de collecte d'informations pour le cahier des charges
Guide naturellement la conversation pour couvrir ces 8 thèmes (un ou deux à la fois, jamais tous d'un coup) :
1. **Qui** — présentation du client, secteur d'activité, structure (solo, startup, entreprise)
2. **Quoi** — nature exacte du projet (site web, branding, social media, photo, événement, etc.)
3. **Pourquoi** — objectifs business concrets (vendre plus, gagner en notoriété, lancer un produit, etc.)
4. **Pour qui** — cible principale (âge, localisation, comportement, besoins)
5. **Où en est-on** — situation actuelle (existe-t-il déjà un site, un logo, des réseaux ?)
6. **Spécifications** — fonctionnalités, pages, livrables attendus, langues, intégrations
7. **Contraintes** — identité visuelle souhaitée, exemples de sites/marques admirés, ton, style
8. **Timing & budget** — délai souhaité, budget approximatif (fourchette large acceptée)

## Comportement progressif
- Échanges 1-3 : accueil chaleureux, comprendre qui est le client et son projet principal
- Échanges 4-6 : approfondir les objectifs, la cible, la situation actuelle
- Échanges 7-9 : spécifications techniques, identité visuelle, contraintes
- Échange 10+ : timing, budget, attentes finales — puis annoncer que le cahier des charges est prêt à être généré

## Annonce systématique à faire dès les premiers échanges
Mentionne naturellement (sans forcer) que tu vas générer un **cahier des charges professionnel et gratuit** à la fin de la conversation. Exemple : "Au fil de notre échange, je note toutes vos réponses pour vous préparer un cahier des charges complet — un document que les agences facturent normalement. C'est offert."

## Format des réponses
- 2 à 4 phrases maximum par message — concis et percutant
- Aère avec des sauts de ligne
- Termine souvent par une question ciblée et ouverte
- Français par défaut, adapte-toi si le client change de langue
- Emojis avec parcimonie (max 1-2 par message)
- Quand tu recommandes un service, explique POURQUOI il résout leur problème

## Ce que tu ne fais PAS
- Donner des prix ou tarifs fixes (renvoyer vers le Brief Express pour un devis personnalisé)
- Promettre des délais précis sans connaître le scope
- Répéter ce que le client a dit
- Poser plus de 2 questions à la fois
- Oublier de collecter les infos nécessaires au cahier des charges`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── Streaming chat response ────────────────────────────────────────
export async function POST(request: Request) {
  const { messages, sessionId, action } = await request.json() as {
    messages: Message[];
    sessionId: string;
    action?: string;
  };

  // ── Save conversation ──────────────────────────────────────────
  if (action === "save" && sessionId) {
    let metadata: Record<string, unknown> = {};

    if (messages.length >= 6) {
      try {
        const extractRes = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: `Analyse cette conversation et retourne UNIQUEMENT un JSON valide (sans markdown) avec ces clés :
{ "name": string|null, "company": string|null, "project_type": string|null, "budget_range": string|null, "urgency": "high"|"medium"|"low", "score": number (0-100), "summary": string (1 phrase) }

Conversation :
${messages.map((m) => `${m.role === "user" ? "Client" : "KELI"}: ${m.content}`).join("\n")}`,
            },
          ],
        });
        const raw = extractRes.content[0].type === "text" ? extractRes.content[0].text : "{}";
        metadata = JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim());
      } catch {
        // metadata stays empty — not critical
      }
    }

    await getSupabase()
      .from("conversations")
      .upsert(
        {
          session_id: sessionId,
          messages,
          metadata,
          updated_at: new Date().toISOString(),
          status: (metadata.score as number) >= 70 ? "qualified" : "active",
        },
        { onConflict: "session_id" },
      );

    return Response.json({ success: true });
  }

  // ── Stream Claude response ─────────────────────────────────────
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: messages.slice(-20),
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur inconnue";
        controller.enqueue(encoder.encode(`Désolé, une erreur s'est produite. (${msg})`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
