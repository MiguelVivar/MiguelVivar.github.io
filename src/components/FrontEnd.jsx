import HTML5 from '../assets/html.svg';
import CSS3 from '../assets/css.svg';
import JS from '../assets/javascript.svg';
import SASS from '../assets/sass.svg';
import BOOTSTRAP from '../assets/bootstrap.svg';
import BULMA from '../assets/bulma.svg';
import TAILWIND from '../assets/tailwindcss.svg';
import JQUERY from '../assets/jquery.svg';
import VITE from '../assets/vite.svg';
import REACT from '../assets/react.svg';

const technologies = [
    { src: HTML5, alt: 'HTML5', title: 'HTML5' },
    { src: CSS3, alt: 'CSS3', title: 'CSS3' },
    { src: JS, alt: 'Javascript', title: 'Javascript' },
    { src: SASS, alt: 'Sass', title: 'Sass' },
    { src: BOOTSTRAP, alt: 'Bootstrap', title: 'Bootstrap' },
    { src: BULMA, alt: 'Bulma', title: 'Bulma' },
    { src: TAILWIND, alt: 'Tailwind', title: 'Tailwind' },
    { src: JQUERY, alt: 'JQuery', title: 'JQuery' },
    { src: VITE, alt: 'Vite', title: 'Vite' },
    { src: REACT, alt: 'React', title: 'React' },
];

function FrontEnd() {
    return (
        <>
            <h3 className="title is-3 has-text-centered">Frontend</h3>
            <div className="grid is-flex-mobile is-flex-direction-column">
                {technologies.map((tech, index) => (
                    <div key={index} className="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mb-5">
                        <img src={tech.src} alt={tech.alt} width="100" height="100" className='icono-habilidad'/>
                        <h4 className="title is-4 has-text-centered">{tech.title}</h4>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FrontEnd;
