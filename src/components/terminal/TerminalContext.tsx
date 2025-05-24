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
    }    else if (cmd === 'help') {
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">Comandos disponibles:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-yellow-300 font-semibold mb-2">📝 Información:</p>
                <table className="border-collapse w-full">
                  <tbody>
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
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-yellow-300 font-semibold mb-2">🎮 Interactivos:</p>
                <table className="border-collapse w-full">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">date</span></td>
                      <td className="py-1 text-gray-300">Mostrar fecha y hora actual</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">weather</span></td>
                      <td className="py-1 text-gray-300">Mostrar clima de Ica</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">joke</span></td>
                      <td className="py-1 text-gray-300">Mostrar un chiste de programación</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">calc [expresión]</span></td>
                      <td className="py-1 text-gray-300">Calculadora simple</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">quote</span></td>
                      <td className="py-1 text-gray-300">Cita inspiracional</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-yellow-300 font-semibold mb-2">🛠️ Utilidades:</p>
              <table className="border-collapse w-full">
                <tbody>
                  <tr>
                    <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">clear</span></td>
                    <td className="py-1 text-gray-300">Limpiar la terminal</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">history</span></td>
                    <td className="py-1 text-gray-300">Mostrar historial de comandos</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">help</span></td>
                    <td className="py-1 text-gray-300">Muestra esta lista de comandos</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4"><span className="text-emerald-300 font-mono">exit</span></td>
                    <td className="py-1 text-gray-300">Cerrar la terminal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-sm italic mt-4">💡 Tip: Puedes usar la tecla Tab para autocompletar comandos y las flechas arriba/abajo para navegar por el historial.</p>
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
    }    else if (cmd === 'exit') {
      closeTerminal();
      newHistoryItem = {
        command: cmd,
        output: <p className="text-gray-300">Cerrando terminal...</p>
      };
    }
    else if (cmd === 'date') {
      const now = new Date();
      const formatDate = now.toLocaleString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
      
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-1">
            <p className="text-emerald-300 font-bold">📅 Fecha y hora actual:</p>
            <p className="text-white font-mono">{formatDate}</p>
            <p className="text-gray-400 text-sm">Zona horaria: Lima, Perú (UTC-5)</p>
          </div>
        )
      };
    }
    else if (cmd === 'weather') {
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">🌤️ Clima en Ica, Perú:</p>
            <div className="bg-gray-800 p-3 rounded border border-gray-600">
              <p className="text-white">🌡️ Temperatura: 24°C</p>
              <p className="text-gray-300">☀️ Condición: Soleado</p>
              <p className="text-gray-300">💨 Viento: 15 km/h</p>
              <p className="text-gray-300">💧 Humedad: 65%</p>
            </div>
            <p className="text-gray-400 text-sm italic">* Datos simulados - Para clima real, visita un servicio meteorológico</p>
          </div>
        )
      };
    }
    else if (cmd === 'joke') {
      const jokes = [
        "¿Por qué los programadores prefieren la oscuridad? Porque la luz atrae bugs! 🐛",
        "Un día, un programador fue al supermercado. Su esposa le dijo: 'Compra pan, y si hay huevos, trae una docena'. Regresó con 12 panes. 🍞",
        "¿Cuál es la diferencia entre un programador y un usuario normal? El programador piensa que hay 1000 ms en un segundo. ⏰",
        "¿Por qué los programadores siempre confunden Halloween con Navidad? Porque Oct 31 = Dec 25 🎃🎄",
        "Un programador llega tarde a una reunión y dice: 'Lo siento, tuve un problema de recursión infinita en casa... seguía presionando snooze' 😴",
        "¿Cómo reconoces a un programador extrovertido? Mira TUS zapatos cuando te habla 👠"
      ];
      
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">😄 Chiste de programación:</p>
            <p className="text-white italic">&quot;{randomJoke}&quot;</p>
            <p className="text-gray-400 text-sm">Escribe &quot;joke&quot; de nuevo para otro chiste</p>
          </div>
        )
      };
    }
    else if (cmd.startsWith('calc ')) {
      const expression = cmd.substring(5).trim();
      
      try {
        // Función segura para evaluar expresiones matemáticas básicas
        const safeEval = (expr: string): number => {
          // Remover espacios y validar caracteres permitidos
          const cleanExpr = expr.replace(/\s/g, '');
          
          if (!/^[0-9+\-*/.()]+$/.test(cleanExpr)) {
            throw new Error('Expresión contiene caracteres no válidos');
          }
          
          // Evaluar usando Function constructor (más seguro que eval)
          return Function('"use strict"; return (' + cleanExpr + ')')();
        };
        
        const result = safeEval(expression);
        
        newHistoryItem = {
          command: cmd,
          output: (
            <div className="space-y-1">
              <p className="text-emerald-300 font-bold">🧮 Resultado:</p>
              <p className="text-gray-300">Expresión: <span className="font-mono">{expression}</span></p>
              <p className="text-white font-mono text-lg">= {result}</p>
            </div>
          )
        };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        newHistoryItem = {
          command: cmd,
          output: (
            <div className="space-y-1">
              <p className="text-red-400 font-bold">❌ Error en el cálculo:</p>
              <p className="text-gray-300">Expresión: <span className="font-mono">{expression}</span></p>
              <p className="text-red-300">Usa solo números y operadores básicos (+, -, *, /, ())</p>
              <p className="text-gray-400 text-sm">Ejemplo: calc 2 + 2 * 3</p>
            </div>
          ),
          isError: true
        };
      }
    }
    else if (cmd === 'quote') {
      const quotes = [
        {
          text: "La mejor manera de predecir el futuro es inventarlo.",
          author: "Alan Kay"
        },
        {
          text: "El código es como el humor. Cuando tienes que explicarlo, es malo.",
          author: "Cory House"
        },
        {
          text: "Primero resuelve el problema. Luego, escribe el código.",
          author: "John Johnson"
        },
        {
          text: "La experiencia es el nombre que todos le dan a sus errores.",
          author: "Oscar Wilde"
        },
        {
          text: "El mejor código es el que no se escribe.",
          author: "Anónimo"
        },
        {
          text: "Los programadores son herramientas para convertir cafeína en código.",
          author: "Anónimo"
        },
        {
          text: "Cualquier tonto puede escribir código que una computadora pueda entender. Los buenos programadores escriben código que los humanos pueden entender.",
          author: "Martin Fowler"
        }
      ];
      
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">💭 Cita inspiracional:</p>
            <blockquote className="border-l-4 border-emerald-500 pl-4 italic">
              <p className="text-white">&quot;{randomQuote.text}&quot;</p>
              <footer className="text-gray-400 mt-2">— {randomQuote.author}</footer>
            </blockquote>
          </div>
        )
      };
    }
    else if (cmd === 'history') {
      const commandHistory = history.map(item => item.command).filter(cmd => cmd !== 'welcome');
      
      newHistoryItem = {
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold">📋 Historial de comandos:</p>
            {commandHistory.length > 0 ? (
              <ol className="list-decimal list-inside space-y-1">
                {commandHistory.map((cmd, index) => (
                  <li key={index} className="text-gray-300 font-mono">{cmd}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-400 italic">No hay comandos en el historial</p>
            )}
            <p className="text-gray-400 text-sm">Total de comandos ejecutados: {commandHistory.length}</p>
          </div>
        )
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
  }, [closeTerminal, history]);

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