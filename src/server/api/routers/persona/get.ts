import { z } from "zod";
import { eq } from "drizzle-orm";

import { publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { PersonaSchema } from "~/schema";

export const getAll = publicProcedure
  .input(z.undefined())
  .query(async ({ ctx }) => {
    const personas = await ctx.db.query.aiCharacters.findMany();
    return z.array(PersonaSchema).parse(personas);
  });

export const getOne = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const persona = await ctx.db.query.aiCharacters.findFirst({
      where: eq(users.id, input.id),
    });
    return PersonaSchema.parse(persona);
  });
