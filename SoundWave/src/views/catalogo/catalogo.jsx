import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Filter from "../../components/filter/Filter";
import ProductList from "../../components/product/ProductList";
import { useProducts } from "../../hooks/useProducts";
import { useReviews } from "../../hooks/useReviews";

export function Catalogo() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productLimit, setProductLimit] = useState(10); // Estado para el límite de productos

  const navigate = useNavigate();

  const { isLoggedIn, user } = useAuth();
  const { fetchProducts } = useProducts();
  const { fetchAllReviews } = useReviews();

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      const reviewsData = await fetchAllReviews();
      setReviews(reviewsData);
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
  const handleFilterChange = (
    categoryId,
    subcategoryId,
    searchTerm,
    priceTerm
  ) => {
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
    if (priceTerm) {
      filtered = filtered.filter(
        (product) => Number(product.price) <= Number(priceTerm)
      );
    }

    setFilteredProducts(filtered);
  };

  const getProductCount = () => products.length;
  const handleLimitChange = (event) => {
    setProductLimit(event.target.value);
    setFilteredProducts(products.slice(0, Number(event.target.value)));
  };

  return isLoggedIn ? (
    <div className="bg-[#f5f5f5] min-h-[100vh]">
      <div className="catalogo pt-[150px] w-full flex justify-center p-[50px]">
        <div className="catalogo__content w-[25%]">
          <Filter onFilterChange={handleFilterChange} products={products} />
        </div>
        <div className="catalogo__product w-[75%]">
          <div className="flex justify-between mb-10">
            <div className="w-[50%]">
              <h1 className="textRedHatDisplay text-[#6b6b6b] text-[19px] font-bold">
                Bienvenido {user.username}
              </h1>
              <div className="flex gap-1 items-center">
                <p className="textRedHatDisplay text-[#b1b1b1] text-[15px]">
                  Mostrando{" "}
                </p>
                <p className="textRedHatDisplay text-[#6b6b6b] text-[15.5px] font-bold">
                  {filteredProducts.length}
                </p>
                <p className="textRedHatDisplay text-[#b1b1b1] text-[15px]">
                  productos, de un total de
                </p>
                <p className="textRedHatDisplay text-[#6b6b6b] text-[15.5px] font-bold">
                  {getProductCount()}
                </p>
                <p className="textRedHatDisplay text-[#b1b1b1] text-[15px]">
                  productos.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end w-[50%] gap-2">
              <p className="textRedHatDisplay text-[#919191] text-[15px]">
                Mostrando{" "}
              </p>
              <select
                className="px-2 h-8 border border-gray-300 rounded-md text-[14px] text-[#7a7a7a]"
                value={productLimit}
                onChange={handleLimitChange}
              >
                <option value="5">5 productos</option>
                <option value="10">10 productos</option>
                <option value="20">20 productos</option>
              </select>
            </div>
          </div>

          <ProductList
            products={filteredProducts}
            onChange={fetchData}
            reviews={reviews}
          />
        </div>
      </div>
    </div>
  ) : (
    (toast.error("Debes iniciar sesion"), navigate("/login"))
  );
}
