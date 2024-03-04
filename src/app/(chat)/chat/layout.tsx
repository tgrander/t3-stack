import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

import { api } from "~/trpc/server";
import { ChatPageParamsSchema } from "~/types";
import { ChatsSidebarNav, ChatHeader } from "~/components/chat";

export default async function ChatLayout({
  children,
  params,
}: React.PropsWithChildren & {
  params: z.infer<typeof ChatPageParamsSchema>;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  noStore();
  const personas = (await api.persona.getAll.query()) ?? [];

  return (
    <div className="flex min-h-screen">
      <ChatsSidebarNav items={personas} />
      <div className="flex flex-1 md:pl-64">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="flex h-full flex-col p-6">
            <ChatHeader personas={personas} />
            {/* Messenger UI */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}