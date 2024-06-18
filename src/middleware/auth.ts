import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { secretKey } from "../../secret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for token in headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    // Attach the decoded token payload to the request object
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid token" });
  }
};
