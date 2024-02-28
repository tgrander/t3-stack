"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import ArrowUpIcon from "@heroicons/react/20/solid/ArrowUpIcon";
import { api } from "~/trpc/react";

import { useCompletion } from "ai/react";

const guestSessionId = "6a5ae9b1-5d6c-4932-9838-08e156a332ae";

export function SendMessage() {
  const router = useRouter();

  // SEND MESSAGE
  const [message, setMessage] = useState("");

  const { mutate, isLoading } = api.chat.createChatWithMessage.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const sendMessage = () => mutate({ message, guestSessionId });

  // STREAM MESSAGE RESPONSE
  const { completion, input, handleInputChange, handleSubmit, error, data } =
    useCompletion();

  return (
    <div className="flex flex-1">
      <div className="w-full">
        <div className="flex h-full flex-col p-6">
          <h2 className=" mb-4 text-lg font-semibold">
            Chat with Robin Williams
          </h2>
          {data && (
            <pre className="bg-gray-100 p-4 text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
          {error && (
            <div className="fixed left-0 top-0 w-full bg-red-500 p-4 text-center text-white">
              {error.message}
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{completion}</div>
          <div className="relative flex items-end p-4">
            <form
              className="w-full"
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   sendMessage();
              // }}
              onSubmit={handleSubmit}
            >
              <Textarea
                className="form-textarea min-h-[60px] w-full resize-none overflow-hidden rounded-md border pb-2 pl-3 pr-16 pt-2 text-lg"
                placeholder="Send a message to Debate King..."
                rows={1}
                value={input}
                onChange={handleInputChange}
                // onKeyDown={(e) => {
                //   if (isLoading) return;
                //   if (e.key === "Enter") {
                //     e.preventDefault();

                //   }
                // }}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute bottom-7 right-7"
                disabled={isLoading}
              >
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
