import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";
import { ROUTES } from "../constants/constants";
import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsAuthenticated(true);
      
      if (decodedToken.exp < Date.now() / 1000) {
        logout();
      }
    } else {
      toast.error("Debes iniciar sesion");
      navigate(ROUTES.LOGIN);
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
      if (error.response && (error.response.status === 500 || error.response.status === 401)) {
        toast.error(error.response.data.message || "Error interno del servidor");
      }
      console.error("Error en login:", error.message);
      throw error;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const response = await register(username, email, password);

      if (response.status === 201) {
        toast.success(response.data.message || "Registro exitoso");
        navigate(ROUTES.LOGIN);
      } 
  
      return response;
    } catch (error) {
      console.error("Error en registro:", error.message);
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
        isAuthenticated,
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
