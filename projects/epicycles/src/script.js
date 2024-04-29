const CIRCLE_RADIUS = 8;
const POINT_WIDTH = 2;
const POINT_HEIGHT = 2;
const MAX_DRAWN_PIXELS = 4000;
const RADIUS_MIN = 5;
const RADIUS_MAX = 384;
const SPEED_MIN = 0.01;
const SPEED_MAX = 5;

class Queue extends Array {
  constructor() {
    super();
    this.head = 0;
    this.tail = 0;
  }
  enqueue(x) {
    this.push(x);
    this.length++;
  }
  dequeue() {
    let first;
    return this.head < this.length
      ? ((first = this[this.head]), delete this[this.head++], this.length--, first)
      : void 0;
  }
  peek() {
    return this[this.head];
  }
}

class Option {
  constructor(label) {
    this.label = label;
    this.labelElement = null;
    this.inputElement = null;
  }

  value() {
    return 0;
  }
}

class RangeOption extends Option {
  constructor(min, max, label) {
    super(label);
    this.min = min;
    this.max = max;
    this.outputElement = null;
  }

  value() {
    return this.inputElement !== null ? this.inputElement.valueAsNumber : 0;
  }
}

class CheckboxOption extends Option {
  constructor(label) {
    super(label);
  }

  value() {
    return this.inputElement !== null ? this.inputElement.checked : false;
  }
}

const canvasContainer = document.getElementById("canvas-container");
const animationOptions = document.getElementById("animation-options");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let radiusOptions = [];
let speedOptions = [];
let globalSpeedOption;
let pixelLimitOption;
let drawLastTrajectoryOption;

let pathPixelsToDraw;
let animationRequest;
let elapsed = 0;
let previousTimestamp;
let animationDone = true;
let canvasFullscreened = false;
let circleCount = 3;
let circleColors = [];

function pathPixelsLength(pathPixels) {
  let pathPixelsLength = 0;
  for (let i = 0; i < pathPixels.length; i++) {
    pathPixelsLength += pathPixels[i].length;
  }
  return pathPixelsLength;
}

