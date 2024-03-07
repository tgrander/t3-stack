import * as prompts from "~/constants/personaSystemPrompts";

type PersonaName =
  | "shakespeare"
  | "empath"
  | "rupaul"
  | "chappell"
  | "jax"
  | "frida";

export const getPersonaSystemPrompt = (name: PersonaName) => {
  switch (name) {
    case "shakespeare":
      return prompts.hipsterShakespeare;
    case "empath":
      return prompts.drEmpath;
    case "rupaul":
      return prompts.ruPaul;
    case "chappell":
      return prompts.daveChappelle;
    case "jax":
      return prompts.jaxTheGlitch;
    case "frida":
      return prompts.fridaKahlo;

    default:
      throw new Error("Invalid persona name: " + name);
  }
};
