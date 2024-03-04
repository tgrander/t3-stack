"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui";
import { getRoute } from "~/utils";
import { PersonaSchemaType } from "~/schema";
import { cn } from "~/utils";

type Props = {
  persona: PersonaSchemaType;
};

export function SidebarItem({ persona }: Props) {
  const pathname = usePathname();

  return (
    <Link href={getRoute.chatWithPersona({ personaId: persona.id })}>
      {/* <Button variant="ghost" className="h-fit w-full px-2 py-2"> */}
      <span
        className={cn(
          "group flex w-full items-center space-x-3 rounded-md border border-transparent px-2 py-1 text-foreground hover:bg-muted hover:text-foreground",
          {
            "bg-muted font-medium": pathname.includes(persona.id),
          },
        )}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{persona.name}</span>
      </span>
    </Link>
  );
}
