import * as schema from "./schema";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import { NewUser, NewPersona, NewTag } from "./types";
import { users, aiCharacters, tags } from "./schema";

export const db = drizzle(sql, { schema });

export const insertUser = async (user: NewUser) => {
  return await db.insert(users).values(user).returning();
};

export const insertPersona = async (persona: NewPersona) => {
  return await db.insert(aiCharacters).values(persona).returning();
};

export const insertTag = async (tag: NewTag) => {
  return await db.insert(tags).values(tag).returning();
};
