import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../src/Puzzle';
import { PlacedPolyomino } from '../src/polyomino/PlacedPolyomino';
import { Set } from 'immutable';


describe("Puzzle", () => {

  it("getGrid works", () => {
    const puzzle = getPuzzle(2, 2, 1, [[0, 0]]);

    const grid = puzzle.getGrid();

    const expected = [
      [GridCell.POLY, GridCell.SNAKE],
      [GridCell.SNAKE, GridCell.SNAKE],
    ];

    expect(grid).to.deep.equal(expected);
  });

  it("getGridNeighbours works", () => {
    /*
     * 1 .
     * . .
     */

    const puzzle = getPuzzle(2, 2, 1, [[0, 0]]);

    const grid = puzzle.getGrid();

    const neighbours = puzzle.getGridNeighbours(grid, 1, 0);

    const expected = {
      top: null,
      right: null,
      bottom: GridCell.SNAKE,
      left: GridCell.POLY,
      topRight: null,
      bottomRight: null,
      bottomLeft: GridCell.SNAKE,
      topLeft: null,
    };

    expect(neighbours).to.deep.equal(expected);
  });

  it("countSnakeAdjacentSegments works", () => {
    /*
     * . 1 .
     * 1 . .
     * . . 1
     */
    // Given the target point is in the middle, it should only count horizontal 
    // and vertical adjacent, so there are 2 snake segments adjacent. 

    const puzzle = getPuzzle(3, 3, 1, [[0, 1], [1, 0], [2, 2]]);

    const neighbours: Neighbours = {
      top: GridCell.POLY,
      right: GridCell.SNAKE,
      bottom: GridCell.SNAKE,
      left: GridCell.POLY,
      topRight: GridCell.SNAKE,
      bottomRight: GridCell.POLY,
      bottomLeft: GridCell.SNAKE,
      topLeft: GridCell.SNAKE,
    }

    expect(puzzle.countSnakeAdjacentSegments(neighbours)).to.equal(2);
  });

  it("getSnakeLength works", () => {
    /*
      * . . 1 .
      * 1 . . .
      */
    const puzzle = getPuzzle(4, 2, 1, [[2, 0], [0, 1]]);

    expect(puzzle.getSnakeLength(new PointInt(0, 0))).to.equal(6);
  });

  function getPuzzle(width: number, height: number, maxNum: number, polyPlacements: number[][]): Puzzle {
    const poly = Polyomino.get(1).first();

    let placedPolyominos: Set<PlacedPolyomino> = Set();

    polyPlacements.forEach((placement) => {
      placedPolyominos = placedPolyominos.add(new PlacedPolyomino(poly, placement[0], placement[1]))
    });

    return new Puzzle(width, height, maxNum, placedPolyominos);
  }

});