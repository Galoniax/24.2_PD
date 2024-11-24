import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useAuth } from "../../hooks/useAuth";
import { CartContext } from "../../context/CartContext";
import ProductModal from "../../components/dialogs/ProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ProductList = ({ products, onChange, reviews, categories }) => {
  const navigate = useNavigate();
  const { deleteProduct, updateProduct } = useProducts();
  const { user } = useAuth();
  const { addToCart } = useContext(CartContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);


  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEdit(true);

  };

 

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsEdit(false);

  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setIsEdit(false);
  };

  const handleSaveChanges = async (product) => {
    try {
      const response = await updateProduct(product);
      if (response) {
        toast.success("Producto actualizado con éxito");
        onChange(); 
      } else {
        throw new Error("La actualización del producto falló.");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error("No se pudo actualizar el producto. Inténtalo de nuevo.");
    } finally {
      handleCloseDialog(); 
    }
  };


  const handleDeleteProduct = async (product) => {
    try {
      const response = await deleteProduct(product);
      if (response) {
        toast.success("Producto eliminado con éxito");
        onChange();
      } else {
        throw new Error("La eliminación del producto falló.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("No se pudo eliminar el producto. Inténtalo de nuevo.");
    } finally {
      handleCloseDialog(); 
    }
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
          className="border rounded-lg p-4 shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <div onClick={() => handleProductClick(product, reviews)}>
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="textNunitoSans text-[15px] text-[#525252] font-semibold tracking-[-0.5px]">
              {product.name}
            </h3>

            <div className="flex justify-between mt-2">
              <p className="text-[#3eb497] text-[16px] font-semibold tracking-[-0.5px]">
                ${product.price}
              </p>

              <div className="flex items-center">
                <p className="text-[#ceced4] font-semibold text-[14px] tracking-[-1px]">
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#ffa844", fontSize: "12px" }}
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
          categories={categories}
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
