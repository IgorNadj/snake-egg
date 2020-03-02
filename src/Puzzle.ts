import { Polyomino, PointInt } from 'polyomino';
import { Set } from 'immutable';
import { PlacedPolyomino } from './polyomino/PlacedPolyomino';
import { Snake } from './validator/Snake';
import { PolyominosInBounds } from './validator/PolyominosInBounds';
import { PolyominosOverlap } from './validator/PolyominosOverlap';
import { Grid, Neighbours } from "./Grid";

export enum GridCell {
    SNAKE = ".",
    POLY = "P"
};

export enum SnakeDirection {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left",
};

/**
 * A puzzle represents a grid of cells, with all cells solved.
 * 
 * A puzzle ready for a human to tackle is called a HintedPuzzle.
 */
export class Puzzle {

    readonly placedPolyominos: Set<PlacedPolyomino>;
    protected grid: Grid<GridCell> = null;

    constructor(readonly width: number, readonly height: number, readonly maxNumber: number, placedPolyominos: Set<PlacedPolyomino> | null = null) {
        this.placedPolyominos = placedPolyominos ? placedPolyominos : Set();
    }

    public isSnakeValid(): boolean {
        return;
    }

    public isValid(): boolean {
        if (!PolyominosInBounds.isValid(this)) return false;
        if (!PolyominosOverlap.isValid(this)) return false;
        if (!Snake.isValid(this)) return false;
        return true;
    }

    public getGrid(): Grid<GridCell> {
        // lazy-evaluate, and cache for performace
        if (this.grid === null) {
            let grid: Grid<GridCell> = new Grid(this.width, this.height);
            grid = grid.setAll(GridCell.SNAKE);
            this.placedPolyominos.forEach((poly) => {
                poly.getAbsolutePoints().forEach((point) => {
                    grid = grid.set(point.x, point.y, GridCell.POLY);
                });
            });
            this.grid = grid;
        }
        return this.grid;
    }

    public static countSnakeAdjacentSegments(neighbours: Neighbours<GridCell>): number {
        let count = 0;
        if (neighbours.top === GridCell.SNAKE) count++;
        if (neighbours.right === GridCell.SNAKE) count++;
        if (neighbours.bottom === GridCell.SNAKE) count++;
        if (neighbours.left === GridCell.SNAKE) count++;
        return count;
    }

    public static snakeLoopsImmediately(neighbours: Neighbours<GridCell>): boolean {
        if (neighbours.top === GridCell.SNAKE && neighbours.right === GridCell.SNAKE && neighbours.topRight === GridCell.SNAKE) return true;
        if (neighbours.right === GridCell.SNAKE && neighbours.bottom === GridCell.SNAKE && neighbours.bottomRight === GridCell.SNAKE) return true;
        if (neighbours.bottom === GridCell.SNAKE && neighbours.left === GridCell.SNAKE && neighbours.bottomLeft === GridCell.SNAKE) return true;
        if (neighbours.left === GridCell.SNAKE && neighbours.top === GridCell.SNAKE && neighbours.topLeft === GridCell.SNAKE) return true;
        return false;
    }

    /**
     * Warning: make sure you do a start from a head/tail, rather than a looping snake, to avoid infinite loop regression
     */
    public getSnakeLength(currentPos: PointInt, comingFromDirection: SnakeDirection = null): number {
        const neighbours = this.getGrid().getGridNeighbours(currentPos.x, currentPos.y);
        for (let direction of Object.keys(SnakeDirection)) {
            if (direction === comingFromDirection) {
                // e.g. left is snake, but we came from the left, so ignore it
                continue;
            }
            if (neighbours[direction] === GridCell.SNAKE) {
                if (direction === SnakeDirection.top) {
                    return 1 + this.getSnakeLength(new PointInt(currentPos.x, currentPos.y - 1), SnakeDirection.bottom);
                }
                if (direction === SnakeDirection.right) {
                    return 1 + this.getSnakeLength(new PointInt(currentPos.x + 1, currentPos.y), SnakeDirection.left);
                }
                if (direction === SnakeDirection.bottom) {
                    return 1 + this.getSnakeLength(new PointInt(currentPos.x, currentPos.y + 1), SnakeDirection.top);
                }
                if (direction === SnakeDirection.left) {
                    return 1 + this.getSnakeLength(new PointInt(currentPos.x - 1, currentPos.y), SnakeDirection.right);
                }
            }
        }
        // No other snake segments adjacent, must have reached the end.
        return 1;
    }

    public render(): string {
        const renderedGrid: string[][] = Array(this.height).fill(null).map(() => Array(this.width).fill(GridCell.SNAKE));
        const grid = this.getGrid();
        this.placedPolyominos.forEach((poly) => {
            poly.getAbsolutePoints().forEach((point) => {
                renderedGrid[point.y][point.x] = '' + poly.polyomino.points.size;
            });
        });
        return renderedGrid.map((row) => row.join('') + '\n')
            .join('');
    }

}