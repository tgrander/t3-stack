import "server-only";

import { notFound } from "next/navigation";

import { ChatPageParamsType } from "~/types";
import { ChatMessages } from "~/components/chat";
import { api } from "~/trpc/server";

export default function ChatMessagesPage({
  params,
}: {
  params: ChatPageParamsType;
}) {
  const { chatId } = params;
  if (!chatId) {
    return notFound();
  }

  const chat = api.chat.getOne.query({ id: chatId });

  console.log("chat :>> ", chat);

  return <ChatMessages />;
}
