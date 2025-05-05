'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

// Datos de testimonios
const testimonials = [
  {
    id: 1,
    name: "1",
    role: "1",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 2,
    name: "2",
    role: "2",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    name: "3",
    role: "3",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Autoplay para testimonios
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrent(prev => (prev + 1) % testimonials.length);
      }, 6000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);
  
  // Pausar autoplay cuando el mouse está sobre el carrusel
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  // Navegación
  const goToPrev = () => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToNext = () => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Lo que <span className="text-emerald-400">Dicen de Mí</span>
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
          Opiniones de clientes y colaboradores con quienes he trabajado en diversos proyectos.
        </motion.p>
      </motion.div>
      
      <div 
        className="relative max-w-4xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-emerald-400/30 -mt-4 -ml-4"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-emerald-400/30 -mb-4 -mr-4"></div>
        
        {/* Quote icons */}
        <FaQuoteLeft className="absolute top-4 left-4 text-4xl text-emerald-500/20" />
        <FaQuoteRight className="absolute bottom-4 right-4 text-4xl text-emerald-500/20" />
        
        <div className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-neutral-800/30 border border-gray-700/30 shadow-lg p-8 min-h-[20rem] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
            >
              {/* Avatar */}
              <motion.div 
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-emerald-400/50 shadow-md"
                animate={{ 
                  scale: [1, 1.05, 1],
                  borderColor: ['rgba(52, 211, 153, 0.5)', 'rgba(52, 211, 153, 0.8)', 'rgba(52, 211, 153, 0.5)'] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image 
                  src={testimonials[current].image} 
                  alt={testimonials[current].name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={100}
                  height={100}
                />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-emerald-400/10"
                  animate={{ 
                    boxShadow: [
                      "inset 0 0 15px 5px rgba(52, 211, 153, 0.1)",
                      "inset 0 0 20px 5px rgba(52, 211, 153, 0.2)",
                      "inset 0 0 15px 5px rgba(52, 211, 153, 0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-gray-200 italic mb-4 leading-relaxed">&quot;{testimonials[current].text}&quot;</p>
                <h4 className="text-lg font-semibold text-emerald-300">{testimonials[current].name}</h4>
                <p className="text-sm text-gray-400">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-2">
          <motion.button
            onClick={goToPrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors duration-300 backdrop-blur-sm shadow-lg -ml-5"
          >
            <FaChevronLeft />
          </motion.button>
          
          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors duration-300 backdrop-blur-sm shadow-lg -mr-5"
          >
            <FaChevronRight />
          </motion.button>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === index 
                  ? 'bg-emerald-400 w-6' 
                  : 'bg-emerald-400/30 hover:bg-emerald-400/50'
              }`}
              aria-label={`Ver testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;