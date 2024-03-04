import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

import { api } from "~/trpc/server";
import { ChatPageParamsSchema } from "~/types";
import { SidebarNav, MessagesHeader } from "~/components/chat";
import { Card, CardTitle, CardHeader } from "~/components/ui/card";

export default async function ChatLayout({
  children,
}: React.PropsWithChildren & {
  params: z.infer<typeof ChatPageParamsSchema>;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  noStore();
  const personas = (await api.persona.getAll.query()) ?? [];

  return (
    <div className="flex min-h-screen">
      <div className="hidden space-y-1 py-2 pl-2 md:fixed md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col">
        <SidebarHeader />
        <SidebarNav items={personas} />
      </div>
      <div className="flex flex-1 md:pl-72">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="flex h-screen flex-col space-y-1 p-2">
            <MessagesHeader personas={personas} />
            {/* Messenger UI */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarHeader() {
  return (
    <Card className="flex h-20">
      <CardHeader>
        <CardTitle className=" text-lg">Personas</CardTitle>
      </CardHeader>
    </Card>
  );
}
