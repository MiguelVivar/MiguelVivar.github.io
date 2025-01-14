import FrontEnd from './FrontEnd'
import BackEnd from './BackEnd'
import BasesDatos from './BasesDatos'
import LenguajesProgamacion from './LenguajesProgamacion'
import Software from './Software'
import Herramientas from './Herramientas'

function Habilidades() {
    return (
        <section className="container section" id="habilidades">
            <h2 className="title is-2 has-text-centered mt-6">Mis Habilidades 🚀</h2>
            <div className="columns">
                <div className="column">
                    <FrontEnd/>
                </div>
                <div className="column">
                    <BackEnd/>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <BasesDatos/>
                </div>
                <div className="column">
                    <LenguajesProgamacion/>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <Software/>
                </div>
                <div className="column">
                    <Herramientas/>
                </div>
            </div>
        </section>
    )
}

export default Habilidades