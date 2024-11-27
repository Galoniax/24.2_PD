import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

// Create the CartContext
const CartContext = createContext();

// Custom hook to access the CartContext
export const useCart = () => {
  return useContext(CartContext); // Fix here: pass the CartContext to useContext
};

// CartProvider component to provide context value
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find(item => item.id == product.id);

      if (productExists) {
        // If the product already exists, increase its quantity
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If the product doesn't exist, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
   // Función para vaciar el carrito
   const clearCart = () => {
    setCart([]);
  };
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    toast.success("Producto eliminado del carrito", { autoClose: 1200 });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isSidebarOpen, toggleSidebar, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext }; // Export CartContext here
