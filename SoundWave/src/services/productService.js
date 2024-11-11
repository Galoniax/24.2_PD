import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const fetchProducts = async () => {
    try {
        const response = await axiosInterceptor.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos", error);
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axiosInterceptor.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos", error);
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axiosInterceptor.post("/products", product);
        return response.data;
    } catch (error) {
        console.error("Error al crear productos", error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axiosInterceptor.put(`/products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar productos", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axiosInterceptor.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar productos", error);
        throw error;
    }
};

