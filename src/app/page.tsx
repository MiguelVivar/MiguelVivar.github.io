'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { roles } from '@/data';

export default function Home() {
  const { text: rolTexto, showCursor } = useTypewriter(roles, 100, 75, 1500);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 relative">
      <div className="w-full max-w-7xl mx-auto py-16 sm:py-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-5 sm:space-y-6 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-emerald-300/10 rounded-full border border-emerald-300/20 text-emerald-300 text-sm font-medium mb-2"
            >
              Disponible para proyectos freelance
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-300 flex items-center gap-2 justify-center md:justify-start"
            >
              ¡Hola! 
              <motion.span
                animate={{ rotate: [0, 15, -5, 15, 0] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
                style={{ originX: 0.7, originY: 0.7 }}
                className="inline-block"
              >
                👋
              </motion.span>
              Soy
            </motion.h3>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            >
              Miguel <span className='text-emerald-300 relative inline-block'>
                Vivar
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-300/50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-300"
            >
              Desarrollador{' '}
              <span className="text-emerald-300">
                {rolTexto}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              </span>
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              Transformo ideas en soluciones digitales innovadoras, combinando diseño atractivo 
              con tecnologías de vanguardia para crear experiencias web que destacan por su 
              funcionalidad, rendimiento y estética.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6 justify-center md:justify-start"
            >
              <Link 
                href="/proyectos"
                className="group px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base flex items-center justify-center"
              >
                <span>Ver Proyectos</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              
              <a 
                href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2" 
                className="group px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base flex items-center justify-center gap-2"
                target='_blank'
                rel="noopener noreferrer"
              >
                <span>Descargar CV</span>
                <ArrowDownTrayIcon className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              
              <Link 
                href="/contacto"
                className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center"
              >
                <span>Contactar</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-3 pt-4 justify-center md:justify-start"
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-neutral-800 text-gray-300 rounded-full text-xs font-medium border border-neutral-700 hover:border-emerald-300/50 hover:text-emerald-300 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center md:justify-end"
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
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden border-4 border-emerald-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full"
              >
                <Image
                  src="/perfil.png"
                  alt="Foto de perfil"
                  fill
                  quality={100}
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 18rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, 28rem"
                  priority
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 bg-emerald-300 text-neutral-800 rounded-full p-3 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
