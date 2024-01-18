# math-parser

Math parser is a program made in TypeScript that can parse strings into useable mathematical expressions.

## Features

- All functions from the builtin `Math` object, such as `cos` `log` `pow`
- User-defined functions, such as `f(x) = 2x + 3`
- User-defined constants, such as `a = 10` `b = 15*a + f(2)`

## Using math-parser

To get started, simply add `import { mathParser } from /path/to/math-parser` to your JavaScript file.

### Defining functions or constants

Functions and constants can be defined by creating a Map associating a string to a string.
<pre>
const constants = new Map([
    ["x", "6+5"],
    ["y", "2x+3"],
    ["z", "5x-2y"]
])

const userFunctions = new Map([
    ["f", "2*x+3"],
    ["g", "2*f(x)"]
])
</pre>

### Provided methods

## Performance

probably not very good

## How it works

- The string is converted into a list of tokens. For example, `2+3` becomes `[Operand(2), Operator(+), Operand(3)]`.
- The list of tokens is then rewritten in [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) using the [Shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).
- Finally, the list of tokens can be evaluated (see [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)).