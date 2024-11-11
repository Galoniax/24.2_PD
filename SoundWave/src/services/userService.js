import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const getUsers = async () => {
  try {
    const response = await axiosInterceptor.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    throw error;
  }
};
