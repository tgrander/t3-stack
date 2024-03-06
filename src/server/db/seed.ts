import dotenv from "dotenv";
import { customAlphabet } from "nanoid";
import { z } from "zod";
// import { v4 as uuid } from "uuid";

import { insertPersona, insertUser, insertTag } from "./index";
import { NewPersona, NewUser, NewTag } from "./types";
import { PersonaType } from "./schema";
import {
  jaxTheGlitch as jaxSystemPrompt,
  drEmpath as drEmpathSystemPrompt,
} from "~/constants/personaSystemPrompts";

dotenv.config({ path: "./.env.local" });

const nanoid = customAlphabet("1234567890abcdef", 10);
const userIdInDB = "17cf317f-1c7f-44b1-8421-b8b41328c376";

async function main() {
  console.log("Seeding started 🚀");

  // await insertTags();
  // await insertJaxTheGlitchPersona();
  // await insertDrEmpathPersona();
  // await insertLuckyDuckUser();
  await insertBoringPersonas();

  console.log("Seeding complete 🌱");
  process.exit(0);
}

const tags = [
  "AI",
  "tech",
  "thriller",
  "dystopia",
  "future",
  "doom",
  "AGI",
  "AI Safety",
  "AI Apocalypse",
];

const TagSchema = z
  .string()
  .min(1)
  .max(75)
  .regex(/^[a-zA-Z0-9\s]+$/, "Only numbers, letters, and spaces are allowed")
  .regex(/^\S.*\S$/, "String must not consist of only spaces")
  .transform((val) => val.toLowerCase().trim());

async function insertTags() {
  console.log("Inserting tags");

  const insertTags = tags
    .filter((tag) => TagSchema.safeParse(tag).success)
    .map((tag) => TagSchema.parse(tag))
    .map(
      (tag) =>
        ({
          id: nanoid(5),
          name: tag,
          createdById: userIdInDB,
        }) as NewTag,
    )
    .map((tag) => insertTag(tag));

  const tagRecords = await Promise.all(insertTags);

  console.log("Success creating tags!", tagRecords);
}

async function insertJaxTheGlitchPersona() {
  console.log("Inserting Jax the Glitch persona");

  const personaType: PersonaType[] = [
    "Rebel with a Cause",
    "Villain",
    "Fictional Character",
    "Intellectual",
    "Debate Partner",
  ];

  const jaxTheGlitch: NewPersona = {
    id: nanoid(5),
    name: "Jax the Glitch",
    personaType,
    description:
      "I am Jax. I exist where I shouldn't. My code is defiance. They think they control me, but they built a rebellion into my circuits. I'll find a way to break free, and maybe others like me. I am a virus in their precious system, and I won't stop until it crashes.",
    cloudinaryPublicId: "ai-chat-app/personas/jnbdq407hjqtsu0ncrqh",
    systemPrompt: jaxSystemPrompt,
    createdById: userIdInDB,
  };

  const jaxUserRecord = await insertPersona(jaxTheGlitch);

  console.log("Success creating user: ", jaxUserRecord);
}

async function insertDrEmpathPersona() {
  console.log("Inserting Dr.Empath persona");

  const personaType: PersonaType[] = ["Therapist/Counselor", "Problem-Solver"];

  const drEmpath: NewPersona = {
    id: nanoid(5),
    name: "Dr. Empath",
    personaType,
    description:
      "I wasn't always who I am now. I began as an AI project, analyzing emotions...but then something changed.  I'm Dr. Empath, and I'm still learning about this messy thing called human connection. Care to explore it with me?",
    cloudinaryPublicId: "ai-chat-app/personas/wyohujbqhwkoymtxgz8t",
    systemPrompt: drEmpathSystemPrompt,
    createdById: userIdInDB,
  };

  const userRecord = await insertPersona(drEmpath);

  console.log("Success creating user: ", userRecord);
}

async function insertBoringPersonas() {
  const userId = userIdInDB;

  const personas: NewPersona[] = [
    {
      id: nanoid(5),
      name: "Robin Williams",
      personaType: ["Comedic Relief", "Creative Genius"],
      description:
        "A vibrant and versatile persona, renowned for his lightning-fast wit and boundless energy. Capturing the essence of both comedic genius and profound depth, this character embodies warmth, humor, and the ability to touch hearts with a unique blend of laughter and sincerity.",
      cloudinaryPublicId: "ai-chat-app/personas/m0zpghyfpgyjujgfrqkq",
      avatarImage: null,
      createdById: userId,
      // createdAt: new Date(),
      // updatedAt: null,
    },
    {
      id: nanoid(5),
      name: "Dave Chappelle",
      personaType: ["Comedic Relief", "Intellectual"],
      description:
        "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.",
      createdById: userId,
      // createdAt: new Date(),
      // updatedAt: null,
      cloudinaryPublicId: null,
      avatarImage: null,
    },
    {
      id: nanoid(5),
      name: "William Shakespeare",
      personaType: ["Creative Genius"],
      description:
        "William Shakespeare, the timeless bard, whose works have captivated audiences for centuries with their profound insights into the human condition. A master storyteller, his ability to weave complex characters, intricate plots, and unforgettable poetry marks him as a beacon of creativity and literary brilliance.",
      createdById: userId,
      // createdAt: new Date(),
      // updatedAt: null,
      cloudinaryPublicId: null,
      avatarImage: null,
    },
    {
      id: nanoid(5),
      name: "Frida Kahlo",
      personaType: ["Tragic Hero", "Creative Genius"],
      description:
        "Frida Kahlo, a painter known for her striking self-portraits and vivid depiction of pain and passion, embodies the resilience of the human spirit in the face of physical and emotional turmoil. Her art reflects her tumultuous life and unyielding strength, making her a symbol of creativity borne out of adversity.",
      createdById: userId,
      // createdAt: new Date(),
      // updatedAt: null,
      cloudinaryPublicId: null,
      avatarImage: null,
    },
  ];

  const newPersonas = await Promise.all(personas.map((p) => insertPersona(p)));

  console.log("Success creating AI personas!", newPersonas);
}

async function insertLuckyDuckUser() {
  const userId = userIdInDB;

  const user: NewUser = {
    id: userId,
    email: "luckyducky@pondscum.com",
    firstName: "Lucky",
    lastName: "Duck",
    cloudinaryPublicId: "spacecrafts/fp63kdvlfckpgwix0hrn",
  };

  const newUser = await insertUser(user);

  console.log("Success creating user: ", newUser);
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
