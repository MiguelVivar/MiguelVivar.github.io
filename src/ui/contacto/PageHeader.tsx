import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const PageHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-2"
      >
        <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-500/20">
          Hablemos
        </span>
      </motion.div>
      
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="inline-block relative">
          <span className="relative z-10">Contacta</span>
          <motion.span 
            className="absolute bottom-2 left-0 w-full h-3 bg-emerald-500/30 rounded-sm -z-10"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.span>
        </span>{" "}
        <span className="text-gradient bg-gradient-to-r from-emerald-400 to-emerald-200">Conmigo</span>
      </motion.h1>
      
      <motion.div 
        className="flex items-center justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="h-px w-10 bg-emerald-500/50"></span>
        <FaEnvelope className="mx-4 text-emerald-400" />
        <span className="h-px w-10 bg-emerald-500/50"></span>
      </motion.div>
      
      <motion.p 
        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Estoy interesado en <span className="text-emerald-300 font-medium">oportunidades freelance</span> y colaboraciones.
        Si tienes una pregunta o propuesta, no dudes en ponerte en contacto conmigo.
      </motion.p>

      <style jsx>{`
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default PageHeader;