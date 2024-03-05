import { relations } from "drizzle-orm";
import { varchar, primaryKey } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { chats, aiCharacters } from "./index";

export const aiCharsOnChats = createTable(
  "ai_characters_chats",
  {
    aiCharacterId: varchar("ai_character_id", { length: 36 })
      .notNull()
      .references(() => chats.id),
    chatId: varchar("chat_id", { length: 36 })
      .notNull()
      .references(() => aiCharacters.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.aiCharacterId, table.chatId] }),
  }),
);

export const aiCharactersOnChatsRelations = relations(
  aiCharsOnChats,
  ({ one }) => ({
    chat: one(chats, {
      fields: [aiCharsOnChats.chatId],
      references: [chats.id],
    }),
    aiCharacter: one(aiCharacters, {
      fields: [aiCharsOnChats.aiCharacterId],
      references: [aiCharacters.id],
    }),
  }),
);
