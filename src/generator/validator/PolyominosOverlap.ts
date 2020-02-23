import {PointInt} from 'polyomino';
import {GeneratingPuzzle} from '../GeneratingPuzzle';



export class PolyominosOverlap {

	public static isValid(puzzle: GeneratingPuzzle): boolean {
		
		if (puzzle.placedPolyominos.size <= 1){ 
			return true;
		}

		const setArray = puzzle.placedPolyominos.toArray();

		for (let j = 0; j < setArray.length - 1; j++) {
			for (let k = j + 1; k < setArray.length; k++) {
				const poly1 = setArray[j];
				const poly2 = setArray[k];
				
				let anyPointsTouch = false;
				poly1.getAbsolutePoints().forEach((p1) => {
					poly2.getAbsolutePoints().forEach((p2) => {
						if (PolyominosOverlap.pointsTouch(p1, p2)) {
							anyPointsTouch = true;
						}
					});
				});

				if (anyPointsTouch) {
					return false;
				}
			}
		}

		return true;
	}

	protected static pointsTouch(p1: PointInt, p2: PointInt): boolean {
		if (p1.x === p2.x && p1.y === p2.y) {
			return true;
		}
		if (p1.x === p2.x) {
			if (Math.abs(p1.y - p2.y) <=1) return true;
		}
		if (p1.y === p2.y) {
			if (Math.abs(p1.x - p2.x) <=1) return true;
		}
		return false;
	}

}