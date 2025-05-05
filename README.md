# Miguel Vivar - Portfolio Personal

<div align="center">

![Portfolio Preview](/public/portafolio.png)

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

</div>

## 📋 Descripción

Este es mi portafolio personal desarrollado con tecnologías modernas para mostrar mis proyectos, habilidades y experiencia como desarrollador web. El sitio cuenta con animaciones fluidas, diseño responsivo y una interfaz de usuario atractiva que refleja mi estilo y profesionalismo.

## 🌐 Demostración

Visita mi portfolio en vivo: [miguelvivar.github.io](https://miguelvivar.github.io)

## ✨ Características Principales

- **Diseño Moderno y Responsivo**: Adaptado a todo tipo de dispositivos, desde móviles hasta pantallas de escritorio
- **Animaciones Fluidas**: Implementadas con Framer Motion para una experiencia de usuario dinámica
- **Blog Integrado**: Sistema de contenidos con markdown para publicar y compartir artículos
- **Modo Oscuro/Claro**: Cambio de tema adaptado a las preferencias del usuario
- **Sección de Spotify**: Muestra en tiempo real lo que estoy escuchando mediante integración con la API de Spotify
- **Formulario de Contacto**: Permite a los visitantes enviar mensajes directamente desde la web
- **Optimización SEO**: Estructura y metadatos optimizados para motores de búsqueda
- **Rendimiento Optimizado**: Carga rápida y experiencia fluida gracias a Next.js y Turbopack
- **Enlaces a Redes Sociales**: Conexión directa con mis perfiles profesionales

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.2**: Framework de React con renderizado del lado del servidor y App Router
- **React 19**: Biblioteca para construir interfaces de usuario con los últimos hooks
- **TypeScript 5**: Tipado estático para JavaScript para código más robusto
- **Tailwind CSS 4**: Framework de CSS utilitario para diseño responsivo
- **Framer Motion 12**: Biblioteca para animaciones avanzadas y transiciones fluidas

### Contenido y Datos
- **Gray Matter**: Parser de frontmatter para archivos Markdown
- **Remark/Remark-HTML**: Procesador de Markdown para el blog
- **Nanostores**: Gestión de estado ligera y reactiva
- **Date-fns**: Manipulación de fechas para el blog y contenidos dinámicos

### Estilo y UI
- **Heroicons**: Iconos SVG de alta calidad
- **React Icons**: Amplia colección de iconos para la interfaz
- **Canvas Confetti**: Efectos visuales para interacciones especiales

### Herramientas de Desarrollo
- **ESLint 9**: Analizador de código estático
- **Turbopack**: Bundler ultrarrápido para desarrollo local

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/MiguelVivar/MiguelVivar.github.io.git
cd MiguelVivar.github.io
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**

```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

## 📁 Estructura del Proyecto

```
/public            # Imágenes y archivos estáticos
  /logo.svg        # Logo del sitio
  /perfil.png      # Imagen de perfil
  /portafolio.png  # Captura del portfolio
  /blog1.png       # Imagen del blog

/src
  /app             # Páginas de la aplicación (Next.js App Router)
    /api           # API routes (Spotify, etc.)
    /blog          # Blog y artículos
    /contacto      # Página de contacto
    /habilidades   # Página de habilidades
    /proyectos     # Página de proyectos
    /sobremi       # Página sobre mí
    /layout.tsx    # Layout principal
    /page.tsx      # Página de inicio

  /components      # Componentes reutilizables
    /navbar        # Navegación y menús
    /footer        # Pie de página
    /AnimateBackground.tsx # Animaciones de fondo
    /CallToAction.tsx # Componentes de llamada a la acción
    /SpotifyNowPlaying.tsx # Widget de Spotify

  /content         # Datos estructurados en Markdown
    /blog          # Artículos del blog en formato MD
    /blog.ts       # Configuración y utilidades del blog

  /data            # Datos estructurados
    /proyectos.tsx # Información de proyectos
    /habilidades.tsx # Lista de habilidades
    /sobremi.tsx   # Información personal
    /redes.tsx     # Enlaces a redes sociales

  /hooks           # Custom hooks
    /useLocalStorage.ts # Persistencia en localStorage
    /useTypewriter.ts   # Efecto de escritura automática

  /ui              # Componentes específicos por sección
    /blog          # Componentes para el blog 
    /contacto      # Componentes de la página de contacto
    /error404      # Página de error personalizada
    /habilidades   # Componentes de la página de habilidades
    /proyectos     # Componentes de la página de proyectos
    /sobremi       # Componentes de la página sobre mí

  /utils           # Utilidades y funciones auxiliares
    /markdown.ts   # Procesamiento de archivos markdown
```

## 📱 Secciones Principales

- **Inicio**: Presentación personal y resumen profesional con animaciones atractivas
- **Sobre Mí**: Información detallada sobre mi trayectoria, formación y valores profesionales
- **Habilidades**: Tecnologías y herramientas que domino, organizadas por categorías y nivel de experiencia
- **Proyectos**: Portafolio de trabajos destacados con descripciones, tecnologías utilizadas y enlaces
- **Blog**: Artículos sobre desarrollo, tecnología y experiencias profesionales
- **Contacto**: Formulario de contacto y enlaces directos a redes sociales y correo electrónico

## 🔧 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con Turbopack para un desarrollo más rápido
- `npm run build`: Construye la aplicación para producción optimizando todos los recursos
- `npm run start`: Inicia la aplicación en modo producción después de construirla
- `npm run lint`: Ejecuta el linter para verificar y corregir problemas en el código

## 📝 Blog y Sistema de Contenidos

El portfolio incluye un sistema de blog completo con:

- Artículos escritos en Markdown para fácil mantenimiento
- Sintaxis highlighting para fragmentos de código
- Tiempo estimado de lectura
- Compartir en redes sociales
- Categorías y etiquetas
- Artículos relacionados
- Barra de progreso de lectura

## 🌓 Temas Claro y Oscuro

El sitio ofrece dos temas visuales que se adaptan automáticamente a las preferencias del sistema del usuario o pueden cambiarse manualmente:

- Tema claro con tonos suaves para ambientes luminosos
- Tema oscuro con contraste optimizado para uso nocturno
- Transiciones suaves entre ambos modos

## 📱 Responsive Design

Diseño completamente adaptativo para todos los dispositivos:

- Mobile-first approach
- Breakpoints estratégicos para tablets y dispositivos móviles
- Menú hamburguesa para navegación en dispositivos pequeños
- Optimización de imágenes según el dispositivo

## 📞 Contacto

- **Email**: [miguelvivarfarfan@gmail.com](mailto:miguelvivarfarfan@gmail.com)
- **LinkedIn**: [Miguel Vivar Farfan](https://www.linkedin.com/in/miguel-vivar-farfan/)
- **GitHub**: [@MiguelVivar](https://github.com/MiguelVivar)
- **Instagram**: [@mvivarf](https://www.instagram.com/mvivarf/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

⭐️ **Desarrollado con ❤️ por Miguel Vivar** ⭐️

</div>
