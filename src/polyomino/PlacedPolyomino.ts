import {Polyomino, PointInt} from 'polyomino';
import {Set} from 'immutable';
import {Bounds} from './Bounds';

export class PlacedPolyomino {
	
	protected absolutePoints;

	constructor(public polyomino: Polyomino, public x: number, public y: number) {
		this.polyomino = polyomino;
		this.x = x;
		this.y = y;
	}

	public getBounds(): Bounds {
		const top    = <number> this.getAbsolutePoints().reduce((minY, point) => point.y < minY ? point.y : minY, 0);
		const right  = <number> this.getAbsolutePoints().reduce((maxX, point) => point.x > maxX ? point.x : maxX, 0);
		const bottom = <number> this.getAbsolutePoints().reduce((maxY, point) => point.y > maxY ? point.y : maxY, 0);
		const left   = <number> this.getAbsolutePoints().reduce((minX, point) => point.x < minX ? point.x : minX, 0);
		return new Bounds(top, right, bottom, left);
	}

	public getAbsolutePoints(): Set<PointInt> {
		if (!this.absolutePoints) {
			this.absolutePoints = this.polyomino.points.map((point: PointInt) => {
				return new PointInt(point.x + this.x, point.y + this.y);
			});
		}
		return this.absolutePoints;
	}

	public pointsToString(points: Set<PointInt>): string {
		return `{${points.sort().map((p) => p.toString()).join(", ")}}`;
	}

}