import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative inline-block"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 relative z-10">
          {title}
        </h1>
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-3 bg-emerald-500/20 rounded-full z-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        ></motion.div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-neutral-400 text-lg md:text-xl mt-4 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default PageHeader;