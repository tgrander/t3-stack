"use client";

import { useEffect, useRef } from "react";
import ArrowUpIcon from "@heroicons/react/20/solid/ArrowUpIcon";
import { useChat, Message } from "ai/react";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useExpandingTextArea, useChatPageParams } from "~/hooks";

interface Props {
  initialMessages: Message[];
  reload?: boolean;
}

export function ChatMessages({ initialMessages, reload: shouldReload }: Props) {
  const { personaId, chatId } = useChatPageParams();

  const {
    messages,
    input,
    isLoading,

    handleInputChange,
    handleSubmit,

    reload,
  } = useChat({
    id: chatId ?? undefined,
    sendExtraMessageFields: true,
    body: { personaId, chatId },
    initialMessages: initialMessages,
  });

  const hasCalledReload = useRef(false);

  // useEffect(() => {
  //   if (shouldReload && messages.length > 0 && !hasCalledReload.current) {
  //     hasCalledReload.current = true;
  //   }
  // }, [reload, shouldReload]);

  const { textareaRef, onInput } = useExpandingTextArea();

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </div>
      <div className="relative flex items-end">
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
              } else if (isEnterKey && !isLoading) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute bottom-3 right-3"
            disabled={isLoading}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
