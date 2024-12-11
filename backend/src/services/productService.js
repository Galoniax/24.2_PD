import { prisma } from "../providers/prisma.js";

export class ProductService {
  static async getAll() {
    try {
      return prisma.product.findMany();
    } catch (error) {
      console.error("Error al obtener productos", error);
      throw new Error("No se pudo obtener los productos. Intente nuevamente.");
    }
  }

  static async getById({ id }) {
    try {
      return prisma.product.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Error al obtener productos", error);
      throw new Error("No se pudo obtener los productos. Intente nuevamente.");
    }
  }

  static async create({ product }) {
    try {
      return await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          imageURL: product.imageURL,
          stock: parseInt(product.stock),
          status: product.stock == 0 ? "agotado" : "disponible",
          categoryId: parseInt(product.categoryId),
          subcategoryId: parseInt(product.subcategoryId),
        },
      });
    } catch (error) {
      console.error("Error al crear productos", error);
      throw new Error("No se pudo crear el producto. Intente nuevamente.");
    }
  }

  static async update({ id, product }) {
    try {
      return await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          imageURL: product.imageURL,
          stock: parseInt(product.stock),
          status: product.stock == 0 ? "agotado" : "disponible",
          categoryId: parseInt(product.categoryId),
          subcategoryId: parseInt(product.subcategoryId),
        },
      });
    } catch (error) {
      console.error("Error al actualizar productos", error);
      throw new Error("No se pudo actualizar el producto. Intente nuevamente.");
    }
  }

  static async delete({ id }) {
    try {
      return prisma.product.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Error al eliminar productos", error);
      throw new Error("No se pudo eliminar el producto. Intente nuevamente.");
    }
  }
}
