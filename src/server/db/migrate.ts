import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "./index";

async function main() {
  await migrate(db, { migrationsFolder: "../../../drizzle" });
}

main();

// /Users/treygranderson/Desktop/code/t3-stack-app-router/src/server/db/migrate.ts
