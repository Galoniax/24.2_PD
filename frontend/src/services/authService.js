import { axiosInterceptor } from "../interceptor/axios-interceptor";
import { toast } from "react-toastify";

export const login = async (email, password) => {
  try {
    const response = await axiosInterceptor.post("/api/v1/auth/login", { email, password });

    if (response.status === 401) {
      toast.error(response.data.message || "Credenciales incorrectas");
    }
    else if (response.status === 200) {
      toast.success("Inicio de sesión exitoso" || response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("Error en login:", error.message);
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axiosInterceptor.post("/api/v1/auth/register", {
      username,
      email,
      password,
    });

    if (response.status === 201) {
      toast.success(response.data.message || "Registro exitoso");
    }

    if (response.status === 409) {
      toast.error(response.data.message || "El email ya esta registrado");
    }

    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.message);
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
    throw error;
  }
};
