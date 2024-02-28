import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const CreateUserInputSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const createUser = publicProcedure
  .input(CreateUserInputSchema)
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
