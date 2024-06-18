import { Table, getTableName, sql } from "drizzle-orm";
import { db } from "./db";
import postgres from "postgres";
import * as seeds from "./seeds";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL as string);

async function resetTable(table: Table) {
  await db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

async function seedDatabase() {
  // Array of all tables to reset
  const tablesToReset: Table[] = [
    schema.users,
    schema.posts,
    schema.comments,
    schema.likes,
  ];

  for (const table of tablesToReset) {
    await resetTable(table);
  }

  // Run seeding functions
  try {
    await seeds.seedUsers();
    await seeds.seedPosts();
    await seeds.seedComments();
    await seeds.seedLikes();
    // Call other seeding functions here
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

seedDatabase();
