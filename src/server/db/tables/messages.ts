import { sql, relations } from "drizzle-orm";
import {
  index,
  varchar,
  timestamp,
  boolean,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { users, chats, aiCharacters } from "./index";

export const messageRoles = [
  "user",
  "assistant",
  "system",
  "tool",
  "function",
] as const;
export type RoleType = (typeof messageRoles)[number];
export const roleEnum = pgEnum("role", messageRoles);

export const messages = createTable(
  "message",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    message: varchar("message", { length: 1000 }).notNull(),
    userId: varchar("user_id", { length: 36 }),
    isGuest: boolean("is_guest").default(false),
    guestSessionId: varchar("guest_session_id", { length: 36 }),
    aiCharacterId: varchar("ai_character_id"),
    chatId: varchar("chat_id"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
    flags: json("flags"),
    role: roleEnum("role").notNull(),
  },
  (example) => ({
    messageIndex: index("message_idx").on(example.message),
  }),
);

// RELATIONS
export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
  aiCharacter: one(aiCharacters, {
    fields: [messages.aiCharacterId],
    references: [aiCharacters.id],
  }),
}));
