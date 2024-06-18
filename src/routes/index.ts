import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import loginRoutes from "./loginRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/posts", postRoutes);
routes.use("/login", loginRoutes);

export { routes };
