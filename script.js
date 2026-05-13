document.addEventListener('DOMContentLoaded', () => {
    // Enable SPA mode
    document.body.classList.add('spa-enabled');
    
    const sections = document.querySelectorAll('header.hero, main .section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function showSection(hash) {
        if (!hash || hash === '#' || hash === '#home') {
            hash = '#home';
        }

        let sectionFound = false;
        
        sections.forEach(section => {
            if ('#' + section.id === hash) {
                section.classList.add('active-section');
                sectionFound = true;
            } else {
                section.classList.remove('active-section');
            }
        });

        // Fallback to home if invalid hash
        if (!sectionFound) {
            document.getElementById('home').classList.add('active-section');
            hash = '#home';
        }

        // Keep scroll at top when changing sections
        window.scrollTo(0, 0);
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, href);
                showSection(href);
            }
        });
    });

    // Also handle hero buttons
    const heroBtns = document.querySelectorAll('.hero-btns a');
    heroBtns.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, href);
                showSection(href);
            }
        });
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        showSection(window.location.hash);
    });

    // Initial load
    showSection(window.location.hash);

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });
});
