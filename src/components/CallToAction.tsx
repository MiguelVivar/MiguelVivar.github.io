'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CallToActionProps {
  title: string;
  titlespan: string;
  description: string;
  buttonPrimaryText: string;
  buttonSecondaryText: string;
  buttonPrimaryIcon: React.ReactNode;
  buttonSecundaryIcon: React.ReactNode;
  buttonPrimaryLink?: string;
  buttonSecondaryLink?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ 
  title, 
  titlespan, 
  description, 
  buttonPrimaryText, 
  buttonSecondaryText, 
  buttonPrimaryIcon, 
  buttonSecundaryIcon,
  buttonPrimaryLink = "https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2",
  buttonSecondaryLink = "/proyectos" 
}) => {
  const [hoveredButton, setHoveredButton] = useState<'primary' | 'secondary' | null>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 z-0"></div>
      <div className="absolute inset-0 bg-[url('/path-to-subtle-pattern.png')] opacity-5 mix-blend-soft-light z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] transform translate-x-1/4 -translate-y-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] transform -translate-x-1/4 translate-y-1/4 z-0"></div>
      
      {/* Líneas decorativas animadas */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 py-12 px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            <span className="text-white">{title}</span>{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400"
              animate={{ 
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{
                backgroundSize: "200% auto"
              }}
            >
              {titlespan}
            </motion.span>
            <span className="text-white">?</span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Botón secundario */}
            <motion.div
              onMouseEnter={() => setHoveredButton('secondary')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-200 ${hoveredButton === 'secondary' ? 'animate-pulse' : ''}`}></div>
              <a 
                href={buttonSecondaryLink}
                className="relative px-7 py-4 bg-neutral-800 border border-emerald-300/20 rounded-lg text-emerald-300 font-medium flex items-center gap-3 transition-all duration-300 group-hover:border-emerald-300/50"
              >
                <motion.span 
                  animate={{ 
                    rotate: hoveredButton === 'secondary' ? [0, -10, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-xl"
                >
                  {buttonSecundaryIcon}
                </motion.span>
                <span>{buttonSecondaryText}</span>
              </a>
            </motion.div>
            
            {/* Botón primario */}
            <motion.div
              onMouseEnter={() => setHoveredButton('primary')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-70 group-hover:opacity-80 transition duration-200 ${hoveredButton === 'primary' ? 'animate-pulse' : ''}`}></div>
              <a 
                href={buttonPrimaryLink}
                className="relative px-7 py-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-neutral-900 rounded-lg font-bold flex items-center gap-3 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.span 
                  animate={{ 
                    rotate: hoveredButton === 'primary' ? [0, -10, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-xl"
                >
                  {buttonPrimaryIcon}
                </motion.span>
                <span>{buttonPrimaryText}</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Esquinas decorativas */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-emerald-500/30 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-emerald-500/30 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-emerald-500/30 rounded-br-lg"></div>
    </motion.div>
  );
};

export default CallToAction;