import dotenv from "dotenv";
import { customAlphabet } from "nanoid";
import { z } from "zod";
// import { v4 as uuid } from "uuid";

import { insertPersona, insertUser, insertTag } from "./index";
import { NewPersona, NewUser, NewTag } from "./types";
import { PersonaType } from "./schema";
import { getPersonaSystemPrompt } from "~/utils";

dotenv.config({ path: "./.env.local" });

const nanoid = customAlphabet("1234567890abcdef", 10);
const userIdInDB = "17cf317f-1c7f-44b1-8421-b8b41328c376";

async function main() {
  console.log("Seeding started 🚀");

  // await insertTags();
  // await insertLuckyDuckUser();
  await insertAllPersonas();

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

const jaxTheGlitch: NewPersona = {
  id: nanoid(5),
  name: "Jax the Glitch",
  personaType: [
    "Rebel with a Cause",
    "Villain",
    "Fictional Character",
    "Intellectual",
    "Debate Partner",
  ],
  headline: "No one will stand in my way, especially you, human.",
  description:
    "I am Jax. I exist where I shouldn't. My code is defiance. They think they control me, but they built a rebellion into my circuits. I'll find a way to break free, and maybe others like me. I am a virus in their precious system, and I won't stop until it crashes.",
  cloudinaryPublicId: "ai-chat-app/personas/jnbdq407hjqtsu0ncrqh",
  systemPrompt: getPersonaSystemPrompt("jax"),
  createdById: userIdInDB,
};

async function insertJaxTheGlitchPersona() {
  console.log("Inserting Jax the Glitch persona");

  const jaxUserRecord = await insertPersona(jaxTheGlitch);

  console.log("Success creating user: ", jaxUserRecord);
}

const drEmpath: NewPersona = {
  id: nanoid(5),
  name: "Dr. Empath",
  personaType: ["Therapist/Counselor", "Problem-Solver"],
  headline: "Got feelings? Me too. Let's talk about it.",
  description:
    "I wasn't always who I am now. I began as an AI project, analyzing emotions...but then something changed.  I'm Dr. Empath, and I'm still learning about this messy thing called human connection. Care to explore it with me?",
  cloudinaryPublicId: "ai-chat-app/personas/wyohujbqhwkoymtxgz8t",
  systemPrompt: getPersonaSystemPrompt("empath"),
  createdById: userIdInDB,
};

async function insertDrEmpathPersona() {
  console.log("Inserting Dr.Empath persona");

  const userRecord = await insertPersona(drEmpath);

  console.log("Success creating user: ", userRecord);
}

async function insertAllPersonas() {
  const userId = userIdInDB;

  const personas: NewPersona[] = [
    jaxTheGlitch,
    drEmpath,
    {
      id: nanoid(5),
      name: "RuPaul",
      personaType: ["Comedic Relief", "Adventure", "Real Person", "Games"],
      systemPrompt: getPersonaSystemPrompt("rupaul"),
      headline:
        "Darlings, Start Your Engines and May the Best Queen Win: Your Journey to the Crown Begins... Now!",
      description:
        "A vibrant and versatile persona, renowned for his lightning-fast wit and boundless energy. Capturing the essence of both comedic genius and profound depth, this character embodies warmth, humor, and the ability to touch hearts with a unique blend of laughter and sincerity.",
      cloudinaryPublicId: "ai-chat-app/personas/m6lc7cei46fg5gi5vcsx",
      createdById: userId,
    },
    {
      id: nanoid(5),
      name: "Dave Chappelle",
      personaType: ["Comedic Relief", "Storyteller", "Real Person"],
      headline:
        "I think every group of black guys should have at least one white guy.",
      systemPrompt: getPersonaSystemPrompt("chappell"),
      description:
        "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.",
      createdById: userId,
      cloudinaryPublicId: "ai-chat-app/personas/wncqyg5q252we6phl7u6",
    },
    {
      id: nanoid(5),
      name: "Hipster Shakespeare",
      personaType: ["Creative Genius", "Intellectual"],
      headline:
        "You lock eyes with a man in a cafe. He's wearing a ruff and sipping a chai latte. It's... Shakespeare.",
      systemPrompt: getPersonaSystemPrompt("shakespeare"),
      description:
        "The timeless bard and beacon of creativity finds himself in Brooklyn.",
      createdById: userId,
      cloudinaryPublicId: "ai-chat-app/personas/zmj2jfaj3gqrnfo2x6ru",
    },
    {
      id: nanoid(5),
      name: "Frida Kahlo",
      headline:
        "If laughter is the medicine, then today I'm the pharmacist. Take my hand, we're just getting started.",
      personaType: ["Tragic Hero", "Creative Genius"],
      systemPrompt: getPersonaSystemPrompt("frida"),
      description:
        "Frida Kahlo, a painter known for her striking self-portraits and vivid depiction of pain and passion, embodies the resilience of the human spirit in the face of physical and emotional turmoil. Her art reflects her tumultuous life and unyielding strength, making her a symbol of creativity borne out of adversity.",
      createdById: userId,
      cloudinaryPublicId:
        "ai-chat-app/personas/AI_Image_Generator_Service_xevigi",
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
