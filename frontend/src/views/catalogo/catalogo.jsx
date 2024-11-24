import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Filter from "../../components/filter/Filter";
import ProductList from "../../components/product/ProductList";
import { useProducts } from "../../hooks/useProducts";
import { useReviews } from "../../hooks/useReviews";
import { useCategory } from "../../hooks/useCategory";
import Loader from "../../components/animation/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ProductModal from "../../components/dialogs/ProductModal";

export function Catalogo() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productLimit, setProductLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  const [isCreate, setIsCreate] = useState(false);

  const navigate = useNavigate();

  const { isLoggedIn, user } = useAuth();
  const { fetchProducts, createProduct } = useProducts();
  const { fetchAllReviews } = useReviews();
  const { fetchAllCategories } = useCategory();

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      const reviewsData = await fetchAllReviews();
      const categoriesData = await fetchAllCategories();

      setReviews(reviewsData);
      setProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false); // Oculta el Loader cuando termine
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      toast.error("Debes iniciar sesion");
    } else {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleCreate = () => {
    setIsCreate(true);
  };

  const handleCreateProduct = async (product) => {
    try {
      const response = await createProduct(product); // Crea el producto en la base de datos
      if (response) {
        setProducts((prevProducts) => [response, ...prevProducts]); // Agrega el nuevo producto a la lista principal
        setFilteredProducts((prevFilteredProducts) => [
          ...prevFilteredProducts,
          response,
        ]); // Agrega el nuevo producto a la lista filtrada
        toast.success("Producto creado con éxito"); // Muestra un mensaje de éxito
      } else {
        toast.error("No se pudo crear el producto");
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      toast.error("Error al crear producto");
    } finally {
      handleCloseDialog();
    }
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
    setLoading(true);

    setTimeout(() => {
      let filtered = products;

      if (categoryId) {
        filtered = filtered.filter(
          (product) => product.categoryId == categoryId
        );
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
    }, 650);
  };

  const getProductCount = () => products.length;

  const handleLimitChange = (event) => {
    const limit = Number(event.target.value);
    setProductLimit(limit);

    // Aplicar el límite sobre la lista filtrada
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.slice(0, limit)
    );
  };

  return isLoggedIn ? (
    <div className="bg-[#f5f5f5] min-h-[115vh]">
      <div className="catalogo pt-[140px] w-full flex justify-center p-[50px]">
        <div className="catalogo__content w-[25%]">
          <Filter
            onFilterChange={handleFilterChange}
            products={products}
            categories={categories}
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
                <option value="5">5 productos</option>
                <option value="10">10 productos</option>
                <option value="20">20 productos</option>
              </select>

              {user.role == "admin" && (
                <div className="flex items-center">
                  <button
                    className="bg-[#79da52] text-white text-[14px] font-bold py-1 px-4 rounded"
                    onClick={() => handleCreate()}
                  >
                    <FontAwesomeIcon
                      className="mr-2 text-[16px]"
                      icon={faPlus}
                    />
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
              onChange={fetchData}
              reviews={reviews}
              categories={categories}
            />
          )}

          <ProductModal
            categories={categories}
            onCreate={handleCreateProduct}
            isCreate={isCreate}
            onClose={handleCloseDialog}
          />
        </div>
      </div>
    </div>
  ) : null;
}
