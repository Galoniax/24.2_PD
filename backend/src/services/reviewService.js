import { prisma } from "../providers/prisma.js";

export class ReviewService {
  static async getAll() {
    try {
      return await prisma.review.findMany();
    } catch (error) {
      console.error("Error al obtener reviews", error);
      throw new Error("No se pudo obtener las reviews. Intente nuevamente.");
    }
  }

  static async create({ review }) {
    try {
      return await prisma.review.create({
      data: {
        productId: review.productId,
        userId: review.userId,
        title: review.title,
        comment: review.comment,
        rating: review.rating,
      },
      
    })
    } catch (error) {
      console.error("Error al crear review", error);
      throw new Error("No se pudo crear la review. Intente nuevamente.");
    }
  }

  static async update({ id, review }) {
    try {
      return await prisma.review.update({
        where: {
          id: id,
        },
        data: {
          title: review.title,
          comment: review.comment,
          rating: review.rating,
        },
      });
    } catch (error) {
      console.error("Error al actualizar review", error);
      throw new Error("No se pudo actualizar la review. Intente nuevamente.");
    }
  }

  static async delete({ id }) {
    try {
      return await prisma.review.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Error al eliminar review", error);
      throw new Error("No se pudo eliminar la review. Intente nuevamente.");
    }
  }
    
  
}
