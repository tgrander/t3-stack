import { relations } from "drizzle-orm";
import { varchar, primaryKey } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { tags, aiCharacters } from "./index";

export const tagsOnAiChars = createTable(
  "tags_on_ai_chars",
  {
    tagId: varchar("tag_id", { length: 36 })
      .notNull()
      .references(() => tags.id),
    aiCharacterId: varchar("ai_character_id", { length: 36 })
      .notNull()
      .references(() => aiCharacters.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tagId, table.aiCharacterId] }),
  }),
);

export const tagsOnAiCharactersRelations = relations(
  tagsOnAiChars,
  ({ one }) => ({
    chat: one(tags, {
      fields: [tagsOnAiChars.tagId],
      references: [tags.id],
    }),
    aiCharacter: one(aiCharacters, {
      fields: [tagsOnAiChars.aiCharacterId],
      references: [aiCharacters.id],
    }),
  }),
);
