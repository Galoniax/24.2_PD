import { Router } from "express";
import { PucharseController } from "../controllers/pucharseController.js";

const pucharseRouter = Router();

pucharseRouter.get("/", PucharseController.getAllPurchases);
pucharseRouter.post("/create", PucharseController.createPurchase);

export { pucharseRouter };