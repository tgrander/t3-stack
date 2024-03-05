import { sql, relations } from "drizzle-orm";
import { varchar, timestamp, integer, index } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { tagsOnAiChars, users } from "./index";

export const tags = createTable(
  "tags",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 75 }).notNull().unique(),
    description: varchar("description", { length: 500 }),
    cloudinaryPublicId: varchar("cloudinary_public_id", { length: 255 }),
    personaCount: integer("persona_count").notNull().default(0),

    createdById: varchar("created_by", { length: 36 }),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (example) => ({
    tagIndex: index("tag_idx").on(example.name),
  }),
);

export const tagsRelations = relations(tags, ({ many, one }) => ({
  aiCharacters: many(tagsOnAiChars),
  users: one(users, {
    fields: [tags.createdById],
    references: [users.id],
  }),
}));
