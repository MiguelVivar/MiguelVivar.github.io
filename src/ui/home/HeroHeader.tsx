import React from 'react';
import { motion } from 'framer-motion';
import BadgeFreelance from './BadgeFreelance';
import Greeting from './Greeting';
import TypewriterRole from './TypewriterRole';
import CTAButtons from './CTAButtons';

interface HeroHeaderProps {
  roles: string[];
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ roles }) => {
  return (
    <>
      <BadgeFreelance />
      <Greeting />
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
      >
        Miguel <span className='text-emerald-400 relative inline-block'>
          Vivar
          <motion.span 
            className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400/70 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </span>
      </motion.h1>
      
      <TypewriterRole roles={roles} />
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto md:mx-0 leading-relaxed backdrop-blur-sm py-2 border-l-2 border-emerald-500/30 pl-4"
      >
        Transformo ideas en soluciones digitales innovadoras, combinando diseño atractivo 
        con tecnologías de vanguardia para crear experiencias web que destacan por su 
        funcionalidad, rendimiento y estética.
      </motion.p>
      
      <CTAButtons />
    </>
  );
};

export default HeroHeader;