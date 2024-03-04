import { z } from "zod";
import { eq } from "drizzle-orm";

import { publicProcedure } from "~/server/api/trpc";
import { chats } from "~/server/db/schema";

export const getOne = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const chat = await ctx.db.query.chats.findFirst({
      where: eq(chats.id, input.id),
      with: {
        messages: true,
        aiCharacters: {
          columns: {
            chatId: true,
            aiCharacterId: true,
          },
          with: {
            aiCharacter: {
              columns: {
                id: true,
                name: true,
                avatarImage: true,
                cloudinaryPublicId: true,
              },
            },
          },
        },
      },
    });

    return chat;
  });
