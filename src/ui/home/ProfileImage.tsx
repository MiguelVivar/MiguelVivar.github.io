'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaStar } from 'react-icons/fa';
import ProfilePicture from '../../assets/images/perfil.png';
import Image from 'next/image';

const ProfileImage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efecto de brillo circular con comportamiento mejorado */}
      <motion.div 
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/30 to-emerald-300/30 blur-xl"
        animate={{ 
          opacity: isHovered ? [0.5, 0.8, 0.5] : [0.4, 0.7, 0.4],
          scale: isHovered ? [0.98, 1.08, 0.98] : [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: isHovered ? 6 : 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Borde circular giratorio mejorado */}
      <motion.div 
        className="absolute -inset-2 rounded-full border-2 border-dashed border-emerald-400/40"
        animate={{ rotate: 360 }}
        transition={{
          duration: isHovered ? 15 : 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Secondary rotating border in opposite direction */}
      <motion.div 
        className="absolute -inset-3 rounded-full border border-dotted border-emerald-300/30"
        animate={{ rotate: -360 }}
        transition={{
          duration: isHovered ? 25 : 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        animate={{ 
          y: [0, -8, 0],
          rotate: [-1, 1, -1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-emerald-400 shadow-xl shadow-emerald-500/30 transition-all duration-300"
        style={{ 
          boxShadow: isHovered ? '0 25px 50px -12px rgba(16, 185, 129, 0.6)' : '',
          background: "linear-gradient(120deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)" 
        }}
      >
        <motion.div
          animate={{ 
            scale: isHovered ? [1, 1.07, 1] : [1, 1.05, 1] 
          }}
          transition={{
            duration: isHovered ? 4 : 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <Image
            src={ProfilePicture.src}
            alt="Foto de perfil de Miguel Vivar"
            className="object-cover object-center w-full h-full"
            loading="eager"
            style={{ 
              filter: isHovered ? 'brightness(1.05) contrast(1.05)' : 'none',
              transition: 'filter 0.5s ease-in-out'
            }}
            width={300}
            height={300}
          />
        </motion.div>
        
        {/* Enhanced decorative accent shapes */}
        <motion.div 
          className="absolute -top-1 -right-1 w-10 h-10 bg-emerald-400 rounded-full opacity-50 blur-sm"
          animate={{ 
            scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.5, 0.7, 0.5] : [0.5, 0.6, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-2 -left-2 w-8 h-8 bg-emerald-400 rounded-full opacity-40 blur-sm"
          animate={{ 
            scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.4, 0.6, 0.4] : [0.4, 0.5, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Verified badge with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
          className="absolute -bottom-3 -right-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-neutral-900 rounded-full p-3 shadow-lg"
          style={{ 
            boxShadow: isHovered ? '0 10px 15px -3px rgba(16, 185, 129, 0.5)' : '0 10px 15px -3px rgba(16, 185, 129, 0.3)' 
          }}
        >
          <motion.div
            animate={{ 
              scale: isHovered ? [1, 1.3, 1] : [1, 1.2, 1],
              rotateZ: isHovered ? [0, 15, 0] : [0, 10, 0]
            }}
            transition={{
              duration: isHovered ? 1 : 2,
              repeat: Infinity,
              repeatDelay: isHovered ? 2 : 6
            }}
          >
            <FaCheck className="h-6 w-6" />
          </motion.div>
        </motion.div>
        
        {/* New feature: Floating stars on hover */}
        <AnimatePresence>
          {isHovered && [...Array(3)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i - 1) * 30],
                y: [-20, -50 - i * 15]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute top-1/4 left-1/2 text-yellow-300"
            >
              <FaStar className={`h-${3 + i} w-${3 + i}`} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Enhanced floating dots decoration with variable sizes and colors */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br from-emerald-${300 + (i % 3) * 100} to-teal-${400 + (i % 2) * 100}`}
          style={{
            width: `${6 + i * 2}px`,
            height: `${6 + i * 2}px`,
            top: `${15 + i * 12}%`,
            left: i % 2 === 0 ? '-12%' : '112%',
            filter: 'blur(1px)'
          }}
          animate={{ 
            y: [0, -15 - i * 2, 0],
            x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            opacity: isHovered ? [0.3, 0.9, 0.3] : [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default ProfileImage;