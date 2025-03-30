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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 relative inline-block">
            Mis <span className="text-emerald-300">Habilidades</span>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-300/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones digitales efectivas
          </p>
        </motion.div>

        <div className="space-y-16">
          {categoriasHabilidades.map((categoria, indiceCategoria) => (
            <motion.div
              key={categoria.titulo}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: indiceCategoria * 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="h-0.5 flex-1 bg-neutral-800"></div>
                <motion.div 
                  className="mx-6 flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-neutral-800 p-3 rounded-full mb-2 shadow-lg shadow-emerald-500/10">
                    <span className="text-emerald-300 text-2xl">{categoria.icono}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {categoria.titulo}
                  </h2>
                </motion.div>
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
                viewport={{ once: true, margin: "-100px" }}
              >
                {categoria.habilidades.map((habilidad, index) => (
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
                    {/* Efecto de brillo */}
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
                    
                    {/* Efecto de resplandor al pasar el ratón */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10 transition-all duration-500 rounded-lg"></div>
                    
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
                            className="text-emerald-300 text-2xl"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: 0.2 + (index * 0.1),
                              type: "spring",
                              stiffness: 260,
                              damping: 20
                            }}
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
                      
                      {/* Barra de progreso de habilidad */}
                      <motion.div 
                        className="mt-4 w-full bg-neutral-700 rounded-full h-1.5"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                      >
                        <motion.div 
                          className={`h-1.5 rounded-full ${
                            habilidad.nivel === 'Experto' ? 'bg-emerald-300' :
                            habilidad.nivel === 'Avanzado' ? 'bg-emerald-400' :
                            habilidad.nivel === 'Intermedio' ? 'bg-emerald-500' :
                            'bg-emerald-600'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: 
                            habilidad.nivel === 'Experto' ? '95%' :
                            habilidad.nivel === 'Avanzado' ? '80%' :
                            habilidad.nivel === 'Intermedio' ? '60%' :
                            '40%'
                          }}
                          transition={{ delay: 0.6 + (index * 0.1), duration: 0.8, ease: "easeOut" }}
                        />
                      </motion.div>
                      
                      {/* Años de experiencia */}
                      {'experiencia' in habilidad && (
                        <motion.div 
                          className="mt-3 text-xs text-emerald-300/70 flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 + (index * 0.1) }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{`${habilidad.experiencia} ${habilidad.experiencia === 1 ? 'año' : 'años'} de experiencia`}</span>
                        </motion.div>
                      )}
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
          className="text-center mt-20 bg-gradient-to-r from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-emerald-300/20"
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
              className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Ver Proyectos
            </Link>
            <Link 
              href="/contacto"
              className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactar
            </Link>
          </div>
        </motion.div>

        {/* Animación del fondo */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.05, 0.1, 0.05],
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
              opacity: [0.05, 0.1, 0.05],
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