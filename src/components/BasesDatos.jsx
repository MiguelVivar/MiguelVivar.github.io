import MONGODB from '../assets/mongo.svg'
import MYSQL from '../assets/mysql.svg'
import HEROKU from '../assets/heroku.svg'

function BasesDatos() {
    const technologies = [
        { src: MONGODB, alt: 'MongoDB', title: 'MongoDB' },
        { src: MYSQL, alt: 'MySQL', title: 'MySQL' },
        { src: HEROKU, alt: 'Heroku', title: 'Heroku' },
    ];

    return (
        <>
            <h3 className="title is-3 has-text-centered">Bases de Datos</h3>
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

export default BasesDatos