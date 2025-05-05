'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { proyectos, categorias } from '../../data/proyectos';
import PageHeader from './PageHeader';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from './LoadingSpinner';
import ProjectCard from './ProjectCard';
import AnimatedBackground from '../../components/AnimateBackground';
import CallToAction from '../../components/CallToAction';
import { FaGithub, FaThList, FaThLarge, FaSortAmountDown, FaSortAmountUpAlt, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { FiMail, FiSearch } from 'react-icons/fi';

// Variantes de animación
const contenedorVariantes = {
  oculto: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  salida: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
};

// Opciones de ordenación
const sortOptions = [
  { id: 'destacados', label: 'Destacados primero', icon: <FaSortAmountDown /> },
  { id: 'titulo_asc', label: 'A-Z', icon: <FaSortAlphaDown /> },
  { id: 'titulo_desc', label: 'Z-A', icon: <FaSortAlphaUp /> },
  { id: 'recientes', label: 'Más recientes', icon: <FaSortAmountUpAlt /> },
];

const Proyectos: React.FC = () => {
  // Estados
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [proyectosMostrados, setProyectosMostrados] = useState(proyectos);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [proyectosPorPagina, setProyectosPorPagina] = useState(6);
  const [vistaGrid, setVistaGrid] = useState(true);
  const [ordenActivo, setOrdenActivo] = useState('destacados');
  
  // Contar proyectos por categoría para mostrar en filtros
  const proyectosPorCategoria = useMemo(() => {
    const conteo = categorias.reduce((acc, categoria) => {
      if (categoria.id === 'todos') {
        acc[categoria.id] = proyectos.length;
      } else {
        acc[categoria.id] = proyectos.filter(p => p.categoria === categoria.id).length;
      }
      return acc;
    }, {} as Record<string, number>);
    
    return conteo;
  }, []);

  // Aplicar filtros y búsqueda a los proyectos
  useEffect(() => {
    setCargando(true);
    
    // Filtrar por búsqueda y categoría
    let proyectosFiltrados = proyectos;
    
    // Filtrar por categoría
    if (categoriaActiva !== 'todos') {
      proyectosFiltrados = proyectosFiltrados.filter(
        proyecto => proyecto.categoria === categoriaActiva
      );
    }
    
    // Filtrar por término de búsqueda
    if (busqueda.trim() !== '') {
      const terminoBusqueda = busqueda.toLowerCase();
      proyectosFiltrados = proyectosFiltrados.filter(
        proyecto => 
          proyecto.titulo.toLowerCase().includes(terminoBusqueda) || 
          proyecto.descripcion.toLowerCase().includes(terminoBusqueda) ||
          proyecto.tecnologias.some(tech => tech.nombre.toLowerCase().includes(terminoBusqueda))
      );
    }
    
    // Aplicar ordenación
    switch(ordenActivo) {
      case 'destacados':
        proyectosFiltrados = [
          ...proyectosFiltrados.filter(p => p.destacado),
          ...proyectosFiltrados.filter(p => !p.destacado)
        ];
        break;
      case 'titulo_asc':
        proyectosFiltrados = [...proyectosFiltrados].sort((a, b) => 
          a.titulo.localeCompare(b.titulo));
        break;
      case 'titulo_desc':
        proyectosFiltrados = [...proyectosFiltrados].sort((a, b) => 
          b.titulo.localeCompare(a.titulo));
        break;
      case 'recientes':
        proyectosFiltrados = [...proyectosFiltrados].sort((a, b) => b.id - a.id);
        break;
    }
    
    // Simular tiempo de carga para una mejor experiencia visual
    const tiempoEspera = setTimeout(() => {
      setProyectosMostrados(proyectosFiltrados);
      setCargando(false);
      // Reset a la primera página cuando cambian los filtros
      setPaginaActual(1);
    }, 300);
    
    return () => clearTimeout(tiempoEspera);
  }, [categoriaActiva, busqueda, ordenActivo]);

  // Calcular paginación
  const indexUltimoProyecto = paginaActual * proyectosPorPagina;
  const indexPrimerProyecto = indexUltimoProyecto - proyectosPorPagina;
  const proyectosActuales = proyectosMostrados.slice(indexPrimerProyecto, indexUltimoProyecto);
  const totalPaginas = Math.ceil(proyectosMostrados.length / proyectosPorPagina);
  
  // Función para cambiar de página
  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina);
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        {/* Encabezado de la página */}
        <PageHeader />

        {/* Barra de herramientas superior */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          {/* Buscador */}
          <div className="w-full md:w-96 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-300/50 transition-all"
            />
            {busqueda && (
              <button 
                onClick={() => setBusqueda('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                &times;
              </button>
            )}
          </div>
          
          {/* Controles de visualización */}
          <div className="flex items-center gap-4">
            {/* Selector de ordenación */}
            <div className="relative group">
              <button className="text-white bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg flex items-center gap-2">
                <span>{sortOptions.find(opt => opt.id === ordenActivo)?.icon}</span>
                <span className="hidden sm:inline">Ordenar</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg overflow-hidden z-10 hidden group-hover:block">
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setOrdenActivo(option.id)}
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-700 flex items-center gap-2 ${ordenActivo === option.id ? 'text-emerald-300' : 'text-white'}`}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Toggle vista grid/lista */}
            <button 
              onClick={() => setVistaGrid(!vistaGrid)}
              className="text-white bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg"
              aria-label={vistaGrid ? "Cambiar a vista de lista" : "Cambiar a vista de cuadrícula"}
            >
              {vistaGrid ? <FaThList /> : <FaThLarge />}
            </button>
            
            {/* Selector de proyectos por página */}
            <select 
              value={proyectosPorPagina} 
              onChange={(e) => setProyectosPorPagina(Number(e.target.value))}
              className="text-white bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg border border-neutral-700"
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>

        {/* Filtro de categorías */}
        <CategoryFilter
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          setCategoriaActiva={setCategoriaActiva}
          conteo={proyectosPorCategoria}
        />

        {/* Estado de carga */}
        {cargando ? (
          <LoadingSpinner />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${categoriaActiva}-${vistaGrid}-${paginaActual}`}
              className={vistaGrid 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-4"
              }
              variants={contenedorVariantes}
              initial="oculto"
              animate="visible"
              exit="salida"
            >
              {proyectosActuales.length === 0 ? (
                <motion.div 
                  className="col-span-full text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-emerald-300 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No se encontraron proyectos</h3>
                  <p className="text-gray-400">
                    {busqueda 
                      ? `No hay resultados para "${busqueda}" en esta categoría` 
                      : "No hay proyectos en esta categoría"}
                  </p>
                  {busqueda && (
                    <button 
                      onClick={() => setBusqueda('')}
                      className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </motion.div>
              ) : (
                proyectosActuales.map((proyecto, index) => (
                  <ProjectCard 
                    key={proyecto.id || proyecto.titulo} 
                    proyecto={proyecto} 
                    index={index}
                    listView={!vistaGrid}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Paginación */}
        {!cargando && proyectosMostrados.length > proyectosPorPagina && (
          <div className="flex justify-center mt-12">
            <div className="flex rounded-md">
              <button
                onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                className="px-3 py-1 rounded-l-md bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                .filter(page => {
                  // Mostrar siempre primera, última y páginas cercanas a la actual
                  return page === 1 || 
                         page === totalPaginas || 
                         Math.abs(page - paginaActual) <= 1;
                })
                .map((page, i, arr) => {
                  // Si hay un salto en la secuencia, mostrar puntos suspensivos
                  if (i > 0 && page - arr[i-1] > 1) {
                    return (
                      <React.Fragment key={`ellipsis-${page}`}>
                        <span className="px-3 py-1 bg-neutral-800 text-gray-400">...</span>
                        <button
                          key={page}
                          onClick={() => cambiarPagina(page)}
                          className={`px-3 py-1 ${
                            paginaActual === page 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-neutral-800 text-white hover:bg-neutral-700'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => cambiarPagina(page)}
                      className={`px-3 py-1 ${
                        paginaActual === page 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-neutral-800 text-white hover:bg-neutral-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              
              <button
                onClick={() => cambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                disabled={paginaActual === totalPaginas}
                className="px-3 py-1 rounded-r-md bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700"
              >
                &gt;
              </button>
            </div>
          </div>
        )}

        {/* Resumen de resultados */}
        {!cargando && (
          <div className="text-center text-sm text-gray-400 mt-4">
            Mostrando {proyectosActuales.length} de {proyectosMostrados.length} proyectos
            {busqueda && (
              <> • Filtrando por: &quot;{busqueda}&quot;</>
            )}
          </div>
        )}

        {/* Sección de llamada a la acción */}
        <div className="mt-16">
          <CallToAction 
            title='¿Interesado en' 
            titlespan='colaborar' 
            description='Siempre estoy abierto a nuevos proyectos y desafíos. Si tienes una idea o necesitas ayuda con tu proyecto, ¡contáctame!' 
            buttonSecundaryIcon={<FaGithub className="text-xl" />} 
            buttonSecondaryText='Ver GitHub' 
            buttonPrimaryIcon={<FiMail className="text-xl" />} 
            buttonPrimaryText='Contactar' 
          />
        </div>

        {/* Fondo animado */}
        <AnimatedBackground />
      </div>
    </main>
  );
};

export default Proyectos;