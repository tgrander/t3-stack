import { users, aiCharacters, chats, messages } from "./schema";

export type NewUser = typeof users.$inferInsert;
export type NewPersona = typeof aiCharacters.$inferInsert;
export type NewChat = typeof chats.$inferInsert;
export type NewMessage = typeof messages.$inferInsert;
