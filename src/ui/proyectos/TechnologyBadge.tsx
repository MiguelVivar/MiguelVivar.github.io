import React from 'react';
import { motion } from 'framer-motion';

interface TechnologyBadgeProps {
  tech: {
    nombre: string;
    icono: React.ReactNode;
  };
  mini?: boolean;
}

const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({ tech, mini = false }) => {
  if (mini) {
    return (
      <motion.span 
        className="inline-flex items-center justify-center bg-neutral-700 p-1 rounded text-xs text-emerald-300 hover:bg-neutral-600 transition-colors duration-200"
        title={tech.nombre}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {tech.icono}
      </motion.span>
    );
  }

  return (
    <motion.span 
      className="inline-flex items-center gap-1 bg-neutral-700 px-2 py-1 rounded text-xs text-gray-300 hover:bg-neutral-600 transition-colors duration-200"
      title={tech.nombre}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-emerald-300">{tech.icono}</span>
      {tech.nombre}
    </motion.span>
  );
};

export default TechnologyBadge;