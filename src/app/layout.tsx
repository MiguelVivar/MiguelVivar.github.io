import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import TerminalProvider from '@/components/terminal/TerminalContext';
import Terminal from '@/components/terminal/Terminal';
import TerminalButton from '@/components/terminal/TerminalButton';

export const metadata: Metadata = {
  title: 'Miguel Vivar - Desarrollador Web',
  description: 'Miguel Vivar - Desarrollador Full Stack especializado en crear aplicaciones web modernas y eficientes.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const frases = [
    "El código es poesía escrita con lógica, creatividad y pasión.",
    "La programación es el arte de crear soluciones a problemas complejos.",
    "La programación es el lenguaje que nos permite comunicarnos con la máquina."
  ];

  return (
    <html lang="es" className="hydrated">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body>
        <TerminalProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer frases={frases} />
          <TerminalButton />
          <Terminal />
          <script dangerouslySetInnerHTML={{
            __html: `
              // Control del scroll del body cuando el menú está abierto
              document.addEventListener('menu-toggle', (e) => {
                if (e.detail.isOpen) {
                  document.body.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'unset';
                }
              });
            `
          }} />
        </TerminalProvider>
      </body>
    </html>
  );
}
