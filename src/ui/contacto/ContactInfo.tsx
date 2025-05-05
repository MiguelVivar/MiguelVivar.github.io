import React from 'react';
import { motion } from 'framer-motion';
import ContactItem from './ContactItem';

interface ContactInfoItem {
  icono: React.ReactNode;
  titulo: string;
  detalle: string;
  enlace: string;
}

interface ContactInfoProps {
  infoContacto: ContactInfoItem[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ infoContacto }) => {
  // Variantes de animación para contenedores
  const variantesContenedor = {
    oculto: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-neutral-800 to-neutral-800/70 backdrop-blur-sm p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
      variants={variantesContenedor}
      initial="oculto"
      animate="visible"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-emerald-300 to-emerald-100 text-transparent bg-clip-text">
          Información de contacto
        </span>
      </motion.h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {infoContacto.map((item) => (
          <ContactItem
            key={item.titulo}
            icono={item.icono}
            titulo={item.titulo}
            detalle={item.detalle}
            enlace={item.enlace}
          />
        ))}
      </div>

      <motion.div 
        className="mt-8 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-sm text-emerald-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>También puedes encontrarme en mis redes sociales abajo.</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;