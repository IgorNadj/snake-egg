import {GeneratingPuzzle} from '../GeneratingPuzzle';


export class PolyominosInBounds {

	public static isValid(puzzle: GeneratingPuzzle): boolean {
		let valid = true;
		puzzle.placedPolyominos.forEach(poly => {
			const bounds = poly.getBounds();
			if (bounds.left < 0 || bounds.right > puzzle.width -1 || bounds.top < 0 || bounds.bottom > puzzle.height -1) {
				valid = false;
			}
		});
		return valid;
	}

}