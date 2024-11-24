import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginAsync, registerAsync,  } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const foundUser = await loginAsync(email, password);

      setIsLoggedIn(true);
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      });

      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(foundUser));

      toast.success("Has iniciado sesión");

      navigate("/");

      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      toast.error(error.message || "Error al iniciar sesión");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    toast.success("Has cerrado sesión");
    navigate("/login");
  };

  const register = async (username, email, password) => {
    try {
      const newUser = await registerAsync(username, email, password);
      toast.success("Registro exitoso");
      return newUser;
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      toast.error(error.message || "Error al registrar usuario");
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
