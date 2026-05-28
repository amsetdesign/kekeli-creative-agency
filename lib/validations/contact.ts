import { z } from "zod";

export const contactSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
  structure: z.string().optional(),
  typeProjet: z.enum([
    "Site web ou application",
    "Campagne réseaux sociaux",
    "Photo shooting",
    "Couverture événement / concert",
    "Communication artiste",
    "Stratégie digitale complète",
    "Autre",
  ]),
  budget: z
    .enum([
      "Moins de 200 000 FCFA",
      "200 000 — 500 000 FCFA",
      "500 000 — 1 500 000 FCFA",
      "Plus de 1 500 000 FCFA",
      "À définir ensemble",
    ])
    .optional(),
  message: z.string().min(20, "Le message doit contenir au moins 20 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
