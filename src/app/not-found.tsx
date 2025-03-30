'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">
            <span className="text-white">
                4
                <span className='text-emerald-300'>0</span>
                4
                </span>
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Página no <span className="text-emerald-300">encontrada</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link 
              href="/"
              className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <FaHome className="text-xl" />
              Ir al inicio
            </Link>
            <Link 
              href="/proyectos"
              className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <FaProjectDiagram className="text-xl" />
              Ver proyectos
            </Link>
            <Link 
              href="/contacto"
              className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <FaEnvelope className="text-xl" />
              Contactar
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}