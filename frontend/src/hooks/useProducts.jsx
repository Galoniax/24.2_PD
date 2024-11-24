import { fetchProducts, fetchProductById, deleteProduct, updateProduct, createProduct } from "../services/productService";

export const useProducts = () => {
    return {
        fetchProducts,
        fetchProductById,
        deleteProduct,
        updateProduct,
        createProduct
    }
};
