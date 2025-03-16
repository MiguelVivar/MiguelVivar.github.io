'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaJava } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens, SiPug, SiBootstrap, SiMysql, SiHeroku, SiChatbot } from 'react-icons/si';

export default function Proyectos() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  const proyectos = [
    {
      titulo: "Portafolio Personal",
      descripcion: "Sitio web personal para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
      imagen: "/portafolio.png",
      tecnologias: [
        { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
        { nombre: "React", icono: <SiReact className="text-xl" /> },
        { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
        { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
      ],
      enlaces: [
        { tipo: "github", url: "https://github.com/username/portfolio" },
        { tipo: "demo", url: "https://portfolio-demo.com" },
      ],
      destacado: true,
      categoria: "Front-End"
    },
    {
      titulo: "Administrador de Veterinaria",
      descripcion: "Un sistema de administración de una veterinaria con autenticación de usuarios.",
      imagen: "/administradorveterinaria.png",
      tecnologias: [
        { nombre: "React", icono: <SiReact className="text-xl" /> },
        { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
        { nombre: "NodeJS", icono: <SiNodedotjs className="text-xl" /> },
        { nombre: "Express", icono: <SiExpress className="text-xl" /> },
        { nombre: "MongoDB", icono: <SiMongodb className="text-xl" /> },
        { nombre: "JWT", icono: <SiJsonwebtokens className="text-xl" /> },
      ],
      enlaces: [
        { tipo: "github", url: "https://github.com/MiguelVivar/APV_MERN_frontend" },
      ],
      destacado: true,
      categoria: "Full-Stack"
    },
    {
      titulo: "Agencia de Viajes",
      descripcion: "Un sitio web para una agencia de viajes con un diseño moderno y responsivo.",
      imagen: "/agenciaviajes.png",
      tecnologias: [
        { nombre: "Pug", icono: <SiPug className="text-xl" /> },
        { nombre: "NodeJS", icono: <SiNodedotjs className="text-xl" /> },
        { nombre: "Boostrap", icono: <SiBootstrap className="text-xl" /> },
        { nombre: "MySQL", icono: <SiMysql className="text-xl" /> },
        { nombre: "Heroku", icono: <SiHeroku className="text-xl" /> },
      ],
      enlaces: [
        { tipo: "github", url: "https://github.com/MiguelVivar/AgenciaViajesNodeJS" },
      ],
      destacado: false,
      categoria: "Full-Stack"
    },
    {
      titulo: "Portafolio VinnBonn",
      descripcion: "Portafolio para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
      imagen: "/vinnbonn.png",
      tecnologias: [
        { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
        { nombre: "React", icono: <SiReact className="text-xl" /> },
        { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
        { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
      ],
      enlaces: [
        { tipo: "github", url: "https://github.com/MiguelVivar/VinnBonn" },
        { tipo: "demo", url: "https://vinn-bonn.vercel.app/" },
      ],
      destacado: false,
      categoria: "Front-End"
    },
    {
      titulo: "AiAssistEdu",
      descripcion: "Sitio web sobre una IA para la educación, cuenta con un chatbot capaz de generar tickets de soporte.",
      imagen: "/aiassistedu.png",
      tecnologias: [
        { nombre: "React", icono: <SiReact className="text-xl" /> },
        { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
        { nombre: "Voiceflow", icono: <SiChatbot className="text-xl" /> },
      ],
      enlaces: [
        { tipo: "demo", url: "https://gjpf.edu.pe/aiassistedu/" },
      ],
      destacado: false,
      categoria: "Front-End"
    },
    {
      titulo: "SistemaAdmison",
      descripcion: "Aplicación que gestiona el proceso de admisión académica. Utiliza el patrón MVC y permite leer datos desde archivos DBF, mostrando los resultados de manera organizada en una interfaz gráfica.",
      imagen: "/sistemaadmision.png",
      tecnologias: [
        { nombre: "Java", icono: <FaJava className="text-xl" /> }
      ],
      enlaces: [
        { tipo: "github", url: "https://github.com/MiguelVivar/SistemaAdmision" },
      ],
      destacado: true,
      categoria: "Software"
    },
    {
      titulo: "GeneradorExamenes",
      descripcion: "Aplicación que genera exámenes de forma automatizada. Desarrollada en Java con NetBeans, permite organizar preguntas y respuestas en un formato estructurado para su aplicación.",
      imagen: "/generadorexamenes.png",
      tecnologias: [
        { nombre: "Java", icono: <FaJava className="text-xl" /> }
      ],
      enlaces: [
        { tipo: "github", url: "https://github.com/MiguelVivar/GeneradorExamenes" },
      ],
      destacado: false,
      categoria: "Software"
    },
  ];

  // Filtrar proyectos destacados para mostrarlos primero
  const proyectosOrdenados = [
    ...proyectos.filter(proyecto => proyecto.destacado),
    ...proyectos.filter(proyecto => !proyecto.destacado)
  ];

  // Filtrar proyectos basados en la categoría activa
  const proyectosFiltrados = categoriaActiva === 'todos'
    ? proyectosOrdenados
    : proyectosOrdenados.filter(proyecto => proyecto.categoria === categoriaActiva);

  // Categorías para el filtro
  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'Full-Stack', nombre: 'Full-Stack' },
    { id: 'Front-End', nombre: 'Front-End' },
    { id: 'Back-End', nombre: 'Back-End' },
    { id: 'Software', nombre: 'Software' },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Mis <span className="text-emerald-300">Proyectos</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Una selección de mis trabajos más recientes y destacados en desarrollo web
          </p>
        </motion.div>

        {/* Navegación por categorías */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-neutral-800 rounded-lg">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  categoriaActiva === categoria.id
                    ? 'bg-emerald-300 text-neutral-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          key={categoriaActiva} // Añadir esta clave para forzar el re-renderizado cuando cambia la categoría
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Actualizado para usar proyectosFiltrados en lugar de proyectosOrdenados */}
          {proyectosFiltrados.map((proyecto) => (
            <motion.div
              key={proyecto.titulo}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 0.5,
                  }
                }
              }}
              className={`bg-neutral-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 group relative ${proyecto.destacado ? 'border-t-2 border-emerald-300' : 'border-t-2 border-neutral-700'}`}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {proyecto.destacado && (
                <div className="absolute top-0 right-0 bg-emerald-300 text-neutral-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                  Destacado
                </div>
              )}
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={proyecto.imagen} 
                  alt={`Imagen del proyecto ${proyecto.titulo}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 mb-2">
                  {proyecto.titulo}
                </h3>
                <p className="text-gray-400 mb-4">
                  {proyecto.descripcion}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Tecnologías</h4>
                  <div className="flex flex-wrap gap-2">
                    {proyecto.tecnologias.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="inline-flex items-center gap-1 bg-neutral-700 px-2 py-1 rounded text-xs text-gray-300"
                        title={tech.nombre}
                      >
                        <span className="text-emerald-300">{tech.icono}</span>
                        {tech.nombre}
                      </span>
                    ))}
                  </div>
                </div>
                
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
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Interesado en <span className="text-emerald-300">colaborar</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Siempre estoy abierto a nuevos proyectos y desafíos. Si tienes una idea o necesitas ayuda con tu proyecto, ¡contáctame!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/username" // Reemplazar con tu usuario de GitHub real
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <FaGithub className="text-xl" />
              Ver GitHub
            </Link>
            <Link 
              href="/contacto"
              className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              Contactar
            </Link>
          </div>
        </motion.div>

        {/* Animación del fondo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.1, 0.15, 0.1],
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
              opacity: [0.1, 0.15, 0.1],
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