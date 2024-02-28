import { useParams } from "next/navigation";
import { z } from "zod";

const ChatPageParamsSchema = z.object({
  chatId: z.string().nullable(),
});

type ChatPageParams = z.infer<typeof ChatPageParamsSchema>;

export const useChatPageParams = (): ChatPageParams => {
  const params = useParams();

  const parseResult = ChatPageParamsSchema.safeParse(params);

  return parseResult.success ? parseResult.data : { chatId: null };
};
