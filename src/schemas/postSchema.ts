import { z } from "zod";

export const postSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(255),
  content: z.string().max(255),
  authorId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title must not be empty" }),
  content: z.string().min(1, { message: "Content must not be empty" }),
  authorId: z.string().uuid(),
});

export const updatePostSchema = z.object({
  title: z.string().min(5, { message: "Title must not be empty" }).optional(),
  content: z
    .string()
    .min(5, { message: "Content must not be empty" })
    .optional(),
  authorId: z.string().uuid().optional(),
});
