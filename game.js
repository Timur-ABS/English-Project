const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let paddle1Y = 250;
let paddle2Y = 250;

function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawPaddles() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius <= paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX + ballRadius >= canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
}

function movePaddles() {
    if (paddle1Y + paddleHeight / 2 < ballY - 35) {
        paddle1Y += 6;
    } else if (paddle1Y + paddleHeight / 2 > ballY + 35) {
        paddle1Y -= 6;
    }

    if (paddle2Y + paddleHeight / 2 < ballY - 35) {
        paddle2Y += 6;
    } else if (paddle2Y + paddleHeight / 2 > ballY + 35) {
        paddle2Y -= 6;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    moveBall();
    movePaddles();
}

setInterval(draw, 1000 / 60);
