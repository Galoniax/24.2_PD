import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const fetchAllPurchases = async () => {
    try {
        const response = await axiosInterceptor.get("/purchases");
        return response.data;
    } catch (error) {
        console.error("Error al obtener compras", error);
        throw error;
    }
}

export const createPurchase = async (userId, cart, product = null) => {
    if ((!cart || cart.length === 0) && !product) {
        throw new Error("No hay productos para realizar la compra");
    }

    // Si no hay carrito, usa el producto proporcionado
    const purchaseProducts = cart && cart.length > 0 ? cart : [{ ...product, quantity: 1 }];
    const totalPrice = purchaseProducts.reduce((total, item) => total + item.price * item.quantity, 0);

    try {
        const response = await axiosInterceptor.get("/purchases");
        const purchases = response.data;

        const customId = purchases.length + 1;

        // Verificar si el id ya existe
        const existingPurchase = purchases.find((purchase) => purchase.id == customId);
        if (existingPurchase) {
            throw new Error(`Ya existe una compra con el id ${customId}`);
        }

        // Crear el objeto de la compra
        const purchase = {
            id: customId,
            userId,
            products: purchaseProducts,
            totalPrice,
        };

        // Realizar la solicitud para crear la compra
        const purchaseResponse = await axiosInterceptor.post("/purchases", purchase);

        // Retornar los datos de la compra creada
        return purchaseResponse.data;
    } catch (error) {
        console.error("Error al crear la compra", error);
        throw new Error("Hubo un problema al procesar la compra. Intenta nuevamente.");
    }
};
