import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import "./register.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const isFormValid = email && password && username;

  const { registerUser } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await registerUser(username, email, password);
      } catch (error) {
        console.error("Error al registrar:", error.message);
      }
    }
  };

  return (
    <div className="bg-Login flex justify-center items-center h-screen">
      <div className="relative w-[30%] justify-center flex flex-col h-[60vh] border border-[#f7f7f752] rounded-[10px]">
        {/* Fondo con desenfoque */}
        <div className="absolute inset-0 bg-[#ffffff] bg-opacity-[0.05] backdrop-blur-[2px]"></div>

        {/* Contenido que estará encima */}
        <div className="relative h-full gap-[10px] flex flex-col justify-center items-center">
          <h1 className="textOpenSans font-bold text-white text-3xl">
            Registrarse
          </h1>



          <form
            onSubmit={handleSubmit}
            className="form w-[90%] gap-[40px] flex flex-col items-center"
          >
            <div className="input-container flex flex-col mt-[50px]">
              <div className="input-s">
                <input
                  className="p-2 rounded-[20px]"
                  type="text"
                  required
                  minLength="3"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <label className="textGabaritoRegular">Nombre de Usuario</label>
              </div>

              <div className="input-s mt-[50px]">
                <input
                  className="p-2 rounded-[20px]"
                  type="email"
                  required
                  minLength="4"
                  value={email}
                  onChange={handleEmailChange}
                />
                <label className="textGabaritoRegular">Email</label>
              </div>

              <div className="input-s mt-[50px]">
                <input
                  className="p-2 rounded-[20px]"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  minLength="3"
                />
                <label className="textGabaritoRegular">Contraseña</label>
              </div>
            </div>

            <button
              className="textGabaritoRegular mt-6 text-white btn tex w-[50%] h-[40px] rounded-[20px] bg-[#FF6B00]"
              type="submit"
            >
              Registrarse
            </button>
          </form>

          <div className="w-full flex justify-center items-center flex-row gap-1 mt-3">
            <p className="textOpenSansRegular text-white text-[13px]">
              ¿Ya tienes una cuenta?
            </p>
            <p className="textOpenSansRegular text-[#FF6B00] text-[13px]">
              <Link to="/login">Iniciar Sesión</Link>
            </p>
          </div>

          

        </div>
        </div>
      
    </div>
  );
}
