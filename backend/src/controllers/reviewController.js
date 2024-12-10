import { ReviewService } from "../services/reviewService.js";

export class ReviewController {
    static async getAll(req, res) {
        try {
            const reviews = await ReviewService.getAll();
            res.status(200).json(reviews);
        } catch (error) {
            console.error("Error al obtener las reviews:", error);
            res.status(500).json({ message: error.message });
        }
    }

    static async createReview(req, res) {
        try {
            const review = req.body;
            const newReview = await ReviewService.create({ review });

            res.status(201).json(newReview);
        } catch (error) {
            console.error("Error al crear la review:", error);
            res.status(500).json({ message: error.message });
        }
    }

    static async updateReview(req, res) {
        const { id } = req.params;
        try {
            const review = req.body;
            const updatedReview = await ReviewService.update({ id, review });

            res.status(200).json(updatedReview);
        } catch (error) {
            console.error("Error al actualizar la review:", error);
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteReview(req, res) {
        try {
            const { id } = req.params;
            const deletedReview = await ReviewService.delete({ id });

            res.status(200).json(deletedReview);
        } catch (error) {
            console.error("Error al eliminar la review:", error);
            res.status(500).json({ message: error.message });
        }
    }
}
