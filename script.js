// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeFAQ();
    initializeForms();
    initializeScrollAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(239, 235, 224, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(239, 235, 224, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Form validation and submission
function initializeForms() {
    initializeSignupForm();
    initializeDemoForm();
}

function initializeSignupForm() {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const nameError = document.getElementById('signupNameError');
    const emailError = document.getElementById('signupEmailError');
    const successMessage = document.getElementById('signupSuccess');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors([nameError, emailError]);
        
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameError, 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Signing up...';
            
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form after success
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.classList.remove('show');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Sign Up for Beta';
                }, 3000);
            }, 1000);
        }
    });

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
        } else {
            clearErrors([nameError]);
        }
    });

    emailInput.addEventListener('blur', function() {
        if (this.value.trim() && !isValidEmail(this.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            clearErrors([emailError]);
        }
    });
}

function initializeDemoForm() {
    const form = document.getElementById('demoForm');
    const nameInput = document.getElementById('demoName');
    const emailInput = document.getElementById('demoEmail');
    const messageInput = document.getElementById('demoMessage');
    const nameError = document.getElementById('demoNameError');
    const emailError = document.getElementById('demoEmailError');
    const messageError = document.getElementById('demoMessageError');
    const successMessage = document.getElementById('demoSuccess');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors([nameError, emailError, messageError]);
        
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameError, 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageError, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form after success
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.classList.remove('show');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Request Demo';
                }, 3000);
            }, 1000);
        }
    });

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
        } else {
            clearErrors([nameError]);
        }
    });

    emailInput.addEventListener('blur', function() {
        if (this.value.trim() && !isValidEmail(this.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            clearErrors([emailError]);
        }
    });

    messageInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
        } else {
            clearErrors([messageError]);
        }
    });
}

// Utility functions for form validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors(errorElements) {
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-content, .features-text, .features-image, .engagement-text, .engagement-image, .signup-content, .demo-content, .faq-container');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for CTA buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Add hover effects for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
