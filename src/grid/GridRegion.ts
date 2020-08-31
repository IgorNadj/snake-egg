import {PointInt} from "polyomino";
import {Set} from "immutable";


/**
 * Represents an orthogonally connected set of cells of the same type
 *
 * e.g.
 *
 *   A A _
 *   _ _ _
 *   B _ B
 *
 *   has three regions, one A region (size 2), and two B regions (each size 1)
 *
 */
export class GridRegion {

    readonly cells: Set<PointInt>;

    readonly size: number; // convenience

    public constructor(cells: Set<PointInt>) {
        this.cells = cells;
        this.size = cells.size;
    }

    public add(point: PointInt): GridRegion {
        return new GridRegion(this.cells.add(point));
    }

    public contains(point: PointInt): boolean {
        return this.cells.some((cell) => cell.equals(point));
    }

    public merge(other: GridRegion): GridRegion {
        if (this === other) return this;
        return new GridRegion(this.cells.merge(other.cells));
    }

}