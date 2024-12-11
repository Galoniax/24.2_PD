import { prisma } from "../providers/prisma.js";

export class UserService {
  static async getAll() {
    try {
      return prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    } catch (error) {
      throw new Error("No se pudo obtener los usuarios.");
    }
  }

  static async getByEmail(email) {
    try {
      return prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: true,
        },
      });
    } catch (error) {
      console.error("Error al obtener el usuario", error);
      throw new Error("No se pudo obtener el usuario.");
    }
  }

  static async getById(id) {
    try {
      return prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          password: false,
        },
      });
    } catch (error) {
      console.error("Error al obtener el usuario", error);
      throw new Error("No se pudo obtener el usuario.");
    }
  }

  static async create({ username, email, password }) {
    try {
      return prisma.user.create({
        data: {
          username,
          email,
          password,
          role: "user",
        },
      });
    } catch (error) {
      console.error("Error al crear el usuario", error);
      throw new Error("No se pudo crear el usuario.");
    }
  }

  static async createWithRole({ user }) {
    try {
      return prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error al crear el usuario", error);
      throw new Error("No se pudo crear el usuario.");
    }
  }

  static async update({ id, user }) {
    try {
      return prisma.user.update({
        where: {
          id: id,
        },
        data: user,
      });
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      throw new Error("No se pudo actualizar el usuario.");
    }
  }

  static async delete({ id }) {
    try {
      return prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      throw new Error("No se pudo eliminar el usuario.");
    }
  }
}
