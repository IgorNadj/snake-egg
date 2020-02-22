import {Puzzle} from './Puzzle';
import {Polyomino} from 'polyomino';
import {PlacedPolyomino} from './PlacedPolyomino';


/**
 * GeneratingPuzzle has additional methods for constructing a valid puzzle
 */
export class GeneratingPuzzle extends Puzzle {
	
	public place(polyomino: Polyomino, x, y): GeneratingPuzzle {
		const placed = new PlacedPolyomino(polyomino, x, y);
		const newPlacedPolyominos = this.placedPolyominos.add(placed);
		return new GeneratingPuzzle(this.width, this.height, this.maxNumber, newPlacedPolyominos);
	}

	/**
	 * @return boolean - true if puzzle is valid so far during construction
	 */
	public isPolyominoPlacementValid(): boolean {
		const polysInBounds = this.placedPolyominos.filter(placedPoly => {
			return GeneratingPuzzle.isPolyominoInsideBounds(placedPoly);
		})
		if (polysInBounds.size() !== this.placedPolyominos.size()) {
			return false;
		}
		throw 'todo';
	}

	public render() {
		//return this.placedPolyominos.
	}

	public static isPolyominoInsideBounds(placedPoly: PlacedPolyomino): boolean {
		
	}



}