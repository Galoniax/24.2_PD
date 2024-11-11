import { fetchAllCategories } from "../services/categoryService";


export const useCategory = () => {
    const fetchCategories = async () => {
        try {
            const response = await fetchAllCategories();
            return response;
        } catch (error) {
            console.error("Error al obtener categorias", error);
            throw error;
        }
    }
    return { fetchCategories }
};