import { Grid, Neighbours } from "./grid/Grid";
import { GridCell } from "./Puzzle";
import { PointInt } from "polyomino";
import { Set } from "immutable";


export enum SnakeDirection {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left",
};


export class PuzzleHelper {

    public static getValidSnakeDirections(neighbours: Neighbours<any>): Set<SnakeDirection> {
        let directions: Set<SnakeDirection> = Set();
        if (neighbours.top === null && neighbours.topLeft !== GridCell.SNAKE && neighbours.topRight !== GridCell.SNAKE) {
            directions = directions.add(SnakeDirection.top);
        }
        if (neighbours.right === null && neighbours.topRight !== GridCell.SNAKE && neighbours.bottomRight !== GridCell.SNAKE) {
            directions = directions.add(SnakeDirection.right);
        }
        if (neighbours.bottom === null && neighbours.bottomLeft !== GridCell.SNAKE && neighbours.bottomRight !== GridCell.SNAKE) {
            directions = directions.add(SnakeDirection.bottom);
        }
        if (neighbours.left === null && neighbours.topLeft !== GridCell.SNAKE && neighbours.bottomLeft !== GridCell.SNAKE) {
            directions = directions.add(SnakeDirection.left);
        }
        return directions;
    }

    public static snakeLoopsImmediately(neighbours: Neighbours<any>): boolean {
        if (neighbours.top === GridCell.SNAKE && neighbours.right === GridCell.SNAKE && neighbours.topRight === GridCell.SNAKE) return true;
        if (neighbours.right === GridCell.SNAKE && neighbours.bottom === GridCell.SNAKE && neighbours.bottomRight === GridCell.SNAKE) return true;
        if (neighbours.bottom === GridCell.SNAKE && neighbours.left === GridCell.SNAKE && neighbours.bottomLeft === GridCell.SNAKE) return true;
        if (neighbours.left === GridCell.SNAKE && neighbours.top === GridCell.SNAKE && neighbours.topLeft === GridCell.SNAKE) return true;
        return false;
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
            if (neighbours[direction] === GridCell.SNAKE) {
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
        return grid.countAdjacentCells(x, y, GridCell.SNAKE);
    }

    public static isSnakeHead(grid: Grid<any>, x: number, y: number): boolean {
        if (grid.get(x, y) !== GridCell.SNAKE) {
            return false;
        }
        return PuzzleHelper.countSnakeAdjacentSegments(grid, x, y) <= 1;
    }

    public static getSnakeEnds(grid: Grid<any>): Set<PointInt> {
        let points: Set<PointInt> = Set();
        for (let x = 0; x < grid.width; x++) {
            for (let y = 0; y < grid.height; y++) {
                if (PuzzleHelper.isSnakeHead(grid, x, y)) {
                    points = points.add(new PointInt(x, y));
                }
            }
        }
        return points;
    }

}