document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionar los elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // 2. Añadir un 'event listener' al botón de la flecha
    menuToggle.addEventListener('click', function() {
        // 3. Alternar la clase 'is-open' en el menú para mostrarlo/ocultarlo
        mobileMenu.classList.toggle('is-open');

        // 4. Alternar el atributo 'aria-expanded' para accesibilidad y CSS
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Opcional: Cerrar el menú si se hace clic fuera de él (para mejorar la UX)
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = menuToggle.contains(event.target) || mobileMenu.contains(event.target);
        if (!isClickInsideNavbar && mobileMenu.classList.contains('is-open')) {
            mobileMenu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Opcional: Cerrar el menú si se hace clic en un enlace del menú (navegación a una sección)
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('is-open')) {
                mobileMenu.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

        // --- Lógica para la sección de servicios (Acordeón) ---
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        // Asegúrate de que el clic no afecte al botón "Ver más" directamente
        const viewMoreBtn = item.querySelector('.view-more-btn');
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', function(event) {
                event.stopPropagation(); // Evita que el clic en el botón active/desactive el acordeón
                // Aquí puedes añadir lógica para ir a una página de detalle o modal
                console.log('Botón "Ver más" clicado para:', item.querySelector('h3').textContent);
            });
        }

        item.addEventListener('click', function() {
            // Solo activar el acordeón en móviles (ancho menor a 768px)
            if (window.innerWidth < 768) {
                // Alternar la clase 'is-expanded' en el elemento clicado
                item.classList.toggle('is-expanded');

                // Opcional: Cerrar otros acordeones si se desea un comportamiento de "uno abierto a la vez"
                serviceItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('is-expanded')) {
                        otherItem.classList.remove('is-expanded');
                    }
                });
            } else {
                // En desktop, activa la clase para el efecto de expansión por clic
                // (Si quieres que el clic en desktop también cambie el "activo" no solo el hover)
                // Esto es útil si el hover solo es temporal y quieres un estado "activo" persistente
                // Para el efecto de la imagen de referencia, el hover suele ser suficiente.
                // Si quieres que el clic "bloquee" un panel expandido, descomenta:
                // serviceItems.forEach(otherItem => {
                //     otherItem.classList.remove('is-expanded-desktop');
                // });
                // item.classList.add('is-expanded-desktop');
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

    document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
});

