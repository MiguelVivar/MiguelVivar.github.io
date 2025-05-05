'use client';

import React, { useState, useEffect, useCallback, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from './ArticleCard';
import CategoryFilter from './CategoryFilter';
import TagsFilter from './TagsFilter';
import SearchBar from './SearchBar';
import PageHeader from './PageHeader';
import EmptyState from './EmptyState';
import { FaSort, FaHeart, FaTimes, FaCode, FaLaptopCode, FaTools, FaBrain, FaLightbulb } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiAstro, SiNextdotjs, SiTailwindcss, SiReact } from 'react-icons/si';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AnimateBackground from '../../components/AnimateBackground';
import ShareMenu from './ShareMenu';
import CopyAlert from './CopyAlert';

// Constantes
const ARTICLES_PER_PAGE = 6;
const SORT_OPTIONS = [
  { id: 'fecha-desc', label: 'Más recientes primero' },
  { id: 'fecha-asc', label: 'Más antiguos primero' },
  { id: 'titulo-asc', label: 'Título (A-Z)' },
  { id: 'titulo-desc', label: 'Título (Z-A)' },
];

// Tipos para los datos de Markdown
interface PostFrontmatter {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  draft?: boolean;
  summary: string;
  iconos?: Array<{
    nombre: string;
    icon: string;
  }>;
}

// Reemplazamos PostEntry por BlogPost para coincidir con el tipo que viene de blog.ts
interface BlogPost {
  slug: string;
  content: string;
  data: PostFrontmatter;
}

interface Category {
  id: string;
  nombre: string;
  icono: string;
}

interface BlogProps {
  posts: BlogPost[];
  categories: Category[];
  tags: string[];
}

// Componente para mapear strings de iconos a componentes React
const IconComponent = ({ iconName }: { iconName: string }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    FaCode: <FaCode className="text-xl" />,
    FaLaptopCode: <FaLaptopCode className="text-xl" />,
    FaTools: <FaTools className="text-xl" />,
    FaBrain: <FaBrain className="text-xl" />,
    FaLightbulb: <FaLightbulb className="text-xl" />,
    SiJavascript: <SiJavascript className="text-xl" />,
    SiTypescript: <SiTypescript className="text-xl" />,
    SiAstro: <SiAstro className="text-xl" />,
    SiNextdotjs: <SiNextdotjs className="text-xl" />,
    SiTailwindcss: <SiTailwindcss className="text-xl" />,
    SiReact: <SiReact className="text-xl" />,
  };

  return iconMap[iconName] || <FaLightbulb className="text-xl" />;
};

