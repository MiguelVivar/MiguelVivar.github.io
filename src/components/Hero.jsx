import Miguel_VivarPNG from "../assets/Miguel_Vivar.png";
import Miguel_VivarWEBP from "../assets/Miguel_Vivar.webp";
import Miguel_VivarAVIF from "../assets/Miguel_Vivar.avif";
import { useEffect, useState } from "react";
import { useMemo } from "react";

function Hero() {
    const dynamicPhrases = useMemo(() => ["Full-Stack", "Front-End", "Back-End", "de Software"], []);
    const [dynamicText, setDynamicText] = useState("");
    const [dynamicIndex, setDynamicIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeEffect = () => {
        const currentDynamic = dynamicPhrases[dynamicIndex];

        if (!isDeleting && charIndex < currentDynamic.length) {
            // Escribir un carácter
            setCharIndex((prev) => prev + 1);
            setDynamicText(currentDynamic.slice(0, charIndex + 1));
        } else if (isDeleting && charIndex > 0) {
            // Borrar un carácter
            setCharIndex((prev) => prev - 1);
            setDynamicText(currentDynamic.slice(0, charIndex - 1));
        } else if (!isDeleting && charIndex === currentDynamic.length) {
            // Pausa antes de borrar
            setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && charIndex === 0) {
            // Cambiar frase
            setIsDeleting(false);
            setDynamicIndex((prev) => (prev + 1) % dynamicPhrases.length);
        }
        };

        const timer = setTimeout(typeEffect, isDeleting ? 50 : 100);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, dynamicIndex, dynamicPhrases]);

    return (
        <section className="container columns mb-0 mt-6" id="inicio">
            <div className="container column is-flex is-flex-direction-column is-justify-content-center">
                <h2 className="subtitle is-4">
                Hola 👋, soy:
                </h2>
                <h1 className="title is-1">
                Miguel <strong className="has-text-primary">Vivar</strong>
                </h1>
                <h2 className="subtitle is-3 typing-text">
                    <span className="has-text-primary">Desarrollador</span>
                    <span className="dynamic-text ">{dynamicText}</span>
                </h2>
                <progress className="progress is-primary"></progress>
            </div>
            <div className="container column">
                <picture className="image is-540x540">
                    <source srcSet={Miguel_VivarAVIF} type="image/avif" />
                    <source srcSet={Miguel_VivarWEBP} type="image/webp" />
                    <img className="box" loading="lazy" src={Miguel_VivarPNG} alt="imagen mía" width="100" height="100" />
                </picture>
            </div>
        </section>
    )
}

export default Hero;