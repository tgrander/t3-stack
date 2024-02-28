import { createTRPCRouter } from "~/server/api/trpc";
import { createChatWithMessage } from "./createChatWithMessage";

export const chatRouter = createTRPCRouter({
  createChatWithMessage,
});
