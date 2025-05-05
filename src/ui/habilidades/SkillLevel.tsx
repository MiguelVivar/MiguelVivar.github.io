import React from 'react';
import { motion } from 'framer-motion';
import { obtenerColorNivel } from '../../data/habilidades';

interface SkillLevelProps {
  nivel: string;
  index: number;
}

const SkillLevel: React.FC<SkillLevelProps> = ({ nivel, index }) => {
  return (
    <motion.span 
      className={`px-3 py-1 rounded-full text-xs font-semibold text-neutral-900 ${obtenerColorNivel(nivel)}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + (index * 0.1) }}
    >
      {nivel}
    </motion.span>
  );
};

export default SkillLevel;