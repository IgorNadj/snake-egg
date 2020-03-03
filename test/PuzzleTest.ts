import { expect } from 'chai';
import { Polyomino } from 'polyomino';
import { GridCell, Puzzle } from '../src/Puzzle';
import { PlacedPolyomino } from '../src/polyomino/PlacedPolyomino';
import { Set } from 'immutable';


describe("Puzzle", () => {

  it("getGrid works", () => {
    const puzzle = getPuzzle(2, 2, 1, [[0, 0]]);

    const expected = [
      [GridCell.POLY, GridCell.SNAKE],
      [GridCell.SNAKE, GridCell.SNAKE],
    ];

    expect(puzzle.getGrid().toArray()).to.deep.equal(expected);
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