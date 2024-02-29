import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { api } from "~/trpc/server";
import { ChatPageParamsSchema } from "~/types";
import { cn, routes } from "~/utils";
import { PersonaNavButtonLink, PersonaHeader } from "./_components";

const bgGradient = "bg-gradient-to-r from-violet-200 to-pink-200";

export default async function ChatLayout({
  children,
  params,
}: React.PropsWithChildren & {
  params: z.infer<typeof ChatPageParamsSchema>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  noStore();
  const personas = (await api.persona.getAll.query()) ?? [];

  const urlParams = ChatPageParamsSchema.parse(params);

  let activePersona = personas.find(({ id }) => id === urlParams.personaId);

  if (!activePersona && !!personas[0]) {
    activePersona = personas[0];
    // redirect to the chat route for the first persona in the list
    redirect(routes.newPersonaChat({ personaId: activePersona.id }));
  } else {
    // throw error?
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div
        id="sidebar-wrapper"
        className="hidde md:fixed md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col"
      >
        <div
          id="sidebar-content"
          className="my-2 ml-2 h-full rounded-lg bg-white"
        >
          <ul role="list" className="mx-2 my-2 space-y-2">
            {personas.map((p) => (
              <li key={p.id}>
                <PersonaNavButtonLink {...p} />
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
