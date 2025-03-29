// Enlaces para la navegación principal
export const enlacesNavegacion = [
  { href: '/', label: 'Inicio' },
  { href: '/sobremi', label: 'Sobre Mí' },
  { href: '/habilidades', label: 'Habilidades' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/contacto', label: 'Contacto' },
];

// Configuración para animaciones de navegación
export const configuracionAnimacion = {
  inicial: { opacity: 0, y: -10 },
  animado: { opacity: 1, y: 0 },
  transicion: { duration: 0.2 },
  salida: { opacity: 0, y: -10 }
};

// Estado de navegación móvil
export const estadoNavegacionMovil = {
  abierto: false,
  cerrado: true
};