import express from "express";
import cors from "cors";  // Importa el paquete CORS

import { API_PREFIX } from "./config/config.js";

import __dirname from "../dirname.js";

import morgan from "morgan";
import path from "path";

import { authRouter } from "./routes/authRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { pucharseRouter } from "./routes/pucharseRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());  // Esto permite que cualquier origen acceda a tu backend

// Configuración de Express
app.use(express.json()); // Middleware a nivel de aplicación
app.use(express.urlencoded({ extended: true })); // Middleware a nivel de aplicación
app.use(morgan("dev")); // Middleware de tercero
app.use(express.static(path.resolve(__dirname, "../public"))); // Middleware incorporado


// Definir rutas para API
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/categories`, categoryRouter);
app.use(`${API_PREFIX}/products`, productRouter);
app.use(`${API_PREFIX}/purchases`, pucharseRouter);
app.use(`${API_PREFIX}/reviews`, reviewRouter);
app.use(`${API_PREFIX}/users`, userRouter);



app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});