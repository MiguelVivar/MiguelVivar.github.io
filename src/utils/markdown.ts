import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Interfaces para tipado
interface PostFrontMatter {
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  tags?: string[];
  [key: string]: string | string[] | undefined; // Tipos más específicos para propiedades adicionales
}

interface Post extends PostFrontMatter {
  slug: string;
}

interface PostWithContent extends Post {
  contentHtml: string;
}

// Directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Get all blog posts metadata
 */
export function getAllPosts(): Post[] {
  // Get all file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data: frontMatter } = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      ...(frontMatter as PostFrontMatter),
    } as Post;
  });

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get data for a specific post by slug
 */
export async function getPostData(slug: string): Promise<PostWithContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data: frontMatter, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Set sanitize to false to allow HTML in markdown
    .process(content);
  
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...(frontMatter as PostFrontMatter),
  } as PostWithContent;
}

/**
 * Get all post slugs
 */
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}