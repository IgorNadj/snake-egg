import { Grid, Neighbours } from "../grid/Grid";
import { GridCell } from "../Puzzle";
import { PointInt } from "polyomino";
import { Set } from "immutable";
import {EGG, HintCell} from "../hinter/HintedPuzzle";


export enum SnakeDirection {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left",
};


export class PuzzleHelper {

    public static getValidSnakeDirections(neighbours: Neighbours<any>): Set<SnakeDirection> {
        let directions: Set<SnakeDirection> = Set();

        if (neighbours.top === null && !this.isSnake(neighbours.topLeft) && !this.isSnake(neighbours.topRight)) {
            directions = directions.add(SnakeDirection.top);
        }
        if (neighbours.right === null && !this.isSnake(neighbours.topRight) && !this.isSnake(neighbours.bottomRight)) {
            directions = directions.add(SnakeDirection.right);
        }
        if (neighbours.bottom === null && !this.isSnake(neighbours.bottomLeft) && !this.isSnake(neighbours.bottomRight)) {
            directions = directions.add(SnakeDirection.bottom);
        }
        if (neighbours.left === null && !this.isSnake(neighbours.topLeft) && !this.isSnake(neighbours.bottomLeft)) {
            directions = directions.add(SnakeDirection.left);
        }
        return directions;
    }

    public static snakeLoopsImmediately(neighbours: Neighbours<any>): boolean {
        const tests = [
            ['top', 'right', 'topRight'],
            ['right', 'bottom', 'bottomRight'],
            ['bottom', 'left', 'bottomLeft'],
            ['left', 'top', 'topLeft'],
        ];

        return tests.some((test) => test.every(direction => {
            return this.isSnake(neighbours[direction]);
        }))
    }

    /**
     * Warning: make sure you do a start from a head/tail, rather than a looping snake, to avoid infinite loop regression
     */
    public static getSnakeLength(grid: Grid<any>, currentPos: PointInt, comingFromDirection?: SnakeDirection): number {
        const neighbours = grid.getGridNeighbours(currentPos.x, currentPos.y);
        for (let direction of Object.keys(SnakeDirection)) {
            if (direction === comingFromDirection) {
                // e.g. left is snake, but we came from the left, so ignore it
                continue;
            }
            if (this.isSnake(neighbours[direction])) {
                if (direction === SnakeDirection.top) {
                    return 1 + this.getSnakeLength(grid, new PointInt(currentPos.x, currentPos.y - 1), SnakeDirection.bottom);
                }
                if (direction === SnakeDirection.right) {
                    return 1 + this.getSnakeLength(grid, new PointInt(currentPos.x + 1, currentPos.y), SnakeDirection.left);
                }
                if (direction === SnakeDirection.bottom) {
                    return 1 + this.getSnakeLength(grid, new PointInt(currentPos.x, currentPos.y + 1), SnakeDirection.top);
                }
                if (direction === SnakeDirection.left) {
                    return 1 + this.getSnakeLength(grid, new PointInt(currentPos.x - 1, currentPos.y), SnakeDirection.right);
                }
            }
        }
        // No other snake segments adjacent, must have reached the end.
        return 1;
    }

    public static countSnakeAdjacentSegments(grid: Grid<any>, x: number, y: number): number {
        return grid.countAdjacentCells(x, y, [GridCell.SNAKE, EGG]);
    }

    public static isSnakeHead(grid: Grid<any>, x: number, y: number): boolean {
        if (!this.isSnake(grid.get(x, y))) {
            return false;
        }
        return this.countSnakeAdjacentSegments(grid, x, y) <= 1;
    }

    public static getSnakeEnds(grid: Grid<any>): Set<PointInt> {
        let points: Set<PointInt> = Set();
        for (let x = 0; x < grid.width; x++) {
            for (let y = 0; y < grid.height; y++) {
                if (this.isSnakeHead(grid, x, y)) {
                    points = points.add(new PointInt(x, y));
                }
            }
        }
        return points;
    }

    public static isSnake(cell: HintCell) {
        return cell === GridCell.SNAKE || cell === EGG;
    }

}