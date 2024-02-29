"use client";

import { useChatPageParams } from "~/hooks";

export function PersonaHeader() {
  const { personaId } = useChatPageParams();
  // const activePersona = morePersonas.find((p) => p.id === personaId);

  return (
    <h2 className="mb-4 text-2xl font-semibold">
      {/* {`Chat with ${activePersona?.name}`} */}
      Robin Williams
    </h2>
  );
}
