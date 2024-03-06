"use client";

import Link from "next/link";
import { CldImage, CldImageProps } from "next-cloudinary";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui";
import { routes } from "~/utils";
import { PersonaSchemaType } from "~/schema";
import { cn, getNanoID, getPersonasCrop } from "~/utils";
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
          <CldImage
            alt="image"
            className={cn("m-0 h-full w-full bg-transparent object-cover p-0")}
            width="36"
            height="36"
            crop={getPersonasCrop({ persona, type: "thumb" })}
            src={persona.cloudinaryPublicId as string}
            style={{ objectFit: "cover" }}
          />

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{persona.name}</span>
      </span>
    </Link>
  );
}
