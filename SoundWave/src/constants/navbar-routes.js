import { ROUTES } from "./constants";

export const NAVBAR_ROUTES = [
    { path: ROUTES.HOME, name: "Inicio" },
    { path: `${ROUTES.HOME}#Nosotros`, name: "Nosotros" }, // Sección "Nosotros"
    { path: `${ROUTES.HOME}#Productos`, name: "Productos" }, // Sección "Productos"
    { path: `${ROUTES.HOME}#Reviews`, name: "Reseñas" }, // Sección "Contacto"
    { path: ROUTES.LOGIN }
];