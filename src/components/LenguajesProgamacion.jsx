import PYTHON from '../assets/python.svg'
import JAVA from '../assets/java.svg'
import CSHARP from '../assets/csharp.svg'

function LenguajesProgamacion() {
    const technologies = [
        { src: PYTHON, alt: 'Python', title: 'Python' },
        { src: JAVA, alt: 'Java', title: 'Java' },
        { src: CSHARP, alt: 'C#', title: 'C#' },
    ];

    return (
        <>
            <h3 className="title is-3 has-text-centered">Lenguajes de Programación</h3>
            <div className="grid is-flex-mobile is-flex-direction-column">
                {technologies.map((tech, index) => (
                    <div key={index} className="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mb-5 mx-5">
                        <img src={tech.src} alt={tech.alt} width="100" height="100" className='icono-habilidad'/>
                        <h4 className="title is-4 has-text-centered">{tech.title}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LenguajesProgamacion