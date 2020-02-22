import {Puzzle} from './Puzzle';
import {Polyomino} from 'polyomino';
import {PlacedPolyomino} from './PlacedPolyomino';


/**
 * GeneratingPuzzle has additional methods for constructing a valid puzzle
 */
export class GeneratingPuzzle extends Puzzle {
	
	constructor(width, height, maxNumber, placedPolyominos = null) {
		super(width, height, maxNumber, placedPolyominos);
	}

	public place(polyomino: Polyomino, x, y): GeneratingPuzzle {
		const placed = new PlacedPolyomino(polyomino, x, y);
		const newPlacedPolyominos = this.placedPolyominos.add(placed);
		return new GeneratingPuzzle(this.width, this.height, this.maxNumber, newPlacedPolyominos);
	}

	/**
	 * @return boolean - true if puzzle is valid so far during construction
	 */
	public isIntermediateStateValid(): boolean {
		if (!this.areAllPolyominosInsideBounds()) return false;

		throw 'todo';
	}

	public render() {
		//return this.placedPolyominos.
	}

	public areAllPolyominosInsideBounds(): boolean {
		let valid = true;
		this.placedPolyominos.forEach(poly => {
			const bounds = poly.getBounds();
			if (bounds.left < 0 || bounds.right > this.width -1 || bounds.top < 0 || bounds.bottom > this.height -1) {
				valid = false;
			}
		});
		return valid;
	}



}