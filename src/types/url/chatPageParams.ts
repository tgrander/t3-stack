import { z } from "zod";

export const NumberUrlParamSchema = z
  .string()
  .nullable() // Allows null values in addition to undefined and strings
  .optional() // Marks the field as optional
  .refine(
    (value) => value === null || value === undefined || !isNaN(Number(value)),
    {
      message: "Must be a convertible number",
    },
  )
  .transform((value) =>
    value !== undefined && value !== null ? Number(value) : value,
  );

export const ChatPageParamsSchema = z.object({
  chatId: NumberUrlParamSchema,
  personaId: NumberUrlParamSchema,
});
