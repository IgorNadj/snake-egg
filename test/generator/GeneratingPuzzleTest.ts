import {expect} from 'chai';
import {Polyomino} from 'polyomino';
import {GeneratingPuzzle} from "../../src/generator/GeneratingPuzzle";


describe("GeneratingPuzzle", () => {

  it("returns a new puzzle when placing", () => {
    const originalPuzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    const newPuzzle = originalPuzzle.place(poly, 1, 1);

    expect(originalPuzzle === newPuzzle).to.equal(false);
  });

  it("isPolyominoInsideBounds happy path", () => {
    const originalPuzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    const newPuzzle = originalPuzzle.place(poly, 0, 0);

    expect(newPuzzle.areAllPolyominosInsideBounds()).to.equal(true);
  });

  it("isPolyominoInsideBounds detects out of bounds on top left", () => {
    const originalPuzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    const newPuzzle = originalPuzzle.place(poly, -1, -1);

    expect(newPuzzle.areAllPolyominosInsideBounds()).to.equal(false);
  });

  it("isPolyominoInsideBounds detects out of bounds on bottom right", () => {
    const originalPuzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    const newPuzzle = originalPuzzle.place(poly, 7, 7);

    expect(newPuzzle.areAllPolyominosInsideBounds()).to.equal(false);
  });



});