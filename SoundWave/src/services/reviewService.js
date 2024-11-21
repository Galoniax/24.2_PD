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
        // Obtener la última reseña para calcular el próximo id (solo si no puedes evitarlo)
        const reviewResponse = await axiosInterceptor.get("/reviews");
        
        // Obtener los datos de la reseña e id
        const reviews = reviewResponse.data;
        const id = reviews.length + 1;
       
        // Asignar el id al review
        review.id = id;

        // Hacer la solicitud para crear la nueva reseña
        const response = await axiosInterceptor.post("/reviews", review);

        // Devolver los datos de la respuesta
        return response.data;
    } catch (error) {
        console.error("Error al crear review", error);
        // Podrías lanzar un error más específico o un mensaje de usuario
        throw new Error("No se pudo crear la reseña. Intenta nuevamente.");
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