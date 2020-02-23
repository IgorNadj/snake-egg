import {Puzzle} from './Puzzle';
import {Polyomino} from 'polyomino';
import {PlacedPolyomino} from './PlacedPolyomino';
import {PolyominosInBounds} from './validator/PolyominosInBounds';
import {PolyominosOverlap} from './validator/PolyominosOverlap';



/**
 * GeneratingPuzzle has additional methods for constructing a valid puzzle
 */
export class GeneratingPuzzle extends Puzzle {

	public place(polyomino: Polyomino, x: number, y: number): GeneratingPuzzle {
		const placed = new PlacedPolyomino(polyomino, x, y);
		const newPlacedPolyominos = this.placedPolyominos.add(placed);
		return new GeneratingPuzzle(this.width, this.height, this.maxNumber, newPlacedPolyominos);
	}

	/**
	 * @return boolean - true if puzzle is valid so far during construction
	 */
	public isIntermediateStateValid(): boolean {
		if (!PolyominosInBounds.isValid(this)) return false;
		if (!PolyominosOverlap.isValid(this)) return false;
		return true;
	}

	public render() {
		//return this.placedPolyominos.
	}

}