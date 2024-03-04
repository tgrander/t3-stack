const keys = {
  persona: "p",
  chat: "c",
};
const values = {
  personaId: "personaId",
  chatId: "chatId",
};
const fragments = {
  personaId: `[${values.personaId}]`,
  chatId: `[${values.chatId}]`,
};

export const personaChatRoute = `/${keys.persona}/${fragments.personaId}/${keys.chat}/${fragments.chatId}`;

export const getRoute = {
  personaChat: ({ personaId, chatId }: { personaId: string; chatId: string }) =>
    `/p/${personaId}/c/${chatId}`,

  chatWithPersona: ({ personaId }: { personaId: string }) =>
    `/chat/p/${personaId}`,

  newPersonaChat: ({ personaId }: { personaId: string }) => `/p/${personaId}`,
};
