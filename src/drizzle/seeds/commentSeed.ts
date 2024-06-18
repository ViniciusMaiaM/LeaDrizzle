import { db } from "../db";
import { comments } from "../schema";

export async function seedComments() {
  const commentsData = [
    {
      id: "3f2401c5-21c0-4a0b-ae4e-6f067e4a15e3",
      content: "Great post!",
      userId: "1f2401c5-21c0-4a0b-ae4e-6f067e4a15e1",
      postId: "2f2401c5-21c0-4a0b-ae4e-6f067e4a15e2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.insert(comments).values(commentsData).execute();
}
