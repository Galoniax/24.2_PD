import React, { useState } from "react";
import "./filter.css";

const Filter = ({ onFilterChange, products, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

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
    <div className="px-4 w-[100%] py-5 flex flex-col fixed rounded-lg max-w-sm bg-white border border-gray-300 overflow-y-auto max-h-[90vh]">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar productos..."
        className="mb-2 p-2 text-sm border rounded-md"
      />
      <div className="flex bg-[#616161] gap-3 py-1 px-2 mt-4 mb-6 rounded-md w-full items-center">
        <p className="textRedHatDisplay font-bold text-[14px] text-start text-white">
          Precio de compra
        </p>
        <p className="textRedHatDisplay font-bold text-[14px] text-start text-white">
          {priceRange ? `-` : ""}
        </p>
        <p className="textRedHatDisplay font-bold text-[14px] text-start text-white">
          {priceRange ? `$${priceRange}` : ""}
        </p>
      </div>

      <div className="slidecontainer mb-4 bg-[] flex items-center">
        <p className="mr-2 text-[13px] text-[#8f8f8f] font-bold">$0</p>
        <input
          type="range"
          min="1"
          max="5000"
          step="1"
          value={priceRange}
          onChange={handlePriceChange}
          className="slider w-full"
        />
        <p className="ml-2 text-[13px] text-[#8f8f8f] font-bold">$5000</p>
      </div>

      <button className="textRedHatDisplay font-bold text-[15px] mt-4 py-1 px-2 bg-[#ff8e4c] text-start text-white rounded-md w-full">
        Categorías
      </button>
      <div className="catalogo__categories mt-4 flex flex-col gap-1">
        {categories.map((category) => (
          <div key={category.id} className="w-full flex justify-end">
            <button
              onClick={() => handleCategoryChange(category)}
              className={`textRedHatDisplayRegular text-[14.5px] text-start flex justify-between border p-2 px-4 rounded-md w-[90%] ${
                selectedCategory == category.id
                  ? "bg-[#ffa743] text-white border-none"
                  : "bg-transparent text-gray-700"
              }`}
            >
              {category.name}
              <span
                className={`${
                  selectedCategory == category.id
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
          <div className="mt-2">
            <label className="text-sm font-medium">
              Seleccionar subcategoría:
            </label>
            <div className="flex flex-wrap gap-1 mt-2">
              {categories
                .find((category) => category.id == selectedCategory)
                ?.subcategories?.map((subcategory) => (
                  <button
                    key={subcategory.id} // Asegurando que cada subcategoría tenga un key único
                    onClick={() => handleSubcategoryChange(subcategory)}
                    className={`p-2 border rounded-md text-[14.5px] ${
                      selectedSubcategory == subcategory.id
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
