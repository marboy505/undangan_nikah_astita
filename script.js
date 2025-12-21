// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 1000,
    once: true,
});

// Close loader when page loads
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.display = 'none';
        }, 3000);
    }
});

// Music toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');

    bgMusic.volume = 0.3; // Set volume to 30%

    // Music toggle functionality
    musicIcon.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play()
                .then(() => {
                    musicIcon.style.color = '#d4a76a';
                    musicIcon.classList.add('playing');
                })
                .catch(e => {
                    console.log("Music play prevented: ", e);
                    // Show user prompt to enable audio if needed
                    alert("Audio playback was prevented. Please interact with the page to enable music.");
                });
        } else {
            bgMusic.pause();
            musicIcon.style.color = '#8e5e3d';
            musicIcon.classList.remove('playing');
        }
    });
});

// Countdown timer
function updateCountdown() {
    // Check if countdown elements exist
    const dayElement = document.getElementById('day');
    const hourElement = document.getElementById('hour');
    const minuteElement = document.getElementById('minute');
    const secondElement = document.getElementById('second');

    // Only run if countdown elements exist
    if (!dayElement || !hourElement || !minuteElement || !secondElement) {
        return;
    }

    // Set the wedding date (adjust this to actual wedding date)
    const weddingDate = new Date('January 11, 2026 08:00:00').getTime();
    const now = new Date().getTime();
    const timeRemaining = weddingDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        dayElement.textContent = days.toString().padStart(2, '0');
        hourElement.textContent = hours.toString().padStart(2, '0');
        minuteElement.textContent = minutes.toString().padStart(2, '0');
        secondElement.textContent = seconds.toString().padStart(2, '0');
    } else {
        // If wedding date has passed, show a different message
        dayElement.textContent = '00';
        hourElement.textContent = '00';
        minuteElement.textContent = '00';
        secondElement.textContent = '00';
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

// Gallery lightbox functionality with navigation
let currentLightboxIndex = 0;
const galleryImages = [
    'images/optimized/IMG_3415_optimized.jpg',
    'images/optimized/IMG_3416_optimized.jpg',
    'images/optimized/IMG_3420_optimized.jpg',
    'images/optimized/IMG_3423_optimized.jpg',
    'images/optimized/IMG_3426_optimized.jpg',
    'images/optimized/IMG_3428_optimized.jpg',
    'images/optimized/IMG_3429_optimized.jpg',
    'images/optimized/IMG_3432_optimized.jpg',
    'images/optimized/IMG_3433_optimized.jpg',
    'images/optimized/IMG_3434(1)_optimized.jpg',
    'images/optimized/IMG_3438_optimized.jpg'
];

function openLightbox(imgSrc, altText, index) {
    currentLightboxIndex = index;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightbox';

    // Create content container
    const content = document.createElement('div');
    content.className = 'lightbox-content';

    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeLightbox;

    // Create image
    const lightboxImg = document.createElement('img');
    lightboxImg.src = imgSrc;
    lightboxImg.alt = altText;
    lightboxImg.id = 'lightbox-img';

    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.onclick = (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    };

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    };

    // Create image counter
    const counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    counter.innerHTML = `${index + 1} / ${galleryImages.length}`;
    counter.style.position = 'absolute';
    counter.style.top = '20px';
    counter.style.left = '30px';
    counter.style.color = 'white';
    counter.style.fontSize = '1.2rem';
    counter.style.zIndex = '10000';
    counter.style.background = 'rgba(0, 0, 0, 0.5)';
    counter.style.padding = '5px 10px';
    counter.style.borderRadius = '4px';

    // Assemble lightbox
    overlay.appendChild(closeBtn);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    overlay.appendChild(counter);
    content.appendChild(lightboxImg);
    overlay.appendChild(content);

    // Add click event to close lightbox when clicking outside image
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    });

    // Add overlay to body
    document.body.appendChild(overlay);

    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyboard);
    }
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    } else if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.querySelector('.lightbox-counter');
    if (lightboxImg) {
        lightboxImg.src = galleryImages[currentLightboxIndex];
        lightboxImg.alt = `Galeri ${currentLightboxIndex + 1}`;
    }
    if (counter) {
        counter.innerHTML = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
    }
}

function handleKeyboard(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
}

// Copy to clipboard functionality
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;

    // Create temporary input
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show success message
    alert('Nomor rekening berhasil disalin!');
}

// Copy address functionality
function copyAddress() {
    const addressText = `Muhammad Irfan & Astita Suntiasih
Jl. Contoh Alamat No. 123, RT/RW 001/002
Kelurahan Contoh, Kecamatan Contoh
Kota Bandung, Jawa Barat 40123
Telepon: +62 812-3456-7890`;

    // Create temporary textarea
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = addressText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);

    // Show success message
    alert('Alamat berhasil disalin!');
}

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
    window.open('https://maps.app.goo.gl/prdaRWKFNxdDBQSi7', '_blank');
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

// Gallery carousel - change main image
function changeMainImage(imageSrc, index) {
    const mainImg = document.getElementById('main-gallery-img');
    if (mainImg) {
        mainImg.src = imageSrc;
        mainImg.alt = `Galeri ${index + 1}`;
    }
}

// Gallery slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Show the current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

// Next/previous controls
function plusSlides(n) {
    currentSlide += n;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

// Thumbnail image controls
function currentSlideIndex(n) {
    showSlide(n);
}

// Auto slide
let slideInterval = setInterval(() => {
    plusSlides(1);
}, 5000);

// Pause auto slide on hover
const gallerySlider = document.querySelector('.gallery-slider-container');
if (gallerySlider) {
    gallerySlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    gallerySlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            plusSlides(1);
        }, 5000);
    });
}

// Initialize gallery slider if it exists
if (slides.length > 0) {
    showSlide(0);
}

// Gallery grid lightbox functionality
document.querySelectorAll('.gallery-item img').forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(img.src, img.alt, index);
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.opacity = '1';
        header.style.visibility = 'visible';
    } else {
        header.style.opacity = '0';
        header.style.visibility = 'hidden';
    }
});