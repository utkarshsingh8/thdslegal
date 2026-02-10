// THDS Legal - Main JavaScript
// Established 1990

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// CONTACT FORM - WHATSAPP INTEGRATION
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const matterType = document.getElementById('matterType').value;
        const description = document.getElementById('description').value.trim();
        
        // Validate form
        if (!name || !phone || !matterType || !description) {
            alert('Please fill in all fields before submitting.');
            return;
        }
        
        // Create WhatsApp message
        const message = `*Consultation Request - THDS Legal*\n\n` +
                       `*Name:* ${name}\n` +
                       `*Phone:* ${phone}\n` +
                       `*Matter Type:* ${matterType}\n` +
                       `*Description:*\n${description}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp number (with country code, no + or spaces)
        const whatsappNumber = '918650000979';
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in new window
        window.open(whatsappURL, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Show success message
        setTimeout(() => {
            alert('Thank you for your consultation request. You will be redirected to WhatsApp to complete your submission.');
        }, 100);
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in animation
const animateElements = document.querySelectorAll('.practice-card, .legacy-item, .office-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// LOADING OPTIMIZATION
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// PREVENT FORM RESUBMISSION ON REFRESH
// ========================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
