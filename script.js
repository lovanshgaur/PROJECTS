document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    
    console.log("Hey, It's Lovansh Gaur")

    // INITIAL REVEAL
    const tlLoad = gsap.timeline();
    tlLoad.to(document.body, { opacity: 1, duration: 0.5 })
        .to('.reveal-text', {
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.1
        }, "-=0.2");
    gsap.from('.hero-desc', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8
    });

    // LENIS SMOOTH SCROLL
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // IMAGE REVEAL ON SCROLL
    gsap.utils.toArray('.reveal-img').forEach(container => {
        let img = container.querySelector('img');

        // Reveal animation
        gsap.from(container, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            }
        });

        // Image zoom animation
        gsap.from(img, {
            scale: 1.4,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            }
        });
    });

    // 4. HEADER SCROLL LOGIC
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // CURSOR LOGIC
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.querySelector('.cursor');

        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('.interactable').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                console.log('first')
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }
});

// Theme Switcher Logic
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
} else {
    htmlElement.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'light') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
})

//IST Clock Logic
function updateClock() {
    const clockElement = document.getElementById('clock');
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const timeString = new Date().toLocaleTimeString('en-US', options);
    clockElement.textContent = timeString;
}
setInterval(updateClock, 1000);

updateClock();

//GoTo Home
function goto() {
    window.location.href = "https://lovansh.me";

}


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let works = data.works.filter(item => item.toDisplay === true);
        projectCount(works.length);
        displayProjects(works);

    })
    .catch(error => console.error('Error loading JSON:', error));

function projectCount(n) {
    let projectNumber = document.getElementById('projectCount');
    projectNumber.innerText = `(${n})`;
}

let projectsContainer = document.getElementById('projects-grid');

function displayProjects(projects) {

    projects.forEach(project => {
        let projectCard = document.createElement('a');

        projectCard.classList.add('project-item', 'interactable');
        projectCard.href = project.link;
        projectCard.target = "_blank";

        projectCard.innerHTML = `

            <div class="p-img-container reveal-img">
                <img src="${project.img}" alt="${project.title}">
            </div>

            <div class="p-meta">
                <div>
                    <h3 class="p-title">${project.title}</h3>
                    <p class="p-desc">${project.desc}</p>
                    <div class="p-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <span class="p-year">${project.year}</span>
            </div>

        `;
        projectsContainer.appendChild(projectCard);
    })
}