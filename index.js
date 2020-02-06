const EGG = 'EGG';
const SNAKE = 'SNAKE';

const initial = [
	[null, null, EGG,  null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, 5,    null],
	[EGG,  null, null, null, null, null, null, null, null, null],
	[null, 2,    null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],	
	[null, null, null, null, null, null, null, null, null, null],
];

const solution = [
	[9, 9, null, SNAKE, SNAKE, 7, SNAKE, SNAKE, SNAKE, SNAKE],
	[9, 9, 9, 9, SNAKE, 7, SNAKE, 5, 5, SNAKE],
	[null, SNAKE, SNAKE, 9, SNAKE, 7, SNAKE, SNAKE, 5, SNAKE],
	[2, 2, SNAKE, 9, SNAKE, 7, 7, SNAKE, 5, SNAKE],
	[SNAKE, SNAKE, SNAKE, 9, SNAKE, 7, SNAKE, SNAKE, 5, SNAKE],
	[SNAKE, 8, 8, SNAKE, SNAKE, 7, SNAKE, 4, SNAKE, SNAKE],
	[SNAKE, SNAKE, 8, SNAKE, 1, SNAKE, SNAKE, 4, SNAKE, 6],
	[3, SNAKE, 8, SNAKE, SNAKE, SNAKE, 4, 4, SNAKE, 6],
	[3, SNAKE, 8, 8, 8, 8, SNAKE, SNAKE, SNAKE, 6],	
	[3, SNAKE, SNAKE, SNAKE, SNAKE, SNAKE, SNAKE, 6, 6, 6],
];

tests();

render(combine(initial, solution));


function check(solution) {
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

function render(solution) {
	const gridEl = document.getElementById('grid');
	let newHtml = '<table>';
	for (let row = 1; row <= 10; row++) {
		newHtml += '<tr>';
		for (let col = 1; col <= 10; col++) {
			let cellContent = ""
			let cellClass = "cell "; 
			switch (solution[row-1][col-1]) {
				case null:
					cellContent = '';
					cellClass += "empty";
					break;
				case EGG:
					cellContent = 'O';
					cellClass += "egg"
					break;
				case SNAKE:
					cellClass += "snake";
					break;
				default:
					cellClass = "water";
					cellContent = solution[row-1][col-1];
			}
			newHtml += '<td class="' + cellClass + '">' + cellContent + '</td>';
		}
		newHtml += '</tr>';
	}

	const solved = check(solution);
	newHtml += solved ? '<div>SOLVED!</div>' : '<div>not solved</div>';
	gridEl.innerHTML = newHtml;
}

function combine(initial, solution) {
	// merge initial on top so we don't override the initial
	const combined = initial;
	for (let row = 1; row <= 10; row++) {
		for (let col = 1; col <= 10; col++) {
			if (initial[row-1][col-1] === null) {
				combined[row-1][col-1] = solution[row-1][col-1];
			}
		}
	}
	return combined;
}



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






