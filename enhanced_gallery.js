// Enhanced Gallery Slider Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');

// Initialize slider
showSlides(slideIndex);

// Auto slide every 6 seconds
setInterval(() => {
    plusSlides(1);
}, 6000);

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

// Main function to show slides with improved transitions
function showSlides(n) {
    // Reset all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(100%)';
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

    // Show current slide with animation
    if (slides[slideIndex]) {
        slides[slideIndex].style.opacity = '1';
        slides[slideIndex].style.transform = 'translateX(0)';
        setTimeout(() => {
            slides[slideIndex].classList.add('active');
        }, 50);
    }

    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

// Change slide function for buttons
function changeSlide(n) {
    plusSlides(n);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        plusSlides(1);
    } else if (e.key === 'ArrowLeft') {
        plusSlides(-1);
    }
});

// Add touch swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.gallery-slider').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.gallery-slider').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe to be considered
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left - next slide
        plusSlides(1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right - previous slide
        plusSlides(-1);
    }
}