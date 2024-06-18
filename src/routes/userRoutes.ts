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
import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/userSchema";
import { authMiddleware } from "../middleware/auth";

const userRoutes = Router();

userRoutes.get("/", authMiddleware, getAllUsers);

userRoutes.get("/:id", authMiddleware, getUserById);

userRoutes.get("/:id/posts", authMiddleware, getUserPosts);

userRoutes.post("/", validateData(createUserSchema), createUser);

userRoutes.put(
  "/:id",
  validateData(updateUserSchema),
  authMiddleware,
  updateUser
);

userRoutes.delete("/:id", authMiddleware, deleteUser);

export default userRoutes;
