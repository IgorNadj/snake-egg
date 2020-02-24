import {Puzzle} from './Puzzle';
import {Polyomino} from 'polyomino';
import {PlacedPolyomino} from './PlacedPolyomino';
import {PolyominosInBounds} from './validator/PolyominosInBounds';
import {PolyominosOverlap} from './validator/PolyominosOverlap';
import {Snake} from './validator/Snake';

export type Grid = GridCell[][];

export enum GridCell { SNAKE, POLY };

export type Neighbours = {
	top: GridCell | null,
	right: GridCell | null,
	bottom: GridCell | null,
	left: GridCell | null,
	topRight: GridCell | null,
	bottomRight: GridCell | null,
	bottomLeft: GridCell | null,
	topLeft: GridCell | null,
}


/**
 * GeneratingPuzzle has additional methods for constructing a valid puzzle
 */
export class GeneratingPuzzle extends Puzzle {

	public place(polyomino: Polyomino, x: number, y: number): GeneratingPuzzle {
		const placed = new PlacedPolyomino(polyomino, x, y);
		const newPlacedPolyominos = this.placedPolyominos.add(placed);
		return new GeneratingPuzzle(this.width, this.height, this.maxNumber, newPlacedPolyominos);
	}

	/**
	 * @return boolean - true if puzzle is valid so far during construction
	 */
	public isIntermediateStateValid(): boolean {
		if (!PolyominosInBounds.isValid(this)) return false;
		if (!PolyominosOverlap.isValid(this)) return false;
		return true;
	}

	public isSnakeValid(): boolean {
		return Snake.isValid(this);
	}

	public isValid(): boolean {
		if (!this.isIntermediateStateValid()) return false;
		if (!this.isSnakeValid()) return false;
		return true;
	}

	public getGrid(): Grid {
        const grid = Array(this.height).fill(null).map(() => Array(this.width).fill(GridCell.SNAKE));
        this.placedPolyominos.forEach((poly) => {
            poly.getAbsolutePoints().forEach((point) => {
                grid[point.y][point.x] = GridCell.POLY;
            });
        });
        return grid;
    }

    public getGridNeighbours(grid: Grid, x: number, y: number): Neighbours {
        return {
            top:    y <= 0              ? null : grid[y-1][x],
            right:  x >= this.width -1  ? null : grid[y][x+1],
            bottom: y >= this.height -1 ? null : grid[y+1][x],
			left:   x <= 0              ? null : grid[y][x-1],
			topRight:    y <= 0 || x >= this.width - 1               ? null : grid[y-1][x+1],
			bottomRight: y >= this.height - 1 || x >= this.width - 1 ? null : grid[y+1][x+1],
			bottomLeft:  y >= this.height - 1 || x <= 0              ? null : grid[y+1][x-1],
			topLeft:     y <= 0 || x <= 0                            ? null : grid[y-1][x-1],
        };
    }

	public render(): string {
		return this.getGrid()
			.map((row) => row.map((cell) => cell === GridCell.SNAKE ? '.' : (cell === GridCell.POLY ? 'P' : ' ')).join('') + '\n')
			.join('');
		//return this.placedPolyominos.
	}

}