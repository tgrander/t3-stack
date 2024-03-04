// import "server-only";

// import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

// import { api } from "~/trpc/server";
import { ChatPageParamsSchema } from "~/types";
// import { PersonaHeader } from "./_components";
import { ChatsSidebarNav } from "~/components/chat";
import { PersonaSchemaType } from "~/schema";

const personas: PersonaSchemaType[] = [
  {
    id: "123abc",
    name: "Dave Chappelle",
    personaType: ["Comedic Relief", "Intellectual"],
    description:
      "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.",
    createdById: "user_2czws3vVqCMHmMjymEe0eL9BTOH",
    createdAt: new Date(),
    updatedAt: null,
    cloudinaryPublicId: null,
    avatarImage: null,
    href: "/chat/p/123abc",
  },
  {
    id: "456abc",
    name: "Apex Predator",
    personaType: ["Comedic Relief", "Intellectual"],
    description:
      "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.",
    createdById: "user_2czws3vVqCMHmMjymEe0eL9BTOH",
    createdAt: new Date(),
    updatedAt: null,
    cloudinaryPublicId: null,
    avatarImage: null,
    href: "/chat/p/456abc",
  },
];

export default async function ChatLayout({
  children,
  params,
}: React.PropsWithChildren & {
  params: z.infer<typeof ChatPageParamsSchema>;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // noStore();
  // const personas = (await api.persona.getAll.query()) ?? [];

  return (
    <div className="flex min-h-screen">
      <ChatsSidebarNav items={personas} />
      <div className="flex flex-1 md:pl-64">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="flex h-full flex-col p-6">
            {/* <PersonaHeader personas={personas} /> */}
            {/* Messenger UI */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
