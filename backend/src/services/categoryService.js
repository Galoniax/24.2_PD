import { prisma } from "../providers/prisma.js";

export class CategoryService {
  // Obtener todas las categorías con sus subcategorías
  static async getAll() {
    try {
      return await prisma.category.findMany({
        include: {
          subcategories: true,
        },
      });
    } catch (error) {
      console.error("Error al obtener categorías", error);
      throw new Error("No se pudo obtener las categorías. Intente nuevamente.");
    }
  }

  // Crear una nueva categoría con subcategorías
  static async createCategory({ name, subcategories }) {
    try {
      if (!name || !Array.isArray(subcategories) || subcategories.length === 0) {
        throw new Error("Datos inválidos para crear la categoría.");
      }

      const category = await prisma.category.create({
        data: {
          name: name,
          subcategories: {
            create: subcategories.map((subcategory) => ({
              name: subcategory,
            })),
          },
        },
      });

      return category;
    } catch (error) {
      console.error("Error al crear categoría", error);
      throw new Error("No se pudo crear la categoría. Intente nuevamente.");
    }
  }

  // Actualizar una categoría existente con nuevas subcategorías
  static async updateCategory({ id, name, subcategories }) {
    try {
      if (!id || !name || !Array.isArray(subcategories) || subcategories.length === 0) {
        throw new Error("Datos inválidos para actualizar la categoría.");
      }

      const category = await prisma.category.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          subcategories: {
            create: subcategories.map((subcategory) => ({
              name: subcategory,
            })),
          },
        },
      });

      return category;
    } catch (error) {
      console.error("Error al actualizar categoría", error);
      throw new Error("No se pudo actualizar la categoría. Intente nuevamente.");
    }
  }

  // Eliminar una categoría y sus subcategorías asociadas
  static async deleteCategory({ id }) {
    try {
      const categoryId = parseInt(id, 10);

      if (isNaN(categoryId)) {
        throw new Error("ID de categoría inválido.");
      }

      // Eliminar las subcategorías asociadas
      await prisma.subcategory.deleteMany({
        where: {
          categoryId: categoryId,
        },
      });

      // Eliminar la categoría
      const category = await prisma.category.delete({
        where: {
          id: categoryId,
        },
        include: {
          subcategories: true,
        },
      });

      return category;
    } catch (error) {
      console.error("Error al eliminar categoría o subcategorías", error);
      throw new Error("No se pudo eliminar la categoría o las subcategorías. Intente nuevamente.");
    }
  }
}