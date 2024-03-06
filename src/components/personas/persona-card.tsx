"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import Link from "next/link";

import { Card, CardFooter } from "~/ui/card";
import { cn } from "~/utils";
import { api } from "~/trpc/server";
import { getPersonaChatHref, getNanoID } from "~/utils";

type PersonaType =
  ReturnType<typeof api.persona.getAll.query> extends Promise<Array<infer T>>
    ? T
    : never;

interface Props {
  persona: PersonaType;
}

export function PersonaCard({ persona: p }: Props) {
  return (
    <Link href={getPersonaChatHref({ personaId: p.id })}>
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
              className={cn(
                "m-0 h-full w-full bg-transparent object-cover p-0",
              )}
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
              "subpixel-antialiased backdrop-blur-md backdrop-saturate-150 before:rounded-xl before:bg-white/10",
              "border border-white/15 bg-background/10",
            )}
          >
            <p className="text-md font-medium tracking-wider text-white/80">
              {p.name}
            </p>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

type CropParams = {
  w?: number;
  h?: number;
};

function getCropValues({ w, h }: CropParams = {}): CldImageProps["crop"] {
  return {
    type: "crop",
    gravity: "face",
    width: w,
    height: h,
  };
}

function getCrop(p: PersonaType): CldImageProps["crop"] {
  const name = p.name.toLowerCase();

  switch (true) {
    case name.includes("kahlo"):
      return getCropValues();
    case name.includes("empath"):
      return getCropValues();
    case name.includes("shakespeare"):
      return getCropValues();
    case name.includes("dave"):
      return getCropValues();
    case name.includes("williams"):
      return getCropValues();
    default:
      return undefined;
  }
}
