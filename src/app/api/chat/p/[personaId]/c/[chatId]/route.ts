import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

import { api } from "~/trpc/server";
import { ChatRouteParamsSchema } from "~/types";
import { getNanoID } from "~/utils";
import { RequestBodySchema, ChatCompletionMessageParamSchema } from "./types";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

// POST REQUEST HANDLER
export async function POST(
  req: NextRequest,
  { params }: { params: z.infer<typeof ChatRouteParamsSchema> },
) {
  try {
    // Parse URL parameters
    // const url = new URL(req.url);
    console.log("params :>> ", params);
    // Parse body
    const body = RequestBodySchema.parse(await req.json());
    const { messages } = body;

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
        // Create a new message in the database
        const newMessage = messages[messages.length - 1];
        const message = ChatCompletionMessageParamSchema.parse(newMessage);

        // await api.message.create.mutate({
        //   messageId: message.id ? message.id : getNanoID(),
        //   chatId: parsedParams.chatId,
        //   personaId: parsedParams.personaId,
        //   message: {
        //     content: message.content,
        //     role: message.role,
        //   },
        // });
      },
      onToken: async (token: string) => {
        // This callback is called for each token in the stream
        // You can use this to debug the stream or save the tokens to your database
        // console.log(token);
      },
      onCompletion: async (completion: string) => {
        // This callback is called when the stream completes
        // You can use this to save the final completion to your database
        // await saveCompletionToDatabase(completion);
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
