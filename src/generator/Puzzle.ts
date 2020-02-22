import {Polyomino} from 'polyomino';
import {Set} from 'immutable';
import {PlacedPolyomino} from './PlacedPolyomino';


export class Puzzle {

	readonly placedPolyominos: Set<PlacedPolyomino>;

	constructor(readonly width, readonly height, readonly maxNumber, placedPolyominos = null) {
		this.placedPolyominos = placedPolyominos ? placedPolyominos : Set();
	}

}