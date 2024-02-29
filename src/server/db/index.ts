import * as schema from "./schema";
import { users, aiCharacters } from "./schema";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql, { schema });

export type NewUser = typeof users.$inferInsert;

export const insertUser = async (user: NewUser) => {
  return await db.insert(users).values(user).returning();
};

export type NewPersona = typeof aiCharacters.$inferInsert;

export const insertPersona = async (persona: NewPersona) => {
  return await db.insert(aiCharacters).values(persona).returning();
};
