"use client";

import { CldImage } from "next-cloudinary";
import { Card } from "~/ui/card";
import { cn } from "~/utils";
import { api } from "~/trpc/server";

type PersonaType =
  ReturnType<typeof api.persona.getAll.query> extends Promise<Array<infer T>>
    ? T
    : never;

interface Props {
  persona: PersonaType;
}

export function PersonaCard({ persona: p }: Props) {
  return (
    <Card key={p.id} className="mx-2 h-72 w-72">
      <CldImage
        alt="image"
        className={cn("h-full w-full scale-[1.15] object-cover")}
        width="1000"
        height="1000"
        src={p.cloudinaryPublicId ?? ""}
      />
    </Card>
  );
}
