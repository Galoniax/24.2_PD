import React, { useState, useEffect } from "react";
import { useCategory } from "../../hooks/useCategory";
import { useProducts } from "../../hooks/useProducts";


const Filter = ({ onFilterChange }) => {
  // Hooks para manejar los estados de categorías, productos, filtros y búsqueda
  const { fetchCategories } = useCategory();  // Función para obtener las categorías
  const { fetchProducts } = useProducts();    // Función para obtener los productos
  const [categories, setCategories] = useState([]);  // Estado para almacenar las categorías
  const [products, setProducts] = useState([]);  // Estado para almacenar los productos
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // Estado para la subcategoría seleccionada
  const [searchTerm, setSearchTerm] = useState("");  // Estado para el término de búsqueda de productos

  // useEffect para obtener las categorías y productos cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para obtener las categorías
    const getCategories = async () => {
      try {
        const response = await fetchCategories();  // Llamada a la API para obtener categorías
        setCategories(response);  // Almacena las categorías obtenidas en el estado
      } catch (error) {
        console.error("Error al obtener categorías", error);  // Muestra error en consola si ocurre
      }
    };

    // Función asíncrona para obtener los productos
    const getProducts = async () => {
      try {
        const response = await fetchProducts();  // Llamada a la API para obtener productos
        setProducts(response);  // Almacena los productos obtenidos en el estado
      } catch (error) {
        console.error("Error al obtener productos", error);  // Muestra error en consola si ocurre
      }
    };

    getCategories();  // Llama a la función para obtener categorías
    getProducts();    // Llama a la función para obtener productos
  }, [fetchCategories, fetchProducts]);  // Dependencias para recargar datos si cambian las funciones

  // Función para manejar el cambio de categoría seleccionada
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);  // Establece la categoría seleccionada
    setSelectedSubcategory("");  // Resetea la subcategoría seleccionada cuando cambia la categoría
  };

  // Función para manejar el cambio de subcategoría seleccionada
  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);  // Establece la subcategoría seleccionada
  };

  // Función para manejar la búsqueda por nombre de producto
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);  // Actualiza el estado con el término de búsqueda
  };

  // Función para filtrar los productos en base a la categoría, subcategoría y nombre
  const getFilteredProducts = () => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory ? product.categoryId === selectedCategory : true;  // Filtra por categoría si está seleccionada
      const matchesSubcategory =
        selectedSubcategory ? product.subcategoryId === selectedSubcategory : true;  // Filtra por subcategoría si está seleccionada
      const matchesSearchTerm = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());  // Filtra por nombre si el término de búsqueda coincide
      return matchesCategory && matchesSubcategory && matchesSearchTerm;  // Devuelve productos que coinciden con los filtros
    });
  };

  // useEffect para aplicar los filtros y pasar los productos filtrados al componente padre
  useEffect(() => {
    const filtered = getFilteredProducts();  // Obtiene los productos filtrados
    onFilterChange(filtered);  // Pasa los productos filtrados al componente padre para mostrar
  }, [selectedCategory, selectedSubcategory, searchTerm, products]);  // Dependencias para actualizar los productos filtrados

  // Función para contar los productos que pertenecen a una categoría específica
  const getCategoryCount = (categoryId) =>
    products.filter((product) => product.categoryId === categoryId).length;  // Filtra los productos por categoría y cuenta

  // Función para limpiar los filtros
  const clearFilters = () => {
    setSelectedCategory("");  // Resetea la categoría seleccionada
    setSelectedSubcategory("");  // Resetea la subcategoría seleccionada
    setSearchTerm("");  // Resetea el término de búsqueda
  };

  return (
    <div className="px-4 py-5 flex flex-col rounded-lg max-w-sm bg-white border border-gray-300">
      
      {/* Campo de búsqueda de productos */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}  // Llama a la función handleSearch cuando el valor cambia
        className="mb-4 p-2 text-sm border rounded-md"
      />

      {/* Botón de categorías */}
      <button
        className="textGabarito text-[17px] mt-4 py-2 px-2 bg-[#ffa743] text-start text-white rounded-md w-full"
      >
        Categorías
      </button>

      {/* Lista de categorías */}
      <div className="catalogo__categories mt-4">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <div key={category.id} className="w-full flex justify-end">
              <button
                onClick={() => handleCategoryChange(category.id)}  // Llama a handleCategoryChange cuando se selecciona una categoría
                className={`text-[15px] text-start flex justify-between border p-2 rounded-md w-[90%] ${
                  selectedCategory === category.id
                    ? "bg-[#ffa743] text-white border-none"
                    : "bg-transparent text-gray-700"
                }`}
              >
                {category.name}
                {/* Muestra el contador de productos en la categoría */}
                <span className={`${
                  selectedCategory === category.id
                    ? "bg-[#ffa743] text-white border-none"
                    : "bg-transparent text-gray-700"
                }`}>
                  ({getCategoryCount(category.id)})  {/* Muestra el número de productos en esta categoría */}
                </span>
              </button>
            </div>
          ))}

          {/* Muestra subcategorías solo si se selecciona una categoría */}
          {selectedCategory && (
            <div className="mt-4">
              <label className="text-sm font-medium">Seleccionar subcategoría:</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories
                  .find((category) => category.id === selectedCategory)
                  ?.subcategories?.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategoryChange(subcategory.id)}  // Llama a handleSubcategoryChange cuando se selecciona una subcategoría
                      className={`p-2 rounded-md ${
                        selectedSubcategory === subcategory.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {subcategory.name}  {/* Muestra el nombre de la subcategoría */}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Botón para limpiar los filtros */}
      <button
        onClick={clearFilters}  // Llama a clearFilters cuando se hace clic en el botón
        className="mt-6 textGabarito py-2 bg-red-500 text-white rounded-md w-full"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default Filter;