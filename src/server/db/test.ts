import { z } from "zod";

const tags = [
  "AI",
  "tech",
  "",
  "    ",
  "hello world!",
  "@@@",
  "thriller",
  "dystopia",
  "future",
  "doom",
  "AGI",
  "AI Safety",
  "AI Apocalypse",
];

function main() {
  const TagSchema = z
    .string()
    .min(1)
    .max(75)
    .regex(/^[a-zA-Z0-9\s]+$/, "Only numbers, letters, and spaces are allowed")
    .regex(/^\S.*\S$/, "String must not consist of only spaces")
    .transform((val) => val.toLowerCase().trim());

  const filteredTags = tags
    .filter((tag) => TagSchema.safeParse(tag).success)
    .map((tag) => TagSchema.parse(tag));

  console.log("filteredTags :>> ", filteredTags);
}

main();
