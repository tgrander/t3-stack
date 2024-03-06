"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
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
      className={cn(
        "relative z-50 mx-2 h-72 w-72 cursor-pointer overflow-hidden rounded-2xl",
        "transition-shadow duration-300 ease-in-out hover:shadow-2xl",
      )}
    >
      <div className="flex h-full flex-col justify-end">
        <div className="absolute left-0 top-0 h-full w-full">
          <CldImage
            alt="image"
            className={cn("m-0 h-full w-full bg-transparent object-cover p-0")}
            width="300"
            height="300"
            crop={getCrop(p)}
            src={p.cloudinaryPublicId as string}
            style={{ objectFit: "cover" }}
          />
        </div>
        <CardFooter
          className={cn(
            "color-inherit border-1 mx-2 mb-2 h-auto overflow-hidden rounded-xl px-4 py-3 shadow-md",
            "flex items-center justify-center",
            "subpixel-antialiased backdrop-blur-sm backdrop-saturate-150 before:rounded-xl before:bg-white/10",
            "border border-white/15 bg-background/10",
          )}
        >
          <p className="text-tiny text-white/80">{p.name}</p>
        </CardFooter>
      </div>
    </Card>
  );
}

type CropParams = {
  w: number;
  h: number;
};

function getCropValues({ w, h }: CropParams): CldImageProps["crop"] {
  return {
    type: "crop",
    width: w,
    height: h,
  };
}

function getCrop(p: PersonaType): CldImageProps["crop"] {
  switch (true) {
    case p.name.toLowerCase().includes("kahlo"):
      return getCropValues({ w: 800, h: 800 });
    case p.name.toLowerCase().includes("shakespeare"):
      return getCropValues({ w: 800, h: 800 });
    case p.name.toLowerCase().includes("dave"):
      return getCropValues({ w: 800, h: 800 });
    case p.name.toLowerCase().includes("williams"):
      return getCropValues({ w: 600, h: 600 });
    default:
      return undefined;
  }
}
