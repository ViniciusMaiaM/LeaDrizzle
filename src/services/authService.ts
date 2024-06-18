import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const login = async (email: string, password: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user[0].password);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user[0].id, user[0].email);
  return { token };
};
