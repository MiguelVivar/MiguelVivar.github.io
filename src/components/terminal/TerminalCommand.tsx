import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';

interface TerminalCommandProps {
  command: string;
  output: ReactNode;
  isError?: boolean;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({ command, output, isError = false }) => {
  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Comando ingresado */}
      <div className="flex items-center gap-2">
        <span className="text-emerald-400">
          <FaChevronRight size={14} />
        </span>
        <span className="font-mono text-gray-200">{command}</span>
      </div>
      
      {/* Resultado */}
      <div className={`pl-5 ${isError ? 'text-red-400' : 'text-gray-300'}`}>
        {output}
      </div>
    </motion.div>
  );
};

export default TerminalCommand;