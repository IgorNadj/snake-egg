const x3 = function(){
	const EGG = 'EGG';
	const SNAKE = 'SNAKE';

	window.puzzle_generate = function(width, height, maxNumber) {
		return generate(width, height, maxNumber);
	}


	function generate(width, height, maxNumber) {
		let puzzle = Array(height).fill(null).map(() => Array(width).fill(null));

		// https://www.algosome.com/articles/maze-generation-depth-first.html
		// 0. Pick two egg spaces at random
		// 1. Randomly select a node (or cell) N.
		// 2. Push the node N onto a queue Q.
		// 3. Mark the cell N as visited.
		// 4. Randomly select an adjacent cell A of node N that has not been visited. If all the neighbors of N have been visited:
		//    4.1. Continue to pop items off the queue Q until a node is encountered with at least one non-visited neighbor - assign this node to N and go to step 4.
		//    4.2. If no nodes exist: stop.
		// 5. Break the wall between N and A.
		// 6. Assign the value A to N.
		// 7. Go to step 2.

		// ------------------------------------------------------------

		// 0. Pick two egg spaces at random
		puzzle = generateEggs(width, height, puzzle);
		

		return puzzle;

	}

	function generateEggs(width, height, puzzle) {
		const egg1Pos = generateRandomPos(width, height); 
		let egg2Pos = generateRandomPos(width, height);
		while (areEggsTouching(egg1Pos, egg2Pos)) {
			egg2Pos = generateRandomPos(width, height);
		}
		puzzle[egg1Pos.y][egg1Pos.x] = EGG;
		puzzle[egg2Pos.y][egg2Pos.x] = EGG;
		return puzzle;
	}

	function areEggsTouching(egg1Pos, egg2Pos) {
		const distX = Math.abs(egg1Pos.x - egg2Pos.x);
		const distY = Math.abs(egg1Pos.y - egg2Pos.y);
		if (distX === 0 && distY === 0) return true;
		if (distX === 0 && distY === 1) return true;
		if (distX === 1 && distY === 0) return true;
		return false;
	}

	function generateRandomPos(width, height) {
		return {
			x: randint(0, width - 1),
			y: randint(0, height - 1)
		};
	}

	function randint(min, max) {
	   return Math.round((Math.random() * Math.abs(max - min)) + min);
	}


	/**
	 * --------------------
	 */ 
	test();

	function test() {
		test_areEggsTouching();
	}

	function test_areEggsTouching() {
		areEggsTouching({x: 0, y: 0}, {x: 1, y: 0}) === true || console.error('TEST FAILED');
		areEggsTouching({x: 0, y: 0}, {x: 0, y: 1}) === true || console.error('TEST FAILED');
		areEggsTouching({x: 0, y: 0}, {x: 0, y: 2}) === false || console.error('TEST FAILED');
		areEggsTouching({x: 0, y: 0}, {x: 2, y: 0}) === false || console.error('TEST FAILED');
		areEggsTouching({x: 1, y: 0}, {x: 0, y: 1}) === false || console.error('TEST FAILED');
	}

}
x3();