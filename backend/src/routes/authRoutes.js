import { AuthController } from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.get("/profile", AuthController.profile);

export { authRouter };