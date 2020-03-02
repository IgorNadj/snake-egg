/**
 * Immutable grid of type T means 2d array of cells of T e.g. number
 */
export class Grid<T> {

    protected grid: T[][];

    constructor(readonly width: number, readonly height: number) {
        this.grid = Array(height).fill(null).map((row) => Array(width).fill(null));
    }

    public get(x: number, y: number): T {
        return this.grid[y][x];
    }

    public set(x: number, y: number, cell: T): Grid<T> {
        if (x < 0 || x >= this.width) {
            throw 'x out of bounds';
        }
        if (y < 0 || y >= this.height) {
            throw 'y out of bounds';
        }
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

}