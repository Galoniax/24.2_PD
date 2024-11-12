import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Importa el CartContext
import { useAuth } from "../hooks/useAuth";
import ProductModal from "../components/dialogs/ProductModal"; // Importar el nuevo componente

import { useProducts } from "../hooks/useProducts";

const ProductList = ({ products, onChange }) => {
  const { deleteProduct } = useProducts();
  const { updateProduct } = useProducts();

  // Función para disparar un flag para que el otro componente fetche los componentes nuevos

  const { user } = useAuth();
  const { addToCart } = useContext(CartContext); // Usa el contexto del carrito

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEdit(true); // Establece que es para editar
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsEdit(false); // Establece que es para eliminar
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setIsEdit(false); // Reinicia el estado de edición/eliminación
  };

  const handleSaveChanges = async (product) => {
    const response = await updateProduct(product.id, product);
    onChange();

    console.log("Producto actualizado:", response);

    // Llama a la función para actualizar el producto aquí
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (product) => {
    const response = await deleteProduct(product.id);
    onChange();
    console.log("Producto eliminado:", response);

    // Llama a la función para eliminar el producto aquí
    setSelectedProduct(null);
  };

  if (products.length === 0) {
    return (
      <p className="text-gray-500">
        No hay productos que coincidan con los filtros seleccionados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-md flex flex-col justify-around"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-blue-500 font-semibold mt-2">${product.price}</p>

          {user && user.role == "admin" ? (
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded"
              >
                Editar libro
              </button>
              <button
                onClick={() => handleDelete(product)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
              >
                Eliminar
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"
            >
              Agregar al carrito
            </button>
          )}
        </div>
      ))}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseDialog}
          onSave={handleSaveChanges}
          onDelete={handleDeleteProduct}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default ProductList;
