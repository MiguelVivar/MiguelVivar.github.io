import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';

interface TypewriterRoleProps {
  roles: string[];
}

const TypewriterRole: React.FC<TypewriterRoleProps> = ({ roles }) => {
  const { text: rolTexto, showCursor } = useTypewriter(roles, 100, 75, 1500);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="text-xl sm:text-2xl text-gray-300 mb-4 flex items-center gap-2 font-medium"
    >
      <span>Desarrollador</span>
      <div className="relative px-3 py-1">
        {/* Animated background for the role */}
        <motion.div 
          className="absolute inset-0 bg-emerald-900/20 rounded-md -z-10"
          animate={{ 
            boxShadow: [
              "0 0 8px 2px rgba(52, 211, 153, 0.1)", 
              "0 0 12px 4px rgba(52, 211, 153, 0.2)", 
              "0 0 8px 2px rgba(52, 211, 153, 0.1)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>
        
        <span className="text-emerald-400 font-bold">
          {rolTexto}
          <span 
            className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 text-emerald-300 animate-pulse`}
          >
            |
          </span>
        </span>
      </div>
    </motion.div>
  );
};

export default TypewriterRole;