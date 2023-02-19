"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mathParser = void 0;
var Associativity;
(function (Associativity) {
    Associativity[Associativity["LEFT"] = 0] = "LEFT";
    Associativity[Associativity["RIGHT"] = 1] = "RIGHT";
})(Associativity || (Associativity = {}));
class TFunction {
    value;
    onApply;
    constructor(value, onApply) {
        this.value = value;
        this.onApply = onApply;
    }
    apply(args) {
        return this.onApply.apply(null, args);
    }
}
class Operator {
    value;
    precedence;
    associativity;
    onApply;
    constructor(value, precedence, associativity, onApply) {
        this.value = value;
        this.precedence = precedence;
        this.associativity = associativity;
        this.onApply = onApply;
    }
    apply(a, b) {
        return this.onApply(a, b);
    }
}
class Parenthesis {
    value;
    constructor(value) {
        this.value = value;
    }
}
class Operand {
    value;
    constructor(value) {
        this.value = value;
    }
}
const parentheses = new Map([
    ["(", new Parenthesis("(")],
    [")", new Parenthesis(")")]
]);
const operators = new Map([
    // Exponentiation
    ["^", new Operator("^", 4, Associativity.RIGHT, (a, b) => Math.pow(a, b))],
    // ["**", new Operator("**", 4, Associativity.RIGHT)],
    // Multiplication
    ["*", new Operator("*", 3, Associativity.LEFT, (a, b) => a * b)],
    // ["×", new Operator("×", 3, Associativity.LEFT)],
    // Division
    ["/", new Operator("/", 3, Associativity.LEFT, (a, b) => a / b)],
    // ["÷", new Operator("÷", 3, Associativity.LEFT)],
    // [":", new Operator(":", 3, Associativity.LEFT)],
    // Addition
    ["+", new Operator("+", 2, Associativity.LEFT, (a, b) => a + b)],
    // Subtraction
    ["-", new Operator("-", 2, Associativity.LEFT, (a, b) => a - b)],
]);
const functions = new Map([]);
{
    const descriptors = Object.getOwnPropertyDescriptors(Math);
    const keys = Object.keys(descriptors);
    for (let i = 0; i < keys.length; i++) {
        let value = descriptors[keys[i]].value;
        if (typeof (value) === "function")
            functions.set(keys[i], new TFunction(keys[i], value));
    }
}
function isNumber(str) {
    return /^[-+]?\d+\.*\d*$/.test(str);
}
function isVariable(str) {
    return /^[a-zA-Z]+'*$/.test(str);
}
function isParentheses(str) {
    return str.length === 1 && (str[0] === "(" || str[0] === ")");
}
// todo: support operators longer than 1 character
function isOperator(str) {
    return str.length === 1 && operators.has(str);
}
const mathParser = {
    toTokenArray(expression, constants = new Map(), userFunctions = new Map()) {
        let expressionCopy = expression
            .replace(/\s/g, "")
            .replace(/(?<=\d)([a-zA-Z]'*)/g, "*$1")
            + " ";
        let output = [];
        while (expressionCopy.length > 0) {
            let previous = "";
            for (let i = 1; i <= expressionCopy.length; i++) {
                const slice = expressionCopy.slice(0, i);
                if (isNumber(previous) && !isNumber(slice)) {
                    output.push(new Operand(previous));
                    break;
                }
                else if (isVariable(previous) && !isVariable(slice)) {
                    if (slice.endsWith("(")) { // check if it's a function
                        if (functions.has(previous)) { // @ts-ignore
                            output.push(functions.get(previous));
                            break;
                        }
                        else if (userFunctions.has(previous)) {
                            // @ts-ignore
                            let func = userFunctions.get(previous);
                            if (typeof (func) === "string") {
                                func = this.toFunction(previous, func, constants, userFunctions);
                            }
                            output.push(func);
                            break;
                        }
                        else {
                            throw new Error("Found invalid function " + previous);
                        }
                    }
                    else if (constants.has(previous)) {
                        // @ts-ignore
                        let constant = constants.get(previous);
                        const constantsCopy = constants;
                        constantsCopy.delete(constant);
                        output.push(...this.toTokenArray("(" + constant + ")", constantsCopy));
                        break;
                    }
                    else {
                        throw new Error("Could not find variable \"" + previous + "\"!");
                    }
                }
                else if (isOperator(previous) && !isOperator(slice)) {
                    if (output.length === 0 && (previous[0] === "+" || previous[0] === "-")) {
                        previous = slice;
                    }
                    else {
                        const operator = operators.get(previous);
                        if (operator !== undefined)
                            output.push(operator);
                        break;
                    }
                }
                else if (isParentheses(slice)) {
                    const parenthesis = parentheses.get(slice);
                    if (parenthesis !== undefined)
                        output.push(parenthesis);
                    previous = slice;
                    break;
                }
                else if (slice.length === expressionCopy.length) { // If nothing was found in the entire string
                    expressionCopy = expressionCopy.slice(1);
                }
                else { // If nothing was found for the current slice
                    previous = slice;
                }
            }
            expressionCopy = expressionCopy.replace(previous, "");
        }
        let fromIndex = 0;
        while (true) {
            // @ts-ignore
            let lastIndex = output.lastIndexOf(operators.get("-"));
            if (lastIndex === fromIndex || lastIndex === -1)
                break;
            // @ts-ignore
            let index = output.indexOf(operators.get("-"), fromIndex);
            if (index >= 1 && !(output[index - 1] instanceof Number)) {
                output.splice(index, 2, new Operand(output[index].value + output[index + 1].value));
            }
            fromIndex = index;
        }
        return output;
    },
    // https://en.wikipedia.org/wiki/Shunting_yard_algorithm
    toPostfixNotation(expression, constants = new Map(), userFunctions = new Map()) {
        expression = expression.replace(/\s/g, "");
        let tokenArray = this.toTokenArray(expression, constants, userFunctions);
        // https://en.wikipedia.org/wiki/Reverse_Polish_notation
        let postfixOutput = [];
        let operatorStack = [];
        while (tokenArray.length > 0) {
            if (tokenArray[0] instanceof Operand) {
                postfixOutput.push(tokenArray[0]);
            }
            else if (tokenArray[0] instanceof TFunction) {
                operatorStack.push(tokenArray[0]);
            }
            else if (tokenArray[0] instanceof Operator) {
                while (true) {
                    // @ts-ignore
                    const top = operatorStack.at(-1);
                    if (top instanceof Operator
                        && (top.precedence > tokenArray[0].precedence
                            || (top.precedence === tokenArray[0].precedence
                                && tokenArray[0].associativity === Associativity.LEFT))) {
                        // @ts-ignore
                        postfixOutput.push(operatorStack.pop());
                    }
                    else {
                        operatorStack.push(tokenArray[0]);
                        break;
                    }
                }
            }
            else if (tokenArray[0].value === "(") {
                operatorStack.push(tokenArray[0]);
            }
            else if (tokenArray[0].value === ")") {
                // @ts-ignore
                while (operatorStack.at(-1).value !== "(") {
                    if (operatorStack.length === 0) {
                        throw new Error("Mismatched parentheses! This should be impossible.");
                    }
                    // @ts-ignore
                    postfixOutput.push(operatorStack.pop());
                }
                // @ts-ignore
                if (operatorStack.at(-1).value === "(") {
                    operatorStack.pop();
                }
                if (operatorStack.at(-1) instanceof TFunction) {
                    // @ts-ignore
                    postfixOutput.push(operatorStack.pop());
                }
            }
            tokenArray.shift();
        }
        while (operatorStack.length > 0) {
            if (!(operatorStack.at(-1) instanceof Parenthesis)) {
                // @ts-ignore
                postfixOutput.push(operatorStack.pop());
            }
            else {
                throw new Error("Mismatched parentheses! This should be impossible.");
            }
        }
        return postfixOutput;
    },
    // Helper method to convert a string into a js Function
    toFunction(name, expression, constants = new Map(), userFunctions = new Map()) {
        return new TFunction(name, (x) => {
            let variable = "x";
            while (constants.has(variable)) {
                variable += "'";
            }
            constants.set(variable, x.toString());
            return this.calculate(expression.replace(/x/g, variable), constants, userFunctions);
        });
    },
    calculate(expression, constants = new Map(), userFunctions = new Map()) {
        let postfix = this.toPostfixNotation(expression, constants, userFunctions);
        while (true) {
            let foundOperator = false;
            for (let i = 0; i < postfix.length; i++) {
                if (postfix[i] instanceof Operator) {
                    const operator = postfix[i];
                    foundOperator = true;
                    try {
                        const result = operator.apply(parseFloat(postfix[i - 2].value), parseFloat(postfix[i - 1].value));
                        postfix.splice(i - 2, 3, new Operand(result.toString()));
                    }
                    catch (e) {
                        throw new Error("Invalid expression! There aren't enough operands");
                    }
                    break;
                }
                else if (postfix[i] instanceof TFunction) {
                    const func = postfix[i];
                    foundOperator = true;
                    const args = postfix.slice(i - func.onApply.length, i).map(value => parseFloat(value.value));
                    const result = func.apply(args);
                    postfix.splice(i - func.onApply.length, func.onApply.length + 1, new Operand(result.toString()));
                    break;
                }
            }
            if (!foundOperator)
                break;
        }
        if (postfix.length > 1) {
            throw new Error("Invalid expression! There are too many operands");
        }
        return parseFloat(postfix[0].value);
    }
};
exports.mathParser = mathParser;
// const userFunctions = new Map([
//     ["f", "2x+3"],
//     ["g", "2*f(x)"]
// ])
// const constants = new Map([
//     ["x", "6+5"],
//     ["y", "2x+3"],
//     ["z", "5x-2y"]
// ])
console.log(mathParser.calculate("sqrt(-1)"));
