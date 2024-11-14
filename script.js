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
















