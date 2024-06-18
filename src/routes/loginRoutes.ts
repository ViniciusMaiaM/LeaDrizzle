import { login } from "../controllers/authController";
import { Router } from "express";


const loginRoutes = Router();

loginRoutes.post("/", login);

export default loginRoutes;
