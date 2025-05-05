import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding } from 'react-icons/fa';
import { FaFolderOpen } from 'react-icons/fa6';
import TimelineItem from './TimelineItem';

const TimelineExperience: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/30 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-500"
    >
      {/* Encabezado con efecto de resplandor */}
      <div className="relative mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20"></div>
        <div className="relative bg-neutral-800 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-lg text-neutral-900 shadow-lg shadow-emerald-500/30 transform rotate-3">
            <FaBriefcase className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Experiencia Profesional</h3>
            <p className="text-gray-400 text-sm">Trayectoria laboral y proyectos</p>
          </div>
        </div>
      </div>
      
      {/* Línea de tiempo con indicadores animados */}
      <div className="relative pl-8 border-l-2 border-emerald-300/30 space-y-10">
        {/* Elementos decorativos en la línea de tiempo */}
        <motion.div 
          className="absolute -left-1.5 top-12 w-3 h-3 rounded-full bg-emerald-300/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -left-1 top-1/3 w-2 h-2 rounded-full bg-emerald-300/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div 
          className="absolute -left-1 bottom-1/3 w-2 h-2 rounded-full bg-emerald-300/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        
        {/* Desarrollador Full Stack */}
        <TimelineItem 
          icon={<FaBuilding className="text-emerald-300" />}
          title="Desarrollador Full Stack"
          subtitle="Freelancer"
          description="Desarrollo de aplicaciones web utilizando React, Node.js, TypeScript y bases de datos SQL/NoSQL. Implementación de interfaces de usuario modernas y sistemas backend escalables."
          date="2024 - Presente"
        />
        
        {/* Proyectos Personales */}
        <TimelineItem 
          icon={<FaFolderOpen className="h-5 w-5 text-emerald-300" />}
          title="Proyectos Personales"
          subtitle="Desarrollo de portafolio y aplicaciones web"
          description="Creación de proyectos personales para mejorar habilidades y explorar nuevas tecnologías como Astro, Next.js y frameworks modernos."
          date="2024 - Presente"
          link="/proyectos"
        />
      </div>
    </motion.div>
  );
};

export default TimelineExperience;