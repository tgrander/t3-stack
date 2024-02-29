import { createTRPCRouter } from "~/server/api/trpc";
import { get } from "./get";

export const personaRouter = createTRPCRouter({
  get,
});
