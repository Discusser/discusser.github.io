import mathParser from "../../../libs/math-parser/math-parser.js";

const main = document.getElementById("main");
const data = document.getElementById("data");
const outputs = document.getElementById("outputs");
const graph = document.getElementById("graph");
const functionInput = document.getElementById("function");
const constantInput = document.getElementById("constant");
const iterationsInput = document.getElementById("iterations");

const ctx = graph.getContext("2d");

let X_CENTER = graph.width / 2;
let Y_CENTER = graph.height / 2;

let MARKING_LENGTH = 16;
let PX_PER_MARKING = 64;
let UNITS_PER_MARKING = 1;
let PX_PER_UNIT = PX_PER_MARKING / UNITS_PER_MARKING;

let functionName = "f";
let functions = [];
let constants = [];

class InputElement {
    /**
     * <pre>
     * Returns the key of the element, e.g:
     *  a = 10, key = "a"
     *  f(x) = 2x + 3, key = "f"
     *  f'(x) = -3x, key = "f'"
     * </pre>
     */
    getKey() {
        throw new Error("'getKey()' must be implemented");
    }

    /**
     * <pre>
     * Returns the full name of the element, e.g:
     *  a = 10, fullName = "a = "
     *  f(x) = 2x + 3, fullName = "f(x) = "
     *  f'(x) = -3x, fullName = "f'(x) = "
     * </pre>
     */
    getFullName() {
        throw new Error("'getFullName()' must be implemented");
    }

    /**
     * Returns a map containing all elements of the current type
     */
    listAll() {
        throw new Error("'listAll()' must be implemented");
    }
}

class Function extends InputElement {
    constructor(funcName, expression, color) {
        super();
        this.funcName = funcName;
        this.expression = expression;
        this.color = color;
    }

    getKey() {
        return this.funcName;
    }

    getFullName() {
        return this.funcName + "(x) = ";
    }

    getColor() {
        return this.color;
    }

    listAll() {
        return functions;
    }
}

class Constant extends InputElement {
    constructor(constName, expression) {
        super();
        this.constName = constName;
        this.expression = expression;
    }

    getKey() {
        return this.constName;
    }

    getFullName() {
        return this.constName + " = ";
    }

    listAll() {
        return constants;
    }
}

function setCssProperties() {
    main.style.height = cssValue(main.parentElement.getBoundingClientRect().height)
        .subtract(cssValue(style(main).padding).multiply(2))
        .toString();
    data.style.height = cssValue(style(main).height)
        .subtract(cssValue(style(data).padding).multiply(2))
        .toString();
    graph.style.width = cssValue(style(main).width)
        .subtract(data.getBoundingClientRect().width)
        .subtract(cssValue(style(graph.parentElement).padding)
            .multiply(2))
        .toString();
    graph.style.height = style(main).height;
    graph.width = parseFloat(style(graph).width);
    graph.height = parseFloat(style(graph).height);
}

function labelForInput(forValue) {
    const elems = document.getElementById(forValue).parentElement.children;
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].htmlFor === forValue) return elems[i];
    }
}

function nextFunctionName() {
    const previous = functionName

    if (functionName.startsWith("z")) functionName = functionName.replace("z", "f'");
    functionName = String.fromCharCode(functionName.charCodeAt(0) + 1)
        + functionName.replace(functionName[0], "");

    const label = labelForInput(functionInput.id);
    label.textContent = label.textContent.replace(previous, functionName)
}

function arrayToMap(arr) {
    const map = new Map();

    for (let i = 0; i < arr.length; i++) {
        map.set(arr[i].getKey(), arr[i].expression);
    }

    return map;
}

