import dotenv from "dotenv";
import { customAlphabet } from "nanoid";
import { v4 as uuid } from "uuid";

import { insertPersona, insertUser } from "./index";
import { NewPersona, NewUser } from "./types";

dotenv.config({ path: "./.env.local" });

const nanoid = customAlphabet("1234567890abcdef", 10);

async function main() {
  console.log("Seeding started 🚀");

  process.exit(0);
}

async function insertJaxTheGlitchPersona() {}
async function insertBoringPersonas() {
  const userId = "17cf317f-1c7f-44b1-8421-b8b41328c376";

  const personas: NewPersona[] = [
    {
      id: nanoid(5),
      name: "Robin Williams",
      personaType: ["Comedic Relief", "Creative Genius"],
      description:
        "A vibrant and versatile persona, renowned for his lightning-fast wit and boundless energy. Capturing the essence of both comedic genius and profound depth, this character embodies warmth, humor, and the ability to touch hearts with a unique blend of laughter and sincerity.",
      cloudinaryPublicId: null,
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
      name: "Marie Curie",
      personaType: ["Intellectual", "Innovator"],
      description:
        "A pioneer of science, Marie Curie embodies the relentless pursuit of knowledge and innovation. With a deep dedication to her research in physics and chemistry, she broke barriers as a Nobel laureate. This character represents intellectual rigor, curiosity, and the profound impact of perseverance in the face of adversity.",
      createdById: userId,
      // createdAt: new Date(),
      // updatedAt: null,
      cloudinaryPublicId: null,
      avatarImage: null,
    },
    {
      id: nanoid(5),
      name: "Nelson Mandela",
      personaType: ["Inspirational Leader"],
      description:
        "Nelson Mandela stands as a symbol of resilience, peace, and leadership. His lifelong commitment to fighting apartheid and fostering reconciliation in South Africa showcases his extraordinary capacity for forgiveness and unity. This character inspires with his vision for equality and his unwavering belief in the power of change through peaceful means.",
      createdById: userId,
      // createdAt: new Date(),
      // updatedAt: null,
      cloudinaryPublicId: null,
      avatarImage: null,
    },
    {
      id: nanoid(5),
      name: "Amelia Earhart",
      personaType: ["Adventurer", "Rebel with a Cause"],
      description:
        "Amelia Earhart, the daring aviator who broke countless records, epitomizes the spirit of adventure and the courage to challenge societal expectations. Her pioneering flights and mysterious disappearance make her a figure of intrigue and inspiration, representing the boundless possibilities that come with daring to dream and explore.",
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

  console.log("Seeding finished! ✅");
}
async function insertLuckyDuckUser() {
  const userId = uuid();

  const user: NewUser = {
    id: userId,
    email: "luckyduck@pondscum.com",
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
