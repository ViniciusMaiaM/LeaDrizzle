import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { secretKey } from "../../secret";
import { getUserById } from "../services/userService";

export const authMiddleware = (requireAdmin = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Authorization header not found" });
    }

    // Check for token in headers
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, secretKey) as { id: string; email: string };
      const user = await getUserById(decoded.id);

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
      }

      // Attach the user to the request object
      (req as any).user = user;

      if (requireAdmin && user.role !== "ADMIN") {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden: Admins only" });
      }
      next();
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" });
    }
  };
};
