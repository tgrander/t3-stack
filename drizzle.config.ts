import { type Config, defineConfig } from "drizzle-kit";

import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./src/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
  tablesFilter: ["t3-test_*"],
}) satisfies Config;
