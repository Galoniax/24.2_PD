import { axiosInterceptor } from "../interceptor/axios-interceptor";
import { toast } from "react-toastify";

export const fetchPucharses = async (user) => {
  try {
    const response = await axiosInterceptor.get(`/api/v1/purchases/${user.id}`);

    if (response.status === 404) {
      throw new Error("No se encontraron compras");
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 500 && error.response) {
      toast.error(error.response.data.message || "Error interno del servidor");
    }
    console.error("Error al obtener las compras", error);
    throw error;
  }
};

export const createPurchase = async (userId, cart, product = null) => {
  if ((!cart || cart.length === 0) && !product) {
    throw new Error("No hay productos para realizar la compra");
  }

  // Preparar los productos para la compra
  const purchaseProducts =
    cart?.length > 0 ? cart : [{ ...product, quantity: 1 }];

  const totalPrice = purchaseProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  try {
    // Validar el stock de los productos
    const insufficientStock = purchaseProducts.filter(
      (item) => item.quantity > item.stock
    );
    if (insufficientStock.length > 0) {
      const errorMessage = insufficientStock
        .map((item) => `No hay suficiente stock de "${item.name}"`)
        .join(", ");
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Crear la estructura de la compra
    const purchase = {
      userId,
      products: purchaseProducts.map(({ id, quantity }) => ({
        productId: id,
        quantity,
      })),
      totalPrice,
    };

    const response = await axiosInterceptor.post(
      "/api/v1/purchases/create",
      purchase
    );

    if (response.status === 201) {
      toast.success(response.data.message || "Compra realizada con exito");
    }

    return {
      pucharseData: response.data,
      pucharseProducts: purchase.products,
    }
  } catch (error) {
    console.error("Error al crear la compra", error);

    const errorMessage =
      error.response?.data?.message || "Error interno del servidor";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
