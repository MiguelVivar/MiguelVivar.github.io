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