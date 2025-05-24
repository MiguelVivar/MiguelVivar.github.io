import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Miguel Vivar - Artículos de Desarrollo',
  description: 'Artículos técnicos sobre desarrollo web, tutoriales y mejores prácticas.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">
          Blog de <span className="text-emerald-400">Desarrollo</span>
        </h1>
        
        <div className="grid gap-8">
          {/* Aquí irían tus artículos */}
          <article className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Optimizando Performance en React Apps
            </h2>
            <p className="text-gray-300 mb-4">
              Técnicas avanzadas para mejorar el rendimiento de aplicaciones React...
            </p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>15 de Enero, 2024</span>
              <span>5 min de lectura</span>
            </div>
          </article>
          
          {/* Mensaje de próximamente */}
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-white mb-4">
              🚧 Sección en construcción
            </h3>
            <p className="text-gray-400">
              Próximamente compartiré artículos técnicos y tutoriales sobre desarrollo web.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
