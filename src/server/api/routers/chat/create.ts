import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { messages, chats, messageRoles } from "~/server/db/schema";
import { getNanoID } from "~/utils";

export const create = publicProcedure
  .input(
    z
      .object({
        personaId: z.string(),
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
    const newChatId = await ctx.db.transaction(async (db) => {
      const [newChat] = await db
        .insert(chats)
        .values({
          id: getNanoID(),
          userId: input.userId,
          guestSessionId: input.guestSessionId,
        })
        .returning({ insertedId: chats.id });

      if (newChat === undefined) {
        throw new Error("Failed to create chat");
      }

      await db.insert(messages).values({
        id: getNanoID(),
        message: input.message.content,
        userId: input.userId,
        guestSessionId: input.guestSessionId,
        role: input.message.role,
        chatId: newChat.insertedId,
      });

      return newChat.insertedId;
    });

    return newChatId;
  });
