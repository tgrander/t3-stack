import { db } from "~/server/db";
import { users, aiCharacters, PersonaType } from "~/server/db/schema";
import { v4 as uuid } from "uuid";

async function main() {
  const userId = uuid();

  const userRes = await db.insert(users).values({
    id: userId,
    email: "luckduck@gmail.com",
    firstName: "Luck",
    lastName: "Duck",
    cloudinaryPublicId: "spacecrafts/fp63kdvlfckpgwix0hrn",
  });

  console.log("Success creating user: ", userRes);

  const personas: PersonaType[] = ["Creative Genius", "Comedic Relief"];

  const aiCharRes = await db.insert(aiCharacters).values({
    name: "Robin Williams",
    createdById: userId,
    cloudinaryPublicId: "ai-chat-app/personas/m0zpghyfpgyjujgfrqkq",
    personaType: personas,
    description:
      "Alan Watts was a British writer, philosopher, and speaker, best known as an interpreter and populariser of Eastern philosophy for a Western audience. Born in Chislehurst, England, he moved to the United States in 1938 and began Zen training in New York. Watts gained a large following in the San Francisco Bay Area while working as a volunteer programmer at KPFA, a Pacifica Radio station in Berkeley. He wrote more than 25 books and articles on subjects important to Eastern and Western religion, introducing the then-burgeoning youth culture to The Way of Zen, one of the first bestselling books on Buddhism. In Psychotherapy East and West, he argued that Buddhism could be thought of as a form of psychotherapy and not a religion. He considered Nature to be the actual foundation of the universe, and he believed that Nature is the only thing that is real. He also explored human consciousness, and the nature of reality, and the pursuit of happiness, and the meaning of life. He was a friend of the Beat poets and other leading figures of the San Francisco Renaissance. He was also influential in the early stages of the human potential movement. Watts died in 1973, aged 58.",
  });

  console.log("Success creating AI character: ", aiCharRes);

  process.exit();
}

main();
