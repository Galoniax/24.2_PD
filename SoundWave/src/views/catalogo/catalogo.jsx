import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Filter from "../../components/filter/Filter";
import ProductList from "../../components/ProductList";
import { useProducts } from "../../hooks/useProducts";

export function Catalogo() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const { fetchProducts } = useProducts();

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      toast.error("Debes iniciar sesión para acceder al catálogo.");
    }
    fetchData();
  }, []);

  // Función para manejar el cambio de filtro
  const handleFilterChange = (categoryId, subcategoryId, searchTerm) => {
    let filtered = products;

    if (categoryId) {
      filtered = filtered.filter((product) => product.categoryId == categoryId);
    }

    if (subcategoryId) {
      filtered = filtered.filter(
        (product) => product.subcategoryId == subcategoryId
      );
    }

    if (searchTerm) {
      const normalizedSearchTerm = searchTerm
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      filtered = filtered.filter((product) =>
        product.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(normalizedSearchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return isLoggedIn ? (
    <div className="bg-[#f5f5f5] min-h-[100vh]">
      <div className="catalogo pt-[150px] w-full flex justify-center p-[50px]">
        <div className="catalogo__content w-[35%]">
          <Filter onFilterChange={handleFilterChange} products={products} />
        </div>
        <div className="catalogo__product w-[65%]">
          <h1 className="textRedHatDisplayMedium font-bold">
            Bienvenido {user.username}
          </h1>
          <ProductList products={filteredProducts} onChange={fetchData} />
        </div>
      </div>
    </div>
  ) : (
    (toast.error("Debes iniciar sesion"), navigate("/login"))
  );
}