function createOutputElement(inputElement) {
    const output = document.createElement("div");
    const expressionSpan = document.createElement("span");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const edit = document.createElement("input");

    const compiled = mathParser.compile(inputElement.expression, arrayToMap(constants), arrayToMap(functions));

    output.style.width = "100%";
    output.textContent = inputElement.getFullName();
    expressionSpan.textContent = inputElement.expression.replace(output.textContent, "");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    edit.type = "text";
    edit.value = "";
    edit.style.visibility = "hidden";

    editBtn.addEventListener("click", () => {
        if (edit.style.visibility === "hidden") {
            edit.value = inputElement.expression;
            edit.style.visibility = "visible";
            editBtn.textContent = "Submit";
        } else {
            inputElement.expression = edit.value;
            expressionSpan.textContent = inputElement.expression;
            edit.style.visibility = "hidden";
            editBtn.textContent = "Edit";

            inputElement.listAll().splice(inputElement.listAll().indexOf(inputElement), 1, inputElement);

            setupGraph();
        }
    })

    deleteBtn.addEventListener("click", () => {
        output.remove();

        inputElement.listAll().splice(inputElement.listAll().indexOf(inputElement), 1);

        setupGraph();
    })

    output.append(expressionSpan);

    if (!(inputElement instanceof Function) && !/^[-+]?\d*$/.test(inputElement.expression)) {
        output.innerHTML += " = " + compiled.calculate();
    }

    output.append(edit, deleteBtn, editBtn)
    outputs.append(output);
}

function submitFunctionInput(input) {
    const func = new Function(functionName, input,
        '#'+(0x1000000+Math.random()*0xffffff).toString(16).slice(1,7));

    try {
        const compiled = mathParser.compile(func.expression, arrayToMap(constants), arrayToMap(functions));
        compiled.constants.set("x", 1)
        compiled.calculate();
    } catch (e) {
        alert(e);
        return;
    }

    functions.push(func);
    setupGraph();
    createOutputElement(func)
    nextFunctionName();
}

function submitConstantInput(input) {
    try {
        const trimmedInput = input.trim();

        if (constants.includes(trimmedInput[0])) return;

        const regex = /[a-zA-Z]\s*=\s*/;

        if (trimmedInput.match(regex) == null) return;

        const expression = trimmedInput.replace(regex, "")
        createOutputElement(new Constant(trimmedInput[0], expression))
        constants.push(new Constant(trimmedInput[0], mathParser.compile(expression, arrayToMap(constants), arrayToMap(functions)).calculate()));
    } catch (e) {

    }
}

// Converts (2; 3) into useable coordinates
function toHTMLCoords(x, y) {
    return {
        x: x * PX_PER_UNIT + X_CENTER,
        y: -y * PX_PER_UNIT + Y_CENTER
    }
}

// Converts (750; 300) into graph coordinates
function toGraphCoords(x, y) {
    return {
        x: (x - X_CENTER) / PX_PER_UNIT,
        y: (Y_CENTER - y) / PX_PER_UNIT
    }
}

