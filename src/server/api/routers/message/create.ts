import { auth } from "@clerk/nextjs";
import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";
import { messages, messageRoles, RoleType } from "~/server/db/schema";
import { getCookieValue } from "~/utils";

export const create = publicProcedure
  .input(
    z.object({
      messageId: z.string(),
      chatId: z.string(),
      personaId: z.string(),
      message: z.object({
        content: z.string().min(1),
        role: z.enum(messageRoles),
      }),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { userId } = auth();
    const guestSessionId = getCookieValue(ctx.headers, "guestSessionId");

    const role = input.message.role as RoleType;

    await ctx.db.insert(messages).values({
      id: input.messageId,
      message: input.message.content,
      role: input.message.role,

      aiCharacterId: role === "user" ? null : input.personaId,

      chatId: input.chatId,
      userId,
      guestSessionId,
    });
  });
