import { Link } from "react-router-dom"; // Importa el componente Link de React Router, que permite crear enlaces
import { useEffect, useState, useContext } from "react"; // Importa los hooks de React para manejar efectos secundarios y estado
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate de React Router para redirigir al usuario a diferentes rutas
import { useAuth } from "../../hooks/useAuth";
import { filterRoutesByRole } from "../../constants/navbar-routes";

import { ROUTES } from "../../constants/constants";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Import CartContext
import { Sidebar } from "../sidebar/sidebar"; // Importa el componente Sidebar

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import "./navbar.css"; // Importa los estilos CSS para la barra de navegación

export function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 

  const toggleSidebarVisibility = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Esta función maneja el desplazamiento suave a una sección específica de la página
  const handleScrollToSection = (path) => {
    const [route, hash] = path.split("#"); // Separa la ruta principal y el hash (la sección) en dos partes
    if (route) navigate(route); // Si hay una ruta principal, navega a ella
    if (hash) {
      setTimeout(() => {
        // Si hay un hash (por ejemplo, #Nosotros), desplazarse a esa sección
        const element = document.getElementById(hash); // Busca el elemento con el ID correspondiente al hash
        if (element) element.scrollIntoView({ behavior: "smooth" }); // Desplaza la página suavemente a la sección
      }, 100); // Añade un pequeño retraso para asegurarse de que la navegación haya sido ejecutada antes de hacer el desplazamiento
    }
  };

  const getTextColor = () => {
    if (location.pathname === "/catalogo") return "text-[#f0f0f0]";
    return scrolled ? "text-[#131313]" : "text-[#f0f0f0]";
  };

  const commonButtonStyles = `px-4 py-2 outline-dashed outline-1 outline-[#ff9500] hover:outline-2 rounded-[5px]`;

  const filteredRoutes = filterRoutesByRole();

  return (
    <nav
      className={`navbar w-[100%] fixed z-[100] px-[290px] transition-all duration-300 shadow-xl 
        ${scrolled && location.pathname !== "/catalogo" ? "bg-[#ebebeb]" : "bg-[#292929]"}
      `}
    >
      <div className="container-fluid flex justify-between items-center py-[20px]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="../../src/assets/icons/IconMain64.png"
            className="filter"
            alt="Logo"
          />
          <Link
            to={ROUTES.HOME}
            className={`title-text textNunitoSansBold tracking-tighter text-[21px] transition-all duration-300 ${getTextColor()}`}
          >
            SoundWave
          </Link>
        </div>

        {/* Navegación */}
        <ul className="navbar-nav flex">
          {filteredRoutes.map((route) => (
            <li key={route.path} className="nav-item ps-[40px]">
              <span
                onClick={() => handleScrollToSection(route.path)}
                className={`nav-link cursor-pointer ${getTextColor()}`}
              >
                {route.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Botones de autenticación */}
        <div className="auth-buttons flex gap-4">
          {user ? (
            <>
              {user.role !== "admin" && (
                <button
                  onClick={toggleSidebarVisibility}
                  className="bg-[#ff9500] text-white px-2 py-1 rounded-md"
                >
                  <FontAwesomeIcon icon={faCartShopping} /> ({cart.length})
                </button>
              )}
              <button
                onClick={logout}
                className={`${commonButtonStyles} ${getTextColor()}`}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className={`${commonButtonStyles} ${getTextColor()}`}
              >
                Iniciar Sesión
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className={`${commonButtonStyles} ${getTextColor()}`}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={toggleSidebarVisibility} />}
    </nav>
  );
}
