'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaCode } from 'react-icons/fa';
import TechnologyBadge from './TechnologyBadge';
import Link from 'next/link';

interface Proyecto {
  imagen: string | { src: string };
  destacado?: boolean;
  categoria?: string;
  titulo: string;
  descripcion: string;
  tecnologias: Array<{
    nombre: string;
    icono: React.ReactNode;
  }>;
  porcentajeAvance?: string;
  enlaces: Array<{
    tipo: string;
    url: string;
  }>;
}

interface ProjectDetailsProps {
  proyecto: Proyecto;
  onClose: () => void;
  isOpen: boolean;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ proyecto, onClose, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Cerrar modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    // Cerrar con la tecla Escape
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            ref={modalRef}
            className="bg-neutral-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header con imagen de fondo */}
            <div className="relative h-60 sm:h-72">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(${typeof proyecto.imagen === 'string' ? proyecto.imagen : proyecto.imagen.src})`,
                  backgroundPosition: 'center top'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
              
              {/* Botón de cerrar */}
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                aria-label="Cerrar"
              >
                <FiX size={20} />
              </button>
              
              {/* Badge destacado */}
              {proyecto.destacado && (
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Destacado
                </div>
              )}
              
              {/* Categoría */}
              {proyecto.categoria && (
                <div className="absolute bottom-4 left-4 bg-neutral-900/80 text-white text-sm px-3 py-1 rounded-md backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <FaCode />
                    <span>{proyecto.categoria}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{proyecto.titulo}</h2>
              
              <p className="text-gray-300 mb-6">{proyecto.descripcion}</p>
              
              {/* Tecnologías */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  {proyecto.tecnologias.map((tech, index: number) => (
                      <TechnologyBadge key={index} tech={tech} />
                    ))}
                </div>
              </div>
              
              {/* Detalles adicionales - ejemplo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Características</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Diseño responsivo</li>
                    <li>Optimizado para SEO</li>
                    <li>Animaciones fluidas</li>
                    <li>Rendimiento optimizado</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Estado del proyecto</h3>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-neutral-700 rounded-full h-2.5">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${proyecto.porcentajeAvance || (proyecto.destacado ? "75%" : "100%")}` }}></div>
                    </div>
                    <span className="ml-2 text-sm text-white">{proyecto.porcentajeAvance || (proyecto.destacado ? "75%" : "100%")}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {proyecto.destacado 
                      ? "Proyecto en desarrollo activo"
                      : "Proyecto completado"}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Footer con enlaces */}
            <div className="border-t border-neutral-700 p-4">
              <div className="flex justify-end gap-3">
                {proyecto.enlaces.map((enlace: { tipo: string; url: string }, index: number) => (
                  <Link 
                    key={index}
                    href={enlace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      enlace.tipo === 'github' 
                        ? 'bg-neutral-700 text-white hover:bg-neutral-600' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {enlace.tipo === 'github' ? <FiGithub /> : <FiExternalLink />}
                    {enlace.tipo === 'github' ? 'Ver código' : 'Ver demo'}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetails;