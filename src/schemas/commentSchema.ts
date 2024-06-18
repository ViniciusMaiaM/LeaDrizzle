import { z } from "zod";

export const commentSchema = z.object({
  id: z.string().uuid(),
  content: z.string().max(500),
  userId: z.string().uuid(),
  postId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createCommentSchema = z.object({
  content: z.string().min(2, { message: "Comment content must not be empty" }),
  userId: z.string().uuid(),
  postId: z.string().uuid(),
});
