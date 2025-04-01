'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaFileAlt, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaUniversity, FaBuilding, FaCode, FaLaptopCode } from 'react-icons/fa';
import { certificados, idiomas, valores } from '@/data';

export default function SobreMi() {

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
            Sobre <span className="text-emerald-300">Mí</span>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-300/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Conoce más sobre mi trayectoria, experiencia y pasión por el desarrollo web
          </p>
        </motion.div>

        {/* Sección Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-emerald-300/10 rounded-full border border-emerald-300/20 text-emerald-300 text-sm font-medium mb-2"
            >
              Desarrollador Full Stack
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold text-white"
            >
              ¿Quién soy?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-300 leading-relaxed"
            >
              Soy un <span className="text-emerald-300 font-medium">desarrollador Full Stack</span> apasionado por crear soluciones digitales que combinen
              funcionalidad y diseño atractivo. Mi enfoque se centra en construir aplicaciones web
              modernas y eficientes utilizando las últimas tecnologías del mercado.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-300 leading-relaxed"
            >
              Con experiencia en el desarrollo tanto de <span className="text-emerald-300 font-medium">frontend</span> como de <span className="text-emerald-300 font-medium">backend</span>, disfruto
              enfrentando desafíos complejos y encontrando soluciones creativas que mejoren
              la experiencia del usuario y cumplan con los objetivos del negocio.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-300 leading-relaxed"
            >
              Actualmente cursando el <span className="text-emerald-300 font-medium">IV ciclo de la carrera de Ingeniería en Sistemas</span>, enfocado en expandir mis conocimientos en desarrollo de software y tecnologías emergentes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300 text-lg">Ica, Perú 🇵🇪</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-2"
            >
              <a 
                href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2"
                className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
                target='_blank'
                rel="noopener noreferrer"
              >
                <FaFileAlt className="text-xl group-hover:animate-pulse" />
                <span>Descargar CV</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center relative"
          >
            <motion.div 
              className="absolute -z-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              animate={{ 
                y: [0, -8, 0],
                rotate: [-1, 1, -1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-lg overflow-hidden border-4 border-emerald-300 shadow-lg shadow-emerald-500/30"
            >
              <Image
                src="/perfil.png"
                alt="Foto de perfil"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 18rem, 20rem"
                priority
              />
              
              {/* Insignia decorativa */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-3 -right-3 bg-emerald-300 text-neutral-800 rounded-full p-3 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Iconos flotantes de tecnologías */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -left-4 bg-neutral-800 p-2 rounded-full shadow-lg"
            >
              <FaCode className="text-emerald-300 text-xl" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-neutral-800 p-2 rounded-full shadow-lg"
            >
              <FaLaptopCode className="text-emerald-300 text-xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Sección de Trayectoria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Mi <span className="text-emerald-300">Trayectoria</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Educación */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-neutral-800 p-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-300 p-3 rounded-full text-neutral-800">
                  <FaGraduationCap className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-emerald-300">Educación</h3>
              </div>
              
              <div className="relative pl-8 border-l-2 border-emerald-300/50 space-y-8">
                {/* Elemento 1 */}
                <div className="relative">
                  {/* Círculo conector */}
                  <div className="absolute -left-[25px] top-0 w-4 h-4 bg-emerald-300 rounded-full z-10 shadow-lg shadow-emerald-500/30"></div>
                  
                  {/* Contenido */}
                  <div className="bg-neutral-700 p-4 rounded-lg hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 hover:translate-x-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaUniversity className="text-emerald-300" />
                      <h4 className="font-semibold text-white">Ingeniería en Sistemas</h4>
                    </div>
                    <p className="text-gray-300">Universidad Nacional &quot;San Luis Gonzaga&quot;</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <FaCalendarAlt className="text-emerald-300/70" />
                      <span>2023 - Presente</span>
                    </div>
                  </div>
                </div>
                
                {/* Elemento 2 - Educación adicional */}
                <div className="relative">
                  {/* Círculo conector */}
                  <div className="absolute -left-[25px] top-0 w-4 h-4 bg-emerald-300 rounded-full z-10 shadow-lg shadow-emerald-500/30"></div>
                  
                  {/* Contenido */}
                  <div className="bg-neutral-700 p-4 rounded-lg hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 hover:translate-x-1">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <h4 className="font-semibold text-white">Formación Autodidacta</h4>
                    </div>
                    <p className="text-gray-300">Cursos online y bootcamps de desarrollo web</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <FaCalendarAlt className="text-emerald-300/70" />
                      <span>2023 - Presente</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experiencia Profesional */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-neutral-800 p-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-300 p-3 rounded-full text-neutral-800">
                  <FaBriefcase className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-emerald-300">Experiencia Profesional</h3>
              </div>
              
              <div className="relative pl-8 border-l-2 border-emerald-300/50 space-y-8">
                {/* Elemento 1 */}
                <div className="relative">
                  {/* Círculo conector */}
                  <div className="absolute -left-[25px] top-0 w-4 h-4 bg-emerald-300 rounded-full z-10 shadow-lg shadow-emerald-500/30"></div>
                  
                  {/* Contenido */}
                  <div className="bg-neutral-700 p-4 rounded-lg hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 hover:translate-x-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaBuilding className="text-emerald-300" />
                      <h4 className="font-semibold text-white">Desarrollador Full Stack</h4>
                    </div>
                    <p className="text-gray-300">Freelancer</p>
                    <p className="text-sm text-gray-400 mt-2">Desarrollo de aplicaciones web utilizando React, Node.js y bases de datos SQL/NoSQL.</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <FaCalendarAlt className="text-emerald-300/70" />
                      <span>2024 - Presente</span>
                    </div>
                  </div>
                </div>
                
                {/* Elemento 2 - Experiencia adicional */}
                <div className="relative">
                  {/* Círculo conector */}
                  <div className="absolute -left-[25px] top-0 w-4 h-4 bg-emerald-300 rounded-full z-10 shadow-lg shadow-emerald-500/30"></div>
                  
                  {/* Contenido */}
                  <div className="bg-neutral-700 p-4 rounded-lg hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 hover:translate-x-1">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h4 className="font-semibold text-white">Proyectos Personales</h4>
                    </div>
                    <p className="text-gray-300">Desarrollo de portafolio y aplicaciones web</p>
                    <p className="text-sm text-gray-400 mt-2">Creación de proyectos personales para mejorar habilidades y explorar nuevas tecnologías.</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <FaCalendarAlt className="text-emerald-300/70" />
                      <span>2024 - Presente</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sección de Certificados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Mis <span className="text-emerald-300">Certificados</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificados.map((categoria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                className="bg-neutral-800 p-6 rounded-lg border-l-4 border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-300/20 p-3 rounded-full text-emerald-300">
                    {index === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-300">{categoria.categoria}</h3>
                </div>
                
                <ul className="space-y-6 text-gray-300">
                  {categoria.certificados.map((cert, certIndex) => (
                    <motion.li 
                      key={certIndex} 
                      className="bg-neutral-700/50 p-4 rounded-lg hover:bg-neutral-700 transition-all duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) + (certIndex * 0.05) }}
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-white">{cert.titulo}</p>
                          <span className="text-xs bg-emerald-300/20 text-emerald-300 px-2 py-1 rounded-full">
                            {cert.anio}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{cert.emisor}</p>
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center text-sm text-emerald-300 hover:text-emerald-400 transition-colors group"
                        >
                          <span className="mr-1 border-b border-transparent group-hover:border-emerald-400 transition-all">Ver certificado</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Idiomas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            <span className="text-emerald-300">Idiomas</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {idiomas.map((idioma, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                className="bg-neutral-800 p-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 border-l-4 border-emerald-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{idioma.idioma}</h3>
                  <span className="text-emerald-300 font-medium">{idioma.nivel}</span>
                </div>
                
                {/* Barra de progreso */}
                <div className="w-full bg-neutral-700 rounded-full h-2.5 mb-2">
                  <motion.div 
                    className="bg-emerald-300 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${
                      idioma.nivel.includes("Nativo") ? "100%" :
                      idioma.nivel.includes("Avanzado") ? "90%" :
                      idioma.nivel.includes("Intermedio") ? "65%" :
                      idioma.nivel.includes("Básico") ? "40%" : "25%"
                    }` }}
                    transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                  />
                </div>
                
                {/* Etiquetas de nivel */}
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Básico</span>
                  <span>Intermedio</span>
                  <span>Avanzado</span>
                  <span>Nativo</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Valores */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Mis <span className="text-emerald-300">Valores</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)"
                }}
                className="bg-neutral-800 p-6 rounded-lg border-t-2 border-emerald-300 transition-all flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-emerald-300/10 rounded-full flex items-center justify-center mb-4 text-emerald-300">
                  {valor.icono}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{valor.titulo}</h3>
                
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-300">{valor.descripcion}</p>
                </motion.div>
                
                <motion.div 
                  className="w-16 h-1 bg-emerald-300/30 rounded-full mt-4"
                  animate={{ 
                    width: ["30%", "80%", "30%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Sección de Llamada a la Acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-16 bg-gradient-to-r from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-emerald-300/20"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para <span className="text-emerald-300">Colaborar</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Estoy disponible para nuevos proyectos y oportunidades. Si tienes una idea o necesitas ayuda con tu proyecto, ¡contáctame!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <FaFileAlt className="text-xl" />
                Descargar CV
              </Link>
              <Link 
                href="/contacto"
                className="px-8 py-4 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contáctame
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Background decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-emerald-500/20 via-transparent to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
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
