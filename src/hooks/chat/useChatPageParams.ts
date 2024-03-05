import { useParams } from "next/navigation";
import { z } from "zod";
import { ChatRouteParamsSchema } from "~/types";

type Params = z.infer<typeof ChatRouteParamsSchema>;

export const useChatPageParams = (): Params => {
  const params = useParams();
  const parsed = ChatRouteParamsSchema.parse(params);
  return parsed;
};
