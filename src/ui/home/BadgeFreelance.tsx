import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const BadgeFreelance: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-1.5 px-4 py-1 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-400/30 text-emerald-300 text-sm font-medium mb-4 hover:bg-emerald-500/20 transition-colors duration-300 shadow-lg shadow-emerald-700/10"
    >
      <motion.span 
        animate={{ 
          scale: [1, 1.15, 1],
        }} 
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <AiOutlineCheckCircle className="text-emerald-400" />
      </motion.span>
      <span className="relative">
        Disponible para proyectos freelance
        <motion.span 
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-emerald-400/50"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </span>
    </motion.div>
  );
};

export default BadgeFreelance;