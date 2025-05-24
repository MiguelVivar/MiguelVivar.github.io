import React from 'react';
import { motion } from 'framer-motion';
import { SiAstro, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si';

// Datos para las esferas flotantes
const floatingIcons = [
  { id: 1, icon: <SiReact />, color: "text-blue-400", size: "w-8 h-8", position: "top-[20%] left-[10%]", duration: 15 },
  { id: 2, icon: <SiNextdotjs />, color: "text-white", size: "w-6 h-6", position: "top-[15%] right-[15%]", duration: 12 },
  { id: 3, icon: <SiAstro />, color: "text-amber-500", size: "w-7 h-7", position: "bottom-[25%] left-[15%]", duration: 18 },
  { id: 4, icon: <SiTailwindcss />, color: "text-cyan-400", size: "w-8 h-8", position: "bottom-[20%] right-[10%]", duration: 14 },
];

const FloatingIcons: React.FC = () => {
  return (
    <>
      {floatingIcons.map(icon => (
        <motion.div
          key={icon.id}
          className={`absolute ${icon.position} ${icon.size} ${icon.color} opacity-30 flex items-center justify-center`}
          animate={{ 
            y: ['-20px', '20px', '-20px'],
            rotate: [0, icon.id % 2 === 0 ? 15 : -15, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: icon.duration, 
            ease: "easeInOut" 
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </>
  );
};

export default FloatingIcons;