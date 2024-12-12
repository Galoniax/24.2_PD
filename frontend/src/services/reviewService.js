import { axiosInterceptor } from "../interceptor/axios-interceptor";
import { toast } from "react-toastify";

export const fetchReviews = async () => {
    try {
        const response = await axiosInterceptor.get("/api/v1/reviews/");

        if (response.status === 404) {
            throw new Error("No se encontraron reviews");
        }

        return response.data;
    } catch (error) {
        if (error.response.status === 500 && error.response) {
            toast.error(error.response.data.message || "Error interno del servidor");
        }
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
        const response = await axiosInterceptor.post("/api/v1/reviews/create", review);

        if (response.status === 201) {
            toast.success(response.data.message || "Reseña creada con exito");
        }

        return response.data;
    } catch (error) {
        console.error("Error al crear review", error);
        
        const errorMessage = error.response?.data?.message || "Error interno del servidor";
        toast.error(errorMessage);
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

export const deleteReview = async (review) => {
    try {
        const response = await axiosInterceptor.delete(`/api/v1/reviews/delete/${review.id}`);

        if (response.status === 200) {
            toast.success(response.data.message || "Reseña eliminada con exito");
        }

        return response.data;
    } catch (error) {
        console.error("Error al eliminar review", error);

        const errorMessage = error.response?.data?.message || "Error interno del servidor";
        toast.error(errorMessage);
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