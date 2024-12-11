import React from "react";
import { useState } from "react";

const UserModal = ({ onClose, user, onCreate }) => {
  if (!onClose) return null;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#222222] p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">
            Información de usuario
          </h2>
          <button
            onClick={onClose}
            className="text-white border-[1px] border-[#F7A22F] border-dashed rounded-[4px] px-4 py-1"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-8">
          <p className="text-white text-[13px] mb-5 border-[#f7f7f7] border-[1px] py-2 ps-2 rounded-[5px]">
            Email: {user.email}
          </p>
          <p className="text-white text-[13px] border-[#f7f7f7] border-[1px] rounded-[5px] py-2 ps-2  mb-5">
            Nombre: {user.username}
          </p>
          <p className="text-white text-[13px] border-[#f7f7f7] border-[1px] rounded-[5px] py-2 ps-2  mb-5">
            Rol: {user.role}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-white text-lg font-semibold">Agregar perfil</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const user = {
                username,
                email,
                role,
                password,
              };

              onCreate(user);
              onClose();
            }}
          >
            <div className="mt-4">
              <label className="text-white text-[13px] mb-2">Username:</label>
              <input
                type="text"
                required
                value={username}
                placeholder="Ingrese el nombre de usuario a crear"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-[#ffffff] text-[14px] px-1 py-2 rounded-sm border mt-2 mb-5 bg-[#222222]"
              />
              <label className="text-white text-[13px] mb-2">Email:</label>
              <input
                type="email"
                required
                value={email}
                placeholder="Ingrese el email a crear"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[14px] text-[#ffffff] px-1 py-2 rounded-sm border bg-[#222222] mt-2 mb-5"
              />

              <label className="text-white text-[13px] mb-2">Rol:</label>
              <select
                value={role}
                required
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-[14px] text-[#a5a5a5] px-1 py-2 rounded-sm border bg-[#222222] mt-2 mb-5"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <label className="text-white text-[13px]">Contraseña:</label>
              <input
                type="password"
                required
                value={password}
                placeholder="Ingrese la contraseña a crear"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-[14px] text-[#ffffff] px-1 py-2 rounded-sm border bg-[#222222] mt-2"
              />

              <button
                type="submit"
                className="mt-8 w-full border-[1px] border-[#F7A22F] bg-[#F7A22F] text-white text-[14px] px-4 py-2 hover:border-[1px] hover:border-[#ffffff]"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
