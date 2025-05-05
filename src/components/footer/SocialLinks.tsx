import React from 'react';
import { motion } from 'framer-motion';
import { redesSociales } from '../../data/redes';
import { FaEnvelope } from 'react-icons/fa';

const SocialLinks: React.FC = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-5"
    >
      <h3 className="text-lg font-bold text-white relative inline-block">
        Conecta Conmigo
        <motion.span 
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </h3>
      <div className="bg-neutral-900/30 backdrop-blur-sm p-4 rounded-lg border-t-2 border-emerald-500/40">
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {redesSociales.map((red, index) => (
            <motion.a
              key={red.nombre}
              href={red.enlace}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 20px rgba(110, 231, 183, 0.3)" 
              }}
              className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-3 rounded-lg flex items-center justify-center text-emerald-300 hover:text-emerald-100 hover:bg-emerald-600 hover:from-emerald-500 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-neutral-900/40 group"
              aria-label={red.nombre}
            >
              <div className="relative">
                {red.icono}
                <motion.div
                  className="absolute inset-0 bg-emerald-400/20 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
        <div className="pt-2 border-t border-neutral-800/70">
          <p className="text-gray-300 text-sm font-medium mb-2">
            ¿Tienes alguna pregunta o propuesta?
          </p>
          <a 
            href="mailto:miguelvivarfarfan@gmail.com" 
            className="text-emerald-300 hover:text-emerald-200 transition-colors duration-300 flex items-center group"
          >
            <div className="p-2 mr-2 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-300">
              <FaEnvelope className="w-4 h-4" />
            </div>
            <span className="group-hover:underline">miguelvivarfarfan@gmail.com</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialLinks;