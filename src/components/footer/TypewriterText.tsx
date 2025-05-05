'use client'

import React from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 75,
  pauseTime = 1500
}) => {
  const { text, showCursor } = useTypewriter(phrases, typingSpeed, deletingSpeed, pauseTime);

  return (
    <div className="inline relative">
      <span>{text}</span>
      <span className={`absolute ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </div>
  );
};

export default TypewriterText;