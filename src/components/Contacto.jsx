import { useState } from "react";

function Contacto() {
    function enviarCorreo() {
        const correoURL = "mailto:miguelvivarfarfan@gmail.com?subject=Consulta&body=";
        window.location.href = correoURL;
    }

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    
    // Validar Email
    const validarEmail = (email) => {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    };
    
    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    
        // Validar campo
        setErrors((prev) => ({
        ...prev,
        [name]: value.trim() === "" ? `El campo ${name} es obligatorio` : "",
        }));
    
        if (name === "email" && value.trim() !== "") {
        setErrors((prev) => ({
            ...prev,
            email: validarEmail(value)
            ? ""
            : "El correo electrónico no es válido",
        }));
        }
    };
    
    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validar si hay errores
        const nuevosErrores = {};
        Object.keys(formData).forEach((key) => {
            if (formData[key].trim() === "") {
                nuevosErrores[key] = `El ${key} es obligatorio`;
            } else if (key === "email" && !validarEmail(formData[key])) {
                nuevosErrores[key] = "El correo electrónico no es válido";
            }
        });
    
        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }
    
        // Simular envío
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage("El mensaje se envió correctamente.");
            setFormData({ nombre: "", email: "", mensaje: "" });
    
            setTimeout(() => setSuccessMessage(""), 3000);
        }, 3000);
    };
    
    // Resetear formulario
    const handleReset = () => {
        setFormData({ nombre: "", email: "", mensaje: "" });
        setErrors({});
        setSuccessMessage("");
    };

    return (
        <section className="section container border" id="contacto">
            <h2 className="title is-2 has-text-centered mb-6">
                Contáctame 📞
            </h2>
            <form id="formulario" onSubmit={handleSubmit} className="columns">
                <div className="column is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-align-content-center is-align-self-center"> 
                    <p>
                        Si consideras que puedo aportar valor a tus proyectos, no dudes en contactarme. Estoy comprometido en ofrecer soluciones innovadoras y de calidad.
                    </p>
                    <p className="is-italic has-text-weight-light">&quot;Cada proyecto es una <strong>oportunidad</strong> para crear algo extraordinario.&quot;</p>
                </div>
                <div className="column">
                    <div className="field">
                        <label htmlFor="nombre" className="label is-size-3">Nombre:</label>
                        <div className="control">
                            <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Tu nombre"
                            className="input"/>
                            {errors.nombre && <p className="help is-danger">{errors.nombre}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="email" className="label is-size-3">Correo Electrónico:</label>
                        <div className="control">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={formData.email}
                            className="input"
                            onChange={handleInputChange}
                            />
                            {errors.email && <p className="help is-danger">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="mensaje" className="label is-size-3">Mensaje:</label>
                        <div className="control">
                            <textarea
                            id="mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            className="textarea"
                            onChange={handleInputChange}
                            placeholder="Tu mensaje"
                            />
                            {errors.mensaje && <p className="help is-danger">{errors.mensaje}</p>}
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-primary is-medium mr-4"  disabled={isSubmitting} onClick={enviarCorreo}>
                            {isSubmitting ? "Enviando..." : "Enviar"}
                        </button>
                        <button type="button" className="button is-medium" onClick={handleReset}>
                            Resetear
                        </button>
                    </div>
                    {successMessage && <p className="has-background-primary has-text-white p-2 has-text-centered mt-3 has-text-weight-bold is-uppercase">{successMessage}</p>}
                </div>
            </form>
            <div className={`spinner ${isSubmitting ? "" : "is-hidden"}`} id="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </section>
    );
}


export default Contacto;