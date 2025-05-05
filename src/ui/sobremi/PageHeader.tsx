import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  highlightedText: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, highlightedText, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 relative inline-block">
        {title} <span className="text-emerald-300">{highlightedText}</span>
        <motion.span 
          className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-300/50 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </h1>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default PageHeader;