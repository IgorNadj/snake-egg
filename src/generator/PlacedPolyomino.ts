import {Polyomino} from 'polyomino';
import {Bounds} from './Bounds';

export class PlacedPolyomino {
	
	constructor(public polyomino: Polyomino, public x: number, public y: number) {
		this.polyomino = polyomino;
		this.x = x;
		this.y = y;
	}

	public getBounds(): Bounds {
		const top    = this.y + <number> this.polyomino.points.reduce((minY, point) => point.y < minY ? point.y : minY, 0);
		const right  = this.x + <number> this.polyomino.points.reduce((maxX, point) => point.x > maxX ? point.x : maxX, 0);
		const bottom = this.y + <number> this.polyomino.points.reduce((maxY, point) => point.y > maxY ? point.y : maxY, 0);
		const left   = this.x + <number> this.polyomino.points.reduce((minX, point) => point.x < minX ? point.x : minX, 0);
		return new Bounds(top, right, bottom, left);
	}

}