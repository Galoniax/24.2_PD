import { react, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./catalogo.css";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Filter from "../../components/filter/Filter";
import ProductList from "../../components/ProductList"; // Importa el componente ProductList

export function Catalogo() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered);
  };

  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  return isLoggedIn ? (
    <div className="bg-[#f5f5f5] min-h-[100vh]">
      <div className="catalogo pt-[150px] w-full flex justify-center p-[50px]">
        <div className="catalogo__content w-[35%]">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className="catalogo__product w-[65%]">
          <h1 className="textRedHatDisplayMedium font-bold">
            Bienvenido {user.username}
          </h1>

          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  ) : (
    (toast.error("Debes iniciar sesion"), navigate("/login"))
  );
}
