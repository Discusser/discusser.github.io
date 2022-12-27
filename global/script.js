// A map that links an id (the name of the project's directory, e.g: ball-game),
// to the project's path (e.g: ./projects/ball-game/)
const _idToPathMap = new Map();


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