import { sql, relations } from "drizzle-orm";
import { index, varchar, timestamp } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { messages, users, aiCharsOnChats } from "./index";

export const chats = createTable(
  "chat",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 256 }),
    userId: varchar("user_id", { length: 36 }),
    guestSessionId: varchar("guest_session_id", { length: 36 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (example) => ({
    chatIndex: index("chat_idx").on(example.id),
  }),
);

export const chatsRelations = relations(chats, ({ many, one }) => ({
  messages: many(messages),
  aiCharacters: many(aiCharsOnChats),
  users: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
}));
