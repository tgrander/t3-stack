import { chatRouter } from "~/server/api/routers/chat";
import { userRouter } from "~/server/api/routers/user";
import { personaRouter } from "~/server/api/routers/persona";
import { messageRouter } from "~/server/api/routers/message";
import { createTRPCRouter, createTRPCCallerFactory } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chat: chatRouter,
  user: userRouter,
  persona: personaRouter,
  message: messageRouter,
});

/**
 * This is how you call your tRPC procedures from the server.
 *
 * @see https://trpc.io/docs/v10/server/server-side-calls
 */
export const createCaller = createTRPCCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
