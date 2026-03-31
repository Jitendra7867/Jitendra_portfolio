// ==========================================
// Theme Toggle Logic
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    const icon = themeToggle.querySelector('i');

    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    localStorage.setItem('theme', theme);
}

// Check saved theme or use dark theme by default
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    // Default to dark theme as per modern aesthetic preferences
    setTheme('dark');
}

// Theme Toggle Event Listener
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// ==========================================
// Typing Animation
// ==========================================
const typingTextElement = document.getElementById('typing-text');
const words = ["Software Developer", "Java & C++ Developer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 150;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Remove char
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 60; // Faster deleting
    } else {
        // Add char
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 120; // Normal typing
    }

    // Pause before deleting
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeDelay = 1500; // Pause at end of word
    }
    // Switch to next word
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeDelay = 400; // Pause before new word
    }

    setTimeout(typeEffect, typeDelay);
}

// Start typing animation on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    if (words.length) setTimeout(typeEffect, 1000); // slight delay before start
});

// ==========================================
// Scroll Reveal Animations & Active Nav
// ==========================================
const sections = document.querySelectorAll('section');
const reveals = document.querySelectorAll('.reveal');

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, observerOptions);

reveals.forEach(reveal => {
    scrollObserver.observe(reveal);
});

// Active Nav Link highlight on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Navbar Box Shadow on Scroll
    const navbar = document.querySelector('.navbar');
    if (scrollY > 20) {
        navbar.style.boxShadow = "var(--shadow)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

// ==========================================
// Form Submission Handling (Gmail Direct Compose)
// ==========================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop standard redirect
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);
        
        // Build Gmail Compose Link
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=jitendra25042006@gmail.com&su=${subject}&body=${body}`;
        
        // Open link directly into a new tab
        window.open(gmailLink, '_blank');
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Opening Gmail... <i class="fa-solid fa-check"></i>';
        
        // Reset the form after a short delay
        setTimeout(() => {
            btn.innerHTML = originalText;
            contactForm.reset();
        }, 3000);
    });
}






