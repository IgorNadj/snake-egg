const EGG = 'EGG';

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

render(initial, []);


function check(initial, solution) {
	const combined = {...solution, ...initial}; // merge initial on top so we don't allow overriding the initial
	return true; // stub
}

function render(initial, solution) {
	const combined = {...solution, ...initial}; // merge initial on top so we don't allow overriding the initial
	const gridEl = document.getElementById('grid');
	let newHtml = '<table>';
	for (let row = 1; row <= 10; row++) {
		newHtml += '<tr>';
		for (let col = 1; col <= 10; col++) {
			newHtml += '<td class="cell">';
			switch (combined[row-1][col-1]) {
				case null:
					newHtml += '';
					break;
				case EGG:
					newHtml += 'O';
					break;
				default:
					newHtml += combined[row-1][col-1];
			}
			newHtml += '</td>';
		}
		newHtml += '</tr>';
	}
	gridEl.innerHTML = newHtml;
}


