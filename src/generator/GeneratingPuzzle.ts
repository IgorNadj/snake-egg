import {Puzzle} from './Puzzle';
import {Polyomino, PointInt} from 'polyomino';
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

export enum SnakeDirection {
    top = "top",
    right = "right",
    bottom = "bottom", 
    left = "left",
};

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
	
    public countSnakeAdjacentSegments(neighbours: Neighbours): number {
        let count = 0;
        if (neighbours.top === GridCell.SNAKE) count++;
        if (neighbours.right === GridCell.SNAKE) count++;
        if (neighbours.bottom === GridCell.SNAKE) count++;
        if (neighbours.left === GridCell.SNAKE) count++;
        return count;
    }

    public snakeLoopsImmediately(neighbours: Neighbours): boolean {
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
        const neighbours = this.getGridNeighbours(this.getGrid(), currentPos.x, currentPos.y);
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
		return this.getGrid()
			.map((row) => row.map((cell) => cell === GridCell.SNAKE ? '.' : (cell === GridCell.POLY ? 'P' : ' ')).join('') + '\n')
			.join('');
		//return this.placedPolyominos.
	}

}