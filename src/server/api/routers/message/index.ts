import { createTRPCRouter } from "~/server/api/trpc";
import { create } from "./create";
import { getOne } from "./get";

export const messageRouter = createTRPCRouter({
  getOne,
  create,
});
