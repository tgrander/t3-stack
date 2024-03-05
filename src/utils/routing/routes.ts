const keys = {
  persona: "p",
  chat: "c",
};
const values = {
  personaId: "personaId",
  chatId: "chatId",
};
const segments = {
  personaId: `[${values.personaId}]`,
  chatId: `[${values.chatId}]`,
};

export const routes = {
  chat: {
    persona: ({ chatId, personaId }: { chatId: string; personaId: string }) => {
      return `/chat/p/${personaId}/c/${chatId}`;
    },
  },
};
