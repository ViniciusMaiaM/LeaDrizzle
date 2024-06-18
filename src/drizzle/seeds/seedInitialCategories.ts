import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../schema";

export async function seedInitialCategories() {
  const categoriesData = [
    { name: "AI" },
    { name: "TypeScript" },
    { name: "Backend" },
    { name: "Frontend" },
    { name: "DevOps" },
    { name: "Other" },
  ];

  for (const category of categoriesData) {
    const existingCategory = await db.select().from(categories).where(eq(categories.name,category.name)).execute();
    if (existingCategory.length === 0) {
      await db.insert(categories).values(category).execute();
    }
  }
}
