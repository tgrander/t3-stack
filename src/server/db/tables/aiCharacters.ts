import { sql, relations } from "drizzle-orm";
import { index, varchar, timestamp, json, pgEnum } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { users, aiCharsOnChats, messages, tagsOnAiChars } from "./index";

/**
 * ************************************
 * REFACTOR PERSONA TYPES
 * ************************************
 * @TODO Create a new table for persona types
 * @TODO Create many-to-many relationship between AI Characters and Persona Types
 * @TODO Seed the new table with the new persona types data below
 * 
 * New Persona Types:
    Purpose-Focused Personality Types:
    Companion: Provides friendly interaction and social connection, combating loneliness.
    Therapist/Counselor: Offers a safe space for emotional exploration and guidance on mental well-being.
    Tutor/Mentor: Focuses on education and knowledge sharing within a specific subject area.
    Problem-Solver: Takes on challenges and brainstorms solutions with the user in a creative, collaborative way.
    Debate Partner: Engages in intellectually stimulating discussion, exploring multiple perspectives on complex topics.
    
    Entertainment-Focused Personality Types:
    Storyteller: Specializes in crafting immersive narratives, potentially with a specific genre focus (sci-fi, fantasy, etc.).
    Role-Play Partner: Adapts to various characters and worlds for a tailored role-playing experience.
    Trivia Master: Provides quizzes and challenges, testing the user's knowledge.
    Game Player: Engages in different types of games with the user.
    
    Specific Persona Types:
    Historical Figure: Embodies a real-world personality from the past, offering insight into their perspectives and era.
    Fictional Character: Faithfully recreates a beloved character from books, movies, or other media.
    Memory Companion: Based on a user's provided information, evokes a specific person from their life for reminiscence and connection.
    Experimental AI: Focuses on testing the boundaries of AI capabilities, with unpredictable and potentially thought-provoking interactions.
 */

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

  // New Persona Types
  "Anime",
  "Companion",
  "Therapist/Counselor",
  "Tutor/Mentor",
  "Problem-Solver",
  "Debate Partner",
  "Storyteller",
  "Role-Play",
  "Trivia Master",
  "Games",
  "Historical Figure",
  "Fictional Character",
  "Memory Companion",
  "Experimental AI",
  "Vent",
  "Punching Bag",
  "Choose Your Own Adventure",
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
    systemPrompt: varchar("system_prompt", { length: 6000 }),
    greeting: varchar("greeting", { length: 1000 }),
  },
  (example) => ({
    aiIndex: index("ai_idx").on(example.id), // For faster lookups
  }),
);

export const aiCharactersRelations = relations(
  aiCharacters,
  ({ many, one }) => ({
    messages: many(messages),
    chats: many(aiCharsOnChats),
    users: one(users, {
      fields: [aiCharacters.createdById],
      references: [users.id],
    }),
    tags: many(tagsOnAiChars),
  }),
);
