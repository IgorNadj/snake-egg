import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Puzzle, SnakeDirection } from '../src/Puzzle';
import { PlacedPolyomino } from '../src/polyomino/PlacedPolyomino';
import { Set } from 'immutable';
import { Neighbours } from '../src/Grid';


describe("Puzzle", () => {

  it("getGrid works", () => {
    const puzzle = getPuzzle(2, 2, 1, [[0, 0]]);

    const expected = [
      [GridCell.POLY, GridCell.SNAKE],
      [GridCell.SNAKE, GridCell.SNAKE],
    ];

    expect(puzzle.getGrid().toArray()).to.deep.equal(expected);
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

    const neighbours: Neighbours<GridCell> = {
      top: GridCell.POLY,
      right: GridCell.SNAKE,
      bottom: GridCell.SNAKE,
      left: GridCell.POLY,
      topRight: GridCell.SNAKE,
      bottomRight: GridCell.POLY,
      bottomLeft: GridCell.SNAKE,
      topLeft: GridCell.SNAKE,
    }

    expect(Puzzle.countSnakeAdjacentSegments(neighbours)).to.equal(2);
  });

  it("getValidSnakeDirections works", () => {
    /*
     * _ . .
     * 1 . _
     * _ _ _
     */
    // Given the target point is in the middle, it can only move down

    const puzzle = new Puzzle(3, 3, 1);

    const neighbours: Neighbours<GridCell> = {
      top: GridCell.SNAKE,
      right: null,
      bottom: null,
      left: GridCell.POLY,
      topRight: GridCell.SNAKE,
      bottomRight: null,
      bottomLeft: null,
      topLeft: null,
    }

    const actual = Puzzle.getValidSnakeDirections(neighbours);

    expect(actual.size).to.equal(1);
    expect(actual.first()).to.equal(SnakeDirection.bottom);
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