'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaFileAlt, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaUniversity, FaBuilding } from 'react-icons/fa';
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Sobre <span className="text-emerald-300">Mí</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Conoce más sobre mi trayectoria, experiencia y pasión por el desarrollo web
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
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
              className="text-gray-300"
            >
              Soy un desarrollador Full Stack apasionado por crear soluciones digitales que combinen
              funcionalidad y diseño atractivo. Mi enfoque se centra en construir aplicaciones web
              modernas y eficientes utilizando las últimas tecnologías del mercado.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-300"
            >
              Con experiencia en el desarrollo tanto de frontend como de backend, disfruto
              enfrentando desafíos complejos y encontrando soluciones creativas que mejoren
              la experiencia del usuario y cumplan con los objetivos del negocio.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-300"
            >
              Actualmente cursando el III ciclo de la carrera de Ingeniería en Sistemas, enfocado en expandir mis conocimientos en desarrollo de software y tecnologías emergentes.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-300 text-xl"
            >
              Ica, Perú 🇵🇪.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a 
                href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
                target='_black'
              >
                <FaFileAlt className="text-xl" />
                Descargar CV
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
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
            </motion.div>
          </motion.div>
        </div>

        {/* Sección de Trayectoria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Mi <span className="text-emerald-300">Trayectoria</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Educación - Diseño tipo árbol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
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
                
                {/* Puedes agregar más elementos educativos aquí siguiendo el mismo patrón */}
              </div>
            </motion.div>

            {/* Experiencia Profesional - Diseño tipo árbol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                
                {/* Puedes agregar más elementos de experiencia profesional aquí siguiendo el mismo patrón */}
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
          transition={{ duration: 0.8, delay: 0.7 }}
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
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)"
                }}
                className="bg-neutral-800 p-6 rounded-lg border-t-2 border-emerald-300 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-emerald-300/10 rounded-full flex items-center justify-center mb-4 text-emerald-300">
                  {index === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  {index === 4 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {index === 5 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para <span className="text-emerald-300">Colaborar</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Si estás interesado en trabajar juntos o tienes alguna pregunta, no dudes en contactarme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2"
              download
              className="px-8 py-4 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <FaFileAlt className="text-xl" />
              Descargar CV
            </Link>
            <Link 
              href="/contacto"
              className="px-8 py-4 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 inline-block"
            >
              Contáctame
            </Link>
          </div>
        </motion.div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.1, 0.15, 0.1],
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
              opacity: [0.1, 0.15, 0.1],
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