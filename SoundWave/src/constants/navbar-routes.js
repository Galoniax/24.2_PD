import { ROUTES } from "./constants";
import { useAuth } from "../hooks/useAuth";

export const NAVBAR_ROUTES = [
  { path: ROUTES.HOME, name: "Inicio" },
  { path: `${ROUTES.HOME}#Nosotros`, name: "Nosotros" },
  { path: `${ROUTES.HOME}#Productos`, name: "Productos" },
  { path: `${ROUTES.HOME}#Reviews`, name: "Reseñas" },
  { path: ROUTES.CATALOGO, name: "Catálogo", role: "admin, user" },
  { path: ROUTES.PRODUCTO, name: "Producto" },
  { path: ROUTES.LOGIN },
  { path: ROUTES.REGISTER },
];

export function filterRoutesByRole() {
  const { isLoggedIn, user } = useAuth();
  return NAVBAR_ROUTES.filter((route) => {
    if (route.path === ROUTES.HOME) return true; // Siempre muestra "Inicio"
    if (isLoggedIn && user.role === "user") {
      // Si hay usuario, muestra solo Carrito y Catálogo
      return route.role && route.role.includes("user");
    } else if (isLoggedIn && user.role === "admin") {
      // Si hay usuario, muestra solo Catálogo
      return route.role && route.role.includes("admin");
    } else {
      // Si no hay usuario, muestra las rutas sin roles o con "guest" (por ejemplo, Login y Register)
      return !route.role;
    }
  });
}
