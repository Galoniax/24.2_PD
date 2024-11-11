import { fetchAllReviews, fetchReviewsByProductId } from "../services/reviewService";

export const useReviews = () => {
    return {
        fetchAllReviews,
        fetchReviewsByProductId
    }

};