'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';

interface ContactButtonProps {
  isActive: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({ isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      <Link 
        href="/contacto"
        className={`relative px-4 py-2 text-xl font-bold rounded-lg transition-colors duration-300 flex items-center overflow-hidden group ${
          isActive
            ? 'bg-gradient-to-r from-emerald-400 to-emerald-300 text-neutral-800 shadow-lg shadow-emerald-500/30'
            : 'border-2 border-emerald-300/90 text-emerald-300 hover:border-emerald-300'
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        <motion.div
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full h-full flex items-center"
        >
          <AnimatePresence>
            {isHovered && !isActive && (
              <motion.div 
                className="absolute inset-0 bg-emerald-300/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute -inset-[100%] h-[500%] w-[200%] rotate-45 z-0">
                  <div className="absolute h-2 w-2 rounded-full bg-emerald-300/50 animate-ping top-1/4 left-1/2 delay-75"></div>
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-300/60 animate-ping top-3/4 left-1/4 delay-200"></div>
                  <div className="absolute h-2 w-2 rounded-full bg-emerald-300/40 animate-ping top-2/4 left-3/4"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isActive && (
            <motion.div 
              className="absolute -inset-full h-full w-full z-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"
              animate={{
                x: ['200%', '-200%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
          
          <div className="relative z-10 flex items-center">
            <motion.div
              className="mr-1.5"
              animate={isHovered && !isActive ? { 
                y: [0, -2, 0, 2, 0], 
                rotate: [0, 5, 0, -5, 0] 
              } : {}}
              transition={isHovered ? { 
                duration: 1, 
                repeat: Infinity,
                repeatType: "loop" 
              } : {}}
            >
              <MdEmail className={`w-5 h-5 ${isActive ? 'text-neutral-800' : 'text-emerald-300 group-hover:text-emerald-400'}`} />
            </motion.div>
            <span className={isActive ? 'text-neutral-800' : 'text-emerald-300 group-hover:text-emerald-100'}>
              Contacto
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ContactButton;
