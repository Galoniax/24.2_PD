import { Link } from "react-router-dom"; // Importa el componente Link de React Router, que permite crear enlaces
import { useEffect, useState, useContext } from "react"; // Importa los hooks de React para manejar efectos secundarios y estado
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate de React Router para redirigir al usuario a diferentes rutas
import { useAuth } from "../../hooks/useAuth";
import { filterRoutesByRole } from "../../constants/navbar-routes";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Import CartContext
import { Sidebar } from "../sidebar/sidebar"; // Importa el componente Sidebar

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import "./navbar.css"; // Importa los estilos CSS para la barra de navegación

export function Navbar() {
  const { cart } = useContext(CartContext); // Now use useContext correctly with CartContext
  const navigate = useNavigate(); // Crea una instancia de useNavigate, que permite navegar a diferentes rutas de la aplicación
  const [scrolled, setScrolled] = useState(false); // Inicializa el estado 'scrolled' para saber si el usuario ha desplazado la página
  const { isLoggedIn, logout, user } = useAuth();

  const location = useLocation();
  const filteredRoutes = filterRoutesByRole();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar si el sidebar está abierto

  // Este useEffect maneja el evento de desplazamiento (scroll) de la ventana
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50; // Verifica si el usuario ha desplazado la página más de 50px
      setScrolled(isScrolled); // Cambia el estado 'scrolled' dependiendo de si la página ha sido desplazada
    };

    window.addEventListener("scroll", handleScroll); // Agrega el evento de scroll al componente
    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpia el evento cuando el componente se desmonta
    };
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

  const toggleSidebarVisibility = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alterna la visibilidad del sidebar
  };

  return (
    <nav
      className={`navbar w-[100%] fixed z-[100] px-[290px] transition-all duration-300  
        ${scrolled && location.pathname !== "/catalogo" ? "bg-[#ebebeb] shadow-xl" : "bg-[#292929] shadow-xl"}

      `}
    >
      {/* Contenedor de la barra de navegación */}
      <div className="container-fluid flex place-content-between items-center pb-[20px] pt-[20px]">
        {/* Logo y enlace a la página principal */}
        <div className="flex items-center gap-3">
          <img
            src="../../src/assets/icons/IconMain64.png"
            className="filter"
            alt="Logo"
          />
          <Link
            to="/"
            className={`title-text  textNunitoSansBold tracking-tighter text-[21px] transition-all duration-300 
              ${scrolled ? "text-[#333333]" : "text-[#f0f0f0]"}
              ${location.pathname === "/catalogo" ? "text-[#f0f0f0]" : ""}
              `}
          >
            SoundWave
          </Link>
        </div>

        {/* Lista de enlaces en la barra de navegación */}
        <ul className="navbar-nav flex">
          {filteredRoutes.map((route) => (
            <li key={route.path} className="nav-item ps-[40px]">
              <span
                onClick={() => handleScrollToSection(route.path)}
                className={`nav-link 
                  ${scrolled ? "text-[#131313]" : "text-[#f0f0f0]"}
                  ${
                    location.pathname === "/catalogo"
                      ? "text-[#f0f0f0]"
                      : "text-[#131313]"
                  }
                  `}
              >
                {route.name} {/* Aquí se muestra el nombre de cada ruta */}
              </span>
            </li>
          ))}
        </ul>

        {/* Botones de inicio de sesión y registro */}
        {isLoggedIn ? (
          <div className="auth-buttons flex gap-4">

            {user.role != "admin" && (
               <button
               onClick={toggleSidebarVisibility} // Abre o cierra el sidebar
               className="bg-[#ff9500] text-white px-2 py-1 rounded-md"
             >
               <FontAwesomeIcon icon={faCartShopping} /> ({cart.length})
               {/* Muestra la cantidad de productos en el carrito */}
             </button>
              
            )}
           
            <button
              onClick={logout}
              className={`nav-link login-button px-4 py-2
                            ${
                              scrolled && location.pathname !== "/catalogo"
                                ? "text-[#131313] outline-dashed outline-1 outline-[#ff9500] hover:outline-2"
                                : "text-[#f0f0f0] outline-dashed outline-1 outline-[#ff9500] hover:outline-2 hover:outline-[#ffffff]"
                            }
                            ${
                              location.pathname === "/catalogo"
                                ? "text-[#f0f0f0]"
                                : "text-[#131313]"
                            } rounded-[5px]`}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="auth-buttons flex gap-4">
            <Link
              to="/login"
              className={`nav-link login-button px-4 py-2
                        ${
                          scrolled
                            ? "text-[#131313] outline-dashed outline-1 outline-[#ff9500] hover:outline-2"
                            : "text-[#f0f0f0] outline-dashed outline-1 outline-[#ff9500] hover:outline-2 hover:outline-[#ffffff]"
                        } rounded-[5px]`}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className={`nav-link register-button px-4 py-2 
                        ${
                          scrolled
                            ? "text-[#131313] outline-dashed outline-1 outline-[#ff9500] hover:outline-2"
                            : "text-[#f0f0f0] outline-dashed outline-1 outline-[#ff9500] hover:outline-2 hover:outline-[#ffffff]"
                        }  rounded-[5px]`}
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={toggleSidebarVisibility} />}
    </nav>
  );
}
