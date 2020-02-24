import {expect} from 'chai';
import {Polyomino} from 'polyomino';
import {PolyominosInBounds} from "../../../src/generator/validator/PolyominosInBounds";
import {GeneratingPuzzle} from "../../../src/generator/GeneratingPuzzle";


describe("PolyominosInBounds", () => {

  it("validates", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    puzzle = puzzle.place(poly, 0, 0);

    expect(PolyominosInBounds.isValid(puzzle)).to.equal(true);
  });

  it("fails out of bounds on top left", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    puzzle = puzzle.place(poly, -1, -1);

    expect(PolyominosInBounds.isValid(puzzle)).to.equal(false);
  });

  it("fails out of bounds on bottom right", () => {
    let puzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    puzzle = puzzle.place(poly, 7, 7);

    expect(PolyominosInBounds.isValid(puzzle)).to.equal(false);
  });

});