document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionar los elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const languageSelector = document.querySelector('.language-selector');
    const langButton = document.querySelector('.lang-button');
    const langLinks = document.querySelectorAll('.lang-dropdown-content a'); // Nuevas líneas para los enlaces de idioma

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

    // Opcional: Cerrar el menú si se hace clic fuera de él (para mejorar la UX)
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = menuToggle.contains(event.target) || mobileMenu.contains(event.target);
        const isClickInsideLangSelector = languageSelector && languageSelector.contains(event.target); // Nueva línea

        if (!isClickInsideNavbar && mobileMenu.classList.contains('is-open')) {
            mobileMenu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        // Cierra el selector de idioma si se hace clic fuera de él y no en el botón
        if (languageSelector && languageSelector.classList.contains('active') && !isClickInsideLangSelector) {
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

    // Event listener para el botón del selector de idioma
    if (langButton) {
        langButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic se propague al documento
            if (languageSelector) { // Asegura que el selector exista
                languageSelector.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar el dropdown
            }
        });
    }

    // Lógica para cambiar de idioma
    langLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang === 'en') {
                window.location.href = '/en/en_index.html'; // Navega a la versión en inglés
            } else if (selectedLang === 'es') {
                window.location.href = '/index.html'; // Navega a la versión en español
            }
        });
    });

    // Lógica para los acordeones de servicios (tu código existente)
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Lógica para móvil (expandir/contraer)
            if (window.innerWidth < 768) {
                // Si el item ya está expandido, lo contrae
                if (this.classList.contains('is-expanded')) {
                    this.classList.remove('is-expanded');
                } else {
                    // Cierra cualquier otro item expandido
                    serviceItems.forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.classList.remove('is-expanded');
                        }
                    });
                    // Expande el item clicado
                    this.classList.add('is-expanded');
                }
            } else {
                // Lógica para desktop (expande el hover)
                // En desktop, el hover maneja la expansión. Este clic podría usarse para "fijar" un panel
                // si quisieras un comportamiento diferente al solo hover. Por ahora, lo dejamos como estaba.
                // Si quieres que el clic "bloquee" un panel expandido, descomenta:
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

        // --- AQUÍ ES DONDE DEBES AÑADIR LA LÓGICA DEL BOTÓN DE AUDIO ---
    const heroVideo = document.getElementById('heroVideo');
    const muteToggle = document.getElementById('muteToggle');

    if (heroVideo && muteToggle) {
        // Asegurarse de que el video empiece silenciado (atributo 'muted' en HTML también lo hace)
        heroVideo.muted = true;

        // Event listener para el botón de mute/unmute
        muteToggle.addEventListener('click', function() {
            heroVideo.muted = !heroVideo.muted; // Alternar el estado de muted

            // Cambiar el ícono según el estado de mute
            if (heroVideo.muted) {
                muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icono de silenciado
            } else {
                muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>'; // Icono de sonido
            }
        });

        // Opcional: Sincronizar el icono si el estado de volumen/mute cambia por otras razones
        heroVideo.addEventListener('volumechange', function() {
            if (heroVideo.muted || heroVideo.volume === 0) {
                muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
    }
    
    // --- Lógica de Filtrado del Portafolio ---
const filterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Eliminar 'active' de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir 'active' al botón clickeado
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter'); // 'all', 'branding', 'web', etc.

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block'; // Mostrar el elemento
            } else {
                item.style.display = 'none'; // Ocultar el elemento
            }
        });
    });
});

});