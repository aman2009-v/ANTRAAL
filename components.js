// components.js
// Simple client-side injector for shared site components (nav, hero, footer)
const siteComponents = {
    nav: `
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <img src="ASSETS/888.jpg" alt="THE ANTRAAL MUN hourglass logo" class="logo-image">
                <span class="logo-text">ANTRAAL</span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="matrix.html">Committees</a></li>
                <li><a href="team.html">Core Team</a></li>
                <li><a href="registration.html" class="nav-register-btn">Register</a></li>
                <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSc-lhd2zgSwJzEhofasnkNA3AkFcH0WZKemFx8xUtwh8DAg1w/viewform?fbclid=PAb21jcANz02VleHRuA2FlbQIxMQABpzlHJ8wTkT2l0pNAGlsB1r4t-2B7n_JwL_xhYLJjPE9VIZWtcLNwVmYuv5oM_aem_SSxkVJDJT981k4_zgqSw2Q" class="nav-register-btn nav-apply-btn" target="_blank" rel="noopener noreferrer"> APLY FOR SECREATRY</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    `,

    heroCommittees: `
    <section class="hero">
        <div class="hero-background">
            <div class="wave-pattern"></div>
        </div>
        <div class="hero-content" style="min-height: auto; padding: 8rem 0 4rem;">
            <h1 class="hero-title" style="font-size: 4rem;">Committees</h1>
            <p class="hero-subtitle">The Arenas of Diplomacy</p>
        </div>
    </section>
    `,

    footer: `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>THE ANTRAAL MUN</h3>
                    <p>THE FIRST HOUR</p>
                    <p>August 31, 2025</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="matrix.html">Committees</a></li>
                        <li><a href="team.html">Core Team</a></li>
                        <li><a href="registration.html">Register</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <a href="https://www.instagram.com/theantraalmun/" target="_blank" class="social-link">Instagram</a>
                    <a href="contact.html" class="social-link">Contact Us</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 THE ANTRAAL MUN. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `
};

function insertComponent(elId, compName) {
    const target = document.getElementById(elId);
    if (!target) return;
    const html = siteComponents[compName];
    if (!html) return;
    target.innerHTML = html;
}

function setActiveNavLink() {
    const links = document.querySelectorAll('.nav-menu a');
    const current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === current);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    insertComponent('site-nav', 'nav');
    insertComponent('site-hero', 'heroCommittees');
    insertComponent('site-footer', 'footer');
    setActiveNavLink();
});
