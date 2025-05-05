'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaGraduationCap, FaLaptopCode, FaRocket } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineWorkOutline } from 'react-icons/md';
import SpotifyNowPlaying from '../../components/SpotifyNowPlaying';

const ProfileSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const skills = [
    "React", "Node.js", "TypeScript", "Astro", "Tailwind CSS", "Next.js"
  ];
  
  const highlights = [
    {
      icon: <FaGraduationCap className="h-5 w-5 text-emerald-300" />,
      text: "IV ciclo de Ing. en Sistemas",
      delay: 0.6
    },
    {
      icon: <FaLaptopCode className="h-5 w-5 text-emerald-300" />,
      text: "Desarrollador Full Stack",
      delay: 0.7
    },
    {
      icon: <MdOutlineWorkOutline className="h-5 w-5 text-emerald-300" />,
      text: "Disponible para proyectos",
      delay: 0.8
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-block px-4 py-1 bg-emerald-300/10 rounded-full border border-emerald-300/20 text-emerald-300 text-sm font-medium"
      >
        <span className="relative inline-flex">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 mr-2 mt-2"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 mr-2 mt-2"></span>
        </span>
        Disponible para nuevos proyectos
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl font-bold text-white"
      >
        ¿Quién <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">soy?</span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-300 leading-relaxed text-lg"
      >
        Soy un <span className="text-emerald-300 font-medium">desarrollador Full Stack</span> apasionado por la creación de experiencias digitales excepcionales que combinan funcionalidad, rendimiento y diseño atractivo. Mi enfoque es construir aplicaciones web modernas utilizando las últimas tecnologías y mejores prácticas del desarrollo web.
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-gray-300 leading-relaxed text-lg"
      >
        Con un sólido dominio tanto de <span className="text-emerald-300 font-medium">frontend</span> como de <span className="text-emerald-300 font-medium">backend</span>, disfruto enfrentando desafíos técnicos complejos y encontrando soluciones creativas e innovadoras que mejoren la experiencia del usuario y cumplan con los objetivos estratégicos del proyecto.
      </motion.p>

      {/* Tech Stack */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pt-4"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <FaRocket className="text-emerald-300" /> Tecnologías preferidas
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                hoveredIndex === index 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' 
                  : 'bg-neutral-800 text-emerald-300 border border-emerald-500/20'
              }`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      {/* Aspectos destacados */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-3"
      >
        {highlights.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: item.delay }}
            className="flex items-center gap-3 bg-neutral-800/60 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-neutral-700/50"
          >
            {item.icon}
            <span className="text-gray-200">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full border border-neutral-700/50">
          <FaLocationDot className="h-5 w-5 text-emerald-300" />
          <span className="text-gray-300">Ica, Perú 🇵🇪</span>
        </div>
      </motion.div>
      
      {/* Spotify Now Playing */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="p-4 bg-neutral-800/60 rounded-lg border border-neutral-700/50 backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span className="text-emerald-300">🎵</span> Mi música
        </h3>
        <SpotifyNowPlaying />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="pt-4"
      >
        <a 
          href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2"
          className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFileAlt className="text-xl group-hover:animate-pulse" />
          <span>Descargar CV</span>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSection;