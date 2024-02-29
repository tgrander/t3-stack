import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { customAlphabet } from "nanoid";

import { api } from "~/trpc/server";
import { ChatPageParamsSchema } from "~/types";
import { cn, routes } from "~/utils";
import { PersonaNavButtonLink } from "./_components/PersonaNavButtonLink";
import { PersonaType } from "~/server/db/schema";

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
      {/* Static Desktop Sidebar */}
      <div
        className={cn(
          "hidden bg-gray-300/40 md:fixed md:inset-y-0 md:z-50 md:flex md:w-64 md:flex-col",
          bgGradient,
        )}
      >
        <div className=" px-4 py-4">
          <ul role="list" className="-mx-2 space-y-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i}>
                {personas.map((p) => (
                  <PersonaNavButtonLink
                    key={p.id}
                    {...p}
                    // {...morePersonas[i]}
                    name={morePersonas[i]?.name!}
                    description={morePersonas[i]?.description!}
                    personaType={morePersonas[i]?.personaType!}
                  />
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-1 md:pl-64">
        {/* Messenger */}
        <div className="mx-auto w-full max-w-screen-md">
          <div className="flex h-full flex-col p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              {`Chat with ${activePersona?.name}`}
            </h2>
            {/* Messenger UI */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const nanoid = customAlphabet("1234567890abcdef", 10);

const morePersonas: {
  name: string;
  personaType: PersonaType[];
  description: string;
}[] = [
  {
    name: "Robin Williams",
    personaType: ["Comedic Relief", "Creative Genius"],
    description:
      "A vibrant and versatile persona, renowned for his lightning-fast wit and boundless energy. Capturing the essence of both comedic genius and profound depth, this character embodies warmth, humor, and the ability to touch hearts with a unique blend of laughter and sincerity.",
  },
  {
    name: "Dave Chappelle",
    personaType: ["Comedic Relief", "Intellectual"],
    description:
      "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.",
  },
  {
    name: "Marie Curie",
    personaType: ["Intellectual", "Innovator"],
    description:
      "A pioneer of science, Marie Curie embodies the relentless pursuit of knowledge and innovation. With a deep dedication to her research in physics and chemistry, she broke barriers as a Nobel laureate. This character represents intellectual rigor, curiosity, and the profound impact of perseverance in the face of adversity.",
  },
  {
    name: "Nelson Mandela",
    personaType: ["Inspirational Leader"],
    description:
      "Nelson Mandela stands as a symbol of resilience, peace, and leadership. His lifelong commitment to fighting apartheid and fostering reconciliation in South Africa showcases his extraordinary capacity for forgiveness and unity. This character inspires with his vision for equality and his unwavering belief in the power of change through peaceful means.",
  },
  {
    name: "Amelia Earhart",
    personaType: ["Adventurer", "Rebel with a Cause"],
    description:
      "Amelia Earhart, the daring aviator who broke countless records, epitomizes the spirit of adventure and the courage to challenge societal expectations. Her pioneering flights and mysterious disappearance make her a figure of intrigue and inspiration, representing the boundless possibilities that come with daring to dream and explore.",
  },
  {
    name: "William Shakespeare",
    personaType: ["Creative Genius"],
    description:
      "William Shakespeare, the timeless bard, whose works have captivated audiences for centuries with their profound insights into the human condition. A master storyteller, his ability to weave complex characters, intricate plots, and unforgettable poetry marks him as a beacon of creativity and literary brilliance.",
  },
  {
    name: "Frida Kahlo",
    personaType: ["Tragic Hero", "Creative Genius"],
    description:
      "Frida Kahlo, a painter known for her striking self-portraits and vivid depiction of pain and passion, embodies the resilience of the human spirit in the face of physical and emotional turmoil. Her art reflects her tumultuous life and unyielding strength, making her a symbol of creativity borne out of adversity.",
  },
];
