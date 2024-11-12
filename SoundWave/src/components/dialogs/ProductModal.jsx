import React from "react";
import { useState } from "react";

const ProductModal = ({ product, onClose, onSave, onDelete, isEdit }) => {
  if (!product) return null; // No renderizar nada si no hay producto seleccionado

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {!isEdit ? "Eliminar Producto" : "Editar Producto"}
        </h2>

        {!isEdit ? (
          // Vista de confirmación para eliminar
          <>
            <p>
              ¿Estás seguro de que deseas eliminar el producto "{product.name}"?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
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
          </>
        ) : (
          // Formulario de edición
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave({
                ...product,
                name: name,
                description: description,
                price: price,
              });
              onClose();
            }}
          >
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="block mb-2">
              Descripción:
              <textarea
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="block mb-2">
              Precio:
              <input
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="border p-2 rounded w-full"
              />
            </label>

            <div className="mt-4 flex justify-end space-x-2">
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
        )}
      </div>
    </div>
  );
};

export default ProductModal;
