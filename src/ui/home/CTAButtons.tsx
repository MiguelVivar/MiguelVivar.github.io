import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaEnvelope } from 'react-icons/fa';

const CTAButtons: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8 justify-center md:justify-start"
    >
      <motion.div className="relative group">
        <motion.span 
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-300 opacity-70 blur-lg group-hover:opacity-100 transition-all duration-500"
          animate={{ 
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
          }}
        ></motion.span>
        <a 
          href="/proyectos"
          className="group relative px-6 py-3 bg-neutral-800 border-2 border-emerald-400 text-emerald-300 rounded-lg font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center overflow-hidden z-10"
        >
          <span className="relative z-10">Ver Proyectos</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ mixBlendMode: 'overlay' }}
          ></motion.div>
          <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
        </a>
      </motion.div>
      
      <motion.div className="relative">
        <a 
          href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2" 
          className="group px-6 py-3 border-2 border-emerald-400/70 text-emerald-300 rounded-lg font-bold hover:bg-emerald-400/10 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-sm shadow-md"
          target='_blank'
          rel="noopener noreferrer"
        >
          <span>Descargar CV</span>
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaDownload className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>
      
      <motion.div className="relative">
        <motion.span 
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-70 blur-sm"
          animate={{ 
            scale: [1, 1.05, 1] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        ></motion.span>
        <a 
          href="/contacto"
          className="relative px-6 py-3 bg-emerald-500 text-neutral-900 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <span>Contactar</span>
          <FaEnvelope className="w-4 h-4" />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default CTAButtons;