import { fetchAllCategories } from "../services/categoryService";


export const useCategory = () => {
    return {
        fetchAllCategories
    };
};