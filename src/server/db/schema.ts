// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations } from "drizzle-orm";
import {
  boolean,
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
  json,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator(
  (name) => `t3-stack-app-router_${name}`,
);

/************************************************************
 * MESSAGES
 ************************************************************/
export const messages = createTable(
  "message",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    message: varchar("message", { length: 500 }).notNull(),
    userId: bigint("user_id", { mode: "number" }),
    isGuest: boolean("is_guest").default(false),
    guestSessionId: varchar("guest_session_id", { length: 36 }),
    aiCharacterId: bigint("ai_character_id", { mode: "number" }),
    chatId: bigint("chat_id", { mode: "number" }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
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

/************************************************************
 * CHATS
 ************************************************************/
export const chats = createTable(
  "chat",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    userId: bigint("id", { mode: "number" }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    chatIndex: index("chat_idx").on(example.name),
  }),
);

export const chatsRelations = relations(chats, ({ many, one }) => ({
  messages: many(messages),
  users: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
}));

/************************************************************
 * USERS
 ************************************************************/
export const users = createTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    avatarImage: varchar("avatar_image", { length: 255 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    userIndex: index("user_idx").on(example.name),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  chats: many(chats),
  aiCharacters: many(aiCharacters),
}));

/************************************************************
 * AI CHARACTERS
 ************************************************************/
export const aiCharacters = createTable(
  "ai_character",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    createdById: bigint("id", { mode: "number" }),
    personalityType: varchar("personality_type", { length: 50 }), // Example: "Humorous", "Philosophical"
    description: varchar("description", { length: 500 }),
    avatarImage: varchar("avatar_image", { length: 255 }),
    configurationData: json("configuration_data"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    aiIndex: index("ai_idx").on(example.name, example.personalityType), // For faster lookups
  }),
);

// RELATIONS
export const aiCharactersRelations = relations(
  aiCharacters,
  ({ many, one }) => ({
    messages: many(messages),
    chats: many(chats),
    users: one(users, {
      fields: [aiCharacters.createdById],
      references: [users.id],
    }),
  }),
);

/************************************************************
 * DELETE ME
 ************************************************************/
export const posts = createTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
