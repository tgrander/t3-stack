import "server-only";

import { OpenAIStream } from "ai";
import OpenAI from "openai";
import { Suspense } from "react";

import { ChatMessages } from "~/components/chat";
import { api } from "~/trpc/server";
import { ChatPageParamsType, ChatPageSearchParamsType } from "~/types";

import { shakespeare as shakespeareSystemPrompt } from "~/constants/prompts";

export const runtime = "edge";

export default async function ChatMessagesPage({
  params,
  searchParams,
}: {
  params: ChatPageParamsType;
  searchParams: ChatPageSearchParamsType;
}) {
  /**
   * OPENAI STREAMING
   */
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content: shakespeareSystemPrompt,
      },
    ],
  });

  const stream = OpenAIStream(response);
  const reader = stream.getReader();

  return (
    <ChatMessages>
      <Suspense>
        <Reader reader={reader} />
      </Suspense>
    </ChatMessages>
  );
}

type ChatQuery = Awaited<ReturnType<typeof api.chat.getOne.query>>;

async function Reader({
  reader,
}: {
  reader: ReadableStreamDefaultReader<any>;
}) {
  const { done, value } = await reader.read();

  if (done) {
    return null;
  }

  const text = new TextDecoder().decode(value);

  return (
    <span>
      {text}
      <Suspense>
        <Reader reader={reader} />
      </Suspense>
    </span>
  );
}

// function getInitialMessages(chat: ChatQuery): Message[] {
//   if (!chat) {
//     return [];
//   }
//   return chat.messages.map((m) => ({
//     id: m.id,
//     role: m.role as Message["role"],
//     content: m.message,
//   }));
// }
