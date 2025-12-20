// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 1000,
    once: true,
});

// Close loader when page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
    }, 3000);
});

// Music toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    
    // Music starts playing by default
    bgMusic.volume = 0.3; // Set volume to 30%
    bgMusic.play().catch(e => console.log("Autoplay prevented: ", e));
    
    musicIcon.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.style.color = '#d4a76a';
            musicIcon.classList.add('playing');
        } else {
            bgMusic.pause();
            musicIcon.style.color = '#8e5e3d';
            musicIcon.classList.remove('playing');
        }
    });
});

// Countdown timer
function updateCountdown() {
    // Set the wedding date (adjust this to actual wedding date)
    const weddingDate = new Date('November 26, 2025 10:00:00').getTime();
    const now = new Date().getTime();
    const timeRemaining = weddingDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('day').textContent = days.toString().padStart(2, '0');
        document.getElementById('hour').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minute').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('second').textContent = seconds.toString().padStart(2, '0');
    } else {
        // If wedding date has passed, show a different message
        document.getElementById('day').textContent = '00';
        document.getElementById('hour').textContent = '00';
        document.getElementById('minute').textContent = '00';
        document.getElementById('second').textContent = '00';
        // Optionally, update the message to indicate the event has passed
        if (timeRemaining < 0) {
            // Update message or show a different UI
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// RSVP Form Submission
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const confirmValue = document.querySelector('input[name="confirm"]:checked').value;
    const message = document.getElementById('message').value;
    
    // Create RSVP object
    const rsvpData = {
        name: name,
        attendance: attendance,
        confirmation: confirmValue,
        message: message,
        timestamp: new Date()
    };
    
    // In a real application, you would send this data to a server
    // For this example, we'll store in localStorage
    let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    rsvps.push(rsvpData);
    localStorage.setItem('rsvps', JSON.stringify(rsvps));
    
    // Show confirmation message
    alert(`Terima kasih ${name} atas konfirmasi kehadiran Anda!`);
    
    // Reset form
    this.reset();
});

// Function to retrieve RSVPs (for admin purposes)
function getAllRsvps() {
    return JSON.parse(localStorage.getItem('rsvps')) || [];
}

// Wishes Form Submission
document.getElementById('wishes-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('wishes-name').value;
    const message = document.getElementById('wishes-message').value;
    const date = new Date().toLocaleDateString('id-ID');
    
    // Create wishes object
    const wishData = {
        name: name,
        message: message,
        date: date
    };
    
    // Store in localStorage
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.push(wishData);
    localStorage.setItem('wishes', JSON.stringify(wishes));
    
    // Create new wishes element
    const wishesContainer = document.getElementById('wishes-container');
    const newWish = document.createElement('div');
    newWish.className = 'wishes-item';
    newWish.innerHTML = `
        <p><strong>${name}</strong> - ${message}</p>
        <small>${date}</small>
    `;
    
    // Add new wish to the top of the container
    wishesContainer.insertBefore(newWish, wishesContainer.firstChild);
    
    // Reset form
    this.reset();
});

// Function to load existing wishes on page load
function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    const wishesContainer = document.getElementById('wishes-container');
    
    // Clear existing wishes except the template
    wishesContainer.innerHTML = '';
    
    // Add wishes in reverse order (newest first)
    for (let i = wishes.length - 1; i >= 0; i--) {
        const wish = wishes[i];
        const wishElement = document.createElement('div');
        wishElement.className = 'wishes-item';
        wishElement.innerHTML = `
            <p><strong>${wish.name}</strong> - ${wish.message}</p>
            <small>${wish.date}</small>
        `;
        wishesContainer.appendChild(wishElement);
    }
}

// Load wishes when page loads
document.addEventListener('DOMContentLoaded', loadWishes);

// Gallery lightbox functionality
function openLightbox(imgSrc, altText) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create image
    const lightboxImg = document.createElement('img');
    lightboxImg.src = imgSrc;
    lightboxImg.alt = altText;
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 4px;
    `;
    
    // Add image to overlay
    overlay.appendChild(lightboxImg);
    
    // Add click event to close lightbox
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
    
    // Add overlay to body
    document.body.appendChild(overlay);
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when lightbox is closed
    overlay.addEventListener('transitionend', function() {
        if (!overlay.parentNode) {
            document.body.style.overflow = 'auto';
        }
    });
}

// Add click events to gallery images
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const imgElement = this.querySelector('img');
            openLightbox(imgElement.src, imgElement.alt);
        });
    });
});

// Add scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTopButton = document.getElementById('scroll-top');
    
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

// Function for scroll to top
document.querySelector('.scroll-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show location function
function showLocation() {
    // Open Google Maps to the wedding venue
    window.open('https://www.google.com/maps/place/Gedung+Serbaguna+Puri+Melati,+Jl.+Raya+Bogor,+Jakarta', '_blank');
}

// Animation on scroll enhancement
function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card, .couple-card, .gallery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation elements
document.querySelectorAll('.event-card, .couple-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Listen for scroll event
window.addEventListener('scroll', animateOnScroll);
// Initial check
animateOnScroll();

// Add parallax effect to home section background
window.addEventListener('scroll', function() {
    const homeSection = document.querySelector('.home-section');
    const scrollPosition = window.pageYOffset;
    
    if (homeSection) {
        homeSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Gallery Slider Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');

// Initialize slider
showSlides(slideIndex);

// Auto slide every 5 seconds
setInterval(() => {
    plusSlides(1);
}, 5000);

// Next/previous controls
function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

// Thumbnail controls
function currentSlide(n) {
    slideIndex = n - 1;
    showSlides(slideIndex);
}

// Main function to show slides
function showSlides(n) {
    // Reset all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Reset all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Adjust slide index if out of bounds
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Show current slide and dot
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

// Change slide function for buttons
function changeSlide(n) {
    plusSlides(n);
}