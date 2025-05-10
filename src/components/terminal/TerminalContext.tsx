'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { proyectos } from '@/data/proyectos';

// Tipos
interface TerminalHistoryItem {
  command: string;
  output: ReactNode;
  isError?: boolean;
}

interface TerminalContextType {
  history: TerminalHistoryItem[];
  isOpen: boolean;
  handleCommand: (command: string) => void;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
  clearHistory: () => void;
}

// Crear el contexto
const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

// Hook para usar el contexto
export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal debe ser usado dentro de un TerminalProvider');
  }
  return context;
}

// Componente de ayuda para mostrar texto colorido en la terminal
export const TerminalText = ({ 
  children, 
  color = "text-white",
  className = ""
}: { 
  children: ReactNode; 
  color?: string;
  className?: string;
}) => (
  <span className={`${color} ${className}`}>{children}</span>
);

// Proveedor que maneja el estado de la terminal
export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Guardar y restaurar el estado de la terminal en localStorage
  useEffect(() => {
    // Restaurar solo el estado de visibilidad, no el historial
    const savedIsOpen = localStorage.getItem('terminal_is_open');
    if (savedIsOpen) {
      setIsOpen(savedIsOpen === 'true');
    }
  }, []);

  // Guardar el estado cuando cambie
  useEffect(() => {
    localStorage.setItem('terminal_is_open', isOpen.toString());
  }, [isOpen]);

  // Funciones para controlar la visibilidad
  const openTerminal = useCallback(() => setIsOpen(true), []);
  const closeTerminal = useCallback(() => setIsOpen(false), []);
  const toggleTerminal = useCallback(() => setIsOpen(prev => !prev), []);
  const clearHistory = useCallback(() => setHistory([]), []);

  // Comando de bienvenida
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          command: "welcome",
          output: (
            <div className="space-y-1">
              <p className="text-emerald-300 font-bold">¡Bienvenido a la Terminal Interactiva de Miguel Vivar!</p>
              <p className="text-gray-300">Escribe <span className="text-emerald-300 font-mono">help</span> para ver la lista de comandos disponibles.</p>
            </div>
          )
        }
      ]);
    }
  }, [history.length]);

  // Procesar comandos
  const handleCommand = useCallback((command: string) => {
    const cmd = command.trim().toLowerCase();
    
    // Lista de actualizaciones del historial
    let newHistoryItem: TerminalHistoryItem;

    // Procesar los diferentes comandos
    if (cmd === '' || !cmd) {
      return; // Ignorar comandos vacíos
    } 
    else if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    else if (cmd === 'help') {
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">Comandos disponibles:</p>
            <table className="border-collapse w-full md:w-auto">
              <tbody>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">help</span></td>
                  <td className="py-1 text-gray-300">Muestra esta lista de comandos</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">about</span></td>
                  <td className="py-1 text-gray-300">Información sobre Miguel Vivar</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">skills</span></td>
                  <td className="py-1 text-gray-300">Listar habilidades y tecnologías</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">projects</span></td>
                  <td className="py-1 text-gray-300">Listar proyectos destacados</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">contact</span></td>
                  <td className="py-1 text-gray-300">Información de contacto</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">socials</span></td>
                  <td className="py-1 text-gray-300">Enlaces a redes sociales</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">clear</span></td>
                  <td className="py-1 text-gray-300">Limpiar la terminal</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">exit</span></td>
                  <td className="py-1 text-gray-300">Cerrar la terminal</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-400 text-sm italic">Tip: Puedes usar la tecla Tab para autocompletar comandos y las flechas arriba/abajo para navegar por el historial.</p>
          </div>
        )
      };
    }
    else if (cmd === 'about') {
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">Sobre Miguel Vivar:</p>
            <p className="text-gray-300">Desarrollador Full Stack especializado en tecnologías web modernas.</p>
            <p className="text-gray-300">Estudiante de Ingeniería en Sistemas, actualmente en el IV ciclo.</p>
            <p className="text-gray-300">Apasionado por crear experiencias digitales atractivas y funcionales,
              combinando diseño y desarrollo.</p>
            <p className="mt-2">
              <a href="/sobremi" className="text-emerald-400 hover:underline">➝ Ver página completa sobre mí</a>
            </p>
          </div>
        )
      };
    }
    else if (cmd === 'skills') {
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">Habilidades principales:</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-700/50">React</span>
              <span className="px-2 py-1 rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-700/50">Next.js</span>
              <span className="px-2 py-1 rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-700/50">TypeScript</span>
              <span className="px-2 py-1 rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-700/50">Tailwind CSS</span>
              <span className="px-2 py-1 rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-700/50">Node.js</span>
              <span className="px-2 py-1 rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-700/50">Astro</span>
            </div>
            
            <p className="mt-2">
              <a href="/habilidades" className="text-emerald-400 hover:underline">➝ Ver todas mis habilidades</a>
            </p>
          </div>
        )
      };
    }
    else if (cmd === 'projects') {
      // Mostrar solo proyectos destacados
      const proyectosDestacados = proyectos.filter(p => p.destacado);
      
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-3">
            <p className="text-emerald-300 font-bold">Proyectos destacados:</p>
            
            <div className="space-y-3">
              {proyectosDestacados.map((proyecto, index) => (
                <div key={index} className="border border-neutral-700 rounded-md p-3 bg-neutral-800/50">
                  <p className="font-semibold text-emerald-200">{proyecto.titulo}</p>
                  <p className="text-gray-300 text-sm my-1">{proyecto.descripcion}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proyecto.tecnologias.slice(0, 3).map((tech, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-neutral-700 px-2 py-1 rounded text-xs text-gray-300">
                        {tech.icono}
                        <span className="ml-1">{tech.nombre}</span>
                      </span>
                    ))}
                    {proyecto.tecnologias.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs text-gray-400">
                        +{proyecto.tecnologias.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mt-2">
              <a href="/proyectos" className="text-emerald-400 hover:underline">➝ Ver todos mis proyectos</a>
            </p>
          </div>
        )
      };
    }
    else if (cmd === 'contact') {
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">Información de contacto:</p>
            <p className="text-gray-300">
              <span className="text-emerald-200 font-medium">Email:</span> miguelvivarfarfan@gmail.com
            </p>
            <p className="text-gray-300">
              <span className="text-emerald-200 font-medium">Ubicación:</span> Ica, Perú
            </p>
            <p className="text-gray-300">
              <span className="text-emerald-200 font-medium">Disponibilidad:</span> Freelance y proyectos
            </p>
            
            <p className="mt-2">
              <a href="/contacto" className="text-emerald-400 hover:underline">➝ Ir a la página de contacto</a>
            </p>
          </div>
        )
      };
    }
    else if (cmd === 'socials') {
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">Redes sociales:</p>
            <div className="space-y-1">
              <p className="text-gray-300">
                <a href="https://github.com/MiguelVivar" className="text-emerald-300 hover:underline" target="_blank" rel="noopener noreferrer">
                  GitHub: @MiguelVivar
                </a>
              </p>
              <p className="text-gray-300">
                <a href="https://www.linkedin.com/in/miguel-vivar-farfan/" className="text-emerald-300 hover:underline" target="_blank" rel="noopener noreferrer">
                  LinkedIn: miguel-vivar-farfan
                </a>
              </p>
            </div>
          </div>
        )
      };
    }
    else if (cmd === 'exit') {
      closeTerminal();
      newHistoryItem = {
        command: cmd,
        output: <p className="text-gray-300">Cerrando terminal...</p>
      };
    }
    else {
      newHistoryItem = {
        command: cmd,
        output: (
          <p className="text-red-400">
            &apos;{cmd}&apos; no es un comando reconocido. Escribe <span className="text-emerald-300 font-mono">help</span> para ver los comandos disponibles.
          </p>
        ),
        isError: true
      };
    }
    
    // Añadir el nuevo comando al historial
    setHistory(prev => [...prev, newHistoryItem]);
  }, [closeTerminal]);

  const value = {
    history,
    isOpen,
    handleCommand,
    openTerminal,
    closeTerminal,
    toggleTerminal,
    clearHistory
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;