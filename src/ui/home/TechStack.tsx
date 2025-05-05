import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs 
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiAstro 
} from 'react-icons/si';

// Define las tecnologías con sus íconos correspondientes
const technologies = [
  { name: 'React', icon: <FaReact className="text-blue-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'Astro', icon: <SiAstro className="text-orange-500" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> }
];

const TechStack: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="flex flex-wrap gap-3 justify-center"
    >
      {technologies.map((tech, index) => (
        <motion.div 
          key={tech.name}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
          whileHover={{ 
            scale: 1.05, 
            y: -2,
            transition: { duration: 0.2 }
          }}
          className="px-3 py-1.5 bg-neutral-800/80 text-gray-200 rounded-lg text-xs font-medium border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-neutral-800/95 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 flex items-center gap-1.5 backdrop-blur-sm"
        >
          <motion.span 
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              delay: index * 0.2,
              repeat: Infinity,
              repeatDelay: 5
            }}
            className='text-lg'
          >
            {tech.icon}
          </motion.span>
          {tech.name}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TechStack;