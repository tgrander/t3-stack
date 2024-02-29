export const routes = {
  personaChat: ({ personaId, chatId }: { personaId: number; chatId: number }) =>
    `/p/${personaId}/c/${chatId}`,

  newPersonaChat: ({ personaId }: { personaId: number }) => `/p/${personaId}`,
};
