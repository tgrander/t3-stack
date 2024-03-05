"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui";
import { routes } from "~/utils";
import { PersonaSchemaType } from "~/schema";
import { cn, getNanoID } from "~/utils";
import { useChatPageParams } from "~/hooks";

type Props = {
  persona: PersonaSchemaType;
};

const getTempChatId = () => {
  return "c-" + getNanoID();
};

export function SidebarItem({ persona }: Props) {
  const { personaId } = useChatPageParams();

  return (
    <Link
      href={routes.chat.persona({
        personaId: persona.id,
        chatId: getTempChatId(),
      })}
    >
      {/* <Button variant="ghost" className="h-fit w-full px-2 py-2"> */}
      <span
        className={cn(
          "group flex w-full items-center space-x-3 rounded-md border border-transparent px-2 py-1 text-foreground hover:bg-muted hover:text-foreground",
          {
            "bg-muted font-medium": personaId === persona.id,
          },
        )}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{persona.name}</span>
      </span>
    </Link>
  );
}
