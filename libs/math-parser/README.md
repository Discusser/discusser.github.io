# math-parser

Math parser is a program made in TypeScript that can parse strings into useable mathematical expressions.

## Features

- All functions from the builtin `Math` object, such as `cos` `log` `pow`
- User-defined functions, such as `f(x) = 2x + 3`
- User-defined constants, such as `a = 10` `b = 15*a + f(2)`

## Performance

probably not very good

## How it works

- The string is converted into a list of tokens. For example, `2+3` becomes `[Operand(2), Operator(+), Operand(3)]`.
- The list of tokens is then rewritten in [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) using the [Shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).
- Finally, the list of tokens can be evaluated (see [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)).