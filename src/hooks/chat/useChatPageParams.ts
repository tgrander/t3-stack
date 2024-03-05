import { useParams } from "next/navigation";
import { z } from "zod";
import { ChatPageParamsSchema } from "~/types";

type Params = z.infer<typeof ChatPageParamsSchema>;

export const useChatPageParams = (): Params => {
  const params = useParams();
  const parsed = ChatPageParamsSchema.parse(params);
  return parsed;
};
