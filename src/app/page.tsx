'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const roles = [
    "Full-Stack",
    "Front-End",
    "Back-End",
    "de Software",
  ];
  
  const { text: rolTexto, showCursor } = useTypewriter(roles, 100, 75, 1500);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-4 sm:space-y-5 text-center md:text-left"
          >
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
              Miguel <span className='text-emerald-300'>Vivar</span>
            </motion.h1>
            <motion.p className="text-xl sm:text-2xl text-gray-300">
              Desarrollador{' '}
              <span className="text-emerald-300">
                {rolTexto}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              </span>
            </motion.p>
            <motion.p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto md:mx-0">
              Especializado en crear experiencias web únicas y funcionales,
              combinando diseño atractivo con tecnologías modernas.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6 justify-center md:justify-start">
              <Link 
                href="/proyectos"
                className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base"
              >
                Ver Proyectos
              </Link>
              <a 
                href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2" 
                className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base flex items-center gap-2"
                target='_blank'
              >
                Descargar CV
                <ArrowDownTrayIcon className="w-5 h-5" />
              </a>
              <Link 
                href="/contacto"
                className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Contactar
              </Link>
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
            </motion.div>
          </motion.div>

          {/* Animación del fondo */}
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
      </div>
    </main>
  );
}
