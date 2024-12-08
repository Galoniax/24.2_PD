import { toast } from "react-toastify";
import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const fetchProducts = async () => {
  try {
    const response = await axiosInterceptor.get("/api/v1/products/");

    if (response.status === 404) {
      throw new Error("No se encontraron productos");
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axiosInterceptor.get(`/api/v1/products/${id}`);

    if (response.status === 404) {
      throw new Error("El producto no existe");
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axiosInterceptor.post(
      "/api/v1/products/create",
      product
    );

    if (response.status === 201) {
      toast.success("Producto creado con exito");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
    console.error("Error al crear productos", error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const productEdited = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      stock: product.stock,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
    };

    const response = await axiosInterceptor.put(
      `/api/v1/products/update/${product.id}`,
      productEdited
    );

    if (response.status === 404) {
      toast.error("El producto no existe");
    } else if (response.status === 200) {
      toast.success("Producto actualizado con exito");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
    console.error("Error al actualizar productos", error);
    throw error;
  }
};

export const deleteProduct = async (product) => {
  try {
    const response = await axiosInterceptor.delete(
      `/api/v1/products/delete/${product.id}`
    );

    if (response.status === 404) {
      toast.error("El producto no existe");
    } else if (response.status === 200) {
      toast.success("Producto eliminado con exito");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
    console.error("Error al eliminar productos", error);
    throw error;
  }
};
