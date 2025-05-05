'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaTag, FaCalendarAlt, FaCoffee } from 'react-icons/fa';
import AnimateBackground from '../../components/AnimateBackground';
import TagBadge from './TagBadge';
import Link from 'next/link';

interface ArticleHeaderProps {
  articulo: {
    titulo: string;
    imagen: string;
    categoria: string;
    fecha: string;
    resumen: string;
    tags: string[];
    tiempoLectura: number;
  };
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ articulo }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Activar animaciones cuando el componente se monte
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animaciones mejoradas con secuencia
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Calcular tiempo estimado de lectura con texto más descriptivo
  const calculateReadingTime = () => {
    if (articulo.tiempoLectura === 1) {
      return '1 minuto de lectura';
    } else if (articulo.tiempoLectura < 5) {
      return `${articulo.tiempoLectura} minutos de lectura`;
    } else {
      return `${articulo.tiempoLectura} min · lectura ${articulo.tiempoLectura > 10 ? 'larga' : 'media'}`;
    }
  };

  // Determinar la URL de la imagen según si es una cadena o un objeto ImageMetadata
  const getImageUrl = () => {
    // Si la imagen es undefined o null, usar una imagen por defecto
    if (!articulo.imagen) {
      return '/blog1.png'; // Imagen por defecto desde public
    }
    
    // Si es una cadena que comienza con http o /, usarla directamente
    if (typeof articulo.imagen === 'string') {
      if (articulo.imagen.startsWith('http') || articulo.imagen.startsWith('/')) {
        return articulo.imagen;
      }
      // Para rutas relativas, asegurarse de que tengan la estructura correcta
      return `/${articulo.imagen}`;
    } 
    
    // No se necesita acceder a la propiedad src ya que ahora es solo una cadena
    return articulo.imagen;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative w-full bg-neutral-900"
    >
      <AnimateBackground />
      
      {/* Imagen de fondo con overlay para mejor legibilidad */}
      <div className="relative">
        <div 
          className="w-full h-[85vh] bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${getImageUrl()})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/60 to-neutral-900/95" />
      </div>
      
      {/* Navegación de regreso flotante con animación */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="fixed left-6 z-30"
          >
            <Link 
              href="/blog" 
              className="group inline-flex items-center gap-3 px-5 py-2.5 bg-neutral-900/70 backdrop-blur-xl text-white rounded-full transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:bg-emerald-950/80 border border-neutral-700/50"
              data-astro-prefetch
            >
              <FaArrowLeft className="text-sm transition-all duration-300 group-hover:-translate-x-1 text-emerald-400" />
              <span>Volver al blog</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contenido del encabezado flotante */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 z-30">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerAnimation}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="space-y-6">
            {/* Categoría y fecha */}
            <motion.div 
              variants={fadeInUp} 
              className="flex flex-wrap items-center text-sm gap-4 mb-2"
            >
              <div className="flex items-center px-4 py-1.5 bg-emerald-500/30 backdrop-blur-xl rounded-full shadow-lg shadow-emerald-900/20 border border-emerald-500/40 hover:bg-emerald-500/40 transition-all duration-300">
                <FaTag className="mr-2 text-emerald-400" />
                <span className="text-emerald-300 font-medium">{articulo.categoria}</span>
              </div>
              
              <div className="flex items-center px-4 py-1.5 bg-neutral-800/70 backdrop-blur-xl rounded-full shadow-lg shadow-neutral-900/20 border border-neutral-700/30">
                <FaCalendarAlt className="mr-2 text-emerald-400" />
                <span className="text-neutral-200">{articulo.fecha}</span>
              </div>
            </motion.div>
            
            {/* Título del artículo */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight text-balance"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-emerald-200">
                {articulo.titulo}
              </span>
            </motion.h1>
            
            {/* Resumen y metadatos */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-neutral-200 max-w-3xl text-pretty font-medium"
            >
              {articulo.resumen}
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <div className="flex items-center bg-neutral-800/70 backdrop-blur-xl px-4 py-1.5 rounded-full shadow-lg shadow-neutral-900/20 border border-neutral-700/30 hover:bg-neutral-800/90 transition-all duration-300">
                <FaCoffee className="mr-2 text-amber-400" />
                <span className="text-neutral-200">{calculateReadingTime()}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {articulo.tags.map((tag: string, index: number) => (
                  <TagBadge key={index} tag={tag} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArticleHeader;