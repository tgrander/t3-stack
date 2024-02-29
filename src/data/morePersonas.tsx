// import { customAlphabet } from "nanoid";
// import { writeFileSync } from "fs";
// import { join } from "path";
// import { PersonaSchemaType } from "~/schema";

// const nanoid = customAlphabet("1234567890abcdef", 10);
// const myUserId = "user_2czws3vVqCMHmMjymEe0eL9BTOH";

// const ids: string[] = Array.from({ length: 7 }, () => nanoid());

// export const morePersonas: PersonaSchemaType[] = [
//   {
//     id: "",
//     name: "Robin Williams",
//     personaType: ["Comedic Relief", "Creative Genius"],
//     description:
//       "A vibrant and versatile persona, renowned for his lightning-fast wit and boundless energy. Capturing the essence of both comedic genius and profound depth, this character embodies warmth, humor, and the ability to touch hearts with a unique blend of laughter and sincerity.",
//     cloudinaryPublicId: null,
//     avatarImage: null,
//     createdById: myUserId,
//     createdAt: new Date(),
//     updatedAt: null,
//   },
//   {
//     id: "",
//     name: "Dave Chappelle",
//     personaType: ["Comedic Relief", "Intellectual"],
//     description:
//       "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.",
//     createdById: myUserId,
//     createdAt: new Date(),
//     updatedAt: null,
//     cloudinaryPublicId: null,
//     avatarImage: null,
//   },
//   {
//     id: "",
//     name: "Marie Curie",
//     personaType: ["Intellectual", "Innovator"],
//     description:
//       "A pioneer of science, Marie Curie embodies the relentless pursuit of knowledge and innovation. With a deep dedication to her research in physics and chemistry, she broke barriers as a Nobel laureate. This character represents intellectual rigor, curiosity, and the profound impact of perseverance in the face of adversity.",
//     createdById: myUserId,
//     createdAt: new Date(),
//     updatedAt: null,
//     cloudinaryPublicId: null,
//     avatarImage: null,
//   },
//   {
//     id: "",
//     name: "Nelson Mandela",
//     personaType: ["Inspirational Leader"],
//     description:
//       "Nelson Mandela stands as a symbol of resilience, peace, and leadership. His lifelong commitment to fighting apartheid and fostering reconciliation in South Africa showcases his extraordinary capacity for forgiveness and unity. This character inspires with his vision for equality and his unwavering belief in the power of change through peaceful means.",
//     createdById: myUserId,
//     createdAt: new Date(),
//     updatedAt: null,
//     cloudinaryPublicId: null,
//     avatarImage: null,
//   },
//   {
//     id: "",
//     name: "Amelia Earhart",
//     personaType: ["Adventurer", "Rebel with a Cause"],
//     description:
//       "Amelia Earhart, the daring aviator who broke countless records, epitomizes the spirit of adventure and the courage to challenge societal expectations. Her pioneering flights and mysterious disappearance make her a figure of intrigue and inspiration, representing the boundless possibilities that come with daring to dream and explore.",
//     createdById: myUserId,
//     createdAt: new Date(),
//     updatedAt: null,
//     cloudinaryPublicId: null,
//     avatarImage: null,
//   },
//   {
//     id: "",
//     name: "William Shakespeare",
//     personaType: ["Creative Genius"],
//     description:
//       "William Shakespeare, the timeless bard, whose works have captivated audiences for centuries with their profound insights into the human condition. A master storyteller, his ability to weave complex characters, intricate plots, and unforgettable poetry marks him as a beacon of creativity and literary brilliance.",
//     createdById: myUserId,
//     createdAt: new Date(),
//     updatedAt: null,
//     cloudinaryPublicId: null,
//     avatarImage: null,
//   },
//   {
//     id: "",
//     name: "Frida Kahlo",
//     personaType: ["Tragic Hero", "Creative Genius"],
//     description:
//       "Frida Kahlo, a painter known for her striking self-portraits and vivid depiction of pain and passion, embodies the resilience of the human spirit in the face of physical and emotional turmoil. Her art reflects her tumultuous life and unyielding strength, making her a symbol of creativity borne out of adversity.",
//     createdById: myUserId,
//     createdAt: new Date(),
//     updatedAt: null,
//     cloudinaryPublicId: null,
//     avatarImage: null,
//   },
// ].map(
//   (persona, index) =>
//     ({
//       ...persona,
//       id: ids[index],
//     }) as PersonaSchemaType,
// );

// // Serialize the data to JSON format
// const data = JSON.stringify(morePersonas, null, 2);

// // Specify the path to the output JSON file
// const filePath = join(__dirname, "personas.json");

// // Write the JSON data to the file
// writeFileSync(filePath, data);

// console.log(`Personas data has been written to ${filePath}`);
