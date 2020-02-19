const x3 = function(){
	const EGG = 'EGG';
	const SNAKE = 'SNAKE';
	const OUT_OF_BOUNDS = 'OUT_OF_BOUNDS'; // for convenience

	window.puzzle_generate = function(width, height, maxNumber) {
		return generate(width, height, maxNumber);
	}


	function generate(width, height, maxNumber) {
		let puzzle = Array(height).fill(null).map(() => Array(width).fill(null));

		// 1. Create permutations of shapes
		// 2. Starting with biggest, place shape into fist space
		//    2.1. if valid, continue with next biggest shape
		//         2.1.1. if this is the biggest shape, check if puzzle valid
		//    2.2. if not valid, choose next space
		//         2.2.1. if no spaces left, move back up to larger shape and continue

		// ------------------------------------------------------------



		return puzzle;

	}

	function permutations(size) {
		const permutations = [];

		if (size > 4) throw 'whoops too big';

		/*
		 * We reduce the search space by looking at only the bounds that are possible.
		 * 
		 * E.g. for size 6, instead of searching a 6x6 search space, we search the following bounds variants:
		 * 6x1, 5x2, 4x3, 3x4, 2x5, 1x6
		 *
		 * For odd sizes, e.g. 5, we search 5x1, 4x2, 3x3, 2x4, 1x5
		 *
		 * This reduces the search space significantly.
		 *
		 * E.g. a naive 6x6 search space has 2^(6*6) = 68,719,476,736 permutations.
		 *
		 * Whereas this method reduces the size 6 search space to:
		 *  (2^(6*1)) + (2^(5*2)) + (2^(4*3)) + (2^(3*4)) + (2^(2*5)) + (2^(1*6)) = 10,368 permutations
		 */

		let width = size;
		let height = 1;

		for (let boundsVariant = 0; boundsVariant < size; boundsVariant++) {
			console.log('boundsVariant', boundsVariant, `${width}x${height}`);

			const bitPerms = bitPermutations(width, height);

			width--;
			height++;
		}

		return permutations;
	}

	function bitArrayLeftPad(bitArray, desiredLength) {
		return [...Array(desiredLength - bitArray.length).fill(0), ...bitArray]; 
	}

	/**
	  * Returns ALL permutations, valid and invalid of a certain bounds
	  */
	function bitPermutations(width, height) {
		if (width * height > 12) throw 'whoops too big';

 		const flatBitPermutations = [];
		for (let i = 0; i < Math.pow(2, width*height); i++) {
			// convert decimal to binary array of bit integer (base 2)
			const flatBitPermutation = bitArrayLeftPad((i).toString(2).split('').map(i => i * 1), width * height);
			flatBitPermutations.push(flatBitPermutation); 
		}

		const bitPerms = [];
		for (const flatBitPermutation of flatBitPermutations) {
			// de-flatten array by chunking to create a 2d shape
			bitPerms.push(arrayChunk(flatBitPermutation, width));
		}
		return bitPerms;
	}

	function arrayChunk(array, size) {
		var result = [];
		for (var i = 0; i < array.length; i += size) {
			result.push(array.slice(i, size + i));
		}
		return result;
	}


	// function neighbours(pos, puzzle, width, height) {
	// 	return {
	// 		left: pos.x === 0          ? OUT_OF_BOUNDS : puzzle[pos.y][pos.x - 1],
	// 		right: pos.x === width - 1 ? OUT_OF_BOUNDS : puzzle[pos.y][pos.x + 1],
	// 		up: pos.y === 0            ? OUT_OF_BOUNDS : puzzle[pos.y - 1][pos.x],
	// 		down: pos.y === height - 1 ? OUT_OF_BOUNDS : puzzle[pos.y + 1][pos.x],
	// 	};
	// }


	/**
	 * --------------------
	 */ 
	test();

	function test() {
		test_arrayChunk();
		test_bitPermutations();
		test_permutations3();
		test_permutations4();


	}

	function test_arrayChunk() {
		JSON.stringify(arrayChunk([1,2,3,4,5,6], 3)) === JSON.stringify([[1,2,3], [4,5,6]]) || console.error('TEST FAILED');
	}

	function test_bitPermutations() {
		const expected = [
			[
				[0,0],
				[0,0],
			],
			[
				[0,0],
				[0,1],
			],
			[
				[0,0],
				[1,0],
			],
			[
				[0,0],
				[1,1],
			],
			[
				[0,1],
				[0,0],
			],
			[
				[0,1],
				[0,1],
			],
			[
				[0,1],
				[1,0],
			],
			[
				[0,1],
				[1,1],
			],
			[
				[1,0],
				[0,0],
			],
			[
				[1,0],
				[0,1],
			],
			[
				[1,0],
				[1,0],
			],
			[
				[1,0],
				[1,1],
			],
			[
				[1,1],
				[0,0],
			],
			[
				[1,1],
				[0,1],
			],
			[
				[1,1],
				[1,0],
			],
			[
				[1,1],
				[1,1],
			],	
		];
		const actual = bitPermutations(2, 2);

		JSON.stringify(expected) === JSON.stringify(actual) || console.error('TEST FAILED', expected, actual);
	}

	function test_permutations3() {
		const expected = [
			[
				[1,1,1],
			],
			[
				[1,1],
				[1,0],
			],
			[
				[1,1],
				[0,1],
			],
			[
				[0,1],
				[1,1],
			],
			[
				[1,0],
				[1,1],
			],
			[
				[1],
				[1],
				[1],
			],
		];
		
		const actual = permutations(3);

		JSON.stringify(expected) === JSON.stringify(actual) || console.error('TEST FAILED');
	}


	function test_permutations4() {
		const expected = [
			[
				[1,1,1,1],
			],
			[
				[1,1,1],
				[1,0,0],
			],
			[
				[1,1,1],
				[0,1,0],
			],
			[
				[1,1,1],
				[0,0,1],
			],
			[
				[1,1,0],
				[0,1,1],
			],
			[
				[1,0,0],
				[1,1,1],
			],
			[
				[0,1,0],
				[1,1,1],
			],
			[
				[0,0,1],
				[1,1,1],
			],
			[
				[0,1,1],
				[1,1,0],
			],
			[
				[1,1],
				[1,1],
			],
			[
				[1,1],
				[1,0],
				[1,1],
			],
			[
				[1,0],
				[1,1],
				[1,0],
			],
			[
				[1,0],
				[1,0],
				[1,1]
			],
			[
				[1,0],
				[1,1],
				[0,1]
			],
			[
				[1,1],
				[0,1],
				[0,1],
			],
			[
				[0,1],
				[1,1],
				[0,1],
			],
			[
				[0,1],
				[0,1],
				[1,1],
			],
			[
				[0,1],
				[1,1],
				[1,0],
			],
			[
				[1],
				[1],
				[1],
				[1],
			],
		];
		
		const actual = permutations(4);

		JSON.stringify(expected) === JSON.stringify(actual) || console.error('TEST FAILED');
	}

}
x3();