import { z } from "zod";

const ChatCompletionMessageParamSchema = z.object({
  role: z.enum(["user", "system", "assistant"]),
  content: z.string(),
});

export const RequestBodySchema = z.object({
  messages: z.array(ChatCompletionMessageParamSchema),
  chatId: z.string().optional(),
});

export type RequestBodyType = z.infer<typeof RequestBodySchema>;
