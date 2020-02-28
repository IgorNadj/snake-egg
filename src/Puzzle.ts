import {Polyomino} from 'polyomino';
import {Set} from 'immutable';
import {PlacedPolyomino} from './generator/PlacedPolyomino';


export class Puzzle {

	readonly placedPolyominos: Set<PlacedPolyomino>;

	constructor(readonly width: number, readonly height: number, readonly maxNumber: number, placedPolyominos: Set<PlacedPolyomino> | null = null) {
		this.placedPolyominos = placedPolyominos ? placedPolyominos : Set();
	}

}