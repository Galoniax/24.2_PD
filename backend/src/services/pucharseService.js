import { prisma } from "../providers/prisma.js";

export class PurchaseService {
  static async getAllById({ userId }) {
    try {
      const purchases = await prisma.purchase.findMany({
        where: {
          userId,
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      return purchases;
    } catch (error) {
      console.error("Error al obtener las compras:", error);
      throw new Error("No se pudo obtener las compras. Intente nuevamente.");
    }
  }

  static async create({ purchase }) {
    try {
        const productsWithUpdatedStock = await Promise.all(
            purchase.products.map(async (product) => {
                // Obtener el producto actual de la base de datos
                const currentProduct = await prisma.product.findUnique({
                    where: {
                        id: product.productId,
                    },
                });

                if (!currentProduct) {
                    throw new Error(`El producto con ID ${product.productId} no existe.`);
                }

                // Calcular el nuevo stock
                const newStock = currentProduct.stock - product.quantity;

                // Actualizar el producto con el nuevo stock y estado
                const updatedProduct = await prisma.product.update({
                    where: {
                        id: product.productId,
                    },
                    data: {
                        stock: { decrement: product.quantity },
                        status: newStock <= 0 ? "agotado" : "disponible",
                    },
                });

                return {
                    ...product,
                    product: updatedProduct,
                };
            })
        );

        // Crear la compra en la base de datos
        const newPurchase = await prisma.purchase.create({
            data: {
                userId: purchase.userId,
                totalPrice: purchase.totalPrice,
                products: {
                    create: productsWithUpdatedStock.map((product) => ({
                        productId: product.productId,
                        quantity: product.quantity,
                    })),
                },
            },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return newPurchase;
    } catch (error) {
        console.error("Error al crear la compra:", error);
        throw new Error("No se pudo crear la compra. Intente nuevamente.");
    }
}
}
