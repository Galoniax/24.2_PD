import { axiosInterceptor } from "../interceptor/axios-interceptor";
import { toast } from "react-toastify";

export const fetchCategories = async () => {
  try {
    const response = await axiosInterceptor.get("/api/v1/categories/");

    if (response.status === 404) {
      throw new Error("No se encontraron categorias");
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
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
};

export const createCategory = async (name, subcategories) => {
  try {
    const response = await axiosInterceptor.post(
      "/api/v1/categories/create", {
        name,
        subcategories
      }
    );

    if (response.status === 201) {
      toast.success(response.data.message || "Categoria creada con exito");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
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

export const deleteCategory = async (category) => {
  try {
    const response = await axiosInterceptor.delete(`/api/v1/categories/delete/${category.id}`);

    if (response.status === 200) {
      toast.success(response.data.message || "Categoria eliminada con exito");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
    console.error("Error al eliminar categorias", error);
    throw error;
  }
};
