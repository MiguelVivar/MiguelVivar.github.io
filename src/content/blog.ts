// Utility functions for accessing blog content
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  content: string;
  data: {
    id: number;
    title: string;
    date: string;
    summary: string;
    image: string;
    category: string;
    tags: string[];
    draft?: boolean;
    iconos?: {
      nombre: string;
      icon: string;
    }[];
  };
}

// Helper to read markdown files from the filesystem
const readMarkdownFiles = async (): Promise<BlogPost[]> => {
  const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
  
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Blog directory not found at: ${postsDirectory}`);
      return [];
    }

    // Get all markdown files
    const filenames = fs.readdirSync(postsDirectory);
    const markdownFiles = filenames.filter(file => file.endsWith('.md'));
    
    if (markdownFiles.length === 0) {
      console.warn('No markdown files found in blog directory');
    }
    
    // Process each markdown file
    const posts = markdownFiles.map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter and content
      const { data, content } = matter(fileContent);
      
      // Create slug from filename (remove .md extension)
      const slug = filename.replace(/\.md$/, '');
      
      return {
        slug,
        content,
        data: {
          id: data.id || 0,
          title: data.title || 'Untitled Post',
          date: data.date || new Date().toISOString(),
          summary: data.summary || '',
          image: data.image || '',
          category: data.category || 'Uncategorized',
          tags: data.tags || [],
          draft: data.draft || false,
          iconos: data.iconos || []
        }
      };
    });
    
    // Filter out draft posts in production
    return process.env.NODE_ENV === 'production'
      ? posts.filter(post => !post.data.draft)
      : posts;
      
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
};

// Get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Try to read from markdown files
  try {
    const posts = await readMarkdownFiles();
    
    // If we have posts from files, return them
    if (posts.length > 0) {
      return posts;
    }
  } catch (error) {
    console.error('Failed to read markdown files, falling back to mock data:', error);
  }
  
  // Fallback to mock data if reading files fails
  return [
    {
      slug: 'como-construi-mi-portfolio-con-astro-y-react',
      content: `
# Cómo construí mi portfolio con Next.js y React

En este artículo explicaré el proceso que seguí para construir mi portfolio personal usando Next.js y React.

## Por qué elegí Next.js y React

Next.js ofrece una experiencia de desarrollo excepcional con características como renderizado híbrido, optimización automática de imágenes y soporte para TypeScript.

## Arquitectura del proyecto

- **Next.js**: Framework de React para producción
- **TypeScript**: Para tipado estático
- **Tailwind CSS**: Para estilizado rápido y responsive
- **Framer Motion**: Para animaciones fluidas

## El proceso de desarrollo

El primer paso fue diseñar la estructura del sitio. Decidí incluir secciones como:

1. Página principal con introducción
2. Sección de proyectos destacados
3. Página de habilidades
4. Blog para compartir conocimientos
5. Formulario de contacto

## Optimizaciones clave

- Optimización de imágenes con next/image
- Carga diferida de componentes pesados
- Uso de Incremental Static Regeneration para blog posts

## Conclusión

Construir mi portfolio con Next.js y React ha sido una excelente decisión que me permitió crear un sitio rápido, optimizado y fácil de mantener.
      `,
      data: {
        id: 1,
        title: 'Cómo construí mi portfolio con Next.js y React',
        date: '2024-04-15',
        summary: 'Un análisis detallado del proceso de construcción de mi portfolio personal utilizando Next.js y React.',
        image: '/blog/portfolio-nextjs.jpg',
        category: 'Desarrollo Web',
        tags: ['Next.js', 'React', 'Portfolio', 'TypeScript', 'Tailwind'],
        iconos: [
          { nombre: 'React', icon: 'FaReact' },
          { nombre: 'Next.js', icon: 'SiNextdotjs' },
          { nombre: 'TypeScript', icon: 'SiTypescript' },
          { nombre: 'Tailwind CSS', icon: 'SiTailwindcss' }
        ]
      }
    }
  ];
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}