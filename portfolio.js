document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Elite Portfolio Loaded - Atharva Ambalge');

    // 1. Typewriter Effect
    const words = ["AI & Machine Learning Engineer", "Python Developer", "Data Scientist", "Full-Stack Specialist"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typeTarget = document.getElementById('typewriter-text');

    function type() {
        const currentWord = words[wordIndex];
        typeTarget.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
        typeTarget.setAttribute('aria-label', currentWord);
        
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true; typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();

    // 2. Scroll Reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const progress = document.querySelector('.progress');
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progress.style.width = scrolled + '%';
    });

    // 4. 3D Tilt Cards + Mouse Glow
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.setProperty('--glow-opacity', '1');
            
            // 3D Tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--glow-opacity', '0');
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 5. Stats Counter Animation
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(document.getElementById('stats'));

    function animateCounters() {
        const counters = {
            'projects-count': 8,
            'lines-count': 5000,
            'hours-count': 50,
            'accuracy-count': 95
        };
        Object.keys(counters).forEach(id => {
            const el = document.getElementById(id);
            const target = counters[id];
            let count = 0;
            const increment = target / 100;
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    el.textContent = id === 'accuracy-count' ? Math.floor(count) : Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = id === 'accuracy-count' ? target : target;
                }
            };
            updateCounter();
        });
    }

    // 6. Particles Background
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 7. Mobile Nav & Form
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        document.querySelectorAll('.links a').forEach(link => {
            link.addEventListener('click', () => navToggle.checked = false);
        });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const original = btn.textContent;
            btn.textContent = '🚀 Sending...';
            btn.disabled = true;

            try {
                await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                btn.textContent = '✅ Sent!';
                btn.style.background = '#10b981';
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            } catch {
                btn.textContent = '❌ Error';
                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                }, 2000);
            }
        });
    }

    // 8. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
            if (navToggle) navToggle.checked = false;
        });
    });

});
