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



render(combine(initial, solution));



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

	const solved = window.solver_check(solution);
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







