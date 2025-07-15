document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionar los elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const languageSelector = document.querySelector('.language-selector'); // Selector de idioma
    const langButton = document.querySelector('.lang-button'); // Botón del selector de idioma

    // 2. Añadir un 'event listener' al botón de la flecha
    menuToggle.addEventListener('click', function() {
        // 3. Alternar la clase 'is-open' en el menú para mostrarlo/ocultarlo
        mobileMenu.classList.toggle('is-open');

        // 4. Alternar el atributo 'aria-expanded' para accesibilidad y CSS
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);

        // Cierra el selector de idioma si el menú móvil se abre
        if (languageSelector && languageSelector.classList.contains('active')) {
            languageSelector.classList.remove('active');
        }
    });

    // Event listener para el botón del selector de idioma
    if (langButton) {
        langButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic se propague al documento
            if (languageSelector) { // Asegura que el selector exista
                languageSelector.classList.toggle('active'); // Alterna la clase 'active'
            }
        });
    }

    // Opcional: Cerrar el menú y el selector de idioma si se hace clic fuera de ellos (para mejorar la UX)
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = menuToggle.contains(event.target) || mobileMenu.contains(event.target);
        const isClickInsideLanguageSelector = languageSelector && languageSelector.contains(event.target);

        if (!isClickInsideNavbar && mobileMenu.classList.contains('is-open')) {
            mobileMenu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        // Cierra el selector de idioma si se hace clic fuera de él
        if (languageSelector && !isClickInsideLanguageSelector && languageSelector.classList.contains('active')) {
            languageSelector.classList.remove('active');
        }
    });

    // Opcional: Cerrar el menú si se hace clic en un enlace del menú (navegación a una sección)
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Lógica para el cambio de idioma al hacer clic en las opciones del desplegable
    const langLinks = document.querySelectorAll('.lang-dropdown-content a');

    langLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el navegador siga el enlace de forma predeterminada

            const selectedLang = this.getAttribute('data-lang'); // Obtiene 'en' o 'es'
            let newUrl = window.location.origin; // Obtiene la base de la URL (ej. http://localhost:8000)

            if (selectedLang === 'en') {
                // Si se selecciona inglés, redirige a la versión en inglés
                // ASUMIMOS que tendrás un archivo en 'en/index.html' o 'index-en.html'
                // Ajusta esta URL según cómo organices tus archivos de idioma.
                // Ejemplo para un subdirectorio 'en':
                newUrl += '/en/en_index.html';
                // O si está en el mismo nivel con un nombre diferente (menos recomendado para SEO):
                // newUrl += '/index-en.html';
            } else if (selectedLang === 'es') {
                // Si se selecciona español, redirige a la versión en español (tu index.html actual)
                newUrl += '/index.html';
            }

            // Realiza la redirección a la nueva URL
            window.location.href = newUrl;

            // Opcional: Cierra el desplegable de idioma después de la selección
            if (languageSelector && languageSelector.classList.contains('active')) {
                languageSelector.classList.remove('active');
            }
        });
    });

    // Lógica de acordeón para la sección de servicios
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 768) { // Lógica para móviles
                // Si ya está expandido, contráelo. Si no, expándelo.
                this.classList.toggle('is-expanded');
            } else { // Lógica para desktop (al pasar el ratón o al hacer clic si lo prefieres)
                // Actualmente, la lógica de desktop usa hover en CSS.
                // Si deseas que el clic funcione para desktop, puedes descomentar y ajustar esto.
                // Por ejemplo, para que el clic "bloquee" un panel expandido:
                // serviceItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.classList.remove('is-expanded-desktop');
                //     }
                // });
                // this.classList.toggle('is-expanded-desktop');
            }
        });
    });

    // Opcional: Para resetear el estado de los acordeones si la ventana cambia de tamaño
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth >= 768) {
                // Al pasar a desktop, asegura que no haya tarjetas expandidas de móvil
                serviceItems.forEach(item => {
                    item.classList.remove('is-expanded');
                });
            } else {
                // Al volver a móvil, si quieres que se colapsen por defecto
                serviceItems.forEach(item => {
                    // Puedes dejar esto si quieres que al cambiar de tamaño se cierren
                    // item.classList.remove('is-expanded');
                });
            }
        }, 250); // Pequeño retraso para evitar ejecuciones excesivas
    });

    // Script para el año actual en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});