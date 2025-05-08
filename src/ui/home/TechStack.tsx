import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs,
  FaGithub
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiAstro,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiVercel,
  SiGit
} from 'react-icons/si';

// Define las tecnologías con sus íconos correspondientes y categorías
const technologies = [
  { 
    name: 'React', 
    icon: <FaReact className="text-blue-400" />,
    category: 'frontend',
    description: 'Biblioteca JavaScript para construir interfaces de usuario'
  },
  { 
    name: 'Next.js', 
    icon: <SiNextdotjs className="text-white" />,
    category: 'frontend',
    description: 'Framework React para aplicaciones web'
  },
  { 
    name: 'Astro', 
    icon: <SiAstro className="text-orange-500" />,
    category: 'frontend',
    description: 'Framework para sitios web centrado en el contenido'
  },
  { 
    name: 'TypeScript', 
    icon: <SiTypescript className="text-blue-500" />,
    category: 'language',
    description: 'Superset tipado de JavaScript'
  },
  { 
    name: 'JavaScript', 
    icon: <SiJavascript className="text-yellow-400" />,
    category: 'language',
    description: 'Lenguaje de programación de alto nivel'
  },
  { 
    name: 'HTML5', 
    icon: <SiHtml5 className="text-red-500" />,
    category: 'frontend',
    description: 'Lenguaje de marcado para la web'
  },
  { 
    name: 'CSS3', 
    icon: <SiCss3 className="text-blue-600" />,
    category: 'frontend',
    description: 'Lenguaje de estilos para diseño web'
  },
  { 
    name: 'Node.js', 
    icon: <FaNodeJs className="text-green-500" />,
    category: 'backend',
    description: 'Entorno de ejecución para JavaScript'
  },
  { 
    name: 'Tailwind CSS', 
    icon: <SiTailwindcss className="text-cyan-400" />,
    category: 'frontend',
    description: 'Framework CSS de utilidades'
  },
  { 
    name: 'Framer Motion', 
    icon: <SiFramer className="text-purple-500" />,
    category: 'frontend',
    description: 'Biblioteca para animaciones en React'
  },
  { 
    name: 'Git', 
    icon: <SiGit className="text-red-600" />,
    category: 'tool',
    description: 'Sistema de control de versiones'
  },
  { 
    name: 'GitHub', 
    icon: <FaGithub className="text-white" />,
    category: 'tool',
    description: 'Plataforma de desarrollo colaborativo'
  },
  { 
    name: 'Vercel', 
    icon: <SiVercel className="text-white" />,
    category: 'tool',
    description: 'Plataforma para despliegue de aplicaciones'
  }
];

