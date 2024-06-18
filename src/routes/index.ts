import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import loginRoutes from "./loginRoutes";
import adminRoutes from "./admin";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/posts", postRoutes);
routes.use("/login", loginRoutes);
routes.use("/admin", adminRoutes);

export { routes };
