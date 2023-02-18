// A map that links an id (the name of the project's directory, e.g: ball-game),
// to the project's path (e.g: ./projects/ball-game/)
const _idToPathMap = new Map();

// Shorthand functions
const style = (elem) => window.getComputedStyle(elem);
const cssValue = (val) => new CssValue(val);

function redirect(location) {
    window.location.href = location;
}

// function to register IDs with an unusual path
function registerID(id, path) {
    _idToPathMap.set(id, path);
}

function getPathFromID(id) {
    const path = _idToPathMap.get(id);
    return path === undefined ? "./pages/" + id + "/" : path;
}

// Returns time as HH:MM
function getTime() {
    const date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour < 10) hour = `0${hour}`
    if (minutes < 10) minutes = `0${minutes}`
    return `${hour}:${minutes}`
}

// window.getComputedStyle() always returns values in pixels.
class CssValue {
    constructor(val) {
        this.val = parseFloat(val);
    }

    toString() {
        return this.val + "px";
    }

    add(val2) {
        return new CssValue(this.val + parseFloat(val2));
    }

    subtract(val2) {
        return new CssValue(this.val - parseFloat(val2));
    }

    multiply(val2) {
        return new CssValue(this.val * parseFloat(val2));
    }

    divide(val2) {
        return new CssValue(this.val / parseFloat(val2));
    }

    floor() {
        return new CssValue(Math.floor(this.val));
    }
}