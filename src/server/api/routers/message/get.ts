import { z } from "zod";
import { eq } from "drizzle-orm";

import { publicProcedure } from "~/server/api/trpc";
import { messages } from "~/server/db/schema";

export const getOne = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const message = await ctx.db.query.messages.findFirst({
      where: eq(messages.id, input.id),
    });
    return message;
  });
