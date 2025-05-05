import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

interface ArticuloRelacionado {
  id: number;
  titulo: string;
  slug: string;
  fecha: string;
  imagen: string;
  categoria: string;
}

interface RelatedArticlesProps {
  articulos: ArticuloRelacionado[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articulos }) => {
  if (!articulos || articulos.length === 0) return null;

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  // Determinar la URL de la imagen según si es una cadena o un objeto ImageMetadata
  const getImageUrl = (imagen: string) => {
    return imagen; // Simplificado ya que ahora solo se espera una cadena
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.7 }}
      className="max-w-6xl mx-auto mb-24"
    >
      <div className="flex items-center mb-10">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500/50"></div>
        <h2 className="text-3xl font-bold mx-4 text-balance">
          <span className="text-white">Artículos </span>
          <span className="text-emerald-400">relacionados</span>
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articulos.map((articulo, idx) => (
          <motion.a 
            key={articulo.id}
            href={`/blog/${articulo.slug}`}
            className="group bg-gradient-to-br from-neutral-900/90 to-neutral-800/80 backdrop-blur-lg border border-neutral-800/60 rounded-xl overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500"
            data-astro-prefetch
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.7 + (idx * 0.1) }
            }}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <Image 
                src={getImageUrl(articulo.imagen)}
                alt={articulo.titulo}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <span className="p-4 text-sm text-emerald-300 font-medium">{articulo.categoria}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-neutral-400 mb-2">
                <FaCalendarAlt className="mr-2 text-emerald-400" />
                <span>{articulo.fecha}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
                {articulo.titulo}
              </h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors">Leer artículo</span>
                <FaArrowLeft className="transform rotate-180 text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedArticles;