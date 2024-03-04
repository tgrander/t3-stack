"use client";

import { Card, CardTitle, CardHeader } from "~/components/ui/card";
import { useChatPageParams } from "~/hooks";
import { PersonaSchemaType } from "~/schema";

interface Props {
  personas: PersonaSchemaType[];
}

export function MessagesHeader({ personas }: Props) {
  const { personaId } = useChatPageParams();
  const activePersona = personas.find(({ id }) => id === personaId);

  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle className=" text-lg">{activePersona?.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
