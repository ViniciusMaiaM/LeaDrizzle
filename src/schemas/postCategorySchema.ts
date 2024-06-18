import { z } from "zod";

export const postCategorySchema = z.object({
  postId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export const createPostCategorySchema = z.object({
  postId: z.string().uuid(),
  categoryId: z.string().uuid(),
});
