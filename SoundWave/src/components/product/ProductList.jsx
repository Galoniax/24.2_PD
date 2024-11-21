import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Importa el CartContext
import { useAuth } from "../../hooks/useAuth";
import ProductModal from "../dialogs/ProductModal"; // Importar el nuevo componente

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../hooks/useProducts";

const ProductList = ({ products, onChange, reviews }) => {
  const navigate = useNavigate();
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

  const calculateAverageRating = (productId, reviews) => {
    const productReviews = reviews.filter(
      (review) => review.productId == productId
    );

    if (productReviews.length == 0) return { averageRating: 0, reviewCount: 0 };
    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return {
      averageRating: (totalRating / productReviews.length).toFixed(1),
      reviewCount: productReviews.length,
    };
  };

  const handleProductClick = (product) => {
    navigate(`/producto/${product.id}`);
  };

  if (products.length == 0) {
    return (
      <p className="text-gray-500">
        No hay productos que coincidan con los filtros seleccionados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[20px] gap-y-[40px] mt-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg  p-4 shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <div
            key={product.id}
            onClick={() => handleProductClick(product, reviews)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="textNunitoSans text-[15px] text-[#525252] font-semibold tracking-[-0.5px]">
              {product.name}
            </h3>

            <div className="flex justify-between">
              <p className="text-[#5b9c8c] text-[16px] font-semibold tracking-[-0.5px]">
                ${product.price}
              </p>

              <div className="flex  items-center">
                <p className="text-[#CACACE] font-semibold text-[14px] tracking-[-1px]">
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#FFD43B", fontSize: "12px" }}
                  />{" "}
                  {calculateAverageRating(product.id, reviews).averageRating} |{" "}
                  {calculateAverageRating(product.id, reviews).reviewCount}
                </p>
              </div>
            </div>
          </div>

          {user && user.role == "admin" ? (
            <div className="mt-5 flex space-x-2 justify-center">
              <button
                onClick={() => handleEdit(product)}
                className="bg-[#2785aa] hover:bg-[#256179] text-[14.5px] w-full text-white font-semibold py-1 px-2 rounded"
              >
                Editar libro
              </button>
              <button
                onClick={() => handleDelete(product)}
                className="bg-red-500 hover:bg-red-600 text-white text-[14.5px] w-full font-semibold py-1 px-2 rounded"
              >
                Eliminar
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="bg-[#383838] hover:bg-[#6d6d6d] w-full text-[14.5px] text-white font-semibold py-2 mt-4 px-4 rounded"
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
