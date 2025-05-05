'use client';

import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaList, FaShare } from 'react-icons/fa6';

interface FloatingControlsProps {
  isLiked: boolean;
  showTableOfContents: boolean;
  showControls: boolean;
  onLike: () => void;
  onShare: () => void;
  onToggleTableOfContents: () => void;
}

// Componente de Tooltip mejorado
const Tooltip = ({ children, text, visible }: { children: React.ReactNode, text: string, visible: boolean }) => (
  <div className="relative group">
    {children}
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute left-full ml-2 px-3 py-1.5 bg-gradient-to-r from-neutral-800/95 to-neutral-900/95 text-white text-xs font-medium whitespace-nowrap rounded-md shadow-xl ring-1 ring-white/10 backdrop-blur-sm z-50"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          {text}
          <div className="absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-3 h-3 bg-neutral-800/95 rotate-45 ring-1 ring-white/10"></div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Componente de rayo de resplandor
const GlowEffect = ({ isActive, color }: { isActive: boolean, color: string }) => {
  return isActive ? (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
      <div 
        className={`absolute inset-0 blur-xl opacity-50`} 
        style={{ backgroundColor: color, transform: 'scale(1.35)' }} 
      />
    </div>
  ) : null;
};

// Componente de botón de control mejorado
const ControlButton = memo(({ 
  icon, 
  activeIcon, 
  isActive, 
  onClick, 
  title, 
  activeColor = 'emerald',
  pulseAnimation = false,
  hoverScale = 1.15
}: { 
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  title: string;
  activeColor?: 'emerald' | 'red' | 'blue' | 'purple' | 'amber';
  pulseAnimation?: boolean;
  hoverScale?: number;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Configuración de colores para diferentes estados
  const colorConfig = {
    emerald: { color: '#10b981', bgLight: 'rgba(16, 185, 129, 0.2)', bgDark: 'rgba(5, 150, 105, 0.25)' },
    red: { color: '#ef4444', bgLight: 'rgba(239, 68, 68, 0.2)', bgDark: 'rgba(220, 38, 38, 0.25)' },
    blue: { color: '#3b82f6', bgLight: 'rgba(59, 130, 246, 0.2)', bgDark: 'rgba(37, 99, 235, 0.25)' },
    purple: { color: '#a855f7', bgLight: 'rgba(168, 85, 247, 0.2)', bgDark: 'rgba(139, 92, 246, 0.25)' },
    amber: { color: '#f59e0b', bgLight: 'rgba(245, 158, 11, 0.2)', bgDark: 'rgba(217, 119, 6, 0.25)' }
  };

  const selectedColor = colorConfig[activeColor];
  
  return (
    <Tooltip text={title} visible={showTooltip}>
      <div className="relative">
        <GlowEffect isActive={isActive} color={selectedColor.color} />
        <motion.button
          whileHover={{ scale: hoverScale }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={() => {
            setShowTooltip(true);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setShowTooltip(false);
            setIsHovered(false);
          }}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className={`relative p-3.5 rounded-full transition-all duration-300 ${
            pulseAnimation && isActive ? 'animate-pulse' : ''
          }`}
          style={{
            backgroundColor: isActive 
              ? selectedColor.bgDark 
              : isHovered 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(15, 15, 15, 0.65)',
            color: isActive ? selectedColor.color : 'white',
            boxShadow: isActive 
              ? `0 0 15px 1px ${selectedColor.color}33, inset 0 0 5px ${selectedColor.color}55`
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isActive 
              ? `${selectedColor.color}55` 
              : 'rgba(255, 255, 255, 0.1)'
          }}
          aria-label={title}
          aria-pressed={isActive}
        >
          <span className="text-lg">
            {isActive && activeIcon ? activeIcon : icon}
          </span>
        </motion.button>
      </div>
    </Tooltip>
  );
});

ControlButton.displayName = 'ControlButton';

const FloatingControls: React.FC<FloatingControlsProps> = memo(({
  isLiked,
  showTableOfContents,
  showControls,
  onLike,
  onShare,
  onToggleTableOfContents
}) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Monitorear el scroll para controlar la visibilidad
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: -80,
      transition: { duration: 0.4, staggerChildren: 0.05, staggerDirection: -1 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 }
  };

  return (
    <AnimatePresence>
      {(showControls || true) && (
        <motion.div 
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden md:flex z-40 flex-col"
          style={{
            filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))'
          }}
        >
          <motion.div 
            className="bg-neutral-900/75 backdrop-blur-md p-3 rounded-2xl mb-2 flex flex-col gap-3 border border-white/10 shadow-2xl"
          >
            <motion.div variants={itemVariants}>
              <ControlButton
                icon={<FaRegHeart />}
                activeIcon={<FaHeart />}
                isActive={isLiked}
                onClick={onLike}
                title={isLiked ? "Quitar me gusta" : "Me gusta"}
                activeColor="red"
                pulseAnimation={isLiked}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ControlButton
                icon={<FaList />}
                isActive={showTableOfContents}
                onClick={onToggleTableOfContents}
                title={showTableOfContents ? "Ocultar índice" : "Mostrar índice de contenido"}
                activeColor="purple"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ControlButton
                icon={<FaShare />}
                isActive={false}
                onClick={onShare}
                title="Compartir artículo"
                activeColor="emerald"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FloatingControls.displayName = 'FloatingControls';

export default FloatingControls;