const xx = function(){
	const EGG = 'EGG';
	const SNAKE = 'SNAKE';

	window.puzzle_render = function(solution) {
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

}
xx();