import { useParams } from "next/navigation";
import { z } from "zod";
import { ChatPageParamsSchema } from "~/types";

type ChatPageParams = z.infer<typeof ChatPageParamsSchema>;

export const useChatPageParams = (): ChatPageParams => {
  const params = useParams();
  const parse = ChatPageParamsSchema.parse(params);
  return parse;
};
