import { api } from "./server";

export type PersonaQueryType =
  ReturnType<typeof api.persona.getAll.query> extends Promise<Array<infer T>>
    ? T
    : never;
