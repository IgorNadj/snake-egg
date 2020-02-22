import {Polyomino} from "polyomino";
import {Set} from 'immutable';
import {GeneratingPuzzle} from './GeneratingPuzzle';
import {Puzzle} from './Puzzle';



export class Generator {

	public generate(width, height, maxNumber): Puzzle {

		console.log('Start');

		// 1. Starting with biggest, place shape into fist space
		//    1.1. if valid, continue with next biggest shape
		//         1.1.1. if this is the smallest shape, check if puzzle valid
		//    1.2. if not valid, choose next space
		//         1.2.1. if no spaces left, move back up to larger shape and continue

		// ------------------------------------------------------------

		/*
		 *  3 . . 4 4
		 *  3 3 . 4 .
		 *  . . . 4 .
		 *  . 2 2 . .
		 *  . . . . 1
		 */

		let puzzle = new GeneratingPuzzle(width, height, maxNumber);

		// 1. Starting with biggest, place shape into fist space
		for (let size = maxNumber; size >= 1; size--) {
			const polyominos = Polyomino.get(size);
			polyominos.forEach(polyomino => {
				const variants = this.variants(polyomino);
				variants.forEach(variant => {
					for (let x = 0; x < width; x++) {
						for (let y = 0; y < height; y++) {
							const newPuzzle = puzzle.place(variant, x, y);
							const isValid = newPuzzle.isPolyonimoPlacementValid();
							// 1.1. if valid, continue with next biggest shape
							if (isValid) {
								// 1.1.1. if this is the smallest shape, check if puzzle valid
								if (size === 1) {
									throw 'polyominos ok, check if snake works TODO';
								};
								return false;
							}
							// 1.2. if not valid, choose next space
						}
					}
					// variant not valid in any position

				});
				


			});
			
		}

		return puzzle;
	}

	protected variants(polyomino: Polyomino): Set<Polyomino> {
		const variants: Set<Polyomino> = Set();
		polyomino.rotations().forEach(rotation => {
			const reflections = rotation.reflections();
			reflections.forEach(reflection => {
				variants.add(reflection);
			});
		})
		return variants;
	}

}

