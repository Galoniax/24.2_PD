import React, { useState, useEffect } from "react";
import { useCategory } from "../../hooks/useCategory";
import "./filter.css";

const Filter = ({ onFilterChange, products }) => {
  const { fetchAllCategories } = useCategory();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const fetchData = async () => {
    try {
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.id);
    setSelectedSubcategory(""); // Resetear la subcategoría
    onFilterChange(category.id, "", searchTerm, priceRange);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory.id);
    onFilterChange(selectedCategory, subcategory.id, searchTerm, priceRange);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange(
      selectedCategory,
      selectedSubcategory,
      e.target.value,
      priceRange
    );
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    onFilterChange(
      selectedCategory,
      selectedSubcategory,
      searchTerm,
      e.target.value
    );
  };

  const getCategoryCount = (categoryId) =>
    products.filter((product) => product.categoryId == categoryId).length;

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSearchTerm("");
    setPriceRange("");
    onFilterChange("", "", "", "");
  };

  return (
    <div className="px-4 py-5 flex flex-col position-fixed rounded-lg max-w-sm bg-white border border-gray-300">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar productos..."
        className="mb-4 p-2 text-sm border rounded-md"
      />

      <button className="textRedHatDisplay  font-bold mb-6 text-[14px] mt-4 py-1 px-2 bg-[#616161] text-start text-white rounded-md w-full">
        Precio de compra {priceRange ? `-$${priceRange}` : ""}
      </button>

      <div className="slidecontainer mb-4 bg-[] flex items-center">
        <p className="mr-2 text-[13px] text-[#8f8f8f] font-bold">$0</p>
        <input
          type="range"
          min="1"
          max="500"
          step="1"
          value={priceRange}
          onChange={handlePriceChange}
          className="slider w-full"
        />
        <p className="ml-2 text-[13px] text-[#8f8f8f] font-bold">$500</p>
      </div>

      <button className="textRedHatDisplay  font-bold text-[15px] mt-4 py-1 px-2 bg-[#ff8e4c] text-start text-white rounded-md w-full">
        Categorías
      </button>
      <div className="catalogo__categories mt-4 flex flex-col gap-2">
        {categories.map((category) => (
          <div key={category.id} className="w-full flex justify-end">
            <button
              onClick={() => handleCategoryChange(category)}
              className={`textRedHatDisplayRegular text-[14.5px] text-start flex justify-between border p-2 px-4 rounded-md w-[90%] ${
                selectedCategory === category.id
                  ? "bg-[#ffa743] text-white border-none"
                  : "bg-transparent text-gray-700"
              }`}
            >
              {category.name}
              <span
                className={`${
                  selectedCategory === category.id
                    ? "bg-[#ffa743] text-white border-none"
                    : "bg-transparent text-gray-700"
                }`}
              >
                ({getCategoryCount(category.id)})
              </span>
            </button>
          </div>
        ))}
        {selectedCategory && (
          <div className="mt-4">
            <label className="text-sm font-medium">
              Seleccionar subcategoría:
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories
                .find((category) => category.id === selectedCategory)
                ?.subcategories?.map((subcategory) => (
                  <button
                    key={subcategory.id} // Asegurando que cada subcategoría tenga un key único
                    onClick={() => handleSubcategoryChange(subcategory)}
                    className={`p-2 border rounded-md text-[14.5px] ${
                      selectedSubcategory === subcategory.id
                        ? "bg-[#ffa743] text-white border-none"
                        : "bg-transparent text-gray-700"
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={clearFilters}
        className="mt-6 textGabarito py-2 text-[15px] bg-red-500 text-white rounded-md w-full"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default Filter;
