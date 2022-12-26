class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        this.x += x;
        this.y += y;
    }
}

class Ball {
    constructor(elem, velocity) {
        this.elem = elem;
        this.velocity = velocity;
    }
}

function distanceTo(xFrom, yFrom, xTo, yTo) {
    return Math.sqrt(Math.pow(xFrom - xTo, 2) + Math.pow(yFrom - yTo, 2))
}

function changeSlowdownSpeed(newValue) {
    SLOWDOWN_SPEED = newValue;
    slowdownSpan.textContent = String(parseFloat(SLOWDOWN_SPEED.toFixed(6)));
}

function changeMaxLineLength(newValue) {
    MAX_LINE_LENGTH = newValue;
    maxLengthSpan.textContent = String(parseFloat(MAX_LINE_LENGTH.toFixed(0)));
}

const game = document.getElementById("game");
const line = document.getElementById("line");
const ball = new Ball(document.getElementById("ball"), new Velocity(0, 0));
const maxLengthSpan = document.getElementById("maxLength");
const slowdownSpan = document.getElementById("speed");
const SECONDS_PER_FRAME = 1/60;

let SLOWDOWN_SPEED = 0.04;
let MAX_LINE_LENGTH = 256;

let ballRect = ball.elem.getBoundingClientRect();
let ballX = ballRect.x + ballRect.width / 2;
let ballY = ballRect.y + ballRect.height / 2;
let dx = 0;
let dy = 0;
let oldVx = 0;
let oldVy = 0;

let allowSlingshot = false;

const tickInterval = setInterval(tick, SECONDS_PER_FRAME * 1000)

function tick() {
    dx = Math.abs(oldVx * SLOWDOWN_SPEED);
    dy = Math.abs(oldVy * SLOWDOWN_SPEED);

    ball.elem.style.top = window.getComputedStyle(ball.elem).top.replace("px", "") - ball.velocity.y + "px";
    ball.elem.style.left = window.getComputedStyle(ball.elem).left.replace("px", "") - ball.velocity.x + "px";

    // Handle slowing down
    if (ball.velocity.x > 0) {
        if (ball.velocity.x - dx < 0) ball.velocity.x = 0;
        else ball.velocity.x -= dx;
    } else if (ball.velocity.x < 0) {
        if (ball.velocity.x + dx > 0) ball.velocity.x = 0;
        else ball.velocity.x += dx;
    }
    if (ball.velocity.y > 0) {
        if (ball.velocity.y - dy < 0) ball.velocity.y = 0;
        else ball.velocity.y -= dy;
    } else if (ball.velocity.y < 0) {
        if (ball.velocity.y + dy > 0) ball.velocity.y = 0;
        else ball.velocity.y += dy;
    }

    ballRect = ball.elem.getBoundingClientRect();
    ballX = ballRect.x + ballRect.width / 2;
    ballY = ballRect.y + ballRect.height / 2;

    // Handle ball collision with border
    if ((ballRect.bottom >= game.offsetHeight && ball.velocity.y < 0) || (ballRect.top <= game.offsetTop && ball.velocity.y > 0)) {
        ball.velocity.y = -ball.velocity.y;
    } else if ((ballRect.left <= game.offsetLeft && ball.velocity.x > 0) || (ballRect.right >= game.offsetWidth && ball.velocity.x < 0)) {
        ball.velocity.x = -ball.velocity.x;
    }

}

function createLineToBall(e) {
    const lineLength = Math.sqrt(Math.pow(e.x - ballX, 2) + Math.pow(e.y - ballY, 2));
    if (lineLength < MAX_LINE_LENGTH) {
        if (window.getComputedStyle(line).visibility === "hidden") {
            line.style.visibility = "visible";
        }

        line.style.top = e.y + "px";
        line.style.left = e.x + "px";
        const rgbCoefficient = 255 / MAX_LINE_LENGTH;
        const color = "rgb(" + lineLength * rgbCoefficient + ", " + (MAX_LINE_LENGTH - lineLength) * rgbCoefficient + ", 0)";
        line.style.backgroundColor = color;
        line.style.borderColor = color;
        line.style.transform = "rotate(" + Math.atan2(ballY - e.y, ballX - e.x) * (180 / Math.PI) + "deg)";
        line.style.width = Math.min(Math.sqrt(Math.pow(e.x - ballX, 2) + Math.pow(e.y - ballY, 2)), MAX_LINE_LENGTH) + "px";
    }
}

game.addEventListener("mousedown", e => {
    allowSlingshot = true;
    createLineToBall(e);
})

game.addEventListener("mouseup", e => {
    allowSlingshot = false;
    line.style.visibility = "hidden";
    if (distanceTo(e.x, e.y, ballX, ballY) < MAX_LINE_LENGTH) {
        const lineStyle = window.getComputedStyle(line)
        if (lineStyle.top === "0px" || lineStyle.left === "0px") return;
        ball.velocity.add((lineStyle.left.replace("px", "") - ballX) / 10, (lineStyle.top.replace("px", "") - ballY) / 10);
        oldVx = ball.velocity.x;
        oldVy = ball.velocity.y;
        dx = Math.abs(ball.velocity.x * SLOWDOWN_SPEED);
        dy = Math.abs(ball.velocity.y * SLOWDOWN_SPEED);
    }

    line.style.top = "0px";
    line.style.left = "0px";
})

game.addEventListener("mousemove", e => {
    if (!allowSlingshot) return;
    createLineToBall(e);
})