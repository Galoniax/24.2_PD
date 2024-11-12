import React, { useState, useEffect } from "react";
import { useCategory } from "../../hooks/useCategory";

const Filter = ({ onFilterChange, products }) => {
  const { fetchCategories } = useCategory();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const categoriesData = await fetchCategories();
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
    onFilterChange(category.id, "", searchTerm);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory.id);
    onFilterChange(selectedCategory, subcategory.id, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange(selectedCategory, selectedSubcategory, e.target.value);
  };
  const getCategoryCount = (categoryId) =>
    products.filter((product) => product.categoryId == categoryId).length;

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSearchTerm("");
    onFilterChange("", "", "");
  };

  return (
    <div className="px-4 py-5 flex flex-col rounded-lg max-w-sm bg-white border border-gray-300">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar productos..."
        className="mb-4 p-2 text-sm border rounded-md"
      />
      <button className="textGabarito text-[17px] mt-4 py-2 px-2 bg-[#ffa743] text-start text-white rounded-md w-full">
        Categorías
      </button>
      <div className="catalogo__categories mt-4 flex flex-col gap-2">
        {categories.map((category) => (
          <div key={category.id} className="w-full flex justify-end">
            <button
              onClick={() => handleCategoryChange(category)}
              className={`text-[15px] text-start flex justify-between border p-2 rounded-md w-[90%] ${
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
                    className={`p-2 border rounded-md ${
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
        className="mt-6 textGabarito py-2 bg-red-500 text-white rounded-md w-full"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default Filter;
