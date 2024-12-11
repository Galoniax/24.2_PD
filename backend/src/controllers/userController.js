import { UserService } from "../services/userService.js";
import { hashPassword } from "../utils/hash.js";

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const user = req.body;

      const existingUser = await UserService.getByEmail(user.email);

      if (existingUser) {
        return res.status(409).json({ message: "Email ya registrado" });
      }

      const hashedPassword = await hashPassword(user.password);

      user.password = hashedPassword;

      const createdUser = await UserService.createWithRole({ user });
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { username, email, role } = req.body;

      user.username = username || user.username;
      user.email = email || user.email;
      user.role = role || user.role;

      const updatedUser = await UserService.update({ id, user });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await UserService.delete({ id });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
