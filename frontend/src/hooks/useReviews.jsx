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

    useEffect(() => {
        fetchReviewsData();
    }, []);

    return { reviewsData, addReview };
};