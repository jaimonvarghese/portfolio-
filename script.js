// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Effect for Hero Section
const typedTextSpan = document.getElementById("typed");
const textArray = ["Software Developer", "Flutter Developer", "Python Developer", "Frontend Enthusiast", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });

    // Animate Skills section when visible
    const skillContainer = document.querySelector('.skills-circle-container');
    if (skillContainer) {
        const sectionTop = skillContainer.getBoundingClientRect().top;
        if (sectionTop < windowHeight - elementVisible) {
            skillContainer.classList.add('active');
        }
    }
};

// --- Contact Form Submission ---
const contactForm = document.getElementById('submit-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // GOOGLE APPS SCRIPT URL - User needs to replace this after deployment
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzi9BdDEB5NWS0ZW_0eAfFfutjuGxIHoYumas_P2p4GkNV9fPy3o8x0I_4KAxyiBtM/exec';

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // Important for Apps Script
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                // Since we use no-cors, we won't get a proper response body, but success means it was sent
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Oops! Something went wrong. Please try again later.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Active Link highlighting on scroll
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
