import { axiosInterceptor } from "../interceptor/axios-interceptor";


export const fetchAllCategories = async () => {
    try {
        const response = await axiosInterceptor.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorias", error);
        throw error;
    }
};

export const fetchCategoryById = async (id) => {
    try {
        const response = await axiosInterceptor.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorias", error);
        throw error;
    }
}

export const createCategory = async (category) => {
    try {
        const response = await axiosInterceptor.post("/categories", category);
        return response.data;
    } catch (error) {
        console.error("Error al crear categorias", error);
        throw error;
    }
};

export const updateCategory = async (id, category) => {
    try {
        const response = await axiosInterceptor.put(`/categories/${id}`, category);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar categorias", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axiosInterceptor.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar categorias", error);
        throw error;
    }
};

