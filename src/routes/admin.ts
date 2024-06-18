import { Router } from "express";
import {
  getAllUsers,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const adminRoutes = Router();

adminRoutes.use(authMiddleware(true));

adminRoutes.get("/", getAllUsers);

export default adminRoutes;
