export const routes = {
  personaChat: ({ personaId, chatId }: { personaId: string; chatId: string }) =>
    `/p/${personaId}/c/${chatId}`,

  newPersonaChat: ({ personaId }: { personaId: string }) => `/p/${personaId}`,
};
