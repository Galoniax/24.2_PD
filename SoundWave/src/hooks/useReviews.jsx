import { fetchAllReviews, fetchReviewsByProductId, createReview } from "../services/reviewService";

export const useReviews = () => {
    return {
        fetchAllReviews,
        fetchReviewsByProductId,
        createReview
    }

};