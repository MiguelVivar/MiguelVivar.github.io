'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import type { CertificadoData } from '../../data/sobremi';
import { FaMedal, FaExternalLinkAlt } from 'react-icons/fa';

interface CertificatesSectionProps {
  certificados: CertificadoData[];
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificados }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
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
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute -z-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[130px] top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute -z-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] bottom-0 right-0"></div>
      
      <SectionTitle title="Mis" highlightedText="Certificados" />
      
      <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center mb-12 leading-relaxed">
        Formación continua y aprendizaje constante que respaldan mi experiencia profesional y conocimientos técnicos.
      </p>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {certificados.map((categoria, categoriaIndex) => (
          <div key={categoriaIndex} className="mb-14 last:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaMedal className="text-emerald-400" /> {categoria.categoria}
              </h3>
              <div className="flex-grow h-px bg-gradient-to-r from-emerald-500/40 to-transparent"></div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {categoria.certificados.map((certificado, index) => {
                const globalIndex = categoriaIndex * 10 + index;
                return (
                  <motion.a
                    key={index}
                    href={certificado.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={item}
                    onMouseEnter={() => setHoveredCard(globalIndex)}
                    onMouseLeave={() => setHoveredCard(null)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/30 hover:border-emerald-500/30 rounded-xl overflow-hidden relative group"
                  >
                    {/* Efecto de brillo en el borde */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    
                    <div className="relative p-6 flex flex-col h-full">
                      {/* Año del certificado con estilo de badge */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 rounded-full">
                          {certificado.anio}
                        </span>
                        <motion.div
                          animate={{ 
                            scale: hoveredCard === globalIndex ? [1, 1.1, 1] : 1,
                            rotate: hoveredCard === globalIndex ? [0, -10, 10, 0] : 0
                          }}
                          transition={{ duration: 0.5, repeat: hoveredCard === globalIndex ? Infinity : 0, repeatDelay: 1 }}
                          className="text-emerald-300"
                        >
                          <FaExternalLinkAlt className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      </div>
                      
                      {/* Título del certificado */}
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                        {certificado.titulo}
                      </h4>
                      
                      {/* Emisor del certificado */}
                      <p className="text-gray-300 mb-4">
                        {certificado.emisor}
                      </p>
                      
                      {/* Indicador de enlace visible en hover */}
                      <div className="mt-auto flex items-center text-sm text-gray-400 group-hover:text-emerald-300 transition-colors duration-300">
                        <span className="mr-1">Ver certificado</span>
                        <FaExternalLinkAlt size={12} />
                      </div>
                      
                      {/* Decoración */}
                      <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-3xl"></div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default CertificatesSection;