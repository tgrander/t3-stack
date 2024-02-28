import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { messages, chats, messageRoles } from "~/server/db/schema";

export const create = publicProcedure
  .input(
    z
      .object({
        message: z.object({
          content: z.string().min(1),
          role: z.enum(messageRoles),
        }),
        userId: z.string().optional(),
        guestSessionId: z.string().length(36).optional(),
      })
      .refine(
        (data) => {
          // If userId is not provided, then isGuest must be true and guestSessionId must be provided
          if (data.userId === undefined) {
            return data.guestSessionId !== undefined;
          }
          return true;
        },
        {
          message:
            "If userId is not provided, then isGuest must be true and guestSessionId must be provided",
        },
      ),
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.db.transaction(async (tx) => {
      // Create chat
      const chat = await tx
        .insert(chats)
        .values({
          userId: input.userId,
          guestSessionId: input.userId ? undefined : input.guestSessionId,
        })
        .returning({ insertedId: chats.id });

      // Create message
      await tx.insert(messages).values({
        message: input.message.content,
        role: input.message.role,
        userId: input.userId,
        chatId: chat[0]?.insertedId,
      });

      return { chatId: chat[0]?.insertedId };
    });
  });
