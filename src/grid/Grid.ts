import {Set} from 'immutable';
import {PointInt} from 'polyomino';
import {GridRegion} from "./GridRegion";

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

export enum OrthogonalDirections {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export const OrthogonalTransforms = {
    TOP: new PointInt(0, -1),
    RIGHT: new PointInt(1, 0),
    BOTTOM: new PointInt(0, 1),
    LEFT: new PointInt(-1, 0),
}

/**
 * Immutable grid of type T means 2d array of cells of T e.g. number
 */
export class Grid<T> {

    protected grid: T[][];

    constructor(readonly width: number, readonly height: number, array?: T[][]) {
        if (array) {
            this.grid = array;
        } else {
            this.grid = Array(height).fill(null).map((row) => Array(width).fill(null));
        }
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
        const grid = this.grid;
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

    /**
     * Count number of orthogonally adjacent cells matching value
     *
     * @param x
     * @param y
     * @param values one or more acceptable cell values
     */
    public countAdjacentCells(x: number, y: number, values: T | T[]): number {
        const contentsArr = Array.isArray(values) ? values : [values];
        let count = 0;
        const neighbours = this.getGridNeighbours(x, y);
        for (const key in OrthogonalDirections) {
            const direction = OrthogonalDirections[key];
            if (contentsArr.includes(neighbours[direction])) {
                count++;
            }
        }
        return count;
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

    public equals(other: Grid<T>): boolean {
        return this.cellsDifferent(other).size === 0;
    }

    public cellsDifferent(other: Grid<T>): Set<PointInt> {
        if (other.width !== this.width || other.height !== this.height) {
            throw 'Size must match';
        }

        let diff: Set<PointInt> = Set();

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.grid[y][x] !== other.grid[y][x]) {
                    diff = diff.add(new PointInt(x, y));
                }
            }
        }

        return diff;
    }

    public orthogonallyConnectedRegions(cellValue: T): Set<GridRegion> {
        let regions = Set<GridRegion>();
        let cellsUsed: boolean[][] = Array(this.height).fill(null).map((row) => Array(this.width).fill(false));
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (cellsUsed[y][x]){
                    continue;
                }

                const thisCell = new PointInt(x, y);

                if (this.grid[y][x] === cellValue) {
                    // match

                    // first we create a new region for this cell
                    let thisRegion = new GridRegion(Set([thisCell]));
                    regions = regions.add(thisRegion);

                    // next, we look for and merge this region with any touching orthogonally adjacent regions
                    for (const direction in OrthogonalDirections) {
                        const adjacentCell = thisCell.add(OrthogonalTransforms[direction]);

                        for (const otherRegion of regions) {
                            if (otherRegion === thisRegion) continue;

                            if (otherRegion.contains(adjacentCell)) {
                                regions = regions.remove(thisRegion);
                                regions = regions.remove(otherRegion);

                                thisRegion = thisRegion.merge(otherRegion); // thisRegion has consumed and expanded

                                regions = regions.add(thisRegion);
                            }
                        }
                    }
                }
            }
        }
        return regions;
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