import PROYECTO1AVIF from '../assets/proyecto1.avif';
import PROYECTO1WEBP from '../assets/proyecto1.webp';
import PROYECTO1PNG from '../assets/proyecto1.png';
import PROYECTO2AVIF from '../assets/proyecto2.avif';
import PROYECTO2WEBP from '../assets/proyecto2.webp';
import PROYECTO2PNG from '../assets/proyecto2.png';
import PROYECTO3AVIF from '../assets/proyecto3.avif';
import PROYECTO3WEBP from '../assets/proyecto3.webp';
import PROYECTO3PNG from '../assets/proyecto3.png';
import PROYECTO4AVIF from '../assets/proyecto4.avif';
import PROYECTO4WEBP from '../assets/proyecto4.webp';
import PROYECTO4PNG from '../assets/proyecto4.png';
import PROYECTO5AVIF from '../assets/proyecto5.avif';
import PROYECTO5WEBP from '../assets/proyecto5.webp';
import PROYECTO5PNG from '../assets/proyecto5.png';
import PROYECTO6AVIF from '../assets/proyecto6.avif';
import PROYECTO6WEBP from '../assets/proyecto6.webp';
import PROYECTO6PNG from '../assets/proyecto6.png';

function Proyectos() {
    const proyectos = [
        {
            titulo: "Portafolio Personal",
            descripcion: "Un portafolio moderno para mostrar mis habilidades y proyectos.",
            tecnologias: ["React", "Bulma", "JavaScript"],
            imagenavif: PROYECTO1AVIF,
            imagenwebp: PROYECTO1WEBP,
            imagenpng: PROYECTO1PNG,
            demo: "https://miguelvivar.github.io/",
            codigo: "https://github.com/MiguelVivar/MiguelVivar.github.io",
        },
        {
            titulo: "Administrador de Veterinaria",
            descripcion: "Un sistema de administración de una veterinaria con autenticación de usuarios.",
            tecnologias: ["React", "TailwindCSS", "NodeJS", "Express", "MongoDB", "Mongoose", "JWT"],
            imagenavif: PROYECTO2AVIF,
            imagenwebp: PROYECTO2WEBP,
            imagenpng: PROYECTO2PNG,
            demo: "https://miguelvivar.github.io/",
            codigo: "https://github.com/MiguelVivar/MiguelVivar.github.io",
        },
        {
            titulo: "Agencia de Viajes",
            descripcion: "Un sitio web para una agencia de viajes con un diseño moderno y responsivo.",
            tecnologias: ["NodeJS", "Boostrap", "MySQL", "Heroku", "Pug"],
            imagenavif: PROYECTO3AVIF,
            imagenwebp: PROYECTO3WEBP,
            imagenpng: PROYECTO3PNG,
            demo: "https://miguelvivar.github.io/",
            codigo: "https://github.com/MiguelVivar/MiguelVivar.github.io",
        },
        {
            titulo: "CRM de Clientes",
            descripcion: "Un sistema de CRM para administrar clientes y sus pedidos.",
            tecnologias: ["HTML", "TailwindCSS", "JavaScript"],
            imagenavif: PROYECTO4AVIF,
            imagenwebp: PROYECTO4WEBP,
            imagenpng: PROYECTO4PNG,
            demo: "https://miguelvivar.github.io/",
            codigo: "https://github.com/MiguelVivar/MiguelVivar.github.io",
        },
        {
            titulo: "Tienda Online",
            descripcion: "Una tienda online con carrito de compras.",
            tecnologias: ["HTML", "CSS", "JavaScript"],
            imagenavif: PROYECTO5AVIF,
            imagenwebp: PROYECTO5WEBP,
            imagenpng: PROYECTO5PNG,
            demo: "https://miguelvivar.github.io/",
            codigo: "https://github.com/MiguelVivar/MiguelVivar.github.io",
        },
        {
            titulo: "La Cafetería",
            descripcion: "Un sitio web para una cafetería con un diseño moderno y responsivo.",
            tecnologias: ["HTML", "CSS", "SCSS", "JavaScript", "Gulp"],
            imagenavif: PROYECTO6AVIF,
            imagenwebp: PROYECTO6WEBP,
            imagenpng: PROYECTO6PNG,
            demo: "https://miguelvivar.github.io/",
            codigo: "https://github.com/MiguelVivar/MiguelVivar.github.io",
        },
    ];

    return (
        <section className="container section mt-6" id='proyectos'>
            <h1 className="title has-text-centered is-2 mt-6">Mis Proyectos 💡</h1>
            <p className="subtitle is-4 has-text-centered">Explora algunos de los trabajos que he realizado.</p>

            <div className="columns is-multiline">
                {proyectos.map((proyecto, index) => (
                    <div className="column is-one-third" key={index}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-16by9">
                                    <source srcSet={proyecto.imagenavif} type="image/avif" />
                                    <source srcSet={proyecto.imagenwebp} type="image/webp" />
                                    <img loading="lazy" src={proyecto.imagenpng} alt={proyecto.titulo} width="100" height="100"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <p className="title is-4">{proyecto.titulo}</p>
                                <p className="content is-size-5">{proyecto.descripcion}</p>
                                <div className="tags">
                                    {proyecto.tecnologias.map((tecnologia, i) => (
                                        <span className="tag is-dark" key={i}>
                                            {tecnologia}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a href={proyecto.demo} className="card-footer-item button is-primary" target="_blank" rel="noopener noreferrer">
                                    Ver Proyecto
                                </a>
                                <a href={proyecto.codigo} className="card-footer-item button" target="_blank" rel="noopener noreferrer">
                                    Ver Código
                                </a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
    </section>
    )
}

export default Proyectos