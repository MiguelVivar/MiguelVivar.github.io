'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isMenuOpen, isScrolled, setupScrollDetection } from './store';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import MobileToggle from './MobileToggle';
import MobileMenu from './MobileMenu';
import { FaHome, FaUser, FaProjectDiagram, FaCode, FaBook } from 'react-icons/fa';
import { IconType } from 'react-icons';

const Navbar: React.FC = () => {
  // Usar los estados globales
  const menuOpen = useStore(isMenuOpen);
  const scrolled = useStore(isScrolled);
  // Controles para animaciones adicionales
  const controls = useAnimation();
  // Efecto de hover para la barra
  const [hovered, setHovered] = useState(false);
  // Obtener la ruta actual usando el hook de Next.js
  const pathname = usePathname();
  
  // Array de enlaces
  const links: { href: string; label: string; icon: IconType }[] = [
    { href: '/', label: 'Inicio', icon: FaHome },
    { href: '/sobremi', label: 'Sobre Mí', icon: FaUser },
    { href: '/habilidades', label: 'Habilidades', icon: FaCode },
    { href: '/proyectos', label: 'Proyectos', icon: FaProjectDiagram },
    { href: '/blog', label: 'Blog', icon: FaBook }
  ];

  // Configurar detección de scroll
  useEffect(() => {
    const cleanup = setupScrollDetection();
    return cleanup;
  }, []);

  // Efecto para animar la barra cuando se hace scroll
  useEffect(() => {
    if (scrolled) {
      controls.start({
        scale: 0.99,
        transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 }
      });
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 }
      });
    }
  }, [scrolled, controls]);

  // Emitir evento custom cuando cambia el estado del menú
  useEffect(() => {
    const event = new CustomEvent('menu-toggle', { 
      detail: { isOpen: menuOpen }
    });
    document.dispatchEvent(event);
  }, [menuOpen]);

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

  // Normalizar la ruta actual para la comparación
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1)  // Quitar la barra final si existe
    : pathname;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.nav 
        animate={controls}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`relative rounded-xl border transition-all duration-500 ${
          scrolled 
            ? 'border-neutral-800/70 bg-gradient-to-b from-neutral-900/95 to-neutral-900/90 backdrop-blur-md shadow-lg shadow-emerald-500/10' 
            : 'border-neutral-800/40 bg-gradient-to-b from-neutral-900/80 to-neutral-900/70 backdrop-blur-sm'
        } ${hovered ? 'shadow-xl shadow-emerald-500/20' : ''}`}
      >
        {/* Efecto de brillo en la parte superior */}
        <div className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-90' : 'opacity-40'}`}></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <DesktopMenu links={links} currentPath={normalizedPath} />
            <MobileToggle />
          </div>
          
          <MobileMenu 
            links={links} 
            currentPath={normalizedPath}
            isOpen={menuOpen} 
          />
        </div>
        
        {/* Efecto de línea de brillo en la parte inferior */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
};

export default Navbar;