import { z } from "zod";

export const NumberUrlParamSchema = z
  .string()
  .nullable() // Allows null values in addition to undefined and strings
  .optional(); // Marks the field as optional

export const ChatPageParamsSchema = z.object({
  chatId: NumberUrlParamSchema,
  personaId: NumberUrlParamSchema,
});

export type ChatPageParamsType = z.infer<typeof ChatPageParamsSchema>;
