import { useParams } from "next/navigation";
import { z } from "zod";
import { NumberUrlParamSchema } from "~/types";

const ChatPageParamsSchema = z.object({
  chatId: NumberUrlParamSchema,
  personaId: NumberUrlParamSchema,
});

type ChatPageParams = z.infer<typeof ChatPageParamsSchema>;

export const useChatPageParams = (): ChatPageParams => {
  const params = useParams();
  const parse = ChatPageParamsSchema.parse(params);
  return parse;
};
