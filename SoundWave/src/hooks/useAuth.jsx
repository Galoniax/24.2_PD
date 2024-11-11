import { createContext, useContext, useState } from "react";
import axios from "axios"; // Importa axios para hacer las peticiones
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      const response = await axios.get("http://localhost:3001/users"); // Ruta a `db.json`
      const users = response.data;

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setIsLoggedIn(false);
        toast.error("Credenciales incorrectas");
        return false;
      }

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

      setTimeout(() => {
        navigate("/");
      }, 600);

      return true;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      toast.error("Error al iniciar sesión");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    toast.success("Has cerrado sesión");

    setTimeout(() => {
      navigate("/login");
    }, 600);
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;
  
      // Asegúrate de que el correo se compare en minúsculas, en caso de variaciones
      const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
  
      if (existingUser) {
        toast.error("Cuenta existente");
        return null;
      } else {
        const id = users.length + 1; // Incrementa el ID para el nuevo usuario
        const newUser = { id, username, email, password, role: "user" };
  
        const postResponse = await axios.post("http://localhost:3001/users", newUser);
        toast.success("Has registrado tu cuenta");
        return postResponse.data;
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      toast.error("Error al registrar tu cuenta");
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
