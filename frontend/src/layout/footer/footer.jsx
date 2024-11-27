import React from "react";

import {
  faYoutube,
  faTwitter,
  faTelegram,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#000000] border-[1px] border-[#535353] h-[100%] text-white text-[14px] w-full  py-8 ">
      <div className=" flex justify-between px-10">
        <div className="flex flex-col justify-evenly indent-2 gap-3 w-[25%]">
          <h3 className="textRedHatDisplayRegular text-[#838387] font-semibold indent-0">
            Contacto
          </h3>
          <p className="textRedHatDisplayRegular">
            Dirección: Capital Federal, Av. Libertador 123
          </p>
          <p className="textRedHatDisplayRegular">Teléfono: +54 1234-5678</p>
          <p className="textRedHatDisplayRegular">
            Correo electrónico: SoundWave@rrhh.com
          </p>
          <p className="textRedHatDisplayRegular">
            Horario de atención: Lunes a Viernes de 9:00 a 18:00
          </p>

          <div className=" flex justify-evenly rounded-xl mt-5 px-5">
            <FontAwesomeIcon
              className="border-[1px] border-[#53535360] rounded-xl p-2 hover:text-[#000000] hover:bg-white cursor-pointer"
              icon={faYoutube}
            />
            <FontAwesomeIcon
              className="border-[1px] border-[#53535360] rounded-xl p-2 hover:text-[#000000] hover:bg-white cursor-pointer"
              icon={faTwitter}
            />
            <FontAwesomeIcon
              className="border-[1px] border-[#53535360] rounded-xl p-2 hover:text-[#000000] hover:bg-white cursor-pointer"
              icon={faTelegram}
            />
            <FontAwesomeIcon
              className="border-[1px] border-[#53535360] rounded-xl p-2 hover:text-[#000000] hover:bg-white cursor-pointer"
              icon={faWhatsapp}
            />
            <FontAwesomeIcon
              className="border-[1px] border-[#53535360] rounded-xl p-2 hover:text-[#000000] hover:bg-white cursor-pointer"
              icon={faInstagram}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-[25%]">
          <h3 className="textRedHatDisplayRegular text-[#838387] font-semibold">
            Cuenta
          </h3>
          <Link
            to="/login"
            className="textRedHatDisplayRegular indent-2 hover:text-[#F7A22F]"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="textRedHatDisplayRegular indent-2 hover:text-[#F7A22F]"
          >
            Registrarse
          </Link>
        </div>

        <div className="flex flex-col gap-3 indent-2 w-[25%]">
          <h3 className="textRedHatDisplayRegular text-[#838387] font-semibold indent-0">
            Información
          </h3>
          <p className="textRedHatDisplayRegular">Acerca de SoundWave</p>
          <p className="textRedHatDisplayRegular">Preguntas frecuentes</p>
          <p className="textRedHatDisplayRegular">Términos y condiciones</p>
          <p className="textRedHatDisplayRegular">Política de privacidad</p>
        </div>
      </div>
      <div className="flex justify-end pt-4 px-5 mt-7 border-t-[1px] border-[#535353]">
        <p className="textRedHatDisplayRegular text-[#838387] text-[12px] hover:text-[#eeeeee]">
          © {new Date().getFullYear()} SoundWave. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
