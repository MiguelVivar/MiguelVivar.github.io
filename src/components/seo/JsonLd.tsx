interface JsonLdProps {
  data: object
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Miguel Vivar",
  "alternateName": "Miguel Vivar Farfán",
  "jobTitle": "Desarrollador Full Stack",
  "description": "Desarrollador Full Stack especializado en crear aplicaciones web modernas con React, Next.js, TypeScript y Node.js",
  "url": "https://miguelvivar.github.io",
  "image": "https://miguelvivar.github.io/perfil.png",
  "email": "miguelvivarfarfan@gmail.com",
  "sameAs": [
    "https://www.linkedin.com/in/miguel-vivar-farfan/",
    "https://github.com/MiguelVivar",
    "https://www.instagram.com/mvivarf/"
  ],
  "knowsAbout": [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "MongoDB",
    "MySQL",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Desarrollador Full Stack",
    "description": "Desarrollo de aplicaciones web completas usando tecnologías modernas"
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Miguel Vivar Portfolio",
  "description": "Portafolio profesional de Miguel Vivar, desarrollador Full Stack",
  "url": "https://miguelvivar.github.io",
  "author": {
    "@type": "Person",
    "name": "Miguel Vivar"
  },
  "inLanguage": "es-ES",
  "copyrightYear": new Date().getFullYear(),
  "genre": "Portfolio"
}
