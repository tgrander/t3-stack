import { chatRouter } from "~/server/api/routers/chat";
import { createTRPCRouter, createTRPCCaller } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chat: chatRouter,
});

/**
 * This is how you call your tRPC procedures from the server.
 *
 * @see https://trpc.io/docs/v10/server/server-side-calls
 */
export const appCaller = createTRPCCaller(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
