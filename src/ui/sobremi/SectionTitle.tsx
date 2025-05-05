import React from 'react';

interface SectionTitleProps {
  title: string;
  highlightedText: string;
  alignment?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  highlightedText, 
  alignment = 'center' 
}) => {
  const textAlignClass = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  }[alignment];

  return (
    <h2 className={`text-3xl font-bold text-white mb-6 ${textAlignClass}`}>
      {title} <span className="text-emerald-300">{highlightedText}</span>
    </h2>
  );
};

export default SectionTitle;