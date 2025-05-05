import { Metadata } from 'next';
import Contacto from '@/ui/contacto/Contacto';

export const metadata: Metadata = {
  title: 'Contacto | Miguel Vivar - Desarrollador Full Stack',
  description: 'Contáctame para trabajar en tu proyecto o si tienes alguna consulta.'
};

export default function ContactoPage() {
  return <Contacto />;
}