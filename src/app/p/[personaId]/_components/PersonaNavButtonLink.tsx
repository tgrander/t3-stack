import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage, Button } from "~/components/ui";
import { routes } from "~/utils";
import { PersonaSchemaType } from "~/schema";

export function PersonaNavButtonLink(p: PersonaSchemaType) {
  return (
    <Link href={routes.newPersonaChat({ personaId: p.id })}>
      <Button variant="ghost" className="h-fit w-full px-2 py-2">
        <div className="flex flex-1 items-center justify-start space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-shrink flex-col">
            <p className=" text-left text-base font-medium">{p.name}</p>
          </div>
        </div>
      </Button>
    </Link>
  );
}
