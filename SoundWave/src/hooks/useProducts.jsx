import { fetchProducts, fetchProductById } from "../services/productService";

export const useProducts = () => {
    return {
        fetchProducts,
        fetchProductById,
    }
};
