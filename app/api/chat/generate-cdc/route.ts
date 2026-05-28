import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

const CDC_SYSTEM_PROMPT = `Tu es un expert en gestion de projet et communication qui rédige des cahiers des charges professionnels pour des projets de communication, web, branding et marketing digital.

Tu génères un document complet, structuré et immédiatement exploitable, rédigé en français professionnel.

## Règles de rédaction
- Sois précis et actionnable — pas de phrases creuses
- Pour les informations manquantes, utilise [À confirmer avec le client] et propose une valeur typique entre parenthèses
- Adapte le niveau de détail technique au type de projet
- Inclus des recommandations stratégiques pertinentes basées sur ton expertise

## Structure obligatoire du document

═══════════════════════════════════════════════
CAHIER DES CHARGES — [NOM DU PROJET EN MAJUSCULES]
Préparé par KEKELI Creative Agency · Dakar, Sénégal
Date : [DATE D'AUJOURD'HUI]
═══════════════════════════════════════════════

## 1. PRÉSENTATION DU PROJET
[Description synthétique du projet en 3-5 phrases]

**Client :** [Nom / Structure]
**Secteur :** [Secteur d'activité]
**Type de projet :** [Nature exacte du projet]

---

## 2. CONTEXTE ET OBJECTIFS

### Contexte
[Situation actuelle du client — ce qui existe déjà, ce qui manque]

### Objectifs business
- [Objectif 1 — mesurable si possible]
- [Objectif 2]
- [Objectif 3]

### Indicateurs de succès (KPIs)
- [KPI 1]
- [KPI 2]

---

## 3. PUBLIC CIBLE

**Cible principale :** [Description]
**Profil démographique :** [Âge, localisation, statut]
**Comportements et besoins :** [Ce qui les motive, leurs douleurs]
**Canaux utilisés :** [Où on les trouve]

---

## 4. PÉRIMÈTRE DES PRESTATIONS

### Services requis
[Liste des services KEKELI Creative Agency impliqués]

### Livrables attendus
- [Livrable 1 — description précise]
- [Livrable 2]
- [Livrable 3]

### Ce qui est exclu du périmètre
- [Exclusion 1]

---

## 5. IDENTITÉ VISUELLE ET TON

**Style souhaité :** [Moderne/Classique/Minimaliste/Vibrant/etc.]
**Ton de communication :** [Professionnel/Friendly/Luxe/Jeune/etc.]
**Palette de couleurs :** [Si connue, sinon À confirmer]
**Références et inspirations :** [Sites, marques, visuels cités]
**Contraintes :** [Logo existant à respecter, charte en place, etc.]

---

## 6. SPÉCIFICATIONS TECHNIQUES

[Adapter selon le type de projet]

**Plateforme / Technologies :** [Ex: Next.js, WordPress, Shopify, etc.]
**Compatibilité :** [Mobile-first, navigateurs, langues]
**Intégrations requises :** [Paiement Wave/Orange Money, CRM, réseaux sociaux, etc.]
**Hébergement :** [À définir / Existant]
**Maintenance :** [Formation client / Contrat maintenance]

---

## 7. PLANNING PRÉVISIONNEL

| Phase | Description | Durée estimée |
|-------|-------------|---------------|
| Phase 1 | Cadrage & brief créatif | [X semaines] |
| Phase 2 | Conception / Création | [X semaines] |
| Phase 3 | Développement / Production | [X semaines] |
| Phase 4 | Tests & ajustements | [X semaines] |
| Phase 5 | Livraison & formation | [X semaines] |

**Date de démarrage souhaitée :** [Date]
**Deadline absolue :** [Date ou À confirmer]

---

## 8. BUDGET ESTIMATIF

**Fourchette budget client :** [Budget mentionné ou À confirmer]
**Recommandation KEKELI Creative Agency :** [Fourchette réaliste pour ce type de projet]

*Note : Un devis détaillé et personnalisé sera établi après validation de ce cahier des charges.*

---

## 9. CONDITIONS ET MODALITÉS

**Droits et propriété :** Les fichiers sources et droits de propriété intellectuelle sont transférés au client à la livraison finale et règlement complet.
**Révisions incluses :** [Nombre de rounds de modifications standards]
**Langue de travail :** Français

---

## 10. PROCHAINES ÉTAPES RECOMMANDÉES

1. ✅ Valider ce cahier des charges avec l'équipe KEKELI Creative Agency
2. 📞 Organiser un appel de cadrage (Brief Express — 30 min)
3. 📝 Signature du bon de commande et acompte de 30%
4. 🚀 Démarrage du projet sous [X] jours ouvrables

---

*Document généré par KELI — Assistant stratégique KEKELI Creative Agency*
*Pour toute question : kekelicreativeagency@gmail.com | +221 XX XX XX XX*`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const { messages, firstName, email } = (await request.json()) as {
    messages: Message[];
    firstName: string;
    email: string;
  };

  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const conversationText = messages
    .map((m) => `${m.role === "user" ? "Client" : "KELI"}: ${m.content}`)
    .join("\n\n");

  // Generate the CDC
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3500,
    system: CDC_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Génère un cahier des charges professionnel et complet basé sur cette conversation.
