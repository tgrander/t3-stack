import { v4 as uuid } from "uuid";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

import { users, aiCharacters, PersonaType } from "~/server/db/schema";

const db = drizzle(sql, { schema });

async function main() {
  console.log("Seeding started 🚀");
  const userId = uuid();

  const userRes = await db.insert(users).values({
    id: userId,
    email: "luckduck@gmail.com",
    firstName: "Luck",
    lastName: "Duck",
    cloudinaryPublicId: "spacecrafts/fp63kdvlfckpgwix0hrn",
  });

  console.log("Success creating user: ", userRes);

  const personas: PersonaType[] = [
    "Creative Genius",
    "Comedic Relief",
    "Rebel with a Cause",
  ];

  const description =
    "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.";

  const aiCharRes = await db.insert(aiCharacters).values({
    name: "Dave Chapell",
    createdById: userId,
    cloudinaryPublicId: "ai-chat-app/personas/m0zpghyfpgyjujgfrqkq",
    personaType: personas,
    description,
  });

  console.log("Success creating AI character: ", aiCharRes);

  console.log("Seeding finished! ✅");

  process.exit(0);
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
