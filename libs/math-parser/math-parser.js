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
// class Constant implements Operand {
//     readonly key: string
//     readonly value: string;
//
//     constructor(key: string, value: string) {
//         this.key = key;
//         this.value = value;
//     }
// }
// Represents a list of tokens in Reverse Polish notation
class CompiledExpression {
    tokens;
    constants; // todo: only accept Map<string, number>
    userFunctions;
    constructor(tokens, constants, userFunctions) {
        this.tokens = tokens;
        this.constants = constants;
        this.userFunctions = userFunctions;
    }
    calculate() {
        const expression = this.tokens.slice();
        while (true) {
            let foundOperator = false;
            for (let i = 0; i < expression.length; i++) {
                if (expression[i] instanceof Operator) {
                    const operator = expression[i];
                    foundOperator = true;
                    try {
                        const result = operator.apply(parseFloat(expression[i - 2].value), parseFloat(expression[i - 1].value));
                        expression.splice(i - 2, 3, new Operand(mathParser.numToStr(result)));
                    }
                    catch (e) {
                        throw new Error("Invalid expression! There aren't enough operands");
                    }
                    break;
                }
                else if (expression[i] instanceof TFunction) {
                    const func = expression[i];
                    foundOperator = true;
                    const args = expression.slice(i - func.onApply.length, i).map(value => parseFloat(value.value));
                    const result = func.apply(args);
                    expression.splice(i - func.onApply.length, func.onApply.length + 1, new Operand(mathParser.numToStr(result)));
                    break;
                }
                else if (expression[i] instanceof Operand) {
                    const value = expression[i].value;
                    if (!isVariable(value))
                        continue;
                    if (this.constants.has(value)) {
                        expression.splice(i, 1, ...mathParser.toPostfixNotation("(" + this.constants.get(value) + ")", this.constants, this.userFunctions).tokens);
                    }
                    else {
                        throw new Error("Could not find variable \"" + expression[i] + "\"!");
                    }
                }
            }
            if (!foundOperator)
                break;
        }
        if (expression.length > 1) {
            throw new Error("Invalid expression! There are too many operands");
        }
        return parseFloat(expression[0].value);
    }
    compile() {
        return mathParser.compile(mathParser.tokensToStr(this.tokens), this.constants, this.userFunctions);
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
    if (str == undefined) {
        throw new Error("Input string cannot be undefined");
    }
    return /^[-+]?\d+\.*\d*$/.test(str);
}
function isVariable(str) {
    if (str == undefined) {
        throw new Error("Input string cannot be undefined!");
    }
    return /^[a-zA-Z]+'*$/.test(str);
}
function isParentheses(str) {
    if (str == undefined) {
        throw new Error("Input string cannot be undefined");
    }
    return str.length === 1 && (str[0] === "(" || str[0] === ")");
}
// todo: support operators longer than 1 character
function isOperator(str) {
    if (str == undefined) {
        throw new Error("Input string cannot be undefined");
    }
    return str.length === 1 && operators.has(str);
}
const mathParser = {
    numToStr(num) {
        let str = num.toString();
        if (Number.isInteger(num)) {
            return str;
        }
        else {
            if (str.includes("e") || str.includes("E")) {
                try {
                    return num.toFixed(Math.min(str.match(/(?<=.)\d+/)[0].length +
                        parseInt(str.match(/\d+$/)[0], 100)));
                }
                catch (e) {
                    throw new Error("Invalid number format. This should be impossible!");
                }
            }
            else {
                return num.toFixed(str.slice(str.indexOf(".") + 1).length);
            }
        }
    },
    mapStringToFunction(constants, userFunctions) {
        let userFunctionsCopy = new Map();
        userFunctions.forEach((value, key) => {
            if (typeof (value) === "string") {
                userFunctionsCopy.set(key, this.toFunction(key, value, constants, userFunctions));
            }
            else {
                userFunctionsCopy.set(key, value);
            }
        });
        return userFunctionsCopy;
    },
    // (-1*(x+(3-y)/(y^2-(b*c)+7)-150))
    // Finds where a certain parenthesis ends
    // searchAfter is included
    lastIndexOfGroup(str, searchAfter) {
        let count = null;
        for (let i = searchAfter; i < str.length; i++) {
            if (str[i] === "(")
                count++;
            else if (str[i] === ")")
                count--;
            if (count === 0)
                return i;
        }
        return -1;
    },
    tokensToStr(tokens) {
        let str = "";
        tokens.forEach(value => str += value.value);
        return str;
    },
    toTokenArray(expression, constants = new Map(), userFunctions = new Map()) {
        let expressionCopy = expression
            .replace(/\s/g, "")
            .replace(/(?<=\d)([a-zA-Z]'*)/g, "*$1")
            + " ";
        let output = [];
        userFunctions = this.mapStringToFunction(constants, userFunctions);
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
                        if (functions.has(previous)) {
                            output.push(functions.get(previous));
                            break;
                        }
                        else if (userFunctions.has(previous)) {
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
                    else {
                        output.push(new Operand(previous));
                        break;
                    }
                }
                else if (isOperator(previous) && !isOperator(slice)) {
                    output.push(operators.get(previous));
                    break;
                }
                else if (isParentheses(slice)) {
                    output.push(parentheses.get(slice));
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
        output.forEach((value, index) => {
            if (value.value === "+") {
                if (index === 0)
                    output.splice(0, 1);
                else if (index - 1 >= 0) {
                    if (output[index - 1].value === "-" || output[index + 1].value === "-") {
                        output.splice(index, 1);
                    }
                }
            }
            else if (value.value === "-") {
                if ((index - 1 >= 0 && output[index - 1].value === "-") ||
                    (output[index + 1].value === "-")) {
                    return;
                }
                if (index === 0 && output[index + 1] instanceof Operand) {
                    output.splice(index, 2, new Operand("-" + output[index + 1].value));
                }
                else if (output[index - 1] instanceof Operand) {
                }
                else if (output[index - 1].value === ")") {
                    output.splice(index, 1, operators.get("-"), new Operand("1"), operators.get("*"));
                    let lastIndexOfGroup = this.lastIndexOfGroup(this.tokensToStr(output), index + 3);
                    output.splice(lastIndexOfGroup === -1 ? index + 1 : lastIndexOfGroup, 0);
                }
                else if (output[index - 1].value === "(") {
                    output.splice(index, 1, new Operand("-1"), operators.get("*"), parentheses.get("("));
                    output.splice(index + 3 + 1, 0, parentheses.get(")"));
                }
                else {
                    output.splice(index, 1, parentheses.get("("), new Operand("-1"), operators.get("*"));
                    let lastIndexOfGroup = this.lastIndexOfGroup(this.tokensToStr(output.slice(1)), index + 3);
                    output.splice(lastIndexOfGroup === -1 ? index + 1 : lastIndexOfGroup, 0, parentheses.get(")"));
                }
            }
        });
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
                    const top = operatorStack.at(-1);
                    if (top instanceof Operator
                        && (top.precedence > tokenArray[0].precedence
                            || (top.precedence === tokenArray[0].precedence
                                && tokenArray[0].associativity === Associativity.LEFT))) {
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
                while (operatorStack.at(-1).value !== "(") {
                    if (operatorStack.length === 0) {
                        throw new Error("Mismatched parentheses! This should be impossible.");
                    }
                    postfixOutput.push(operatorStack.pop());
                }
                if (operatorStack.at(-1).value === "(") {
                    operatorStack.pop();
                }
                if (operatorStack.at(-1) instanceof TFunction) {
                    postfixOutput.push(operatorStack.pop());
                }
            }
            tokenArray.shift();
        }
        while (operatorStack.length > 0) {
            if (!(operatorStack.at(-1) instanceof Parenthesis)) {
                postfixOutput.push(operatorStack.pop());
            }
            else {
                throw new Error("Mismatched parentheses! This should be impossible.");
            }
        }
        return new CompiledExpression(postfixOutput, constants, userFunctions);
    },
    // Helper method to convert a string into a js Function
    toFunction(name, expression, constants = new Map(), userFunctions = new Map()) {
        return new TFunction(name, (x) => {
            const constantsCopy = new Map(constants);
            let variable = "x";
            while (constantsCopy.has(variable)) {
                variable += "'";
            }
            constantsCopy.set(variable, this.numToStr(x));
            return this.compile(expression.replace(/x/g, variable), constantsCopy, userFunctions).calculate();
        });
    },
    compile(expression, constants = new Map(), userFunctions = new Map()) {
        return this.toPostfixNotation(expression, constants, this.mapStringToFunction(constants, userFunctions));
    },
};
// Benchmark
// Reference times:
//  ( 3x^2+2x-4 ) x 1001 => ~70ms
// {
//     const userFunctions = new Map([
//         ["f", "3x^2+2x-4"]
//     ])
//     const constants = new Map([
//         ["x", "-16"]
//     ]);
//
//     let expression = mathParser.compile("f(x)", constants);
//
//     const start = new Date();
//
//     for (let i = 0; i < 1001; i++) {
//         expression.calculate()
//
//         constants.set("x", mathParser.numToStr((parseFloat(constants.get("x")) + 0.032)));
//         expression = mathParser.compile("f(x)", constants);
//     }
//
//     const end = new Date();
//     console.log(end.getTime() - start.getTime());
// }
export default mathParser;
