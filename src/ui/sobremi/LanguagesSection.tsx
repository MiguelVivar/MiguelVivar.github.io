import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import type { IdiomaData } from '../../data/sobremi';
import { FaLanguage, FaStar } from 'react-icons/fa';

interface LanguagesSectionProps {
  idiomas: IdiomaData[];
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ idiomas }) => {
  // Función para renderizar estrellas según nivel de idioma
  const renderLevelStars = (nivel: string) => {
    let stars = 0;
    
    if (nivel.includes("Nativo")) stars = 5;
    else if (nivel.includes("Avanzado")) stars = 4;
    else if (nivel.includes("Intermedio")) stars = 3;
    else if (nivel.includes("Básico")) stars = 2;
    else stars = 1;
    
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar 
        key={i}
        className={`${i < stars ? 'text-emerald-400' : 'text-neutral-600'} transition-colors duration-300`}
      />
    ));
  };

  return (
    <section className="py-16 relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute -z-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] top-1/2 right-0 transform translate-x-1/3"></div>
      
      <SectionTitle title="Mis" highlightedText="Idiomas" />
      
      <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center mb-12 leading-relaxed">
        Habilidades lingüísticas que me permiten comunicarme y colaborar en diferentes entornos.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {idiomas.map((idioma, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-neutral-700/30 p-6 relative group hover:border-emerald-500/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Icono de idioma */}
                <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-neutral-800 border border-emerald-500/20 text-emerald-400 mb-4 group-hover:bg-emerald-500/10 transition-all duration-300">
                  <FaLanguage className="text-3xl" />
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                    {idioma.idioma}
                  </h3>
                  <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 rounded-full">
                    {idioma.nivel}
                  </span>
                </div>
                
                {/* Visualización de nivel con estrellas */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                  className="flex gap-2 mt-3"
                >
                  {renderLevelStars(idioma.nivel)}
                </motion.div>
                
                {/* Barra de progreso */}
                <div className="mt-4 h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: getProgressWidth(idioma.nivel) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
              </div>
              
              {/* Elemento decorativo */}
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-tl from-emerald-500/5 to-transparent rounded-tl-3xl"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Sección para añadir nuevo idioma o mensaje */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 p-6 border border-dashed border-neutral-700 rounded-xl text-center"
        >
          <p className="text-gray-300">
            Actualmente ampliando mis conocimientos en idiomas para mejorar mi comunicación internacional.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Función auxiliar para calcular el ancho de la barra de progreso según el nivel
const getProgressWidth = (nivel: string): string => {
  if (nivel.includes("Nativo")) return "100%";
  else if (nivel.includes("Avanzado")) return "80%";
  else if (nivel.includes("Intermedio")) return "60%";
  else if (nivel.includes("Básico")) return "40%";
  else return "20%";
};

export default LanguagesSection;