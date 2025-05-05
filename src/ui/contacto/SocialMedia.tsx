import React from 'react';
import { motion } from 'framer-motion';
import ContactItem from './ContactItem';
import { redesSociales } from '../../data/redes';

const SocialMedia: React.FC = () => {
  // Variantes de animación para contenedores
  const variantesContenedor = {
    oculto: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-neutral-800 to-neutral-800/70 backdrop-blur-sm p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
      variants={variantesContenedor}
      initial="oculto"
      animate="visible"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-emerald-300 to-emerald-100 text-transparent bg-clip-text">
          Conecta conmigo
        </span>
      </motion.h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {redesSociales.map((red) => (
          <ContactItem
            key={red.nombre}
            icono={red.icono}
            titulo={red.nombre}
            detalle={red.usuario}
            enlace={red.enlace}
          />
        ))}
      </div>

      <motion.div 
        className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-neutral-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {redesSociales.map((red) => (
          <motion.a 
            key={`icon-${red.nombre}`}
            href={red.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:scale-125"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            {red.icono}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SocialMedia;