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

function applyInk(square) {
    if (currentMode === 'black') {
        square.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    } else if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (currentMode === 'shading') {
        
        let alpha = parseFloat(square.dataset.alpha || 0);
        if (alpha < 1) {
            alpha += 0.1;
            square.dataset.alpha = alpha;
        }
        square.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
    }
}

function createGrid(squaresPerSide) {
    container.textContent = ''; 
    currentSize = squaresPerSide; 

    
    container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;

    const fragment = document.createDocumentFragment();
    const totalSquares = squaresPerSide * squaresPerSide;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        
        square.addEventListener('mouseenter', () => {
            if (drawType === 'hover') {
                applyInk(square);
            } else if (drawType === 'click' && isMouseDown) {
                applyInk(square);
            }
        });

        square.addEventListener('mousedown', (e) => {
            if (drawType === 'click') {
                e.preventDefault();
                applyInk(square);
            }
        });

        fragment.appendChild(square);
    }

    container.appendChild(fragment);
}

function updateActiveButton(activeBtn, ...inactiveBtns) {
    activeBtn.classList.add('active');
    inactiveBtns.forEach(btn => btn.classList.remove('active'));
}

hoverDrawBtn.addEventListener('click', () => {
    drawType = 'hover';
    updateActiveButton(hoverDrawBtn, clickDrawBtn);
});

clickDrawBtn.addEventListener('click', () => {
    drawType = 'click';
    updateActiveButton(clickDrawBtn, hoverDrawBtn);
});

clearBtn.addEventListener('click', () => createGrid(currentSize));

blackBtn.addEventListener('click', () => {
    currentMode = 'black';
    updateActiveButton(blackBtn, rainbowBtn, shadingBtn);
});

rainbowBtn.addEventListener('click', () => {
    currentMode = 'rainbow';
    updateActiveButton(rainbowBtn, blackBtn, shadingBtn);
});

shadingBtn.addEventListener('click', () => {
    currentMode = 'shading';
    updateActiveButton(shadingBtn, blackBtn, rainbowBtn);
});

createGrid(16);

resizeBtn.addEventListener('click', () => {
    const userInput = prompt('Enter new grid size (1 to 100):');
    const size = parseInt(userInput);

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
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // 🎵 Never gonna give you up...
    }

    if (e.key === 'Escape') {
        secretMenu.classList.add('hidden');
    }
});

closeSecretBtn.addEventListener('click', () => secretMenu.classList.add('hidden'));
