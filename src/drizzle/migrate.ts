import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const migrationClient = postgres(process.env.DATABASE_URL as string, {
    max: 1,
  });

  console.log('Running migrations...');

  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/drizzle/migrations",
  });

  console.log('[migrate] All migrations have been ran, exiting ...');

  migrationClient.end();
}

main();
