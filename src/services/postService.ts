import { db } from "../drizzle/db";
import {
  posts,
  comments,
  likes,
  postCategories,
  categories,
} from "../drizzle/schema";
import { createPostSchema } from "../schemas/postSchema";
import { createCommentSchema } from "../schemas/commentSchema";
import { createLikeSchema } from "../schemas/likeSchema";
import { eq } from "drizzle-orm";


export const getAllPosts = async () => {
  const allPosts = await db.query.posts.findMany({
    with: {
      categories: true,
      comments: true,
      likes: true,
    },
  });

  return allPosts;
};

export const getPostById = async (id: string) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: {
      categories: true,
      comments: true,
      likes: true,
    },
  });
  if (!post) {
    return null;
  }

  return post;
};

export const getPostByUserId = async (userId: string) => {
  const userPosts = await db.query.posts.findFirst({
    where: eq(posts.authorId, userId),
    with: {
      categories: true,
      comments: true,
      likes: true,
    },
  });

  return userPosts;
};

export const createPost = async (postData: any) => {
  const validatedData = createPostSchema.parse(postData);

  const { categoryId, ...postWithoutCategoryId } = validatedData;

  const insertedPost = await db
    .insert(posts)
    .values(postWithoutCategoryId)
    .returning();

  await db
    .insert(postCategories)
    .values({
      postId: insertedPost[0].id,
      categoryId,
    })
    .returning();

  return insertedPost;
};

export const updatePost = async (id: string, postData: any) => {
  const validatedData = createPostSchema.parse(postData);
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
