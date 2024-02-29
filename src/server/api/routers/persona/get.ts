import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";
import { PersonaSchema } from "~/schema";

export const get = publicProcedure
  .input(z.undefined())
  .query(async ({ ctx }) => {
    const personas = await ctx.db.query.aiCharacters.findMany();
    return z.array(PersonaSchema).parse(personas);
  });
