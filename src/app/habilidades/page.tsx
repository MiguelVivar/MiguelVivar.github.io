'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { categoriasHabilidades, obtenerColorNivel, obtenerDescripcionNivel } from '@/data/habilidades';

export default function Habilidades() {

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
            Mis <span className="text-emerald-300">Habilidades</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones digitales efectivas
          </p>
        </motion.div>

        <div className="space-y-16">
          {categoriasHabilidades.map((categoriasHabilidades, indiceCategoria) => (
            <motion.div
              key={categoriasHabilidades.titulo}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: indiceCategoria * 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="h-0.5 flex-1 bg-neutral-800"></div>
                <h2 className="text-3xl font-bold text-white mx-6 flex items-center gap-2">
                  {categoriasHabilidades.titulo}
                </h2>
                <div className="h-0.5 flex-1 bg-neutral-800"></div>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                {categoriasHabilidades.habilidades.map((habilidad, index) => (
                  <motion.div
                    key={habilidad.nombre}
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
                    className="bg-neutral-800 p-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 border-t-2 border-emerald-300 group relative overflow-hidden"
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="absolute -inset-full h-full w-full z-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
                      animate={{
                        x: ['200%', '-200%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div 
                      className="relative z-10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <motion.div 
                        className="flex justify-between items-center mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + (index * 0.1) }}
                      >
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2">
                          <motion.span 
                            className="text-emerald-300"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                          >
                            {habilidad.icono}
                          </motion.span>
                          {habilidad.nombre}
                        </h3>
                        <motion.span 
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-neutral-900 ${obtenerColorNivel(habilidad.nivel)}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1) }}
                        >
                          {habilidad.nivel}
                        </motion.span>
                      </motion.div>
                      <motion.p 
                        className="text-gray-400 text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                      >
                        {obtenerDescripcionNivel(habilidad.nivel)}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Interesado en mis <span className="text-emerald-300">habilidades</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Estoy constantemente aprendiendo y mejorando mis habilidades. Si quieres saber más sobre mi trabajo o tienes un proyecto en mente, ¡contáctame!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/proyectos"
              className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base"
            >
              Ver Proyectos
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