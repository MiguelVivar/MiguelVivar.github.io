import { atom } from 'nanostores';

// Estado para controlar el menú móvil
export const isMenuOpen = atom(false);

// Estado para detectar scroll
export const isScrolled = atom(false);

// Función para alternar el menú
export function toggleMenu() {
  isMenuOpen.set(!isMenuOpen.get());
}

// Función para detectar scroll
export function setupScrollDetection() {
  const handleScroll = () => {
    isScrolled.set(window.scrollY > 20);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}