// Filtros para categorías
const categories = [
  { id: 'all', name: 'Todas' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'language', name: 'Lenguajes' },
  { id: 'tool', name: 'Herramientas' }
];

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [hoveredTech, setHoveredTech] = React.useState<string | null>(null);

  const filteredTechnologies = React.useMemo(() => {
    if (activeCategory === 'all') return technologies;
    return technologies.filter(tech => tech.category === activeCategory);
  }, [activeCategory]);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full space-y-6"
    >
      {/* Título con efecto */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-center mb-6 text-gray-100 relative"
      >
        <span className="relative z-10">Stack Tecnológico</span>
        <motion.span
          className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-emerald-500/30 to-blue-500/30"
          style={{ y: '70%', filter: 'blur(8px)', zIndex: 0 }}
        />
      </motion.h2>
      
      {/* Filtros de categoría */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                : 'bg-neutral-800/50 text-gray-400 hover:text-gray-300 border-neutral-700/50'
            } border backdrop-blur-sm`}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid de tecnologías con destacado hover */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
      >
        {filteredTechnologies.map((tech, index) => (
          <motion.div 
            key={tech.name}
            variants={itemVariants}
            onHoverStart={() => setHoveredTech(tech.name)}
            onHoverEnd={() => setHoveredTech(null)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transition: { duration: 0.2 }
            }}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
              hoveredTech === tech.name 
                ? 'bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 border-emerald-500/50'
                : 'bg-neutral-800/50 border-neutral-700/30'
            } border backdrop-blur-sm overflow-hidden group`}
          >
            {/* Efecto de halo en hover */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 -z-10"
              initial={false}
              animate={hoveredTech === tech.name ? {
                background: [
                  'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%)'
                ]
              } : {}}
            />

            {/* Icono con animación */}
            <motion.div
              animate={
                hoveredTech === tech.name 
                  ? { 
                      y: [0, -5, 0],
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5 } 
                    }
                  : { 
                      rotate: [0, 10, -10, 10, 0],
                      transition: { 
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                        repeatDelay: 5
                      }
                    }
              }
              className="text-3xl mb-2"
            >
              {tech.icon}
            </motion.div>
            
            {/* Nombre de tecnología */}
            <motion.p className="text-sm font-medium text-gray-200 text-center mb-1">
              {tech.name}
            </motion.p>
            
            {/* Descripción con animación fade in */}
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={hoveredTech === tech.name ? 
                { opacity: 1, height: 'auto' } : 
                { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-400 text-center mt-1 overflow-hidden"
            >
              {tech.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
        {/* Indicador de interacción */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1"
      >
        <span>Pasa el cursor sobre las tecnologías para ver más detalles</span>
        <motion.div
          animate={{ 
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↑
        </motion.div>
      </motion.div>      {/* Botón para ver todas las habilidades */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="flex justify-center mt-10"
      >
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute h-10 w-40 bg-emerald-500/20 rounded-full blur-xl -z-10"
        />
        <motion.a 
          href="/habilidades" 
          whileHover={{ 
            scale: 1.03,
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
          }}
          whileTap={{ scale: 0.97 }}
          className="relative group px-8 py-3 bg-neutral-800/80 text-emerald-400 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-emerald-500/10 border border-emerald-500/30 overflow-hidden"
        >
          {/* Efecto de destello en hover */}
          <motion.span 
            className="absolute inset-0 w-full h-full"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.08), transparent)',
              transform: 'translateX(-100%)'
            }}
            animate={{ 
              x: ['0%', '200%']
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              repeat: Infinity, 
              repeatDelay: 0.5 
            }}
          />
          
          {/* Iconos decorativos que flotan en el fondo */}
          <motion.div 
            className="absolute -z-10 text-emerald-500/10 text-4xl"
            style={{ top: '-10px', right: '10px' }}
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-16a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V7a1 1 0 011-1z" />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute -z-10 text-emerald-500/10 text-4xl"
            style={{ bottom: '-5px', left: '15px' }}
            animate={{ 
              y: [0, 5, 0],
              rotate: [0, -5, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 3.5, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M14.828 9.828a4 4 0 11-5.656 5.656 4 4 0 015.656-5.656zm-8.485 8.485l-3.05 3.05A1 1 0 104.929 22.98l2.979-2.98a9.001 9.001 0 01-1.565-1.687zm11.313 0l3.05 3.05a1 1 0 11-1.414 1.414l-2.98-2.979c.709-.5 1.371-1.08 1.98-1.729a1 1 0 01-1.98 1.729 7 7 0 10-9.9-9.9 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 9.03 9.03 0 011.565 1.687L22.98 4.93a1 1 0 00-1.415-1.415l-3.05 3.051a9.004 9.004 0 00-1.687-1.565L19.07 1.93a1 1 0 10-1.414-1.414l-3.05 3.05A9 9 0 006.343 11.83L3.292 8.778A1 1 0 001.878 10.192l3.051 3.051a9.003 9.003 0 001.565 1.687L3.414 17.91a1 1 0 101.414 1.414l3.05-3.05c.19.245.394.479.61.7.216.22.45.425.695.615z" />
            </svg>
          </motion.div>
          
          {/* Icono principal */}
          <motion.div
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
            className="bg-emerald-500/20 p-2 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h.008v.008H19.5V12Z" />
            </svg>
          </motion.div>
          
          {/* Texto con animación en hover */}
          <div>
            <span className="text-gray-200 group-hover:text-emerald-300 transition-colors duration-300">Ver todas mis </span>
            <span className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">habilidades</span>
          </div>
          
          {/* Flecha con animación */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 opacity-70"
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </motion.svg>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default TechStack;