// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
            
            // Toggle icon animation
            const toggleIcon = this.querySelector('.toggle-icon');
            toggleIcon.classList.toggle('active');
            
            if (toggleIcon.classList.contains('active')) {
                toggleIcon.style.background = 'transparent';
                toggleIcon.style.transform = 'rotate(180deg)';
                toggleIcon.style.transition = 'all 0.3s ease';
                
                const before = window.getComputedStyle(toggleIcon, '::before');
                const after = window.getComputedStyle(toggleIcon, '::after');
                
                toggleIcon.style.setProperty('--before-transform', 'rotate(45deg) translate(0, 0)');
                toggleIcon.style.setProperty('--after-transform', 'rotate(-45deg) translate(0, 0)');
            } else {
                toggleIcon.style.background = '';
                toggleIcon.style.transform = '';
                
                toggleIcon.style.setProperty('--before-transform', '');
                toggleIcon.style.setProperty('--after-transform', '');
            }
        });
    }

    // Dropdown toggle for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropdown-toggle');
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Categories carousel
    const categoriesSlider = document.getElementById('categoriesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (categoriesSlider && prevBtn && nextBtn) {
        let slidePosition = 0;
        const slideWidth = 330; // Width of each slide + gap
        const slidesVisible = Math.floor(categoriesSlider.offsetWidth / slideWidth);
        const totalSlides = document.querySelectorAll('.category-item').length;
        const maxSlidePosition = Math.max(0, totalSlides - slidesVisible);
        
        prevBtn.addEventListener('click', function() {
            if (slidePosition > 0) {
                slidePosition--;
                updateSliderPosition();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (slidePosition < maxSlidePosition) {
                slidePosition++;
                updateSliderPosition();
            }
        });
        
        function updateSliderPosition() {
            categoriesSlider.style.transform = `translateX(-${slidePosition * slideWidth}px)`;
        }
        
        // Auto slide
        let autoSlideInterval = setInterval(autoSlide, 5000);
        
        function autoSlide() {
            if (slidePosition < maxSlidePosition) {
                slidePosition++;
            } else {
                slidePosition = 0;
            }
            updateSliderPosition();
        }
        
        // Pause auto slide on hover
        categoriesSlider.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        categoriesSlider.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(autoSlide, 5000);
        });
        
        // Update on window resize
        window.addEventListener('resize', function() {
            const newSlidesVisible = Math.floor(categoriesSlider.offsetWidth / slideWidth);
            const newMaxSlidePosition = Math.max(0, totalSlides - newSlidesVisible);
            
            if (slidePosition > newMaxSlidePosition) {
                slidePosition = newMaxSlidePosition;
                updateSliderPosition();
            }
        });
    }

    // Scroll animation for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // Check on initial load

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌓';
            }
        });
    }

    // Hero carousel
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        heroSlides.forEach(slide => {
            slide.removeAttribute('active');
        });
        
        heroSlides[index].setAttribute('active', '');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    // Only set up carousel if there are multiple slides
    if (heroSlides.length > 1) {
        setInterval(nextSlide, 5000);
    }

    // Parallax effect
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxOffset = scrollPosition * 0.4;
            
            parallaxBg.style.backgroundPositionY = `-${parallaxOffset}px`;
        });
    }
});