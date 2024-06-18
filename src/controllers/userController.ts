import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as userService from "../services/userService";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserPosts(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User already exists") {
        res.status(StatusCodes.CONFLICT).json({ error: error.message });
      }
    } else {
      next(error);
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await userService.updateUser(id, userData);
    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
