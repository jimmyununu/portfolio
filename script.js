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
        }else {
            entry.target.classList.remove('show');
        }
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
const particleCount = 10; 
const maxRadius = 1.4; 

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

























