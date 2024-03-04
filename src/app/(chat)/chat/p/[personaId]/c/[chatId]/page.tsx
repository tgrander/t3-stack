import "server-only";

import { Message } from "ai/react";
import { notFound } from "next/navigation";

import { ChatPageParamsType } from "~/types";
import { ChatMessages } from "~/components/chat";
import { api } from "~/trpc/server";

export default async function ChatMessagesPage({
  params,
}: {
  params: ChatPageParamsType;
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

  return <ChatMessages initialMessages={initialMessages} />;
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
