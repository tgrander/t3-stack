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
    <Card
      key={p.id}
      className="relative mx-2 h-72 w-72 overflow-hidden rounded-2xl"
    >
      <div className="absolute left-0 top-0 h-full w-full">
        <CldImage
          alt="image"
          className={cn("m-0 h-full w-full object-cover p-0")}
          width="300"
          height="300"
          src={p.cloudinaryPublicId ?? ""}
          style={{ objectFit: "cover" }}
        />
      </div>
    </Card>
  );
}
