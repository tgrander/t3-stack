import { sql, relations } from "drizzle-orm";
import { index, varchar, timestamp, json, pgEnum } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { users, aiCharsOnChats, messages } from "./index";

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
    greeting: varchar("greeting", { length: 1000 }),
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
