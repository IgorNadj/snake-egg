import { GeneratingPuzzle, Neighbours, GridCell } from '../GeneratingPuzzle';
import { PointInt } from 'polyomino';
import { Set } from 'immutable';
import { Puzzle } from '../Puzzle';


export class Snake {

    public static isValid(puzzle: GeneratingPuzzle): boolean {
        if (puzzle.placedPolyominos.size === 0) {
            return false;
        }

        const grid = puzzle.getGrid();

        let numberSnakeEndSegments = 0;

        for (let x = 0; x < puzzle.width; x++) {
            for (let y = 0; y < puzzle.height; y++) {
                if (grid[y][x] === GridCell.SNAKE) {
                    const neighbours = puzzle.getGridNeighbours(grid, x, y);
                    const countSnakeAdjacentSegments = this.countSnakeAdjacentSegments(neighbours);
                    if (countSnakeAdjacentSegments === 0) {
                        // orphan snake segment
                        return false;
                    }
                    if (countSnakeAdjacentSegments === 1) {
                        // must be the head/tail of the snake
                        numberSnakeEndSegments++;
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
                        if (this.snakeLoops(neighbours)) {
                            return false;
                        }
                    }
                }
            }
        }

        if (numberSnakeEndSegments === 0) {
            // looping snake
            return false;
        }
        if (numberSnakeEndSegments > 2) {
            // must have multiple snakes
            return false;
        }

        return true;
    }

    protected static countSnakeAdjacentSegments(neighbours: Neighbours): number {
        let count = 0;
        if (neighbours.top === GridCell.SNAKE) count++;
        if (neighbours.right === GridCell.SNAKE) count++;
        if (neighbours.bottom === GridCell.SNAKE) count++;
        if (neighbours.left === GridCell.SNAKE) count++;
        return count;
    }

    protected static snakeLoops(neighbours: Neighbours): boolean {
        if (neighbours.top === GridCell.SNAKE && neighbours.right === GridCell.SNAKE && neighbours.topRight === GridCell.SNAKE) return true;
        if (neighbours.right === GridCell.SNAKE && neighbours.bottom === GridCell.SNAKE && neighbours.bottomRight === GridCell.SNAKE) return true;
        if (neighbours.bottom === GridCell.SNAKE && neighbours.left === GridCell.SNAKE && neighbours.bottomLeft === GridCell.SNAKE) return true;
        if (neighbours.left === GridCell.SNAKE && neighbours.top === GridCell.SNAKE && neighbours.topLeft === GridCell.SNAKE) return true;
        return false;
    }

}