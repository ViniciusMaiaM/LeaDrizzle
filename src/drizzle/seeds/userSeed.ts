import { db } from "../db";
import { users } from "../schema";

export async function seedUsers() {
  const usersData = [
    {
      id: "1f2401c5-21c0-4a0b-ae4e-6f067e4a15e1",
      name: "John Doe",
      age: 30,
      password: "hashedpassword1",
      email: "john.doe@example.com",
      emailUpdates: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  // Add more initial data as needed
  await db.insert(users).values(usersData).execute();
}
