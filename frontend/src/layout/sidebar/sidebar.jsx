import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { createPurchase } from "../../services/pucharseService";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";


export function Sidebar({ onClose }) {
  const { user } = useAuth();
  const { cart, clearCart, removeFromCart, updateQuantity } = useContext(CartContext); // Accede al carrito desde el contexto

  //Funcion para multiplicar el precio por la cantidad de productos en el carrito
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePurchase = async () => {
    try {
      await createPurchase(user.id, cart);
      clearCart();
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity));
    updateQuantity(itemId, quantity);
  };

  return (
    <div
      className={`sidebar fixed top-0 right-0 w-[350px] h-full bg-[#2b2b2b] p-4 shadow-lg transition-transform duration-800`}
    >
      <div className="flex justify-between bg-[#ff8928]   border-[#c5c5c5] px-2 items-center">
        <img
          src="../../src/assets/icons/IconMain64.png"
          className="filter1"
          alt="Logo"
        />
        <h2 className="text-[17px] text-[#ffffff] p-4 font-bold">
          Carrito de {user?.username}
        </h2>
      </div>

      <div className="cart-items mt-4">
        {cart.length === 0 ? (
          <p className="text-[15px] text-center">
            No hay productos en el carrito.
          </p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="bg-[#00000018] border-[2px]  border-[#c5c5c5] mb-1 p-3"
            >
              <div className="ml-4">
                <p className="text-[15px] text-[#ffffff] font-bold">
                  {item.name}
                </p>
                <p className="text-[14px] mt-3 text-[#ffffff]">
                  Precio: ${item.price}
                </p>
                <p className="text-[14px] text-[#ffffff] pt-2">
                  Cantidad: 
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-10 ms-1 bg-[#ffffff1a] text-white text-center rounded-sm"
                  />
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-[15px]  mt-4 text-[#ffffff] font-semibold">
                    Subtotal: ${item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 p-1 px-2 text-white font-bold rounded-md"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div className="mt-4">
            <p className="font-bold text-[16px] text-[#ffffff] mb-[30px]">
              Total: ${totalPrice}
            </p>
            <button
              onClick={handlePurchase}
              className="bg-[#ff8928] text-[14px] text-white font-bold w-full py-2 mt-4 rounded"
            >
              Comprar
            </button>
            <button
              onClick={onClose}
              className="text-[#ffffff] text-[14px] bg-red-500 w-full rounded-md py-2 mt-5 p-1 px-3 font-bold"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
