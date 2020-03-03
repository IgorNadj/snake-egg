import { Set } from 'immutable';
import { PlacedPolyomino } from './polyomino/PlacedPolyomino';
import { Snake } from './validator/Snake';
import { PolyominosInBounds } from './validator/PolyominosInBounds';
import { PolyominosOverlap } from './validator/PolyominosOverlap';
import { Grid } from "./Grid";

export enum GridCell {
    SNAKE = ".",
    POLY = "P"
};

/**
 * A Puzzle is a completely filled grid, and may or may not be valid
 */
export class Puzzle {

    readonly placedPolyominos: Set<PlacedPolyomino>;
    protected grid: Grid<GridCell>;

    constructor(readonly width: number, readonly height: number, readonly maxNumber: number, placedPolyominos?: Set<PlacedPolyomino>) {
        this.placedPolyominos = placedPolyominos ? placedPolyominos : Set();
    }

    public isValid(): boolean {
        if (!PolyominosInBounds.isValid(this)) return false;
        if (!PolyominosOverlap.isValid(this)) return false;
        if (!Snake.isValid(this)) return false;
        return true;
    }

    public getGrid(): Grid<GridCell> {
        // lazy-evaluate, and cache for performace
        if (this.grid === undefined) {
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