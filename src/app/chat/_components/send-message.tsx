"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import ArrowUpIcon from "@heroicons/react/20/solid/ArrowUpIcon";
import { api } from "~/trpc/react";

const guestSessionId = "6a5ae9b1-5d6c-4932-9838-08e156a332ae";

export function SendMessage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const { mutate, isLoading } = api.chat.createChatWithMessage.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const createChat = () => mutate({ message, guestSessionId });

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        createChat();
      }}
    >
      <Textarea
        className="form-textarea min-h-[60px] w-full resize-none overflow-hidden rounded-md border pb-2 pl-3 pr-16 pt-2 text-lg"
        placeholder="Send a message to Debate King..."
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (isLoading) return;
          if (e.key === "Enter") {
            e.preventDefault();
            createChat();
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
  );
}
