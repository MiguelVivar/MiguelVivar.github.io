import { Metadata } from 'next';
import Proyectos from '@/ui/proyectos/Proyectos';

export const metadata: Metadata = {
  title: 'Mis Proyectos | Miguel Vivar - Desarrollador Full Stack',
  description: 'Portfolio de proyectos desarrollados, incluyendo aplicaciones web, móviles y otros sistemas.'
};

export default function ProyectosPage() {
  return <Proyectos />;
}