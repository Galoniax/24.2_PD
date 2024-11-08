import { Link } from "react-router-dom";
import { Home } from "../../views/home/home";
import { useEffect, useState } from "react";

import './navbar.css'

const routes = [
    { path: "/", name: "Inicio", component: <Home /> },
    { path: "/", name: "Nosotros", component: <Home /> },
    { path: "/", name: "Productos", component: <Home /> },
    { path: "/", name: "Contacto", component: <Home /> },

]
export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <nav className={`navbar w-[100%] fixed z-[100] px-[290px] transition-all duration-300 ${scrolled ? 'bg-[#ebebeb] shadow-xl' : 'bg-transparent'}`}>
            <div className="container-fluid flex place-content-between items-center pb-[20px] pt-[20px]">
                <div className="flex items-center gap-3">
                    <img src="../../src/assets/icons/IconMain64.png" className="filter" alt="Logo" />
                    <Link to="/" className={`title-text textGabarito text-[22px] transition-all duration-300 ${scrolled ? 'text-[#131313]' : 'text-[#f0f0f0]'}`}>SoundWave</Link>
                </div>
                <ul className="navbar-nav flex">
                    {routes.map((route) => (
                        <li className="nav-item ps-[40px]" key={route.path}>
                            <Link to={route.path} className={`nav-link underline underline-offset-[3px] decoration-solid transition-all duration-300 ${scrolled ? 'text-[#131313]' : 'text-[#f0f0f0]'}`}>{route.name}</Link>
                        </li>
                    ))}
                </ul>
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

