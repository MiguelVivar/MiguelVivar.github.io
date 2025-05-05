import React from 'react';
import { motion } from 'framer-motion';

const Greeting: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-lg sm:text-xl text-gray-200 mb-1 flex items-center gap-2 justify-center md:justify-start"
    >
      <span className="relative">
        ¡Hola! 
        <motion.span 
          className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
      </span>
      <motion.div
        animate={{ 
          rotate: [0, 15, -5, 15, 0],
          scale: [1, 1.2, 1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.5
        }}
        style={{ originX: 0.7, originY: 0.7 }}
        className="inline-block p-1 rounded-full shadow-lg"
      >
        👋
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent font-medium"
      >
        Soy
      </motion.span>
    </motion.div>
  );
};

export default Greeting;