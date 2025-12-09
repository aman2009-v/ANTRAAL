// Progress Bar
window.addEventListener('scroll', () => {
    const progressBar = document.querySelector('.progress-bar');
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Smart navbar behavior on scroll
(function smartHeader() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastY = window.pageYOffset;
    let ticking = false;

    function onScroll() {
        const currentY = window.pageYOffset;

        // Toggle scrolled class after 10px to activate glassy style
        if (currentY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on downward scroll, show on upward scroll
        if (currentY > 150) {
            if (currentY > lastY) {
                navbar.classList.add('hide');
            } else {
                navbar.classList.remove('hide');
            }
        } else {
            navbar.classList.remove('hide');
        }

        lastY = currentY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initial state
    onScroll();
})();

// Animate landing/hero text with stagger; respects reduced-motion
(function animateLandingText() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // selectors for prominent textual elements on landing-like pages
    const selectors = [
        '.hero .hero-title',
        '.hero .hero-subtitle',
        '.hero h1', '.hero h2', '.hero p',
        '.container h1', '.container h2', '.container h3', '.container p',
        '.front-content .name', '.front-content .role',
        '.flip-card-back .title', '.flip-card-back .view-btn'
    ];

    const elements = Array.from(document.querySelectorAll(selectors.join(',')));
    if (!elements.length) return;

    elements.forEach((el, i) => {
        // ensure starting state (CSS class handles animation)
        el.classList.add('text-animate');
        el.style.animationDelay = `${i * 80}ms`;
    });
})();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Active Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('nav-menu-active');
        hamburger.classList.toggle('active');
    });
}

// 3D Card Animations
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Enable click/keyboard flip for committee cards (touch-friendly)
(function committeeCardFlip() {
    const cards = document.querySelectorAll('.committee-card');
    if (!cards || !cards.length) return;

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || window.matchMedia('(hover: none)').matches;

    function toggleFlip(card) {
        card.classList.toggle('flipped');
    }

    cards.forEach(card => {
        // Avoid double-fire of touch -> click
        let lastTouch = 0;

        function onPointerToggle(e) {
            // if target is a link, let it behave normally
            if (e.target.closest('a')) return;

            // If this was a touch event, mark time so subsequent click is ignored
            if (e.type === 'touchend' || e.pointerType === 'touch') {
                lastTouch = Date.now();
            }

            // If recent touch occurred, ignore synthetic click events
            if (e.type === 'click' && (Date.now() - lastTouch) < 500) return;

            toggleFlip(card);
        }

        // Use pointer events when available to unify touch/mouse
        if (window.PointerEvent) {
            card.addEventListener('pointerup', onPointerToggle);
        } else {
            // touch first for touch devices
            if (isTouch) card.addEventListener('touchend', onPointerToggle, { passive: true });
            card.addEventListener('click', onPointerToggle);
        }

        // keyboard accessibility (Enter / Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip(card);
            }
        });
    });
})();

// Journey Timeline 3D Scroll Effect
(function journeyTimeline() {
    const journeyNodes = document.querySelectorAll('.journey-node');
    if (!journeyNodes.length) return;

    const track = document.querySelector('.journey-track');

    // gentle mouse/touch parallax for the whole track
    let targetRy = 0, targetRx = 0, currentRy = 0, currentRx = 0;
    const ease = 0.08;

    function onPointerMove(e) {
        const rect = (track && track.getBoundingClientRect()) || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - (rect.left + rect.width / 2);
        const y = clientY - (rect.top + rect.height / 2);
        targetRy = (x / rect.width) * 8; // rotateY small
        targetRx = -(y / rect.height) * 6; // rotateX small
    }

    function updateJourney() {
        const viewportMid = window.innerHeight * 0.7;
        journeyNodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            const depth = parseInt(node.dataset.depth || '80', 10);
            const offset = viewportMid - rect.top;
            const progress = Math.max(-1, Math.min(1, offset / viewportMid));
            const translateZ = depth * progress * 0.6;
            const rotateY = progress * -10;
            const translateY = progress * -22;

            node.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) translateY(${translateY}px)`;

            if (rect.top < window.innerHeight - 80 && rect.bottom > 60) {
                node.classList.add('visible');
            } else {
                node.classList.remove('visible');
            }
        });
    }

    function animateTrack() {
        currentRy += (targetRy - currentRy) * ease;
        currentRx += (targetRx - currentRx) * ease;
        if (track) {
            track.style.transform = `rotateX(${currentRx}deg) rotateY(${currentRy}deg)`;
        }
        requestAnimationFrame(animateTrack);
    }

    // Wire up pointer events with graceful fallbacks
    if (track) {
        track.addEventListener('mousemove', onPointerMove);
        track.addEventListener('touchmove', onPointerMove, { passive: true });
        track.addEventListener('mouseleave', () => { targetRy = 0; targetRx = 0; });
    } else {
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('touchmove', onPointerMove, { passive: true });
    }

    // Kick things off
    updateJourney();
    animateTrack();
    window.addEventListener('scroll', () => requestAnimationFrame(updateJourney), { passive: true });
    window.addEventListener('resize', updateJourney);
})();

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feature-card, .team-card, .about-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const centralHourglass = document.querySelector('.central-hourglass');
    
    if (centralHourglass) {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        centralHourglass.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
    }
});

// Handle submit button functionality
const submitButton = document.querySelector('.btn-submit');
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields (optional, add validation logic here)
        const form = document.getElementById('registration-form');
        if (form.checkValidity()) {
            form.submit(); // Submit the form if valid
        } else {
            alert('Please fill out all required fields.');
        }
    });
}


// Enable click/keyboard flip for flip-card (touch-friendly)
(function flipCardHandler() {
    const cards = document.querySelectorAll('.flip-card');
    if (!cards || !cards.length) return;

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || window.matchMedia('(hover: none)').matches;

    function toggleFlip(card) {
        card.classList.toggle('flipped');
    }

    cards.forEach(card => {
        let lastTouch = 0;

        function onPointerToggle(e) {
            if (e.target.closest('a')) return;
            if (e.type === 'touchend' || e.pointerType === 'touch') lastTouch = Date.now();
            if (e.type === 'click' && (Date.now() - lastTouch) < 500) return;
            toggleFlip(card);
        }

        if (window.PointerEvent) {
            card.addEventListener('pointerup', onPointerToggle);
        } else {
            if (isTouch) card.addEventListener('touchend', onPointerToggle, { passive: true });
            card.addEventListener('click', onPointerToggle);
        }

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip(card);
            }
        });
    });
})();

