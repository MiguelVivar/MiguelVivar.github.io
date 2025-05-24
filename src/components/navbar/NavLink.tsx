'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon: Icon, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Efectos de fondo que no interferirán con el clic */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div 
            className="absolute inset-0 bg-emerald-300/5 rounded-lg pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Indicador activo mejorado */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent rounded-full pointer-events-none"
        initial={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        animate={isActive || isHovered 
          ? { scaleX: 1, opacity: 1 } 
          : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Brillo superior en enlaces activos */}
      {isActive && (
        <motion.div 
          className="absolute -top-1 left-3 right-3 h-px bg-emerald-300/30 pointer-events-none"
          layoutId={`top-glow-${href}`}
        />
      )}
      
      {/* Efecto de resplandor */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-lg bg-emerald-300/5 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Link principal que ahora puede recibir clics */}
      <Link 
        href={href}
        className="relative px-3 py-2 text-xl font-bold group flex items-center z-10"
        aria-current={isActive ? "page" : undefined}
      >
        <span className={`transition-colors duration-300 flex items-center ${
          isActive 
            ? 'text-emerald-300' 
            : 'text-gray-400 group-hover:text-emerald-300'
        }`}>
          <motion.div
                        animate={isHovered ? { 
              y: [0, -1, 0, 1, 0], 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            } : {}}
            transition={isHovered ? { 
              duration: 1, 
              repeat: Infinity,
              repeatType: "loop" 
            } : {}}
            className="mr-1.5"
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-gray-400 group-hover:text-emerald-300'}`} />
          </motion.div>
          {label}
        </span>
      </Link>
    </motion.div>
  );
};

export default NavLink;