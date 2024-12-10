import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Importa el hook de autenticación actualizado
import "./login.css";


export function Login() {
  const { authenticate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email && password;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await authenticate(email, password);
      } catch (error) {
        console.error("Error en login:", error.message);
      }
    }
  };

  return (
    <div className="bg-Login flex justify-center items-center h-screen">
      <div className="relative w-[30%] justify-center flex flex-col h-[50vh] border border-[#f7f7f752] rounded-[10px]">
        {/* Fondo con desenfoque */}
        <div className="absolute inset-0 bg-[#ffffff] bg-opacity-[0.05] backdrop-blur-[2px]"></div>

        {/* Contenido que estará encima */}
        <div className="relative z-10 h-full gap-[10px] flex flex-col justify-center items-center">
          <h1 className="textOpenSans font-bold text-white text-3xl">
            Iniciar Sesión
          </h1>

          <form
            onSubmit={handleSubmit}
            className="form w-[90%] gap-[40px] flex flex-col items-center"
          >
            <div className="input-container flex flex-col mt-[50px]">
              <div className="input-s">
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
              {/*
              <div className="flex items-center gap-3 mt-5 ">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="textGabaritoRegular text-[14px] text-white"
                >
                  Recuérdame
                </label>
              </div>
              */}
            </div>
            <button
              className="textGabaritoRegular text-white btn tex w-[65%] h-[40px] rounded-[20px] bg-[#FF6B00]"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="w-full flex justify-center items-center flex-row gap-1 mt-3">
            <p className="textOpenSansRegular text-white text-[13px]">
              ¿No tienes una cuenta?
            </p>
            <p className="textOpenSansRegular text-[#FF6B00] text-[13px]">
              <Link to="/register">Registrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
