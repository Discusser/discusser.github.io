enum Associativity {
    LEFT,
    RIGHT
}

interface Token {
    readonly value: string;
}

class Operator implements Token {
    readonly value: string;
    readonly precedence: Number;
    readonly associativity: Associativity;

    constructor(value: string, precedence: Number, associativity: Associativity) {
        this.value = value;
        this.precedence = precedence;
        this.associativity = associativity;
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

const parentheses = new Map([
    ["(", new Parenthesis("(")],
    [")", new Parenthesis(")")]
])

const operators = new Map([
    // Exponentiation
    ["^", new Operator("^", 4, Associativity.RIGHT)],
        // ["**", new Operator("**", 4, Associativity.RIGHT)],
    // Multiplication
    ["*", new Operator("*", 3, Associativity.LEFT)],
        // ["×", new Operator("×", 3, Associativity.LEFT)],
    // Division
    ["/", new Operator("/", 3, Associativity.LEFT)],
        // ["÷", new Operator("÷", 3, Associativity.LEFT)],
        // [":", new Operator(":", 3, Associativity.LEFT)],
    // Addition
    ["+", new Operator("+", 2, Associativity.LEFT)],
    // Subtraction
    ["-", new Operator("-", 2, Associativity.LEFT)],
]);

function isNumber(str: string) {
    try {
        return str.replace(str.match(/\d+\.*\d*/)![0], "").length === 0;
    } catch (e) {
        return false;
    }
}

function isParentheses(str: string) {
    return str.length === 1 && (str[0] == "(" || str[0] == ")")
}

// todo: support operators longer than 1 character
function isOperator(str: string) {
    return str.length === 1 && operators.has(str);
}

const mathParser = {
    // 15 - 8 * 14.6
    // 3+4*2/(1-5)^2^3
    // todo: support numbers written like -5 or +10
    toTokenArray(expression: string): Array<Token> {
        let expressionCopy: string = expression.replace(/\s/g, "") + " ";
        let output: Array<Token> = [];

        while (expressionCopy.length > 0) {
            let previous: string = "";

            for (let i = 1; i <= expressionCopy.length; i++) {
                const slice: string = expressionCopy.slice(0, i);

                if (isNumber(previous) && !isNumber(slice)) {
                    output.push(new Operand(previous));
                    break;
                } else if (isOperator(slice)) {
                    const operator: Operator | undefined = operators.get(slice);
                    if (operator != undefined) output.push(operator);
                    previous = slice;
                    break;
                } else if (isParentheses(slice)) {
                    const parenthesis: Parenthesis | undefined = parentheses.get(slice);
                    if (parenthesis != undefined) output.push(parenthesis);
                    previous = slice;
                    break;
                }

                previous = slice;
            }

            expressionCopy = expressionCopy.replace(previous, "");
        }

        return output;
    },

    // todo: allow for functions like f(x) or cos(x)
    // https://en.wikipedia.org/wiki/Shunting_yard_algorithm
    toPostfixNotation(expression: string): Array<Token> {
        if (!/^([-+]*[\da-zA-Z]+)([-+*/^(]\(*[-+]*[\da-zA-Z]+\)*)*$/.test(expression)) {
            throw new Error("Invalid expression!")
        }

        let tokenArray: Array<Token> = this.toTokenArray(expression);

        // https://en.wikipedia.org/wiki/Reverse_Polish_notation
        let postfixOutput: Array<Token> = [];
        let operatorStack: Array<Operator | Parenthesis> = [];

        while (tokenArray.length > 0) {
            if (tokenArray[0] instanceof Operand) {
                postfixOutput.push(tokenArray[0]);
            } else if (tokenArray[0] instanceof Operator) {
                while (true) {
                    // @ts-ignore
                    const top: Operator | Parenthesis = operatorStack.at(-1);
                    if (top instanceof Operator
                        && (top.precedence > tokenArray[0].precedence
                            || (top.precedence === tokenArray[0].precedence
                                && tokenArray[0].associativity == Associativity.LEFT
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

                //         if there is a function token at the top of the operator stack, then:
                //             pop the function from the operator stack into the output queue
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
    }
}

console.log(mathParser.toPostfixNotation("3+4*2/(1-5)^2^3"));

export { mathParser }