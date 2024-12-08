import { Router } from "express";
import { CategoryController } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.post("/create", CategoryController.create);
categoryRouter.put("/update/:id", CategoryController.update);
categoryRouter.delete("/delete/:id", CategoryController.delete);

export { categoryRouter };