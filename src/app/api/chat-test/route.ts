import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs";

// import { caller } from "~/trpc/server";
import { RequestBodySchema, ChatCompletionMessageParamSchema } from "./types";
import { createNewChat } from "./createNewChat";

type ChatCompletionMessageParamTypes = z.infer<
  typeof ChatCompletionMessageParamSchema
>;

const getLastMessage = (messages: ChatCompletionMessageParamTypes[]) => {
  return messages[messages.length - 1];
};

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

// POST REQUEST HANDLER
export async function POST(req: NextRequest) {
  try {
    const body = RequestBodySchema.parse(await req.json());

    if (!body.chatId) {
      return await createNewChat({ req, body });
    }

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages:
        body.messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        /**
         * @TODO send loading indicator to the client that the AI is typing
         */
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
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
