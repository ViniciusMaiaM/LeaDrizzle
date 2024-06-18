import { db } from "../db";
import { posts } from "../schema";

export async function seedPosts() {
  const postsData = [
    {
      id: "2f2401c5-21c0-4a0b-ae4e-6f067e4a15e2",
      title: "First Post",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      authorId: "1f2401c5-21c0-4a0b-ae4e-6f067e4a15e1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.insert(posts).values(postsData).execute();
}
