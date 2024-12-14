import { fetchProducts } from "../services/productService";

import { useState, useEffect } from "react";

export const useProducts = () => {
  const [productsData, setProducts] = useState([]);

  const fetchProductsData = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const updateProductAfterPurchase = (purchasedProducts) => {
    if (!purchasedProducts || !Array.isArray(purchasedProducts)) {
      console.error("Invalid purchased products data");
      return;
    }

    setProducts(prevProducts => 
      prevProducts.map(product => {
        const purchasedProduct = purchasedProducts.find(p => p.productId === product.id);
        if (purchasedProduct) {
          return {
            ...product,
            stock: product.stock - purchasedProduct.quantity
          };
        }
        return product;
      })
    );
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return { productsData, updateProductAfterPurchase };
};
