'use client'

import React, { type JSX } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCode, FaLightbulb } from 'react-icons/fa';

// Datos para la sección de logros
const achievements = [
  {
    id: 1,
    icon: <FaTrophy className="text-emerald-300" />,
    title: "Tercio Superior de la Promoción",
    value: "Ingeniería de Sistemas",
    description: "Primeros puestos en el transcurso de la carrera"
  },
  {
    id: 2,
    icon: <FaCode className="text-emerald-300" />,
    title: "Líneas de Código",
    value: "5K+",
    description: "Código limpio, eficiente y bien documentado"
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-emerald-300" />,
    title: "Soluciones Innovadoras",
    value: "15+",
    description: "Resolución de problemas complejos con soluciones creativas"
  }
];

interface AchievementsSectionProps {
  showAchievements: boolean;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ showAchievements }) => {
  return (
    <section className="min-h-[50vh] flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 py-24">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Logros
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Resultados concretos que demuestran mi compromiso con la excelencia y la innovación en cada proyecto.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={index} 
              showAchievements={showAchievements} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AchievementCardProps {
  achievement: {
    id: number;
    icon: JSX.Element;
    title: string;
    value: string;
    description: string;
  };
  index: number;
  showAchievements: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index, showAchievements }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={showAchievements ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="backdrop-blur-sm bg-neutral-800/30 rounded-xl border border-gray-700/30 p-6 flex flex-col items-center text-center hover:bg-neutral-800/50 hover:border-emerald-500/30 transition-all duration-300 shadow-lg"
    >
      <motion.div 
        className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 text-2xl mb-4 relative"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-300/20 blur-md" />
        
        {/* Icon */}
        <div className="relative z-10">
          {achievement.icon}
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-xl font-bold text-emerald-300 mb-1"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ delay: 1 + index * 0.2, duration: 1, repeat: 2 }}
      >
        {achievement.value}
      </motion.h3>
      
      <h4 className="text-lg font-medium text-white mb-2">
        {achievement.title}
      </h4>
      
      <p className="text-gray-300 text-sm">
        {achievement.description}
      </p>
      
      {/* Decorative accent */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
    </motion.div>
  );
};

export default AchievementsSection;