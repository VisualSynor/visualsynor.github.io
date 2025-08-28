        document.addEventListener('DOMContentLoaded', function() {
            // --- CÓDIGO PRELOADER ---
            const hidePreloader = () => { const preloader = document.getElementById('preloader'); if (preloader) { preloader.classList.add('hidden'); setTimeout(() => { preloader.style.display = 'none'; }, 800); } };
            const minTimePromise = new Promise(resolve => { setTimeout(resolve, 1200); });
            const pageLoadPromise = new Promise(resolve => { window.addEventListener('load', resolve); });
            Promise.all([minTimePromise, pageLoadPromise]).then(hidePreloader);

            // --- CÓDIGO TRADUCTOR DE IDIOMA ---
            const translations = {
                es: {
                    navBack: '← Volver al equipo',
                    heroTitle: 'Valentina Salgado',
                    heroSubtitle: 'Directora de Arte & Diseñadora Gráfica',
                    introText: '"Creo en el diseño como un puente entre la estrategia y la emoción. Mi trabajo explora la intersección de la fotografía artística y la comunicación de marca, buscando siempre crear piezas visuales que no solo se vean bien, sino que cuenten una historia y provoquen una sensación."',
                    portfolioTitle: 'Portafolio',
                    filterAll: 'Todos',
                    filterPhoto: 'Fotografía',
                    filterEditorial: 'Diseño Editorial',
                    overlay1: 'Retrato "Alma"',
                    overlay2: 'Póster para Festival de Cine',
                    overlay3: 'Estudio de Personaje',
                    overlay4: 'Portada de Libro "Utopía"',
                    overlay5: 'Campaña de Moda "Nómada"',
                    overlay6: 'Maquetación Revista "Tempo"',
                    projectsTitle: 'Proyectos Relevantes',
                    project1Title: 'Branding para "Nómada Café"',
                    project1Desc: 'Creación completa de la identidad visual, desde el logotipo y la paleta de colores hasta el diseño de empaques y material para redes sociales.',
                    project2Title: 'Dirección de Arte para "Amanecer"',
                    project2Desc: 'Conceptualización y dirección artística para una campaña fotográfica de moda, definiendo el estilismo, las locaciones y el mood general de la sesión.',
                    project3Title: 'Diseño Editorial "Revista Tempo"',
                    project3Desc: 'Maquetación y diseño de la edición de aniversario, trabajando en la composición, tipografía y tratamiento de imágenes para 80 páginas.',
                    projectCTA: 'Ver Más',
                    contactTitle: '¿Tienes un proyecto en mente?',
                    contactText: 'Si mi estilo resuena contigo, trabajemos juntos. Contáctanos a través de Visual Synor para dar vida a tu próxima gran idea.',
                    contactCTA: 'Iniciar Conversación',
                    footerRights: '© 2025 Visual Synor. Todos los derechos reservados.'
                },
                en: {
                    navBack: '← Back to team',
                    heroTitle: 'Valentina Salgado',
                    heroSubtitle: 'Art Director & Graphic Designer',
                    introText: '"I believe in design as a bridge between strategy and emotion. My work explores the intersection of artistic photography and brand communication, always seeking to create visuals that not only look good, but tell a story and evoke a feeling."',
                    portfolioTitle: 'Portfolio',
                    filterAll: 'All',
                    filterPhoto: 'Photography',
                    filterEditorial: 'Editorial Design',
                    overlay1: 'Portrait "Soul"',
                    overlay2: 'Poster for Film Festival',
                    overlay3: 'Character Study',
                    overlay4: 'Book Cover "Utopia"',
                    overlay5: 'Fashion Campaign "Nomad"',
                    overlay6: 'Magazine Layout "Tempo"',
                    projectsTitle: 'Relevant Projects',
                    project1Title: 'Branding for "Nómada Café"',
                    project1Desc: 'Complete creation of the visual identity, from the logo and color palette to packaging design and social media materials.',
                    project2Title: 'Art Direction for "Amanecer"',
                    project2Desc: 'Conceptualization and art direction for a fashion photography campaign, defining the styling, locations, and overall mood of the shoot.',
                    project3Title: 'Editorial Design "Tempo Magazine"',
                    project3Desc: 'Layout and design of the anniversary edition, working on composition, typography, and image treatment for 80 pages.',
                    projectCTA: 'See More',
                    contactTitle: 'Have a project in mind?',
                    contactText: 'If my style resonates with you, let\'s work together. Contact us through Visual Synor to bring your next big idea to life.',
                    contactCTA: 'Start a Conversation',
                    footerRights: '© 2025 Visual Synor. All rights reserved.'
                }
            };
            const langSelector = document.querySelector('.lang-selector'), langSelectedContainer = document.getElementById('lang-selected'), langDropdown = document.getElementById('lang-dropdown'), langOptions = document.querySelectorAll('.lang-option');
            if(langSelector) {
                langSelectedContainer.addEventListener('click', (event) => { event.stopPropagation(); langDropdown.classList.toggle('show'); });
                langOptions.forEach(option => { option.addEventListener('click', () => { const lang = option.getAttribute('data-lang'); setLanguage(lang); langDropdown.classList.remove('show'); }); });
                window.addEventListener('click', () => { if (langDropdown.classList.contains('show')) { langDropdown.classList.remove('show'); } });
            }
            function setLanguage(lang) {
                const selectedLangOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
                if(langSelectedContainer && selectedLangOption) {
                    langSelectedContainer.innerHTML = selectedLangOption.innerHTML;
                }
                document.querySelectorAll('[data-key]').forEach(elem => {
                    const key = elem.getAttribute('data-key');
                    if (translations[lang] && translations[lang][key]) {
                        elem.innerHTML = translations[lang][key]; 
                    }
                });
                localStorage.setItem('language', lang);
            }
            const savedLang = localStorage.getItem('language') || 'es';
            setLanguage(savedLang);

            // --- LÓGICA DE LA GALERÍA CON FILTROS ---
            const filterButtons = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            if (filterButtons.length > 0) {
                filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        const filter = button.getAttribute('data-filter');
                        galleryItems.forEach(item => {
                            item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
                        });
                    });
                });
            }

            // --- LÓGICA DEL LIGHTBOX ---
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxClose = document.querySelector('.lightbox-close');
            if (lightbox) {
                galleryItems.forEach(item => {
                    item.addEventListener('click', () => {
                        const imgSrc = item.querySelector('img').getAttribute('src');
                        lightboxImg.setAttribute('src', imgSrc);
                        lightbox.classList.add('show');
                    });
                });
                const closeLightbox = () => { lightbox.classList.remove('show'); };
                lightboxClose.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', (e) => { if (e.target === lightbox) { closeLightbox(); } });
            }
        });