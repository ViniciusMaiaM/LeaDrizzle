import { db } from "../db";
import { likes } from "../schema";

export async function seedLikes() {
  const likesData = [
    {
      id: "4f2401c5-21c0-4a0b-ae4e-6f067e4a15e4",
      userId: "1f2401c5-21c0-4a0b-ae4e-6f067e4a15e1",
      postId: "2f2401c5-21c0-4a0b-ae4e-6f067e4a15e2",
      createdAt: new Date(),
    },
  ];

  await db.insert(likes).values(likesData).execute();
}
