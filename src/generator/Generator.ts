import {Polyomino} from "polyomino";
import {Set} from 'immutable';
import {GeneratingPuzzle} from './GeneratingPuzzle';
import {Puzzle} from './Puzzle';



export class Generator {

	public generate(width: number, height: number, maxNumber: number) {

		console.log('Start');

		// 1. Starting with biggest, place shape into fist space
		//    1.1. if valid
		//         1.1.1. if this is the smallest shape, check if puzzle valid (DONE)
		// 		   1.1.2. otherwise, continue with next biggest shape
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

		// TODO: figure this out. As each shape at size x is placed, that 

		// 0 placed:       initial blank puzzle
		// 1 placed:       9 placed
		// 2 placed:       9 and 8 placed
		//
		//

		// if all 8 have been tried, and none fit, move back up the stack to the 7s
		//
		// TODO: implement this as a recursive placing function, rather than a for loop of sizes
		// (then don't need an explicit stack, because we have closures)

		const initialPuzzle = new GeneratingPuzzle(width, height, maxNumber);
		
		const puzzles = this.addPolyOfSize(initialPuzzle, maxNumber, Set());
		console.log('puzzles', puzzles);


		console.log('Done');
		
	}

	/**
	 * @return Set<Puzzle> valid puzzles
	 */
	protected addPolyOfSize(puzzle: GeneratingPuzzle, size: number, currentValidPuzzles: Set<Puzzle>): Set<Puzzle> {
		if (size < 1) {
			throw 'should have exited';	
		}


		const polyominos = Polyomino.get(size);

		// 1. Starting with biggest, place shape into fist space
		// @ts-ignore
		for (let polyomino of polyominos) {

			const variants = this.variants(polyomino);

			for (let variant of variants) {

				for (let x = 0; x < puzzle.width; x++) {

					for (let y = 0; y < puzzle.height; y++) {

						const newPuzzle = puzzle.place(variant, x, y);
						const isValid = newPuzzle.isIntermediateStateValid();

						// 1.1. if valid, continue with next biggest shape
						if (isValid) {
							// 1.1.1. if this is the smallest shape, check if puzzle valid
							if (size === 1) {
								throw 'polyominos ok, check if snake works TODO';
							};
							
							return this.addPolyOfSize(newPuzzle, size - 1, currentValidPuzzles);
						}
						// 1.2. if not valid, choose next space
					}
				}
				// variant not valid in any position, try next polyomino
			};
		};
		// all polyominos tested
		// 1.2.1. if no spaces left, move back up to larger shape and continue
		return currentValidPuzzles;
	}

	protected variants(polyomino: Polyomino): Set<Polyomino> {
		let variants: Set<Polyomino> = Set();
		// @ts-ignore
		polyomino.rotations().forEach(rotation => {
			const reflections = rotation.reflections();
			reflections.forEach(reflection => {
				variants = variants.add(reflection);
			});
		})
		return variants;
	}

}

