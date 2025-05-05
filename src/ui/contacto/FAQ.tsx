'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItemProps {
  pregunta: string;
  respuesta: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ pregunta, respuesta }) => {
  const [estaAbierto, setEstaAbierto] = useState(false);

  return (
    <motion.div 
      className="border-b border-neutral-700 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setEstaAbierto(!estaAbierto)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className="text-lg font-medium text-white">{pregunta}</h3>
        <motion.div
          animate={{ rotate: estaAbierto ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-emerald-300 transition-all" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {estaAbierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-neutral-300">{respuesta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const preguntas = [
    {
      pregunta: "¿Qué servicios ofreces?",
      respuesta: "Ofrezco servicios de desarrollo web frontend y backend, creación de aplicaciones web interactivas, diseño de interfaces, optimización de rendimiento y consultoría en tecnologías web modernas."
    },
    {
      pregunta: "¿Cuál es tu proceso de trabajo?",
      respuesta: "Mi proceso incluye una fase inicial de descubrimiento para entender tus necesidades, seguido de planificación, diseño, desarrollo, pruebas y finalmente implementación. Mantengo una comunicación constante durante todo el proceso."
    },
    {
      pregunta: "¿Cuánto tiempo toma desarrollar un proyecto?",
      respuesta: "El tiempo de desarrollo varía según la complejidad y alcance del proyecto. Un sitio web básico puede tomar 2-3 semanas, mientras que aplicaciones más complejas pueden requerir varios meses. Siempre proporciono un cronograma detallado antes de comenzar."
    },
    {
      pregunta: "¿Ofreces mantenimiento después del lanzamiento?",
      respuesta: "Sí, ofrezco planes de mantenimiento para asegurar que tu proyecto siga funcionando correctamente. Esto incluye actualizaciones de seguridad, corrección de errores y pequeñas mejoras según sea necesario."
    },
  ];

  return (
    <motion.div 
      className="bg-gradient-to-br from-neutral-800 to-neutral-800/70 backdrop-blur-sm p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-emerald-300 to-emerald-100 text-transparent bg-clip-text">
          Preguntas frecuentes
        </span>
      </motion.h2>
      
      <div className="space-y-1">
        {preguntas.map((item, index) => (
          <FAQItem 
            key={index} 
            pregunta={item.pregunta} 
            respuesta={item.respuesta} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;