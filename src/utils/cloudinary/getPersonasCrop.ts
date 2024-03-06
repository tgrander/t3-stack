import { CldImageProps } from "next-cloudinary";

import { PersonaQueryType } from "~/trpc/types";

type CropType =
  | "fill"
  | "lfill"
  | "fill_pad"
  | "crop"
  | "thumb"
  | "scale"
  | "fit"
  | "limit"
  | "mfit"
  | "pad"
  | "lpad"
  | "mpad"
  | "imagga_scale"
  | "imagga_crop";

type CropParams = {
  w?: number;
  h?: number;
  type?: CropType;
};

function getCropValues({
  w,
  h,
  type = "crop",
}: CropParams = {}): CldImageProps["crop"] {
  return {
    type,
    gravity: "face",
    width: w,
    height: h,
  };
}

interface GetPersonasCropParams {
  persona: PersonaQueryType;
  type?: CropType;
}

export function getPersonasCrop({
  persona: p,
  type,
}: GetPersonasCropParams): CldImageProps["crop"] {
  const name = p.name.toLowerCase();

  switch (true) {
    case name.includes("kahlo"):
      return getCropValues({ type });
    case name.includes("empath"):
      return getCropValues({ type });
    case name.includes("shakespeare"):
      return getCropValues({ type });
    case name.includes("dave"):
      return getCropValues({ type });
    case name.includes("williams"):
      return getCropValues({ type });
    default:
      return undefined;
  }
}
