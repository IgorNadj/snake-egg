import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GeneratingPuzzle } from "../../src/generator/GeneratingPuzzle";


describe("GeneratingPuzzle", () => {

  it("returns a new puzzle when placing a poly", () => {
    const originalPuzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    const newPuzzle = originalPuzzle.place(poly, 1, 1);

    expect(originalPuzzle === newPuzzle).to.equal(false);
  });

});