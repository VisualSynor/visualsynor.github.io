document.addEventListener('DOMContentLoaded', function() {
    // --- PRELOADER Y BLOQUEO DE SCROLL ---
    document.body.classList.add('no-scroll');
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    };
    const minTimePromise = new Promise(resolve => { setTimeout(resolve, 1200); });
    const pageLoadPromise = new Promise(resolve => { window.addEventListener('load', resolve); });
    Promise.all([minTimePromise, pageLoadPromise]).then(hidePreloader);

    // --- MENÚ MÓVIL Y ANIMACIONES DE SCROLL ---
    const navMenu = document.getElementById('nav-menu'), navToggle = document.getElementById('nav-toggle'), navLinks = document.querySelectorAll('.nav-link');
    if (navToggle) { navToggle.addEventListener('click', () => { navMenu.classList.toggle('active'); }); }
    navLinks.forEach(link => { link.addEventListener('click', () => { if (navMenu.classList.contains('active')) { navMenu.classList.remove('active'); } }); });
    const faders = document.querySelectorAll('.fade-in'), appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); appearOnScroll.unobserve(entry.target); } });
    }, appearOptions);
    faders.forEach(fader => { appearOnScroll.observe(fader); });

    // --- TRADUCTOR DE IDIOMA ---
    const translations = {
        es: {
            navServices: 'Servicios', navPortfolio: 'Portafolio', navPlanes: 'Planes' ,navAbout: 'Nosotros', navContact: 'Contacto',
            heroTitle: 'Creatividad Multimedia Potenciada por Inteligencia Artificial',
            heroSubtitle: 'En Visual Synor fusionamos el talento artístico con la tecnología más avanzada para llevar tu marca al siguiente nivel.',
            heroCTA: 'Inicia tu Proyecto',
            trustedBy: 'Marcas que confían en nosotros',
            servicesTagline: 'Nuestros Servicios',
            servicesTitle: 'Qué Hacemos',
            servicesDesc: 'Fusionamos estrategia y creatividad con el poder de la IA para ofrecer soluciones visuales que no solo impactan, sino que también convierten.',
            service1Title: 'Diseño Gráfico con IA',
            service1Desc: 'Identidades visuales y assets para campañas, utilizando IA para acelerar la creatividad y la producción.',
            service2Title: 'Edición de Video Inteligente',
            service2Desc: 'Transformamos tu material en historias cautivadoras, asistidos por IA para optimizar el ritmo y el color.',
            service3Title: 'Motion Graphics Dinámicos',
            service3Desc: 'Animaciones fluidas y modernas para dar vida a tu mensaje, generando efectos complejos de forma eficiente.',
            service4Title: 'Estrategia de Contenido con IA',
            service4Desc: 'Análisis y creación de contenido optimizado para conectar con tu audiencia y alcanzar tus objetivos.',
            portfolioTitle: 'Proyectos Destacados', portfolio1: 'Branding para Marca Tech', portfolio2: 'Video Publicitario Producto',
        plansTagline: 'Nuestros Planes',
        plansTitle: 'Un Plan para Cada Meta',
        plansDesc: 'Ofrecemos paquetes flexibles diseñados para startups, empresas en crecimiento y proyectos a gran escala que requieren una solución a medida.',
        plan1Title: 'Arranque Digital',
        plan1Price: 'Desde $450.000 COP',
        plan1Desc: 'Perfecto para nuevas marcas que necesitan un lanzamiento visual potente.',
        plan1Feat1: '<i class="fas fa-check"></i> Diseño de logosimbolo',
        plan1Feat2: '<i class="fas fa-check"></i> 2 videos cortos para redes sociales',
        plan1Feat3: '<i class="fas fa-check"></i> 3 Piezas Gráficas',
        plan1Feat4: '<i class="fas fa-check"></i> Estrategia de arranque',
        planPopular: 'Más Popular',
        plan2Title: 'Despegue Comunitario',
        plan2Price: 'Desde $800.000 COP',
        plan2Desc: 'La solución integral para empresas que buscan crecer y consolidar su presencia.',
        plan2Feat1: '<i class="fas fa-check"></i> Branding inicial',
        plan2Feat2: '<i class="fas fa-check"></i> 4 videos cortos para redes sociales.',
        plan2Feat3: '<i class="fas fa-check"></i> 10 Piezas Gráficas con IA',
        plan2Feat4: '<i class="fas fa-check"></i> Análisis de redes y estrategia de comunidad.',
        plan2Feat5: '<i class="fas fa-check"></i> Estrategia de Contenido',
        plan3Title: 'Plan Personalizado',
        plan3Price: 'A tu Medida',
        plan3Desc: 'Para proyectos únicos con requerimientos específicos. Hablemos.',
        plan3Feat1: '<i class="fas fa-check"></i> Soluciones a la medida',
        plan3Feat2: '<i class="fas fa-check"></i> Producciones a gran escala',
        plan3Feat3: '<i class="fas fa-check"></i> Retainer Mensual disponible',
        plan3Feat4: '<i class="fas fa-check"></i> Integración IA avanzada',
        planBtn: 'Empezar',
        planBtnContact: 'Contáctanos',
        teamTagline: 'Nuestro Equipo',
        teamTitle: 'Conoce a los Expertos',
        teamDesc: 'Somos un equipo ágil y dedicado, convencido de que la mejor creatividad surge de la colaboración perfecta entre el ingenio humano y la precisión de la IA.',
        rafaelRole: 'Productor Multimedia & Estratega IA',
        rafaelBio: 'Experto en la fusión de narrativa visual y tecnología, liderando proyectos desde el concepto hasta la postproducción final.',
        valentinaRole: 'Directora de Arte & Diseñadora Gráfica',
        valentinaBio: 'Especialista en crear identidades de marca impactantes y contenido visual que captura la esencia de cada proyecto.',
        kevinRole: 'Animador 2D y 3D',
        kevinBio: 'Da vida a las ideas a través de motion graphics y animaciones dinámicas que comunican y cautivan a la audiencia.',
        exploreProfile:'Explorar Perfil',
            contactTagline: 'CONTÁCTANOS',
            contactTitle1: 'Conecta con nosotros para ',
            contactTitle2: 'asistencia',
            contactDesc: 'Estamos listos para potenciar tu marca. Completa el formulario y uno de nuestros especialistas se pondrá en contacto contigo.',
            formName: 'Nombre', formEmail: 'Email', formPhone: 'Teléfono (Opcional)',
            formServiceDefault: 'Seleccionar servicio', formService1: 'Diseño Gráfico', formService2: 'Edición de Video', formService3: 'Motion Graphics', formService4: 'Otro',
            formMessage: 'Escribe tu comentario aquí...', formButton: 'Enviar Ahora',
            footerRights: '© 2025 Visual Synor. All rights reserved.'
        },
        en: {
            navServices: 'Services', navPortfolio: 'Portfolio', navPlanes: 'Plans', navAbout: 'About Us', navContact: 'Contact',
            heroTitle: 'Multimedia Creativity Powered by Artificial Intelligence',
            heroSubtitle: 'At Visual Synor we merge artistic talent with the most advanced technology to take your brand to the next level.',
            heroCTA: 'Start your Project',
            trustedBy: 'Brands that trust us',
            servicesTagline: 'Our Services',
            servicesTitle: 'What We Do',
            servicesDesc: 'We merge strategy and creativity with the power of AI to deliver visual solutions that not only impress but also convert.',
            service1Title: 'Graphic Design with AI',
            service1Desc: 'Visual identities and assets for campaigns, using AI to accelerate creativity and production.',
            service2Title: 'Intelligent Video Editing',
            service2Desc: 'We transform your footage into captivating stories, assisted by AI to optimize rhythm and color.',
            service3Title: 'Dynamic Motion Graphics',
            service3Desc: 'Fluid and modern animations to bring your message to life, efficiently generating complex effects.',
            service4Title: 'Content Strategy with AI',
            service4Desc: 'Analysis and creation of optimized content to connect with your audience and achieve your goals.',
            portfolioTitle: 'Featured Projects', portfolio1: 'Branding for Tech Brand', portfolio2: 'Product Advertisement Video',
                    plansTagline: 'Our Plans',
        plansTitle: 'A Plan for Every Goal',
        plansDesc: 'We offer flexible packages designed for startups, growing companies, and large-scale projects that require a custom solution.',
        plan1Title: 'Starter Kit',
        plan1Price: 'From $111 USD',
        plan1Desc: 'Perfect for new brands that need a powerful visual launch.',
        plan1Feat1: '<i class="fas fa-check"></i> Basic Logo Design',
        plan1Feat2: '<i class="fas fa-check"></i> Social Media Kit',
        plan1Feat3: '<i class="fas fa-check"></i> 3 Graphic Pieces',
        plan1Feat4: '<i class="fas fa-check"></i> Brand Consulting',
        planPopular: 'Most Popular',
        plan2Title: 'Community Take-Off',
        plan2Price: 'From $200 USD',
        plan2Desc: 'The comprehensive solution for companies looking to grow and consolidate their presence.',
        plan2Feat1: '<i class="fas fa-check"></i> Complete Branding',
        plan2Feat2: '<i class="fas fa-check"></i> Corporate Video (30s)',
        plan2Feat3: '<i class="fas fa-check"></i> 10 AI-Powered Graphic Pieces',
        plan2Feat4: '<i class="fas fa-check"></i> Logo Animation',
        plan2Feat5: '<i class="fas fa-check"></i> Content Strategy',
        plan3Title: 'Custom Plan',
        plan3Price: 'Tailor-Made',
        plan3Desc: 'For unique projects with specific requirements. Let\'s talk.',
        plan3Feat1: '<i class="fas fa-check"></i> Custom-fit Solutions',
        plan3Feat2: '<i class="fas fa-check"></i> Large-Scale Productions',
        plan3Feat3: '<i class="fas fa-check"></i> Monthly Retainer Available',
        plan3Feat4: '<i class="fas fa-check"></i> Advanced AI Integration',
        planBtn: 'Get Started',
        planBtnContact: 'Contact Us',
teamTagline: 'Our Team',
        teamTitle: 'Meet The Experts',
        teamDesc: 'We are an agile and dedicated team, convinced that the best creativity arises from the perfect collaboration between human ingenuity and the precision of AI.',
        rafaelRole: 'Multimedia Producer & AI Strategist',
        rafaelBio: 'Expert in merging visual narrative and technology, leading projects from concept to final post-production.',
        valentinaRole: 'Art Director & Graphic Designer',
        valentinaBio: 'Specialist in creating impactful brand identities and visual content that captures the essence of each project.',
        kevinRole: '2D & 3D Animator',
        kevinBio: 'Brings ideas to life through motion graphics and dynamic animations that communicate and captivate the audience.',
                exploreProfile:'Explore Profile',
            contactTagline: 'CONTACT US',
            contactTitle1: 'Connect with us for ',
            contactTitle2: 'assistance',
            contactDesc: 'We are ready to boost your brand. Fill out the form and one of our specialists will get in touch with you.',
            formName: 'Name', formEmail: 'Email', formPhone: 'Phone (Optional)',
            formServiceDefault: 'Select service', formService1: 'Graphic Design', formService2: 'Video Editing', formService3: 'Motion Graphics', formService4: 'Other',
            formMessage: 'Type your comment here...', formButton: 'Send Now',
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
        if(langSelectedContainer && selectedLangOption) { langSelectedContainer.innerHTML = selectedLangOption.innerHTML; }
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (elem.hasAttribute('placeholder')) { elem.placeholder = translations[lang][key]; } 
                else { elem.innerHTML = translations[lang][key]; }
            }
        });
        localStorage.setItem('language', lang);
    }
    const savedLang = localStorage.getItem('language') || 'es';
    setLanguage(savedLang);

// --- FORMULARIO DE CONTACTO (VERSIÓN COMPATIBLE CON CAPTCHA) ---
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      formStatus.innerHTML = "¡Gracias por tu mensaje! Te contactaremos pronto.";
      formStatus.style.color = "var(--color-acento)";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          formStatus.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
        }
        formStatus.style.color = "red";
      })
    }
  }).catch(error => {
    formStatus.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
    formStatus.style.color = "red";
  });
}

if (form) {
    form.addEventListener("submit", handleSubmit)
}

    // --- BOTÓN "VOLVER ARRIBA" ---
    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
        backToTopButton.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});