import React from 'react';
import Blog from '@/ui/blog/Blog';
import { getAllPosts } from '@/utils/markdown';

// Definir el tipo correcto que devuelve getAllPosts basado en su implementación
interface PostFromMarkdown {
  slug: string;
  id?: number;
  title: string;
  date: string;
  summary?: string;
  image?: string;
  category?: string;
  tags?: string[];
  iconos?: Array<{ nombre: string; icon: string }>;
  [key: string]: unknown; // Usar unknown en lugar de any es más seguro
}

// Interfaces para el componente Blog
interface PostData {
  id: number;
  title: string;
  date: string;
  summary: string;
  image: string;
  category: string;
  tags: string[];
  iconos?: Array<{ nombre: string; icon: string }>;
}

interface BlogPost {
  slug: string;
  content: string;
  data: PostData;
}

export const metadata = {
  title: 'Blog | Miguel Vivar',
  description: 'Artículos sobre desarrollo web, tecnología y programación',
};

export default function BlogPage() {
  // Obtener los posts y hacer cast al tipo correcto
  const posts = getAllPosts() as PostFromMarkdown[];
  
  // Extraer categorías únicas
  const categories = [{
    id: 'todos',
    nombre: 'Todos', 
    icono: 'FaLightbulb'
  }];

  const categorySet = new Set<string>();
  posts.forEach((post) => {
    if (post.category && !categorySet.has(post.category)) {
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
      // Mantener el resto de los iconos...
    };
    
    return iconMapping[category] || "FaLightbulb";
  }

  // Extraer tags únicos
  const allTags = posts.flatMap((post) => post.tags || []);
  const uniqueTags = [...new Set(allTags)];

  // Formatear posts para el componente Blog
  const formattedPosts = posts.map(post => ({
    slug: post.slug,
    content: '', // Añadimos content vacío ya que es requerido por el componente
    data: {
      id: post.id || 0,
      title: post.title,
      date: post.date,
      summary: post.summary || '',
      image: post.image || '',
      category: post.category || '',
      tags: post.tags || [],
      iconos: post.iconos
    }
  }));

  return (
    <Blog 
      posts={formattedPosts as unknown as BlogPost[]}
      categories={categories}
      tags={uniqueTags}
    />
  );
}