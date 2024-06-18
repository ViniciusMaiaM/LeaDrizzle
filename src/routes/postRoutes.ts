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

postRoutes.use(authMiddleware());

postRoutes.get("/", getAllPosts);

postRoutes.get("/:id", getPostById);

postRoutes.post("/", validateData(createPostSchema), createPost);

postRoutes.put("/:id", validateData(updatePostSchema), updatePost);

postRoutes.delete("/:id", deletePost);

postRoutes.post("/comments", validateData(createCommentSchema), addComment);

postRoutes.post("/likes", validateData(createLikeSchema), addLike);

export default postRoutes;
