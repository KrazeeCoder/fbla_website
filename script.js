// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Intersection Observer for Animations
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

// Animate elements on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .team-member, .event-card, .resource-card, .timeline-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/\D/g, ''));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current) + suffix;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target + suffix;
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Parallax Effect for Hero Section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Typing Effect for Hero Text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Resource Links - Add external link indicators
function setupResourceLinks() {
    const resourceLinks = document.querySelectorAll('.resource-link');
    
    resourceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for placeholder links (href="#")
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Placeholder link clicked:', link.textContent);
                return;
            }
            
            // Create a subtle animation for clicked links
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
            
            // For real external links, let them open normally
        });
    });
}

// Copy Schoology Code functionality
function setupSchoologyCode() {
    const schoologyCode = document.querySelector('.schoology-code');
    
    if (schoologyCode) {
        schoologyCode.style.cursor = 'pointer';
        schoologyCode.title = 'Click to copy code';
        
        schoologyCode.addEventListener('click', () => {
            const code = 'SX8W-MC47-NBZWJ';
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Visual feedback
                schoologyCode.style.background = '#16a34a';
                schoologyCode.textContent = 'Code Copied!';
                
                setTimeout(() => {
                    schoologyCode.style.background = '#2563eb';
                    schoologyCode.textContent = 'Code: ' + code;
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                schoologyCode.style.background = '#16a34a';
                schoologyCode.textContent = 'Code Copied!';
                
                setTimeout(() => {
                    schoologyCode.style.background = '#2563eb';
                    schoologyCode.textContent = 'Code: ' + code;
                }, 2000);
            });
        });
    }
}

// Loading animation
function showLoadingComplete() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbarBackground();
    updateParallax();
});

window.addEventListener('resize', () => {
    // Close mobile menu on resize
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    animateCounters();
    setupResourceLinks();
    setupSchoologyCode();
    showLoadingComplete();
    
    // Set initial navbar state
    updateNavbarBackground();
    updateActiveNavLink();
});

// Smooth scroll for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add hover effects for team members
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Photo Gallery System
const photoGalleries = {
    'qfc-gallery': [
        {
            src: 'images/2024_fall_food_drive/20241207_102741.jpg',
            title: 'QFC Food Drive Setup',
            description: 'Our FBLA members setting up the food collection station at QFC for the 2024 Fall Hunger Busters drive.'
        },
        {
            src: 'images/2024_fall_food_drive/20241207_132337.jpg',
            title: 'FBLA Members Volunteering',
            description: 'Team members working together during the afternoon shift, organizing donations and assisting shoppers.'
        },
        {
            src: 'images/2024_fall_food_drive/IMG_9174.JPG',
            title: 'Food Collection Results',
            description: 'The impressive results of our community food drive - helping local families through the Hopelink Foundation.'
        },
        {
            src: 'images/2024_fall_food_drive/IMG_20241207_175800.jpg',
            title: 'Community Volunteers',
            description: 'FBLA members and community volunteers working together at the end of a successful collection day.'
        }
    ],
    'easter-gallery': [
        {
            src: 'images/2025_easter_food_drive/IMG_8621.jpg',
            title: 'Easter Food Drive Setup',
            description: 'Setting up our Easter food drive collection point with festive decorations and organized donation areas.'
        },
        {
            src: 'images/2025_easter_food_drive/IMG_8625.jpg',
            title: 'Volunteers Organizing Donations',
            description: 'FBLA members carefully sorting and organizing food donations and Easter treats for local families.'
        },
        {
            src: 'images/2025_easter_food_drive/IMG_8639.jpg',
            title: 'Easter Food Collection',
            description: 'The growing collection of food items and holiday supplies gathered through community generosity.'
        },
        {
            src: 'images/2025_easter_food_drive/IMG_8646.jpg',
            title: 'Community Impact',
            description: 'Final preparations before distributing Easter food packages to families in need throughout our community.'
        }
    ]
};

let currentGallery = '';
let currentPhotoIndex = 0;

// Open Lightbox
function openLightbox(galleryName, photoIndex) {
    currentGallery = galleryName;
    currentPhotoIndex = photoIndex;
    
    const modal = document.getElementById('lightbox-modal');
    const image = document.getElementById('lightbox-image');
    
    const gallery = photoGalleries[galleryName];
    const photo = gallery[photoIndex];
    
    image.src = photo.src;
    image.alt = photo.title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add animation delay for smooth entrance
    setTimeout(() => {
        image.style.opacity = '1';
    }, 100);
}

// Close Lightbox
function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Change Photo
function changePhoto(direction) {
    const gallery = photoGalleries[currentGallery];
    currentPhotoIndex += direction;
    
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = gallery.length - 1;
    } else if (currentPhotoIndex >= gallery.length) {
        currentPhotoIndex = 0;
    }
    
    const image = document.getElementById('lightbox-image');
    const photo = gallery[currentPhotoIndex];
    
    // Fade out
    image.style.opacity = '0';
    
    setTimeout(() => {
        image.src = photo.src;
        image.alt = photo.title;
        
        // Fade in
        image.style.opacity = '1';
    }, 150);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                changePhoto(-1);
                break;
            case 'ArrowRight':
                changePhoto(1);
                break;
        }
    }
});

// Close lightbox when clicking outside the image
document.getElementById('lightbox-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeLightbox();
    }
});

// Prevent lightbox content from closing when clicked
document.querySelector('.lightbox-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox-modal').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightbox-modal').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next photo
            changePhoto(1);
        } else {
            // Swipe right - previous photo
            changePhoto(-1);
        }
    }
} 