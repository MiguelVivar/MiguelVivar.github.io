import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleMenu } from './store';
import { MdEmail } from 'react-icons/md';
import SocialIcons from './SocialIcons';

interface MobileMenuProps {
  isOpen: boolean;
  links: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  currentPath: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, links, currentPath }) => {
  // Variantes para animaciones de elementos
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 top-16 z-40 lg:hidden overflow-hidden"
        >
          {/* Fondo con efecto de blur que se integra con la barra de nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-neutral-900/95 to-neutral-900/98 backdrop-blur-xl"
          />
          
          {/* Efecto de brillo en bordes */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"
          />
          
          <motion.div 
            className="relative z-10 w-full max-w-md mx-auto px-6 py-4 flex flex-col items-center justify-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <motion.a
                  href={link.href}
                  className={`relative flex items-center justify-center py-2 px-4 text-xl font-bold transition-all duration-300 rounded-lg overflow-hidden ${
                    currentPath === link.href 
                      ? 'text-emerald-300 bg-emerald-300/5 border-l-2 border-emerald-300' 
                      : 'text-gray-300 hover:text-emerald-300 hover:bg-emerald-300/5'
                  }`}
                  aria-current={currentPath === link.href ? "page" : undefined}
                  onClick={() => toggleMenu()}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Efecto de brillo al pasar el ratón */}
                  <motion.div 
                    className="absolute -inset-full h-full w-full z-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
                    animate={{
                      x: ['200%', '-200%'],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <div className="flex items-center justify-center relative z-10 w-full">
                    <motion.div 
                      className="mr-3" 
                      animate={currentPath === link.href ? {
                        scale: [1, 1.2, 1],
                        transition: { 
                          repeat: Infinity, 
                          duration: 2, 
                          repeatType: 'loop' 
                        }
                      } : {}}
                    >
                      <link.icon className={`w-5 h-5 ${currentPath === link.href ? 'text-emerald-300' : 'text-gray-400'}`} />
                    </motion.div>
                    {link.label}
                    
                    {currentPath === link.href && (
                      <motion.span 
                        className="ml-2 text-xl"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        •
                      </motion.span>
                    )}
                  </div>
                </motion.a>
              </motion.div>
            ))}
            
            <div className="w-full pt-2">
              <motion.div
                className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </div>
            
            <motion.div
              custom={links.length + 1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full pt-1"
            >
              <motion.a
                href="/contacto"
                className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-2 rounded-lg text-base font-bold transition-colors duration-300 w-full ${
                  currentPath === '/contacto' 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-300 text-neutral-800 shadow-lg shadow-emerald-500/30' 
                    : 'border border-emerald-300 text-emerald-300 hover:border-emerald-200 hover:text-emerald-200'
                }`}
                aria-current={currentPath === '/contacto' ? "page" : undefined}
                onClick={() => toggleMenu()}
                whileTap={{ scale: 0.98 }}
              >
                {/* Efecto de brillo al pasar el ratón */}
                {currentPath !== '/contacto' && (
                  <motion.div 
                    className="absolute -inset-full h-full w-full z-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"
                    animate={{
                      x: ['200%', '-200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
                
                <motion.div
                  animate={currentPath === '/contacto' ? {} : { 
                    y: [0, -2, 0, 2, 0],
                    x: [0, 1, 0, -1, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "loop" 
                  }}
                  className="mr-2"
                >
                  <MdEmail className="w-5 h-5" />
                </motion.div>
                <span className="relative z-10">Contacto</span>
              </motion.a>
            </motion.div>
            
            <motion.div
              custom={links.length + 2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pt-2"
            >
              <SocialIcons />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;