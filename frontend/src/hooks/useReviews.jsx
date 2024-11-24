import { fetchAllReviews, fetchReviewsByProductId, createReview, deleteReview } from "../services/reviewService";

export const useReviews = () => {
    return {
        fetchAllReviews,
        fetchReviewsByProductId,
        createReview,
        deleteReview
    }

};