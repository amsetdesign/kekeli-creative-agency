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
  }),
});

export type SondageSubmitData = z.infer<typeof sondageSubmitSchema>;
