import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { messages, chats } from "~/server/db/schema";

export const createChatWithMessage = publicProcedure
  .input(
    z
      .object({
        message: z.string().min(1),
        userId: z.number().optional(),
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
          guestSessionId: input.userId ? null : input.guestSessionId,
        })
        .returning({ insertedId: chats.id });

      // Create message
      await tx.insert(messages).values({
        message: input.message,
        userId: input.userId,
        chatId: chat[0]?.insertedId,
      });

      return { chatId: chat[0]?.insertedId };
    });
  });
