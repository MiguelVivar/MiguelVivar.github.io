'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isMenuOpen, toggleMenu } from './store';

const MobileToggle: React.FC = () => {
  const menuOpen = useStore(isMenuOpen);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="lg:hidden flex items-center">
      <motion.button
        onClick={toggleMenu}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative z-50 focus:outline-none w-12 h-12 flex items-center justify-center rounded-full mr-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        {/* Fondo animado del botón */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-300/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        
        {/* Efecto de resplandor en hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-300/5 blur-md -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        
        <div className="relative w-6 h-4">
          {/* Línea superior */}
          <motion.span 
            className="absolute h-0.5 w-6 bg-current rounded-full"
            animate={{ 
              top: menuOpen ? "50%" : "0%",
              rotate: menuOpen ? 45 : 0,
              translateY: menuOpen ? "-50%" : "0%",
              backgroundColor: isHovered ? "#6ee7b7" : menuOpen ? "#6ee7b7" : "#ffffff"
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Línea media */}
          <motion.span 
            className="absolute h-0.5 w-6 bg-current rounded-full top-1/2 -translate-y-1/2"
            animate={{ 
              scaleX: menuOpen ? 0 : 1,
              opacity: menuOpen ? 0 : 1,
              backgroundColor: isHovered ? "#6ee7b7" : "#ffffff"
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Línea inferior */}
          <motion.span 
            className="absolute h-0.5 w-6 bg-current rounded-full"
            animate={{ 
              bottom: menuOpen ? "50%" : "0%",
              rotate: menuOpen ? -45 : 0,
              translateY: menuOpen ? "50%" : "0%",
              backgroundColor: isHovered ? "#6ee7b7" : menuOpen ? "#6ee7b7" : "#ffffff"
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>
    </div>
  );
};

export default MobileToggle;