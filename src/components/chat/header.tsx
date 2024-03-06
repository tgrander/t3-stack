"use client";

import { CldImage } from "next-cloudinary";

import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { useChatPageParams } from "~/hooks";
import { PersonaSchemaType } from "~/schema";
import { cn, getPersonasCrop } from "~/utils";

interface Props {
  personas: PersonaSchemaType[];
}

export function MessagesHeader({ personas }: Props) {
  const { personaId } = useChatPageParams();
  const activePersona = personas.find(({ id }) => id === personaId);

  if (!activePersona) {
    return null;
  }

  return (
    <Card className="flex h-24 px-4">
      <CardContent className="flex items-center space-x-4 p-0">
        <Avatar className=" h-16 w-16">
          <CldImage
            alt="image"
            className={cn("m-0 h-full w-full bg-transparent object-cover p-0")}
            width="36"
            height="36"
            crop={getPersonasCrop({ persona: activePersona, type: "thumb" })}
            src={activePersona.cloudinaryPublicId as string}
            style={{ objectFit: "cover" }}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle className=" text-lg">{activePersona?.name}</CardTitle>
      </CardContent>
    </Card>
  );
}
