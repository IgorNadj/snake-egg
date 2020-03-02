import { expect } from 'chai';
import { Polyomino } from 'polyomino';
import { GeneratingPuzzle } from '../../src/generator/GeneratingPuzzle';
import { PolyominosOverlap } from '../../src/validator/PolyominosOverlap';


describe("PolyominosOverlap", () => {

  it("validates", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    puzzle = puzzle.place(Polyomino.get(1).first(), 0, 0);
    puzzle = puzzle.place(Polyomino.get(1).first(), 2, 0);

    expect(PolyominosOverlap.isValid(puzzle)).to.equal(true);
  });

  it("fails direct overlap", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    puzzle = puzzle.place(Polyomino.get(1).first(), 0, 0);
    puzzle = puzzle.place(Polyomino.get(1).first(), 0, 0);

    expect(PolyominosOverlap.isValid(puzzle)).to.equal(false);
  });

  it("fails adjacent touching to right", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    puzzle = puzzle.place(Polyomino.get(1).first(), 0, 0);
    puzzle = puzzle.place(Polyomino.get(1).first(), 1, 0);

    expect(PolyominosOverlap.isValid(puzzle)).to.equal(false);
  });

  it("fails adjacent touching below", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    puzzle = puzzle.place(Polyomino.get(1).first(), 0, 0);
    puzzle = puzzle.place(Polyomino.get(1).first(), 0, 1);

    expect(PolyominosOverlap.isValid(puzzle)).to.equal(false);
  });

  it("allows diagonal touching", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    puzzle = puzzle.place(Polyomino.get(1).first(), 0, 0);
    puzzle = puzzle.place(Polyomino.get(1).first(), 1, 1);

    expect(PolyominosOverlap.isValid(puzzle)).to.equal(true);
  });

});