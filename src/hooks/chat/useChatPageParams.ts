import { useParams } from "next/navigation";
import { z } from "zod";

const ChatPageParamsSchema = z.object({
  chatId: z
    .string()
    .optional()
    .refine((value) => !isNaN(Number(value)), {
      message: "Must be a convertible number",
    })
    .transform((value) => (value !== undefined ? Number(value) : undefined)),
  personaId: z
    .string()
    .optional()
    .refine((value) => !isNaN(Number(value)), {
      message: "Must be a convertible number",
    })
    .transform((value) => (value !== undefined ? Number(value) : undefined)),
});

type ChatPageParams = z.infer<typeof ChatPageParamsSchema>;

export const useChatPageParams = (): ChatPageParams => {
  const params = useParams();
  const parse = ChatPageParamsSchema.parse(params);
  return parse;
};
