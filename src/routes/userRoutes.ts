import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts,
} from "../controllers/userController";
import { validateData } from "../middleware/validationMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";
import { authMiddleware } from "../middleware/auth";

const userRoutes = Router();

userRoutes.post("/", validateData(createUserSchema), createUser);

userRoutes.use(authMiddleware());

userRoutes.get("/:id", getUserById);

userRoutes.get("/:id/posts", getUserPosts);

userRoutes.put(
  "/:id",
  validateData(updateUserSchema),
  updateUser
);

userRoutes.delete("/:id", deleteUser);

export default userRoutes;
