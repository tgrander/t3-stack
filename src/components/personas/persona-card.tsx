"use client";

import { CldImage } from "next-cloudinary";
import { Card, CardFooter } from "~/ui/card";
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
      className="relative mx-2 h-72 w-72 cursor-pointer overflow-hidden rounded-2xl"
    >
      <div className="flex h-full flex-col justify-end">
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
        <CardFooter className="border-1 mx-2 mb-2 flex h-auto items-center justify-start overflow-hidden rounded-xl border-white/20 bg-background/10 px-4 py-3 subpixel-antialiased backdrop-blur-sm backdrop-saturate-150 before:rounded-xl before:bg-white/10">
          <p className="text-tiny text-white/80">{p.name}</p>
        </CardFooter>
      </div>
    </Card>
  );
}

// absolute bottom-1 z-10
// w-[calc(100%_-_8px)]
