'use client'

import React, { useState, useEffect, useRef, type JSX } from 'react';
import { motion } from 'framer-motion';

// Importar componentes refactorizados
import ReadingProgressBar from './ReadingProgressBar';
import FloatingControls from './FloatingControls';
import TableOfContents from './TableOfContents';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import ArticleActions from './ArticleActions';
import AuthorProfile from './AuthorProfile';
import ArticleNavigation from './ArticleNavigation';
import RelatedArticles from './RelatedArticles';
import ShareMenu from './ShareMenu';
import CopyAlert from './CopyAlert';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AnimateBackground from '../../components/AnimateBackground';
import perfilImage from '../../assets/images/perfil.png';

interface ArticuloRelacionado {
  id: number;
  titulo: string;
  slug: string;
  fecha: string;
  imagen: string;
  categoria: string;
}

interface ArticleDetailProps {
  articulo: {
    [x: string]: string | TrustedHTML | undefined;
    id: number;
    titulo: string;
    slug: string;
    fecha: string;
    fechaOriginal?: string;
    resumen: string;
    imagen: string;
    categoria: string;
    tags: string[];
    tiempoLectura: number;
    iconos: Array<{
      nombre: string;
      icono: JSX.Element;
    }>;
  };
  prevArticulo?: {
    titulo: string;
    slug: string;
  } | null;
  nextArticulo?: {
    titulo: string;
    slug: string;
  } | null;
  relacionados?: ArticuloRelacionado[];
  children?: React.ReactNode;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ 
  articulo, 
  prevArticulo, 
  nextArticulo, 
  relacionados = [], 
  children 
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [likedArticles, setLikedArticles] = useLocalStorage<number[]>('likedArticles', []);
  const [savedArticles, setSavedArticles] = useLocalStorage<number[]>('savedArticles', []);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<{id: string, text: string, level: number}[]>([]);
  const [showControls, setShowControls] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Generar la tabla de contenidos y configurar la barra de progreso
  useEffect(() => {
    // Función para calcular el progreso de lectura
    const calculateReadingProgress = () => {
      if (!articleRef.current) return;
      
      const element = articleRef.current;
      const totalHeight = element.scrollHeight;
      const windowHeight = window.innerHeight;
      
      const scrollTop = window.scrollY;
      const scrollDistance = totalHeight - windowHeight;
      const scrollPercent = (scrollTop / scrollDistance) * 100;
      
      setReadingProgress(Math.min(Math.max(scrollPercent, 0), 100));
      
      if (scrollTop > lastScrollY + 50) {
        setShowControls(false);
      } else if (scrollTop < lastScrollY - 50) {
        setShowControls(true);
      }
      setLastScrollY(scrollTop);
    };

    // Función para extraer encabezados y crear la tabla de contenidos
    const generateTableOfContents = () => {
      if (!contentRef.current) return;
      
      const headings = contentRef.current.querySelectorAll('h2, h3, h4');
      const toc: {id: string, text: string, level: number}[] = [];
      
      headings.forEach((heading, index) => {
        if (!heading.id) {
          const id = `heading-${index}`;
          heading.id = id;
        }
        
        const level = parseInt(heading.tagName.substring(1));
        
        toc.push({
          id: heading.id,
          text: heading.textContent || '',
          level
        });
      });
      
      setTableOfContents(toc);
    };

    window.addEventListener('scroll', calculateReadingProgress);
    
    setTimeout(() => {
      generateTableOfContents();
      calculateReadingProgress();
    }, 500);

    return () => {
      window.removeEventListener('scroll', calculateReadingProgress);
    };
  }, [lastScrollY]);

  // Funciones para manipular artículos
  const handleLikeArticle = () => {
    if (likedArticles.includes(articulo.id)) {
      setLikedArticles(likedArticles.filter(id => id !== articulo.id));
    } else {
      setLikedArticles([...likedArticles, articulo.id]);
    }
  };

