"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage, Button } from "~/components/ui";
import { getRoute, personaChatRoute } from "~/utils";
import { PersonaSchemaType } from "~/schema";

type Props = {
  persona: PersonaSchemaType;
};

export function PersonaNavButtonLink({ persona }: Props) {
  const router = useRouter();

  return (
    <Link href={persona.href}>
      {/* <Button variant="ghost" className="h-fit w-full px-2 py-2"> */}
      <div className="flex flex-1 items-center justify-start space-x-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-shrink flex-col">
          <p className=" text-left text-base font-medium">{persona.name}</p>
        </div>
      </div>
      {/* </Button> */}
    </Link>
  );
}
