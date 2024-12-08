import { Router } from "express";
import { ProductController } from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getById);
productRouter.post("/create", ProductController.create);
productRouter.put("/update/:id", ProductController.update);
productRouter.delete("/delete/:id", ProductController.delete);

export { productRouter };