import { FaHtml5, FaCss3, FaSass, FaBootstrap, FaReact, FaNodeJs, FaGithub, FaFigma, FaJava, FaPython, FaLaptopCode, FaServer, FaCode, FaTools, FaLayerGroup } from 'react-icons/fa';
import { TbBrandCSharp } from "react-icons/tb";
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiTypescript, SiFramer, SiExpress, SiMongodb, SiJest, SiBulma, SiVite, SiGit, SiCypress, SiPostman } from 'react-icons/si';
import { BsKanban, BsSearch } from 'react-icons/bs';
import { MdOutlineDesignServices, MdDevices } from 'react-icons/md';
import { AiOutlineApartment } from 'react-icons/ai';

export const categoriasHabilidades = [
  {
    titulo: "Front-End",
    icono: <FaLaptopCode className="text-emerald-300 text-2xl" />,
    habilidades: [
      { nombre: "HTML5", nivel: "Avanzado", icono: <FaHtml5 className="text-2xl" /> },
      { nombre: "CSS3", nivel: "Avanzado", icono: <FaCss3 className="text-2xl" /> },
      { nombre: "JavaScript", nivel: "Avanzado", icono: <SiJavascript className="text-2xl" /> },
      { nombre: "SASS", nivel: "Avanzado", icono: <FaSass className="text-2xl" /> },
      { nombre: "Bootstrap", nivel: "Avanzado", icono: <FaBootstrap className="text-2xl" /> },
      { nombre: "Tailwind CSS", nivel: "Avanzado", icono: <SiTailwindcss className="text-2xl" /> },
      { nombre: "Bulma CSS", nivel: "Avanzado", icono: <SiBulma className="text-2xl" /> },
      { nombre: "React", nivel: "Avanzado", icono: <FaReact className="text-2xl" /> },
      { nombre: "Next.js", nivel: "Intermedio", icono: <SiNextdotjs className="text-2xl" /> },
      { nombre: "TypeScript", nivel: "Intermedio", icono: <SiTypescript className="text-2xl" /> },
      { nombre: "Vite", nivel: "Intermedio", icono: <SiVite className="text-2xl" /> },
      { nombre: "Framer Motion", nivel: "Básico", icono: <SiFramer className="text-2xl" /> },
    ],
  },
  {
    titulo: "Back-End",
    icono: <FaServer className="text-emerald-300 text-2xl" />,
    habilidades: [
      { nombre: "Node.js", nivel: "Avanzado", icono: <FaNodeJs className="text-2xl" /> },
      { nombre: "Express", nivel: "Avanzado", icono: <SiExpress className="text-2xl" /> },
      { nombre: "MongoDB", nivel: "Intermedio", icono: <SiMongodb className="text-2xl" /> },
      { nombre: "SQL", nivel: "Intermedio", icono: <AiOutlineApartment className="text-2xl" /> }
    ],
  },
  {
    titulo: "Lenguajes de Programación",
    icono: <FaCode className="text-emerald-300 text-2xl" />,
    habilidades: [
      { nombre: "Python", nivel: "Intermedio", icono: <FaPython className="text-2xl" /> },
      { nombre: "Java", nivel: "Intermedio", icono: <FaJava className="text-2xl" /> },
      { nombre: "C#", nivel: "Intermedio", icono: <TbBrandCSharp className="text-2xl" /> }
    ],
  },
  {
    titulo: "Herramientas",
    icono: <FaTools className="text-emerald-300 text-2xl" />,
    habilidades: [
      { nombre: "Git", nivel: "Avanzado", icono: <SiGit className="text-2xl" /> },
      { nombre: "GitHub", nivel: "Avanzado", icono: <FaGithub className="text-2xl" /> },
      { nombre: "Figma", nivel: "Intermedio", icono: <FaFigma className="text-2xl" /> },
      { nombre: "Jest", nivel: "Intermedio", icono: <SiJest className="text-2xl" /> },
      { nombre: "Cypress", nivel: "Intermedio", icono: <SiCypress className="text-2xl" /> },
      { nombre: "Postman", nivel: "Intermedio", icono: <SiPostman className="text-2xl" /> }
    ],
  },
  {
    titulo: "Otros",
    icono: <FaLayerGroup className="text-emerald-300 text-2xl" />,
    habilidades: [
        { nombre: "Responsive Design", nivel: "Avanzado", icono: <MdDevices className="text-2xl" /> },
        { nombre: "UI/UX Design", nivel: "Intermedio", icono: <MdOutlineDesignServices className="text-2xl" /> },
      { nombre: "Metodologias Agiles", nivel: "Intermedio", icono: <BsKanban className="text-2xl" /> },
      { nombre: "Accesibilidad Web", nivel: "Intermedio", icono: <AiOutlineApartment className="text-2xl" /> },
      { nombre: "SEO", nivel: "Básico", icono: <BsSearch className="text-2xl" /> },
      { nombre: "PWA", nivel: "Básico", icono: <MdDevices className="text-2xl" /> },
    ],
  },
];

export const obtenerColorNivel = (nivel: string): string => {
  switch (nivel) {
    case "Avanzado":
      return "bg-emerald-500";
    case "Intermedio":
      return "bg-emerald-400";
    case "Básico":
      return "bg-emerald-300";
    default:
      return "bg-emerald-200";
  }
};

export const obtenerDescripcionNivel = (nivel: string): string => {
  switch (nivel) {
    case "Avanzado":
      return "Dominio completo con experiencia en proyectos complejos";
    case "Intermedio":
      return "Buen conocimiento y aplicacion en proyectos reales";
    case "Básico":
      return "Conocimientos fundamentales y en desarrollo";
    default:
      return "";
  }
};