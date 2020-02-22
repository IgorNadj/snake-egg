

export class Puzzle {

	protected width: number;
	protected height: number;
	protected maxNumber: number;
	protected grid;

	constructor(width, height, maxNumber) {
		this.width = width;
		this.height = height;
		this.maxNumber = maxNumber;
		this.grid = Array(height).fill(null).map(() => Array(width).fill(null));
	}

	public getGrid() {
		return this.grid;
	}

	public getWidth() {
		return this.width;
	}

	public getHeight() {
		return this.height;
	}

	public getMaxNumber() {
		return this.maxNumber;
	}

	public placePolyomino() {
		
	}

}