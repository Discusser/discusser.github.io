// import mathParser from "./math-parser.js";
//
// console.log(mathParser.compile("2+3").calculate())

const main = document.getElementById("main");
const data = document.getElementById("data");
const outputs = document.getElementById("outputs");
const graph = document.getElementById("graph");
const functionInput = document.getElementById("function");
const constantInput = document.getElementById("constant");

let functionName = "f";
let functions = new Map();
let constants = new Map();

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
    constructor(funcName, expression) {
        super();
        this.funcName = funcName;
        this.expression = expression;
    }

    getKey() {
        return this.funcName;
    }

    getFullName() {
        return this.funcName + "(x) = ";
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
    data.style.height = cssValue(style(data.parentElement).height)
        .subtract(cssValue(style(data).padding).multiply(2))
        .toString();
    graph.style.width = cssValue(graph.parentElement.getBoundingClientRect().width)
        .subtract(data.getBoundingClientRect().width)
        .subtract(cssValue(style(graph.parentElement).padding)
            .multiply(2))
        .toString();
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

function createOutputElement(inputElement) {
    const div = document.createElement("div");
    const output = document.createElement("div");
    const expressionSpan = document.createElement("span");
    const editBtn = document.createElement("button");
    const edit = document.createElement("input");

    output.style.width = "fit-content";
    output.textContent = inputElement.getFullName();
    expressionSpan.textContent = inputElement.expression.replace(output.textContent, "");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    edit.type = "text";
    edit.value = "";
    edit.style.visibility = "hidden";

    const compiled = math.compile(inputElement.expression);

    editBtn.addEventListener("click", () => {
        if (edit.style.visibility === "hidden") {
            edit.value = inputElement.expression;
            edit.style.visibility = "visible";
            editBtn.textContent = "Submit";
        } else {
            inputElement.expression = edit.value
            edit.style.visibility = "hidden";
            editBtn.textContent = "Edit";

            inputElement.listAll().delete(inputElement.getKey());
            inputElement.listAll().set(inputElement.getKey(), compiled);
        }
    })


    output.append(expressionSpan);

    if (!(inputElement instanceof Function) && !/^[-+]?\d*$/.test(inputElement.expression)) {
        output.innerHTML += " = " + compiled.evaluate(constants);
    }

    div.append(output, edit, editBtn);
    outputs.append(div);
}

function submitFunctionInput(input) {
    try {
        functions.set(functionName, math.compile(input));
    } catch (e) {
        return;
    }

    createOutputElement(new Function(functionName, input))
    nextFunctionName();
}

function submitConstantInput(input) {
    try {
        const trimmedInput = input.trim();

        if (constants.has(trimmedInput[0])) return;

        const regex = /[a-zA-Z]\s*=\s*/;

        if (trimmedInput.match(regex) == null) return;

        // scope = constants = { a : 6, b : 7 * 6 ... }
        const expression = trimmedInput.replace(regex, "")
        const evaluated = math.compile(expression).evaluate(constants);
        createOutputElement(new Constant(trimmedInput[0], expression))
        constants.set(trimmedInput[0], evaluated);
    } catch (e) {

    }
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

window.addEventListener("resize", () => {
    setCssProperties();
});

window.addEventListener("load", () => {
    setCssProperties();
});

for (let i = 0; i < 50; i++) {
    // submitFunctionInput((Math.floor(Math.random() * 10) + 1) + "x + " + (Math.floor(Math.random() * 10) + 1));
    // submitConstantInput(String.fromCharCode(65 + i) + " = " + (Math.floor(Math.random() * 10) + 1));
}