import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import ValueCard from './ValueCard';
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
          <motion.div key={index} variants={item}>
            <ValueCard valor={valor} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ValuesSection;