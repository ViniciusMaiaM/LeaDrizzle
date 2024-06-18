import { db } from "../drizzle/db";
import { posts, comments, likes } from "../drizzle/schema";
import { createPostSchema, updatePostSchema } from "../schemas/postSchema";
import { createCommentSchema } from "../schemas/commentSchema";
import { createLikeSchema } from "../schemas/likeSchema";
import { eq } from "drizzle-orm";

export const getAllPosts = async () => {
  return await db
    .select()
    .from(posts)
    .leftJoin(comments, eq(posts.id, comments.postId))
    .leftJoin(likes, eq(posts.id, likes.postId));
};

export const getPostById = async (id: string) => {
  return await db
    .select()
    .from(posts)
    .leftJoin(comments, eq(posts.id, comments.postId))
    .leftJoin(likes, eq(posts.id, likes.postId))
    .where(eq(posts.id, id));
};

export const getPostByUserId = async (userId: string) => {
  return await db
    .select()
    .from(posts)
    .leftJoin(comments, eq(posts.id, comments.postId))
    .leftJoin(likes, eq(posts.id, likes.postId))
    .where(eq(posts.authorId, userId));
};

export const createPost = async (postData: any) => {
  const validatedData = createPostSchema.parse(postData);
  return await db.insert(posts).values(validatedData).returning();
};

export const updatePost = async (id: string, postData: any) => {
  const validatedData = updatePostSchema.parse(postData);
  return await db
    .update(posts)
    .set(validatedData)
    .where(eq(posts.id, id))
    .returning();
};

export const deletePost = async (id: string) => {
  return await db.delete(posts).where(eq(posts.id, id)).returning();
};

export const addComment = async (commentData: any) => {
  const validatedData = createCommentSchema.parse(commentData);
  return await db.insert(comments).values(validatedData).returning();
};

export const addLike = async (likeData: any) => {
  const validatedData = createLikeSchema.parse(likeData);
  return await db.insert(likes).values(validatedData).returning();
};
