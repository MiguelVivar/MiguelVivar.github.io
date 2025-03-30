'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaDownload } from 'react-icons/fa';
import { redesSociales } from '@/data';

export default function Contacto() {
  // Estado para el formulario
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  // Manejar cambios en los campos del formulario
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDatosFormulario(prevDatos => ({
      ...prevDatos,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    
    // Simulación de envío de formulario
    try {
      // Esperar 1.5 segundos para simular el envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEnviado(true);
      setDatosFormulario({ nombre: '', email: '', mensaje: '' });
    } catch {
      setError('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  // Variantes de animación para elementos
  const variantesElemento = {
    oculto: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 0.6,
      }
    }
  };

  // Variantes de animación para contenedores
  const variantesContenedor = {
    oculto: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  // Información de contacto adicional
  const infoContacto = [
    {
      icono: <FaEnvelope className="text-2xl" />,
      titulo: 'Email',
      detalle: 'miguelvivarfarfan@gmail.com',
      enlace: 'mailto:miguelvivarfarfan@gmail.com'
    },
    {
      icono: <FaPhone className="text-2xl" />,
      titulo: 'Teléfono',
      detalle: '+51 977 346 392',
      enlace: 'tel:+51977346392'
    },
    {
      icono: <FaMapMarkerAlt className="text-2xl" />,
      titulo: 'Ubicación',
      detalle: 'Pisco - Ica, Perú',
      enlace: 'https://maps.google.com/?q=Pisco,Ica,Peru'
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 relative inline-block">
            <span className="text-emerald-300">Contacta</span> Conmigo
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-300/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos sobre cómo puedo ayudarte a hacerlo realidad!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-800 p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaEnvelope className="text-emerald-300" />
              Envíame un mensaje
            </h2>
            
            <AnimatePresence mode="wait">
              {enviado ? (
                <motion.div 
                  key="mensajeExito"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-emerald-500/20 border border-emerald-500 rounded-lg p-6 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-emerald-300/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-300 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-300 mb-4">Gracias por contactarme. Te responderé lo antes posible.</p>
                  <button
                    onClick={() => setEnviado(false)}
                    className="px-4 py-2 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="formularioContacto"
                  onSubmit={manejarEnvio} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    variants={variantesElemento}
                    initial="oculto"
                    animate="visible"
                  >
                    <label htmlFor="nombre" className="block text-gray-300 mb-2 font-medium">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={datosFormulario.nombre}
                      onChange={manejarCambio}
                      required
                      className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300"
                      placeholder="Tu nombre"
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={variantesElemento}
                    initial="oculto"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={datosFormulario.email}
                      onChange={manejarCambio}
                      required
                      className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300"
                      placeholder="tu-email@ejemplo.com"
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={variantesElemento}
                    initial="oculto"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="mensaje" className="block text-gray-300 mb-2 font-medium">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={datosFormulario.mensaje}
                      onChange={manejarCambio}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300 resize-none"
                      placeholder="Cuéntame sobre tu proyecto o consulta"
                    ></textarea>
                  </motion.div>
                  
                  {error && (
                    <motion.div 
                      className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {error}
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={enviando}
                    className="w-full px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                    variants={variantesElemento}
                    initial="oculto"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {enviando ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : 'Enviar mensaje'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Tarjeta de información de contacto */}
            <motion.div 
              className="bg-neutral-800 p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
              variants={variantesContenedor}
              initial="oculto"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Información de contacto</h2>
              
              <div className="space-y-4">
                {infoContacto.map((item) => (
                  <motion.a
                    key={item.titulo}
                    href={item.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={variantesElemento}
                    className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-all duration-300 group"
                  >
                    <div className="text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
                      {item.icono}
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{item.titulo}</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.detalle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Redes sociales */}
            <motion.div 
              className="bg-neutral-800 p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
              variants={variantesContenedor}
              initial="oculto"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Conecta conmigo</h2>
              
              <div className="space-y-4">
                {redesSociales.map((red) => (
                  <motion.a
                    key={red.nombre}
                    href={red.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={variantesElemento}
                    className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-all duration-300 group"
                  >
                    <div className="text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
                      {red.icono}
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{red.nombre}</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{red.usuario}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Sección de llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center bg-gradient-to-r from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-emerald-300/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para <span className="text-emerald-300">trabajar juntos</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/proyectos"
              className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Ver mis proyectos
            </Link>
            <a 
              href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2" 
              className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload className="h-5 w-5" />
              Descargar CV
            </a>
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