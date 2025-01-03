import NODE from '../assets/node.svg'
import EXPRESS from '../assets/express.svg'

export default function BackEnd() {
    const technologies = [
        { src: NODE, alt: 'NodeJS', title: 'NodeJS' },
        { src: EXPRESS, alt: 'Express', title: 'Express' },

    ];

    return (
        <>
            <h3 className="title is-3 has-text-centered">Backend</h3>
            <div className="is-flex-tablet is-justify-content-center is-align-items-center">
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
