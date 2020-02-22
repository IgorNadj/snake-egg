import {Polyomino} from 'polyomino';


export class PlacedPolyomino {
	
	constructor(public polyomino: Polyomino, public x: number, public y: number) {
		this.polyomino = polyomino;
		this.x = x;
		this.y = y;
	}

}