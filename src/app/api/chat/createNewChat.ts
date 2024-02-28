import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

import { db } from "~/server/db";
import { chats, messages as messagesSchema } from "~/server/db/schema";
// import { caller } from "~/trpc/server";
import { ChatCompletionMessageParamSchema, RequestBodyType } from "./types";

export const createNewChat = async ({
  req,
  body,
}: {
  req: NextRequest;
  body: RequestBodyType;
}) => {
  const { messages } = body;
  const lastMessage = getLastMessage(messages);
  const message = ChatCompletionMessageParamSchema.parse(lastMessage);

  const { userId } = auth();
  const guestSessionId = req.cookies.get("guest_session_id");

  const chatId = await db.transaction(async (tx) => {
    // Create chat
    const chat = await tx
      .insert(chats)
      .values({
        userId: userId,
        // guestSessionId: guestSessionId ? guestSessionId.value : undefined,
      })
      .returning({ insertedId: chats.id });

    const chatId = chat[0]?.insertedId;

    // Create message
    await tx.insert(messagesSchema).values({
      message: message.content,
      role: message.role,
      userId: userId,
      chatId: chat[0]?.insertedId,
    });

    return { chatId };
  });

  return NextResponse.json(chatId, { status: 200 });
};

type ChatCompletionMessageParamTypes = z.infer<
  typeof ChatCompletionMessageParamSchema
>;

const getLastMessage = (messages: ChatCompletionMessageParamTypes[]) => {
  return messages[messages.length - 1];
};
