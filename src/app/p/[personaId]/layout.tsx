import "server-only";

// import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { z } from "zod";

import { api } from "~/trpc/server";
import { ChatPageParamsSchema } from "~/types";
import { routes, personaChatRoute } from "~/utils";
import { PersonaNavButtonLink, PersonaHeader } from "./_components";

export default async function ChatLayout({
  children,
  params,
}: React.PropsWithChildren & {
  params: z.infer<typeof ChatPageParamsSchema>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // noStore();
  const personas = (await api.persona.getAll.query()) ?? [];

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div
        id="sidebar-wrapper"
        className="hidde md:fixed md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col"
      >
        <div
          id="sidebar-content"
          className="my-2 ml-2 h-full rounded-2xl bg-white drop-shadow"
        >
          <ul role="list" className="mx-2 my-2 space-y-2">
            {personas.map((p) => (
              <li key={p.id}>
                <PersonaNavButtonLink persona={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 md:pl-64">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="flex h-full flex-col p-6">
            <PersonaHeader personas={personas} />
            {/* Messenger UI */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
