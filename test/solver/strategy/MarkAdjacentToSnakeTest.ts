import { expect } from 'chai';
import { GridCell } from '../../../src/Puzzle';
import { SolvingPuzzle, SolveCell } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/strategy/MarkAdjacentToSnake';
import { Grid } from '../../../src/grid/Grid';
import {HintedPuzzle, EGG, HintCell} from '../../../src/hinter/HintedPuzzle';

describe("MarkAdjacentToSnake", () => {

  it("marks cells orthogonal to snake body as poly (straight)", () => {
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
    let solveGrid: Grid<SolveCell> = new Grid(5, 4);

    solveGrid = solveGrid.fromArray([
      [null, null, null, null, null],
      [null, null, GridCell.SNAKE, null, null],
      [null, null, GridCell.SNAKE, null, null],
      [null, GridCell.POLY, GridCell.SNAKE, GridCell.POLY, null],
    ]);

    const puzzle = new SolvingPuzzle(new HintedPuzzle(5, 4, 5), solveGrid);

    const expectedSolveGrid = [
      [null, null, null, null, null],
      [null, null, GridCell.SNAKE, null, null],
      [null, GridCell.POLY, GridCell.SNAKE, GridCell.POLY, null],
      [null, GridCell.POLY, GridCell.SNAKE, GridCell.POLY, null],
    ];

    const strategy = new MarkAdjacentToSnake();

    const solved = strategy.solve(puzzle);

    expect(solved.getSolveGrid().toArray()).to.deep.equal(expectedSolveGrid);
  });

  it("marks orthogonal to snake body as poly (turning)", () => {
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
    const solveGrid = new Grid<SolveCell>(5, 3, [
      [null, null, null, null, null],
      [GridCell.POLY, GridCell.POLY, GridCell.SNAKE, null, null],
      [GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, null, null],
    ]);

    const puzzle = new SolvingPuzzle(new HintedPuzzle(5, 3, 5), solveGrid);

    const expectedGrid = new Grid<SolveCell>(5, 3, [
      [null, null, null, null, null],
      [GridCell.POLY, GridCell.POLY, GridCell.SNAKE, null, null],
      [GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, GridCell.POLY, null],
    ]);

    const strategy = new MarkAdjacentToSnake();

    const solved = strategy.solve(puzzle);

    expect(solved.getSolveGrid().equals(expectedGrid)).to.be.true;
  });

  it("only marks orthogonal to snake body, not head", () => {
    /*
    * Given puzzle:
    *
    *   _ _ _ _ _
    *   _ _ _ _ .
    *   _ _ _ P o
    *
    * the head could go left or up, so dont mark left or up as poly
    */
    const solveGrid = new Grid<HintCell>(5, 3, [
      [null, null, null, null, null],
      [null, null, null, null, GridCell.SNAKE],
      [null, null, null, GridCell.POLY, EGG],
    ]);

    const puzzle = new SolvingPuzzle(new HintedPuzzle(5, 3, 5), solveGrid);

    const expectedGrid = new Grid<HintCell>(5, 3, [
      [null, null, null, null, null],
      [null, null, null, null, GridCell.SNAKE],
      [null, null, null, GridCell.POLY, EGG],
    ]);

    const strategy = new MarkAdjacentToSnake();

    const solved = strategy.solve(puzzle);

    expect(solved.getSolveGrid().equals(expectedGrid)).to.be.true;
  });

});