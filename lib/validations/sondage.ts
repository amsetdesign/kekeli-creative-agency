import { z } from "zod";

export const sondageSubmitSchema = z.object({
  type: z.enum(["entreprise", "artiste", "vendeur", "marque", "evenement"]),
  score: z.number().min(0).max(100),
  answers: z.record(z.string(), z.union([z.number(), z.array(z.number())])),
  userInfo: z.object({
    prenom: z.string().min(1, "Prénom requis"),
    email: z.string().email("Email invalide"),
    telephone: z.string().optional(),
    structure: z.string().optional(),
    sexe: z.enum(["homme", "femme", "non_precise"]).optional(),
    age: z.enum(["moins_25", "25_35", "35_45", "45_plus"]).optional(),
    ville: z.string().optional(),
    budget: z.string().optional(),
    source: z.string().optional(),
    urgence: z.string().optional(),
  }),
});

export type SondageSubmitData = z.infer<typeof sondageSubmitSchema>;
