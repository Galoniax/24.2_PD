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

    useEffect(() => {
        fetchReviewsData();
    }, []);

    return { reviewsData };
};