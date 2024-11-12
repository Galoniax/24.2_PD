import React from "react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { usePucharses } from "../../hooks/usePucharses";
import { useAuth } from "../../hooks/useAuth";

export function Sidebar({ onClose }) {
    const { createPurchase } = usePucharses();

    
    const { user } = useAuth();
  const { cart, clearCart } = useContext(CartContext); // Accede al carrito desde el contexto

  //Funcion para multiplicar el precio por la cantidad de productos en el carrito
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  //Remove the product from the cart
  const { removeFromCart } = useContext(CartContext);



  
 const handlePurchase = async () => {
    try {
      const purchase = await createPurchase(user.id, cart);
      console.log("Compra realizada:", purchase);

       clearCart();
    } 
    catch (error) {
      console.error("Error al realizar la compra:", error);
    }
}
 
  

  return (
    
    <div
    
      className="sidebar fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg p-4 transition-transform duration-300"
      style={{ transform: "translateX(0)" }}
    >
        
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Carrito</h2>
        <button
          onClick={onClose}
          className="text-red-500 font-bold"
        >
          Cerrar
        </button>
      </div>

      <div className="cart-items mt-4">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              
              <div className="ml-4">

                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">Precio: ${item.price}</p>
                <p className="text-gray-600">Subtotal: ${totalPrice}</p>
                <p>Cantidad: {item.quantity}</p>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-bold mt-2"
                >
                  Eliminar
                </button>

              </div>
            </div>
          ))
        )}
         {cart.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">Total: ${totalPrice}</p>
          <button
            onClick={handlePurchase}
            className="bg-blue-500 text-white w-full py-2 mt-4 rounded"
          >
            Comprar
          </button>
        </div>
      )}
    
      </div>
    </div>
  );

}

