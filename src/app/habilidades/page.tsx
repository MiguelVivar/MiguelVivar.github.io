import { Metadata } from 'next';
import Habilidades from '@/ui/habilidades/Habilidades';

export const metadata: Metadata = {
  title: 'Mis Habilidades | Miguel Vivar - Desarrollador Full Stack',
  description: 'Conoce las tecnologías y herramientas que utilizo en el desarrollo de mis proyectos.'
};

export default function HabilidadesPage() {
  return <Habilidades />;
}