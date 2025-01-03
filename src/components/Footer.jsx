function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    &copy; {year} <strong>VivarDev</strong>. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}

export default Footer