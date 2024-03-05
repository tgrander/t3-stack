import "server-only";

import { Message } from "ai/react";
import { notFound } from "next/navigation";

import {
  ChatPageParamsType,
  ChatPageSearchParamsSchema,
  ChatPageSearchParamsType,
} from "~/types";
import { ChatMessages } from "~/components/chat";
import { api } from "~/trpc/server";

export default async function ChatMessagesPage({
  params,
  searchParams,
}: {
  params: ChatPageParamsType;
  searchParams: ChatPageSearchParamsType;
}) {
  const { chatId } = params;
  if (!chatId) {
    return notFound();
  }

  const chat = await api.chat.getOne.query({ id: chatId });

  if (!chat) {
    return notFound();
  }

  const initialMessages = getInitialMessages(chat);
  const { reload } = ChatPageSearchParamsSchema.parse(searchParams);

  return <ChatMessages initialMessages={initialMessages} reload={reload} />;
}

type ChatQuery = Awaited<ReturnType<typeof api.chat.getOne.query>>;

function getInitialMessages(chat: ChatQuery): Message[] {
  if (!chat) {
    return [];
  }
  return chat.messages.map((m) => ({
    id: m.id,
    role: m.role as Message["role"],
    content: m.message,
  }));
}
