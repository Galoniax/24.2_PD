import { axiosInterceptor } from "../interceptor/axios-interceptor";
import { toast } from "react-toastify";

export const fetchUsers = async () => {
  try {
    const response = await axiosInterceptor.get("/api/v1/users/");

    if (response.status === 404) {
      throw new Error("No se encontraron usuarios");
    }
    return response.data;
  } catch (error) {
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
    console.error("Error al obtener usuarios", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axiosInterceptor.post("/api/v1/users/create", user);

    if (response.status === 201) {
      toast.success(response.data.message || "Usuario creado con exito");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
    console.error("Error al crear usuarios", error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axiosInterceptor.put(`/api/v1/users/${id}`, user);

    if (response.status === 404) {
      toast.error(response.data.message || "El usuario no existe");
    } else if (response.status === 200) {
      toast.success(response.data.message || "Usuario actualizado con exito");
    }
    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
    console.error("Error al actualizar usuarios", error);
    throw error;
  }
};

export const deleteUser = async (user) => {
  try {
    const response = await axiosInterceptor.delete(`/api/v1/users/delete/${user.id}`);

    if (response.status === 200) {
      toast.success(response.data.message || "Usuario eliminado con exito");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error(error.response.data?.message || "Error interno del servidor");
    }
    console.error("Error al eliminar usuarios", error);
    throw error;
  }
};
