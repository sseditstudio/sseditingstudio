// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const skillValue = bar.getAttribute('data-skill');
        bar.style.width = skillValue + '%';
    });
}

// Reviews Carousel
let currentReview = 1;
const totalReviews = 4;

function showReview(reviewNumber) {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    
    // Hide all reviews
    reviews.forEach(review => {
        review.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected review
    if (reviews[reviewNumber - 1]) {
        reviews[reviewNumber - 1].classList.add('active');
    }
    
    // Activate corresponding dot
    if (dots[reviewNumber - 1]) {
        dots[reviewNumber - 1].classList.add('active');
    }
    
    currentReview = reviewNumber;
}

function currentSlide(reviewNumber) {
    showReview(reviewNumber);
}

// Auto-play reviews carousel
function autoPlayReviews() {
    currentReview++;
    if (currentReview > totalReviews) {
        currentReview = 1;
    }
    showReview(currentReview);
}

// Start auto-play
setInterval(autoPlayReviews, 5000);

// Contact Form Handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const projectType = formData.get('projectType');
        const budget = formData.get('budget');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !projectType || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create mailto link
        const subject = `Video Editing Inquiry - ${projectType}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AProject Type: ${projectType}%0D%0ABudget: ${budget || 'Not specified'}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:editswithssedits@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showMessage('Thank you! Your email client will open with your message ready to send.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    
    // Add styles
    messageDiv.style.cssText = `
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 500;
        text-align: center;
        ${type === 'success' ? 
            'background: rgba(255, 107, 53, 0.1); color: #FF6B35; border: 1px solid rgba(255, 107, 53, 0.3);' : 
            'background: rgba(255, 84, 89, 0.1); color: #FF5459; border: 1px solid rgba(255, 84, 89, 0.3);'
        }
    `;
    
    // Insert message before form
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('software')) {
                // Animate skill bars when software section comes into view
                setTimeout(animateSkillBars, 500);
            }
            
            if (entry.target.classList.contains('software-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            
            if (entry.target.classList.contains('portfolio-item')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections
    const softwareSection = document.querySelector('.software');
    if (softwareSection) {
        observer.observe(softwareSection);
    }
    
    // Observe cards for staggered animations
    const animatedElements = document.querySelectorAll('.software-card, .service-card, .portfolio-item');
    animatedElements.forEach((element, index) => {
        // Initial state for animation
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(element);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Demo reel play button functionality
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        // For now, just show a message since we don't have an actual video
        showDemoMessage();
    });
}

function showDemoMessage() {
    const demoContainer = document.querySelector('.demo-video-container');
    if (demoContainer) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 107, 53, 0.9);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10;
        `;
        message.textContent = 'Please contact us to view our demo reel';
        
        demoContainer.style.position = 'relative';
        demoContainer.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// Portfolio item click handlers
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add click effect
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
        
        // You could add modal functionality here for viewing portfolio items
        console.log('Portfolio item clicked');
    });
});

// Smooth reveal animations for text elements
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.section-title, .about-text, .portfolio-description, .demo-description');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize text reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.section-title, .about-text, .portfolio-description, .demo-description');
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Initial check
    revealOnScroll();
});

// Add scroll listener for text reveals
window.addEventListener('scroll', revealOnScroll);

// Enhanced mobile menu animations
hamburger.addEventListener('click', () => {
    const spans = hamburger.querySelectorAll('span');
    
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Text reveal animations
    revealOnScroll();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active review
    showReview(1);
    
    console.log('SS Editing Studio website loaded successfully!');
});