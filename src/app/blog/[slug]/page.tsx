import React from 'react';
import { notFound } from 'next/navigation';
import ArticleDetail from '../../../ui/blog/ArticleDetail';
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3, FaSass, FaBootstrap, 
  FaGithub, FaFigma, FaJava, FaPython, FaPhp, FaLayerGroup,
  FaServer, FaCode
} from 'react-icons/fa';
import { 
  SiJavascript, SiNextdotjs, SiTailwindcss, SiTypescript, 
  SiFramer, SiExpress, SiMongodb, SiJest, SiBulma, SiVite, 
  SiGit, SiCypress, SiPostman, SiMysql, SiPostgresql, SiAstro 
} from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";

// Import our new markdown utilities
import { getAllPostSlugs, getPostData } from '@/utils/markdown';

// Create icon elements rather than returning components
const IconFactory = (iconName: string) => {
  const iconMap = {
    'FaReact': <FaReact />,
    'FaNodeJs': <FaNodeJs />,
    'FaHtml5': <FaHtml5 />,
    'FaCss3': <FaCss3 />,
    'FaSass': <FaSass />,
    'FaBootstrap': <FaBootstrap />,
    'FaGithub': <FaGithub />,
    'FaFigma': <FaFigma />,
    'FaJava': <FaJava />,
    'FaPython': <FaPython />,
    'FaPhp': <FaPhp />,
    'FaLayerGroup': <FaLayerGroup />,
    'FaServer': <FaServer />,
    'FaCode': <FaCode />,
    
    'SiJavascript': <SiJavascript />,
    'SiNextdotjs': <SiNextdotjs />,
    'SiTailwindcss': <SiTailwindcss />,
    'SiTypescript': <SiTypescript />,
    'SiFramer': <SiFramer />,
    'SiExpress': <SiExpress />,
    'SiMongodb': <SiMongodb />,
    'SiJest': <SiJest />,
    'SiBulma': <SiBulma />,
    'SiVite': <SiVite />,
    'SiGit': <SiGit />,
    'SiCypress': <SiCypress />,
    'SiPostman': <SiPostman />,
    'SiMysql': <SiMysql />,
    'SiPostgresql': <SiPostgresql />,
    'SiAstro': <SiAstro />,
    
    'TbBrandCSharp': <TbBrandCSharp />
  };

  if (iconName && iconMap[iconName as keyof typeof iconMap]) {
    return iconMap[iconName as keyof typeof iconMap];
  }
  return null;
};

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostData(params.slug);
    
    return {
      title: `${post.title} | Miguel Vivar Blog`,
      description: post.summary || '',
      openGraph: {
        title: post.title,
        description: post.summary,
        image: post.image,
        type: 'article'
      }
    };
  } catch (error) {
    return {
      title: 'Post Not Found | Miguel Vivar Blog'
    };
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  
  return posts.map((post) => ({
    slug: post.params.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    // Get processed post data with HTML content
    const entrada = await getPostData(params.slug);
    
    // Get all posts for navigation and related articles
    const allPosts = getAllPostSlugs().map(post => post.params.slug);
    const postsData = await Promise.all(
      allPosts.map(async (slug) => await getPostData(slug))
    );
    
    // Sort posts by date for previous/next navigation
    const sorted = [...postsData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const currentIndex = sorted.findIndex(item => item.slug === entrada.slug);
    
    const prevArticulo = currentIndex < sorted.length - 1 ? {
      titulo: sorted[currentIndex + 1].title,
      slug: sorted[currentIndex + 1].slug
    } : null;
    
    const nextArticulo = currentIndex > 0 ? {
      titulo: sorted[currentIndex - 1].title,
      slug: sorted[currentIndex - 1].slug
    } : null;
    
    // Find related articles (same category or shared tags)
    const relacionados = sorted
      .filter(item => 
        item.slug !== entrada.slug && 
        (item.category === entrada.category || 
          (item.tags && entrada.tags && 
          item.tags.some(tag => entrada.tags.includes(tag))))
      ) 
      .slice(0, 3)
      .map(item => ({
        id: item.id || 0,
        titulo: item.title,
        slug: item.slug,
        fecha: item.date,
        imagen: item.image,
        categoria: item.category
      }));
    
    // Estimate reading time (approx. 225 words per minute)
    const estimateReadingTime = (content: string) => {
      const words = content.split(/\s+/).length;
      return Math.ceil(words / 225);
    };
    
    const tiempoLectura = estimateReadingTime(entrada.contentHtml || '');
    
    // Create article object with the format expected by ArticleDetail
    const articulo = {
      id: entrada.id || 0,
      titulo: entrada.title,
      slug: entrada.slug,
      fecha: entrada.date,
      resumen: entrada.summary,
      imagen: entrada.image,
      categoria: entrada.category,
      tags: entrada.tags || [],
      tiempoLectura,
      iconos: entrada.iconos ? entrada.iconos.map((tech: { nombre: string; icon: string; }) => ({
        nombre: tech.nombre,
        icono: tech.icon ? IconFactory(tech.icon) : null
      })).filter((icon: any) => icon.icono !== null) : [],
      contenido: entrada.contentHtml
    };
  
    return (
      <ArticleDetail
        articulo={articulo}
        prevArticulo={prevArticulo}
        nextArticulo={nextArticulo}
        relacionados={relacionados}
      />
    );
  } catch (error) {
    notFound();
  }
}