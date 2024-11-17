const codeOutput = document.getElementById('code-output');
const runButton = document.getElementById('run-button');
const consoleContainer = document.getElementById('console-container');
const introSection = document.querySelector('.intro');

const codeLines = [
    'System.out.println("Hello, I\'m James.");',
    'System.out.println("I\'m a software engineer.");',
];

let lineIndex = 0;
let charIndex = 0;
const typingSpeed = 25; 

function typeCode() {
    if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];

        if (charIndex < currentLine.length) {
            codeOutput.textContent += currentLine[charIndex];
            charIndex++;
            setTimeout(typeCode, typingSpeed);
        } else {
            codeOutput.textContent += '\n';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeCode, typingSpeed);
        }
    } else {
        runButton.style.display = 'block';
    }
}
typeCode();

runButton.addEventListener('click', () => {
    runButton.style.display = 'none'; 
    consoleContainer.classList.remove('console-middle');
    consoleContainer.classList.add('console-bottom'); 
    introSection.classList.remove('hiddenint');
    consoleContainer.classList.add('hidden');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }//else {
           // entry.target.classList.remove('show');
        //}
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const dropdownContent = button.nextElementSibling;
            dropdownContent.classList.toggle("show");
        });
    });
});

document.getElementById("scroll-to-about").addEventListener("click", () => {
    const aboutMeSection = document.getElementById("about-me");
    aboutMeSection.scrollIntoView({ behavior: "smooth" });
});
const slideIndices = {};
function navigateCarousel(direction, carouselId) {
    const carousel = document.querySelector(`#${carouselId} .carousel`);
    const items = carousel.querySelectorAll('.carousel-item');
    if (!(carouselId in slideIndices)) {
        slideIndices[carouselId] = 0;
    }

    let activeIndex = slideIndices[carouselId];
    items[activeIndex].classList.remove('active');
    activeIndex += direction;
    if (activeIndex < 0) {
        activeIndex = items.length - 1; 
    } else if (activeIndex >= items.length) {
        activeIndex = 0; 
    }
    items[activeIndex].classList.add('active');
    slideIndices[carouselId] = activeIndex;
}

document.querySelectorAll('#carousel-one .carousel-item')[0].classList.add('active');
document.querySelectorAll('#carousel-two .carousel-item')[0].classList.add('active');


const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
particleCount = 10; 
maxRadius = 1.4; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx; 
        this.dy = dy; 
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, 
                            ${Math.floor(Math.random() * 256)}, 
                            ${Math.floor(Math.random() * 256)})`;
        ctx.fillStyle = randomColor; 
        ctx.fill();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * maxRadius + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 2; 
        const dy = (Math.random() - 0.5) * 2; 
        particlesArray.push(new Particle(x, y, dx, dy, radius));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => particle.update());
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
animate();

document.addEventListener("DOMContentLoaded", () => {
    const blackHole = document.getElementById("blackHole");
    const blackHoleButton = document.getElementById("blackHoleButton");
    const blackHoleSound = document.getElementById("blackHoleSound");
    const contentElements = document.querySelectorAll(".content");
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    let currentSize = 50;
    const visibleElements = new Set();
    const particlesArray = [];
    const maxRadius = 1.4;
    const MAX_PARTICLES = 100;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                visibleElements.add(entry.target);
                entry.target.classList.add("show");
            } else {
                visibleElements.delete(entry.target);
            }
        });
    });

    contentElements.forEach((element) => observer.observe(element));

    blackHoleButton.addEventListener("click", () => {
        blackHole.style.display = "block";
        blackHoleSound.play();

        const growBlackHole = () => {
            let size = 50; // Initial size
            const maxSize = Math.min(window.innerWidth + 2000, window.innerHeight +2000); 

            function grow() {
                if (size < maxSize) {
                    size += .1; // Growth rate
                    blackHole.style.width = `${size}px`;
                    blackHole.style.height = `${size}px`;
                    blackHole.style.borderRadius = "50%"; 
                    requestAnimationFrame(grow);
                }
            }

            grow();
        };

    
        growBlackHole();

        const suckInElements = () => {
            const screenCenterX = window.innerWidth / 2;
            const screenCenterY = window.innerHeight / 2;

            Array.from(visibleElements).forEach((element, index) => {
                setTimeout(() => {
                    const elementRect = element.getBoundingClientRect();
                    const elementCenterX = elementRect.left + elementRect.width / 2;
                    const elementCenterY = elementRect.top + elementRect.height / 2;

                    const dx = screenCenterX - elementCenterX;
                    const dy = screenCenterY - elementCenterY;

                    // Preserve initial position to prevent jumping
                    element.style.position = "fixed";
                    element.style.left = `${elementRect.left}px`;
                    element.style.top = `${elementRect.top}px`;
                    element.style.margin = "0";
                    element.style.zIndex = "1000";

                    // Smoothly move element to the black hole center
                    requestAnimationFrame(() => {
                        element.style.transition = "transform 2.5s ease, opacity 2.5s ease";
                        element.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
                        element.style.opacity = "0";
                    });

                    // Hide the element after animation
                    setTimeout(() => {
                        element.style.display = "none";
                        visibleElements.delete(element);

                        generateParticles(elementCenterX, elementCenterY);
                    }, 2500); // Match animation duration
                }, index * 500); // Stagger animation for each element
            });

            if (visibleElements.size > 0) {
                setTimeout(suckInElements, 2000);
            }
        };

        // Start sucking in elements
        suckInElements();
    });

    function generateParticles(x, y) {
        const particleCount = 2;
        for (let i = 0; i < particleCount; i++) {
            if (particlesArray.length >= MAX_PARTICLES) {
                particlesArray.shift();
            }

            const radius = Math.random() * maxRadius + 1;
            const angle = Math.random() * Math.PI * 2;
            const orbitRadius = Math.pow(Math.random(), 2) * 800 + 30;

            const angularVelocity = 0.09 / orbitRadius;

            particlesArray.push({ x, y, radius, angle, orbitRadius, angularVelocity });
        }

        animateParticles();
    }

    function animateParticles() {
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach((particle) => {
            particle.angle += particle.angularVelocity;
            particle.x = screenCenterX + particle.orbitRadius * Math.cos(particle.angle);
            particle.y = screenCenterY + particle.orbitRadius * Math.sin(particle.angle);

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
});

// Array to hold all audio elements
const audioElements = document.querySelectorAll('audio');

// Get controller elements
const playPauseButton = document.getElementById('play-pause');
const volumeControl = document.getElementById('volume');

// Set default volume
audioElements.forEach(audio => (audio.volume = volumeControl.value));

// Play or Pause all audio
playPauseButton.addEventListener('click', () => {
  if (playPauseButton.textContent === 'Play') {
    audioElements.forEach(audio => audio.play());
    playPauseButton.textContent = 'Pause';
  } else {
    audioElements.forEach(audio => audio.pause());
    playPauseButton.textContent = 'Play';
  }
});
volumeControl.addEventListener('input', (e) => {
    const volume = e.target.value;
    audioElements.forEach(audio => (audio.volume = volume));
  });





    
    
 















  



























