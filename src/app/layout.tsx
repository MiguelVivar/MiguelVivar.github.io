import "./globals.css";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Miguel Vivar Portfolio',
  description: 'Portfolio personal de Miguel Vivar, desarrollador Full Stack',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-neutral-900 text-white min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
