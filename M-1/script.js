const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const levelElement = document.getElementById('level');
const restartBtn = document.getElementById('restart-btn');
const overlay = document.getElementById('game-over-overlay');

const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

let score = 0;
let level = 1;
let highScore = localStorage.getItem('hauntedSnakeHighScore') || 0;
highScoreElement.textContent = highScore;

let snake = [];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let baseSpeed = 120;
let currentSpeed = baseSpeed;
let gameInterval;
let isGameRunning = false;
let lastRenderTime = 0;

function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    score = 0;
    level = 1;
    dx = 1;
    dy = 0;
    currentSpeed = baseSpeed;

    scoreElement.textContent = score;
    levelElement.textContent = level;

    restartBtn.classList.add('hidden');
    overlay.classList.add('hidden');

    spawnFood();
    isGameRunning = true;

    if (gameInterval) clearTimeout(gameInterval);
    gameLoop();
}

function gameLoop() {
    if (!isGameRunning) return;

    // Use setTimeout for variable speed
    gameInterval = setTimeout(() => {
        requestAnimationFrame(gameLoop);
        update();
        draw();
    }, currentSpeed);
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall Collision
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    // Self Collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Eat Food
    if (head.x === food.x && head.y === food.y) {
        handleEatFood();
    } else {
        snake.pop();
    }
}

function handleEatFood() {
    score += 10;
    scoreElement.textContent = score;

    // Check Level Up every 50 points
    const newLevel = Math.floor(score / 50) + 1;
    if (newLevel > level) {
        level = newLevel;
        levelElement.textContent = level;
        increaseSpeed();
    }

    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('hauntedSnakeHighScore', highScore);
    }
    spawnFood();
}

function increaseSpeed() {
    // Decrease delay to increase speed, cap at 40ms
    currentSpeed = Math.max(40, Math.floor(baseSpeed * Math.pow(0.85, level - 1)));
}

function draw() {
    // Clear Canvas
    ctx.fillStyle = '#0a0505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = '#1a0b0b';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }

    // Draw Snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#ff9900'; // Lighter Orange Head
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ff6600';
        } else {
            ctx.fillStyle = '#ff6600'; // Orange Body
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#cc5500';
        }

        ctx.beginPath();
        ctx.roundRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2,
            4
        );
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Draw Food
    ctx.fillStyle = '#39ff14'; // Toxic Green
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#39ff14';

    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
    };

    for (let segment of snake) {
        if (food.x === segment.x && food.y === segment.y) {
            spawnFood();
            break;
        }
    }
}

function gameOver() {
    isGameRunning = false;
    restartBtn.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function handleInput(e) {
    // Prevent default scrolling for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    switch (e.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
        case 'Enter':
            if (!isGameRunning) initGame();
            break;
    }
}

document.addEventListener('keydown', handleInput);
restartBtn.addEventListener('click', initGame);

// Start game initially
initGame();
