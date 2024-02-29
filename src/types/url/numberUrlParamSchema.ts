import { z } from "zod";

export const NumberUrlParamSchema = z
  .string()
  .optional()
  .refine((value) => !isNaN(Number(value)), {
    message: "Must be a convertible number",
  })
  .transform((value) => (value !== undefined ? Number(value) : undefined));
