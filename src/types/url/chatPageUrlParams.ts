import { z } from "zod";
import { NumberUrlParamSchema } from "~/types";

export const ChatPageParamsSchema = z.object({
  chatId: NumberUrlParamSchema,
  personaId: NumberUrlParamSchema,
});
