// Nav-Burger
document.addEventListener('DOMContentLoaded', () => {

    // Obtener todos los elementos del "navbar-burger"
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Evento de clic.
    $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

        // Atributo "data-target"
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Alternar "is-active" en "navbar-burger" y "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

    });
    });

});

// Enviar correos
function enviarCorreo() {
    const correoURL = "mailto:miguelvivarfarfan@gmail.com?subject=Consulta&body=";
    window.location.href = correoURL;
}

// Validador Formulario
document.addEventListener('DOMContentLoaded', function(){

    const email = {
        nombre: '',
        email: '',
        mensaje: ''
    }

    // Seleccionar elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar)
    inputNombre.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        resetearFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();
        if (Object.values(email).includes('')) {
            return; // Evita ejecutar si hay campos vacíos.
        }
        
        spinner.classList.add('is-flex');
        spinner.classList.remove('is-hidden');
    
        setTimeout(() => {
            spinner.classList.remove('is-flex');
            spinner.classList.add('is-hidden');
    
            resetearFormulario();
    
            // Mensaje de envio
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('has-background-primary', 'has-text-white', 'p-2', 'has-text-centered', 'mt-10', 'has-text-weight-bold', 'is-uppercase');
            alertaExito.textContent = 'El mensaje se envió correctamente';
    
            const referencia = inputMensaje.parentElement; // Obtén el contenedor del textarea
            referencia.insertAdjacentElement('afterend', alertaExito); // Inserta después del contenedor

    
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
    
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar valor al objeto
        email[e.target.id] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto email
        comprobarEmail();
    };

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // Alerta HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('has-background-danger', 'has-text-white', 'p-2', 'has-text-centered')

        // Inyectar error al form
        referencia.appendChild(error);

    };

    function limpiarAlerta(referencia){
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.has-background-danger');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email); 
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetearFormulario() {
        // Resetear el formulario
        email.email = '';
        email.nombre = '';
        email.mensaje = '';
        
        formulario.reset();
        comprobarEmail();
    }
});

// Cursor animacion
window.addEventListener("load", (event) => {
    new cursoreffects.followingDotCursor({ color: ["#00D1B2"] });
});

