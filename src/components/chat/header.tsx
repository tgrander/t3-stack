"use client";

import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useChatPageParams } from "~/hooks";
import { PersonaSchemaType } from "~/schema";

interface Props {
  personas: PersonaSchemaType[];
}

export function MessagesHeader({ personas }: Props) {
  const { personaId } = useChatPageParams();
  const activePersona = personas.find(({ id }) => id === personaId);

  return (
    <Card className="flex h-20 px-4">
      <CardContent className="flex items-center space-x-4 p-0">
        <Avatar className=" h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle className=" text-lg">{activePersona?.name}</CardTitle>
      </CardContent>
    </Card>
  );
}
