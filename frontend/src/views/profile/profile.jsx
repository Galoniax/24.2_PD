import React, { useState, useEffect } from "react";
import "./profile.css";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/userService";

import { ROUTES } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { usePucharses } from "../../hooks/usePucharses";

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { pucharseData } = usePucharses(user);

  const handleDeleteAccount = async (user) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta?"
    );

    if (confirmDelete) {
      try {
        await deleteUser(user);
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    }
  };

  useEffect(() => {
    if (user === null) {
      navigate(ROUTES.LOGIN);
      toast.error("Debes iniciar sesión");
    }
  }, [user, pucharseData]);

  return user ? (
    <div className="bg-[#f5f5f5] min-h-[115vh]">
      <div className="pt-[200px] flex justify-center w-[80%] m-auto h-[50vh] gap-10">
        <div className="w-[30%] relative bg-Profile rounded-3xl"></div>
        <div className="w-[70%]">
          <h1 className="textRedHatDisplay text-[13px] font-bold text-[#979797]">
            Mi Perfil
          </h1>
          <h1 className="textRedHatDisplay text-[28px] font-bold text-[#2c2c2c]">
            {user.username}
          </h1>
          <p className="textRedHatDisplay text-[15px] pt-3 text-[#979797] max-w-[700px] indent-8 leading-[30px]">
            ¡Bienvenido a tu perfil, {user.username}! Aquí encontrarás toda la
            información relacionada con tu cuenta. Puedes personalizar y
            gestionar tus datos de forma sencilla y segura. Esta es tu área
            personal, diseñada para ofrecerte una experiencia única y adaptada a
            tus necesidades.
          </p>

          <button
            className="textRedHatDisplay text-[13px] font-bold text-[#db3535] mt-8 ms-5  hover:text-[#ffffff] hover:bg-[#e93d3d] border-[2px] border-[#e93d3d] py-2 px-5 rounded-3xl"
            onClick={() => handleDeleteAccount(user)}
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>

      <div className="m-auto">
      <div className="flex justify-start mt-[100px] ms-[10%] pb-3 border-b-[1px] max-w-[79%] border-[#e0e0e0] mb-[10px]">
        <h1 className="textRedHatDisplay text-[28px] font-bold text-[#2c2c2c]">
          Mis Compras
        </h1>
      </div>

      {pucharseData.length > 0 && (
        <div className="overflow-y-auto max-h-[300px] max-w-[80%] m-auto">
        <table className="w-full m-auto mt-10 bg-[#ffffff]">
          <thead className="sticky top-0 bg-[#292929]">
            <tr className="textNunitoSansLight text-[13px] text-[#e0e0e0]">
              <th className="text-start ps-5 py-5">ID</th>
              <th className="text-start ps-5 py-5">Producto</th>
              <th className="text-start ps-5 py-5">Cantidad</th>
              <th className="text-start ps-5 py-5">Precio</th>
              <th className="text-start ps-5 py-5">Fecha de compra</th>
            </tr>
          </thead>
          <tbody>
          
          {pucharseData.map((pucharse) => (
              <tr className="textNunitoSansLight text-[13px] text-[#383838] border-b-[1px]" key={pucharse.id}>
                <td className="text-start ps-5 py-4">{pucharse.id}</td>
                <td>
                  {pucharse.products.map((product) => (
                    <span key={product.product.id}>{product.product.name}</span>
                  ))}
                </td>
                <td>
                  {pucharse.products.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>
                <td>{pucharse.totalPrice}</td>
                <td>{new Date(pucharse.createdAt).toLocaleDateString().split('/').reverse().join('-')} {new Date(pucharse.createdAt).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      )}
      </div>
    </div>
  ) : null;
}
