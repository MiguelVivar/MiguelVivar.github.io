// LoadingIndicator.tsx - Componente para mostrar indicador de carga en la terminal
'use client';

import React from 'react';
import { useTerminal } from './TerminalContext';

// Componente que muestra un indicador de carga cuando hay comandos asíncronos ejecutándose
export const LoadingIndicator: React.FC = () => {
  const { loading } = useTerminal();
  
  if (!loading) return null;
  
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-neutral-900/80 px-2 py-1 rounded-md text-sm">
      <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
      <span className="text-emerald-300">Procesando...</span>
    </div>
  );
};

export default LoadingIndicator;
