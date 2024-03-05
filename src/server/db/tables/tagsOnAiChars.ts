import { relations } from "drizzle-orm";
import { varchar, primaryKey } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { tags, aiCharacters } from "./index";

export const tagsOnAiChars = createTable(
  "tags_on_ai_chars",
  {
    tagName: varchar("tag_name", { length: 75 })
      .notNull()
      .references(() => tags.name),
    aiCharacterId: varchar("ai_character_id", { length: 36 })
      .notNull()
      .references(() => aiCharacters.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tagName, table.aiCharacterId] }),
  }),
);

export const tagsOnAiCharactersRelations = relations(
  tagsOnAiChars,
  ({ one }) => ({
    tag: one(tags, {
      fields: [tagsOnAiChars.tagName],
      references: [tags.name],
    }),
    aiCharacter: one(aiCharacters, {
      fields: [tagsOnAiChars.aiCharacterId],
      references: [aiCharacters.id],
    }),
  }),
);
