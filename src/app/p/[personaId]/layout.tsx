import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { api } from "~/trpc/server";
import { ChatPageParamsSchema } from "~/types";
import { cn, routes } from "~/utils";
import { PersonaNavButtonLink } from "./_components/PersonaNavButtonLink";

const bgGradient = "bg-gradient-to-r from-violet-200 to-pink-200";

export default async function ChatLayout({
  children,
  params,
}: React.PropsWithChildren & {
  params: z.infer<typeof ChatPageParamsSchema>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  noStore();
  const personas = (await api.persona.get.query()) ?? [];

  const urlParams = ChatPageParamsSchema.parse(params);

  console.log("urlParams :>> ", urlParams);

  const activePersona = personas.find(({ id }) => id === urlParams.personaId);

  if (!activePersona && !!personas[0]) {
    // redirect to the chat route for the first persona in the list
    redirect(routes.newPersonaChat({ personaId: personas[0].id }));
  } else {
    // throw error?
  }

  return (
    <div className="flex min-h-screen">
      {/* Static Desktop Sidebar */}
      <div
        className={cn(
          "hidden bg-gray-300/40 md:fixed md:inset-y-0 md:z-50 md:flex md:w-64 md:flex-col",
          bgGradient,
        )}
      >
        <div className=" px-4 py-4">
          <ul role="list" className="-mx-2 space-y-1">
            {personas.map((p) => (
              <li key={p.id} className="w-full">
                <PersonaNavButtonLink {...p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-1 md:pl-64">
        {/* Messenger */}
        <div className="mx-auto w-full max-w-screen-md">
          <div className="flex h-full flex-col p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              {`Chat with ${activePersona}`}
            </h2>
            {/* Messenger UI */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
