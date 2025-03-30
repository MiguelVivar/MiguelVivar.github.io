'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { redesSociales } from '@/data';
import { useState } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { frases } from '@/data';

export default function Footer() {
  const anioActual = new Date().getFullYear();
  const [hoverLogo, setHoverLogo] = useState(false);
  const { text: rolTexto, showCursor } = useTypewriter(frases, 100, 75, 1500);

  const enlaces = [
    { 
      href: '/', 
      label: 'Inicio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    { 
      href: '/sobremi', 
      label: 'Sobre Mí',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      href: '/habilidades', 
      label: 'Habilidades',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    { 
      href: '/proyectos', 
      label: 'Proyectos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
    { 
      href: '/contacto', 
      label: 'Contacto',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    },
  ];

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer className="relative bg-neutral-900 border-t border-neutral-800 pt-12 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Logo y descripción */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <Link 
              href="/" 
              className="flex items-center group" 
              onMouseEnter={() => setHoverLogo(true)}
              onMouseLeave={() => setHoverLogo(false)}
            >
              <motion.div 
                className="relative w-10 h-10 mr-2"
                animate={{ 
                  rotate: hoverLogo ? 360 : 0,
                  scale: hoverLogo ? 1.1 : 1
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="Logo Miguel Vivar" 
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.span 
                className="text-xl font-bold"
                animate={{ 
                  color: hoverLogo ? "#6ee7b7" : "#ffffff"
                }}
                transition={{ duration: 0.3 }}
              >
                Miguel <span className="text-emerald-300">Vivar</span>
              </motion.span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Desarrollador Full-Stack especializado en crear experiencias web únicas y funcionales,
              combinando diseño atractivo con tecnologías modernas.
            </p>
            <div className="pt-2">
              <Link 
                href="/contacto" 
                className="inline-flex items-center text-emerald-300 hover:text-emerald-400 transition-colors duration-300 group"
              >
                <span>Trabajemos juntos</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white relative inline-block">
              Enlaces Rápidos
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-emerald-300"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </h3>
            <ul className="space-y-2">
              {enlaces.map((enlace, index) => (
                <motion.li 
                  key={enlace.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                >
                  <Link 
                    href={enlace.href}
                    className="text-gray-400 hover:text-emerald-300 transition-colors duration-300 flex items-center group"
                  >
                    <motion.div 
                      className="mr-2 text-emerald-300"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {enlace.icon}
                    </motion.div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {enlace.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white relative inline-block">
              Conecta Conmigo
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-emerald-300"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </h3>
            <div className="flex space-x-3">
              {redesSociales.map((red) => (
                <motion.a
                  key={red.nombre}
                  href={red.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.15, 
                    boxShadow: "0 0 15px rgba(110, 231, 183, 0.5)" 
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-800 p-2 rounded-full text-emerald-300 hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300"
                  aria-label={red.nombre}
                >
                  {red.icono}
                </motion.a>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-gray-400 text-sm">
                ¿Tienes alguna pregunta o propuesta?
              </p>
              <a 
                href="mailto:contacto@miguelvivar.com" 
                className="text-emerald-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center mt-1 group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 mr-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="group-hover:underline">miguelvivarfarfan@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Línea divisoria */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent my-6"
        />

        {/* Copyright y créditos */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-3 md:mt-0 italic"
          >
            &quot;{rolTexto}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>&quot;
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            © {anioActual} Miguel Vivar. Todos los derechos reservados.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}