"use client";
import ArrowUpIcon from "@heroicons/react/20/solid/ArrowUpIcon";
import { useChat } from "ai/react";
import { useParams } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useExpandingTextArea, useChatPageParams } from "~/hooks";

// const guestSessionId = "6a5ae9b1-5d6c-4932-9838-08e156a332ae";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ sendExtraMessageFields: true });

  const { textareaRef, onInput } = useExpandingTextArea();

  const { chatId } = useChatPageParams();

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <div className="flex h-full flex-col p-6">
        <h2 className=" mb-4 text-lg font-semibold">
          Chat with Robin Williams
        </h2>
        <div className="flex-1 overflow-y-auto">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))}
        </div>
        <div className="relative flex items-end p-4">
          <form className="h-auto w-full" onSubmit={handleSubmit}>
            <Textarea
              ref={textareaRef}
              className="form-textarea h-auto min-h-[60px] w-full resize-none overflow-hidden rounded-md border pb-2 pl-3 pr-16 pt-2 text-lg"
              placeholder="Send a message to Debate King..."
              rows={1}
              value={input}
              onChange={handleInputChange}
              onInput={onInput}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                const isEnterKey = e.key === "Enter" || e.key === "NumpadEnter";

                if (e.shiftKey && isEnterKey) {
                  // Allow new line on Shift + Enter
                  return;
                } else if (isEnterKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
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
  );
}
