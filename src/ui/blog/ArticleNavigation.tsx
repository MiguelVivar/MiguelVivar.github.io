import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ArticleNavigationProps {
  prevArticulo?: {
    titulo: string;
    slug: string;
  } | null;
  nextArticulo?: {
    titulo: string;
    slug: string;
  } | null;
}

const ArticleNavigation: React.FC<ArticleNavigationProps> = ({ prevArticulo, nextArticulo }) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  if (!prevArticulo && !nextArticulo) return null;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.5 }}
      className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 mt-12"
    >
      {prevArticulo && (
        <motion.a 
          href={`/blog/${prevArticulo.slug}`} 
          className="group flex items-start p-6 bg-gradient-to-br from-neutral-900/90 to-neutral-800/80 backdrop-blur-lg border border-neutral-800/60 rounded-xl hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300"
          data-astro-prefetch
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="mr-4 flex-shrink-0 text-emerald-400 group-hover:text-emerald-300 transition-colors">
            <FaChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <div>
            <div className="text-sm text-emerald-400/70 mb-1">Artículo anterior</div>
            <h4 className="text-white font-medium line-clamp-2 group-hover:text-emerald-300 transition-colors">{prevArticulo.titulo}</h4>
          </div>
        </motion.a>
      )}
      
      {nextArticulo && (
        <motion.a 
          href={`/blog/${nextArticulo.slug}`}
          className="group flex items-start p-6 bg-gradient-to-br from-neutral-900/90 to-neutral-800/80 backdrop-blur-lg border border-neutral-800/60 rounded-xl hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 sm:justify-end"
          data-astro-prefetch
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="sm:order-1 sm:text-right">
            <div className="text-sm text-emerald-400/70 mb-1">Artículo siguiente</div>
            <h4 className="text-white font-medium line-clamp-2 group-hover:text-emerald-300 transition-colors">{nextArticulo.titulo}</h4>
          </div>
          <div className="sm:order-2 ml-4 flex-shrink-0 text-emerald-400 group-hover:text-emerald-300 transition-colors">
            <FaChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </motion.a>
      )}
    </motion.div>
  );
};

export default ArticleNavigation;