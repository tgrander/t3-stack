import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const createUser = publicProcedure
  .input(
    z.object({
      id: z.string(),
      email: z.string().email(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.db
      .insert(users)
      .values({
        id: input.id,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
      })
      .returning({ insertedId: users.id });

    return { chatId: user[0]?.insertedId };
  });
