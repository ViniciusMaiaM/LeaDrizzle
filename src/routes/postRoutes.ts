import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  addLike,
} from "../controllers/postController";
import { validateData } from "../middleware/validationMiddleware";
import {
  postSchema,
  createPostSchema,
  updatePostSchema,
} from "../schemas/postSchema";
import { createCommentSchema } from "../schemas/commentSchema";
import { createLikeSchema } from "../schemas/likeSchema";
import { authMiddleware } from "../middleware/auth";

const postRoutes = Router();

postRoutes.get("/", authMiddleware, getAllPosts);
//TODO: Add admin verification

postRoutes.get("/:id", authMiddleware, getPostById);

postRoutes.post("/", authMiddleware, validateData(createPostSchema), createPost);

postRoutes.put("/:id", authMiddleware, validateData(updatePostSchema), updatePost);

postRoutes.delete("/:id", authMiddleware, deletePost);

postRoutes.post("/comments", authMiddleware, validateData(createCommentSchema), addComment);

postRoutes.post("/likes", authMiddleware, validateData(createLikeSchema), addLike);

export default postRoutes;
