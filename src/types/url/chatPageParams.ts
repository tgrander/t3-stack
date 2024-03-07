import { z } from "zod";

export const NumberUrlParamSchema = z
  .string()
  .nullable() // Allows null values in addition to undefined and strings
  .optional(); // Marks the field as optional

export const ChatPageParamsSchema = z.object({
  chatId: z.string(),
  personaId: z.string(),
});

export type ChatPageParamsType = z.infer<typeof ChatPageParamsSchema>;

export const ChatPageSearchParamsSchema = z.object({
  reload: z
    .string()
    .optional()
    .transform((v) => (v === "true" ? true : false)),
});

export type ChatPageSearchParamsType = z.infer<
  typeof ChatPageSearchParamsSchema
>;
