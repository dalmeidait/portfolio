document.addEventListener('DOMContentLoaded', () => {
    // Artificial loading effect
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
            initTypewriter();
        }, 1000);
    }, 2500); // 2.5 seconds boot sequence

    // Navigation scroll effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .skill-tag, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        observer.observe(el);
    });

    // Add a class when visible
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.target.classList.contains('visible')) {
                mutation.target.style.opacity = '1';
                mutation.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.card, .skill-tag, .section-title').forEach(el => {
        mutationObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
    });
});

// Glitch/Typewriter effect for hero
function initTypewriter() {
    const textElement = document.querySelector('.glitch-text');
    if (!textElement) return;

    const originalText = textElement.getAttribute('data-text');
    let i = 0;
    textElement.innerHTML = '';

    // Simulate terminal typing
    function typeWriter() {
        if (i < originalText.length) {
            textElement.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 30);
        }
    }

    typeWriter();
}
