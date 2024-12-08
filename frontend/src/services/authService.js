import { toast } from "react-toastify";
import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const login = async (email, password) => {
  try {
    const response = await axiosInterceptor.post("/api/v1/auth/login", { email, password });

    if (response.status === 401) {
      toast.error("El email o la contraseña son incorrectos");
    }
    else if (response.status === 200) {
      toast.success("Login exitoso");
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
    console.error("Error en login:", error.message);
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
      toast.success("Registro exitoso. Por favor inicie sesión");
    } 

    return response.data;
  } catch (error) {
    if (error.response.status === 409 && error.response) {
      toast.error(error.response.data.message || "El email ya está registrado");
    }
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    } else {
      toast.error("Error en el registro. Intenta nuevamente");
    }
    console.error("Error en registro:", error.message);
    throw error;
  }
};
