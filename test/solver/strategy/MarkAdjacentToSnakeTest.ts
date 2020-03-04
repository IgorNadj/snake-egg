import { expect } from 'chai';
import { GridCell } from '../../../src/Puzzle';
import { SolvingPuzzle, SolveCell } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/strategy/MarkAdjacentToSnake';
import { Grid } from '../../../src/grid/Grid';
import { HintedPuzzle } from '../../../src/hinter/HintedPuzzle';


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
    let solveGrid: Grid<SolveCell> = new Grid(5, 3);

    solveGrid = solveGrid.fromArray([
      [null, null, null, null, null],
      [GridCell.POLY, GridCell.POLY, GridCell.SNAKE, null, null],
      [GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, null, null],
    ]);

    const puzzle = new SolvingPuzzle(new HintedPuzzle(5, 3, 5), solveGrid);

    const expectedSolveGrid = [
      [null, null, null, null, null],
      [GridCell.POLY, GridCell.POLY, GridCell.SNAKE, null, null],
      [GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, GridCell.POLY, null],
    ];

    const strategy = new MarkAdjacentToSnake();

    const solved = strategy.solve(puzzle);

    expect(solved.getSolveGrid().toArray()).to.deep.equal(expectedSolveGrid);
  });

});