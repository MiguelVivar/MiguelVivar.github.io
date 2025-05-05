import React from 'react';
import { motion } from 'framer-motion';

interface ReadingProgressBarProps {
  progress: number; // 0-100
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      {/* Línea primaria de progreso */}
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 rounded-r-full shadow-lg shadow-emerald-500/20"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Efecto brillante animado */}
      {progress > 0 && (
        <motion.div 
          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            left: ['0%', '100%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      )}
      
      {/* Indicador de porcentaje flotante (visible solo cuando hay progreso) */}
      {progress > 0 && (
        <div 
          className="absolute top-2 rounded-full bg-neutral-950 text-emerald-400 text-xs px-2 py-1 shadow-lg border border-neutral-800 transform -translate-y-full opacity-0 hover:opacity-100 transition-opacity"
          style={{ 
            right: `${Math.min(100 - progress + 1, 98)}%`, 
            transform: `translateX(50%) translateY(${progress > 95 ? '0' : '-100%'})` 
          }}
        >
          {Math.round(progress)}%
        </div>
      )}
      
            {/* Opcionalmente, marcas de progreso para secciones importantes */}
            <div className="hidden md:flex absolute top-0 left-0 w-full h-full pointer-events-none">
            </div>
          </div>
        );
      };
      
      export default ReadingProgressBar;