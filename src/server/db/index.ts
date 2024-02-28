import { env } from "~/env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

export const db = drizzle(
  neon(`${env.DATABASE_URL}?options=project%3D${env.PROJECT_NAME}`),
  { schema },
);
