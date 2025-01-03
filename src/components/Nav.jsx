import Logo from '../assets/logo.svg'
import { useState } from 'react'

function Nav() {
    function handleBurger() {
        let $el = document.querySelector('.navbar-burger');
        const target = $el.dataset.target;
        const $target = document.getElementById(target);

        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    }

    const [theme, setTheme] = useState("dark"); // Estado para el tema por defecto
    // Cambiar el tema
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"; // Alterna entre 'light' y 'dark'
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme); // Cambia el atributo data-theme
    };

    return (
        <nav className="navbar is-size-5 is-uppercase has-shadow text-light is-fixed-top">
            <div className="navbar-brand">
                <a className="navbar-item" href="#">
                    <img src={Logo} alt="logo"/>
                </a>
                <a role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false" onClick={handleBurger}>
                    {theme === "light" ? (
                        <div className='has-text-black'>
                            <span aria-hidden="true" className='el'></span>
                            <span aria-hidden="true" className='el'></span>
                            <span aria-hidden="true" className='el'></span>
                            <span aria-hidden="true" className='el'></span>
                        </div>
                    ) : (
                        <div className='has-text-white'>
                            <span aria-hidden="true" className='el'></span>
                            <span aria-hidden="true" className='el'></span>
                            <span aria-hidden="true" className='el'></span>
                            <span aria-hidden="true" className='el'></span>
                        </div> 
                    )}
                </a>
            </div>
            <div className="navbar-menu" id="navMenu">
                <div className="navbar-start">
                    <a href="#inicio" className="navbar-item">
                        Inicio
                    </a>
                    <a href="#sobre_mi" className="navbar-item">
                        Sobre Mí
                    </a>
                    <a href="#habilidades" className="navbar-item">
                        Habilidades
                    </a>
                    <a href="#proyectos" className="navbar-item">
                        Proyectos
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item is-flex"> 
                        <button href="#cambiarTema" className="button is-size-5 is-rounded" onClick={toggleTheme}>
                            {theme === "light" ? (
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokelinecap="round" strokelinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path> </svg> 
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokelinecap="round" strokelinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path> <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path> <path d="M19 11h2m-1 -1v2"></path> </svg> 
                            )}
                        </button>
                        <a href="#contacto" className="button is-primary is-outlined is-size-5">
                            Contacto
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav