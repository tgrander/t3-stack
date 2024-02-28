// import { type Config } from "drizzle-kit";

// import { env } from "~/env";

// export default {
//   schema: "./src/server/db/schema.ts",
//   driver: "mysql2",
//   dbCredentials: {
//     uri: env.DATABASE_URL,
//   },
//   tablesFilter: ["t3-stack-app-router_*"],
// } satisfies Config;

import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["t3-test_*"],
} satisfies Config;
