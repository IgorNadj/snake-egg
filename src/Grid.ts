
export type Neighbours<X> = {
    top: X | null,
    right: X | null,
    bottom: X | null,
    left: X | null,
    topRight: X | null,
    bottomRight: X | null,
    bottomLeft: X | null,
    topLeft: X | null,
}

/**
 * Immutable grid of type T means 2d array of cells of T e.g. number
 */
export class Grid<T> {

    protected grid: T[][];

    constructor(readonly width: number, readonly height: number) {
        this.grid = Array(height).fill(null).map((row) => Array(width).fill(null));
    }

    public get(x: number, y: number): T {
        this.checkBounds(x, y);
        return this.grid[y][x];
    }

    public set(x: number, y: number, cell: T): Grid<T> {
        this.checkBounds(x, y);
        const newGrid: T[][] = Array(this.height);
        for (let newY = 0; newY < this.height; newY++) {
            newGrid[newY] = this.grid[newY].slice();
        }
        newGrid[y][x] = cell;
        return this.fromArray(newGrid);
    }

    public setAll(cell: T): Grid<T> {
        const grid: Grid<T> = new Grid(this.width, this.height);
        grid.grid = this.grid = Array(this.height).fill(null).map((row) => Array(this.width).fill(cell));
        return grid;
    }

    public getGridNeighbours(x: number, y: number): Neighbours<T> {
        const grid = this.toArray();
        return {
            top: y <= 0 ? null : grid[y - 1][x],
            right: x >= this.width - 1 ? null : grid[y][x + 1],
            bottom: y >= this.height - 1 ? null : grid[y + 1][x],
            left: x <= 0 ? null : grid[y][x - 1],
            topRight: y <= 0 || x >= this.width - 1 ? null : grid[y - 1][x + 1],
            bottomRight: y >= this.height - 1 || x >= this.width - 1 ? null : grid[y + 1][x + 1],
            bottomLeft: y >= this.height - 1 || x <= 0 ? null : grid[y + 1][x - 1],
            topLeft: y <= 0 || x <= 0 ? null : grid[y - 1][x - 1],
        };
    }

    public count(havingValue: T): number {
        let count: number = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x] === havingValue) {
                    count++;
                }
            }
        }
        return count;
    }

    public fromArray(array: T[][]): Grid<T> {
        if (array.length != this.height) {
            throw 'Height mismatch';
        }
        array.forEach((row) => {
            if (row.length != this.width) {
                throw 'Width mismatch';
            }
        });
        const grid: Grid<T> = new Grid(this.width, this.height);
        grid.grid = array;
        return grid;
    }

    public toArray(): T[][] {
        return this.grid;
    }

    public render(): string {
        return this.grid
            .map((row) => row.map((cell) => cell === null ? '_' : cell).join('') + '\n')
            .join('');
    }

    protected checkBounds(x: number, y: number) {
        if (x < 0 || x >= this.width) {
            throw 'x out of bounds';
        }
        if (y < 0 || y >= this.height) {
            throw 'y out of bounds';
        }
    }

}