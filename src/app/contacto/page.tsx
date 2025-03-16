'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    
    // Simulación de envío de formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEnviado(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch {
      setError('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  const redesSociales = [
    { nombre: 'Email', icono: <FaEnvelope className="text-2xl" />, enlace: 'mailto:miguelvivarfarfan@gmail.com', usuario: 'miguelvivarfarfan@gmail.com' },
    { nombre: 'LinkedIn', icono: <FaLinkedin className="text-2xl" />, enlace: 'https://www.linkedin.com/in/miguel-vivar-farfan/', usuario: 'Miguel Vivar Farfan' },
    { nombre: 'GitHub', icono: <FaGithub className="text-2xl" />, enlace: 'https://github.com/MiguelVivar', usuario: '@MiguelVivar' },
    { nombre: 'Instagram', icono: <FaInstagram className="text-2xl" />, enlace: 'https://www.instagram.com/mvivarf/', usuario: '@mvivarf' },
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
            <span className="text-emerald-300">Contacta</span> Conmigo
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
            <h2 className="text-2xl font-bold text-white mb-6">Envíame un mensaje</h2>
            
            {enviado ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/20 border border-emerald-500 rounded-lg p-6 text-center"
              >
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-gray-300 mb-2 font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300"
                    placeholder="tu-email@ejemplo.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-gray-300 mb-2 font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-white transition-all duration-300 resize-none"
                    placeholder="Cuéntame sobre tu proyecto o consulta"
                  ></textarea>
                </div>
                
                {error && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
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
                </button>
              </form>
            )}
          </motion.div>
          
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-neutral-800 p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Conecta conmigo</h2>
              
              <div className="space-y-6">
                {redesSociales.map((red, index) => (
                  <motion.a
                    key={red.nombre}
                    href={red.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
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
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center space-y-4"
        >
          <Link 
            href="/proyectos"
            className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 inline-block mr-4"
          >
            Ver mis proyectos
          </Link>
          <a 
            href="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2" 
            className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 inline-block"
            target='_black'
          >
            Descargar CV
          </a>
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
    </main>
  );
}