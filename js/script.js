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

    // Nueva Lógica de la Sección de Portafolio Interactivo
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const viewMoreButton = document.getElementById('view-more-button');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const portfolioBackgroundVideoContainer = document.getElementById('portfolio-youtube-player'); // Ahora es el div contenedor del reproductor

    let player; // Variable para almacenar la instancia del reproductor de YouTube

    // 1. Cargar la API de YouTube IFrame Player de forma asíncrona
    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. Esta función se ejecutará automáticamente cuando la API de YouTube esté lista
    window.onYouTubeIframeAPIReady = function() {
        // Inicializa el reproductor con el ID del primer video (si existe)
        const initialVideoId = portfolioCards.length > 0 ? portfolioCards[0].getAttribute('data-youtube-id') : null;
        
        player = new YT.Player('portfolio-youtube-player', {
            videoId: initialVideoId, // El ID del primer video
            playerVars: {
                autoplay: 1,      // Autoreproducir
                mute: 1,          // Silenciar (necesario para autoplay en muchos navegadores)
                loop: 1,          // Bucle infinito
                controls: 0,      // Ocultar controles del reproductor
                playlist: initialVideoId, // Necesario para que loop funcione con un solo video
                showinfo: 0,      // Ocultar título del video
                modestbranding: 1, // Ocultar logo de YouTube (un poco)
                fs: 0,            // Deshabilitar botón de pantalla completa
                rel: 0,           // No mostrar videos relacionados al finalizar
                autohide: 1,      // Ocultar la barra de progreso
                start: 0          // Iniciar desde el principio
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    // 3. La API llamará a esta función cuando el reproductor de video esté listo
    function onPlayerReady(event) {
        event.target.playVideo(); // Asegura que el video se reproduzca
        // Si quieres que el primer proyecto se active visualmente al cargar el video:
        if (portfolioCards.length > 0) {
             // Simulate a click on the first card to load its details and apply active class
             portfolioCards[0].click(); 
        } else {
             updateProjectDetails("", "", "", "", true); // Muestra el mensaje por defecto si no hay tarjetas
        }
    }

    // 4. La API llama a esta función cuando el estado del reproductor cambia (play, pause, end, etc.)
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            // Reinicia el video si termina y el bucle no lo hace automáticamente
            player.seekTo(0);
            player.playVideo();
        }
    }

    // Función para actualizar los detalles del proyecto y el video de YouTube
    function updateProjectDetails(title, description, link, youtubeId, defaultText = false) {
        if (defaultText) {
            projectTitle.textContent = "Selecciona un Proyecto";
            projectDescription.textContent = "Haz clic en una de las tarjetas de la derecha para ver los detalles del proyecto aquí.";
            viewMoreButton.style.display = 'none'; // Oculta el botón
            viewMoreButton.removeAttribute('href'); // Limpia el href
            viewMoreButton.removeAttribute('target'); // Limpia el target
            // Si no hay tarjeta seleccionada, pausar el video o cargar un video por defecto vacío
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        } else {
            projectTitle.textContent = title;
            projectDescription.textContent = description;
            viewMoreButton.style.display = 'inline-block'; // Muestra el botón
            viewMoreButton.href = link; // Asigna el link de la tarjeta
            viewMoreButton.target = "_blank"; // Abre en una nueva pestaña

            // Cambiar el video de YouTube si se proporciona un ID y el reproductor existe
            if (player && youtubeId) {
                // `loadVideoById` reproduce el video inmediatamente
                // `cueVideoById` solo lo carga, lo que es útil si quieres control de inicio más fino
                player.loadVideoById(youtubeId, 0); // Carga y reproduce el nuevo video desde el segundo 0
            }
        }
    }

    // Añadir listener de clic a cada tarjeta del portafolio
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            // Eliminar la clase 'active' de todas las tarjetas
            portfolioCards.forEach(item => item.classList.remove('active'));

            // Añadir la clase 'active' a la tarjeta clicada
            this.classList.add('active');

            // Obtener datos de la tarjeta clicada
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const link = this.getAttribute('data-link');
            const youtubeId = this.getAttribute('data-youtube-id'); // Obtiene el ID del video de YouTube

            updateProjectDetails(title, description, link, youtubeId); // Pasa el ID del video a la función
        });
    });

    // Carga la API de YouTube cuando el DOM esté listo
    loadYouTubeAPI();

    // Lógica para el botón de silenciar/desactivar silencio del video principal
    const heroVideo = document.getElementById('heroVideo');
    const muteToggleButton = document.getElementById('muteToggle');

    if (heroVideo && muteToggleButton) {
        // Establecer el estado inicial del icono basado en la propiedad 'muted' del video
        if (heroVideo.muted) {
            muteToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }

        muteToggleButton.addEventListener('click', function() {
            if (heroVideo.muted) {
                heroVideo.muted = false; // Desactivar silencio
                muteToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Cambiar a icono de sonido
            } else {
                heroVideo.muted = true; // Silenciar
                muteToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Cambiar a icono de mute
            }
        });
    }

});