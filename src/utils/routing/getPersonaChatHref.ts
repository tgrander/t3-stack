import { getNanoID, routes } from "~/utils";

export const getPersonaChatHref = ({ personaId }: { personaId: string }) => {
  return routes.chat.persona({
    personaId,
    chatId: `c-${getNanoID()}`,
  });
};