function setupGraph() {
    X_CENTER = graph.width / 2;
    Y_CENTER = graph.height / 2;

    ctx.clearRect(0, 0, graph.width, graph.height);

    // x and y axis
    {
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 2;

        ctx.beginPath();

        // x-axis
        ctx.moveTo(0, Y_CENTER)
        ctx.lineTo(graph.width, Y_CENTER);

        // y-axis
        ctx.moveTo(X_CENTER, 0);
        ctx.lineTo(X_CENTER, graph.height);

        ctx.stroke();
    }
    // markings
    {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.lineWidth = 1;

        ctx.beginPath();

        for (let i = -1; i < 2; i += 2) {
            // x-axis
            const MARKINGS_X_AXIS = Math.floor(graph.width / PX_PER_MARKING);
            for (let j = 1; j < MARKINGS_X_AXIS / 2; j++) {
                const x = X_CENTER + i * j * PX_PER_MARKING;
                const txt = String(i * j * UNITS_PER_MARKING);
                const metrics = ctx.measureText(txt);
                ctx.moveTo(x, Y_CENTER + MARKING_LENGTH / 2);
                ctx.lineTo(x, Y_CENTER - MARKING_LENGTH / 2);
                ctx.fillText(txt,
                    x - metrics.width / 2,
                    Y_CENTER + MARKING_LENGTH + metrics.actualBoundingBoxAscent
                );
            }

            // y-axis
            const MARKINGS_Y_AXIS = Math.floor(graph.height / PX_PER_MARKING);
            for (let j = 1; j < MARKINGS_Y_AXIS / 2; j++) {
                const y = Y_CENTER + i * j * PX_PER_MARKING;
                const txt = String(-1 * i * j * UNITS_PER_MARKING);
                const metrics = ctx.measureText(txt);
                ctx.moveTo(X_CENTER + MARKING_LENGTH / 2, y);
                ctx.lineTo(X_CENTER - MARKING_LENGTH / 2, y);
                ctx.fillText(txt,
                    X_CENTER + MARKING_LENGTH + metrics.actualBoundingBoxLeft,
                    y + metrics.actualBoundingBoxAscent / 2
                );
            }
        }

        // (0; 0)
        const metrics = ctx.measureText("0");
        ctx.fillText("0",
            X_CENTER + MARKING_LENGTH / 2,
            Y_CENTER + metrics.actualBoundingBoxAscent + MARKING_LENGTH / 2
        );

        ctx.stroke();
    }

    for (let i = 0; i < functions.length; i++) {
        graphExpression(functions[i], constants, functions, iterationsInput.value);
    }

    // graphExpression("cos(sinh(x)) - 4", consts, userFunctions, graph.width / 2);
    // graphExpression("cos(sinh(x)) + 0", consts, userFunctions, graph.width);
    // graphExpression("cos(sinh(x)) + 4", consts, userFunctions, 4000);
}

function graphExpression(functionObject, consts, funcs, iterations) {
    iterations = parseInt(iterations);

    const increment = graph.width / iterations;
    let compiled = mathParser.compile(functionObject.expression, arrayToMap(consts), arrayToMap(funcs));

    ctx.strokeStyle = functionObject.getColor();
    ctx.beginPath();

    let x1 = -graph.width / PX_PER_UNIT / 2;
    compiled.constants.set("x", mathParser.numToStr(x1));
    ctx.moveTo(0, Y_CENTER);

    for (let i = 0; i < iterations + 1; i++) {
        const result = compiled.calculate();
        if (!Number.isNaN(result)) {
            const { x, y } = toHTMLCoords(x1, result);
            ctx.lineTo(x, y);
        } else {
            ctx.moveTo(toHTMLCoords(x1).x, Y_CENTER);
        }

        x1 = toGraphCoords(toHTMLCoords(x1).x + increment).x;

        compiled.constants.set("x", mathParser.numToStr(x1));
    }

    ctx.stroke();
}


document.getElementById("submitFunction").addEventListener("click", () => {
    submitFunctionInput(functionInput.value);
    functionInput.value = "";
});

functionInput.addEventListener("keypress", ev => {
    if (ev.key === "Enter") {
        submitFunctionInput(functionInput.value);
        functionInput.value = "";
    }
});

document.getElementById("submitConstant").addEventListener("click", () => {
    submitConstantInput(constantInput.value);
    constantInput.value = "";
});

constantInput.addEventListener("click", ev => {
    if (ev.key === "Enter") {
        submitConstantInput(constantInput.value);
        constantInput.value = "";
    }
})

iterationsInput.addEventListener("input", () => {
    document.getElementById("iterationsSpan").textContent = iterationsInput.value;
    setupGraph();
})

window.addEventListener("resize", () => {
    setCssProperties();
    setupGraph();
});

window.addEventListener("load", () => {
    setCssProperties();
    iterationsInput.value = graph.width;
    document.getElementById("iterationsSpan").textContent = iterationsInput.value;
    setupGraph();
});