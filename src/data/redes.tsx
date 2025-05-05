import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export interface RedSocial {
  nombre: string;
  usuario: string;
  enlace: string;
  icono: React.ReactNode;
}

export const redesSociales: RedSocial[] = [
  {
    nombre: "Email",
    usuario: "miguelvivarfarfan@gmail.com",
    enlace: "mailto:miguelvivarfarfan@gmail.com",
    icono: <FaEnvelope className="text-2xl" />,
  },
  {
    nombre: "LinkedIn",
    usuario: "Miguel Vivar Farfan",
    enlace: "https://www.linkedin.com/in/miguel-vivar-farfan/",
    icono: <FaLinkedin className="text-2xl" />
  },
  {
    nombre: "GitHub",
    usuario: "@MiguelVivar",
    enlace: "https://github.com/MiguelVivar",
    icono: <FaGithub className="text-2xl" />
  },
  {
    nombre: "Instagram",
    usuario: "@mvivarf",
    enlace: "https://www.instagram.com/mvivarf",
    icono: <FaInstagram className="text-2xl" />
  }
];