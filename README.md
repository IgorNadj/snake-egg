Generates, validates, checks human solvability of, and outputs Snake and Egg puzzles for people to play.

## What is a snake and Egg puzzle?

See https://www.gmpuzzles.com/blog/2015/04/snake-egg-murat-can-tonta/


## Generate

- `npm run build && npm run generate`


## Types of Puzzle

- Puzzle: a completed puzzle, with all polyominos placed. Can be validated to see if it is a valid Snake and Egg puzzle.
- GeneratingPuzzle: a partially completed puzzle, with intermediate validation. Used for iteratively generating a Puzzle.
- HintedPuzzle: what a human would ultimately play. It is mostly empty, with some hints shown.
- SolvingPuzzle: a partially solved puzzle. Uses a HintedPuzzle, and attempts to solve it with a human emulating solver.


## Components

- generator: generates Puzzles
- validator: validates that generated Puzzles are valid
- hinter: reduces a generated Puzzle to one that can be played by a human by hiding information until only a few hints remain
- solver: uses a human solver to attempt to solve a hinted puzzle 



