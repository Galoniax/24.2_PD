import { ROUTES } from "./constants";
import { useAuth } from "../hooks/useAuth";


export const NAVBAR_ROUTES = [
  { path: ROUTES.HOME, name: "Inicio" },
  { path: `${ROUTES.HOME}#Nosotros`, name: "Nosotros" },
  { path: `${ROUTES.HOME}#Productos`, name: "Productos" },
  { path: `${ROUTES.HOME}#Reviews`, name: "Reseñas" },
  { path: ROUTES.CATALOGO, name: "Catálogo", role: "admin, user" },
  { path: ROUTES.PROFILE, name: "Perfil", role: "user" },
  { name: "Agregar perfil", role: "admin" },
  { path: ROUTES.LOGIN },
  { path: ROUTES.REGISTER },
];


export function filterRoutesByRole() {
  const { user } = useAuth();
  return NAVBAR_ROUTES.filter((route) => {
    if (route.path === ROUTES.HOME) return true; // Siempre muestra "Inicio"
    if (user?.role == "user") {
      // Si hay usuario, muestra solo Carrito y Catálogo
      return route.role && route.role.includes("user");
    } else if (user?.role == "admin") {
      // Si hay usuario, muestra solo Catálogo
      return route.role && route.role.includes("admin") || route.name === "Agregar perfil";
    } else {
      // Si no hay usuario, muestra las rutas sin roles o con "guest" (por ejemplo, Login y Register)
      return !route.role;
    }
  });
}
