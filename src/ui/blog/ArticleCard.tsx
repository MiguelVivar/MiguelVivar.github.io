'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TagBadge from './TagBadge';
import { FaHeart, FaRegHeart, FaClock, FaShare } from 'react-icons/fa';
import CopyAlert from './CopyAlert';

interface ImageMetadata {
  src: string;
}

interface ArticleCardProps {
  articulo: {
    id: number;
    titulo: string;
    slug: string;
    fecha: string;
    resumen: string;
    imagen: string | ImageMetadata;
    categoria: string;
    tags: string[];
    contenido?: string;
  };
  animate: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onShare?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  articulo, 
  animate, 
  isFavorite = false, 
  onToggleFavorite, 
  onShare 
}) => {
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  // Calcular el tiempo estimado de lectura (estándar: 1 minuto por cada 225 palabras)
  const calculateReadTime = (content: string): number => {
    if (!content) return 1;
    
    // Eliminar caracteres especiales y espacios extra
    const cleanText = content.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
    
    // Contar palabras
    const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
    
    // Estándar de velocidad de lectura: 225 palabras por minuto
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 225));
    
    return readingTimeMinutes;
  };
  
  // Calcular tiempo de lectura usando el contenido si está disponible, o un valor predeterminado
  const readingTime = articulo.contenido ? calculateReadTime(articulo.contenido) : 3;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
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
    
    // Si es un objeto ImageMetadata, acceder a la URL a través de la propiedad src
    return articulo.imagen.src;
  };

  return (
    <>
      <motion.article
        className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        layout={animate}
      >
        <a href={`/blog/${articulo.slug}`} className="block relative aspect-video">
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60 z-10"></div>
          
          {/* Imagen */}
          <motion.div 
            className="h-full w-full absolute top-0 left-0 bg-neutral-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${getImageUrl()})` }}
            />
          </motion.div>
          
          {/* Categoría y fecha */}
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-block bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {articulo.categoria}
            </span>
          </div>
          
          <div className="absolute bottom-4 left-4 z-20 flex gap-2">
            <span className="text-neutral-300 text-xs bg-neutral-900/70 px-2 py-1 rounded flex items-center">
              {articulo.fecha}
            </span>
            <span className="text-neutral-300 text-xs bg-neutral-900/70 px-2 py-1 rounded flex items-center">
              <FaClock className="mr-1 text-emerald-400" />
              {readingTime} min
            </span>
          </div>
        </a>
        
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-white hover:text-emerald-400 transition-colors">
            <a href={`/blog/${articulo.slug}`}>
              {articulo.titulo}
            </a>
          </h3>
          
          <p className="text-neutral-400 mb-4 flex-grow text-sm">
            {articulo.resumen}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {articulo.tags.slice(0, 3).map((tag: string, index: number) => (
              <TagBadge key={index} tag={tag} />
            ))}
            {articulo.tags.length > 3 && (
              <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">
                +{articulo.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Barra de acciones */}
          <div className="flex justify-between items-center pt-3 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              <a 
                href={`/blog/${articulo.slug}`}
                className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Leer más
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              {onToggleFavorite && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleActionClick(e, onToggleFavorite)}
                  className="p-2 text-lg rounded-full hover:bg-neutral-800 transition-colors"
                  aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                  {isFavorite ? (
                    <FaHeart className="text-emerald-500" />
                  ) : (
                    <FaRegHeart className="text-neutral-400 hover:text-emerald-400" />
                  )}
                </motion.button>
              )}
              
              {onShare && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleActionClick(e, onShare)}
                  className="p-2 text-lg rounded-full hover:bg-neutral-800 transition-colors"
                  aria-label="Compartir artículo"
                >
                  <FaShare className="text-neutral-400 hover:text-emerald-400" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.article>
      
      {/* Alerta de copia */}
      <CopyAlert 
        isVisible={showCopyAlert} 
        onClose={() => setShowCopyAlert(false)} 
        message="¡Enlace copiado con éxito!" 
      />
    </>
  );
};  

export default ArticleCard;