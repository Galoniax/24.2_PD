import { Router } from "express";
import { ReviewController } from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.get("/", ReviewController.getAll);
reviewRouter.post("/create", ReviewController.createReview);
reviewRouter.put("/update/:id", ReviewController.updateReview);
reviewRouter.delete("/delete/:id", ReviewController.deleteReview);

export { reviewRouter };