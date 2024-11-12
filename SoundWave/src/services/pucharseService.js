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

export const createPurchase = async (userId, cart) => {
    if (!cart || cart.length === 0) {
        throw new Error("El carrito está vacío, no se puede realizar la compra");
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); 
    
    try {
        const response = await axiosInterceptor.get("/purchases");
        const purchases = response.data;

        const customId = purchases.length + 1;

        // Si el id proporcionado ya existe, lanzar un error
        const existingPurchase = purchases.find(purchase => purchase.id === customId);
        if (existingPurchase) {
            throw new Error(`Ya existe una compra con el id ${customId}`);
        }
        else {
        // Crear el objeto de la compra con el customId proporcionado
        const purchase = {
            id: customId,
            userId,
            products: cart,
            totalPrice
        };

        // Realiza la solicitud para crear la compra
        const response = await axiosInterceptor.post("/purchases", purchase);

        // Retorna los datos de la compra creada
        return response.data;
    }

    } catch (error) {
        console.error("Error al crear la compra", error);
        throw new Error("Hubo un problema al procesar la compra. Intenta nuevamente.");
    }
}