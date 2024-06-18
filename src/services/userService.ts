import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const getAllUsers = async () => {
  return await db.select().from(users);
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

export const createUser = async (userData: any) => {
  const validatedData = createUserSchema.parse(userData);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, validatedData.email));

  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);
  const userWithHashedPassword = {
    ...validatedData,
    password: hashedPassword,
  };

  return await db.insert(users).values(userWithHashedPassword).returning();
};

export const updateUser = async (id: string, userData: any) => {
  const validatedData = updateUserSchema.parse(userData);
  return await db
    .update(users)
    .set(validatedData)
    .where(eq(users.id, id))
    .returning();
};

export const deleteUser = async (id: string) => {
  return await db.delete(users).where(eq(users.id, id)).returning();
};

export const getUserPosts = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { posts: true },
  });
};
