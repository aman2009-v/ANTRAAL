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

// Countdown Timer
const eventDate = new Date('2026-07-26').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

setInterval(updateCountdown, 1000);
updateCountdown();

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

