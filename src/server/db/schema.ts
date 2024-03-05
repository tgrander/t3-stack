import { db } from "./index";
import { users, aiCharacters } from "./schema";
import { NewUser, NewPersona } from "./types";

export * from "./tables";

export const insertUser = async (user: NewUser) => {
  return await db.insert(users).values(user).returning();
};

export const insertPersona = async (persona: NewPersona) => {
  return await db.insert(aiCharacters).values(persona).returning();
};
