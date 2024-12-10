import { UserService } from "../services/userService.js";
import { comparePassword } from "../utils/hash.js";
import { hashPassword } from "../utils/hash.js";
import { createToken, verifyToken } from "../utils/jwt.js";  // Importar las funciones de JWT

export class AuthController {
  // Ruta de login
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Buscar al usuario por el correo electrónico
      const user = await UserService.getByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "El email no está registrado" });
      }

      // Comparar la contraseña
      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "La contraseña es incorrecta" });
      }

      // Crear un token JWT
      const token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      return res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
      console.error("Error en el login:", error.message);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // Ruta de registro
  static async register(req, res) {
    const { username, email, password } = req.body;

    try {
      // Verificar si el usuario ya está registrado
      const user = await UserService.getByEmail(email);

      if (user) {
        return res.status(409).json({ message: "El email ya está registrado" });
      }

      const hashedPassword = await hashPassword(password);

      // Crear el nuevo usuario
      await UserService.create({ username, email, password: hashedPassword });

      return res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
      console.error("Error en el registro:", error.message);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

}