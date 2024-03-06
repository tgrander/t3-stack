import { CldImageProps } from "next-cloudinary";

import { PersonaQueryType } from "~/trpc/types";

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

export function getPersonasCrop(p: PersonaQueryType): CldImageProps["crop"] {
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