function drawFrame(timestamp) {
  const deltaTime = isNaN(previousTimestamp) ? 0 : timestamp - previousTimestamp;
  elapsed += deltaTime;
  previousTimestamp = timestamp;

  let a = elapsed / 2000;
  let r = radiusOptions.map((option) => option.value());
  let gs = globalSpeedOption.value();
  let s = speedOptions.map((option) => option.value() * gs);

  const circlePositions = new Array(circleCount);
  circlePositions[0] = [canvas.width / 2, canvas.height / 2];

  // circlePositions[1] = [
  //   circlePositions[0][0] + Math.cos(a * s[0]) * r[0],
  //   circlePositions[0][1] + Math.sin(a * s[0]) * r[0],
  // ];
  // circlePositions[2] = [
  //   circlePositions[1][0] + Math.cos(a * s[1]) * r[1],
  //   circlePositions[1][1] + Math.sin(a * s[1]) * r[1],
  // ];

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#42ad70";
  for (let i = 1; i < circlePositions.length; i++) {
    circlePositions[i] = [
      circlePositions[i - 1][0] + Math.cos(a * s[i - 1]) * r[i - 1],
      circlePositions[i - 1][1] + Math.sin(a * s[i - 1]) * r[i - 1],
    ];

    pathPixelsToDraw[i - 1].push(circlePositions[i]);
    ctx.beginPath();
    ctx.moveTo(circlePositions[i - 1][0], circlePositions[i - 1][1]);
    ctx.lineTo(circlePositions[i][0], circlePositions[i][1]);
    ctx.stroke();
  }

  if (pixelLimitOption.value()) {
    while (pathPixelsLength(pathPixelsToDraw) > MAX_DRAWN_PIXELS) {
      for (let circle = 0; circle < pathPixelsToDraw.length; circle++) {
        pathPixelsToDraw[circle].shift();
      }
    }
  }

  ctx.strokeStyle = "#000000";
  for (let circle = 0; circle < pathPixelsToDraw.length; circle++) {
    if (drawLastTrajectoryOption.value() && circle != pathPixelsToDraw.length - 1)
      continue;

    for (let i = 1; i < pathPixelsToDraw[circle].length; i++) {
      ctx.beginPath();
      ctx.moveTo(pathPixelsToDraw[circle][i - 1][0], pathPixelsToDraw[circle][i - 1][1]);
      ctx.lineTo(pathPixelsToDraw[circle][i][0], pathPixelsToDraw[circle][i][1]);
      ctx.stroke();
    }
  }

  for (let i = 0; i < circlePositions.length; i++) {
    ctx.fillStyle = circleColors[i];
    ctx.beginPath();
    ctx.arc(circlePositions[i][0], circlePositions[i][1], CIRCLE_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }

  // ctx.fillStyle = "#ff0000";
  // ctx.beginPath();
  // ctx.arc(circlePositions[0][0], circlePositions[0][1], CIRCLE_RADIUS, 0, 2 * Math.PI);
  // ctx.fill();
  //
  // ctx.fillStyle = "#0000ff";
  // ctx.beginPath();
  // ctx.arc(circlePositions[1][0], circlePositions[1][1], CIRCLE_RADIUS, 0, 2 * Math.PI);
  // ctx.fill();
  //
  // ctx.fillStyle = "#00ff00";
  // ctx.beginPath();
  // ctx.arc(circlePositions[2][0], circlePositions[2][1], CIRCLE_RADIUS, 0, 2 * Math.PI);
  // ctx.fill();

  if (!animationDone) {
    animationRequest = window.requestAnimationFrame(drawFrame);
  }
}

function startAnimation() {
  animationDone = false;
  resetCanvas();

  circleColors = [];
  for (let i = 0; i < circleCount; i++) {
    circleColors.push(
      `rgb(${Math.floor(randomRange(0, 255))}, ${Math.floor(randomRange(0, 255))}, ${Math.floor(randomRange(0, 255))})`,
    );
  }

  animationRequest = window.requestAnimationFrame(drawFrame);
}

function stopAnimation() {
  window.cancelAnimationFrame(animationRequest);
  animationDone = true;
}

function createRangeOption(min, max, label, step, defaultValue) {
  const option = new RangeOption(min, max, label);

  const container = document.createElement("div");
  container.classList.add("option-with-label");

  option.labelElement = document.createElement("label");
  option.labelElement.textContent = label;

  option.inputElement = document.createElement("input");
  option.inputElement.type = "range";
  option.inputElement.min = min.toString();
  option.inputElement.max = max.toString();
  option.inputElement.step = step.toString();
  option.inputElement.defaultValue = defaultValue;

  option.outputElement = document.createElement("output");
  option.outputElement.textContent = option.inputElement.value;
  option.inputElement.addEventListener("input", (ev) => {
    option.outputElement.textContent = ev.target.value;
  });

  container.append(option.labelElement, option.inputElement, option.outputElement);
  animationOptions.appendChild(container);

  return option;
}

function createCheckboxOption(label, defaultValue) {
  const option = new CheckboxOption(label);

  const container = document.createElement("div");
  container.classList.add("option-with-label");

  option.labelElement = document.createElement("label");
  option.labelElement.textContent = label;

  option.inputElement = document.createElement("input");
  option.inputElement.type = "checkbox";
  option.inputElement.defaultValue = defaultValue;

  container.append(option.labelElement, option.inputElement);
  animationOptions.appendChild(container);

  return option;
}

function resetCanvas() {
  ctx.fillStyle = "#ffffff";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pathPixelsToDraw = new Array(circleCount - 1);
  for (let i = 0; i < pathPixelsToDraw.length; i++) {
    pathPixelsToDraw[i] = new Array();
  }
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function makeOptions() {
  animationOptions.replaceChildren();

  const newRadiusOptions = [];
  for (let i = 1; i < circleCount; i++) {
    let value;
    if (radiusOptions !== undefined && radiusOptions.length > i - 1) {
      value = radiusOptions[i - 1].value();
    } else {
      value = Math.floor(randomRange(RADIUS_MIN, RADIUS_MAX));
    }
    newRadiusOptions.push(createRangeOption(RADIUS_MIN, RADIUS_MAX, "Radius " + i.toString(), 1, value));
  }
  radiusOptions = newRadiusOptions;

  const newSpeedOptions = [];
  for (let i = 1; i < circleCount; i++) {
    let value;
    if (speedOptions !== undefined && speedOptions.length > i - 1) {
      value = speedOptions[i - 1].value();
    } else {
      value = Math.round(randomRange(SPEED_MIN, SPEED_MAX) * 100) / 100;
    }
    newSpeedOptions.push(createRangeOption(SPEED_MIN, SPEED_MAX, "Orbit Speed " + i.toString(), 0.01, value));
  }
  speedOptions = newSpeedOptions;

  globalSpeedOption = createRangeOption(
    0,
    20,
    "Simulation Speed",
    0.1,
    globalSpeedOption !== undefined ? globalSpeedOption.value() : 1,
  );
  pixelLimitOption = createCheckboxOption(
    "Limit on-screen pixels",
    pixelLimitOption !== undefined ? pixelLimitOption.value() : false,
  );
  drawLastTrajectoryOption = createCheckboxOption(
    "Draw last trajectory only",
    drawLastTrajectoryOption !== undefined ? drawLastTrajectoryOption.value() : false
  )
}

document.getElementById("inputStart").addEventListener("click", () => {
  startAnimation();
});

document.getElementById("inputStop").addEventListener("click", () => {
  stopAnimation();
});

document.getElementById("inputClear").addEventListener("click", () => {
  resetCanvas();
});

document.getElementById("inputAddCircle").addEventListener("click", () => {
  stopAnimation();
  resetCanvas();
  circleCount++;
  makeOptions();
});

document.getElementById("inputRemoveCircle").addEventListener("click", () => {
  stopAnimation();
  resetCanvas();
  circleCount--;
  makeOptions();
});

document.getElementById("inputRandomizeValues").addEventListener("click", () => {
  radiusOptions.forEach((option) => {
    option.inputElement.value = Math.floor(randomRange(RADIUS_MIN, RADIUS_MAX));
    option.outputElement.value = option.inputElement.value;
  });
  speedOptions.forEach((option) => {
    option.inputElement.value = randomRange(SPEED_MIN, SPEED_MAX);
    option.outputElement.value = option.inputElement.value;
  });

  resetCanvas();
});

document.getElementById("inputFullscreen").addEventListener("click", () => {
  canvasFullscreened = true;
  const border = parseInt(window.getComputedStyle(canvasContainer).borderWidth) * 2;
  canvas.width = window.innerWidth - border;
  canvas.height = window.innerHeight - border;
  resetCanvas();
});

document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape" && canvasFullscreened) {
    canvas.width = 768;
    canvas.height = 768;
    canvasFullscreened = false;
    resetCanvas();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    previousTimestamp = NaN;
    cancelAnimationFrame(animationRequest);
  } else if (document.visibilityState === "visible") {
    animationRequest = requestAnimationFrame(drawFrame);
  }
});

makeOptions();