const Blog: React.FC<BlogProps> = ({ posts, categories, tags }) => {
  // Estados para filtros y búsqueda
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<BlogPost[]>(posts);
  const [, setAnimateArticles] = useState(false);
  
  // Nuevos estados para mejoras
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('fecha-desc');
  const [favorites, setFavorites] = useLocalStorage<string[]>('blog-favorites', []);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [activeArticleForSharing, setActiveArticleForSharing] = useState<string | null>(null);
  // Estado para mostrar el componente CopyAlert
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  // Función para filtrar y ordenar artículos
  const filterAndSortArticles = useCallback(() => {
    // Filtrar por criterios
    let filtered = posts.filter(post => {
      // Filtrar por categoría
      const matchesCategory = selectedCategory === 'todos' || post.data.category === selectedCategory;
      
      // Filtrar por tags seleccionados
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.data.tags.includes(tag));
      
      // Filtrar por término de búsqueda
      const matchesSearch = searchTerm === '' || 
        post.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.data.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.data.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtrar por favoritos si está activa esa opción
      const matchesFavorites = !showOnlyFavorites || favorites.includes(String(post.data.id));
      
      // Debe cumplir todos los criterios
      return matchesCategory && matchesTags && matchesSearch && matchesFavorites;
    });

    // Ordenar los resultados
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'fecha-desc':
          return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
        case 'fecha-asc':
          return new Date(a.data.date).getTime() - new Date(b.data.date).getTime();
        case 'titulo-asc':
          return a.data.title.localeCompare(b.data.title);
        case 'titulo-desc':
          return b.data.title.localeCompare(a.data.title);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [selectedCategory, selectedTags, searchTerm, showOnlyFavorites, favorites, sortOption, posts]);

  // Efecto para aplicar filtros y ordenación
  useEffect(() => {
    const filteredAndSorted = filterAndSortArticles();
    setFilteredArticles(filteredAndSorted);
    setAnimateArticles(true);
    setCurrentPage(1); // Volver a la primera página al cambiar filtros
    
    // Restablecer la animación después de un breve retraso
    const timer = setTimeout(() => setAnimateArticles(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedTags, searchTerm, showOnlyFavorites, favorites, sortOption, filterAndSortArticles]);

  // Manejadores de eventos
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsSortMenuOpen(false);
  };

  const toggleFavorite = (articleId: string | number) => {
    const idString = String(articleId);
    setFavorites(prev => 
      prev.includes(idString)
        ? prev.filter(id => id !== idString)
        : [...prev, idString]
    );
  };

  const handleShare = (articleId: string, platform: string) => {
    const article = posts.find(p => String(p.data.id) === articleId);
    if (!article) return;
    
    const url = `${window.location.origin}/blog/${article.slug}`;
    const text = `Echa un vistazo a este artículo: ${article.data.title}`;
    
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
        setActiveArticleForSharing(null);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    
    setIsShareMenuOpen(false);
    setActiveArticleForSharing(null);
  };

  // Cálculos para paginación
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE, 
    currentPage * ARTICLES_PER_PAGE
  );

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const filterPanelVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <AnimateBackground />
      
      {/* Encabezado de la página */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <PageHeader 
          title="Blog" 
          subtitle="Artículos sobre desarrollo web, programación y tecnología"
        />
        
        {/* Barra de herramientas superior */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-grow"
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
          
          <div className="flex items-center gap-3">
            {/* Botón de filtros móvil */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsFiltersPanelOpen(true)}
              className="md:hidden flex items-center justify-center px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-sm rounded-full transition duration-200"
            >
              <span className="mr-2">Filtros</span>
              <span className="flex items-center justify-center h-5 w-5 bg-emerald-500 text-white text-xs rounded-full">
                {selectedTags.length + (selectedCategory !== 'todos' ? 1 : 0)}
              </span>
            </motion.button>
            
            {/* Dropdown de ordenación */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <button
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="flex items-center px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition duration-200"
              >
                <FaSort className="mr-2" />
                <span className="hidden md:inline">Ordenar</span>
              </button>
              
              <AnimatePresence>
                {isSortMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute right-0 mt-2 w-64 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-20"
                  >
                    <div className="p-3 border-b border-neutral-700">
                      <h4 className="font-medium text-emerald-400">Ordenar por</h4>
                    </div>
                    <div className="p-2">
                      {SORT_OPTIONS.map(option => (
                        <button
                          key={option.id}
                          onClick={() => handleSortChange(option.id)}
                          className={`w-full text-left p-2 rounded hover:bg-neutral-700 transition duration-200 ${
                            sortOption === option.id ? 'bg-neutral-700 text-emerald-400' : ''
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Botón de favoritos */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center px-4 py-2 rounded-full transition duration-200 ${
                showOnlyFavorites 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-neutral-800 hover:bg-neutral-700'
              }`}
            >
              <FaHeart className={`mr-2 ${showOnlyFavorites ? 'text-white' : 'text-emerald-400'}`} />
              <span className="hidden md:inline">Favoritos</span>
              {favorites.length > 0 && (
                <span className="ml-2 flex items-center justify-center h-5 w-5 bg-neutral-700 text-white text-xs rounded-full">
                  {favorites.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filtros laterales - Solo visibles en pantallas medianas o mayores */}
          <div className="hidden md:block md:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-4 shadow-lg sticky top-24"
            >
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">Categorías</h3>
              <CategoryFilter 
                categories={categories.map(cat => ({
                  ...cat,
                  icono: <IconComponent iconName={cat.icono} />
                }))}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              
              <h3 className="text-xl font-semibold text-emerald-400 mt-8 mb-4">Tags</h3>
              <TagsFilter 
                tags={tags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />
              
              {(selectedCategory !== 'todos' || selectedTags.length > 0) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('todos');
                    setSelectedTags([]);
                  }}
                  className="mt-4 w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-sm rounded transition duration-200"
                >
                  Limpiar filtros
                </button>
              )}
            </motion.div>
          </div>
          
          {/* Panel de filtros móvil */}
          <AnimatePresence>
            {isFiltersPanelOpen && (
              <motion.div
                variants={filterPanelVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed inset-0 z-50 md:hidden"
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsFiltersPanelOpen(false)}></div>
                <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-neutral-900 p-5 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-emerald-400">Filtros</h2>
                    <button 
                      onClick={() => setIsFiltersPanelOpen(false)}
                      className="p-2 rounded-full hover:bg-neutral-800 transition duration-200"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-3">Categorías</h3>
                    <CategoryFilter 
                      categories={categories.map(cat => ({
                        ...cat,
                        icono: <IconComponent iconName={cat.icono} />
                      }))}
                      selectedCategory={selectedCategory}
                      onCategoryChange={(cat) => {
                        handleCategoryChange(cat);
                      }}
                      isMobile={true}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-3">Tags</h3>
                    <TagsFilter 
                      tags={tags}
                      selectedTags={selectedTags}
                      onTagToggle={handleTagToggle}
                      isMobile={true}
                    />
                  </div>
                  
                  {(selectedCategory !== 'todos' || selectedTags.length > 0) && (
                    <button 
                      onClick={() => {
                        setSelectedCategory('todos');
                        setSelectedTags([]);
                      }}
                      className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-sm rounded transition duration-200 mb-4"
                    >
                      Limpiar filtros
                    </button>
                  )}
                  
                  <button 
                    onClick={() => setIsFiltersPanelOpen(false)}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded transition duration-200"
                  >
                    Aplicar filtros
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Listado de artículos */}
          <div className="md:col-span-3">
            {/* Resultados y estadísticas */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-neutral-400">
                {filteredArticles.length} 
                {filteredArticles.length === 1 ? ' artículo encontrado' : ' artículos encontrados'}
              </p>
            </div>
            
            {/* Lista de artículos */}
            {paginatedArticles.length > 0 ? (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {paginatedArticles.map(post => {
                    // Convertir los iconos de string a componentes React
                    const articulo = {
                      id: post.data.id,
                      titulo: post.data.title,
                      slug: post.slug,
                      fecha: post.data.date,
                      resumen: post.data.summary,
                      imagen: post.data.image,
                      categoria: post.data.category,
                      tags: post.data.tags,
                      iconos: post.data.iconos ? post.data.iconos.map(ico => ({
                        nombre: ico.nombre,
                        icono: <IconComponent iconName={ico.icon} />
                      })) : []
                    };
                    
                    return (
                      <ArticleCard
                        key={articulo.id}
                        articulo={articulo}
                        isFavorite={favorites.includes(String(articulo.id))}
                        onToggleFavorite={() => toggleFavorite(articulo.id)}
                        onShare={() => {
                          setActiveArticleForSharing(String(articulo.id));
                          setIsShareMenuOpen(true);
                        }}
                        animate={false}
                      />
                    );
                  })}
                </motion.div>
                
                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${
                          currentPage === 1
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : 'bg-neutral-800 hover:bg-neutral-700 transition duration-200'
                        }`}
                      >
                        &laquo;
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => (
                          page === 1 || 
                          page === totalPages || 
                          Math.abs(page - currentPage) <= 1
                        ))
                        .reduce((acc: (number | string)[], page, i, array) => {
                          if (i > 0 && page - array[i - 1] > 1) {
                            acc.push('...');
                          }
                          acc.push(page);
                          return acc;
                        }, [])
                        .map((page, index) => (
                          typeof page === 'number' ? (
                            <button
                              key={index}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 rounded transition duration-200 ${
                                currentPage === page
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-neutral-800 hover:bg-neutral-700'
                              }`}
                            >
                              {page}
                            </button>
                          ) : (
                            <span key={index} className="px-2 text-neutral-500">
                              {page}
                            </span>
                          )
                        ))
                      }
                      
                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${
                          currentPage === totalPages
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : 'bg-neutral-800 hover:bg-neutral-700 transition duration-200'
                        }`}
                      >
                        &raquo;
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState 
                onReset={() => {
                  setSelectedCategory('todos');
                  setSelectedTags([]);
                  setSearchTerm('');
                  setShowOnlyFavorites(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Menú de compartir */}
      <ShareMenu
        isOpen={isShareMenuOpen}
        onClose={() => {
          setIsShareMenuOpen(false);
          setActiveArticleForSharing(null);
        }}
        onShare={(platform) => {
          if (activeArticleForSharing) {
            handleShare(activeArticleForSharing, platform);
          }
        }}
      />

      {/* Componente CopyAlert */}
      <CopyAlert isVisible={showCopyAlert} message="¡Enlace copiado al portapapeles!" onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default Blog;