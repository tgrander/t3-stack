import { z } from "zod";
import { personaTypes } from "~/server/db/schema";

export const PersonaSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  description: z.nullable(z.string()),
  avatarImage: z.nullable(z.string()),
  cloudinaryPublicId: z.nullable(z.string()),
  createdById: z.nullable(z.string()),
  configurationData: z.unknown().nullable().optional(),
  personaType: z.array(z.enum(personaTypes)),
});

export type PersonaSchemaType = z.infer<typeof PersonaSchema>;
