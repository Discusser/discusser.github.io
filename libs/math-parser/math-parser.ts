enum Associativity {
    LEFT,
    RIGHT
}

interface Token {
    readonly value: string;
}

class TFunction implements Token {
    readonly value: string;
    readonly onApply: Function;

    constructor(value: string, onApply: Function) {
        this.value = value;
        this.onApply = onApply;
    }

    apply(args: Array<number>): number {
        return this.onApply.apply(null, args);
    }
}

class Operator implements Token {
    readonly value: string;
    readonly precedence: Number;
    readonly associativity: Associativity;
    readonly onApply: Function;

    constructor(value: string, precedence: Number, associativity: Associativity, onApply: Function) {
        this.value = value;
        this.precedence = precedence;
        this.associativity = associativity;
        this.onApply = onApply;
    }

    apply(a: number, b: number): number {
        return this.onApply(a, b);
    }
}

class Parenthesis implements Token {
    readonly value: string;

    constructor(value: string) {
        this.value = value;
    }
}

class Operand implements Token {
    readonly value: string;

    constructor(value: string) {
        this.value = value;
    }
}

// Represents a list of tokens in Reverse Polish notation
class CompiledExpression {
    readonly tokens: Array<Token>;
    readonly constants: Map<string, string>;
    readonly userFunctions: Map<string, TFunction>;

    constructor(tokens: Array<Token>, constants: Map<string, string>, userFunctions: Map<string, TFunction>) {
        this.tokens = tokens;
        this.constants = constants;
        this.userFunctions = userFunctions;
    }

    calculate() {
        const expression = this.tokens;

        while (true) {
            let foundOperator = false;

            for (let i = 0; i < expression.length; i++) {
                if (expression[i] instanceof Operator) {
                    const operator: Operator = <Operator>expression[i];
                    foundOperator = true;

                    try {
                        const result = operator.apply(parseFloat(expression[i - 2].value), parseFloat(expression[i - 1].value));

                        expression.splice(i - 2, 3, new Operand(mathParser.numToStr(result)));
                    } catch (e) {
                        throw new Error("Invalid expression! There aren't enough operands")
                    }

                    break;
                } else if (expression[i] instanceof TFunction) {
                    const func: TFunction = <TFunction>expression[i];
                    foundOperator = true;

                    const args: number[] = expression.slice(i - func.onApply.length, i).map(value => parseFloat(value.value));
                    const result: number = func.apply(args)

                    expression.splice(i - func.onApply.length, func.onApply.length + 1,
                        new Operand(mathParser.numToStr(result)))

                    break;
                }
            }

            if (!foundOperator) break;
        }

        if (expression.length > 1) {
            throw new Error("Invalid expression! There are too many operands")
        }

        return parseFloat(expression[0].value);
    }
}

const parentheses: Map<string, Parenthesis> = new Map([
    ["(", new Parenthesis("(")],
    [")", new Parenthesis(")")]
])

const operators: Map<string, Operator> = new Map([
    // Exponentiation
    ["^", new Operator("^", 4, Associativity.RIGHT, (a: number, b: number) => Math.pow(a, b))],
        // ["**", new Operator("**", 4, Associativity.RIGHT)],
    // Multiplication
    ["*", new Operator("*", 3, Associativity.LEFT, (a: number, b: number) => a * b)],
        // ["×", new Operator("×", 3, Associativity.LEFT)],
    // Division
    ["/", new Operator("/", 3, Associativity.LEFT, (a: number, b: number) => a / b)],
        // ["÷", new Operator("÷", 3, Associativity.LEFT)],
        // [":", new Operator(":", 3, Associativity.LEFT)],
    // Addition
    ["+", new Operator("+", 2, Associativity.LEFT, (a: number, b: number) => a + b)],
    // Subtraction
    ["-", new Operator("-", 2, Associativity.LEFT, (a: number, b: number) => a - b)],
]);

const functions: Map<string, TFunction> = new Map([]);

{
    const descriptors = Object.getOwnPropertyDescriptors(Math);
    const keys = Object.keys(descriptors);
    for (let i = 0; i < keys.length; i++) {
        let value = descriptors[keys[i]].value;
        if (typeof(value) === "function") functions.set(keys[i], new TFunction(keys[i], value))
    }
}

function isNumber(str: string) {
    return /^[-+]?\d+\.*\d*$/.test(str);
}

