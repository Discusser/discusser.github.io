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

    apply(args: Array<number>) {
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

const descriptors = Object.getOwnPropertyDescriptors(Math);
const keys = Object.keys(descriptors);
for (let i = 0; i < keys.length; i++) {
    let value = descriptors[keys[i]].value;
    if (typeof(value) === "function") functions.set(keys[i], new TFunction(keys[i], value))
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
    toTokenArray(expression: string, constants: Map<string, string> = new Map(),
                 userFunctions: Map<string, TFunction | string> = new Map()): Array<Token> {
        let expressionCopy: string = expression
                .replace(/\s/g, "")
                .replace(/(?<=\d)([a-zA-Z]'*)/g, "*$1")
            + " ";
        let output: Array<Token> = [];

        while (expressionCopy.length > 0) {
            let previous: string = "";

            for (let i = 1; i <= expressionCopy.length; i++) {
                const slice: string = expressionCopy.slice(0, i);

                if (isNumber(previous) && !isNumber(slice)) {
                    output.push(new Operand(previous));

                    break;
                } else if (isVariable(previous) && !isVariable(slice)) {
                    if (slice.endsWith("(")) { // check if it's a function
                        if (functions.has(previous)) { // @ts-ignore
                            output.push(functions.get(previous));

                            break;
                        } else if (userFunctions.has(previous)) {
                            // @ts-ignore
                            let func: string | TFunction = userFunctions.get(previous);
                            if (typeof(func) === "string") {
                                func = this.toFunction(previous, func, constants, userFunctions);
                            }

                            output.push(func);

                            break;
                        } else {
                            throw new Error("Found invalid function " + previous);
                        }
                    } else if (constants.has(previous)) {
                        // @ts-ignore
                        let constant: string = constants.get(previous);
                        const constantsCopy = constants;
                        constantsCopy.delete(constant)
                        output.push(...this.toTokenArray("(" + constant + ")", constantsCopy));

                        break;
                    } else {
                        throw new Error("Could not find variable \"" + previous + "\"!")
                    }
                } else if (isOperator(previous) && !isOperator(slice)) {
                    if (output.length === 0 && (previous[0] === "+" || previous[0] === "-")) {
                        previous = slice;
                    } else {
                        const operator: Operator | undefined = operators.get(previous);
                        if (operator !== undefined) output.push(operator);

                        break;
                    }
                } else if (isParentheses(slice)) {
                    const parenthesis: Parenthesis | undefined = parentheses.get(slice);
                    if (parenthesis !== undefined) output.push(parenthesis);

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

        return output;
    },

    // https://en.wikipedia.org/wiki/Shunting_yard_algorithm
    toPostfixNotation(expression: string, constants: Map<string, string> = new Map(),
                      userFunctions: Map<string, TFunction | string> = new Map()): Array<Token> {
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
                    // @ts-ignore
                    const top: Operator | Parenthesis | TFunction = operatorStack.at(-1);
                    if (top instanceof Operator
                        && (top.precedence > tokenArray[0].precedence
                            || (top.precedence === tokenArray[0].precedence
                                && tokenArray[0].associativity === Associativity.LEFT
                            )
                        )
                    ) {
                        // @ts-ignore
                        postfixOutput.push(operatorStack.pop());
                    } else {
                        operatorStack.push(tokenArray[0]);
                        break;
                    }
                }
            } else if (tokenArray[0].value === "(") {
                operatorStack.push(tokenArray[0]);
            } else if (tokenArray[0].value === ")") {
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
            } else {
                throw new Error("Mismatched parentheses! This should be impossible.");
            }
        }

        return postfixOutput;
    },

    // Helper method to convert a string into a js Function
    toFunction(name: string, expression: string, constants: Map<string, string> = new Map(),
               userFunctions: Map<string, TFunction | string> = new Map()): TFunction {
        return new TFunction(name, (x: number) => {
            let variable = "x";

            while (constants.has(variable)) {
                variable += "'";
            }

            constants.set(variable, x.toString());

            return this.calculate(expression.replace(/x/g, variable), constants, userFunctions);
        });
    },

    calculate(expression: string, constants: Map<string, string> = new Map(),
              userFunctions: Map<string, TFunction | string> = new Map()): number {
        let postfix: Array<Token> = this.toPostfixNotation(expression, constants, userFunctions);
        while (true) {
            let foundOperator = false;

            for (let i = 0; i < postfix.length; i++) {
                if (postfix[i] instanceof Operator) {
                    const operator: Operator = <Operator>postfix[i];
                    foundOperator = true;

                    try {
                        const result = operator.apply(parseFloat(postfix[i - 2].value), parseFloat(postfix[i - 1].value));

                        postfix.splice(i - 2, 3, new Operand(result.toString()));
                    } catch (e) {
                        throw new Error("Invalid expression! There aren't enough operands")
                    }

                    break;
                } else if (postfix[i] instanceof TFunction) {
                    const func: TFunction = <TFunction>postfix[i];
                    foundOperator = true;

                    const args: number[] = postfix.slice(i - func.onApply.length, i).map(value => parseFloat(value.value));
                    const result = func.apply(args)

                    postfix.splice(i - func.onApply.length, func.onApply.length + 1,
                        new Operand(result.toString()))

                    break;
                }
            }

            if (!foundOperator) break;
        }

        if (postfix.length > 1) {
            throw new Error("Invalid expression! There are too many operands")
        }

        return parseFloat(postfix[0].value);
    }
}

// const userFunctions = new Map([
//     ["f", "2x+3"],
//     ["g", "2*f(x)"]
// ])
// const constants = new Map([
//     ["x", "6+5"],
//     ["y", "2x+3"],
//     ["z", "5x-2y"]
// ])

export { mathParser }