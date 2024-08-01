function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
class GeneralSet {
    constructor(other) {
        if (other) {
            this.map = new Map(other.map);
        }
        else {
            this.map = new Map();
        }
    }
    add(item) {
        this.map.set(item.hash(), item);
    }
    values() {
        return this.map.values();
    }
    delete(item) {
        return this.map.delete(item.hash());
    }
    has(item) {
        return this.map.has(item.hash());
    }
}
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    hash() {
        return `${this.x}-${this.y}`;
    }
}
export class GameInfo {
    get generations() {
        return this._generations;
    }
    set generations(value) {
        this._generations = value;
        this.game.updateGameStatistics();
    }
    get gamePaused() {
        return this._gamePaused;
    }
    set gamePaused(value) {
        this._gamePaused = value;
        this.game.updateGameStatus();
    }
    get generationInterval() {
        return this._generationInterval;
    }
    set generationInterval(value) {
        if (isNaN(value) || !isFinite(value) || value == null)
            return;
        this._generationInterval = Math.max(value, 1);
    }
    constructor(game) {
        this._generations = 0;
        this._gamePaused = true;
        this._generationInterval = 200; // this value is stored in ms
        this.cellSize = 16;
        this.cellBorderColor = "rgba(100, 100, 100, 0.3)";
        this.cellBackgroundColor = "black";
        this.cellLiveBackgroundColor = "white";
        this.cellHoverBackgroundColor = "lightgray";
        this.drawGrid = true;
        this.drawMode = DrawMode.Create;
        this.drawHover = true;
        this.game = game;
    }
}
class GameRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
}
export var DrawMode;
(function (DrawMode) {
    DrawMode[DrawMode["Create"] = 0] = "Create";
    DrawMode[DrawMode["Erase"] = 1] = "Erase";
})(DrawMode || (DrawMode = {}));
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Left"] = 0] = "Left";
    MouseButton[MouseButton["Middle"] = 1] = "Middle";
    MouseButton[MouseButton["Right"] = 2] = "Right";
})(MouseButton || (MouseButton = {}));
export class Game {
    constructor(canvas, gameStatus, generationCount, populationCount, buttonDrawMode) {
        this.renderElapsed = 0;
        this.simulationElapsed = 0;
        this.nextLiveCells = new GeneralSet();
        this.liveCells = new GeneralSet();
        this.maxFpsValues = 10;
        this.fpsValues = new Array(this.maxFpsValues);
        this.scale = 1;
        this.maxScale = 3;
        this.minScale = 0.05;
        this.mouseMovement = [0, 0];
        this.info = new GameInfo(this);
        this.renderer = new GameRenderer(canvas);
        this.gameStatus = gameStatus;
        this.generationCount = generationCount;
        this.populationCount = populationCount;
        this.buttonDrawMode = buttonDrawMode;
        this.renderer.canvas.addEventListener("contextmenu", (event) => this.onContextMenuOnCanvas(event));
        this.renderer.canvas.addEventListener("wheel", (event) => this.onWheelOnCanvas(event));
        this.renderer.canvas.addEventListener("mousedown", (event) => this.onMouseDownOnCanvas(event));
        this.renderer.canvas.addEventListener("mouseup", (event) => this.onMouseUpOnCanvas(event));
        this.renderer.canvas.addEventListener("mousemove", (event) => this.onMouseMoveOnCanvas(event));
        this.renderer.canvas.addEventListener("mouseleave", (event) => this.onMouseLeaveCanvas(event));
        this.renderer.canvas.addEventListener("click", (event) => this.onClickOnCanvas(event));
    }
    startGame() {
        setInterval(() => this.update(), 1);
        requestAnimationFrame((t) => this.drawFrame(t));
    }
    update() {
        const timestamp = performance.now();
        if (this.simulationPreviousTimestamp === undefined)
            this.simulationPreviousTimestamp = timestamp;
        const deltaTime = timestamp - this.simulationPreviousTimestamp;
        this.simulationElapsed += deltaTime;
        if (this.simulationElapsed >= this.info.generationInterval) {
            this.simulationElapsed = this.simulationElapsed % this.info.generationInterval;
            if (!this.info.gamePaused)
                this.runGeneration();
        }
        this.simulationPreviousTimestamp = timestamp;
    }
    // HTML functions
    updateGameStatus() {
        const fpsText = `at ${this.getAverageFps().toFixed(1)} fps`;
        this.gameStatus.textContent = this.info.gamePaused ? `Game paused ${fpsText}` : `Game playing ${fpsText}`;
    }
    switchDrawMode() {
        this.info.drawMode = this.info.drawMode == DrawMode.Create ? DrawMode.Erase : DrawMode.Create;
        this.buttonDrawMode.value = this.info.drawMode == DrawMode.Create ? "Create mode" : "Erase mode";
    }
    updateGameStatistics() {
        this.generationCount.textContent = this.info.generations.toString();
        this.populationCount.textContent = this.liveCells.map.size.toString();
    }
    // Canvas functions
    drawGrid() {
        if (!this.info.drawGrid || this.scale <= 0.5)
            return;
        const transform = this.renderer.ctx.getTransform();
        const x1 = Math.floor(-transform.e / this.info.cellSize / this.scale);
        const y1 = Math.floor(-transform.f / this.info.cellSize / this.scale);
        const x2 = Math.ceil(this.renderer.canvas.width / this.info.cellSize / this.scale) + x1;
        const y2 = Math.ceil(this.renderer.canvas.height / this.info.cellSize / this.scale) + y1;
        this.renderer.ctx.strokeStyle = this.info.cellBorderColor;
        for (let x = x2; x >= x1; x--) {
            for (let y = y2; y >= y1; y--) {
                this.drawCellBorder(x, y, this.info.cellSize);
            }
        }
    }
    drawCells() {
        this.renderer.ctx.strokeStyle = this.info.cellBorderColor;
        this.renderer.ctx.fillStyle = this.info.cellLiveBackgroundColor;
        this.liveCells.map.forEach((pos) => {
            this.drawCellNoBorder(pos.x, pos.y, this.info.cellSize);
        });
        this.liveCells.map.forEach((pos) => {
            this.drawCellBorder(pos.x, pos.y, this.info.cellSize);
        });
        if (this.hoveredCell && this.info.drawHover) {
            this.renderer.ctx.fillStyle = this.info.cellHoverBackgroundColor;
            this.drawCell(this.hoveredCell.x, this.hoveredCell.y, this.info.cellSize);
        }
    }
    drawCellBorder(column, row, cellSize) {
        this.renderer.ctx.beginPath();
        this.renderer.ctx.rect(column * cellSize, row * cellSize, cellSize, cellSize);
        this.renderer.ctx.closePath();
        this.renderer.ctx.stroke();
    }
    drawCellNoBorder(column, row, cellSize) {
        this.renderer.ctx.beginPath();
        this.renderer.ctx.rect(column * cellSize, row * cellSize, cellSize, cellSize);
        this.renderer.ctx.closePath();
        this.renderer.ctx.fill();
    }
    drawCell(column, row, cellSize) {
        this.renderer.ctx.beginPath();
        this.renderer.ctx.rect(column * cellSize, row * cellSize, cellSize, cellSize);
        this.renderer.ctx.closePath();
        this.renderer.ctx.stroke();
        this.renderer.ctx.fill();
    }
    drawFrame(timestamp) {
        if (this.renderPreviousTimestamp === undefined)
            this.renderPreviousTimestamp = timestamp;
        const deltaTime = timestamp - this.renderPreviousTimestamp;
        this.renderElapsed += deltaTime;
        if (this.fpsValues.length > this.maxFpsValues)
            this.fpsValues.splice(0, this.fpsValues.length - this.maxFpsValues);
        if (deltaTime != 0)
            this.fpsValues.push((1 / deltaTime) * 1000);
        const previousTransform = this.renderer.ctx.getTransform();
        this.renderer.ctx.setTransform(new DOMMatrix());
        this.renderer.ctx.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
        this.renderer.ctx.setTransform(previousTransform);
        this.drawGrid();
        this.drawCells();
        this.updateGameStatus();
        this.renderPreviousTimestamp = timestamp;
        requestAnimationFrame((t) => this.drawFrame(t));
    }
    // Event handlers
    onContextMenuOnCanvas(event) {
        event.preventDefault();
    }
    onWheelOnCanvas(event) {
        event.preventDefault();
        const transform = this.renderer.ctx.getTransform();
        const transformed = this.transformCoordinates(this.renderer.canvas.width / 2, this.renderer.canvas.height / 2);
        let scaleMultiplier = 1 - 0.2 * Math.sign(event.deltaY);
        const newScale = transform.a * scaleMultiplier;
        if (newScale > this.maxScale)
            scaleMultiplier = this.maxScale / transform.a;
        else if (newScale < this.minScale)
            scaleMultiplier = this.minScale / transform.a;
        transform.scaleSelf(scaleMultiplier, scaleMultiplier, 1, transformed.x, transformed.y);
        this.scale = transform.a;
        this.renderer.ctx.setTransform(transform);
    }
    onMouseDownOnCanvas(event) {
        this.mouseButtonHeld = event.button;
    }
    onMouseUpOnCanvas(_) {
        if (this.mouseButtonHeld == MouseButton.Right) {
            this.mouseMovement = [0, 0];
        }
        this.mouseButtonHeld = undefined;
    }
    onMouseMoveOnCanvas(event) {
        // Don't display hovered cell when holding right click
        if (this.mouseButtonHeld == MouseButton.Right)
            this.hoveredCell = undefined;
        else
            this.hoveredCell = this.getCellAtCoordinates(event.offsetX, event.offsetY);
        if (this.mouseButtonHeld == MouseButton.Right) {
            const transform = this.renderer.ctx.getTransform();
            const scaledSize = this.info.cellSize * this.scale;
            this.mouseMovement[0] += event.movementX;
            this.mouseMovement[1] += event.movementY;
            if (Math.abs(this.mouseMovement[0]) >= scaledSize) {
                transform.e += Math.trunc(this.mouseMovement[0] / scaledSize) * scaledSize;
                this.mouseMovement[0] = this.mouseMovement[0] % scaledSize;
            }
            if (Math.abs(this.mouseMovement[1]) >= scaledSize) {
                transform.f += Math.trunc(this.mouseMovement[1] / scaledSize) * scaledSize;
                this.mouseMovement[1] = this.mouseMovement[1] % scaledSize;
            }
            this.renderer.ctx.setTransform(transform);
        }
        else if (this.mouseButtonHeld == MouseButton.Left && this.hoveredCell) {
            if (this.info.drawMode == DrawMode.Create) {
                this.liveCells.add(this.hoveredCell);
            }
            else if (this.info.drawMode == DrawMode.Erase) {
                this.liveCells.delete(this.hoveredCell);
            }
        }
    }
    onMouseLeaveCanvas(_) {
        this.hoveredCell = undefined;
        this.mouseButtonHeld = undefined;
    }
    onClickOnCanvas(event) {
        const position = this.getCellAtCoordinates(event.offsetX, event.offsetY);
        if (this.info.drawMode == DrawMode.Erase) {
            this.liveCells.delete(position);
        }
        else if (this.info.drawMode == DrawMode.Create) {
            this.liveCells.add(position);
        }
        this.updateGameStatistics();
    }
    // Game functions
    getAverageFps() {
        if (this.fpsValues.length == 0)
            return 0;
        return this.fpsValues.reduce((prev, curr) => prev + curr, 0) / this.fpsValues.length;
    }
    resetGame() {
        this.info.generations = 0;
        this.info.gamePaused = true;
        this.liveCells = new GeneralSet();
        this.nextLiveCells = new GeneralSet();
        this.renderPreviousTimestamp = undefined;
        this.renderElapsed = 0;
        this.simulationPreviousTimestamp = undefined;
        this.simulationElapsed = 0;
        this.updateGameStatistics();
        this.updateGameStatus();
    }
    runGeneration() {
        this.nextLiveCells = new GeneralSet(this.liveCells);
        const enqueuedCells = this.findCellsThatNeedProcessing();
        for (const [_, cell] of enqueuedCells.map) {
            const liveNeighborCount = this.getLiveNeighbors(cell).length;
            const isAlive = this.isCellAlive(cell);
            let shouldKill = false;
            if (liveNeighborCount < 2 && isAlive)
                shouldKill = this.nextLiveCells.has(cell);
            if (liveNeighborCount > 3 && isAlive)
                shouldKill = this.nextLiveCells.has(cell);
            if (liveNeighborCount == 3 && !isAlive)
                this.nextLiveCells.add(cell);
            if (shouldKill) {
                this.nextLiveCells.delete(cell);
            }
        }
        this.liveCells = this.nextLiveCells;
        this.info.generations++;
        this.updateGameStatistics();
    }
    findCellsThatNeedProcessing() {
        const enqueued = new GeneralSet();
        for (const [_, cell] of this.liveCells.map) {
            enqueued.add(cell);
            const neighbors = this.getNeighbors(cell);
            for (const neighbor of neighbors) {
                enqueued.add(neighbor);
            }
        }
        return enqueued;
    }
    // Cell functions
    getLiveNeighbors(pos) {
        return this.getNeighbors(pos).filter((pos) => this.isCellAlive(pos));
    }
    getNeighbors(pos) {
        const neighbors = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x == 0 && y == 0)
                    continue;
                neighbors.push(new Position(pos.x + x, pos.y + y));
            }
        }
        return neighbors;
    }
    isCellAlive(pos) {
        return this.liveCells.has(pos);
    }
    getCellAtCoordinates(x, y) {
        x = clamp(x, 0, this.renderer.canvas.width);
        y = clamp(y, 0, this.renderer.canvas.height);
        const transformed = this.transformCoordinates(x, y);
        const column = Math.floor(transformed.x / this.info.cellSize);
        const row = Math.floor(transformed.y / this.info.cellSize);
        return new Position(column, row);
    }
    transformCoordinates(x, y) {
        const transform = this.renderer.ctx.getTransform().inverse();
        return {
            x: transform.a * x + transform.c * y + transform.e,
            y: transform.b * x + transform.d * y + transform.f,
        };
    }
}
