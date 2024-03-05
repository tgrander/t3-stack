import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { db } from "~/server/db";
import { chats } from "~/server/db/schema";
import { eq } from "drizzle-orm";

import { api } from "~/trpc/server";
import { getNanoID } from "~/utils";
import {
  RequestBodySchema,
  ChatCompletionMessageParamSchema,
  ChatCompletionMessageParamType,
} from "./types";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

// POST REQUEST HANDLER
export async function POST(req: NextRequest) {
  try {
    // Parse body
    const body = await req.json();
    const parsedBody = RequestBodySchema.parse(body);
    const { messages, personaId, chatId } = parsedBody;

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages.map(
        (m) =>
          ({
            role: m.role,
            content: m.content,
          }) as OpenAI.Chat.Completions.ChatCompletionMessageParam,
      ),
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        /**
         * @TODO send loading indicator to the client that the AI is typing
         */
        const newMessage = messages[messages.length - 1];
        const message = ChatCompletionMessageParamSchema.parse(newMessage);

        // Create a new message in the database
        const chat = await getChat(chatId);
        if (!chat) {
          // Create a new chat
          await api.chat.create.mutate({
            id: chatId,
            personaId,
            message,
          });
        } else {
          // Add new message to the chat
          await createMessage({ messages, chatId, personaId });
        }
      },
      onCompletion: async (completion: string) => {
        // Save AI response to the database
        await api.message.create.mutate({
          messageId: getNanoID(),
          chatId,
          personaId,
          message: {
            content: completion,
            role: "assistant",
          },
        });
      },
    });
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          code: "OPENAI_ERROR_CHAT_COMPLETIONS_CREATE",
          name,
          status,
          headers,
          message,
        },
        { status },
      );
    } else if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}

async function getChat(chatId: string) {
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
    columns: {
      id: true,
    },
  });
  return chat;
}

async function createMessage({
  messages,
  chatId,
  personaId,
}: {
  messages: ChatCompletionMessageParamType[];
  chatId: string;
  personaId: string;
}) {
  const newMessage = messages[messages.length - 1];
  const message = ChatCompletionMessageParamSchema.parse(newMessage);

  // Check if the message already exists
  const existingMessage = await api.message.getOne.query({
    id: message.id,
  });

  if (existingMessage) {
    return;
  }
  // Create the message
  await api.message.create.mutate({
    messageId: message.id ? message.id : getNanoID(),
    chatId: chatId,
    personaId: personaId,
    message: {
      content: message.content,
      role: message.role,
    },
  });
}
