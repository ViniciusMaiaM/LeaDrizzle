import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as authService from "../services/authService";


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }
    res.status(StatusCodes.OK).json(token);
  } catch (error) {
    next(error);
  }
};