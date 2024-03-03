"use client";

import { useChatPageParams } from "~/hooks";
import { PersonaSchemaType } from "~/schema";

interface Props {
  personas: PersonaSchemaType[];
}

export function PersonaHeader({ personas }: Props) {
  const { personaId } = useChatPageParams();
  const activePersona = personas.find(({ id }) => id === personaId);

  return <h2 className="mb-4 text-2xl font-semibold">{activePersona?.name}</h2>;
}
