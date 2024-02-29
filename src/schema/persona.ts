import { z } from "zod";
import { personaTypes } from "~/server/db/schema";

export const PersonaSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  description: z.nullable(z.string()),
  avatarImage: z.nullable(z.string()),
  cloudinaryPublicId: z.nullable(z.string()),
  createdById: z.nullable(z.string()),
  configurationData: z.unknown(),
  personaType: z.enum(personaTypes),
});