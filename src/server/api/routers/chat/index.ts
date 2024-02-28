import { createTRPCRouter } from "~/server/api/trpc";
import { create } from "./create";

export const chatRouter = createTRPCRouter({
  create,
});
