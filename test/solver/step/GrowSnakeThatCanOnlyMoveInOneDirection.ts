import { expect } from 'chai';
import { Grid } from '../../../src/Grid';
import { GridCell } from '../../../src/Puzzle';
import { SolvingPuzzle } from '../../../src/solver/SolvingPuzzle';
import { GrowSnakeThatCanOnlyMoveInOneDirection } from '../../../src/solver/step/GrowSnakeThatCanOnlyMoveInOneValidDirection';


describe("GrowSnakeThatCanOnlyMoveInOneValidDirection", () => {

  it("grows snake segments that must grow in a certain direction", () => {
    /*
    * Given puzzle:
    * 
    *   _ P P _ _  
    *   _ . . _ _
    *   _ . _ _ _
    *   _ . _ _ _
    * 
    * the only valid next move for the snake is to keep going right: 
    * 
    *   _ P P _ _  
    *   _ . . . _
    *   _ . _ _ _
    *   _ . _ _ _
    * 
    */
    let solveGrid: Grid<GridCell> = new Grid(5, 4);

    solveGrid = solveGrid.fromArray([
      [null, GridCell.POLY, GridCell.POLY, null, null],
      [null, GridCell.SNAKE, GridCell.SNAKE, null, null],
      [null, GridCell.SNAKE, null, null, null],
      [null, GridCell.SNAKE, null, null, null],
    ]);

    const puzzle = new SolvingPuzzle(5, 4, 5, solveGrid);

    const expectedSolveGrid = [
      [null, GridCell.POLY, GridCell.POLY, null, null],
      [null, GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, null],
      [null, GridCell.SNAKE, null, null, null],
      [null, GridCell.SNAKE, null, null, null],
    ];

    const step = new GrowSnakeThatCanOnlyMoveInOneDirection();

    const solved = step.solveStep(puzzle);

    expect(solved.getSolveGrid().toArray()).to.deep.equal(expectedSolveGrid);
  });

});