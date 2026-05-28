import { z } from "zod";

export const briefSchema = z.object({
  projet: z.string().min(1),
  budget: z.string().min(1),
  delai: z.string().min(1),
  prenom: z.string().min(1),
  whatsapp: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
});

export type BriefData = z.infer<typeof briefSchema>;
