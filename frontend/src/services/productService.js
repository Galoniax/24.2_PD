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
    const responseGet = await axiosInterceptor.get("/products");
    const products = responseGet.data;
    const id = String(products.length + 1);

    product.id = id;

    // Enviar el producto creado
    const response = await axiosInterceptor.post("/products", product);
    return response.data;

  } catch (error) {
    console.error("Error al crear productos", error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const responseGet = await fetchProductById(product.id);

    if (!responseGet) {
      throw new Error("La categoría no existe");
    }

    const productEdited = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId
      
    };

    console.log("Producto actualizado:", productEdited);

    const response = await axiosInterceptor.put(`/products/${product.id}`, productEdited);
    return response.data;

  } catch (error) {
    console.error("Error al actualizar productos", error);
    throw error;
  }
};


export const deleteProduct = async (product) => {
  try {
    console.log("ID del producto a eliminar:", product.id);
    const productFound = await axiosInterceptor.get(`/products/${product.id}`);

    if (!productFound) {
      throw new error("El producto no existe");
    }

    const response = await axiosInterceptor.delete(`/products/${product.id}`);
    return response.data;

  } catch (error) {
    console.error("Error al eliminar productos", error);
    throw error;
  }
};
