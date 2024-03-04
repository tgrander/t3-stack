import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { messages, chats, messageRoles } from "~/server/db/schema";
import { getNanoID } from "~/utils";
import { auth } from "@clerk/nextjs";

function getCookieValue(headers: Headers, cookieName: string): string | null {
  const cookies = headers.get("cookie");
  if (!cookies) return null;

  const cookieValue = cookies
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .find(([name]) => name === cookieName)?.[1];

  return cookieValue ? decodeURIComponent(cookieValue) : null;
}

export const create = publicProcedure
  .input(
    z.object({
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

    const newChatId = await ctx.db.transaction(async (db) => {
      const newChat = await db
        .insert(chats)
        .values({
          id: getNanoID(),
          userId,
          guestSessionId,
        })
        .returning({ insertedId: chats.id });

      if (!newChat) {
        throw new Error("Failed to create chat");
      }

      await db.insert(messages).values({
        id: getNanoID(),
        message: input.message.content,
        userId,
        guestSessionId,
        role: input.message.role,
        chatId: newChat[0]?.insertedId,
      });

      return newChat[0]?.insertedId;
    });

    return newChatId;
  });
