'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  const anioActual = new Date().getFullYear();
  
  const redesSociales = [
    { nombre: 'Email', icono: <FaEnvelope className="text-xl" />, enlace: 'mailto:miguelvivarfarfan@gmail.com' },
    { nombre: 'LinkedIn', icono: <FaLinkedin className="text-xl" />, enlace: 'https://www.linkedin.com/in/miguel-vivar-farfan/' },
    { nombre: 'GitHub', icono: <FaGithub className="text-xl" />, enlace: 'https://github.com/MiguelVivar' },
    { nombre: 'Instagram', icono: <FaInstagram className="text-xl" />, enlace: 'https://www.instagram.com/mvivarf/' },
  ];

  const enlaces = [
    { href: '/', label: 'Inicio' },
    { href: '/sobremi', label: 'Sobre Mí' },
    { href: '/habilidades', label: 'Habilidades' },
    { href: '/proyectos', label: 'Proyectos' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y descripción */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/logo.svg" 
                  alt="Logo Miguel Vivar" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">Miguel Vivar</span>
            </Link>
            <p className="text-gray-400">
              Desarrollador Full-Stack especializado en crear experiencias web únicas y funcionales,
              combinando diseño atractivo con tecnologías modernas.
            </p>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {enlaces.map((enlace, index) => (
                <motion.li 
                  key={enlace.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                >
                  <Link 
                    href={enlace.href}
                    className="text-gray-400 hover:text-emerald-300 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-1">›</span> {enlace.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Conecta Conmigo</h3>
            <div className="flex space-x-3">
              {redesSociales.map((red, index) => (
                <motion.a
                  key={red.nombre}
                  href={red.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                  className="bg-neutral-800 p-2 rounded-full text-emerald-300 hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-110"
                  aria-label={red.nombre}
                >
                  {red.icono}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Línea divisoria */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent my-6"
        />

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>© {anioActual} Miguel Vivar. Todos los derechos reservados.</p>
        </motion.div>

        {/* Animación del fondo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.05, 0.08, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl"
          />
        </div>
      </div>
    </footer>
  );
}