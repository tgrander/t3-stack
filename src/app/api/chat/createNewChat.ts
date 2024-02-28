import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

import { caller } from "~/trpc/server";
import { RequestBodySchema, ChatCompletionMessageParamSchema } from "./types";

export const createNewChat = async ({ req }: { req: NextRequest }) => {
  const { messages } = RequestBodySchema.parse(req.json());
  const message = ChatCompletionMessageParamSchema.parse(
    getLastMessage(messages),
  );

  const { userId } = auth();
  const guestSessionId = req.cookies.get("guest_session_id");

  const chatRes = await caller.chat.createChatWithMessage({
    message,
    userId: userId ?? undefined,
    guestSessionId: guestSessionId ? guestSessionId.value : undefined,
  });

  return NextResponse.json({ chatRes }, { status: 200 });
};

type ChatCompletionMessageParamTypes = z.infer<
  typeof ChatCompletionMessageParamSchema
>;
const getLastMessage = (messages: ChatCompletionMessageParamTypes[]) => {
  return messages[messages.length - 1];
};
