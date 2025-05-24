import React from 'react';
import { FaLightbulb, FaHandshake, FaClock, FaRocket, FaCode, FaTeamspeak } from 'react-icons/fa';

// Tipos exportados para usar en componentes
export interface CertificadoCategoria {
  categoria: string;
  certificados: {
    titulo: string;
    emisor: string;
    anio: string;
    link: string;
  }[];
}

export type CertificadoData = CertificadoCategoria;

export interface IdiomaData {
  idioma: string;
  nivel: string;
}

export interface ValorData {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

export interface CarreraData {
  carrera: string;
  universidad: string;
  cicloActual: number;
  ciclosTotales: number;
  porcentajeCompletado: number;
  fechaInicio: string;
  fechaEstimadaFinalizacion: string;
  estadoActual: string;
}

// Datos para la sección de certificados
export const certificados: CertificadoData[] = [
  {
    categoria: "Desarrollo Web",
    certificados: [
      {
        titulo: "Responsive Web Desing",
        emisor: "freeCodeCamp",
        anio: "2024",
        link: "https://www.freecodecamp.org/certification/fcc334e614b-0f23-4bd8-b91f-a031321a21a2/responsive-web-design"
      },
      {
        titulo: "JavaScript Algorithms and Data Structures",
        emisor: "freeCodeCamp",
        anio: "2025",
        link: "https://www.freecodecamp.org/certification/fcc334e614b-0f23-4bd8-b91f-a031321a21a2/javascript-algorithms-and-data-structures-v8"
      }
    ]
  },
  {
    categoria: "Computación",
    certificados: [
      {
        titulo: "Computer Hardware Basics",
        emisor: "Cisco",
        anio: "2024",
        link: "https://www.credly.com/badges/22310860-c565-4787-94c2-33ed830d1c92/linked_in_profile"
      }
    ]
  }
];

// Datos para la sección de idiomas
export const idiomas: IdiomaData[] = [
  {
    idioma: "Español",
    nivel: "Nativo"
  },
  {
    idioma: "Inglés",
    nivel: "Básico (A2)"
  }
];

// Datos para la sección de valores
export const valores: ValorData[] = [
  {
    titulo: "Innovación",
    descripcion: "Busco constantemente nuevas formas de resolver problemas y mejorar procesos mediante la tecnología.",
    icono: <FaLightbulb className="w-8 h-8" />
  },
  {
    titulo: "Compromiso",
    descripcion: "Me dedico completamente a cada proyecto, cumpliendo con los tiempos y superando expectativas.",
    icono: <FaHandshake className="w-8 h-8" />
  },
  {
    titulo: "Calidad",
    descripcion: "Me esfuerzo por escribir código limpio, mantenible y eficiente en cada proyecto.",
    icono: <FaCode className="w-8 h-8" />
  },
  {
    titulo: "Puntualidad",
    descripcion: "Valoro el tiempo propio y ajeno, cumpliendo plazos y manteniendo una gestión eficiente.",
    icono: <FaClock className="w-8 h-8" />
  },
  {
    titulo: "Colaboración",
    descripcion: "Creo en el poder del trabajo en equipo para lograr resultados excepcionales.",
    icono: <FaTeamspeak className="w-8 h-8" />
  },  {
    titulo: "Proactividad",
    descripcion: "Tomo la iniciativa para identificar oportunidades y resolver problemas antes de que escalen.",
    icono: <FaRocket className="w-8 h-8" />
  }
];

// Datos para la sección de carrera universitaria
export const carrera: CarreraData = {
  carrera: "Ingeniería de Sistemas",
  universidad: "Universidad Nacional de Ingeniería",
  cicloActual: 4,
  ciclosTotales: 10,
  porcentajeCompletado: 40,
  fechaInicio: "2023",
  fechaEstimadaFinalizacion: "2027",
  estadoActual: "En curso"
};