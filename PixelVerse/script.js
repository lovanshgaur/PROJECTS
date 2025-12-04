document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. HERO PARALLAX EFFECT
    const heroImage = document.getElementById('heroImage');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < 800) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        }
    });


    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });


    // 4. SIMPLE MOBILE MENU TOGGLE 
    const menuBtn = document.querySelector('.nav-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        const isHidden = window.getComputedStyle(navLinks).display === 'none';
        if (isHidden) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#000';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid #333';
        } else {
            navLinks.style.display = '';
            navLinks.style.position = '';
            navLinks.style.backgroundColor = '';
        }
    });
});