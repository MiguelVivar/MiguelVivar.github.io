import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SocialIcons: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="flex space-x-6 mt-8 text-gray-400"
    >
      <a 
        href="https://github.com/MiguelVivar" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="GitHub" 
        className="hover:text-emerald-300 transition-colors transform hover:scale-110 flex items-center justify-center"
      >
        <FaGithub className="w-7 h-7" />
      </a>
      <a 
        href="https://www.linkedin.com/in/miguel-vivar-farfan/" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="LinkedIn" 
        className="hover:text-emerald-300 transition-colors transform hover:scale-110 flex items-center justify-center"
      >
        <FaLinkedin className="w-7 h-7" />
      </a>
      <a 
        href="mailto:miguelvivarfarfan@gmail.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Email" 
        className="hover:text-emerald-300 transition-colors transform hover:scale-110 flex items-center justify-center"
      >
        <MdEmail className="w-7 h-7" />
      </a>
    </motion.div>
  );
};

export default SocialIcons;