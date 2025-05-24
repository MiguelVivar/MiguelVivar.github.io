import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlightedText?: string;
  description?: string;
  icon?: React.ReactNode;
  alignment?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle,
  highlightedText, 
  description,
  icon,
  alignment = 'center' 
}) => {
  const textAlignClass = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  }[alignment];

  const titleText = highlightedText ? (
    <>
      {title} <span className="text-emerald-300">{highlightedText}</span>
    </>
  ) : subtitle ? (
    <>
      {title} <span className="text-emerald-300">{subtitle}</span>
    </>
  ) : title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${textAlignClass}`}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mb-4 ${alignment === 'center' ? 'flex justify-center' : alignment === 'right' ? 'flex justify-end' : ''}`}
        >
          {icon}
        </motion.div>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {titleText}
      </h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;