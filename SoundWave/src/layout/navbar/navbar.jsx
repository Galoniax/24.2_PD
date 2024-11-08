import { Link } from "react-router-dom"; // Importa el componente Link de React Router, que permite crear enlaces de navegación en la SPA (Single Page Application)
import { useEffect, useState } from "react"; // Importa los hooks de React para manejar efectos secundarios y estado
import { NAVBAR_ROUTES } from "../../constants/navbar-routes"; // Importa la constante que contiene las rutas de la barra de navegación
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router para redirigir al usuario a diferentes rutas

import './navbar.css' // Importa los estilos CSS para la barra de navegación

export function Navbar() {
    const navigate = useNavigate(); // Crea una instancia de useNavigate, que permite navegar a diferentes rutas de la aplicación
    const [scrolled, setScrolled] = useState(false); // Inicializa el estado 'scrolled' para saber si el usuario ha desplazado la página

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
    }, []); // El array vacío significa que este efecto solo se ejecutará una vez, al montar el componente

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

    return (
        <nav className={`navbar w-[100%] fixed z-[100] px-[290px] transition-all duration-300 ${scrolled ? 'bg-[#ebebeb] shadow-xl' : 'bg-transparent'}`}>
            {/* Contenedor de la barra de navegación */}
            <div className="container-fluid flex place-content-between items-center pb-[20px] pt-[20px]">
                {/* Logo y enlace a la página principal */}
                <div className="flex items-center gap-3">
                    <img src="../../src/assets/icons/IconMain64.png" className="filter" alt="Logo" /> 
                    <Link to="/" className={`title-text textGabarito text-[22px] transition-all duration-300 ${scrolled ? 'text-[#131313]' : 'text-[#f0f0f0]'}`}>SoundWave</Link>
                </div>

                {/* Lista de enlaces en la barra de navegación */}
                <ul className="navbar-nav flex">
                    {NAVBAR_ROUTES.map((route) => (
                        <li key={route.path} className="nav-item ps-[40px]">
                            <span onClick={() => handleScrollToSection(route.path)} className={`nav-link ${scrolled ? 'text-[#131313]' : 'text-[#f0f0f0]'}`}>
                                {route.name} {/* Aquí se muestra el nombre de cada ruta */}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Sección de botones de autenticación */}
                <div className="auth-buttons flex gap-4">
                    <Link to="/login" className={`nav-link login-button px-4 py-2
                        ${scrolled 
                            ? 'text-[#131313] outline-dashed outline-1 outline-[#ff9500] hover:outline-2' 
                            : 'text-[#f0f0f0] outline-dashed outline-1 outline-[#ff9500] hover:outline-2 hover:outline-[#ffffff]'
                        } rounded-[5px]`}>
                        Iniciar Sesión
                    </Link>
                    <Link to="/register" className={`nav-link register-button px-4 py-2 
                        ${scrolled 
                            ? 'text-[#131313] outline-dashed outline-1 outline-[#ff9500] hover:outline-2' 
                            : 'text-[#f0f0f0] outline-dashed outline-1 outline-[#ff9500] hover:outline-2 hover:outline-[#ffffff]'
                        }  rounded-[5px]`}>
                        Registrarse
                    </Link>
                </div>
            </div>
        </nav>
    )
}