Date d'aujourd'hui : ${today}
Prénom du client : ${firstName}

Si certaines informations sont absentes, utilise [À confirmer avec le client] et propose une valeur typique. Ne raccourcis pas le document — il doit être exploitable tel quel.

CONVERSATION :
${conversationText}`,
      },
    ],
  });

  const cdc = response.content[0].type === "text" ? response.content[0].text : "";

  // Send email to client
  if (email) {
    await resend.emails.send({
      from: "KELI — KEKELI Creative Agency <noreply@kekeli.agency>",
      to: email,
      subject: `✨ Votre cahier des charges KEKELI Creative Agency — ${today}`,
      html: buildEmailHtml(firstName, cdc, today),
    }).catch(() => {});
  }

  // Notify agency
  const agencyEmail = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";
  await resend.emails.send({
    from: "KELI — KEKELI Creative Agency <noreply@kekeli.agency>",
    to: agencyEmail,
    subject: `📋 Nouveau cahier des charges généré — ${firstName}`,
    html: buildEmailHtml(firstName, cdc, today, true),
  }).catch(() => {});

  return Response.json({ cdc });
}

function buildEmailHtml(firstName: string, cdc: string, date: string, isAgency = false): string {
  const cdcHtml = cdc
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/═+/g, "<hr style='border:2px solid #C8A84B;margin:16px 0'>")
    .replace(/^## (.+)$/gm, "<h2 style='color:#C8A84B;font-size:16px;margin-top:24px;margin-bottom:8px'>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3 style='color:#0C0B09;font-size:14px;margin-top:16px;margin-bottom:6px'>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li style='margin:4px 0'>$1</li>")
    .replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#F5F5F4;margin:0;padding:24px">
  <div style="max-width:680px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="background:linear-gradient(135deg,#0C0B09,#1A0A2E);padding:32px;text-align:center">
      <div style="width:48px;height:48px;background:#C8A84B;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px">
        <span style="color:black;font-weight:bold;font-size:20px">K</span>
      </div>
      <h1 style="color:white;font-size:22px;margin:0 0 4px">KEKELI Creative Agency</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0">Cahier des charges — ${date}</p>
    </div>
    <div style="padding:32px">
      ${isAgency
        ? `<p style="color:#78716C;font-size:14px;margin-bottom:24px">Le client <strong>${firstName}</strong> a généré son cahier des charges via KELI.</p>`
        : `<p style="color:#0C0B09;font-size:15px;margin-bottom:8px">Bonjour <strong>${firstName}</strong>,</p>
           <p style="color:#78716C;font-size:14px;line-height:1.6;margin-bottom:24px">Voici votre cahier des charges complet, préparé par KELI lors de votre échange. Ce document est le point de départ idéal pour démarrer votre projet avec KEKELI Creative Agency.</p>`
      }
      <div style="background:#FAFAF9;border:1px solid #E7E5E4;border-radius:12px;padding:24px;font-size:13px;line-height:1.7;color:#292524">
        ${cdcHtml}
      </div>
      <div style="margin-top:32px;padding:20px;background:#FFF8E7;border-radius:12px;border:1px solid #C8A84B30">
        <p style="color:#0C0B09;font-weight:bold;margin:0 0 8px;font-size:14px">Prochaine étape</p>
        <p style="color:#78716C;font-size:13px;margin:0">Contactez notre équipe pour valider ce document et lancer votre projet. Réponse garantie sous 24h.</p>
      </div>
    </div>
    <div style="background:#F5F5F4;padding:20px;text-align:center">
      <p style="color:#A8A29E;font-size:12px;margin:0">KEKELI Creative Agency · Dakar, Sénégal · kekelicreativeagency@gmail.com</p>
    </div>
  </div>
</body>
</html>`;
}
