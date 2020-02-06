const x = function(){
	const EGG = 'EGG';
	const SNAKE = 'SNAKE';


	window.solver_check = function(solution) {
		return checkBasic(solution, 10) && checkSnake(solution) && checkWater(solution, 9);
	}


	function checkBasic(solution, size) {
		for (let row = 1; row <= size; row++) {
			for (let col = 1; col <= size; col++) {
				if (solution[row-1][col-1] === null) return false;
			}
		}
		return true;
	}

	function checkSnake(solution){
		const width = solution[0].length;
		const height = solution.length;
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (solution[y][x] !== SNAKE){
					continue;
				}
				const left = x === 0        ? false : solution[y][x-1] === SNAKE || solution[y][x-1] === EGG;
				const right = x === width-1 ? false : solution[y][x+1] === SNAKE || solution[y][x+1] === EGG;
				const up = y === 0          ? false : solution[y-1][x] === SNAKE || solution[y-1][x] === EGG;
				const down = y === height-1 ? false : solution[y+1][x] === SNAKE || solution[y+1][x] === EGG;
				let numWays = 0;
				if (left) numWays++;
				if (right) numWays++;
				if (up) numWays++;
				if (down) numWays++;
				if (numWays !== 2) {
					return false;
				}
			}
		}
		return true;
	}

	function checkWater(solution, biggestWater){
		// 1. make sure for each number there are that many water cells
		const countWaters = {};
		for (let c = 1; c <= biggestWater; c++) {
			countWaters[c] = 0;
		}
		const width = solution[0].length;
		const height = solution.length;
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const num = solution[y][x];
				if (!Number.isInteger(num)){
					continue;
				}
				countWaters[num]++;
			}
		}
		for (let c = 1; c <= biggestWater; c++) {
			if (countWaters[c] !== c) return false;
		}

		// make sure adjacent water is the same number
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const num = solution[y][x];
				if (!Number.isInteger(num)){
					continue;
				}
				const left = x === 0        ? null : (Number.isInteger(solution[y][x-1]) ? solution[y][x-1] : null);
				const right = x === width-1 ? null : (Number.isInteger(solution[y][x+1]) ? solution[y][x+1] : null);
				const up = y === 0          ? null : (Number.isInteger(solution[y-1][x]) ? solution[y-1][x] : null);
				const down = y === height-1 ? null : (Number.isInteger(solution[y+1][x]) ? solution[y+1][x] : null);
				if (left  !== null && num !== left)  return false;
				if (right !== null && num !== right) return false;
				if (up    !== null && num !== up)    return false;
				if (down  !== null && num !== down)  return false;	
			}
		}

		return true;
	}



	/**
	 * TESTS
	 */

	tests();


	function tests(){
		test_checkBasic();
		test_checkSnake();
		test_checkWater();
	}

	function test_checkBasic() {
		checkBasic([
			[1, 1, 1],
			[9, 9, 9],
			[5, 5, 5],
		], 3) === true || console.error('TEST FAILED');
		checkBasic([
			[1, 1, 1],
			[9, 9, 9],
			[5, 5, null],
		], 3) === false || console.error('TEST FAILED');
	}

	function test_checkSnake() {
		checkSnake([
			[EGG, SNAKE, SNAKE],
			[9, 9, SNAKE],
			[EGG, SNAKE, SNAKE],
		]) === true || console.error('TEST FAILED');
		checkSnake([
			[EGG, SNAKE, SNAKE],
			[9, 9, 9],
			[EGG, SNAKE, SNAKE],
		]) === false || console.error('TEST FAILED');
		checkSnake([
			[EGG, SNAKE, SNAKE],
			[9, SNAKE, SNAKE],
			[EGG, SNAKE, SNAKE],
		]) === false || console.error('TEST FAILED');
		checkSnake([
			[EGG, SNAKE, 9],
			[SNAKE, SNAKE, 9],
			[EGG, SNAKE, 9],
		]) === false || console.error('TEST FAILED');
		checkSnake([
			[EGG, SNAKE, SNAKE],
			[EGG, SNAKE, SNAKE],
			[9, 9, 9],
		]) === false || console.error('TEST FAILED');
		checkSnake([
			[EGG, null, SNAKE],
			[null, null, SNAKE],
			[EGG, SNAKE, SNAKE],
		]) === false || console.error('TEST FAILED');
	}

	function test_checkWater() {
		checkWater([
			[1, null, null],
			[null, null, null],
			[null, null, null],
		], 1) === true || console.error('TEST FAILED');
		checkWater([
			[1, 1, null],
			[null, null, null],
			[null, null, null],
		], 1) === false || console.error('TEST FAILED');
		checkWater([
			[1, null, null],
			[null, null, null],
			[null, null, null],
		], 2) === false || console.error('TEST FAILED');
		checkWater([
			[1, null, 2],
			[null, null, 2],
			[null, null, null],
		], 2) === true || console.error('TEST FAILED');
		checkWater([
			[1, null, 2],
			[null, null, 2],
			[null, null, 2],
		], 2) === false || console.error('TEST FAILED');
		checkWater([
			[null, null, 2],
			[null, null, 2],
			[null, null, null],
		], 2) === false || console.error('TEST FAILED');
		checkWater([
			[1, 2, 2],
			[null, null, null],
			[null, null, null],
		], 2) === false || console.error('TEST FAILED');
	}

}
x();

