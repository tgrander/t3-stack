import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage, Button } from "~/components/ui";
import { routes } from "~/utils";
import { PersonaSchemaType } from "~/schema";

export function PersonaNavButtonLink(p: PersonaSchemaType) {
  console.log("Nav <li> ID :>> ", p.id);
  return (
    <Link href={routes.newPersonaChat({ personaId: p.id })}>
      <Button variant="ghost" className="h-fit w-full px-2 py-2">
        <div className="flex flex-1 items-center justify-start space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-shrink flex-col">
            <p className="text-left text-lg font-medium">{p.name}</p>
            <p className=" text-left text-sm font-medium text-gray-500">
              {/* {personaTypes[Math.floor(Math.random() * personaTypes.length)]} */}
              {p.personaType[0]}
            </p>
          </div>
        </div>
      </Button>
    </Link>
  );
}
