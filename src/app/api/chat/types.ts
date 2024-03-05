import { z } from "zod";
import { messageRoles } from "~/server/db/schema";

export const ChatCompletionMessageParamSchema = z.object({
  id: z.string(),
  role: z.enum(messageRoles),
  content: z.string(),
});

export type ChatCompletionMessageParamType = z.infer<
  typeof ChatCompletionMessageParamSchema
>;

export const RequestBodySchema = z.object({
  messages: z.array(ChatCompletionMessageParamSchema),
  chatId: z.string(),
  personaId: z.string(),
});

export type RequestBodyType = z.infer<typeof RequestBodySchema>;
