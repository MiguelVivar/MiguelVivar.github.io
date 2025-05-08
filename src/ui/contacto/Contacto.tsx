'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import SocialMedia from './SocialMedia';
import FAQ from './FAQ';
import CallToAction from '../../components/CallToAction';
import AnimatedBackground from '../../components/AnimateBackground';
import { FaDownload, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarCheck } from 'react-icons/fa';
import { MdFolderOpen } from 'react-icons/md';

const Contacto: React.FC = () => {
  // Estado para el seguimiento del formulario
  const [formStep, setFormStep] = useState(0);
  
  // Información de contacto
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
    },
    {
      icono: <FaCalendarCheck className="text-2xl" />,
      titulo: 'Disponibilidad',
      detalle: 'Lunes a Viernes, 9am - 6pm (GMT-5)',
      enlace: '#'
    }
  ];

  // Detalles de servicios disponibles
  const disponibilidadDetallada = [
    { servicio: 'Desarrollo Web', descripcion: 'Sitios y aplicaciones web completas' },
    { servicio: 'Diseño UI/UX', descripcion: 'Interfaces intuitivas y modernas' },
    { servicio: 'Desarrollo Frontend', descripcion: 'React, Astro, Next.js y más' },
    { servicio: 'Desarrollo Backend', descripcion: 'Node.js, PHP, Python' },
    { servicio: 'SEO', descripcion: 'Optimización para motores de búsqueda' },
    { servicio: 'Consultoría', descripcion: 'Asesoría técnica personalizada' },
    { servicio: 'Mantenimiento', descripcion: 'Soporte y actualizaciones continuas' },
    { servicio: 'Integraciones', descripcion: 'APIs y servicios de terceros' },
    { servicio: 'E-commerce', descripcion: 'Tiendas online personalizadas' },
    { servicio: 'Desarrollo Móvil', descripcion: 'Aplicaciones para iOS y Android' },
    { servicio: 'Automatización', descripcion: 'Flujos de trabajo optimizados' },
    { servicio: 'Capacitación', descripcion: 'Cursos y talleres personalizados' }
  ];

  return (
    <main className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageHeader />
        </motion.div>

        {/* Indicador de disponibilidad */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="bg-neutral-800/80 backdrop-blur-lg px-6 py-3 rounded-full border border-emerald-500/30 flex items-center gap-2 shadow-lg shadow-emerald-500/10">
            <div className="h-3 w-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-300 font-medium">Disponible para nuevos proyectos</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Grid izquierda: Formulario y disponibilidad */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-8">
            {/* Formulario de contacto */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-neutral-800/90 backdrop-blur-sm p-8 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
            >
              {/* Progreso del formulario */}
              <div className="w-full bg-neutral-700 h-1 rounded mb-8 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" 
                  initial={{ width: "0%" }}
                  animate={{ width: `${formStep * 33.33}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {/* Aviso de simulación */}
              <div className="mb-6 p-3 bg-amber-500/20 border border-amber-400/30 rounded-md">
                <p className="text-amber-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Este formulario de contacto es solo una simulación con fines demostrativos. Para contactarme realmente, utiliza los datos de contacto directos.</span>
                </p>
              </div>
              
              <ContactForm setFormStep={setFormStep} />
            </motion.div>
            {/* Sección de servicios disponibles */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-neutral-800/90 backdrop-blur-sm p-6 rounded-lg border-t-2 border-emerald-300 shadow-lg shadow-emerald-500/10"
            >
              <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                <FaCalendarCheck className="text-xl" />
                Servicios Disponibles
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {disponibilidadDetallada.map((item, index) => (
                  <div key={index} className="flex flex-col text-neutral-300 py-2 border-b border-neutral-700">
                    <span className="font-medium">{item.servicio}</span>
                    <span className="text-emerald-200">{item.descripcion}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Tarjeta de información de contacto */}
            <ContactInfo infoContacto={infoContacto} />
            
            {/* Redes sociales */}
            <SocialMedia />
          </motion.div>
        </div>
        
        {/* Nueva sección de FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12"
        >
          <FAQ />
        </motion.div>
        
        {/* Sección de llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16"
        >
          <CallToAction 
            title='¿Listo para' 
            titlespan='trabajar juntos?' 
            description='Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales. ¡Contáctame y hagamos realidad tus ideas!' 
            buttonSecundaryIcon={<MdFolderOpen className="h-5 w-5" />} 
            buttonSecondaryText='Ver mis proyectos' 
            buttonPrimaryIcon={<FaDownload className="h-5 w-5" />} 
            buttonPrimaryText='Descargar CV'
          />
        </motion.div>

        {/* Animación del fondo */}
        <AnimatedBackground />
      </div>
      
      {/* Decoración de fondo */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
    </main>
  );
};

export default Contacto;