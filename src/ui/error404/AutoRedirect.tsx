'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AutoRedirect: React.FC = () => {
  const [countdown, setCountdown] = useState(15);
  
  useEffect(() => {
    // Iniciar cuenta regresiva
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);
  
  return (
    <motion.div 
      className="mt-8 text-sm text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <p className="inline-flex items-center">
        Redirección a la página de inicio en 
        <motion.span 
          className="inline-block ml-2 text-emerald-300 font-mono bg-gray-800 rounded-md px-2 py-1 mx-2"
          key={countdown}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {countdown}
        </motion.span>
        segundos
        <span className="ml-2 inline-block">
          <motion.span 
            className="inline-block w-1 h-1 bg-emerald-300 rounded-full"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </span>
      </p>
    </motion.div>
  );
};

export default AutoRedirect;