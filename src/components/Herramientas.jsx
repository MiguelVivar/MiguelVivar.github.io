import JEST from '../assets/jest.svg'
import CYPRESS from '../assets/cypress.svg'
import GIT from '../assets/git.svg'
import POSTMAN from '../assets/postman.svg'

function Herramientas() {
    const technologies = [
            { src: JEST, alt: 'Jest', title: 'Jest' },
            { src: CYPRESS, alt: 'Cypress', title: 'Cypress' },
            { src: GIT, alt: 'Git', title: 'Git' },
            { src: POSTMAN, alt: 'Postman', title: 'Postman' }
    ];

    return (
        <>
            <h3 className="title is-3 has-text-centered">Herramientas</h3>
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

export default Herramientas