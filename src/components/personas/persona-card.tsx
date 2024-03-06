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
        <CardFooter className="color-inherit border-1 shadow-small z-10 mx-2 mb-2 flex h-auto items-center justify-start overflow-hidden rounded-xl border border-white/15 bg-background/10 px-4 py-3 subpixel-antialiased backdrop-blur backdrop-saturate-150 before:rounded-xl before:bg-white/10">
          <p className="text-tiny text-white/80">{p.name}</p>
        </CardFooter>
      </div>
    </Card>
  );
}

("p-3 h-auto flex items-center color-inherit subpixel-antialiased bg-background/10 backdrop-blur backdrop-saturate-150 justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10");
