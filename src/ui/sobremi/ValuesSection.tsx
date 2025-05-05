import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import type { ValorData } from '../../data/sobremi';

interface ValuesProps {
  valores: ValorData[];
}

const ValuesSection: React.FC<ValuesProps> = ({ valores }) => {
  // Variantes para animaciones
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      } 
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 relative"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute -z-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[120px] top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute -z-10 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] bottom-0 right-0 transform translate-x-1/4 translate-y-1/4"></div>
      
      {/* Título de la sección */}
      <SectionTitle title="Mis" highlightedText="Valores" />
      
      <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center mb-12 leading-relaxed">
        Estos son los principios que guían mi trabajo diario como desarrollador y que me impulsan a crecer profesionalmente.
      </p>
      
      {/* Grid de valores con efectos visuales mejorados */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {valores.map((valor, index) => (
          <motion.div 
            key={index} 
            variants={item}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)"
            }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/30 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Efecto de gradiente en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Círculo decorativo */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-300"></div>
            
            {/* Contenido del valor */}
            <div className="relative z-10">
              {/* Icono con efectos */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0.5 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl bg-neutral-800 border border-emerald-500/20 text-emerald-400 mb-4 group-hover:bg-emerald-500/10 group-hover:text-emerald-300 transition-all duration-300"
              >
                {valor.icono}
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                {valor.titulo}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {valor.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ValuesSection;