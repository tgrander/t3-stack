import { createTRPCRouter } from "~/server/api/trpc";
import { getAll, getOne } from "./get";

export const personaRouter = createTRPCRouter({
  getOne,
  getAll,
});
