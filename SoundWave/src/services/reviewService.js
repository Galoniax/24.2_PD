import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const fetchAllReviews = async () => {
    try {
        const response = await axiosInterceptor.get("/reviews");
        return response.data;
    } catch (error) {
        console.error("Error al obtener reviews", error);
        throw error;
    }
};

export const fetchReviewById = async (id) => {
    try {
        const response = await axiosInterceptor.get(`/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener review", error);
        throw error;
    }
};

export const createReview = async (review) => {
    try {
        const response = await axiosInterceptor.post("/reviews", review);
        return response.data;
    } catch (error) {
        console.error("Error al crear review", error);
        throw error;
    }
};

export const updateReview = async (id, review) => {
    try {
        const response = await axiosInterceptor.put(`/reviews/${id}`, review);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar review", error);
        throw error;
    }
};  

export const deleteReview = async (id) => {
    try {
        const response = await axiosInterceptor.delete(`/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar review", error);
        throw error;
    }
};


export const fetchReviewsByProductId = async (productId) => {
    try {
        const response = await axiosInterceptor.get(`/reviews/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener reviews por producto", error);
        throw error;
    }
}