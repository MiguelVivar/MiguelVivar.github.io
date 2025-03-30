import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

// Información personal para la página de inicio
export const informacionPersonal = {
  nombre: "Miguel Vivar",
  titulo: "Desarrollador Full-Stack",
  descripcion: "Desarrollador Full-Stack especializado en crear experiencias web únicas y funcionales, combinando diseño atractivo con tecnologías modernas.",
  imagen: "/perfil.png"
};

// Información de contacto
export const informacionContacto = {
  email: "miguelvivarfarfan@gmail.com",
  linkedin: "https://www.linkedin.com/in/miguel-vivar-farfan/",
  github: "https://github.com/MiguelVivar",
  instagram: "https://www.instagram.com/mvivarf/"
};

// Redes sociales para componentes como el footer
export const redesSociales = [
  { nombre: 'Email', icono: <FaEnvelope className="text-2xl" />, enlace: 'mailto:miguelvivarfarfan@gmail.com', usuario: 'miguelvivarfarfan@gmail.com' },
  { nombre: 'LinkedIn', icono: <FaLinkedin className="text-2xl" />, enlace: 'https://www.linkedin.com/in/miguel-vivar-farfan/', usuario: 'Miguel Vivar Farfan' },
  { nombre: 'GitHub', icono: <FaGithub className="text-2xl" />, enlace: 'https://github.com/MiguelVivar', usuario: '@MiguelVivar' },
  { nombre: 'Instagram', icono: <FaInstagram className="text-2xl" />, enlace: 'https://www.instagram.com/mvivarf/', usuario: '@mvivarf' },
];