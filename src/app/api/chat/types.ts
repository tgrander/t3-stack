import { z } from "zod";
import { messageRoles } from "~/server/db/schema";

export const ChatCompletionMessageParamSchema = z.object({
  id: z.string().optional(),
  role: z.enum(messageRoles),
  content: z.string(),
});

export const RequestBodySchema = z.object({
  messages: z.array(ChatCompletionMessageParamSchema),
  chatId: z.string().optional(),
});

export type RequestBodyType = z.infer<typeof RequestBodySchema>;
