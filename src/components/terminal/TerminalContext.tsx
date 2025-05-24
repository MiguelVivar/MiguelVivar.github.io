'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { proyectos } from '@/data/proyectos';
import { redesSociales } from '@/data/redes';

// Tipos
interface TerminalHistoryItem {
  command: string;
  output: ReactNode;
  isError?: boolean;
}

interface FileSystem {
  [key: string]: string | FileSystem;
}

interface TerminalContextType {
  history: TerminalHistoryItem[];
  isOpen: boolean;
  handleCommand: (command: string) => void;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
  clearHistory: () => void;
  currentPath: string;
  loading: boolean; // Estado para manejar operaciones asíncronas
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

// Función auxiliar para navegar por el sistema de archivos
const getCurrentDirectory = (path: string, fs: FileSystem): FileSystem => {
  const parts = path.split('/').filter(p => p);
  let current: FileSystem | string = fs;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return {} as FileSystem;
    }
  }
  
  return (typeof current === 'object' ? current : {}) as FileSystem;
};

// Proveedor que maneja el estado de la terminal
export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/home/miguel');
  const [loading, setLoading] = useState(false); // Estado para manejar operaciones asíncronas
  const router = useRouter();

  // Sistema de archivos simulado
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fileSystem: FileSystem = {
    home: {
      miguel: {
        'README.md': '# Miguel Vivar Portfolio\nBienvenido a mi portafolio interactivo.\n\n## Características\n- Terminal interactiva\n- Navegación por comandos\n- Easter eggs ocultos',
        'skills.txt': 'React, Next.js, TypeScript, Node.js, Python, MongoDB, PostgreSQL, Git, Docker, AWS',
        'bio.txt': 'Desarrollador Full Stack con pasión por crear experiencias web únicas.',
        projects: {
          'webapp.js': 'console.log("Proyecto de aplicación web con React y Node.js");',
          'mobile-app.dart': 'void main() { print("App móvil con Flutter"); }',
          'backend-api.py': 'print("API REST con Python y FastAPI")',
          'portfolio.md': '# Mi Portafolio\nPortafolio personal construido con Next.js'
        },
        secrets: {
          'easter-eggs.txt': '🥚 Has encontrado un easter egg! Escribe "konami" para una sorpresa.',
          'dev-diary.md': '# Diario de desarrollo\n## Día 1: Empezando el portafolio...\n## Día 30: Terminal implementada!\n## Día 45: Easter eggs añadidos'
        },
        downloads: {
          'cv.pdf': 'Curriculum Vitae - Miguel Vivar',
          'certificates.zip': 'Certificados de programación'
        }
      }
    },
    var: {
      log: {
        'system.log': 'Terminal iniciada correctamente...\nComandos disponibles cargados.\nSistema listo.',
        'access.log': '2024-01-01 10:00:00 - Usuario conectado\n2024-01-01 10:05:00 - Comando "help" ejecutado'
      }
    },
    usr: {
      bin: {
        'git': 'Git version control system',
        'npm': 'Node package manager',
        'code': 'Visual Studio Code editor',
        'node': 'Node.js runtime'
      }
    }
  };

  // Guardar y restaurar el estado de la terminal en localStorage
  useEffect(() => {
    const savedIsOpen = localStorage.getItem('terminal_is_open');
    if (savedIsOpen) {
      setIsOpen(savedIsOpen === 'true');
    }
  }, []);

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
            <div className="space-y-2">
              <p className="text-emerald-300 font-bold text-lg">🚀 ¡Bienvenido a la Terminal Interactiva de Miguel Vivar!</p>
              <p className="text-gray-300">Esta es una terminal completamente funcional con sistema de archivos simulado.</p>
              <p className="text-gray-300">Escribe <span className="text-emerald-300 font-mono bg-neutral-800 px-1 rounded">help</span> para ver todos los comandos disponibles.</p>
              <p className="text-yellow-300 text-sm">💡 Tip: Explora el sistema con <span className="font-mono">ls</span>, <span className="font-mono">cd</span> y <span className="font-mono">cat</span></p>
            </div>
          )
        }
      ]);
    }
  }, [history.length]);

  // Procesar comandos
  const handleCommand = useCallback((command: string) => {
    const fullCmd = command.trim();
    const [cmd, ...args] = fullCmd.toLowerCase().split(' ');
    
    let newHistoryItem: TerminalHistoryItem;

    if (cmd === '' || !cmd) {
      return;
    } 
    else if (cmd === 'clear') {
      setHistory([]);
      return;
    }    // Comandos de ayuda
    else if (cmd === 'help') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <p className="text-emerald-300 font-bold text-lg">📋 Comandos disponibles:</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Navegación del portafolio */}
              <div>
                <p className="text-yellow-300 font-semibold mb-2">🧭 Navegación del Portafolio:</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-emerald-300 font-mono">nav [sección]</span> - Navegar por el portafolio</p>
                  <p><span className="text-emerald-300 font-mono">home</span> - Ir a página principal</p>
                  <p><span className="text-emerald-300 font-mono">about</span> - Información sobre mí</p>
                  <p><span className="text-emerald-300 font-mono">skills</span> - Mis habilidades técnicas</p>
                  <p><span className="text-emerald-300 font-mono">projects</span> - Proyectos destacados</p>
                  <p><span className="text-emerald-300 font-mono">contact</span> - Información de contacto</p>
                  <p><span className="text-emerald-300 font-mono">socials</span> - Redes sociales</p>
                </div>
              </div>

              {/* Sistema de archivos */}
              <div>
                <p className="text-yellow-300 font-semibold mb-2">📁 Sistema de Archivos:</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-emerald-300 font-mono">ls / dir</span> - Listar archivos y directorios</p>
                  <p><span className="text-emerald-300 font-mono">cd [directorio]</span> - Cambiar directorio</p>
                  <p><span className="text-emerald-300 font-mono">pwd</span> - Mostrar directorio actual</p>
                  <p><span className="text-emerald-300 font-mono">cat [archivo]</span> - Mostrar contenido de archivo</p>
                  <p><span className="text-emerald-300 font-mono">find [nombre]</span> - Buscar archivos</p>
                  <p><span className="text-emerald-300 font-mono">tree</span> - Mostrar estructura de directorios</p>
                </div>
              </div>

              {/* Desarrollo */}
              <div>
                <p className="text-yellow-300 font-semibold mb-2">💻 Simulación de Desarrollo:</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-emerald-300 font-mono">git [comando]</span> - Comandos de Git</p>
                  <p><span className="text-emerald-300 font-mono">npm [comando]</span> - Comandos de NPM</p>
                  <p><span className="text-emerald-300 font-mono">code [archivo]</span> - Abrir en VS Code</p>
                  <p><span className="text-emerald-300 font-mono">whoami</span> - Usuario actual</p>
                  <p><span className="text-emerald-300 font-mono">ps</span> - Procesos en ejecución</p>
                </div>
              </div>

              {/* Divertidos */}
              <div>
                <p className="text-yellow-300 font-semibold mb-2">🎮 Comandos Divertidos:</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-emerald-300 font-mono">matrix</span> - Modo Matrix</p>
                  <p><span className="text-emerald-300 font-mono">coffee / café</span> - Obtener café ☕</p>
                  <p><span className="text-emerald-300 font-mono">fortune</span> - Sabiduría aleatoria</p>
                  <p><span className="text-emerald-300 font-mono">konami</span> - Código secreto</p>
                  <p><span className="text-emerald-300 font-mono">sudo [comando]</span> - Ejecutar como admin</p>
                  <p><span className="text-emerald-300 font-mono">joke</span> - Chiste aleatorio</p>
                </div>
              </div>

              {/* Juegos */}
              <div>
                <p className="text-yellow-300 font-semibold mb-2">🎯 Mini-Juegos:</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-emerald-300 font-mono">game</span> - Iniciar juego de adivinanzas</p>
                  <p><span className="text-emerald-300 font-mono">guess [número]</span> - Adivinar número (1-100)</p>
                </div>
              </div>

              {/* Arte ASCII */}
              <div>
                <p className="text-yellow-300 font-semibold mb-2">🎨 Arte ASCII:</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-emerald-300 font-mono">ascii logo</span> - Logo ASCII</p>
                  <p><span className="text-emerald-300 font-mono">ascii welcome</span> - Mensaje de bienvenida</p>
                  <p><span className="text-emerald-300 font-mono">theme [modo]</span> - Cambiar tema (hacker/retro)</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-neutral-800 rounded">
              <p className="text-yellow-300 font-semibold mb-2">🛠️ Utilidades:</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="text-emerald-300 font-mono">date</span> - Fecha y hora actual</p>
                  <p><span className="text-emerald-300 font-mono">weather</span> - Clima actual</p>
                  <p><span className="text-emerald-300 font-mono">calc [expresión]</span> - Calculadora</p>
                  <p><span className="text-emerald-300 font-mono">quote</span> - Cita inspiracional</p>
                </div>
                <div>
                  <p><span className="text-emerald-300 font-mono">history</span> - Historial de comandos</p>
                  <p><span className="text-emerald-300 font-mono">clear</span> - Limpiar terminal</p>
                  <p><span className="text-emerald-300 font-mono">exit</span> - Cerrar terminal</p>
                  <p><span className="text-emerald-300 font-mono">help</span> - Mostrar esta ayuda</p>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm italic mt-4">
              💡 Explora el directorio /home/miguel/secrets para encontrar easter eggs ocultos
            </p>
            <p className="text-blue-400 text-sm mt-2">
              ⚡ Comandos directos: <span className="font-mono">sobremi</span>, <span className="font-mono">proyectos</span>, <span className="font-mono">habilidades</span>, <span className="font-mono">contacto</span>
            </p>
          </div>
        )
      };
    }// Navegación del portafolio
    else if (cmd === 'nav' || cmd === 'portfolio') {
      const section = args[0];
      if (section) {
        // Mapeo de secciones a rutas reales
        const routeMap: { [key: string]: string } = {
          'home': '/',
          'inicio': '/',
          'about': '/sobremi',
          'sobremi': '/sobremi',
          'sobre-mi': '/sobremi',
          'projects': '/proyectos',
          'proyectos': '/proyectos',
          'skills': '/habilidades',
          'habilidades': '/habilidades',
          'contact': '/contacto',
          'contacto': '/contacto'
        };

        const route = routeMap[section.toLowerCase()];
        
        if (route) {
          // Navegar a la ruta
          router.push(route);
          
          newHistoryItem = {
            command: fullCmd,
            output: (
              <div className="space-y-2">
                <p className="text-emerald-300">🧭 Navegando a: <span className="text-yellow-300">{section}</span></p>
                <p className="text-green-400">✅ Redirigiendo a {route}...</p>
                <p className="text-gray-300 text-sm">Cerrando terminal en 2 segundos...</p>
              </div>
            )
          };
          
          // Cerrar la terminal después de navegar
          setTimeout(() => {
            setIsOpen(false);
          }, 2000);
        } else {
          newHistoryItem = {
            command: fullCmd,
            output: (
              <div className="space-y-2">
                <p className="text-red-400">❌ Sección no encontrada: <span className="text-yellow-300">{section}</span></p>
                <p className="text-gray-300">Secciones disponibles:</p>
                <div className="ml-4 space-y-1">
                  <p>🏡 <span className="text-yellow-300 font-mono">home</span> - Página principal</p>
                  <p>👨‍💻 <span className="text-yellow-300 font-mono">about</span> - Sobre mí</p>
                  <p>🚀 <span className="text-yellow-300 font-mono">projects</span> - Mis proyectos</p>
                  <p>⚡ <span className="text-yellow-300 font-mono">skills</span> - Habilidades técnicas</p>
                  <p>📬 <span className="text-yellow-300 font-mono">contact</span> - Información de contacto</p>
                </div>
              </div>
            ),
            isError: true
          };
        }
      } else {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-2">
              <p className="text-emerald-300">🏠 Secciones del portafolio:</p>
              <div className="ml-4 space-y-1">
                <p>🏡 <span className="text-yellow-300 font-mono">home</span> - Página principal</p>
                <p>👨‍💻 <span className="text-yellow-300 font-mono">about</span> - Sobre mí</p>
                <p>🚀 <span className="text-yellow-300 font-mono">projects</span> - Mis proyectos</p>
                <p>⚡ <span className="text-yellow-300 font-mono">skills</span> - Habilidades técnicas</p>
                <p>📬 <span className="text-yellow-300 font-mono">contact</span> - Información de contacto</p>
              </div>
              <p className="text-gray-400 text-sm">Uso: nav [sección]</p>
            </div>
          )
        };
      }
    }
    // Comandos directos de navegación
    else if (cmd === 'home' || cmd === 'inicio') {
      router.push('/');
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300">🏡 Navegando al inicio...</p>
            <p className="text-green-400">✅ Redirigiendo a la página principal</p>
          </div>
        )
      };
      setTimeout(() => setIsOpen(false), 1500);
    }
    else if (cmd === 'about' || cmd === 'sobremi' || cmd === 'sobre-mi') {
      router.push('/sobremi');
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300">👨‍💻 Navegando a Sobre Mí...</p>
            <p className="text-green-400">✅ Redirigiendo a /sobremi</p>
          </div>
        )
      };
      setTimeout(() => setIsOpen(false), 1500);
    }    else if (cmd === 'projects' || cmd === 'proyectos') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <p className="text-emerald-300 font-bold text-lg">🚀 Proyectos Destacados:</p>
            
            <div className="space-y-4">
              {proyectos.slice(0, 5).map((proyecto, index) => (
                <div key={index} className="border-l-4 border-emerald-500 pl-4 bg-neutral-800/50 p-3 rounded">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-yellow-300 font-semibold text-lg">{proyecto.titulo}</h3>
                      <p className="text-gray-300 text-sm mt-1 mb-3">{proyecto.descripcion}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {proyecto.tecnologias.map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs bg-emerald-700 text-white px-2 py-1 rounded">
                            {tech.nombre}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-sm">
                        {proyecto.enlaces.map((enlace, enlaceIndex) => (
                          <div key={enlaceIndex} className="flex items-center gap-1">
                            <span className={enlace.tipo === 'github' ? 'text-purple-400' : 'text-blue-400'}>
                              {enlace.tipo === 'github' ? '🔗' : '🌐'}
                            </span>
                            <span className="text-gray-300 capitalize">{enlace.tipo}:</span>
                            <span className="text-cyan-300 font-mono text-xs break-all">{enlace.url}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {proyecto.destacado && (
                      <span className="text-yellow-400 text-xl ml-2">⭐</span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs">
                    <span className="text-purple-300 bg-purple-900 px-2 py-1 rounded">
                      {proyecto.categoria}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-neutral-800 rounded">
              <p className="text-emerald-300 font-semibold mb-2">📊 Resumen de Proyectos:</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300">• <span className="text-yellow-300">Total:</span> {proyectos.length} proyectos</p>
                  <p className="text-gray-300">• <span className="text-yellow-300">Destacados:</span> {proyectos.filter(p => p.destacado).length}</p>
                </div>
                <div>
                  <p className="text-gray-300">• <span className="text-yellow-300">Frontend:</span> {proyectos.filter(p => p.categoria === 'Front-End').length}</p>
                  <p className="text-gray-300">• <span className="text-yellow-300">Full Stack:</span> {proyectos.filter(p => p.categoria === 'Full Stack').length}</p>
                </div>
              </div>
            </div>
            
            <p className="text-blue-400 text-sm mt-3">
              💡 Usa <span className="font-mono">nav proyectos</span> para ver todos los proyectos con imágenes y detalles completos
            </p>
          </div>
        )
      };
    }
    else if (cmd === 'skills' || cmd === 'habilidades') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <p className="text-emerald-300 font-bold text-lg">⚡ Habilidades Técnicas:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-yellow-300 font-semibold mb-2">🎨 Frontend Development:</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• <span className="text-green-400">HTML5</span> (Avanzado) - Estructura semántica y accesibilidad</li>
                  <li>• <span className="text-blue-400">CSS3</span> (Avanzado) - Flexbox, Grid, animaciones</li>
                  <li>• <span className="text-yellow-400">JavaScript</span> (Avanzado) - ES6+, DOM, async/await</li>
                  <li>• <span className="text-cyan-400">React</span> (Avanzado) - Componentes, hooks, context</li>
                  <li>• <span className="text-purple-400">Next.js</span> (Intermedio) - SSR, rutas API</li>
                </ul>
              </div>
              
              <div>
                <p className="text-yellow-300 font-semibold mb-2">🔧 Backend Development:</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• <span className="text-green-400">Node.js</span> (Avanzado) - Entorno JavaScript servidor</li>
                  <li>• <span className="text-gray-400">Express</span> (Avanzado) - Framework web minimalista</li>
                  <li>• <span className="text-blue-400">MongoDB</span> (Intermedio) - Base datos NoSQL</li>
                </ul>
              </div>
            </div>
            
            <p className="text-blue-400 text-sm mt-3">
              💡 Usa <span className="font-mono">nav habilidades</span> para ver la página completa de habilidades
            </p>
          </div>
        )
      };
    }
    else if (cmd === 'contact' || cmd === 'contacto') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <p className="text-emerald-300 font-bold text-lg">📬 Información de Contacto:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-neutral-800 rounded">
                  <span className="text-red-400 text-xl">📧</span>
                  <div>
                    <p className="text-yellow-300 font-semibold">Email Principal</p>
                    <p className="text-gray-300 font-mono text-sm">miguelvivarfarfan@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-neutral-800 rounded">
                  <span className="text-blue-400 text-xl">💼</span>
                  <div>
                    <p className="text-yellow-300 font-semibold">LinkedIn</p>
                    <p className="text-gray-300 font-mono text-sm">linkedin.com/in/miguel-vivar-farfan/</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-neutral-800 rounded">
                  <span className="text-purple-400 text-xl">🐙</span>
                  <div>
                    <p className="text-yellow-300 font-semibold">GitHub</p>
                    <p className="text-gray-300 font-mono text-sm">github.com/MiguelVivar</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-neutral-800 rounded">
                  <span className="text-pink-400 text-xl">📱</span>
                  <div>
                    <p className="text-yellow-300 font-semibold">Instagram</p>
                    <p className="text-gray-300 font-mono text-sm">@mvivarf</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-blue-400 text-sm mt-3">
              💡 Usa <span className="font-mono">nav contacto</span> para ir al formulario de contacto completo
            </p>
          </div>
        )
      };
    }
    // Sistema de archivos
    else if (cmd === 'ls' || cmd === 'dir') {
      const currentDir = getCurrentDirectory(currentPath, fileSystem);
      const items = Object.keys(currentDir);
      
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300">📁 Contenido de <span className="font-mono">{currentPath}</span>:</p>
            {items.length > 0 ? (
              <div className="ml-4 grid grid-cols-1 sm:grid-cols-2 gap-1">
                {items.map(item => {
                  const isDirectory = typeof currentDir[item] === 'object';
                  return (
                    <div key={item} className="flex items-center gap-2">
                      <span className={isDirectory ? 'text-blue-400' : 'text-gray-400'}>
                        {isDirectory ? '📁' : '📄'}
                      </span>
                      <span className={isDirectory ? 'text-blue-300 font-semibold' : 'text-gray-300'}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 ml-4">Directorio vacío</p>
            )}
            <p className="text-gray-400 text-sm">
              Usa <span className="font-mono">cd [directorio]</span> para navegar
            </p>
          </div>
        )
      };
    }
    else if (cmd === 'cd') {
      const newPath = args[0];
      if (!newPath) {
        setCurrentPath('/home/miguel');
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-emerald-300">🏠 Volviendo al directorio home</p>
        };
      } else if (newPath === '..') {
        const pathParts = currentPath.split('/').filter(p => p);
        pathParts.pop();
        const parentPath = '/' + pathParts.join('/');
        setCurrentPath(parentPath || '/');
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-emerald-300">📂 Subiendo a: <span className="font-mono">{parentPath || '/'}</span></p>
        };
      } else {
        const targetPath = newPath.startsWith('/') ? newPath : `${currentPath}/${newPath}`;
        const targetDir = getCurrentDirectory(targetPath, fileSystem);
        if (Object.keys(targetDir).length > 0) {
          setCurrentPath(targetPath);
          newHistoryItem = {
            command: fullCmd,
            output: <p className="text-emerald-300">📂 Cambiando a: <span className="font-mono">{targetPath}</span></p>
          };
        } else {
          newHistoryItem = {
            command: fullCmd,
            output: <p className="text-red-400">❌ Directorio no encontrado: <span className="font-mono">{targetPath}</span></p>,
            isError: true
          };
        }
      }
    }
    else if (cmd === 'pwd') {
      newHistoryItem = {
        command: fullCmd,
        output: <p className="text-emerald-300">📍 Directorio actual: <span className="font-mono bg-neutral-800 px-1 rounded">{currentPath}</span></p>
      };
    }
    else if (cmd === 'cat') {
      const fileName = args[0];
      if (!fileName) {
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-red-400">❌ Especifica un archivo: <span className="font-mono">cat [archivo]</span></p>,
          isError: true
        };
      } else {
        const currentDir = getCurrentDirectory(currentPath, fileSystem);
        const fileContent = currentDir[fileName];
        if (typeof fileContent === 'string') {
          newHistoryItem = {
            command: fullCmd,
            output: (
              <div className="space-y-2">
                <p className="text-emerald-300">📄 Contenido de <span className="font-mono">{fileName}</span>:</p>
                <pre className="text-gray-300 bg-neutral-800 p-3 rounded ml-4 whitespace-pre-wrap overflow-x-auto text-sm">
                  {fileContent}
                </pre>
              </div>
            )
          };        } else {
          newHistoryItem = {
            command: fullCmd,
            output: <p className="text-red-400">❌ Archivo no encontrado: <span className="font-mono">{fileName}</span></p>,
            isError: true
          };
        }
      }
    }
    else if (cmd === 'find') {
      const searchTerm = args[0];
      if (!searchTerm) {
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-red-400">❌ Especifica un término de búsqueda: <span className="font-mono">find [término]</span></p>,
          isError: true
        };
      } else {
        // Buscar en todo el sistema de archivos
        const searchResults: string[] = [];
        const searchInDir = (dir: FileSystem, path: string) => {
          Object.keys(dir).forEach(key => {
            const currentPath = path + '/' + key;
            if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
              searchResults.push(currentPath);
            }
            if (typeof dir[key] === 'object') {
              searchInDir(dir[key] as FileSystem, currentPath);
            }
          });
        };
        
        searchInDir(fileSystem, '');
        
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-2">
              <p className="text-emerald-300">🔍 Resultados de búsqueda para &quot;{searchTerm}&quot;:</p>
              {searchResults.length > 0 ? (
                <div className="ml-4 space-y-1">
                  {searchResults.map((result, index) => (
                    <p key={index} className="text-gray-300 font-mono text-sm">{result}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 ml-4">No se encontraron archivos que coincidan</p>
              )}
            </div>
          )
        };
      }
    }
    else if (cmd === 'tree') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const generateTree = (dir: FileSystem, prefix = '', _isLast = true): string[] => {
        const lines: string[] = [];
        const entries = Object.entries(dir);
        
        entries.forEach(([key, value], index) => {
          const isLastEntry = index === entries.length - 1;
          const connector = isLastEntry ? '└── ' : '├── ';
          const icon = typeof value === 'object' ? '📁' : '📄';
          
          lines.push(`${prefix}${connector}${icon} ${key}`);
          
          if (typeof value === 'object') {
            const nextPrefix = prefix + (isLastEntry ? '    ' : '│   ');
            lines.push(...generateTree(value as FileSystem, nextPrefix, isLastEntry));
          }
        });
        
        return lines;
      };
      
      const currentDir = getCurrentDirectory(currentPath, fileSystem);
      const treeLines = generateTree(currentDir);
      
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-1">
            <p className="text-emerald-300">🌳 Estructura de directorios desde {currentPath}:</p>
            <pre className="text-gray-300 font-mono text-sm ml-4">
              {treeLines.join('\n')}
            </pre>
          </div>
        )
      };
    }
    else if (cmd === 'game') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <p className="text-emerald-300 font-bold">🎮 Mini-Juego: Adivina el Número</p>
            <div className="bg-neutral-800 p-4 rounded">
              <p className="text-yellow-300">He pensado un número entre 1 y 100.</p>
              <p className="text-gray-300">Usa: <span className="font-mono">guess [número]</span> para adivinar</p>
              <p className="text-gray-300">Ejemplo: <span className="font-mono">guess 50</span></p>
            </div>
            <p className="text-blue-400">¡Buena suerte! 🍀</p>
          </div>
        )
      };
      // Guardar número secreto en localStorage
      localStorage.setItem('secretNumber', Math.floor(Math.random() * 100 + 1).toString());
      localStorage.setItem('guessCount', '0');
    }
    else if (cmd === 'guess') {
      const guess = parseInt(args[0]);
      const secretNumber = parseInt(localStorage.getItem('secretNumber') || '0');
      const guessCount = parseInt(localStorage.getItem('guessCount') || '0') + 1;
      
      if (!args[0] || isNaN(guess)) {
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-red-400">❌ Proporciona un número válido: <span className="font-mono">guess [1-100]</span></p>,
          isError: true
        };
      } else if (guess < 1 || guess > 100) {
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-red-400">❌ El número debe estar entre 1 y 100</p>,
          isError: true
        };
      } else {
        localStorage.setItem('guessCount', guessCount.toString());
        
        if (guess === secretNumber) {
          newHistoryItem = {
            command: fullCmd,
            output: (
              <div className="space-y-2 text-center">
                <p className="text-6xl">🎉</p>
                <p className="text-emerald-300 font-bold">¡CORRECTO!</p>
                <p className="text-yellow-300">El número era {secretNumber}</p>
                <p className="text-gray-300">Lo adivinaste en {guessCount} intentos</p>
                <p className="text-blue-400">Escribe <span className="font-mono">game</span> para jugar otra vez</p>
              </div>
            )
          };
          localStorage.removeItem('secretNumber');
          localStorage.removeItem('guessCount');
        } else {
          const hint = guess < secretNumber ? 'más alto' : 'más bajo';
          newHistoryItem = {
            command: fullCmd,
            output: (
              <div className="space-y-1">
                <p className="text-yellow-300">🎯 Intento #{guessCount}: {guess}</p>
                <p className="text-blue-400">💡 El número es {hint}</p>
                <p className="text-gray-300">Sigue intentando...</p>
              </div>
            )
          };
        }
      }
    }
    else if (cmd === 'ascii') {
      const art = args[0];
      if (art === 'logo') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <pre className="text-emerald-300 font-mono text-xs">
{`    __  ____            __   _    ___                 
   /  |/  (_)___  __  __/ /__| |  / (_)   ______ ______
  / /|_/ / / __ \\/ / / / / _ \\ | / / / | / / __ \`/ ___/
 / /  / / / /_/ / /_/ / /  __/ |/ / /| |/ / /_/ / /    
/_/  /_/_/\\__, /\\__,_/_/\\___/|___/_/ |___/\\__,_/_/     
         /____/                                       
    ╔══════════════════════════════════════════════╗
    ║           Full Stack Developer               ║
    ╚══════════════════════════════════════════════╝`}
            </pre>
          )
        };
      } else if (art === 'welcome') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <pre className="text-blue-400 font-mono text-xs">
{`
 ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
 ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
 ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
 ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
 ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
  ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
`}
            </pre>
          )
        };
      } else {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-2">
              <p className="text-emerald-300">🎨 Arte ASCII disponible:</p>
              <p className="text-gray-300">• <span className="font-mono">ascii logo</span> - Logo de Miguel Vivar</p>
              <p className="text-gray-300">• <span className="font-mono">ascii welcome</span> - Mensaje de bienvenida</p>
            </div>
          )
        };
      }
    }
    else if (cmd === 'theme') {
      const themeMode = args[0];
      if (themeMode === 'hacker') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-2 bg-black text-green-400 p-3 rounded border border-green-500">
              <p className="font-mono">MODO HACKER ACTIVADO</p>
              <p className="font-mono text-xs">Access granted... Bypassing firewall...</p>
              <p className="font-mono text-xs">Downloading portfolio data... 100%</p>
              <p className="text-emerald-300">🔓 Bienvenido al lado oscuro del desarrollo</p>
            </div>
          )
        };
      } else if (themeMode === 'retro') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-2 bg-purple-900 text-cyan-300 p-3 rounded border border-cyan-400">
              <p className="font-mono">MODO RETRO ACTIVADO</p>
              <p className="font-mono text-xs">Loading COMMODORE 64 interface...</p>
              <p className="font-mono text-xs">READY.</p>
              <p className="text-yellow-300">🕹️ Bienvenido a los 80s!</p>
            </div>
          )
        };
      } else {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-2">
              <p className="text-emerald-300">🎨 Temas disponibles:</p>
              <p className="text-gray-300">• <span className="font-mono">theme hacker</span> - Modo Matrix/Hacker</p>
              <p className="text-gray-300">• <span className="font-mono">theme retro</span> - Estilo años 80</p>
            </div>
          )
        };
      }
    }
    else if (cmd === 'joke') {
      const jokes = [
        "¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs! 🐛",
        "Un programador va al médico: 'Doctor, me duelen los arrays'. El médico: 'Es normal, están indexados desde 0' 📊",
        "¿Cómo se llama un programador que no usa Git? Un valiente... o un loco 😅",
        "99 little bugs in the code, 99 little bugs. Take one down, patch it around, 127 little bugs in the code! 🔄",
        "¿Por qué los programadores odian la naturaleza? Porque tiene demasiados bugs y no pueden hacer debug 🌲"
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300">😂 Chiste de programador:</p>
            <p className="text-gray-300 italic bg-neutral-800 p-3 rounded">{randomJoke}</p>
          </div>
        )
      };
    }
    else if (cmd === 'git') {
      const gitCmd = args[0];
      if (gitCmd === 'status') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1 font-mono text-sm">
              <p className="text-emerald-300">🔄 Estado del repositorio:</p>
              <p className="text-green-400">On branch main</p>
              <p className="text-gray-300">Your branch is up to date with &quot;origin/main&quot;.</p>
              <p className="text-gray-300">nothing to commit, working tree clean</p>
              <p className="text-blue-400 mt-2">Archivos rastreados: 42</p>
            </div>
          )
        };
      } else if (gitCmd === 'log') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-2 font-mono text-sm">
              <p className="text-emerald-300">📝 Historial de commits recientes:</p>
              <div className="space-y-2 ml-4">
                <div>
                  <p className="text-yellow-400">commit a1b2c3d</p>
                  <p className="text-gray-300">feat: Añadir terminal interactiva mejorada</p>
                  <p className="text-gray-400 text-xs">hace 2 horas</p>
                </div>
                <div>
                  <p className="text-yellow-400">commit d4e5f6g</p>
                  <p className="text-gray-300">style: Mejorar diseño responsive</p>
                  <p className="text-gray-400 text-xs">hace 1 día</p>
                </div>
                <div>
                  <p className="text-yellow-400">commit g7h8i9j</p>
                  <p className="text-gray-300">fix: Corregir navegación móvil</p>
                  <p className="text-gray-400 text-xs">hace 3 días</p>
                </div>
              </div>
            </div>
          )
        };
      } else if (gitCmd === 'branch') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="font-mono text-sm">
              <p className="text-emerald-300">🌿 Ramas disponibles:</p>
              <p className="text-green-400">* main</p>
              <p className="text-gray-300">  develop</p>
              <p className="text-gray-300">  feature/terminal-upgrade</p>
            </div>
          )
        };
      } else {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1">
              <p className="text-emerald-300">🔧 Comandos Git disponibles:</p>
              <p className="text-gray-300">git status, git log, git branch, git --version</p>
            </div>
          )
        };
      }
    }
    else if (cmd === 'npm') {
      const npmCmd = args[0];
      if (npmCmd === 'run') {
        const script = args[1] || 'dev';
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1 font-mono text-sm">
              <p className="text-emerald-300">🚀 Ejecutando script: {script}</p>
              <p className="text-blue-400">npm run {script}</p>
              <p className="text-gray-300">✓ Compilación exitosa</p>
              <p className="text-gray-300">✓ Ready on http://localhost:3000</p>
              <p className="text-yellow-300">✓ Optimized for production</p>
            </div>
          )
        };      } else if (npmCmd === 'install') {
        const packageName = args[1] || 'dependencies';
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1 font-mono text-sm">
              <p className="text-emerald-300">📦 Instalando {packageName}...</p>
              <p className="text-gray-300">npm WARN deprecated...</p>
              <p className="text-green-400">✓ Instalación completada</p>
              <p className="text-gray-300">added 42 packages in 3.2s</p>
            </div>
          )
        };
      } else if (npmCmd === 'test') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1 font-mono text-sm">
              <p className="text-emerald-300">🧪 Ejecutando tests...</p>
              <p className="text-green-400">✓ Terminal.test.tsx</p>
              <p className="text-green-400">✓ Navigation.test.tsx</p>
              <p className="text-green-400">Tests: 24 passed, 24 total</p>
            </div>
          )
        };
      } else {
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-gray-300 font-mono">npm version 9.8.1</p>
        };
      }
    }
    else if (cmd === 'code') {
      const file = args[0] || '.';
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-1">
            <p className="text-emerald-300">💻 Abriendo VS Code...</p>
            <p className="text-gray-300">✓ <span className="font-mono">{file}</span> abierto en Visual Studio Code</p>
            <p className="text-blue-400 text-sm">Extensiones cargadas: 15</p>
          </div>
        )
      };
    }
    else if (cmd === 'ps') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-1 font-mono text-sm">
            <p className="text-emerald-300">🔄 Procesos en ejecución:</p>
            <div className="ml-4 space-y-1">
              <p className="text-gray-300">PID  CMD</p>
              <p className="text-gray-300">1234 next-dev-server</p>
              <p className="text-gray-300">5678 terminal-process</p>
              <p className="text-gray-300">9012 portfolio-watcher</p>
            </div>
          </div>
        )
      };
    }
    // Easter eggs y comandos divertidos
    else if (cmd === 'konami') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3 text-center">
            <div className="text-6xl animate-bounce">🎉</div>
            <p className="text-emerald-300 font-bold text-xl">¡CÓDIGO KONAMI ACTIVADO!</p>
            <p className="text-yellow-300 text-lg">+30 vidas añadidas para programar 😄</p>
            <p className="text-gray-300 font-mono">↑↑↓↓←→←→BA</p>
            <p className="text-purple-300">¡Modo desarrollador desbloqueado!</p>
          </div>
        )
      };
    }
    else if (cmd === 'matrix') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2 font-mono text-green-400">
            <p>01101000 01100101 01101100 01101100 01101111</p>
            <p>01110111 01101111 01110010 01101100 01100100</p>
            <p>01100011 01101111 01100100 01100101 01110010</p>
            <p className="text-emerald-300 mt-3 text-center">🔋 Bienvenido a la Matrix, Neo...</p>
            <p className="text-gray-300 text-center text-sm">La píldora roja: programar. La azul: ver Netflix.</p>
          </div>
        )
      };
    }
    else if (cmd === 'coffee' || cmd === 'café') {
      const coffeTypes = ['☕ Espresso', '☕ Americano', '☕ Latte', '☕ Cappuccino', '☕ Mocha'];
      const randomCoffee = coffeTypes[Math.floor(Math.random() * coffeTypes.length)];
      
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="text-center space-y-2">
            <p className="text-4xl">☕</p>
            <p className="text-yellow-300 font-bold">{randomCoffee} servido!</p>
            <p className="text-gray-300">+10 energía para programar</p>
            <p className="text-gray-300 text-sm">Cafeína necesaria detectada ✓</p>
          </div>
        )
      };
    }
    else if (cmd === 'sudo') {
      const sudoCmd = args.join(' ');
      if (sudoCmd === 'make coffee') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1">
              <p className="text-red-400">sudo: make: command not found</p>
              <p className="text-gray-300">¿Probaste con &quot;coffee&quot; o &quot;café&quot;? 😉</p>
              <p className="text-yellow-300 text-sm">Tip: La cafetera no funciona con sudo</p>
            </div>
          )
        };
      } else if (sudoCmd === 'rm -rf /') {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1">
              <p className="text-red-400">❌ Acceso denegado</p>
              <p className="text-gray-300">Nice try, pero este es un sistema protegido 😏</p>
            </div>
          )
        };
      } else {
        newHistoryItem = {
          command: fullCmd,
          output: (
            <div className="space-y-1">
              <p className="text-red-400">[sudo] password for miguel: ********</p>
              <p className="text-gray-300">Comando ejecutado con privilegios de administrador</p>
            </div>
          )
        };
      }
    }    else if (cmd === 'whoami') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-emerald-300 font-bold text-lg">Miguel Vivar Farfan</p>
              <p className="text-blue-400 font-mono">Full Stack Developer | Estudiante de Ingeniería</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">📍 <span className="text-yellow-300">Ica, Perú</span></p>
              <p className="text-gray-300">🎓 <span className="text-yellow-300">Ingeniería de Sistemas - UNI (Ciclo 4/10)</span></p>
              <p className="text-gray-300">💼 <span className="text-yellow-300">Team Member en GDG Ica</span></p>
              <p className="text-gray-300">🚀 <span className="text-yellow-300">Organizador InnovaTech Ica 2025</span></p>
              <p className="text-gray-300">☕ <span className="text-yellow-300">Estado: Cafeinado y programando</span></p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="bg-emerald-800 text-emerald-200 px-2 py-1 rounded">React</span>
              <span className="bg-blue-800 text-blue-200 px-2 py-1 rounded">Next.js</span>
              <span className="bg-purple-800 text-purple-200 px-2 py-1 rounded">TypeScript</span>
              <span className="bg-green-800 text-green-200 px-2 py-1 rounded">Node.js</span>
            </div>
          </div>
        )
      };
    }
    else if (cmd === 'fortune') {
      const fortunes = [
        "El código más elegante es el que nunca se escribe.",
        "Primero haz que funcione, luego hazlo rápido.",
        "La optimización prematura es la raíz de todos los males.",
        "Un buen programador es como un ninja: silencioso y eficaz.",
        "El mejor comentario es el código que se explica a sí mismo.",
        "Programar es como escribir un libro... que solo las máquinas pueden leer.",
        "No hay problema que no se pueda resolver con una taza más de café.",
        "El debugging es como ser detective en una novela de crimen donde también eres el asesino."
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2">
            <p className="text-yellow-300">🔮 Sabiduría del desarrollador:</p>
            <blockquote className="text-gray-300 italic border-l-4 border-emerald-500 pl-4">
              &quot;{randomFortune}&quot;
            </blockquote>
          </div>
        )
      };
    }    // Comandos originales mantenidos
    else if (cmd === 'about') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-emerald-300 font-bold text-lg">👨‍💻 Miguel Vivar Farfan</p>
              <p className="text-blue-400">Full Stack Developer | Estudiante de Ingeniería</p>
            </div>
            
            <div className="space-y-2 text-gray-300">
              <p>🚀 Desarrollador Full Stack especializado en tecnologías web modernas</p>
              <p>🎓 Estudiante de Ingeniería de Sistemas - Universidad Nacional de Ingeniería (Ciclo 4/10)</p>
              <p>🌟 Enfocado en React, Next.js, TypeScript y Node.js</p>
              <p>📍 Ubicado en Ica, Perú</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-neutral-800 rounded">
                <p className="text-yellow-300 font-semibold mb-2">🎯 Experiencia:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Team Member en Google Developer Groups Ica</li>
                  <li>• Organizador de InnovaTech Ica 2025</li>
                  <li>• Desarrollo de plataformas web y móviles</li>
                  <li>• Certificaciones en freeCodeCamp y Cisco</li>
                </ul>
              </div>
              
              <div className="p-3 bg-neutral-800 rounded">
                <p className="text-yellow-300 font-semibold mb-2">💡 Valores:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Innovación y mejora continua</li>
                  <li>• Compromiso con la calidad</li>
                  <li>• Colaboración en equipo</li>
                  <li>• Puntualidad y proactividad</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-emerald-800 text-emerald-200 px-2 py-1 rounded text-xs">HTML5 - Avanzado</span>
              <span className="bg-blue-800 text-blue-200 px-2 py-1 rounded text-xs">CSS3 - Avanzado</span>
              <span className="bg-yellow-800 text-yellow-200 px-2 py-1 rounded text-xs">JavaScript - Avanzado</span>
              <span className="bg-purple-800 text-purple-200 px-2 py-1 rounded text-xs">TypeScript - Intermedio</span>
              <span className="bg-cyan-800 text-cyan-200 px-2 py-1 rounded text-xs">React - Avanzado</span>
              <span className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs">Next.js - Intermedio</span>
            </div>
          </div>
        )
      };    // Projects command is already implemented elsewhere    // Contact command is already implemented elsewhere    } else if (cmd === 'socials' || cmd === 'redes') {
        newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-3">
            <p className="text-emerald-300 font-bold text-lg">🌐 Redes Sociales y Contacto:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {redesSociales.map((red, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
                  <span className="text-2xl">
                    {red.nombre === 'Email' && '📧'}
                    {red.nombre === 'LinkedIn' && '💼'}
                    {red.nombre === 'GitHub' && '🐙'}
                    {red.nombre === 'Instagram' && '📱'}
                  </span>
                  <div className="flex-1">
                    <p className="text-yellow-300 font-semibold">{red.nombre}</p>
                    <p className="text-gray-300 text-sm font-mono break-all">{red.usuario}</p>
                    <p className="text-cyan-300 text-xs font-mono break-all">{red.enlace}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded border border-purple-500/30">
              <p className="text-purple-300 font-semibold mb-2">🤝 Conectemos:</p>
              <div className="text-gray-300 text-sm space-y-1">
                <p>• <span className="text-yellow-300">GitHub:</span> Mira mis repositorios y contribuciones</p>
                <p>• <span className="text-yellow-300">LinkedIn:</span> Conecta profesionalmente conmigo</p>
                <p>• <span className="text-yellow-300">Instagram:</span> Sigueme para contenido behind-the-scenes</p>
                <p>• <span className="text-yellow-300">Email:</span> Para colaboraciones y proyectos</p>
              </div>
            </div>
            
            <div className="mt-4 text-center p-3 bg-emerald-900/20 rounded border border-emerald-500/30">
              <p className="text-emerald-300 font-semibold">📬 ¡Hablemos!</p>
              <p className="text-gray-300 text-sm mt-1">
                Siempre abierto a nuevas oportunidades y colaboraciones interesantes
              </p>
            </div>
            
            <p className="text-blue-400 text-sm mt-3">
              💡 Usa <span className="font-mono">nav contact</span> para ver toda la información de contacto
            </p>
          </div>
        )
      };
    }
    // Utilidades
    else if (cmd === 'date') {
      const now = new Date();
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-1">
            <p className="text-emerald-300">🕐 Fecha y hora actual:</p>
            <p className="text-gray-300 font-mono">{now.toLocaleString('es-PE', { 
              timeZone: 'America/Lima',
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}</p>
            <p className="text-gray-400 text-sm">Zona horaria: Lima, Perú (UTC-5)</p>
          </div>
        )
      };    } else if (cmd === 'weather') {
      // Indicamos que estamos cargando mientras se consulta la API
      setLoading(true);
      
      // Añadimos un mensaje de carga temporal
      const loadingHistoryItem: TerminalHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2 animate-pulse">
            <p className="text-emerald-300">🌤️ Obteniendo datos del clima para Ica, Perú...</p>
            <p className="text-gray-400 text-sm">Conectando con OpenWeatherMap API...</p>
          </div>
        )
      };
      
      // Añadir el mensaje de carga al historial
      setHistory(prev => [...prev, loadingHistoryItem]);
      
      // Importamos el módulo de clima y obtenemos los datos de la API
      import('@/lib/weatherApi').then(async (weatherModule) => {
        try {
          const weatherData = await weatherModule.getWeatherForIca();
          let resultItem: TerminalHistoryItem;
            if ('error' in weatherData) {
            // Si hay error, mostramos datos offline con información sobre el problema
            resultItem = {
              command: fullCmd,
              output: (
                <div className="space-y-2">
                  <p className="text-emerald-300">🌤️ Clima en Ica, Perú:</p>
                  <div className="bg-neutral-800 p-3 rounded">
                    <p className="text-yellow-300">☀️ Soleado - 28°C</p>
                    <p className="text-gray-300 text-sm">Humedad: 45% | Viento: 12 km/h</p>
                    <p className="text-gray-300 text-sm">Perfecto para programar al aire libre 🌴</p>
                    <div className="mt-3 p-2 bg-red-900/30 border border-red-700 rounded">
                      <p className="text-red-400 text-xs font-semibold">⚠️ API Status: {weatherData.error}</p>
                      {weatherData.error.includes('API key inválida') && (
                        <div className="mt-2 text-xs text-gray-300">
                          <p>💡 Para obtener datos en tiempo real:</p>
                          <p>1. Regístrate en: <span className="text-blue-400">https://openweathermap.org/api</span></p>
                          <p>2. Obtén tu API key gratuita</p>
                          <p>3. Actualiza NEXT_PUBLIC_OPENWEATHER_API_KEY en tu .env</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            };
          } else {
            // Convertimos temperatura de Kelvin a Celsius
            const tempC = weatherModule.kelvinToCelsius(weatherData.main.temp);
            const emoji = weatherModule.getWeatherEmoji(weatherData.weather[0].main);
            
            resultItem = {
              command: fullCmd,
              output: (
                <div className="space-y-2">
                  <p className="text-emerald-300">🌤️ Clima en tiempo real - Ica, Perú:</p>
                  <div className="bg-neutral-800 p-3 rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{emoji}</span>
                      <p className="text-yellow-300 font-semibold">
                        {weatherData.weather[0].description.charAt(0).toUpperCase() + 
                         weatherData.weather[0].description.slice(1)} - {tempC}°C
                      </p>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">
                      Sensación térmica: {weatherModule.kelvinToCelsius(weatherData.main.feels_like)}°C
                    </p>
                    <p className="text-gray-300 text-sm">
                      Humedad: {weatherData.main.humidity}% | 
                      Viento: {Math.round(weatherData.wind.speed * 3.6)} km/h
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Datos obtenidos en tiempo real vía OpenWeatherMap API | {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )
            };
          }
          
          // Reemplazamos el mensaje de carga con el resultado real
          setHistory(prevHistory => {
            // Creamos una nueva copia del historial sin el mensaje de carga
            const newHistory = [...prevHistory];
            // Reemplazamos el último elemento (mensaje de carga) con el resultado real
            newHistory[newHistory.length - 1] = resultItem;
            return newHistory;
          });
          
        } catch (error) {
          // En caso de error, mostramos un mensaje de error
          const errorItem: TerminalHistoryItem = {
            command: fullCmd,
            output: (
              <div className="text-red-400">
                <p>❌ Error obteniendo datos del clima:</p>
                <p className="text-sm">{String(error)}</p>
                <p className="mt-2">Usando datos offline...</p>
                <div className="bg-neutral-800 p-3 rounded mt-2">
                  <p className="text-yellow-300">☀️ Soleado - 28°C</p>
                  <p className="text-gray-300 text-sm">Humedad: 45% | Viento: 12 km/h</p>
                </div>
              </div>
            ),
            isError: true
          };
          
          // Reemplazamos el mensaje de carga con el mensaje de error
          setHistory(prevHistory => {
            const newHistory = [...prevHistory];
            newHistory[newHistory.length - 1] = errorItem;
            return newHistory;
          });
        } finally {
          setLoading(false);
        }
      });
      
      // No devolvemos nada porque ya hemos añadido un elemento al historial
      return;
    }
    else if (cmd === 'calc') {
      const expression = args.join(' ');
      if (!expression) {
        newHistoryItem = {
          command: fullCmd,
          output: <p className="text-red-400">❌ Proporciona una expresión: calc 2 + 2</p>,
          isError: true
        };
      } else {
        try {
          // Simple y seguro evaluador de expresiones matemáticas
          const result = Function('"use strict"; return (' + expression.replace(/[^0-9+\-*/().]/g, '') + ')')();
          newHistoryItem = {
            command: fullCmd,
            output: (
              <div className="space-y-1">
                <p className="text-emerald-300">🧮 Resultado:</p>
                <p className="text-yellow-300 font-mono text-lg">{expression} = {result}</p>
              </div>
            )
          };
        } catch {
          newHistoryItem = {
            command: fullCmd,
            output: <p className="text-red-400">❌ Expresión matemática inválida</p>,
            isError: true
          };
        }
      }
    }
    else if (cmd === 'quote') {
      const quotes = [
        { text: "La innovación distingue a los líderes de los seguidores.", author: "Steve Jobs" },
        { text: "El código es como el humor. Cuando tienes que explicarlo, es malo.", author: "Cory House" },
        { text: "Primero resuelve el problema. Luego, escribe el código.", author: "John Johnson" },
        { text: "La experiencia es el nombre que damos a nuestros errores.", author: "Oscar Wilde" },
        { text: "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.", author: "Proverbio chino" }
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300">💭 Cita inspiracional:</p>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic">
              <p className="text-gray-300">&quot;{randomQuote.text}&quot;</p>
              <footer className="text-yellow-300 text-sm mt-1">— {randomQuote.author}</footer>
            </blockquote>
          </div>
        )
      };
    }
    else if (cmd === 'history') {
      const commandHistory = history.filter(item => item.command !== 'welcome').map(item => item.command);
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2">
            <p className="text-emerald-300">📜 Historial de comandos:</p>
            <div className="ml-4 space-y-1 max-h-48 overflow-y-auto">
              {commandHistory.length > 0 ? (
                commandHistory.map((cmd, index) => (
                  <p key={index} className="text-gray-300 font-mono text-sm">
                    {index + 1}. {cmd}
                  </p>
                ))
              ) : (
                <p className="text-gray-400">No hay comandos en el historial</p>
              )}
            </div>
          </div>
        )
      };
    }
    else if (cmd === 'exit') {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-2 text-center">
            <p className="text-emerald-300">👋 ¡Hasta luego!</p>
            <p className="text-gray-300">Cerrando terminal...</p>
            <p className="text-yellow-300 text-sm">Gracias por explorar mi portafolio</p>
          </div>
        )
      };
      setTimeout(() => {
        closeTerminal();
      }, 2000);
    }
    // Comandos no reconocidos
    else {
      newHistoryItem = {
        command: fullCmd,
        output: (
          <div className="space-y-1">
            <p className="text-red-400">❌ Comando no reconocido: <span className="font-mono">{cmd}</span></p>
            <p className="text-gray-300">Escribe <span className="text-emerald-300 font-mono">help</span> para ver los comandos disponibles.</p>
          </div>
        ),      isError: true
      };
    }

    // Añadir al historial
    setHistory(prev => [...prev, newHistoryItem]);
  }, [currentPath, fileSystem, history, closeTerminal, router]);

  const value: TerminalContextType = {
    history,
    isOpen,
    handleCommand,
    openTerminal,
    closeTerminal,
    toggleTerminal,
    clearHistory,
    currentPath,
    loading // Proporcionar el estado de loading
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};
