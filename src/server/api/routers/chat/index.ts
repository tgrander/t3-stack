import { createTRPCRouter } from "~/server/api/trpc";
import { create } from "./create";
import { getOne } from "./getOne";

export const chatRouter = createTRPCRouter({
  create,
  getOne,
});
