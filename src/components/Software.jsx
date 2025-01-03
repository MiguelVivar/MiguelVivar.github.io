import FIGMA from '../assets/figma.svg'
import VSCODE from '../assets/vscode.svg'

function Software() {
    const technologies = [
        { src: FIGMA, alt: 'Figma', title: 'Figma' },
        { src: VSCODE, alt: 'VSCode', title: 'VSCode' },
    ];

    return (
        <>
            <h3 className="title is-3 has-text-centered">Software</h3>
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

export default Software