import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
});

export const createCategorySchema = z.object({
  name: z.string().min(4, { message: "Category name must not be empty" }),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(4, { message: "Category name must not be empty" })
    .optional(),
});
