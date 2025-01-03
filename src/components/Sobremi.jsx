function Sobremi() {
    return (
        <section className="container section grid has-2-cols is-flex-touch is-flex-direction-column is-align-items-center" id="sobre_mi">
            <div className="column is-flex is-flex-direction-column is-justify-content-center mt-4">
                <h2 className="title is-2 has-text-centered">Sobre Mí 👾</h2>
                <p>
                    Hola, soy Miguel Vivar, un apasionado por la tecnología y la programación. Soy un Desarrollador <strong>Web Full Stack</strong>.
                </p>
                <p>
                    Me gusta aprender cosas nuevas y compartir conocimientos. Siempre estoy en constante aprendizaje, me gusta la tecnología y la programación.
                </p>
            </div>
            <div>
                <h2 className="title is-2 has-text-centered">Links 🌐</h2>
                <div className="buttons is-flex is-justify-content-center mt-5">
                    <a className="button is-large" href="https://github.com/MiguelVivar" target="_blank">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg> 
                        </span>
                        <span>GitHub</span>
                    </a>
                    <a className="button is-large" href="https://www.linkedin.com/in/miguel-vivar-farf%C3%A1n-116058305/" target="_blank">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokelinecap="round" strokelinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M8 11l0 5"></path> <path d="M8 8l0 .01"></path> <path d="M12 16l0 -5"></path> <path d="M16 16v-3a2 2 0 0 0 -4 0"></path> </svg> 
                        </span>
                        <span>LinkedIn</span>
                    </a>
                    <a class="button is-large" href="https://www.instagram.com/mvivarf/" target="_blank">
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" x-bind:width="size" x-bind:height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" x-bind:stroke-width="stroke" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                <path d="M16.5 7.5l0 .01"></path>
                            </svg>
                        </span>
                        <span>Instagram</span>
                    </a>
                    <a className="button is-large is-primary" href="build/CV.pdf" target="_blank">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokelinecap="round" strokelinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <path d="M7 11l5 5l5 -5"></path> <path d="M12 4l0 12"></path> </svg> 
                        </span>
                        <span>Descargar CV</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Sobremi