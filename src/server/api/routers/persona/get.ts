import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const get = publicProcedure
  .input(z.undefined())
  .query(async ({ ctx }) => {
    return await ctx.db.query.aiCharacters.findMany();
  });
