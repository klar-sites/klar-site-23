// Mobile Nav Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('is-open');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
        });
    });
}

// Command Palette Logic
const cmdOverlay = document.getElementById('cmdOverlay');
const cmdInput = document.getElementById('cmdInput');

function openCmdPalette() {
    if (cmdOverlay) {
        cmdOverlay.classList.add('is-open');
        setTimeout(() => cmdInput && cmdInput.focus(), 50);
    }
}

function closeCmdPalette() {
    if (cmdOverlay) {
        cmdOverlay.classList.remove('is-open');
        if (cmdInput) cmdInput.value = '';
    }
}

// Expose to global scope for inline onclick attributes in HTML
window.openCmdPalette = openCmdPalette;
window.closeCmdPalette = closeCmdPalette;

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // ⌘K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdOverlay && cmdOverlay.classList.contains('is-open')) {
            closeCmdPalette();
        } else {
            openCmdPalette();
        }
    }
    
    // Escape to close modals/menus
    if (e.key === 'Escape') {
        if (cmdOverlay && cmdOverlay.classList.contains('is-open')) {
            closeCmdPalette();
        }
        if (navLinks && navLinks.classList.contains('is-open')) {
            navLinks.classList.remove('is-open');
        }
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');
            
            // Optional: Close other open items for a cleaner accordion
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('is-open');
                }
            });

            // Toggle current item
            item.classList.toggle('is-open', !isOpen);
        });
    }
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Feature Card Mouse Tracking for Glow
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update CSS variables for the radial gradient
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
    });
});
