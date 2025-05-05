'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import LogoImg from '../../assets/images/logo.svg';
import Link from 'next/link';
import Image from 'next/image';

const FooterLogo: React.FC = () => {
  const [hoverLogo, setHoverLogo] = useState(false);
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-5"
    >
      <Link 
        href="/" 
        className="flex items-center group" 
        onMouseEnter={() => setHoverLogo(true)}
        onMouseLeave={() => setHoverLogo(false)}
      >
        <motion.div 
          className="relative w-12 h-12 mr-3"
          animate={{ 
            rotate: hoverLogo ? 360 : 0,
            scale: hoverLogo ? 1.1 : 1
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full filter blur-md" />
          <Image 
            src={LogoImg.src}
            alt="Logo Miguel Vivar" 
            className="w-full h-full object-contain relative z-10"
            width={48}
            height={48}
          />
        </motion.div>
        <div>
          <motion.span 
            className="text-2xl font-bold block"
            animate={{ 
              color: hoverLogo ? "#6ee7b7" : "#ffffff"
            }}
            transition={{ duration: 0.3 }}
          >
            Miguel <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-500">Vivar</span>
          </motion.span>
          <span className="text-xs text-emerald-300/80 font-medium">Desarrollador Full-Stack</span>
        </div>
      </Link>
      
      <p className="text-gray-300/80 leading-relaxed text-sm backdrop-blur-sm bg-neutral-900/20 p-4 rounded-lg border border-neutral-800/50">
        Desarrollador Full-Stack especializado en crear experiencias web únicas y funcionales,
        combinando diseño atractivo con tecnologías modernas para construir soluciones 
        digitales que causan impacto.
      </p>
      
      <div className="pt-1">
        <a 
          href="/contacto" 
          className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent hover:from-emerald-500 hover:to-emerald-300 transition-all duration-300 group font-medium"
        >
          <span>Trabajemos juntos</span>
          <motion.div
            animate={{ x: hoverLogo ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowRight className="w-4 h-4 ml-2 text-emerald-400 group-hover:text-emerald-300" />
          </motion.div>
        </a>
      </div>
    </motion.div>
  );
};

export default FooterLogo;