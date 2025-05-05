import { Metadata } from 'next';
import SobreMi from '@/ui/sobremi/SobreMi';

export const metadata: Metadata = {
  title: 'Sobre Mí | Miguel Vivar - Desarrollador Full Stack',
  description: 'Conozca más sobre mi experiencia, habilidades y trayectoria profesional.'
};

export default function SobreMiPage() {
  return <SobreMi />;
}