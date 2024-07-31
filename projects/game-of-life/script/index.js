var _a, _b, _c, _d, _e, _f;
import { Game } from "./game.js";
const gameContainer = document.querySelector(".game-container");
const gameStatus = document.querySelector(".game-status");
const generationCount = document.querySelector(".generation-count");
const populationCount = document.querySelector(".population-count");
const game = new Game(gameContainer, gameStatus, generationCount, populationCount);
(_a = document.querySelector(".button-play")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    game.info.gamePaused = false;
});
(_b = document.querySelector(".button-pause")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    game.info.gamePaused = true;
});
(_c = document.querySelector(".button-next-generation")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    game.runGeneration();
});
(_d = document.querySelector(".button-reset")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    game.resetGame();
});
(_e = document.querySelector(".button-toggle-grid")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    game.info.drawGrid = !game.info.drawGrid;
});
(_f = document.querySelector(".option-generation-interval")) === null || _f === void 0 ? void 0 : _f.addEventListener("input", (event) => {
    if (event instanceof InputEvent) {
        const inputEvent = event;
        if (inputEvent.target instanceof HTMLInputElement) {
            game.info.generationInterval = inputEvent.target.valueAsNumber;
        }
    }
});
requestAnimationFrame((t) => game.drawFrame(t));
