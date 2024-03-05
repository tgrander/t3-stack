// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  varchar,
  timestamp,
  boolean,
  json,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3-test_${name}`);

/************************************************************
 * MESSAGES
 ************************************************************/
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

/************************************************************
 * USERS
 ************************************************************/
export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 36 }),
    email: varchar("email", { length: 256 }).unique(),
    firstName: varchar("firstName", { length: 256 }),
    lastName: varchar("lastName", { length: 256 }),
    avatarImage: varchar("avatar_image", { length: 255 }),
    cloudinaryPublicId: varchar("cloudinary_public_id", { length: 255 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (example) => ({
    userIndex: index("user_idx").on(example.id, example.email),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  chats: many(chats),
  aiCharacters: many(aiCharacters),
}));

/************************************************************
 * CHATS
 ************************************************************/
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

/************************************************************
 * 🧬 CHAT + AI_CHAR JOIN TABLE
 ************************************************************/

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

/************************************************************
 * AI CHARACTERS
 ************************************************************/

export const personaTypes = [
  "Inspirational Leader",
  "Creative Genius",
  "Comedic Relief",
  "Wise Mentor",
  "Rebel with a Cause",
  "Tragic Hero",
  "Adventurer",
  "Romantic",
  "Intellectual",
  "Villain",
  "Survivor",
  "Everyman",
  "Mystic",
  "Innovator",
  "Diplomat",
] as const;
export type PersonaType = (typeof personaTypes)[number];
export const personaTypeEnum = pgEnum("personaType", personaTypes);

export const aiCharacters = createTable(
  "ai_character",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    createdById: varchar("user_id", { length: 36 }),
    personaType: json("persona_type").notNull(),
    description: varchar("description", { length: 500 }),
    avatarImage: varchar("avatar_image", { length: 255 }),
    cloudinaryPublicId: varchar("cloudinary_public_id", { length: 255 }),
    configurationData: json("configuration_data"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
    systemPrompt: varchar("system_prompt", { length: 3000 }),
  },
  (example) => ({
    aiIndex: index("ai_idx").on(example.id), // For faster lookups
  }),
);

// RELATIONS
export const aiCharactersRelations = relations(
  aiCharacters,
  ({ many, one }) => ({
    messages: many(messages),
    chats: many(aiCharsOnChats),
    users: one(users, {
      fields: [aiCharacters.createdById],
      references: [users.id],
    }),
  }),
);
