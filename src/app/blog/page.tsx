import React from 'react';
import Blog from '@/ui/blog/Blog';
import { getAllPosts } from '@/utils/markdown';

export const metadata = {
  title: 'Blog | Miguel Vivar',
  description: 'Artículos sobre desarrollo web, tecnología y programación',
};

export default function BlogPage() {
  const posts = getAllPosts();
  
  // Extraer categorías únicas
  const categories = [{
    id: 'todos',
    nombre: 'Todos', 
    icono: 'FaLightbulb'
  }];

  const categorySet = new Set();
  posts.forEach((post) => {
    if (!categorySet.has(post.category)) {
      categorySet.add(post.category);
      categories.push({
        id: post.category,
        nombre: post.category,
        icono: getCategoryIcon(post.category)
      });
    }
  });

  // Función para asignar iconos a categorías
  function getCategoryIcon(category: string) {
    const iconMapping: Record<string, string> = {
      "Desarrollo Web": "FaCode",
      "Desarrollo Frontend": "FaLaptopCode",
      "Desarrollo Backend": "FaServer",
      "Desarrollo Full Stack": "FaDesktop",
      "Desarrollo Móvil": "FaMobileAlt",
      "Desarrollo de Juegos": "FaGamepad",
      "Desarrollo de Software": "FaCogs",
      "Desarrollo de Aplicaciones": "FaAppStore",
      "Desarrollo de APIs": "FaProjectDiagram",
      "Desarrollo de Microservicios": "FaMicrochip",
      "Desarrollo de Sistemas": "FaDatabase",
      "Universidad": "FaGraduationCap",
      "Programación": "FaCodeBranch",
      "Algoritmos": "FaPuzzlePiece",
      "Estructuras de Datos": "FaThList",
      "Patrones de Diseño": "FaShapes",
      "Metodologías Ágiles": "FaTrello",
      "Eventos": "FaCalendarAlt",
      "Conferencias": "FaUsers",
      "Charlas": "FaComments",
      "Talleres": "FaChalkboardTeacher",
      "Cursos": "FaBook",
      "Tutoriales": "FaBookOpen",
      "Recursos": "FaBookReader",
      "Libros": "FaBook",
      "Artículos": "FaNewspaper",
      "Blogs": "FaBlogger",
      "Documentación": "FaFileAlt",
      "Rendimiento Web": "FaTools",
      "Inteligencia Artificial": "FaBrain",
    };
    
    return iconMapping[category] || "FaLightbulb";
  }

  // Extraer tags únicos
  const allTags = posts.flatMap((post) => post.tags || []);
  const uniqueTags = [...new Set(allTags)];

  // Format posts for the Blog component
  const formattedPosts = posts.map(post => ({
    slug: post.slug,
    data: {
      id: post.id || 0,
      title: post.title,
      date: post.date,
      summary: post.summary,
      image: post.image,
      category: post.category,
      tags: post.tags || []
    }
  }));

  return (
    <Blog 
      posts={formattedPosts}
      categories={categories}
      tags={uniqueTags}
    />
  );
}