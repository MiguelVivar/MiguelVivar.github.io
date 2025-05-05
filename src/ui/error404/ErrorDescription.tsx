import React from 'react';
import { motion } from 'framer-motion';

const ErrorDescription: React.FC = () => {
  return (
    <motion.p 
      className="text-lg text-gray-400 max-w-3xl mx-auto mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
    </motion.p>
  );
};

export default ErrorDescription;