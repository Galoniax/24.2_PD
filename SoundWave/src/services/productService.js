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
    const productFound = await fetchProductById(id);

    if (!productFound) {
      throw new error("El producto no existe");
    } else {
      const productEdited = {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
      };

      product = productEdited;

      const response = await axiosInterceptor.put(`/products/${id}`, product);
      return response.data;
    }
  } catch (error) {
    console.error("Error al actualizar productos", error);
    throw error;
  }
};

export const deleteProduct = async (productid) => {
  try {
    const productFound = await fetchProductById(productid);

    if (!productFound) {
      throw new error("El producto no existe");
    }

    const response = await axiosInterceptor.delete(`/products/${productid}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar productos", error);
    throw error;
  }
};
