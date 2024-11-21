import { fetchProducts, fetchProductById, deleteProduct, updateProduct } from "../services/productService";

export const useProducts = () => {
    return {
        fetchProducts,
        fetchProductById,
        deleteProduct,
        updateProduct
    }
};
