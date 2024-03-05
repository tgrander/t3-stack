import { sql, relations } from "drizzle-orm";
import { index, varchar, timestamp } from "drizzle-orm/pg-core";

import { createTable } from "../createTable";
import { messages, chats, aiCharacters } from "./index";

export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    email: varchar("email", { length: 256 }).unique().notNull(),
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
