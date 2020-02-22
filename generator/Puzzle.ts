import {Polyomino} from 'polyomino';
import {Set} from 'immutable';
import {PlacedPolyomino} from './PlacedPolyomino';


export class Puzzle {

	protected width: number;
	protected height: number;
	protected maxNumber: number;
	protected placedPolyominos: Set<PlacedPolyomino>;

	constructor(width, height, maxNumber, placedPolyominos = null) {
		this.width = width;
		this.height = height;
		this.maxNumber = maxNumber;
		this.placedPolyominos = placedPolyominos ? placedPolyominos : Set();
	}

	public getPolyominos(): Set<PlacedPolyomino> {
		return this.placedPolyominos;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}

	public getMaxNumber(): number {
		return this.maxNumber;
	}

}