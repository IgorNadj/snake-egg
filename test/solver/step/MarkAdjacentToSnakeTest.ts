import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("MarkAdjacentToSnake", () => {

  it("marks adjacent as poly when moving straight", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _
    *   _ _ . _ _
    *   _ _ . _ _
    *   _ P . P _
    * 
    * we can mark everything behind the head as not snake:
    * 
    *   _ _ _ _ _
    *   _ _ . _ _
    *   _ P . P _
    *   _ P . P _
    */
    let puzzle = new SolvingPuzzle(5, 4, 5);
    puzzle = puzzle.setSolveGrid([
      [null, null, null, null, null],
      [null, null, GridCell.SNAKE, null, null],
      [null, null, GridCell.SNAKE, null, null],
      [null, GridCell.POLY, GridCell.SNAKE, GridCell.POLY, null],
    ]);

    const expectedSolveGrid = [
      [null, null, null, null, null],
      [null, null, GridCell.SNAKE, null, null],
      [null, GridCell.POLY, GridCell.SNAKE, GridCell.POLY, null],
      [null, GridCell.POLY, GridCell.SNAKE, GridCell.POLY, null],
    ];

    const step = new MarkAdjacentToSnake();

    step.solveStep(puzzle);

    expect(puzzle.solveGrid).to.deep.equal(expectedSolveGrid);
  });

  it("marks adjacent as poly when turning", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _
    *   P P . _ _
    *   . . . _ _
    * 
    * we can mark where it didn't go as poly:
    * 
    *   _ _ _ _ _
    *   P P . _ _
    *   . . . P _
    */
    let puzzle = new SolvingPuzzle(5, 3, 5);
    puzzle = puzzle.setSolveGrid([
      [null, null, null, null, null],
      [GridCell.POLY, GridCell.POLY, GridCell.SNAKE, null, null],
      [GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, null, null],
    ]);

    const expectedSolveGrid = [
      [null, null, null, null, null],
      [GridCell.POLY, GridCell.POLY, GridCell.SNAKE, null, null],
      [GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, GridCell.POLY, null],
    ];

    const step = new MarkAdjacentToSnake();

    step.solveStep(puzzle);

    expect(puzzle.solveGrid).to.deep.equal(expectedSolveGrid);
  });

});