  const handleSaveArticle = () => {
    if (savedArticles.includes(articulo.id)) {
      setSavedArticles(savedArticles.filter(id => id !== articulo.id));
    } else {
      setSavedArticles([...savedArticles, articulo.id]);
    }
  };

  const toggleReaderMode = () => {
    setIsReaderMode(!isReaderMode);
  };

  const handleShare = (platform: string) => {
    const url = `${window.location.origin}/blog/${articulo.slug}`;
    const text = `Echa un vistazo a este artículo: ${articulo.titulo}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // Mostrar el CopyAlert en lugar de la alerta nativa
        setShowCopyAlert(true);
        setTimeout(() => setShowCopyAlert(false), 2000);
        setIsShareMenuOpen(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    
    setIsShareMenuOpen(false);
  };

  return (
    <div className={`min-h-screen bg-neutral-900 text-white pt-16 pb-16 ${isReaderMode ? 'reader-mode' : ''}`}>
      {/* Fondo animado */}
      <AnimateBackground />
      {/* Barra de progreso de lectura */}
      <ReadingProgressBar progress={readingProgress} />
      
      {/* Controles flotantes */}
      <FloatingControls 
        showControls={showControls}
        isLiked={likedArticles.includes(articulo.id)}
        isSaved={savedArticles.includes(articulo.id)}
        isReaderMode={isReaderMode}
        showTableOfContents={showTableOfContents}
        onLike={handleLikeArticle}
        onSave={handleSaveArticle}
        onToggleReaderMode={toggleReaderMode}
        onToggleTableOfContents={() => setShowTableOfContents(!showTableOfContents)}
        onShare={() => setIsShareMenuOpen(true)}
      />
      
      {/* Tabla de contenidos */}
      <TableOfContents 
        show={showTableOfContents}
        items={tableOfContents}
        onClose={() => setShowTableOfContents(false)}
      />

      <div className="relative">
        {/* Header del artículo */}
        <ArticleHeader 
          articulo={articulo} 
        />

        {/* Contenedor principal */}
        <div className="container mx-auto px-4">
          <motion.article 
            ref={articleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`max-w-3xl mx-auto rounded-2xl shadow-2xl mb-10 ${
              isReaderMode 
                ? 'bg-neutral-950 border-none p-0' 
                : 'bg-neutral-900/90 backdrop-blur-lg border border-neutral-800/60 p-8 md:p-12'
            }`}
          >
            {/* Contenido */}
            <ArticleContent
              ref={contentRef}
              isReaderMode={isReaderMode}
              content={articulo.contenido}
              iconos={articulo.iconos}
              // eslint-disable-next-line react/no-children-prop
              children={children}
            />
            
            {/* Información del autor */}
            <AuthorProfile 
              name="Miguel Vivar"
              image={perfilImage.src}
              description="Desarrollador web y creador de contenido especializado en React, TypeScript y herramientas modernas de desarrollo web."
              imageWidth={96}
              imageHeight={96}
            />
            
            {/* Acciones del artículo */}
            <ArticleActions 
              isLiked={likedArticles.includes(articulo.id)}
              isSaved={savedArticles.includes(articulo.id)}
              onLike={handleLikeArticle}
              onSave={handleSaveArticle}
              onShare={() => setIsShareMenuOpen(true)}
            />
          </motion.article>

          {/* Navegación entre artículos */}
          <ArticleNavigation 
            prevArticulo={prevArticulo}
            nextArticulo={nextArticulo}
          />
          
          {/* Artículos relacionados */}
          {relacionados && relacionados.length > 0 && (
            <RelatedArticles articulos={relacionados} />
          )}
        </div>
      </div>
      
      {/* Modal de compartir */}
      <ShareMenu
        isOpen={isShareMenuOpen}
        onClose={() => setIsShareMenuOpen(false)}
        onShare={handleShare}
      />

      {/* Alerta de copia */}
      <CopyAlert isVisible={showCopyAlert} message="¡Enlace copiado al portapapeles!" onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default ArticleDetail;