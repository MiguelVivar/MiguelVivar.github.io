import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaAward } from 'react-icons/fa';
import { LuBookOpen } from 'react-icons/lu';
import TimelineItem from './TimelineItem';

const TimelineEducation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/30 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-500"
    >
      {/* Encabezado con efecto de resplandor */}
      <div className="relative mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20"></div>
        <div className="relative bg-neutral-800 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-lg text-neutral-900 shadow-lg shadow-emerald-500/30 transform -rotate-3">
            <FaGraduationCap className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Educación</h3>
            <p className="text-gray-400 text-sm">Formación académica y autodidacta</p>
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
        
        {/* Universidad */}
        <TimelineItem 
          icon={<FaUniversity className="text-emerald-300" />}
          title="Ingeniería en Sistemas"
          subtitle="Universidad Nacional &quot;San Luis Gonzaga&quot;"
          description="Formación en ciencias de la computación, desarrollo de software, algoritmos y fundamentos de ingeniería."
          date="2023 - Presente"
          link="https://www.unica.edu.pe/"
        />
        
        {/* Formación autodidacta */}
        <TimelineItem 
          icon={<LuBookOpen className="h-5 w-5 text-emerald-300" />}
          title="Formación Autodidacta"
          subtitle="Cursos online y bootcamps de desarrollo web"
          description="Especialización en tecnologías frontend y backend a través de plataformas educativas, documentación oficial y proyectos prácticos."
          date="2023 - Presente"
        />
        
        {/* Certificaciones */}
        <TimelineItem 
          icon={<FaAward className="h-5 w-5 text-emerald-300" />}
          title="Certificaciones Técnicas"
          subtitle="freeCodeCamp, Cisco y otras plataformas"
          description="Obtención de certificados en responsive web design, JavaScript, algoritmos y estructura de datos."
          date="2024 - Presente"
        />
      </div>
    </motion.div>
  );
};

export default TimelineEducation;