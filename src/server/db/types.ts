import { users, aiCharacters, chats, messages, tags } from "./schema";

export type NewUser = typeof users.$inferInsert;
export type NewPersona = typeof aiCharacters.$inferInsert;
export type NewChat = typeof chats.$inferInsert;
export type NewMessage = typeof messages.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
