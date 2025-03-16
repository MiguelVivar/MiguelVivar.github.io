'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Cerrar el menú al cambiar de ruta
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);
    
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const links = [
      { href: "/", label: "Inicio" },
      { href: "/sobremi", label: "Sobre Mí" },
      { href: "/habilidades", label: "Habilidades" },
      { href: "/proyectos", label: "Proyectos" },
    ];
    return (
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-2 left-2 right-2 bg-neutral-900/95 backdrop-blur-sm z-50 shadow-xl shadow-emerald-500/10 rounded-xl border border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo mi portafolio */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-emerald-300 font-bold"
            >
              <Link href="/" className="flex items-center">
                <div className="relative w-10 h-10">
                  <Image 
                    src="/logo.svg" 
                    alt="Logo Miguel Vivar" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </motion.div>
            
            {/* Menú de navegación para pantallas medianas y grandes */}
            <div className="hidden md:flex items-center space-x-4">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className="relative px-3 py-2 text-xl font-bold group"
                >
                  <span className={`transition-colors duration-300 ${
                    pathname === link.href 
                      ? 'text-emerald-300' 
                      : 'text-gray-400 group-hover:text-emerald-300'
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-300 transform origin-left transition-transform duration-300 ease-out
                    ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
                  </span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: links.length * 0.1 }}
              className="hidden md:block"
            >
              <Link 
                href="/contacto"
                className={`px-4 py-2 text-xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105
                  ${pathname === '/contacto'
                    ? 'bg-emerald-300 text-neutral-800 shadow-emerald-500/50 shadow-lg'
                    : 'border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-neutral-800 hover:shadow-lg hover:shadow-emerald-500/50'
                  }`}
              >
                Contacto
              </Link>
            </motion.div>
            </div>
            
            {/* Botón de menú hamburguesa para móviles */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="relative z-50 text-emerald-300 hover:text-emerald-400 focus:outline-none w-10 h-10 flex items-center justify-center"
                aria-label="Menú principal"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                  <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Menú móvil - Slide down panel instead of full overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
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
                        className={`block py-3 text-2xl font-bold transition-all duration-300 ${pathname === link.href ? 'text-emerald-300' : 'text-gray-300 hover:text-emerald-300'}`}
                      >
                        {link.label}
                        {pathname === link.href && (
                          <motion.div 
                            className="h-0.5 bg-emerald-300 mt-1 mx-auto" 
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
                        className={`inline-flex items-center justify-center px-6 py-3 rounded-lg text-lg font-bold transition-all duration-300 w-full ${pathname === '/contacto' ? 'bg-emerald-300 text-neutral-800' : 'border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-neutral-800'}`}
                      >
                        Contacto
                      </Link>
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
  