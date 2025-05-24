'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import HeroHeader from './HeroHeader';
import ProfileImage from './ProfileImage';
import AnimateBackground from '../../components/AnimateBackground';
import TechStack from './TechStack';
import Testimonials from './Testimonials';
import AchievementsSection from './AchievementsSection';
import FloatingIcons from './FloatingIcons';

interface HomeProps {
  roles: string[];
}

const Home: React.FC<HomeProps> = ({ roles }) => {
  // Estado para controlar el efecto parallax
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setShowAchievements] = useState(false);

  // Valores de movimiento para el efecto parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Efecto para detectar cuando el usuario ha scrolleado hasta la sección de logros
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollY > windowHeight * 0.5) {
        setShowAchievements(true);
      }
    };

    // Efecto para seguimiento del cursor para parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calcular la posición relativa del mouse desde el centro
      const x = (clientX - centerX) / centerX;
      const y = (clientY - centerY) / centerY;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Transformaciones para el efecto parallax
  const profileRotateX = useTransform(mouseY, [-1, 1], [5, -5]);
  const profileRotateY = useTransform(mouseX, [-1, 1], [-5, 5]);
  const heroTextX = useTransform(mouseX, [-1, 1], [10, -10]);
  const heroTextY = useTransform(mouseY, [-1, 1], [5, -5]);
  const negativeBackgroundX = useTransform(mouseX, [-1, 1], [-20, 20]); 
  const negativeBackgroundY = useTransform(mouseY, [-1, 1], [-20, 20]); 

  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden bg-neutral-900">
      {/* Fondo Animado */}
      <AnimateBackground />
      
      {/* Elementos decorativos que siguen al mouse */}
      <motion.div 
        className="absolute top-20 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        style={{ x: negativeBackgroundX, y: negativeBackgroundY }}      />
      
      {/* Iconos de Tecnologías Flotantes */}
      <FloatingIcons />
      
      {/* Hero con efecto 3d */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-7xl mx-auto py-16 sm:py-24 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Texto del Hero */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ x: heroTextX, y: heroTextY }}
              className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left relative"
            >
              {/* Borde de acento sutil */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-60 hidden md:block"></div>
              
              <HeroHeader roles={roles} />
              
              {/* Acento decorativo adicional */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ delay: 1, duration: 1 }}
                className="h-0.5 bg-gradient-to-r from-emerald-300 to-transparent hidden md:block"
              />
            </motion.div>

            {/* Sección de imagen de perfil con efecto de tarjeta 3D */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ 
                rotateX: profileRotateX, 
                rotateY: profileRotateY,
                perspective: 1000
              }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex justify-center md:justify-end relative"
            >
              {/* Fondo brillante para el perfil */}
              <motion.div 
                className="absolute inset-0 bg-emerald-400/5 rounded-full blur-2xl transform scale-90"
                animate={{ 
                  scale: [0.9, 0.95, 0.9],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <ProfileImage />
            </motion.div>
          </div>
          
          {/* Sección de imagen de perfil con efecto de tarjeta 3D */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 md:mt-16 max-w-5xl mx-auto"
          >
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="backdrop-blur-sm bg-neutral-800/30 p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-emerald-500/10 transition-shadow duration-500"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/50"></div>
                <h3 className="text-center text-emerald-300 font-semibold tracking-wide">Principales Tecnologías que domino</h3>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/50"></div>
              </div>
              <TechStack />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Sección de Logros */}
      <AchievementsSection showAchievements={true} />
      
      {/* Sección de Testimonios */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </section>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none"></div>
    </main>
  );
};

export default Home;