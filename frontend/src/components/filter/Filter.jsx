import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./filter.css";
import CategoryModal from "../dialogs/CategoryModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

import { createCategory, deleteCategory } from "../../services/categoryService";


const Filter = ({ onFilterChange, products, categories, setCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState(null);

  const [localCategories, setLocalCategories] = useState(categories);

  const { user } = useAuth();

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  
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

  const handleAddCategory = () => {
    setIsCreate(true);
  };

  const handleCloseDialog = () => {
    setIsCreate(false);
    setIsEdit(false);
    setSelectedCategoryToEdit(null);
  };

  const handleDelete = (category) => {
    setSelectedCategoryToEdit(category);
    setIsEdit(false);
  };

  const handleCreateCategory = async (name, subcategories) => {
    try {
      // Crear la categoría
      const response = await createCategory(name, subcategories);
      if (response) {
        // Actualizar el estado local
        const newCategory = {
          ...response,
          subcategories: subcategories.map((sub) => ({
            name: sub,
            categoryId: response.id,
          })),
        };
        
        // Actualizar el estado local
        setLocalCategories(prevCategories => [...prevCategories, newCategory]);
        
        // Si setCategories es proporcionado, actualizar el estado del padre
        if (setCategories) {
          setCategories(prevCategories => [newCategory, ...prevCategories]);
        }
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
      throw error;
    } finally {
      handleCloseDialog();
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      const response = await deleteCategory(category);

      if (response) {
        // Actualizar el estado local
        setLocalCategories(prevCategories =>
          prevCategories.filter(c => c.id !== category.id)
        );
        
        // Si setCategories es proporcionado, actualizar el estado del padre
        if (setCategories) {
          setCategories(prevCategories =>
            prevCategories.filter(c => c.id !== category.id)
          );
        }
      }
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      throw error;
    } finally {
      handleCloseDialog();
    }
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
    <div className="px-4 w-[100%] py-5 flex flex-col fixed rounded-lg max-w-sm bg-white border border-gray-300 overflow-y-auto max-h-[80vh]">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar productos..."
        className="mb-2 p-2 text-sm border rounded-md"
      />
      <div className="flex bg-[#3b3b3b] gap-3 py-1 px-2 mt-4 mb-6 rounded-md w-full items-center">
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
        <p className="mr-2 text-[13px] text-[#585858] font-bold">$0</p>
        <input
          type="range"
          min="1"
          max="5000"
          step="1"
          value={priceRange}
          onChange={handlePriceChange}
          className="slider w-full"
        />
        <p className="ml-2 text-[13px] text-[#585858] font-bold">$5000</p>
      </div>

      <button className="textRedHatDisplay font-bold text-[15px] mt-4 py-2 px-2 bg-[#ff8e4c] text-start text-white rounded-md w-full">
        Categorías
      </button>
      <div className="catalogo__categories mt-4 flex flex-col gap-1">
        {localCategories.map((category) => (
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
            {user.role == "admin" && (
              <button
                onClick={() => handleDelete(category)}
                className="bg-[#ff8e4c] ms-2 p-2 rounded-md"
              >
                <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
              </button>
            )}
          </div>
        ))}

        {selectedCategory && (
          <div className="mt-2">
            <label className="text-sm font-medium">
              Seleccionar subcategoría:
            </label>
            <div className="flex flex-wrap gap-1 mt-2">
              {localCategories
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

      <div className="flex items-center">
        <div className="w-25">
          {user.role == "admin" && (
            <button
              onClick={handleAddCategory}
              className={`textRedHatDisplayRegular text-[16px] border p-2 px-4 rounded-md mt-6 me-2 bg-[#79DA52] text-white border-none font-bold`}
            >
              <FontAwesomeIcon icon={faFolderPlus} style={{color: "#ffffff",}} />
            </button>
          )}
        </div>
        <button
          onClick={clearFilters}
          className="mt-6 textRedHatDisplayRegular font-bold py-2 text-[15px] bg-[#3d3737] text-white rounded-md w-full"
        >
          Limpiar filtros
        </button>
      </div>

      {isCreate || isEdit || selectedCategoryToEdit ? (
        <CategoryModal
          category={selectedCategoryToEdit}
          onClose={handleCloseDialog}
          onCreate={handleCreateCategory}
          onDelete={handleDeleteCategory}
          isEdit={isEdit}
          isCreate={isCreate}
        />
      ) : null}
    </div>
  );
};

export default Filter;
