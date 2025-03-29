import { FaJava } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens, SiPug, SiBootstrap, SiMysql, SiHeroku, SiChatbot, SiVite } from 'react-icons/si';

export const proyectos = [
  {
    titulo: "Portafolio Personal",
    descripcion: "Sitio web personal para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
    imagen: "/portafolio.png",
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/MiguelVivar.github.io" },
      { tipo: "demo", url: "https://miguelvivar.github.io/" },
    ],
    destacado: true,
    categoria: "Front-End"
  },
  {
    titulo: "Calculadora de Consumo Y Propinas",
    descripcion: "Una página web para calcular el consumo y propinas de un restaurante.",
    imagen: "/calculadoraconsumo.png",
    tecnologias: [
      { nombre: "Vite", icono: <SiVite className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/Calculadora_Consumo_Propinas" },
      { tipo: "demo", url: "https://calculadoraconsumopropinas.netlify.app/" },
    ],
    destacado: true,
    categoria: "Front-End"
  },
  {
    titulo: "Portafolio VinnBonn",
    descripcion: "Portafolio para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
    imagen: "/vinnbonn.png",
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/VinnBonn" },
      { tipo: "demo", url: "https://vinn-bonn.vercel.app/" },
    ],
    destacado: false,
    categoria: "Front-End"
  },
  {
    titulo: "Portafolio ChuchiPG",
    descripcion: "Portafolio para mostrar proyectos y habilidades, con animaciones fluidas y diseño responsivo.",
    imagen: "/chuchipg.png",
    tecnologias: [
      { nombre: "Next.js", icono: <SiNextdotjs className="text-xl" /> },
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Framer Motion", icono: <SiFramer className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/Calculadora_Consumo_Propinas" },
      { tipo: "demo", url: "https://calculadoraconsumopropinas.netlify.app/" },
    ],
    destacado: false,
    categoria: "Front-End"
  },
  {
    titulo: "Administrador de Veterinaria",
    descripcion: "Un sistema de administración de una veterinaria con autenticación de usuarios.",
    imagen: "/administradorveterinaria.png",
    tecnologias: [
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "NodeJS", icono: <SiNodedotjs className="text-xl" /> },
      { nombre: "Express", icono: <SiExpress className="text-xl" /> },
      { nombre: "MongoDB", icono: <SiMongodb className="text-xl" /> },
      { nombre: "JWT", icono: <SiJsonwebtokens className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/APV_MERN_frontend" },
    ],
    destacado: true,
    categoria: "Full-Stack"
  },
  {
    titulo: "Agencia de Viajes",
    descripcion: "Un sitio web para una agencia de viajes con un diseño moderno y responsivo.",
    imagen: "/agenciaviajes.png",
    tecnologias: [
      { nombre: "Pug", icono: <SiPug className="text-xl" /> },
      { nombre: "NodeJS", icono: <SiNodedotjs className="text-xl" /> },
      { nombre: "Boostrap", icono: <SiBootstrap className="text-xl" /> },
      { nombre: "MySQL", icono: <SiMysql className="text-xl" /> },
      { nombre: "Heroku", icono: <SiHeroku className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/AgenciaViajesNodeJS" },
    ],
    destacado: false,
    categoria: "Full-Stack"
  },
  {
    titulo: "AiAssistEdu",
    descripcion: "Sitio web sobre una IA para la educación, cuenta con un chatbot capaz de generar tickets de soporte.",
    imagen: "/aiassistedu.png",
    tecnologias: [
      { nombre: "React", icono: <SiReact className="text-xl" /> },
      { nombre: "Tailwind CSS", icono: <SiTailwindcss className="text-xl" /> },
      { nombre: "Voiceflow", icono: <SiChatbot className="text-xl" /> },
    ],
    enlaces: [
      { tipo: "demo", url: "https://gjpf.edu.pe/aiassistedu/" },
    ],
    destacado: false,
    categoria: "Front-End"
  },
  {
    titulo: "SistemaAdmison",
    descripcion: "Aplicación que gestiona el proceso de admisión académica. Utiliza el patrón MVC y permite leer datos desde archivos DBF, mostrando los resultados de manera organizada en una interfaz gráfica.",
    imagen: "/sistemaadmision.png",
    tecnologias: [
      { nombre: "Java", icono: <FaJava className="text-xl" /> }
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/SistemaAdmision" },
    ],
    destacado: true,
    categoria: "Software"
  },
  {
    titulo: "GeneradorExamenes",
    descripcion: "Aplicación que genera exámenes de forma automatizada. Desarrollada en Java con NetBeans, permite organizar preguntas y respuestas en un formato estructurado para su aplicación.",
    imagen: "/generadorexamenes.png",
    tecnologias: [
      { nombre: "Java", icono: <FaJava className="text-xl" /> }
    ],
    enlaces: [
      { tipo: "github", url: "https://github.com/MiguelVivar/GeneradorExamenes" },
    ],
    destacado: true,
    categoria: "Software"
  },
];

// Categorías para el filtro
export const categorias = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'Full-Stack', nombre: 'Full-Stack' },
  { id: 'Front-End', nombre: 'Front-End' },
  { id: 'Back-End', nombre: 'Back-End' },
  { id: 'Software', nombre: 'Software' },
];