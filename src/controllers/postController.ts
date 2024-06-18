import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as postService from "../services/postService";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await postService.getAllPosts();
    res.status(StatusCodes.OK).json(allPosts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    if (!post.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Post not found" });
    }
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const post = await postService.getPostByUserId(userId);
    if (!post.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Post not found" });
    }
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postData = req.body;
    const newPost = await postService.createPost(postData);
    res.status(StatusCodes.CREATED).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      next(new Error("Unknown error"));
    }
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const postData = req.body;
    const updatedPost = await postService.updatePost(id, postData);
    if (!updatedPost.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Post not found" });
    }
    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await postService.deletePost(id);
    res.status(StatusCodes.OK).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentData = req.body;
    const newComment = await postService.addComment(commentData);
    res.status(StatusCodes.CREATED).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const addLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const likeData = req.body;
    const newLike = await postService.addLike(likeData);
    res.status(StatusCodes.CREATED).json(newLike[0]);
  } catch (error) {
    next(error);
  }
};
