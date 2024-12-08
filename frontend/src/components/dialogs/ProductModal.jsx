import React from "react";
import { useState } from "react";

const ProductModal = ({
  product, // Producto a editar o crear
  onClose, // Función para cerrar el modal
  categories, // Categorias disponibles
  onSave, // Función para guardar los cambios
  onDelete, // Función para eliminar el producto
  isEdit, // Indica si estamos editando un producto
  isCreate, // Indica si estamos creando un producto
  onCreate, // Función para crear un producto
}) => {
  // Manejo de valores iniciales
  const [name, setName] = useState(isCreate ? "" : product?.name || "");
  const [description, setDescription] = useState(
    isCreate ? "" : product?.description || ""
  );
  const [price, setPrice] = useState(isCreate ? "" : product?.price || "");
  const [stock, setStock] = useState(isCreate ? "" : product?.stock || "");
  const [imageURL, setImageURL] = useState(
    isCreate ? "" : product?.imageURL || ""
  );

  const [categoryId, setCategoryId] = useState(
    isCreate ? null : product?.categoryId || ""
  );
  const [subcategoryId, setSubcategoryId] = useState(
    isCreate ? null : product?.subcategoryId || ""
  );

  // Renderiza el modal solo si debe mostrarse
  if (!isCreate && !isEdit && !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#222222] p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {isCreate
            ? "Crear Producto"
            : isEdit
              ? "Editar Producto"
              : "Eliminar Producto"}
        </h2>

        {isCreate || isEdit ? (
          // Formulario para crear o editar producto
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newProduct = isCreate
                ? {
                    name,
                    description,
                    price,
                    stock,
                    status: stock === 0 ? "agotado" : "disponible",
                    imageURL,
                    categoryId,
                    subcategoryId,
                  }
                : {
                    id: product?.id,
                    name,
                    description,
                    price,
                    stock,
                    status: stock === 0 ? "agotado" : "disponible",
                    imageURL,
                    categoryId,
                    subcategoryId,
                  };

              isCreate ? onCreate(newProduct) : onSave(newProduct);
              onClose();
            }}
          >
            <label className="textRedHatDisplayMedium text-[14px] block mb-2 mt-6 text-white">
              Nombre:
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                minLength={3}
                className="border p-2 rounded w-full text-[14px] text-[#272727]"
              />
            </label>

            <label className="textRedHatDisplayMedium text-[14px] block mb-2 mt-6 text-white">
              Descripción:
              <textarea
                required
                minLength={10}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border p-2 rounded w-full text-[14px] text-[#272727]"
              />
            </label>

            <label className="textRedHatDisplayMedium text-[14px] block mb-2 mt-6 text-white">
              Precio:
              <input
                type="text"
                required
                min={1}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const validInput = inputValue.replace(/[^0-9.]/g, "");
                  setPrice(validInput);
                }}
                value={price}
                className="border p-2 rounded w-full text-[14px] text-[#272727]"
              />
            </label>

            <label className="textRedHatDisplayMedium text-[14px] block mb-2 mt-6 text-white">
              Stock:
              <input
                type="text"
                required
                min={0}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const validInput = inputValue.replace(/[^0-9.]/g, "");
                  setStock(validInput);
                }}
                value={stock}
                className="border p-2 rounded w-full text-[14px] text-[#272727]"
              />
            </label>

            <label className="textRedHatDisplayMedium text-[14px] block mb-2 mt-6 text-white">
              URL´s Imagen:
              <input
                type="text"
                onChange={(e) => setImageURL(e.target.value)}
                value={imageURL}
                required
                className="border p-2 rounded w-full text-[14px] text-[#272727]"
              />
            </label>

            <label className="textRedHatDisplayMedium text-[14px] block mb-2 mt-6 text-white">
              Categoría:
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
                required
                className="border p-2 rounded w-full text-[14px] text-[#272727]"
              >
                {/**Obtener todas las categorias */}
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="textRedHatDisplayMedium text-[14px] block mb-2 mt-6 text-white">
              Sub-Categoría:
              <select
                onChange={(e) => setSubcategoryId(e.target.value)}
                value={subcategoryId}
                required
                className="border p-2 rounded w-full text-[14px] text-[#272727]"
              >
                <option value="">Selecciona una subcategoría</option>
                {categories
                  .find((category) => category.id == categoryId)
                  ?.subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
              </select>
            </label>

            <div className="mt-9 flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          // Confirmación para eliminar
          <div>
            <p>
              ¿Estás seguro de que deseas eliminar el producto "{product.name}
              "?
            </p>
            <div className="mt-9 flex justify-end space-x-2">
              <button
                onClick={() => {
                  onDelete(product);
                  onClose();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Confirmar
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
