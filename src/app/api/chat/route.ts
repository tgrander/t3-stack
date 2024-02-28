import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { appCaller } from "~/server/api";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: () => {
      /**
       * @TODO Send a message to the user that the AI is typing
       */
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
