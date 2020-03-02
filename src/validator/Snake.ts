import { PointInt } from 'polyomino';
import { Set } from 'immutable';
import { Puzzle, GridCell } from '../Puzzle';


export class Snake {

    public static isValid(puzzle: Puzzle): boolean {
        if (puzzle.placedPolyominos.size === 0) {
            return false;
        }

        const grid = puzzle.getGrid();

        let validSnakeEnds: Set<PointInt> = Set();

        let totalNumberOfSnakeCells = 0;

        for (let x = 0; x < puzzle.width; x++) {
            for (let y = 0; y < puzzle.height; y++) {
                if (grid.get(x, y) === GridCell.SNAKE) {
                    totalNumberOfSnakeCells++;
                    const neighbours = puzzle.getGrid().getGridNeighbours(x, y);
                    const countSnakeAdjacentSegments = Puzzle.countSnakeAdjacentSegments(neighbours);
                    if (countSnakeAdjacentSegments === 0) {
                        // orphan snake segment
                        return false;
                    }
                    if (countSnakeAdjacentSegments === 1) {
                        // must be the head/tail of the snake
                        validSnakeEnds = validSnakeEnds.add(new PointInt(x, y));
                    }
                    if (countSnakeAdjacentSegments > 2) {
                        // if 3, snake must have come back to itself
                        return false;
                    }
                    if (countSnakeAdjacentSegments === 2) {
                        // if 2 neighbours, make sure diagonal isn't a snake (forming a square)
                        //  
                        // e.g.       . 
                        //            . .
                        //
                        // if we are centered on bottom left, then top right must not be snake
                        //
                        if (Puzzle.snakeLoopsImmediately(neighbours)) {
                            return false;
                        }
                    }
                }
            }
        }

        if (validSnakeEnds.size === 0) {
            // looping snake
            return false;
        }
        if (validSnakeEnds.size > 2) {
            // must have multiple snakes
            return false;
        }

        /*
         * Could still have multiple snakes, if the second snake loops back in on itself
         * e.g.
         *
         * . . .
         * 3 3 3
         * . . .
         * . 1 .
         * . . .
         *
         * To detect this, we pick a snake head, traverse until we find the tail, and make sure how
         * far we've traversed equals how many snake segments there are in the puzzle
         */
        const snakeLength = puzzle.getSnakeLength(validSnakeEnds.first());
        if (snakeLength !== totalNumberOfSnakeCells) {
            return false;
        }

        return true;
    }

}