import {Puzzle} from '../Puzzle';
import {Polyomino, PointInt} from 'polyomino';
import {PolyominosInBounds} from '../validator/PolyominosInBounds';
import {PolyominosOverlap} from '../validator/PolyominosOverlap';
import {Snake} from '../validator/Snake';
import { PlacedPolyomino } from '../polyomino/PlacedPolyomino';



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

}