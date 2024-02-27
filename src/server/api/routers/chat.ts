import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { messages, chats } from "~/server/db/schema";

export const chatRouter = createTRPCRouter({
  // CREATE MESSAGE
  createMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        chatId: z.number(),
        userId: z.number().optional(),
        isGuest: z.boolean().optional(),
        guestSessionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messages).values({
        message: input.message,
        userId: input.userId,
        chatId: input.chatId,
      });
    }),

  // CREATE CHAT
  createChat: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        userId: z.number().optional(),
        guestSessionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(chats).values({
        name: input.name,
      });
    }),

  // CREATE CHAT WITH MESSAGE
  createChatWithMessage: publicProcedure
    .input(
      z
        .object({
          message: z.string().min(1),
          userId: z.number().optional(),
          guestSessionId: z.string().optional(),
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
        const chat = await tx.insert(chats).values({
          userId: input.userId,
        });

        if (!chat) {
          throw new Error(
            "Failed to create chat: insert operation returned: ",
            chat,
          );
        }

        console.log("chat :>> ", chat);

        // await tx.insert(messages).values({
        //   message: input.message,
        //   userId: input.userId,
        //   chatId: chat.insertId as number,
        // });
      });
    }),
});