function isVariable(str: string) {
    return /^[a-zA-Z]+'*$/.test(str);
}

function isParentheses(str: string) {
    return str.length === 1 && (str[0] === "(" || str[0] === ")")
}

// todo: support operators longer than 1 character
function isOperator(str: string) {
    return str.length === 1 && operators.has(str);
}

const mathParser = {
    numToStr(num: number): string {
        let str = num.toString();
        if (Number.isInteger(num)) {
            return str;
        } else {
            if (str.includes("e") || str.includes("E")) {
                try {
                    return num.toFixed(
                        Math.min(str.match(/(?<=.)\d+/)[0].length +
                            parseInt(str.match(/\d+$/)[0], 100))
                    );
                } catch (e) {
                    throw new Error("Invalid number format. This should be impossible!")
                }
            } else {
                return num.toFixed(str.slice(str.indexOf(".") + 1).length)
            }
        }
    },

    mapStringToFunction(constants: Map<string, string>, userFunctions: Map<string, TFunction | string>): Map<string, TFunction> {
        let userFunctionsCopy: Map<string, TFunction> = new Map();

        userFunctions.forEach((value, key) => {
            if (typeof(value) === "string") {
                userFunctionsCopy.set(key, this.toFunction(key, value, constants, userFunctions))
            } else {
                userFunctionsCopy.set(key, value);
            }
        });

        return userFunctionsCopy;
    },

    // (-1*(x+(3-y)/(y^2-(b*c)+7)-150))
    // Finds where a certain parenthesis ends
    // searchAfter is included
    lastIndexOfGroup(str: string, searchAfter: number): number {
        let count: number = null;
        for (let i = searchAfter; i < str.length; i++) {
            if (str[i] === "(") count++;
            else if (str[i] === ")") count--;

            if (count === 0) return i;
        }

        return -1;
    },

    tokensToStr(tokens: Array<Token>): string {
        let str = "";
        tokens.forEach(value => str += value.value);
        return str;
    },

    toTokenArray(expression: string, constants: Map<string, string> = new Map(),
                 userFunctions: Map<string, TFunction | string> = new Map()): Array<Token> {
        let expressionCopy: string = expression
                .replace(/\s/g, "")
                .replace(/(?<=\d)([a-zA-Z]'*)/g, "*$1")
            + " ";
        let output: Array<Token> = [];

        userFunctions = this.mapStringToFunction(constants, userFunctions)

        while (expressionCopy.length > 0) {
            let previous: string = "";

            for (let i = 1; i <= expressionCopy.length; i++) {
                const slice: string = expressionCopy.slice(0, i);

                if (isNumber(previous) && !isNumber(slice)) {
                    output.push(new Operand(previous));

                    break;
                } else if (isVariable(previous) && !isVariable(slice)) {
                    if (slice.endsWith("(")) { // check if it's a function
                        if (functions.has(previous)) {
                            output.push(functions.get(previous));

                            break;
                        } else if (userFunctions.has(previous)) {
                            let func: string | TFunction = userFunctions.get(previous);
                            if (typeof(func) === "string") {
                                func = this.toFunction(previous, func, constants, userFunctions);
                            }

                            output.push(func);

                            break;
                        } else {
                            throw new Error("Found invalid function " + previous);
                        }
                    }
                    else if (constants.has(previous)) {
                        const constant: string = constants.get(previous);
                        const constantsCopy = new Map(constants);
                        constantsCopy.delete(constant)
                        output.push(...this.toTokenArray("(" + constant + ")", constantsCopy, userFunctions));

                        break;
                    } else {
                        throw new Error("Could not find variable \"" + previous + "\"!")
                    }
                } else if (isOperator(previous) && !isOperator(slice)) {
                    output.push(operators.get(previous));

                    break;
                } else if (isParentheses(slice)) {
                    output.push(parentheses.get(slice));

                    previous = slice;

                    break;
                } else if (slice.length === expressionCopy.length) { // If nothing was found in the entire string
                    expressionCopy = expressionCopy.slice(1);
                } else { // If nothing was found for the current slice
                    previous = slice;
                }
            }

            expressionCopy = expressionCopy.replace(previous, "");
        }

        output.forEach((value, index) => {
            if (value.value === "+") {
                if (index === 0) output.splice(0, 1);
                else if (index - 1 >= 0) {
                    if (output[index - 1].value === "-" || output[index + 1].value === "-") {
                        output.splice(index, 1);
                    }
                }
            } else if (value.value === "-") {
                if ((index - 1 >= 0 && output[index - 1].value === "-") ||
                    (output[index + 1].value === "-")) {
                    return;
                }

                if (index === 0 && output[index + 1] instanceof Operand) {
                    output.splice(index, 2, new Operand("-" + output[index + 1].value))
                } else if (output[index - 1] instanceof Operand) {
                } else if (output[index - 1].value === ")") {
                    output.splice(index, 1, operators.get("-"), new Operand("1"), operators.get("*"))

                    let lastIndexOfGroup = this.lastIndexOfGroup(this.tokensToStr(output), index + 3);
                    output.splice(lastIndexOfGroup === -1 ? index + 1 : lastIndexOfGroup, 0)
                } else if (output[index - 1].value === "(") {
                    output.splice(index, 1, new Operand("-1"), operators.get("*"), parentheses.get("("));
                    output.splice(index + 3 + 1, 0, parentheses.get(")"));
                } else {
                    output.splice(index, 1, parentheses.get("("), new Operand("-1"), operators.get("*"))

                    let lastIndexOfGroup = this.lastIndexOfGroup(this.tokensToStr(output.slice(1)), index + 3);
                    output.splice(lastIndexOfGroup === -1 ? index + 1 : lastIndexOfGroup, 0, parentheses.get(")"));
                }
            }
        })

        return output;
    },

    // https://en.wikipedia.org/wiki/Shunting_yard_algorithm
    toPostfixNotation(expression: string, constants: Map<string, string> = new Map(),
                      userFunctions: Map<string, TFunction> = new Map()): CompiledExpression {
        expression = expression.replace(/\s/g, "");

        let tokenArray: Array<Token> = this.toTokenArray(expression, constants, userFunctions);

        // https://en.wikipedia.org/wiki/Reverse_Polish_notation
        let postfixOutput: Array<Token> = [];
        let operatorStack: Array<Operator | Parenthesis | TFunction> = [];

        while (tokenArray.length > 0) {
            if (tokenArray[0] instanceof Operand) {
                postfixOutput.push(tokenArray[0]);
            } else if (tokenArray[0] instanceof TFunction) {
                operatorStack.push(tokenArray[0]);
            } else if (tokenArray[0] instanceof Operator) {
                while (true) {
                    const top: Operator | Parenthesis | TFunction = operatorStack.at(-1);
                    if (top instanceof Operator
                        && (top.precedence > tokenArray[0].precedence
                            || (top.precedence === tokenArray[0].precedence
                                && tokenArray[0].associativity === Associativity.LEFT
                            )
                        )
                    ) {
                        postfixOutput.push(operatorStack.pop());
                    } else {
                        operatorStack.push(tokenArray[0]);
                        break;
                    }
                }
            } else if (tokenArray[0].value === "(") {
                operatorStack.push(tokenArray[0]);
            } else if (tokenArray[0].value === ")") {
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
            } else {
                throw new Error("Mismatched parentheses! This should be impossible.");
            }
        }

        return new CompiledExpression(postfixOutput, constants, userFunctions);
    },

    // Helper method to convert a string into a js Function
    toFunction(name: string, expression: string, constants: Map<string, string> = new Map(),
               userFunctions: Map<string, TFunction | string> = new Map()): TFunction {
        return new TFunction(name, (x: number) => {
            const constantsCopy = new Map(constants);
            let variable = "x";

            while (constantsCopy.has(variable)) {
                variable += "'";
            }

            constantsCopy.set(variable, this.numToStr(x));

            return this.compile(expression.replace(/x/g, variable), constantsCopy, userFunctions).calculate();
        });
    },

    compile(expression: string, constants: Map<string, string> = new Map(),
            userFunctions: Map<string, TFunction | string> = new Map()): CompiledExpression {
        return this.toPostfixNotation(expression, constants, this.mapStringToFunction(constants, userFunctions));
    },
}

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
//     let expression = mathParser.compile("f(x)", constants, userFunctions);
//
//     const start = new Date();
//
//     for (let i = 0; i < 1001; i++) {
//         expression.calculate()
//
//         constants.set("x", numToStr((parseFloat(constants.get("x")) + 0.032)));
//         expression = mathParser.compile("f(x)", constants, userFunctions);
//     }
//
//     const end = new Date();
//     console.log(end.getTime() - start.getTime());
// }

export default mathParser