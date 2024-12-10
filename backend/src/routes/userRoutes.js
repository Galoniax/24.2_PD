import { UserController } from "../controllers/userController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", UserController.getAll);
userRouter.post("/create", UserController.create);
userRouter.put("/update/:id", UserController.update);
userRouter.delete("/delete/:id", UserController.delete);

export { userRouter };