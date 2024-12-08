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

  useEffect(() => {
    fetchProductsData();
  }, []);

  return { productsData };
};
