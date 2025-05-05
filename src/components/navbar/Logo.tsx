'use client';

import React, { useState } from 'react';
import LogoImg from '../../assets/images/logo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
  const [hoverLogo, setHoverLogo] = useState(false);
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="text-emerald-300 font-bold relative z-10"
      onHoverStart={() => setHoverLogo(true)}
      onHoverEnd={() => setHoverLogo(false)}
    >
      <Link href="/" className="flex items-center group" aria-label="Inicio">
        <div className="relative">
          {/* Glow effect */}
          <AnimatePresence>
            {hoverLogo && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -inset-2 bg-emerald-300/20 rounded-full blur-md -z-10"
              />
            )}
          </AnimatePresence>
          
          <motion.div 
            className="relative w-10 h-10 overflow-hidden rounded-full"
            animate={hoverLogo ? { 
              rotate: 360,
              transition: { duration: 1, ease: "easeInOut" }
            } : {}}
          >
            {/* Subtle rotation animation */}
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <Image 
                src={LogoImg.src}
                alt="Logo Miguel Vivar" 
                width={40}
                height={40}
                className="object-contain w-full h-full"
              />
            </motion.div>
            
            {/* Shine effect */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 100] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop",
                repeatDelay: 3
              }}
            />
          </motion.div>
        </div>
        
        <div className="ml-3 hidden sm:block">
          <motion.p 
            className="text-lg font-bold"
            animate={hoverLogo ? { color: "#6ee7b7" } : { color: "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            Miguel <motion.span 
              className="text-emerald-300"
              animate={hoverLogo ? { 
                textShadow: "0 0 8px rgba(110, 231, 183, 0.5)",
              } : { 
                textShadow: "0 0 0px rgba(110, 231, 183, 0)",
              }}
              transition={{ duration: 0.3 }}
            >
              Vivar
            </motion.span>
          </motion.p>
          
          {/* Underline animation */}
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={hoverLogo ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default Logo;