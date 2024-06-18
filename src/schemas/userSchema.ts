import { z } from 'zod';

export const userRoleSchema = z.enum(['BASIC', 'ADMIN']);

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(255),
  age: z.number().int().nonnegative(),
  password: z.string().max(255).min(6),
  email: z.string().email().max(255),
  emailUpdates: z.boolean().default(false),
  role: userRoleSchema.optional().default('BASIC'),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const createUserSchema = z.object({
  name: z.string().min(1, { message: 'Name must not be empty' }),
  age: z.number().int().positive(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  email: z.string().email(),
  emailUpdates: z.boolean(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: 'Name must not be empty' }).optional(),
  age: z.number().int().positive().optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).optional(),
  email: z.string().email().optional(),
  emailUpdates: z.boolean().optional(),
  role: userRoleSchema.optional(),
});
