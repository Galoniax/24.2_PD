import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";
import { ROUTES } from "../constants/constants";
import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      
      if (decodedToken.exp < Date.now() / 1000) {
        logout();
      }
    }
  }, []);

  const authenticate = async (email, password) => {
    try {
      const response = await login(email, password);
      const token = response.token;

      if (!token) {
        throw new Error("Token no proporcionado en la respuesta del servidor");
      }

      const decodedToken = jwtDecode(token);

      localStorage.setItem("token", token);

      setUser(decodedToken);

      if (decodedToken.role) {
        navigate(ROUTES.HOME);
      }

      return response;
    } catch (error) {
      console.error("Error en login:", error.message);

      // Mostrar un toast con el mensaje de error
      toast.error(error.message || "Error al iniciar sesión");

      throw error;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const response = await register(username, email, password);

      navigate(ROUTES.LOGIN);

      return response;
    } catch (error) {
      console.error("Error en registro:", error.message);

      // Mostrar un toast con el mensaje de error
      toast.error(error.message || "Error en el registro");

      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    toast.success("Has cerrado sesión");
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        registerUser,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
