import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  // Animación para el icono
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        yoyo: Infinity,
        repeatDelay: 1
      }
    }
  };

  // Animación para el círculo
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 0.1,
      transition: { 
        duration: 1.5 
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center py-16 px-4 bg-neutral-900/60 border border-neutral-800 rounded-lg relative overflow-hidden"
    >
      <motion.div
        variants={circleVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        <div className="w-48 h-48 rounded-full bg-emerald-500/20"></div>
      </motion.div>

      <motion.div
        variants={iconVariants}
        initial="initial"
        animate="animate"
        className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 text-emerald-400"
      >
        <FaSearch className="text-2xl" />
      </motion.div>

      <h3 className="text-xl font-semibold text-neutral-300 mb-3 relative z-10">
        No se encontraron artículos
      </h3>
      
      <p className="text-neutral-400 mb-6 max-w-md mx-auto">
        Intenta cambiar los filtros o términos de búsqueda para encontrar lo que estás buscando.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded transition duration-200 flex items-center mx-auto"
      >
        <FaArrowLeft className="mr-2" />
        Mostrar todos los artículos
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;