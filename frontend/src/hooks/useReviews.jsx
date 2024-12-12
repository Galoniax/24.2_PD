import { fetchReviews } from "../services/reviewService";

import { useEffect, useState } from "react";

export const useReviews = () => {
    const [reviewsData, setReviews] = useState([]);

    const fetchReviewsData = async () => {
        try {
            const reviewsData = await fetchReviews();
            setReviews(reviewsData);
        } catch (error) {
            console.error("Error al obtener reviews:", error);
        }

       
    };
    const addReview = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
    };

    const removeReview = (reviewId) => {
        setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    };

    useEffect(() => {
        fetchReviewsData();
    }, []);

    return { reviewsData, addReview, removeReview };
};