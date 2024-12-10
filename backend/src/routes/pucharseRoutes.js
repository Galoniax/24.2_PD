import { Router } from "express";
import { PucharseController } from "../controllers/pucharseController.js";

const pucharseRouter = Router();

pucharseRouter.get("/:id", PucharseController.getAllById);
pucharseRouter.post("/create", PucharseController.createPurchase);

export { pucharseRouter };