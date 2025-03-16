'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaFileAlt } from 'react-icons/fa';

export default function SobreMi() {
  const certificados = [
    {
      categoria: "Desarrollo Web",
      certificados: [
        {
          titulo: "Responsive Web Desing",
          emisor: "freeCodeCamp",
          anio: "2024",
          link: "https://www.freecodecamp.org/certification/fcc334e614b-0f23-4bd8-b91f-a031321a21a2/responsive-web-design"
        }
      ]
    },
    {
      categoria: "Computación",
      certificados: [
        {
          titulo: "Computer Hardware Basics",
          emisor: "Cisco",
          anio: "2024",
          link: "https://www.credly.com/badges/22310860-c565-4787-94c2-33ed830d1c92/linked_in_profile"
        }
      ]
    }
  ];

  const idiomas = [
    {
      idioma: "Español",
      nivel: "Nativo"
    },
    {
      idioma: "Inglés",
      nivel: "Básico (A2)"
    }
  ];

  const valores = [
    {
      titulo: "Innovación",
      descripcion: "Busco constantemente nuevas formas de resolver problemas y mejorar procesos."
    },
    {
      titulo: "Calidad",
      descripcion: "Me comprometo a entregar código limpio, eficiente y bien documentado."
    },
    {
      titulo: "Aprendizaje Continuo",
      descripcion: "Me mantengo actualizado con las últimas tecnologías y mejores prácticas."
    },
    {
      titulo: "Colaboración",
      descripcion: "Creo en el poder del trabajo en equipo para lograr resultados excepcionales."
    },
    {
      titulo: "Responsabilidad",
      descripcion: "Cumplo con los plazos y asumo la responsabilidad de mi trabajo."
    },
    {
      titulo: "Empatía",
      descripcion: "Entiendo las necesidades de los usuarios y clientes para crear mejores soluciones."
    }
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-neutral-800 p-6 rounded-lg border-l-4 border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-emerald-300 mb-2">Educación</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <p className="font-semibold">Ingeniería en Sistemas</p>
                  <p className="text-gray-400">Universidad Nacional &quot;San Luis Gonzaga&quot;, 2023-Presente</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-neutral-800 p-6 rounded-lg border-l-4 border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-emerald-300 mb-2">Experiencia Profesional</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <p className="font-semibold">Desarrollador Full Stack</p>
                  <p className="text-gray-400">Freelancer 2024-Presente</p>
                  <p className="text-sm text-gray-400">Desarrollo de aplicaciones web utilizando React, Node.js y bases de datos SQL/NoSQL.</p>
                </li>

              </ul>
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
                <h3 className="text-xl font-bold text-emerald-300 mb-2">{categoria.categoria}</h3>
                <ul className="space-y-4 text-gray-300">
                  {categoria.certificados.map((cert, certIndex) => (
                    <li key={certIndex} className="flex flex-col">
                      <p className="font-semibold">{cert.titulo}</p>
                      <p className="text-gray-400">{cert.emisor}, {cert.anio}</p>
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-sm text-emerald-300 hover:text-emerald-400 transition-colors"
                      >
                        <span className="mr-1">Ver certificado</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </li>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg mx-auto">
            {idiomas.map((idioma, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                className="bg-neutral-800 p-2 rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 border-t-2 border-emerald-300 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-3">{idioma.idioma}</h3>
                <p className="text-gray-300">{idioma.nivel}</p>
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
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Mis <span className="text-emerald-300">Valores</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                className="bg-neutral-800 p-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 border-t-2 border-emerald-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{valor.titulo}</h3>
                <p className="text-gray-300">{valor.descripcion}</p>
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
            <a 
              href="/cv.pdf"
              download
              className="px-8 py-4 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <FaFileAlt className="text-xl" />
              Descargar CV
            </a>
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