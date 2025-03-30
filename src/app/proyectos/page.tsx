'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaStar } from 'react-icons/fa';
import { proyectos, categorias } from '@/data/proyectos';

export default function Proyectos() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [proyectosMostrados, setProyectosMostrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Efecto para simular carga y mejorar la experiencia de usuario
  useEffect(() => {
    setCargando(true);
    
    // Ordenar proyectos: destacados primero, luego el resto
    const proyectosOrdenados = [
      ...proyectos.filter(proyecto => proyecto.destacado),
      ...proyectos.filter(proyecto => !proyecto.destacado)
    ];
    
    // Filtrar proyectos según la categoría seleccionada
    const proyectosFiltrados = categoriaActiva === 'todos'
      ? proyectosOrdenados
      : proyectosOrdenados.filter(proyecto => proyecto.categoria === categoriaActiva);
    
    // Simular tiempo de carga para una mejor experiencia visual
    const tiempoEspera = setTimeout(() => {
      setProyectosMostrados([...proyectosFiltrados]);
      setCargando(false);
    }, 300);
    
    return () => clearTimeout(tiempoEspera);
  }, [categoriaActiva]);

  // Variantes de animación para los contenedores
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

  // Variantes de animación para los elementos individuales
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

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 relative inline-block">
            Mis <span className="text-emerald-300">Proyectos</span>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-300/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Una selección de mis trabajos más recientes y destacados en desarrollo web
          </p>
        </motion.div>

        {/* Navegación por categorías */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-lg">
            {categorias.map((categoria) => (
              <motion.button
                key={categoria.id}
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  categoriaActiva === categoria.id
                    ? 'bg-emerald-300 text-neutral-900 shadow-md shadow-emerald-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-neutral-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {categoria.id === 'todos' ? (
                  <FaSearch className="text-xs" />
                ) : categoria.icono}
                {categoria.nombre}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Estado de carga */}
        {cargando ? (
          <div className="flex justify-center items-center py-20">
            <motion.div 
              className="w-12 h-12 border-4 border-emerald-300/30 border-t-emerald-300 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={categoriaActiva}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={contenedorVariantes}
              initial="oculto"
              animate="visible"
              exit="salida"
            >
              {proyectosMostrados.length === 0 ? (
                <motion.div 
                  className="col-span-full text-center py-16"
                  variants={elementoVariantes}
                >
                  <div className="text-emerald-300 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No se encontraron proyectos</h3>
                  <p className="text-gray-400">No hay proyectos en esta categoría</p>
                </motion.div>
              ) : (
                proyectosMostrados.map((proyecto) => (
                  <motion.div
                    key={proyecto && 'titulo' in proyecto ? proyecto.titulo : ''}
                    variants={elementoVariantes}
                    className={`bg-neutral-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group relative ${(proyecto as { destacado?: boolean })?.destacado ? 'border-t-2 border-emerald-300' : 'border-t-2 border-neutral-700'}`}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Etiqueta de proyecto destacado */}
                    {(proyecto as { destacado?: boolean }).destacado && (
                      <div className="absolute top-0 right-0 bg-emerald-300 text-neutral-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        Destacado
                      </div>
                    )}
                    
                    {/* Imagen del proyecto con overlay */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={proyecto.imagen} 
                        alt={`Imagen del proyecto ${proyecto.titulo}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Contenido del proyecto */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 mb-2">
                        {(proyecto as { titulo: string }).titulo}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {(proyecto as { descripcion: string }).descripcion}
                      </p>
                      
                      {/* Tecnologías utilizadas */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2">Tecnologías</h4>
                        <div className="flex flex-wrap gap-2">
                          {proyecto.tecnologias.map((tech, techIndex) => (
                            <motion.span 
                              key={techIndex} 
                              className="inline-flex items-center gap-1 bg-neutral-700 px-2 py-1 rounded text-xs text-gray-300 hover:bg-neutral-600 transition-colors duration-200"
                              title={tech.nombre}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="text-emerald-300">{tech.icono}</span>
                              {tech.nombre}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Enlaces del proyecto */}
                      <div className="flex justify-between items-center pt-2 border-t border-neutral-700">
                        <div className="flex space-x-3">
                          {proyecto.enlaces.map((enlace, enlaceIndex) => (
                            <Link 
                              key={enlaceIndex} 
                              href={enlace.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${enlace.tipo === 'github' ? 'text-gray-400 hover:text-white' : 'text-emerald-300 hover:text-emerald-400'}`}
                            >
                              {enlace.tipo === 'github' ? (
                                <>
                                  <FaGithub className="text-lg" />
                                  <span>Código</span>
                                </>
                              ) : (
                                <>
                                  <FaExternalLinkAlt className="text-lg" />
                                  <span>Demo</span>
                                </>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Sección de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 bg-gradient-to-r from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-emerald-300/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Interesado en <span className="text-emerald-300">colaborar</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Siempre estoy abierto a nuevos proyectos y desafíos. Si tienes una idea o necesitas ayuda con tu proyecto, ¡contáctame!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/MiguelVivar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              <FaGithub className="text-xl" />
              Ver GitHub
            </Link>
            <Link 
              href="/contacto"
              className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactar
            </Link>
          </div>
        </motion.div>

        {/* Animación del fondo */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-emerald-500/20 via-transparent to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent rounded-full blur-3xl"
          />
        </div>
      </div>
    </main>
  );
}