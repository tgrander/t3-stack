"use client";

import ArrowUpIcon from "@heroicons/react/20/solid/ArrowUpIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useExpandingTextArea, useChatPageParams } from "~/hooks";
import { api } from "~/trpc/react";

export default function NewChatPage() {
  const { personaId } = useChatPageParams();

  const { textareaRef, onInput } = useExpandingTextArea();

  const router = useRouter();

  const [message, setMessage] = useState("");

  const createChat = api.chat.create.useMutation({
    onSuccess: (chatId) => {
      router.push(`/chat/p/${personaId}/c/${chatId}?reload=true`);
    },
  });

  const handleSubmit = () => {
    if (createChat.isLoading) {
      return;
    }
    if (!message || !personaId) return;

    createChat.mutate({
      personaId,
      message: {
        role: "user",
        content: message,
      },
    });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto"></div>
      <div className="relative flex items-end">
        <form
          className="h-auto w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Textarea
            ref={textareaRef}
            className="form-textarea h-auto min-h-[60px] w-full resize-none overflow-hidden rounded-md border pb-2 pl-3 pr-16 pt-2 text-lg"
            placeholder="Send a message to Debate King..."
            rows={1}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onInput={onInput}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              const isEnterKey = e.key === "Enter" || e.key === "NumpadEnter";
              if (e.shiftKey && isEnterKey) {
                // Allow new line on Shift + Enter
                return;
              } else if (isEnterKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute bottom-3 right-3"
            disabled={createChat.isLoading}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
