'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
      setIsMenuOpen(false);
  }, [pathname]);
  
  // Detectar scroll para cambiar apariencia del navbar
  useEffect(() => {
      const handleScroll = () => {
          setScrolled(window.scrollY > 20);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
          document.body.style.overflow = 'unset';
      };
  }, []);
  
  // Bloquear scroll cuando el menú está abierto en móvil
  useEffect(() => {
      if (isMenuOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };
  
  const links = [
    { 
      href: "/", 
      label: "Inicio",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    { 
      href: "/sobremi", 
      label: "Sobre Mí",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      href: "/habilidades", 
      label: "Habilidades",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    { 
      href: "/proyectos", 
      label: "Proyectos",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
  ];
  
  // Variantes para animaciones
  const navVariants = {
      hidden: { y: -100, opacity: 0 },
      visible: { 
          y: 0, 
          opacity: 1,
          transition: { 
              duration: 0.5,
              staggerChildren: 0.1
          }
      }
  };
  
  const itemVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.nav 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-2 left-2 right-2 z-50 rounded-xl border border-neutral-800 transition-all duration-300 ${
          scrolled 
              ? 'bg-neutral-900/95 backdrop-blur-md shadow-lg shadow-emerald-500/20' 
              : 'bg-neutral-900/80 backdrop-blur-sm shadow-xl shadow-emerald-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo mi portafolio */}
          <motion.div
            variants={itemVariants}
            className="text-emerald-300 font-bold"
          >
            <Link href="/" className="flex items-center group" aria-label="Inicio">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/logo.svg" 
                  alt="Logo Miguel Vivar" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="ml-2 text-lg font-bold hidden sm:block text-white">Miguel <span className="text-emerald-300">Vivar</span></p>
            </Link>
          </motion.div>
          
          {/* Menú de navegación para pantallas medianas y grandes */}
          <div className="hidden md:flex items-center space-x-4">
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              variants={itemVariants}
              custom={index}
            >
              <Link 
                href={link.href}
                className="relative px-3 py-2 text-xl font-bold group flex items-center"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                <span className={`transition-colors duration-300 flex items-center ${
                  pathname === link.href 
                    ? 'text-emerald-300' 
                    : 'text-gray-400 group-hover:text-emerald-300'
                }`}>
                  {link.icon}
                  {link.label}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-300 transform origin-left transition-transform duration-300 ease-out
                  ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
                </span>
              </Link>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            custom={links.length}
            className="hidden md:block"
          >
            <Link 
              href="/contacto"
              className={`px-4 py-2 text-xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center
                ${pathname === '/contacto'
                  ? 'bg-emerald-300 text-neutral-800 shadow-emerald-500/50 shadow-lg'
                  : 'border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-neutral-800 hover:shadow-lg hover:shadow-emerald-500/50'
                }`}
              aria-current={pathname === '/contacto' ? "page" : undefined}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Contacto
            </Link>
          </motion.div>
          </div>
          
          {/* Botón de menú hamburguesa para móviles */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="relative z-50 text-white hover:text-emerald-400 focus:outline-none w-10 h-10 flex items-center justify-center"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 right-0 bg-neutral-900/98 backdrop-blur-md z-40 md:hidden flex flex-col items-center overflow-hidden rounded-b-xl border-t border-neutral-800"
            >
              <motion.div 
                className="w-full max-w-md px-6 py-10 flex flex-col items-center justify-center space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-center py-3 text-2xl font-bold transition-all duration-300 ${pathname === link.href ? 'text-emerald-300' : 'text-gray-300 hover:text-emerald-300'}`}
                      aria-current={pathname === link.href ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                      {pathname === link.href && (
                        <motion.div 
                          className="h-0.5 bg-emerald-300 mt-1 mx-auto absolute bottom-0 left-1/3 right-1/3" 
                          layoutId="underline"
                          initial={{ width: 0 }}
                          animate={{ width: '30%' }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="flex flex-col space-y-4 w-full items-center pt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + (links.length + 2) * 0.1 }}
                    className="w-full text-center"
                  >
                    <Link
                      href="/contacto"
                      className={`inline-flex items-center justify-center px-6 py-3 rounded-lg text-lg font-bold transition-all duration-300 w-full ${
                        pathname === '/contacto' 
                          ? 'bg-emerald-300 text-neutral-800 shadow-lg shadow-emerald-500/30' 
                          : 'border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-neutral-800 hover:shadow-lg hover:shadow-emerald-500/30'
                      }`}
                      aria-current={pathname === '/contacto' ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      Contacto
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex space-x-6 mt-8 text-gray-400"
                  >
                    <a href="https://github.com/MiguelVivar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" 
                        className="hover:text-emerald-300 transition-colors transform hover:scale-110 flex items-center justify-center">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://linkedin.com/in/miguel-vivar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" 
                        className="hover:text-emerald-300 transition-colors transform hover:scale-110 flex items-center justify-center">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                      </svg>
                    </a>
                    <a href="mailto:contacto@miguelvivar.com" target="_blank" rel="noopener noreferrer" aria-label="Email" 
                        className="hover:text-emerald-300 transition-colors transform hover:scale-110 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
  