const container = document.querySelector('#container');
const resizeBtn = document.querySelector('#resize-btn');
const clearBtn = document.querySelector('#clear-btn');
const blackBtn = document.querySelector('#black-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const shadingBtn = document.querySelector('#shading-btn');
const hoverDrawBtn = document.querySelector('#hover-draw-btn');
const clickDrawBtn = document.querySelector('#click-draw-btn');

let currentMode = 'black'; 
let currentSize = 16; 
let drawType = 'hover';
let isMouseDown = false;

window.addEventListener('mousedown', () => isMouseDown = true);
window.addEventListener('mouseup', () => isMouseDown = false);

function createGrid(squaresPerSide) {
    container.innerHTML = ''; 
    currentSize = squaresPerSide; 

    const totalSquares = squaresPerSide * squaresPerSide;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');

        square.style.flexBasis = `calc(100% / ${squaresPerSide})`;
        square.style.height = `calc(100% / ${squaresPerSide})`;
        
        square.currentAlpha = 0;

        function applyInk() {
            if (currentMode === 'black') {
                square.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            } else if (currentMode === 'rainbow') {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            } else if (currentMode === 'shading') {
                if (square.currentAlpha < 1) {
                    square.currentAlpha += 0.1;
                }
                square.style.backgroundColor = `rgba(0, 0, 0, ${square.currentAlpha})`;
            }
        }

        square.addEventListener('mouseenter', () => {
            if (drawType === 'hover') {
                applyInk();
            } else if (drawType === 'click' && isMouseDown) {
                applyInk();
            }
        });

        square.addEventListener('mousedown', (e) => {
            if (drawType === 'click') {
                e.preventDefault();
                applyInk();
            }
        });

        container.appendChild(square);
    }
}

hoverDrawBtn.addEventListener('click', () => {
    drawType = 'hover';
    hoverDrawBtn.classList.add('active');
    clickDrawBtn.classList.remove('active');
});

clickDrawBtn.addEventListener('click', () => {
    drawType = 'click';
    clickDrawBtn.classList.add('active');
    hoverDrawBtn.classList.remove('active');
});

// Clear Button
clearBtn.addEventListener('click', () => {
    createGrid(currentSize);
});

// Mode Buttons
blackBtn.addEventListener('click', () => {
    currentMode = 'black';
    blackBtn.classList.add('active');
    rainbowBtn.classList.remove('active');
    shadingBtn.classList.remove('active');
});

rainbowBtn.addEventListener('click', () => {
    currentMode = 'rainbow';
    rainbowBtn.classList.add('active');
    blackBtn.classList.remove('active');
    shadingBtn.classList.remove('active');
});

shadingBtn.addEventListener('click', () => {
    currentMode = 'shading';
    shadingBtn.classList.add('active');
    blackBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
});

createGrid(16);

resizeBtn.addEventListener('click', () => {
    let userInput = prompt('Enter new grid size (1 to 100):');
    let size = parseInt(userInput);

    if (size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert('Please enter a valid number between 1 and 100!');
    }
});

const secretMenu = document.querySelector('#secret-menu');
const closeSecretBtn = document.querySelector('#close-secret');

let inputBuffer = '';
const MAX_BUFFER_LENGTH = 10;

window.addEventListener('keydown', (e) => {
    
    inputBuffer += e.key.toLowerCase();
    
    if (inputBuffer.length > MAX_BUFFER_LENGTH) {
        inputBuffer = inputBuffer.slice(-MAX_BUFFER_LENGTH);
    }
    
    if (inputBuffer.endsWith('termo')) {
        secretMenu.classList.remove('hidden');
        inputBuffer = ''; 
    }

    if (inputBuffer.endsWith('yeltsa')) {
        inputBuffer = ''; 
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }

    if (e.key === 'Escape') {
        secretMenu.classList.add('hidden');
    }
});

closeSecretBtn.addEventListener('click', () => {
    secretMenu.classList.add('hidden');
});
