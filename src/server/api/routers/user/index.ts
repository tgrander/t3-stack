import { createTRPCRouter } from "~/server/api/trpc";
import { createUser } from "./createUser";

export const userRouter = createTRPCRouter({
  createUser,
});
