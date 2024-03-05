import { createTRPCRouter } from "~/server/api/trpc";
import { create } from "./create";

export const messageRouter = createTRPCRouter({
  create,
});
