'use client';

import React, { JSX, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectFeatureBadge from './ProjectFeatureBadge';
import ProjectImage from './ProjectImage';
import TechnologyBadge from './TechnologyBadge';
import ProjectLinks from './ProjectLinks';
import ProjectDetails from './ProjectDetails';
import { StaticImageData } from 'next/image';

// Tipo para el proyecto
declare global {
  interface Proyecto {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string | StaticImageData;
    tecnologias: { nombre: string; icono: JSX.Element; }[];
    enlaces: { tipo: string; url: string; }[];
    destacado: boolean;
    categoria: string;
  }
}

interface ProjectCardProps {
  proyecto: Proyecto;
  index: number;
  listView?: boolean;
}

// Variante de animación para el elemento
const elementoVariantes = {
  oculto: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      duration: 0.5,
    }
  },
  salida: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ proyecto, listView = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Vista de lista
  if (listView) {
    return (
      <>
        <motion.div
          variants={elementoVariantes}
          className={`bg-neutral-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col sm:flex-row ${proyecto.destacado ? 'border-l-4 border-emerald-300' : 'border-l-4 border-transparent'} cursor-pointer relative`}
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.99 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setShowDetails(true)}
        >
          {/* Imagen del proyecto (solo visible en mobile o cuando se hace hover) */}
          <div className={`sm:w-48 h-40 sm:h-auto ${isHovered ? 'sm:opacity-100' : 'sm:opacity-80'} transition-all duration-300`}>
            <ProjectImage 
              src={proyecto.imagen} 
              alt={`Imagen del proyecto ${proyecto.titulo}`}
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Contenido del proyecto */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {proyecto.titulo}
                </h3>
                {proyecto.destacado && <ProjectFeatureBadge position="inline" />}
              </div>
              <p className="text-gray-400 mb-4">
                {proyecto.descripcion}
              </p>
              
              {/* Categoría */}
              {proyecto.categoria && (
                <span className="inline-block bg-neutral-700 text-xs text-gray-300 px-2 py-1 rounded mb-3">
                  {proyecto.categoria}
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap justify-between items-end">
              {/* Tecnologías utilizadas */}
              <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                {proyecto.tecnologias.map((tech, techIndex) => (
                  <TechnologyBadge 
                    key={techIndex} 
                    tech={tech}
                    mini={true}
                  />
                ))}
              </div>
              
              {/* Enlaces del proyecto */}
              <div onClick={e => e.stopPropagation()}>
                <ProjectLinks enlaces={proyecto.enlaces} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal de detalles */}
        <ProjectDetails
          proyecto={proyecto}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
        />
      </>
    );
  }

  // Vista de cuadrícula (default)
  return (
    <>
      <motion.div
        variants={elementoVariantes}
        className={`bg-neutral-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group relative h-full flex flex-col ${proyecto.destacado ? 'border-t-2 border-emerald-300' : 'border-t-2 border-neutral-700'} cursor-pointer`}
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDetails(true)}
      >
        {/* Badge de proyecto destacado */}
        {proyecto.destacado && <ProjectFeatureBadge position="top-right" />}
        
        {/* Imagen del proyecto */}
        <div className="relative overflow-hidden h-48">
          <ProjectImage 
            src={proyecto.imagen} 
            alt={`Imagen del proyecto ${proyecto.titulo}`}
            className="object-cover w-full h-full transform transition-transform group-hover:scale-105"
          />
          {/* Overlay al hacer hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            {/* Categoría */}
            {proyecto.categoria && (
              <span className="inline-block bg-neutral-800/80 backdrop-blur-sm text-xs text-white px-2 py-1 rounded">
                {proyecto.categoria}
              </span>
            )}
          </div>
        </div>
        
        {/* Contenido del proyecto */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 mb-2">
            {proyecto.titulo}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-3">
            {proyecto.descripcion}
          </p>
          
          {/* Tecnologías utilizadas */}
          <div className="mb-4 mt-auto">
            <h4 className="text-sm font-semibold text-white mb-2">Tecnologías</h4>
            <div className="flex flex-wrap gap-2">
              {proyecto.tecnologias.map((tech, techIndex) => (
                <TechnologyBadge 
                  key={techIndex} 
                  tech={tech} 
                />
              ))}
            </div>
          </div>
          
          {/* Enlaces del proyecto */}
          <div className="flex justify-between items-center pt-2 border-t border-neutral-700 mt-auto" onClick={e => e.stopPropagation()}>
            <ProjectLinks enlaces={proyecto.enlaces} />
          </div>
        </div>
      </motion.div>

      {/* Modal de detalles */}
      <ProjectDetails
        proyecto={proyecto}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default ProjectCard;