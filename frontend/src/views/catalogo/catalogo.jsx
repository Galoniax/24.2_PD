import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Filter from "../../components/filter/Filter";
import ProductList from "../../components/product/ProductList";

import { useProducts } from "../../hooks/useProducts";
import { useReviews } from "../../hooks/useReviews";
import { useCategory } from "../../hooks/useCategory";

import Loader from "../../components/animation/Loader";

import { createProduct } from "../../services/productService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

import ProductModal from "../../components/dialogs/ProductModal";

import { ROUTES } from "../../constants/constants";

export function Catalogo() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [productLimit, setProductLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { categoriesData } = useCategory();
  const { productsData } = useProducts();
  const { reviewsData } = useReviews();


  useEffect(() => {
    if (!isAuthenticated ) {
      toast.error("Debes iniciar sesión");
      navigate(ROUTES.LOGIN);
      return;
    } else {
      if (productsData.length > 0) {
        setFilteredProducts(productsData.slice(0, productLimit));
      }
    }
  }, [user, productsData]);

  const handleCreate = () => {
    setIsCreate(true);
  };

  const handleCreateProduct = async (product) => {
    try {
      const response = await createProduct(product); 
      if (response) {
        setProducts((prevProducts) => [response, ...prevProducts]); 
        setFilteredProducts((prevFilteredProducts) => [
          ...prevFilteredProducts,
          response,
        ]); 
      } 
    } catch (error) {
      console.error("Error al crear producto:", error);
    } finally {
      handleCloseDialog();
    }
  };

  const handleFetchData = async (updatedProducts) => {
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setLoading(false);
  };

  const handleCloseDialog = () => {
    setIsCreate(false);
  };

  // Función para manejar el cambio de filtro
  const handleFilterChange = (
    categoryId,
    subcategoryId,
    searchTerm,
    priceTerm
  ) => {
    let filtered = [...productsData];

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
    setLoading(false);
  };

  const getProductCount = () => productsData.length;

  const handleLimitChange = useCallback(
    (event) => {
      const limit = Number(event.target.value);
      setProductLimit(limit);

      // Aplicar el límite sobre la lista filtrada
      setFilteredProducts(productsData.slice(0, limit));
    },
    [productsData]
  );

  return user ? (
    <div className="bg-[#f5f5f5] min-h-[115vh]">
      <div className="catalogo pt-[140px] w-full flex justify-center p-[50px]">
        <div className="catalogo__content w-[25%]">
          <Filter
            onFilterChange={handleFilterChange}
            products={productsData}
            categories={categoriesData}
            setCategories={setCategories}
          />
          
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
            <div className="flex items-center justify-end w-[50%] gap-4">
              <p className="textRedHatDisplay text-[#919191] text-[15px]">
                Mostrando{" "}
              </p>
              <select
                className="px-2 h-8 border border-gray-300 rounded-md text-[14px] text-[#7a7a7a]"
                value={productLimit}
                onChange={handleLimitChange}
              >
                <option value={5}>5 productos</option>
                <option value={10}>10 productos</option>
                <option value={20}>20 productos</option>
              </select>

              {user.role == "admin" && (
                <div className="flex items-center">
                  <button
                    className="bg-[#79da52] textRedHatDisplayRegular font-bold  text-white text-[14px] flex items-center py-1 px-4 rounded"
                    onClick={() => handleCreate()}
                  >
                    <FontAwesomeIcon icon={faArrowUpFromBracket} style={{color: "#ffffff", marginRight: "10px", width: "15px", height: "15px" }} />
                    Agregar Producto
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <Loader /> // Muestra el Loader mientras carga
          ) : (
            <ProductList
              products={filteredProducts}
              onChange={handleFetchData}
              reviews={reviewsData}
              categories={categoriesData}
              user={user}
              isAuthenticated={isAuthenticated}
            />
          )}

          <ProductModal
            categories={categoriesData}
            onCreate={handleCreateProduct}
            isCreate={isCreate}
            onClose={handleCloseDialog}
          />
        </div>
      </div>
    </div>
  ) : null;
}
